import { Buffer } from 'node:buffer';

export const MAX_MESSAGE_CHARS = 1200;
export const MAX_HISTORY_ENTRIES = 4;
export const MAX_HISTORY_CHARS = MAX_HISTORY_ENTRIES * MAX_MESSAGE_CHARS;
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_BODY_BYTES = 3 * 1024 * 1024;
export const MAX_IMAGE_DIMENSION = 4096;
export const MAX_IMAGE_PIXELS = 16_000_000;
export const MAX_COPY_CHARS = 600;
export const MAX_REASON_CHARS = 240;
export const BODY_READ_TIMEOUT_MS = 10_000;

export class CopyGPTInputError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'CopyGPTInputError';
    this.status = status;
    this.publicMessage = message;
  }
}

export class CopyGPTResultError extends Error {
  constructor() {
    super('CopyGPT returned an invalid result. Please try again.');
    this.name = 'CopyGPTResultError';
    this.status = 502;
    this.publicMessage = this.message;
  }
}

function isRecord(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasOnlyKeys(value, allowed) {
  return Reflect.ownKeys(value).every((key) => typeof key === 'string' && allowed.includes(key));
}

function inputError(message, status = 400) {
  throw new CopyGPTInputError(message, status);
}

function validateHistory(value) {
  if (!Array.isArray(value) || value.length > MAX_HISTORY_ENTRIES) {
    inputError('History must contain at most four messages.');
  }
  if (value.length % 2 !== 0) {
    inputError('History must contain complete user and assistant pairs.');
  }

  let total = 0;
  return value.map((entry, index) => {
    if (!isRecord(entry) || !hasOnlyKeys(entry, ['role', 'content'])) {
      inputError('Each history message must contain only a role and content.');
    }
    if (entry.role !== (index % 2 === 0 ? 'user' : 'assistant')) {
      inputError('History must alternate user and assistant messages, ending with an assistant.');
    }
    if (typeof entry.content !== 'string' || !entry.content.trim()) {
      inputError('History messages must contain text.');
    }
    const content = entry.content.trim();
    total += content.length;
    if (content.length > MAX_MESSAGE_CHARS || total > MAX_HISTORY_CHARS) {
      inputError('History messages are too long.', 413);
    }
    return { role: entry.role, content };
  });
}

function pngDimensions(bytes) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (bytes.length < 33 || !bytes.subarray(0, 8).equals(signature)
    || bytes.readUInt32BE(8) !== 13 || bytes.toString('ascii', 12, 16) !== 'IHDR') {
    inputError('The PNG image header is invalid.');
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function jpegDimensions(bytes) {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    inputError('The JPEG image header is invalid.');
  }
  const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let offset = 2;
  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) break;
    while (offset < bytes.length && bytes[offset] === 0xff) offset += 1;
    if (offset >= bytes.length) break;
    const marker = bytes[offset++];
    if (marker === 0xda || marker === 0xd9 || marker === 0x00 || marker === 0xd8) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 2 > bytes.length) break;
    const length = bytes.readUInt16BE(offset);
    if (length < 2 || offset + length > bytes.length) break;
    if (frameMarkers.has(marker)) {
      if (length < 11 || length !== 8 + 3 * bytes[offset + 7]) break;
      return { width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  inputError('The JPEG image dimensions could not be read.');
}

function webpDimensions(bytes) {
  if (bytes.length < 20 || bytes.toString('ascii', 0, 4) !== 'RIFF'
    || bytes.toString('ascii', 8, 12) !== 'WEBP' || bytes.readUInt32LE(4) !== bytes.length - 8) {
    inputError('The WebP image header is invalid.');
  }
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const kind = bytes.toString('ascii', offset, offset + 4);
    const size = bytes.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (data + size > bytes.length) break;
    if (kind === 'VP8X' && size === 10) {
      return { width: bytes.readUIntLE(data + 4, 3) + 1, height: bytes.readUIntLE(data + 7, 3) + 1 };
    }
    if (kind === 'VP8 ' && size >= 10 && (bytes[data] & 1) === 0
      && bytes[data + 3] === 0x9d && bytes[data + 4] === 0x01 && bytes[data + 5] === 0x2a) {
      return { width: bytes.readUInt16LE(data + 6) & 0x3fff, height: bytes.readUInt16LE(data + 8) & 0x3fff };
    }
    if (kind === 'VP8L' && size >= 5 && bytes[data] === 0x2f) {
      const bits = bytes.readUInt32LE(data + 1);
      if ((bits >>> 29) !== 0) break;
      return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
    }
    offset = data + size + (size % 2);
  }
  inputError('The WebP image dimensions could not be read.');
}

