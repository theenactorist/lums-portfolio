// Shared deterministic outdoor compositor. Scene time is supplied by the source
// media (the live website) or an explicit seek (review/HyperFrames).
export const TORONTO_DURATION = 241 / 24;
export const TORONTO_WIDTH = 1916;
export const TORONTO_HEIGHT = 1080;

const vertexSource = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = vec2((position.x + 1.0) * 0.5, (1.0 - position.y) * 0.5);
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentSource = `
precision highp float;
varying vec2 uv;
uniform sampler2D dayPlate;
uniform sampler2D nightPlate;
uniform sampler2D dayCells;
uniform sampler2D nightCells;
uniform sampler2D sourceVideo;
uniform sampler2D foregroundMatte;
uniform sampler2D dynamicMatte;
uniform sampler2D nightFloor;
uniform float phase;
uniform float night;
uniform float foregroundEnabled;
uniform float dynamicEnabled;
uniform float nightFloorEnabled;
uniform float dynamicFloorEnabled;
uniform vec4 dynamicFloorRect;
uniform vec2 dynamicFloorTileScale;
uniform vec4 dynamicRect;
uniform vec4 dynamicTile;
const vec2 resolution = vec2(1916.0, 1080.0);
const float PI = 3.141592653589793;

// The horizon and skyline never translate. Displacement is bounded to clear
// sky and lake regions; the sun/moon are explicitly protected at source UVs.
vec2 outdoorUv(vec2 p) {
  // V3 has a closer skyline: CN tip y=.158 and shoreline y=.773.
  // Conservative stepped clear-sky bounds leave the entire skyline fixed.
  float skyTop = 1.0 - smoothstep(0.08, 0.12, p.y);
  float skyLeft = (1.0 - smoothstep(0.28, 0.30, p.x)) *
    (1.0 - smoothstep(0.58, 0.62, p.y));
  float skyMiddleLeft = smoothstep(0.28, 0.30, p.x) *
    (1.0 - smoothstep(0.50, 0.53, p.x)) *
    (1.0 - smoothstep(0.44, 0.48, p.y));
  float skyMiddle = smoothstep(0.50, 0.53, p.x) *
    (1.0 - smoothstep(0.62, 0.64, p.x)) *
    (1.0 - smoothstep(0.36, 0.40, p.y));
  float skyRight = smoothstep(0.71, 0.73, p.x) *
    (1.0 - smoothstep(0.83, 0.85, p.x)) *
    (1.0 - smoothstep(0.31, 0.35, p.y));
  float skyFarRight = smoothstep(0.83, 0.85, p.x) *
    (1.0 - smoothstep(0.20, 0.24, p.y));
  float sky = max(max(max(skyTop, skyLeft), max(skyMiddleLeft, skyMiddle)),
    max(skyRight, skyFarRight));
  float celestial = smoothstep(0.060, 0.090,
    length((p - vec2(0.419, 0.193)) * vec2(1.0, 0.5625)));
  sky *= celestial;
  vec2 cloud = vec2(
    2.4 * sin(phase + p.y * 7.0) + 0.8 * sin(phase * 2.0 + p.y * 12.0),
    0.35 * sin(phase + p.x * 5.0)
  ) * sky / resolution;
  float water = smoothstep(0.780, 0.810, p.y);
  float depth = smoothstep(0.78, 1.0, p.y);
  vec2 ripple = vec2(
    (0.32 + 1.6 * depth) * sin(p.y * 186.0 + phase * 2.0 + p.x * 9.0),
    (0.22 + 0.55 * depth) * sin(p.y * 118.0 - phase * 2.0 + p.x * 7.0)
      + 0.22 * sin(p.y * 246.0 + phase * 3.0)
  ) * water / resolution;
  // Fade displacement at image borders, avoiding clamped texture streaks.
  float edge = smoothstep(0.0, 0.012, p.x) *
    smoothstep(0.0, 0.012, 1.0 - p.x) * smoothstep(0.0, 0.012, 1.0 - p.y);
  return p + (cloud + ripple) * edge;
}

vec3 plateAt(vec2 p) {
  return mix(texture2D(dayPlate, p).rgb, texture2D(nightPlate, p).rgb, night);
}

vec3 outdoor(vec2 p) {
  vec3 base = plateAt(outdoorUv(p));
  vec2 px = p * resolution;
  vec2 spacing = vec2(1916.0 / 240.0, 8.0);
  vec2 cell = (floor(px / spacing) + 0.5) / vec2(240.0, 135.0);
  vec3 sampled = mix(texture2D(dayCells, outdoorUv(cell)).rgb,
                     texture2D(nightCells, outdoorUv(cell)).rgb, night);
  // Original diagonal recipe: brightness-weighted capped 45-degree strokes,
  // sampled RGB over #080a0b, blended at precisely 3% on the new exterior only.
  float b = sqrt(dot(sampled, vec3(0.299, 0.587, 0.114)));
  vec2 d = mod(px, spacing) - spacing * 0.5;
  float along = (d.x - d.y) / sqrt(2.0);
  float across = (d.x + d.y) / sqrt(2.0);
  float halfLength = 0.35 + 3.25 * b;
  float halfWidth = 0.15 + b;
  float distanceToStroke = length(vec2(across, max(abs(along) - halfLength, 0.0)));
  float mask = clamp(halfWidth - distanceToStroke + 0.5, 0.0, 1.0);
  vec3 diagonal = mix(vec3(8.0, 10.0, 11.0) / 255.0, sampled, mask);
  return mix(base, diagonal, 0.03);
}

void main() {
  vec3 exterior = outdoor(uv);
  float keep = texture2D(foregroundMatte, uv).r;
  if (dynamicEnabled > 0.5 && uv.x >= dynamicRect.x && uv.y >= dynamicRect.y &&
      uv.x < dynamicRect.x + dynamicRect.z && uv.y < dynamicRect.y + dynamicRect.w) {
    vec2 local = (uv - dynamicRect.xy) / dynamicRect.zw;
    keep = max(keep, texture2D(dynamicMatte, dynamicTile.xy + local * dynamicTile.zw).r);
  }
  vec3 source = texture2D(sourceVideo, uv).rgb;
  // The floor follows the existing numeric day/night mix. The optional v5
  // green channel protects the decoded frame's chair within the floor strip.
  if (nightFloorEnabled > 0.5 && night > 0.0) {
    vec4 floorPatch = texture2D(nightFloor, uv);
    float floorAlpha = floorPatch.a;
    if (dynamicFloorEnabled > 0.5 && uv.x >= dynamicFloorRect.x && uv.y >= dynamicFloorRect.y &&
        uv.x < dynamicFloorRect.x + dynamicFloorRect.z && uv.y < dynamicFloorRect.y + dynamicFloorRect.w) {
      vec2 local = (uv - dynamicFloorRect.xy) / dynamicFloorRect.zw;
      float chair = texture2D(dynamicMatte,
        dynamicTile.xy + local * dynamicTile.zw * dynamicFloorTileScale).g;
      floorAlpha *= 1.0 - chair;
    }
    source = mix(source, floorPatch.rgb, floorAlpha * night);
  }
  gl_FragColor = vec4(mix(exterior, source, keep * foregroundEnabled), 1.0);
}`;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load a Toronto backdrop image: ${src}`));
    image.src = src;
  });
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function cellsFrom(image) {
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 135;
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export async function createTorontoRenderer(canvas, { video, assetBase = '/_toronto', matteUrl, dynamic = null, nightFloorUrl = null, floorProtectionUrl = null, floorRugProtectionUrl = null, signal } = {}) {
  // An abandoned React effect must never mutate a newer renderer's context.
  // Finish all asynchronous work before creating or binding any GL resources.
  const [day, night, matte, dynamicImage, poster, nightFloorImage, floorProtectionImage, floorRugProtectionImage] = await Promise.all([
    loadImage(`${assetBase}/toronto-day-v3.webp`), loadImage(`${assetBase}/toronto-night-v3.webp`),
    loadImage(matteUrl || `${assetBase}/foreground-alpha.png`),
    dynamic ? loadImage(dynamic.url) : Promise.resolve(null),
    loadImage(video?.poster || '/home/hero/landing-diagonal-3-poster.webp'),
    nightFloorUrl ? loadImage(nightFloorUrl) : Promise.resolve(null),
    floorProtectionUrl ? loadImage(floorProtectionUrl) : Promise.resolve(null),
    floorRugProtectionUrl ? loadImage(floorRugProtectionUrl) : Promise.resolve(null),
  ]);
  if (signal?.aborted) throw new DOMException('Superseded Toronto renderer initialization.', 'AbortError');

  const imagePixels = image => {
    if (!image) return null;
    const surface = document.createElement('canvas');
    surface.width = TORONTO_WIDTH;
    surface.height = TORONTO_HEIGHT;
    const context = surface.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0, TORONTO_WIDTH, TORONTO_HEIGHT);
    return context.getImageData(0, 0, TORONTO_WIDTH, TORONTO_HEIGHT).data;
  };
  // This CPU-only protection mask costs no additional GPU sampler. Reject an
  // entire invalid floor overlay instead of clipping a rectangular strip into
  // the chair: a failed mask can never introduce another horizontal seam.
  const floorPixels = imagePixels(nightFloorImage);
  const floorProtectionPixels = imagePixels(floorProtectionImage);
  const floorRugProtectionPixels = imagePixels(floorRugProtectionImage);
  if (floorProtectionPixels && floorRugProtectionPixels) {
    for (let i = 0; i < floorProtectionPixels.length; i += 4) {
      floorProtectionPixels[i] = Math.max(floorProtectionPixels[i], floorRugProtectionPixels[i]);
    }
  }
  // Optional v5 packing: R remains the original arm matte; G carries the
  // current chair silhouette in a 256x24 source-pixel floor strip. Cache CPU
  // bytes once; rendering continues to use the existing eighth-or-fewer samplers.
  const floorRect = dynamic?.floorRect;
  const dynamicFloorRequested = Boolean(floorRect);
  const frameAt = time => Math.min(240, Math.floor(
    (((time % TORONTO_DURATION) + TORONTO_DURATION) % TORONTO_DURATION) * 24 + 1e-5));
  const inFloorRect = (x, y) => Boolean(floorRect) && x >= floorRect[0] && y >= floorRect[1] &&
    x < floorRect[0] + floorRect[2] && y < floorRect[1] + floorRect[3];
  let atlasPixels = null, floorGreenPixels = null;
  const dynamicFloorErrors = [];
  if (dynamicFloorRequested) {
    const dimensionsMatch = dynamic.columns === 8 && dynamic.rows === 31 &&
      JSON.stringify(dynamic.rect) === '[820,692,350,94]' &&
      JSON.stringify(floorRect) === '[835,856,256,24]' && dynamic.floorChannel === 'green' &&
      dynamicImage?.width === 2800 && dynamicImage?.height === 2914;
    if (!dimensionsMatch) dynamicFloorErrors.push('Unsupported v5 atlas dimensions, channel or source rectangles.');
    if (![nightFloorImage, floorProtectionImage, floorRugProtectionImage].every(image =>
      image?.width === TORONTO_WIDTH && image?.height === TORONTO_HEIGHT)) {
      dynamicFloorErrors.push('Source-sized floor and both protection masks are required.');
    }
    if (dimensionsMatch) {
      const surface = document.createElement('canvas');
      surface.width = dynamicImage.width; surface.height = dynamicImage.height;
      const context = surface.getContext('2d', { willReadFrequently: true });
      context.drawImage(dynamicImage, 0, 0);
      atlasPixels = context.getImageData(0, 0, surface.width, surface.height).data;
    }
  }
  const chairAt = (frame, x, y) => floorGreenPixels ?
    floorGreenPixels[frame * 256 * 24 + (y - 856) * 256 + x - 835] : atlasPixels[
    (((Math.floor(frame / 8) * 94 + y - 856) * 2800) + (frame % 8) * 350 + x - 835) * 4 + 1];
  if (atlasPixels && floorPixels && floorRugProtectionPixels) {
    let invalidPotential = 0, invalidCore = 0, invalidRows = 0, invalidPadding = 0;
    for (let y = 856; y < 880; y += 1) for (let x = 835; x < 1091; x += 1) {
      const i = (y * TORONTO_WIDTH + x) * 4;
      if (floorPixels[i + 3] !== 255 || floorRugProtectionPixels[i] !== 0) invalidPotential += 1;
    }
    // Independent source-confirmed cores, checked in every one of 241 frames.
    const cores = [[960,865,255], [850,875,255], [1070,865,255],
      [840,865,0], [841,865,0], [1084,865,0], [1085,865,0]];
    for (let frame = 0; frame < 248; frame += 1) {
      for (let y = 0; y < 94; y += 1) for (let x = 0; x < 350; x += 1) {
        if (frame < 241 && y < 24 && x < 256) continue;
        if (atlasPixels[((Math.floor(frame / 8) * 94 + y) * 2800 + (frame % 8) * 350 + x) * 4 + 1] !== 255) invalidPadding += 1;
      }
      if (frame >= 241) continue;
      for (const [x, y, value] of cores) if (chairAt(frame, x, y) !== value) invalidCore += 1;
      for (let y = 856; y < 880; y += 1) {
        // Each source row has one contiguous chair, with only native edge AA.
        let stage = 0, mixedLeft = 0, mixedRight = 0;
        for (let x = 835; x < 1091; x += 1) {
          const value = chairAt(frame, x, y);
          if (x >= 900 && x <= 1050 && value !== 255) invalidCore += 1;
          if (value === 255) { if (stage > 1) invalidRows += 1; stage = 1; }
          else if (value > 0) { if (stage === 0) mixedLeft += 1; else { stage = 2; mixedRight += 1; } }
          else if (stage > 0) stage = 3;
        }
        if (mixedLeft > 1 || mixedRight > 1) invalidRows += 1;
      }
    }
    if (invalidPotential) dynamicFloorErrors.push(`Invalid potential floor or rug pixels: ${invalidPotential}.`);
    if (invalidCore) dynamicFloorErrors.push(`Source-confirmed chair/wood core failures: ${invalidCore}.`);
    if (invalidRows) dynamicFloorErrors.push(`Invalid contiguous chair rows: ${invalidRows}.`);
    if (invalidPadding) dynamicFloorErrors.push(`Unsafe unused atlas samples: ${invalidPadding}.`);
  }
  const dynamicFloorEnabled = dynamicFloorRequested && Boolean(atlasPixels) && dynamicFloorErrors.length === 0;
  if (dynamicFloorEnabled) {
    // Keep only the 1.48 MB green floor samples after full-atlas validation.
    const packed = new Uint8Array(241 * 256 * 24);
    for (let frame = 0; frame < 241; frame += 1) {
      for (let y = 856; y < 880; y += 1) for (let x = 835; x < 1091; x += 1) {
        packed[frame * 256 * 24 + (y - 856) * 256 + x - 835] = chairAt(frame, x, y);
      }
    }
    floorGreenPixels = packed;
  }
  atlasPixels = null;

  const effectiveFloorAlpha = (frame, x, y, i) => (floorPixels?.[i + 3] || 0) *
    (dynamicFloorEnabled && inFloorRect(x, y) ? (255 - chairAt(frame, x, y)) / 255 : 1);
  const protectedAt = (frame, x, y, i) => dynamicFloorEnabled && inFloorRect(x, y)
    ? chairAt(frame, x, y) : floorProtectionPixels?.[i];
  let floorProtectionOverlap = 0, floorAlphaPixels = 0, potentialStaticOverlap = 0;
  if (floorPixels) {
    for (let i = 0; i < floorPixels.length; i += 4) {
      if (floorPixels[i + 3] > 0) {
        floorAlphaPixels += 1;
        if (floorProtectionPixels?.[i] === 255) {
          const pixel = i / 4;
          if (dynamicFloorEnabled && inFloorRect(pixel % TORONTO_WIDTH, Math.floor(pixel / TORONTO_WIDTH))) potentialStaticOverlap += 1;
          else floorProtectionOverlap += 1;
        }
      }
    }
  }
  const floorLayerEnabled = Boolean(nightFloorImage) && floorAlphaPixels > 0 && floorProtectionOverlap === 0 &&
    (!dynamicFloorRequested || dynamicFloorEnabled);
  const floorProtectionGuard = {
    protectionMaskProvided: Boolean(floorProtectionImage),
    rugProtectionMaskProvided: Boolean(floorRugProtectionImage),
    opaqueProtectedGeometryOverlapPixels: floorProtectionOverlap,
    sourceFloorAlphaPixels: floorAlphaPixels,
    floorLayerEnabled,
    dynamicFloor: { requested: dynamicFloorRequested, enabled: dynamicFloorEnabled,
      validatedFrames: dynamicFloorEnabled ? 241 : 0, floorRect: floorRect || null,
      potentialStaticOverlapPixels: potentialStaticOverlap, errors: dynamicFloorErrors },
    action: dynamicFloorRequested && !dynamicFloorEnabled ? 'Rejected the entire floor overlay; dynamic-floor validation failed.' : !nightFloorImage ? 'No floor overlay supplied.' : !floorProtectionImage ?
      'Protection mask not supplied; overlap has not been validated.' : floorProtectionOverlap ?
        'Rejected the entire floor overlay; original foreground remains visible.' : 'No opaque protected geometry overlap.',
  };

  canvas.width = TORONTO_WIDTH;
  canvas.height = TORONTO_HEIGHT;
  const gl = canvas.getContext('webgl', {
    alpha: false, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false,
    // Kept only for local capture and pixel checks; production doesn't need it.
    preserveDrawingBuffer: process.env.NODE_ENV !== 'production',
  });
  if (!gl) throw new Error('WebGL is unavailable; the original video stays in place.');
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.viewport(0, 0, canvas.width, canvas.height);

  const textures = [];
  function texture(name, source, unit, nearest = false) {
    const tex = gl.createTexture();
    textures.push(tex);
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
    if (source) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.uniform1i(gl.getUniformLocation(program, name), unit);
    return tex;
  }
  texture('dayPlate', day, 0);
  texture('nightPlate', night, 1);
  texture('dayCells', cellsFrom(day), 2, true);
  texture('nightCells', cellsFrom(night), 3, true);
  const videoTexture = texture('sourceVideo', poster, 4);
  texture('foregroundMatte', matte, 5);
  texture('dynamicMatte', dynamicImage, 6);
  texture('nightFloor', nightFloorImage, 7);
  const uniforms = Object.fromEntries(['phase', 'night', 'foregroundEnabled', 'dynamicEnabled', 'dynamicRect', 'dynamicTile', 'nightFloorEnabled', 'dynamicFloorEnabled', 'dynamicFloorRect', 'dynamicFloorTileScale'].map(name => [name, gl.getUniformLocation(program, name)]));
  let disposed = false;

  return {
    // scene: 'light' (day), 'dark' (night) or a day-to-night mix from 0 to 1.
    renderAt(time = 0, scene = 'light', { foreground = true } = {}) {
      if (disposed || gl.isContextLost()) return;
      const wrapped = ((time % TORONTO_DURATION) + TORONTO_DURATION) % TORONTO_DURATION;
      // Every draw restores all state it owns. A superseded initialization or
      // context lifecycle event cannot leave another instance's bindings here.
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.viewport(0, 0, canvas.width, canvas.height);
      textures.forEach((tex, unit) => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
      });
      if (video && video.readyState >= 2) {
        gl.activeTexture(gl.TEXTURE4);
        gl.bindTexture(gl.TEXTURE_2D, videoTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      }
      gl.uniform1f(uniforms.phase, wrapped / TORONTO_DURATION * Math.PI * 2);
      gl.uniform1f(uniforms.night, typeof scene === 'number'
        ? Math.min(1, Math.max(0, scene)) : scene === 'dark' ? 1 : 0);
      gl.uniform1f(uniforms.foregroundEnabled, foreground ? 1 : 0);
      gl.uniform1f(uniforms.dynamicEnabled, dynamic ? 1 : 0);
      gl.uniform1f(uniforms.nightFloorEnabled, floorLayerEnabled ? 1 : 0);
      gl.uniform1f(uniforms.dynamicFloorEnabled, dynamicFloorEnabled ? 1 : 0);
      if (dynamicFloorEnabled) {
        const [x, y, w, h] = floorRect;
        gl.uniform4f(uniforms.dynamicFloorRect, x / TORONTO_WIDTH, y / TORONTO_HEIGHT, w / TORONTO_WIDTH, h / TORONTO_HEIGHT);
        gl.uniform2f(uniforms.dynamicFloorTileScale, w / dynamic.rect[2], h / dynamic.rect[3]);
      }
      if (dynamic) {
        const frame = Math.min(240, Math.floor(wrapped * 24 + 1e-5));
        const [x, y, w, h] = dynamic.rect;
        gl.uniform4f(uniforms.dynamicRect, x / TORONTO_WIDTH, y / TORONTO_HEIGHT, w / TORONTO_WIDTH, h / TORONTO_HEIGHT);
        gl.uniform4f(uniforms.dynamicTile, (frame % dynamic.columns) / dynamic.columns,
          Math.floor(frame / dynamic.columns) / dynamic.rows, 1 / dynamic.columns, 1 / dynamic.rows);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    readPixels() {
      const pixels = new Uint8Array(TORONTO_WIDTH * TORONTO_HEIGHT * 4);
      gl.readPixels(0, 0, TORONTO_WIDTH, TORONTO_HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      return pixels;
    },
    compareRetainedForeground() {
      const reference = document.createElement('canvas');
      reference.width = TORONTO_WIDTH;
      reference.height = TORONTO_HEIGHT;
      const context = reference.getContext('2d', { willReadFrequently: true });
      context.drawImage(matte, 0, 0);
      const alpha = context.getImageData(0, 0, TORONTO_WIDTH, TORONTO_HEIGHT).data;
      context.clearRect(0, 0, TORONTO_WIDTH, TORONTO_HEIGHT);
      context.drawImage(video && video.readyState >= 2 ? video : poster, 0, 0, TORONTO_WIDTH, TORONTO_HEIGHT);
      const original = context.getImageData(0, 0, TORONTO_WIDTH, TORONTO_HEIGHT).data;
      const actual = new Uint8Array(TORONTO_WIDTH * TORONTO_HEIGHT * 4);
      gl.readPixels(0, 0, TORONTO_WIDTH, TORONTO_HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, actual);
      let comparedPixels = 0, changedChannels = 0, maximumChannelDifference = 0, sum = 0;
      for (let y = 0; y < TORONTO_HEIGHT; y += 1) {
        for (let x = 0; x < TORONTO_WIDTH; x += 1) {
          const i = (y * TORONTO_WIDTH + x) * 4;
          if (alpha[i] !== 255) continue;
          const output = ((TORONTO_HEIGHT - 1 - y) * TORONTO_WIDTH + x) * 4;
          comparedPixels += 1;
          for (let c = 0; c < 3; c += 1) {
            const difference = Math.abs(original[i + c] - actual[output + c]);
            if (difference > 0) changedChannels += 1;
            maximumChannelDifference = Math.max(maximumChannelDifference, difference);
            sum += difference;
          }
        }
      }
      return { comparedPixels, changedChannels, maximumChannelDifference,
        meanChannelDifference: sum / (comparedPixels * 3),
        scope: 'Fully opaque static foreground mask; antialiased edges and dynamic arm are excluded.' };
    },
    // Review-only CPU accessor: matches the shader at native source pixels.
    floorSampleAt(time, x, y) {
      const i = (y * TORONTO_WIDTH + x) * 4, frame = frameAt(time);
      return { frame, baseAlpha: floorPixels?.[i + 3] || 0,
        effectiveAlpha: effectiveFloorAlpha(frame, x, y, i),
        protectedAlpha: protectedAt(frame, x, y, i), floorOverlayActive: floorLayerEnabled,
        dynamicFloorEnabled, floorProtectionGuard };
    },
    compareProtectedNight(time = 0) {
      if (disposed || gl.isContextLost()) throw new Error('The compositor is unavailable; no pixel comparison was performed.');
      if (!floorProtectionImage || !floorRugProtectionImage || !nightFloorImage) {
        return { verificationStatus: 'unverified',
          reason: !floorProtectionImage ? 'Required protected-objects mask is missing; no protected-night pixel comparison was performed.' :
            !floorRugProtectionImage ? 'Required protected-rug mask is missing; no protected-night pixel comparison was performed.' :
              'Night floor overlay is missing; no protected-night pixel comparison was performed.',
          testedTheme: 'dark', sourceTime: video?.currentTime ?? 0,
          floorOverlayActive: floorLayerEnabled, rejectedOverlapPixels: null, floorProtectionGuard };
      }
      const frame = frameAt(time);
      const staticPixels = imagePixels(matte);
      const original = imagePixels(video && video.readyState >= 2 ? video : poster);
      const actual = new Uint8Array(TORONTO_WIDTH * TORONTO_HEIGHT * 4);
      gl.readPixels(0, 0, TORONTO_WIDTH, TORONTO_HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, actual);
      let movingPixels = null;
      if (dynamic && dynamicImage) {
        const wrapped = ((time % TORONTO_DURATION) + TORONTO_DURATION) % TORONTO_DURATION;
        const frame = Math.min(240, Math.floor(wrapped * 24 + 1e-5));
        const [, , width, height] = dynamic.rect;
        const surface = document.createElement('canvas');
        surface.width = width;
        surface.height = height;
        const context = surface.getContext('2d', { willReadFrequently: true });
        context.drawImage(dynamicImage, (frame % dynamic.columns) * width,
          Math.floor(frame / dynamic.columns) * height, width, height, 0, 0, width, height);
        movingPixels = context.getImageData(0, 0, width, height).data;
      }
      const makeMetric = () => ({ comparedPixels: 0, changedChannels: 0, maximumChannelDifference: 0, totalDifference: 0 });
      const preserved = makeMetric();
      const personChair = makeMetric();
      const personChairRoi = { x: 810, y: 540, width: 360, height: 508 };
      let floorAlphaExcludedPixels = 0, personChairFloorOverlapPixels = 0, effectiveFloorAlphaPixels = 0;
      const measure = (metric, sourceIndex, outputIndex) => {
        metric.comparedPixels += 1;
        for (let c = 0; c < 3; c += 1) {
          const difference = Math.abs(original[sourceIndex + c] - actual[outputIndex + c]);
          if (difference) metric.changedChannels += 1;
          metric.maximumChannelDifference = Math.max(metric.maximumChannelDifference, difference);
          metric.totalDifference += difference;
        }
      };
      for (let y = 0; y < TORONTO_HEIGHT; y += 1) {
        for (let x = 0; x < TORONTO_WIDTH; x += 1) {
          const i = (y * TORONTO_WIDTH + x) * 4;
          let retained = staticPixels[i];
          if (movingPixels && x >= dynamic.rect[0] && y >= dynamic.rect[1] &&
              x < dynamic.rect[0] + dynamic.rect[2] && y < dynamic.rect[1] + dynamic.rect[3]) {
            const movingIndex = ((y - dynamic.rect[1]) * dynamic.rect[2] + x - dynamic.rect[0]) * 4;
            retained = Math.max(retained, movingPixels[movingIndex]);
          }
          const floorAlpha = effectiveFloorAlpha(frame, x, y, i);
          if (floorLayerEnabled && floorAlpha > 0) effectiveFloorAlphaPixels += 1;
          if (retained !== 255) continue;
          const output = ((TORONTO_HEIGHT - 1 - y) * TORONTO_WIDTH + x) * 4;
          if (floorLayerEnabled && floorAlpha > 0) floorAlphaExcludedPixels += 1;
          else measure(preserved, i, output);
          const inPersonChair = x >= personChairRoi.x && x < personChairRoi.x + personChairRoi.width &&
            y >= personChairRoi.y && y < personChairRoi.y + personChairRoi.height;
          // Unlike the general retained-pixel check, the protected chair check
          // never excludes a pixel merely because the floor alpha spills there.
          if (inPersonChair && (!floorProtectionPixels || protectedAt(frame, x, y, i) === 255)) {
            measure(personChair, i, output);
            if (floorAlpha > 0) personChairFloorOverlapPixels += 1;
          }
        }
      }
      const finish = metric => {
        const { totalDifference, ...summary } = metric;
        return { ...summary, meanChannelDifference: metric.comparedPixels ? totalDifference / (metric.comparedPixels * 3) : null };
      };
      const passed = floorLayerEnabled && floorProtectionOverlap === 0 && personChairFloorOverlapPixels === 0 &&
        preserved.comparedPixels > 0 && personChair.comparedPixels > 0 &&
        preserved.maximumChannelDifference <= 1 && personChair.maximumChannelDifference <= 1;
      return {
        verificationStatus: passed ? 'passed' : 'failed', allowedChannelRounding: 1,
        floorOverlayActive: floorLayerEnabled, rejectedOverlapPixels: floorProtectionOverlap, effectiveFloorAlphaPixels,
        testedTheme: 'dark', sourceTime: video?.currentTime ?? 0, sourceFrame: frame,
        preservedForeground: { ...finish(preserved), floorAlphaExcludedPixels,
          scope: 'Fully opaque static and current-frame dynamic foreground; excludes only nonzero effective current-frame floor alpha.' },
        personChair: { ...finish(personChair), roi: personChairRoi, floorAlphaOverlapPixels: personChairFloorOverlapPixels,
          scope: 'Opaque protected geometry in the person/chair ROI, using current-frame green inside the validated floor strip and static protection elsewhere; no floor-alpha exclusions are allowed.' },
        floorProtectionGuard,
      };
    },
    dispose() {
      disposed = true;
      textures.forEach(tex => gl.deleteTexture(tex));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}