function validateImage(value) {
  if (!isRecord(value) || !hasOnlyKeys(value, ['mediaType', 'data'])
    || !['image/png', 'image/jpeg', 'image/webp'].includes(value.mediaType)
    || typeof value.data !== 'string' || value.data.length === 0) {
    inputError('Attach one PNG, JPEG or WebP image.');
  }
  if (value.data.length > Math.ceil(MAX_IMAGE_BYTES / 3) * 4) {
    inputError('The image must be no larger than 2 MB.', 413);
  }
  const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!base64Pattern.test(value.data)) inputError('The image must use canonical base64 data.');
  const bytes = Buffer.from(value.data, 'base64');
  if (bytes.length > MAX_IMAGE_BYTES) inputError('The image must be no larger than 2 MB.', 413);
  if (bytes.toString('base64') !== value.data) inputError('The image must use canonical base64 data.');

  const parsers = { 'image/png': pngDimensions, 'image/jpeg': jpegDimensions, 'image/webp': webpDimensions };
  const { width, height } = parsers[value.mediaType](bytes);
  if (width === 0 || height === 0) inputError('The image dimensions are invalid.');
  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION || width * height > MAX_IMAGE_PIXELS) {
    inputError('Use an image up to 4,096 pixels per side and 16 million pixels in total.', 413);
  }
  return { mediaType: value.mediaType, data: value.data };
}

export function validateSubmission(value) {
  if (!isRecord(value) || !hasOnlyKeys(value, ['message', 'history', 'image'])) {
    inputError('Send a message, optional history and at most one image.');
  }
  if (value.message !== undefined && typeof value.message !== 'string') {
    inputError('The message must contain text.');
  }
  const message = (value.message ?? '').trim();
  if (message.length > MAX_MESSAGE_CHARS) inputError('Keep the message to 1,200 characters.', 413);
  const history = validateHistory(value.history === undefined ? [] : value.history);
  const image = value.image === undefined ? undefined : validateImage(value.image);
  if (!message && !image) inputError('Write a message or attach an image.');
  return { message, history, ...(image ? { image } : {}) };
}

function hasMultipleOptions(copy) {
  const markers = copy.match(/(?:^|\n)\s*(?:\(?\d{1,2}[.)]|\(?[A-Z][.)]|[-*•]|(?:option|alternative|rewrite)\s+[A-Z0-9]+\s*[:.)–—-])\s+\S/gim);
  return markers !== null && markers.length >= 2;
}

export function validateResult(value) {
  if (!isRecord(value) || !hasOnlyKeys(value, ['type', 'copy', 'reason'])
    || Object.keys(value).length !== 3
    || !['rewrite', 'clarification', 'human_review'].includes(value.type)
    || typeof value.copy !== 'string' || !value.copy.trim()
    || value.copy.trim().length > MAX_COPY_CHARS
    || hasMultipleOptions(value.copy.trim())
    || typeof value.reason !== 'string' || value.reason.trim().length > MAX_REASON_CHARS) {
    throw new CopyGPTResultError();
  }
  return { type: value.type, copy: value.copy.trim(), reason: value.reason.trim() };
}

function cancelBody(request, reader) {
  try {
    const cancellation = reader ? reader.cancel() : request.body?.cancel();
    Promise.resolve(cancellation).catch(() => {});
  } catch {
    // Cancellation failure must not replace the public validation error.
  }
}

export async function readSubmission(request, { timeoutMs = BODY_READ_TIMEOUT_MS } = {}) {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new RangeError('Body timeout must be positive.');
  let reader;
  let timer;
  try {
    const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
    if (contentType !== 'application/json') inputError('Send the request as application/json.');
    const lengthHeader = request.headers.get('content-length');
    if (lengthHeader !== null && !/^\d+$/.test(lengthHeader)) inputError('The Content-Length header is invalid.');
    const announcedLength = lengthHeader === null ? null : Number(lengthHeader);
    if (announcedLength > MAX_BODY_BYTES) inputError('The request body is too large.', 413);
    if (!request.body) inputError('Send a JSON request body.');
    reader = request.body.getReader();
    const deadline = new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new CopyGPTInputError('The request took too long. Please try again.', 408)), timeoutMs);
    });
    const chunks = [];
    let total = 0;
    while (true) {
      const { value, done } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      if (!(value instanceof Uint8Array)) inputError('The request body is invalid.');
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) inputError('The request body is too large.', 413);
      chunks.push(value);
    }
    if (announcedLength !== null && announcedLength !== total) inputError('The request body length is invalid.');
    let value;
    try {
      const text = new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks, total));
      value = JSON.parse(text);
    } catch {
      inputError('Send a valid JSON request body.');
    }
    return validateSubmission(value);
  } catch (error) {
    cancelBody(request, reader);
    if (error instanceof CopyGPTInputError) throw error;
    throw new CopyGPTInputError('The request body could not be read.');
  } finally {
    clearTimeout(timer);
    try {
      reader?.releaseLock();
    } catch {
      // Keep the original public error if an unusual body cannot release its lock.
    }
  }
}
