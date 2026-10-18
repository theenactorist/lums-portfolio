const ASSET_PATH = "./assets/";

const NETWORKS = Object.freeze({
  arbitrum: { name: "Arbitrum", icon: "network-arbitrum.svg", feeMinor: 14500, rateFactor: 1.00018, confirmations: 3 },
  base: { name: "Base", icon: "network-base.svg", feeMinor: 10700, rateFactor: 1, confirmations: 3 },
  celo: { name: "Celo", icon: "network-celo.svg", feeMinor: 4500, rateFactor: 1.00031, confirmations: 3 },
  ethereum: { name: "Ethereum", icon: "network-ethereum.svg", feeMinor: 235000, rateFactor: 0.99972, confirmations: 3 },
  optimism: { name: "Optimism", icon: "network-optimism.svg", feeMinor: 18500, rateFactor: 1.00011, confirmations: 3 },
  polygon: { name: "Polygon", icon: "network-polygon.svg", feeMinor: 26000, rateFactor: 0.99992, confirmations: 3 },
  plasma: { name: "Plasma", icon: "network-plasma.svg", feeMinor: 9000, rateFactor: 1.00024, confirmations: 3 },
  bitcoin: { name: "Bitcoin network", icon: "network-bitcoin.svg", feeMinor: 120000, rateFactor: 0.9998, confirmations: 2 },
  spark: { name: "Spark network", icon: "network-spark.svg", feeMinor: 7500, rateFactor: 1.0002, confirmations: 1 },
});

const ASSETS = Object.freeze({
  USDT: { name: "Tether", icon: "asset-usdt.svg", precision: 6, rate: 1470, networks: ["arbitrum", "base", "celo", "ethereum", "optimism", "polygon", "plasma"] },
  USDC: { name: "USD Coin", icon: "asset-usdc.svg", precision: 6, rate: 1468, networks: ["arbitrum", "base", "celo", "ethereum", "optimism", "polygon", "plasma"] },
  XAUT: { name: "Tether Gold", icon: "asset-xaut.svg", precision: 6, rate: 4710000, networks: ["arbitrum", "ethereum", "polygon", "plasma"] },
  BTC: { name: "Bitcoin", icon: "asset-btc.svg", precision: 8, rate: 156500000, networks: ["bitcoin", "spark"] },
});

const DEFAULT_PARTNER_THEME = Object.freeze({ logoText: "Northstar", accentColor: "#635BFF", cornerRadius: 28 });
const PARTNERS = Object.freeze({
  northstar: Object.freeze(normalizeTheme(globalThis.PULSE_CHECKOUT_CONFIG?.theme, DEFAULT_PARTNER_THEME)),
  cedar: Object.freeze({ logoText: "Cedar", accentColor: "#0A7A5B", cornerRadius: 18 }),
});

const DESTINATIONS = Object.freeze({
  evm: { address: "0x000000000000000000000000000000000000dEaD", qr: "qr-demo.svg" },
  bitcoin: { address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT", qr: "qr-demo-bitcoin.svg" },
  spark: { address: "sp1qrelaydemo0000000000000000000000000000000", qr: "qr-demo-spark.svg" },
});

const DEFAULT_ORDER = Object.freeze({
  id: "DTB-8X4J2",
  itemName: "Dangote T-Bill",
  amount: Object.freeze({ minorUnits: 100000000, currency: "NGN", locale: "en-NG" }),
  quoteTtlSeconds: 600,
});

const PAYMENT_PHASES = new Set(["waiting", "detected", "confirming", "screening", "complete", "underpaid", "overpaid", "expired", "hold", "failed"]);
const TERMINAL_PHASES = new Set(["complete", "underpaid", "overpaid", "expired", "hold", "failed"]);

const dialog = document.querySelector("#checkoutDialog");
const checkoutShell = document.querySelector("#checkoutShell");
const screenStack = document.querySelector("#screenStack");
const flowProgress = document.querySelector("#flowProgress");
const liveRegion = document.querySelector("#liveRegion");
const openButton = document.querySelector("#openCheckout");
const closeButton = document.querySelector("#closeCheckout");
const hostBrand = document.querySelector(".host-brand");
const hostBrandName = document.querySelector(".host-brand > span:last-child");
const hostBrandMark = document.querySelector(".host-brand__mark");
const sdkDialogTitle = document.querySelector("#sdkDialogTitle");
const sdkOrderItem = document.querySelector("#sdkOrderItem");
const sdkOrderAmount = document.querySelector("#sdkOrderAmount");
const sdkOrderReference = document.querySelector("#sdkOrderReference");
const ORDER = normalizeOrder(window.PULSE_CHECKOUT_CONFIG?.order || DEFAULT_ORDER);
let state = createState();
let lifecycleTimers = new Map();
let quoteClock = null;
let copyTimer = null;
let presentationTimer = null;
let announcementTimer = null;
let searchAnnouncementTimer = null;
let lastOpener = openButton;

function normalizeOrder(input) {
  const source = input && typeof input === "object" ? input : DEFAULT_ORDER;
  const amount = source.amount && typeof source.amount === "object" ? source.amount : DEFAULT_ORDER.amount;
  const minorUnits = Number(amount.minorUnits);
  if (!String(source.id || "").trim() || !String(source.itemName || "").trim()) throw new TypeError("An order id and item name are required.");
  if (String(amount.currency || "").toUpperCase() !== "NGN") throw new TypeError("This prototype supports NGN orders only.");
  if (!Number.isSafeInteger(minorUnits) || minorUnits <= 0) throw new TypeError("The order amount must be a positive integer.");
  const quoteTtlSeconds = Math.min(3600, Math.max(30, Number(source.quoteTtlSeconds) || 600));
  const amountMajor = minorUnits / 100;
  return {
    id: String(source.id),
    product: String(source.itemName),
    amountMinorUnits: minorUnits,
    amountMajor,
    fiatAmount: new Intl.NumberFormat(amount.locale || "en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: minorUnits % 100 === 0 ? 0 : 2,
      maximumFractionDigits: minorUnits % 100 === 0 ? 0 : 2,
    }).format(amountMajor),
    quoteTtlSeconds,
  };
}

function normalizeTheme(input, fallback) {
  const source = input && typeof input === "object" ? input : fallback;
  const logoText = String(source.logoText || fallback.logoText).trim().slice(0, 40) || fallback.logoText;
  const candidateAccent = String(source.accentColor || fallback.accentColor).trim();
  const accentColor = globalThis.CSS?.supports?.("color", candidateAccent) ? candidateAccent : fallback.accentColor;
  const radius = Number(source.cornerRadius);
  const cornerRadius = Number.isFinite(radius) ? Math.min(36, Math.max(12, radius)) : fallback.cornerRadius;
  return { logoText, accentColor, cornerRadius };
}

function conceptDefaults(concept) {
  const common = {
    routeId: null,
    selectedAsset: null,
    expandedAsset: null,
    query: "",
    quoteExpiresAt: null,
    quoteRevision: 0,
    qrOpen: false,
    status: "idle",
    confirmations: 0,
    forced: null,
    attemptId: 0,
  };
  if (concept === "a") return { ...common, screen: "choose" };
  if (concept === "b") return { ...common, stage: "route", pickerOpen: true };
  if (concept === "c") return { ...common, step: 0, payRevealed: false };
  return { ...common, stage: 0 };
}

function createState() {
  return {
    concept: "a",
    visualStyle: "revolut",
    partnerId: "northstar",
    concepts: {
      a: conceptDefaults("a"),
      b: conceptDefaults("b"),
      c: conceptDefaults("c"),
      d: conceptDefaults("d"),
    },
  };
}

function activeState(source = state) {
  return source.concepts[source.concept];
}

function cloneForConcept(source, concept = source.concept) {
  return {
    ...source,
    concepts: {
      ...source.concepts,
      [concept]: { ...source.concepts[concept] },
    },
  };
}

function reducer(source, action) {
  if (action.type === "SWITCH_CONCEPT") return { ...source, concept: action.concept };
  if (action.type === "SWITCH_STYLE") return { ...source, visualStyle: action.visualStyle };
  if (action.type === "SWITCH_PARTNER") return { ...source, partnerId: action.partnerId };

  const concept = action.concept || source.concept;
  let next = cloneForConcept(source, concept);
  let current = next.concepts[concept];

  if (action.attemptId != null && action.attemptId !== current.attemptId) return source;

  switch (action.type) {
    case "RESET":
      next.concepts[concept] = conceptDefaults(concept);
      return next;
    case "SEARCH":
      current.query = action.query;
      return next;
    case "TOGGLE_ASSET":
      current.expandedAsset = current.expandedAsset === action.symbol ? null : action.symbol;
      return next;
    case "SELECT_ASSET":
      if (!ASSETS[action.symbol]) return source;
      current.selectedAsset = action.symbol;
      current.expandedAsset = action.symbol;
      if (current.routeId && routeParts(current.routeId).symbol !== action.symbol) current.routeId = null;
      current.status = "idle";
      current.forced = null;
      return next;
    case "SELECT_ROUTE": {
      if (!validRoute(action.routeId)) return source;
      const { symbol } = routeParts(action.routeId);
      current.routeId = action.routeId;
      current.selectedAsset = symbol;
      current.expandedAsset = symbol;
      current.quoteRevision += 1;
      current.quoteExpiresAt = concept === "d" ? Date.now() + ORDER.quoteTtlSeconds * 1000 : null;
      current.status = "idle";
      current.forced = null;
      current.confirmations = 0;
      current.payRevealed = false;
      current.qrOpen = false;
      current.attemptId += 1;
      if (concept === "d") current.stage = 1;
      return next;
    }
    case "A_CONTINUE":
      if (!current.routeId) return source;
      current.quoteExpiresAt = Date.now() + ORDER.quoteTtlSeconds * 1000;
      current.screen = "payment";
      return next;
    case "A_BACK":
      if (current.status !== "idle") return source;
      current.quoteExpiresAt = null;
      current.screen = "choose";
      return next;
    case "B_TOGGLE_PICKER":
      if (current.status !== "idle") return source;
      current.pickerOpen = !current.pickerOpen;
      return next;
    case "B_USE_ROUTE":
      if (!current.routeId) return source;
      current.pickerOpen = false;
      current.stage = "route";
      return next;
    case "B_REVIEW":
      if (!current.routeId) return source;
      current.quoteExpiresAt = Date.now() + ORDER.quoteTtlSeconds * 1000;
      current.stage = "review";
      return next;
    case "B_SHOW_DETAILS":
      if (!current.routeId || isExpired(current)) return source;
      current.stage = "pay";
      return next;
    case "B_CHANGE_ROUTE":
      if (current.status !== "idle") return source;
      current.quoteExpiresAt = null;
      current.stage = "route";
      current.pickerOpen = true;
      return next;
    case "C_NEXT":
      if (current.step === 0 && current.routeId) {
        current.quoteExpiresAt = Date.now() + ORDER.quoteTtlSeconds * 1000;
        current.step = 1;
      }
      else if (current.step === 1 && !isExpired(current)) current.step = 2;
      else if (current.step === 2 && current.payRevealed) current.step = 3;
      return next;
    case "C_BACK":
      if (current.step > 0 && current.step < 3 && current.status === "idle") {
        current.step -= 1;
        if (current.step === 0) current.quoteExpiresAt = null;
      }
      return next;
    case "C_REVEAL_PAY":
      if (current.step === 2 && !isExpired(current)) current.payRevealed = true;
      return next;
    case "QR_TOGGLE":
      if (current.status !== "idle") return source;
      current.qrOpen = !current.qrOpen;
      return next;
    case "MARK_SENT":
      if (!current.routeId || isExpired(current)) return source;
      current.status = "waiting";
      current.quoteExpiresAt = null;
      current.confirmations = 0;
      current.forced = null;
      if (concept === "b") current.stage = "monitor";
      if (concept === "c") current.step = 3;
      if (concept === "d") current.stage = 1;
      return next;
    case "STATUS":
      if (!PAYMENT_PHASES.has(action.status) || TERMINAL_PHASES.has(current.status)) return source;
      current.status = action.status;
      current.confirmations = clampConfirmations(current, action.confirmations ?? current.confirmations);
      if (concept === "b" && action.status === "complete") current.stage = "result";
      if (concept === "b" && action.status !== "complete") current.stage = "monitor";
      if (concept === "c") current.step = 3;
      if (concept === "d") current.stage = dStageFromStatus(action.status);
      return next;
    case "EXPIRE":
      if (!current.routeId || current.status !== "idle") return source;
      current.status = "expired";
      current.quoteExpiresAt = Date.now() - 1;
      current.forced = action.forced ? "expired" : current.forced;
      if (concept === "a") current.screen = "payment";
      if (concept === "b") current.stage = "result";
      if (concept === "c") current.step = 2;
      if (concept === "d") current.stage = 1;
      return next;
    case "REFRESH_QUOTE":
      current.quoteRevision += 1;
      current.quoteExpiresAt = Date.now() + ORDER.quoteTtlSeconds * 1000;
      current.status = "idle";
      current.forced = null;
      current.attemptId += 1;
      current.qrOpen = false;
      if (concept === "a") current.screen = "payment";
      if (concept === "b") current.stage = "review";
      if (concept === "c") { current.step = 1; current.payRevealed = false; }
      if (concept === "d") current.stage = 1;
      return next;
    case "FORCE": {
      if (!PAYMENT_PHASES.has(action.status)) return source;
      if (!current.routeId) {
        current.routeId = "USDC:base";
        current.selectedAsset = "USDC";
        current.expandedAsset = "USDC";
        current.quoteRevision = 1;
        current.quoteExpiresAt = Date.now() + ORDER.quoteTtlSeconds * 1000;
      }
      current.attemptId += 1;
      current.status = action.status;
      current.forced = action.status;
      current.quoteExpiresAt = action.status === "expired" ? Date.now() - 1 : null;
      const requiredConfirmations = routeData(current)?.network.confirmations || 1;
      current.confirmations = action.status === "detected" ? Math.min(1, requiredConfirmations) : action.status === "confirming" ? intermediateConfirmationCount(requiredConfirmations) : action.status === "screening" || action.status === "hold" || action.status === "complete" ? requiredConfirmations : 0;
      if (concept === "a") current.screen = "payment";
      if (concept === "b") current.stage = TERMINAL_PHASES.has(action.status) ? "result" : "monitor";
      if (concept === "c") current.step = action.status === "expired" ? 2 : 3;
      if (concept === "d") current.stage = dStageFromStatus(action.status);
      return next;
    }
    default:
      return source;
  }
}

function dispatch(action, options = {}) {
  const previous = state;
  const actionConcept = action.concept || previous.concept;
  state = reducer(state, action);
  if (state === previous) return false;
  const globalAction = ["SWITCH_CONCEPT", "SWITCH_STYLE", "SWITCH_PARTNER"].includes(action.type);
  if (!globalAction && actionConcept !== state.concept) return true;
  syncGlobalPresentation();
  render(options);
  if (options.announcement) announce(options.announcement);
  return true;
}

function transitionPresentation(action, options = {}) {
  window.clearTimeout(presentationTimer);
  checkoutShell.classList.add("is-theme-switching");
  hostBrand.classList.add("is-theme-switching");
  presentationTimer = window.setTimeout(() => {
    dispatch(action, options);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      checkoutShell.classList.remove("is-theme-switching");
      hostBrand.classList.remove("is-theme-switching");
    }));
  }, 90);
}

function routeParts(routeId) {
  const [symbol, networkId] = String(routeId || "").split(":");
  return { symbol, networkId };
}

function validRoute(routeId) {
  const { symbol, networkId } = routeParts(routeId);
  return Boolean(ASSETS[symbol]?.networks.includes(networkId) && NETWORKS[networkId]);
}

function routeData(conceptState = activeState()) {
  if (!conceptState.routeId || !validRoute(conceptState.routeId)) return null;
  const { symbol, networkId } = routeParts(conceptState.routeId);
  return { symbol, networkId, asset: ASSETS[symbol], network: NETWORKS[networkId] };
}

function clampConfirmations(conceptState, value) {
  const maximum = routeData(conceptState)?.network.confirmations || 1;
  return Math.max(0, Math.min(maximum, Number(value) || 0));
}

function intermediateConfirmationCount(maximum) {
  return maximum > 1 ? maximum - 1 : 1;
}

function quoteData(conceptState = activeState()) {
  const route = routeData(conceptState);
  if (!route) return null;
  const effectiveRate = route.asset.rate * route.network.rateFactor;
  const feeNgn = route.network.feeMinor / 100;
  const factorScale = 1_000_000;
  const factorUnits = Math.round(route.network.rateFactor * factorScale);
  const tokenScale = 10n ** BigInt(route.asset.precision);
  const numerator = (BigInt(ORDER.amountMinorUnits) + BigInt(route.network.feeMinor)) * BigInt(factorScale) * tokenScale;
  const denominator = 100n * BigInt(route.asset.rate) * BigInt(factorUnits);
  const amountUnits = ceilDivide(numerator, denominator);
  const amount = formatTokenUnits(amountUnits, route.asset.precision);
  return {
    amount,
    numericAmount: Number(amount),
    feeNgn,
    rateLabel: `₦${effectiveRate.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  };
}

function ceilDivide(numerator, denominator) {
  return (numerator + denominator - 1n) / denominator;
}

function formatTokenUnits(units, precision) {
  if (!precision) return units.toString();
  const raw = units.toString().padStart(precision + 1, "0");
  const whole = raw.slice(0, -precision);
  const fraction = raw.slice(-precision).replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : whole;
}

function trimFixed(value, precision) {
  return Number(value).toFixed(precision).replace(/(\.\d*?[1-9])0+$|\.0+$/, "$1");
}

function destinationData(conceptState = activeState()) {
  const route = routeData(conceptState);
  if (!route) return DESTINATIONS.evm;
  if (route.networkId === "bitcoin") return DESTINATIONS.bitcoin;
  if (route.networkId === "spark") return DESTINATIONS.spark;
  return DESTINATIONS.evm;
}

function isExpired(conceptState) {
  return conceptState.status === "expired" || Boolean(conceptState.quoteExpiresAt && Date.now() >= conceptState.quoteExpiresAt);
}

function dStageFromStatus(status) {
  if (status === "waiting" || status === "expired" || status === "failed") return 1;
  if (status === "detected" || status === "underpaid" || status === "overpaid") return 2;
  if (status === "confirming") return 3;
  if (status === "screening" || status === "hold") return 4;
  if (status === "complete") return 5;
  return 1;
}

function syncGlobalPresentation() {
  const partner = PARTNERS[state.partnerId];
  document.documentElement.dataset.visualVariant = state.visualStyle;
  document.documentElement.style.setProperty("--partner-accent", partner.accentColor);
  document.documentElement.style.setProperty("--partner-radius", `${partner.cornerRadius}px`);
  dialog.style.setProperty("--partner-accent", partner.accentColor);
  dialog.style.setProperty("--partner-radius", `${partner.cornerRadius}px`);
  hostBrandName.textContent = partner.logoText;
  hostBrand.setAttribute("aria-label", `${partner.logoText} home`);
  hostBrandMark.style.background = partner.accentColor;
  document.querySelectorAll("input[name='ui-style']").forEach((input) => { input.checked = input.value === state.visualStyle; });
  document.querySelectorAll("input[name='partner-theme']").forEach((input) => { input.checked = input.value === state.partnerId; });
  document.querySelectorAll("[data-concept]").forEach((button) => {
    if (!button.matches("[role='tab']")) return;
    const selected = button.dataset.concept === state.concept;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  screenStack.setAttribute("aria-labelledby", `conceptTab${state.concept.toUpperCase()}`);
  checkoutShell.dataset.concept = state.concept;
  sdkDialogTitle.textContent = `Pay with crypto for ${ORDER.product}`;
  sdkOrderItem.textContent = ORDER.product;
  sdkOrderAmount.textContent = ORDER.fiatAmount;
  sdkOrderReference.textContent = ORDER.id;
  document.title = `${partner.logoText} crypto checkout concepts | Lums`;
}

function render({ focus = null, preserveFocus = false, animate = false } = {}) {
  const activeElement = document.activeElement;
  const previousBody = screenStack.querySelector(".screen-body");
  const previousScrollTop = preserveFocus ? previousBody?.scrollTop || 0 : 0;
  const focusKey = preserveFocus ? activeElement?.dataset.focusKey : null;
  const preserveHeading = preserveFocus && activeElement?.matches?.("[data-screen-heading]");
  const activeWasInScreen = preserveFocus && screenStack.contains(activeElement);
  const openDetailsKeys = preserveFocus ? [...screenStack.querySelectorAll("details[open][data-persist-details]")].map((details) => details.dataset.persistDetails) : [];
  screenStack.setAttribute("aria-busy", "true");
  updateTopProgress();
  const templates = { a: renderConceptA, b: renderConceptB, c: renderConceptC, d: renderConceptD };
  screenStack.innerHTML = `<section class="screen-layer concept-view concept-view--${state.concept} ${animate ? "is-entering" : ""}">${templates[state.concept]()}</section>`;
  openDetailsKeys.forEach((key) => screenStack.querySelector(`[data-persist-details="${CSS.escape(key)}"]`)?.setAttribute("open", ""));
  screenStack.setAttribute("aria-busy", "false");
  syncDevState();
  window.requestAnimationFrame(() => {
    if (preserveFocus) {
      const nextBody = screenStack.querySelector(".screen-body");
      if (nextBody) nextBody.scrollTop = previousScrollTop;
    }
    const keyedTarget = focusKey ? screenStack.querySelector(`[data-focus-key="${CSS.escape(focusKey)}"]`) : null;
    if (keyedTarget && !keyedTarget.matches(":disabled")) keyedTarget.focus({ preventScroll: true });
    else if (preserveHeading) screenStack.querySelector("[data-screen-heading]")?.focus({ preventScroll: true });
    else if (activeWasInScreen) screenStack.querySelector("[data-screen-heading]")?.focus({ preventScroll: true });
    else if (focus) screenStack.querySelector(focus)?.focus({ preventScroll: true });
  });
}

function updateTopProgress() {
  const current = activeState();
  if (state.concept === "c" || state.concept === "d") {
    flowProgress.hidden = true;
    return;
  }
  flowProgress.hidden = false;
  const paymentReached = state.concept === "a" ? current.screen === "payment" : current.stage !== "route";
  flowProgress.innerHTML = `<span class="is-complete"></span><span class="${paymentReached ? "is-active" : ""}"></span>`;
}

function renderConceptA() {
  const current = activeState();
  if (current.screen === "choose") return renderAChooser(current);
  return renderAPayment(current);
}

function renderAChooser(current) {
  return `
    <div class="screen-body composer-body">
      <h2 class="sr-only" tabindex="-1" data-screen-heading>Choose crypto and network</h2>
      ${searchField(current, "Search crypto or network")}
      <div class="result-label"><span>Crypto / coin</span><span>Then choose network</span></div>
      <div class="route-results">${accordionRoutes(current)}</div>
    </div>
    <div class="screen-actions composer-actions">
      ${routeAmountSummary(current)}
      <button class="button-primary" type="button" data-action="a-continue" ${current.routeId ? "" : "disabled"}>${current.routeId ? `Continue with ${routeLabel(current)}` : "Continue"}</button>
    </div>`;
}

function accordionRoutes(current) {
  const query = normalizeQuery(current.query);
  const groups = Object.entries(ASSETS).flatMap(([symbol, asset]) => {
    const assetMatch = !query || normalizeQuery(`${symbol} ${asset.name}`).includes(query);
    const matchingNetworks = asset.networks.filter((networkId) => normalizeQuery(NETWORKS[networkId].name).includes(query));
    if (query && !assetMatch && !matchingNetworks.length) return [];
    return [{ symbol, asset, networks: query && matchingNetworks.length ? matchingNetworks : asset.networks, autoOpen: Boolean(query && matchingNetworks.length) }];
  });
  if (!groups.length) return emptyRoutes(current.query);
  const visibleNetworkCount = groups.reduce((total, group) => total + group.networks.length, 0);
  const resultStatus = query ? `<span class="sr-only" data-search-status>${groups.length} crypto ${groups.length === 1 ? "option" : "options"} and ${visibleNetworkCount} network ${visibleNetworkCount === 1 ? "option" : "options"} found.</span>` : "";
  return `${resultStatus}<div class="route-list">${groups.map(({ symbol, asset, networks, autoOpen }) => {
    const expanded = current.expandedAsset === symbol || autoOpen;
    const selected = routeParts(current.routeId).symbol === symbol;
    return `<section class="asset-group">
      <button class="asset-trigger ${selected ? "is-selected" : ""}" type="button" data-asset-trigger="${symbol}" data-focus-key="asset-${symbol}" aria-expanded="${expanded}" ${expanded ? `aria-controls="a-networks-${symbol}"` : ""}>
        <span class="asset-icon"><img src="${ASSET_PATH}${asset.icon}" alt="" /></span>
        <span class="asset-copy"><strong>${symbol}</strong><span>${asset.name}</span></span>
        <span class="asset-quote"><b>${asset.networks.length} networks</b><span>${selected ? NETWORKS[routeParts(current.routeId).networkId].name : "Choose one"}</span></span>
        ${chevronIcon()}
      </button>
      ${expanded ? accordionNetworkRegion(symbol, networks, current) : ""}
    </section>`;
  }).join("")}</div>`;
}

function accordionNetworkRegion(symbol, networkIds, current) {
  return `<div class="network-chooser" id="a-networks-${symbol}">
    <div class="network-chooser__head"><strong>Choose network</strong><span>Match your sending wallet</span></div>
    <div class="network-grid" role="radiogroup" aria-label="${symbol} networks">
      ${networkIds.map((networkId) => networkOption(symbol, networkId, current, "a")).join("")}
    </div>
  </div>`;
}

function renderAPayment(current) {
  const route = routeData(current);
  return `
    <div class="screen-body payment-body">
      ${paymentHeading(current, true)}
      ${paymentDetails(current, { showQrToggle: true, locked: current.status !== "idle" })}
      ${walletHelp(route)}
    </div>
    <div class="screen-actions payment-dock" tabindex="-1" data-status="${current.status}">
      ${current.status === "idle" ? paymentReadyDock(current, "I’ve sent the payment") : statusPanel(current, "a")}
    </div>`;
}

function renderConceptB() {
  const current = activeState();
  return `<div class="screen-body b-body">
      <section class="b-surface" aria-labelledby="b-title">
        ${renderBContent(current)}
      </section>
    </div>
    <div class="screen-actions b-action-dock">${renderBAction(current)}</div>`;
}

function renderBContent(current) {
  const route = routeData(current);
  if (current.stage === "route") {
    return `<header class="concept-heading"><span class="concept-kicker">Pay securely</span><h2 id="b-title" tabindex="-1" data-screen-heading>Choose how to pay</h2><p>Pick a crypto you already have.</p></header>
      ${current.routeId && !current.pickerOpen ? compactRouteSummary(current, true) : ""}
      ${current.pickerOpen ? `<div class="b-picker">${inlineRoutePicker(current, "b")}</div>` : ""}`;
  }
  if (current.stage === "review") {
    const quote = quoteData(current);
    return `<header class="concept-heading"><span class="concept-kicker">Ready to pay</span><h2 id="b-title" tabindex="-1" data-screen-heading>${quote.amount} ${route.symbol}</h2><p>${networkDescriptor(route.network.name)}</p></header>
      <dl class="b-review-list">
        <div><dt>You’re paying for</dt><dd>${escapeHtml(ORDER.product)}</dd></div>
        <div><dt>Amount in naira</dt><dd>${ORDER.fiatAmount}</dd></div>
        <div><dt>Rate</dt><dd>1 ${route.symbol} = ${quote.rateLabel}</dd></div>
        <div><dt>Rate held for</dt><dd>${timerMarkup(current)}</dd></div>
      </dl>
      <button class="text-action" type="button" data-action="b-change-route">Change crypto</button>`;
  }
  if (current.stage === "pay" && current.status === "idle") {
    return `<header class="concept-heading"><span class="concept-kicker">Send this amount</span><h2 id="b-title" tabindex="-1" data-screen-heading>${quoteData(current).amount} ${route.symbol}</h2><p>${networkDescriptor(route.network.name)}</p></header>
      ${quoteExpiryNotice(current)}
      ${paymentDetails(current, { showQrToggle: true, compact: true })}
      ${walletHelp(route)}`;
  }
  return `<header class="concept-heading concept-heading--status"><span class="concept-kicker">Payment status</span><h2 id="b-title" tabindex="-1" data-screen-heading>${statusTitle(current.status)}</h2></header>
    <details class="b-payment-disclosure" data-persist-details="b-payment-disclosure"><summary data-focus-key="b-payment-disclosure">Payment details ${chevronIcon()}</summary>${paymentDetails(current, { compact: true, locked: true, hideToggle: true })}</details>
    ${statusPanel(current, "b")}`;
}

function renderBAction(current) {
  if (current.stage === "route") {
    if (current.pickerOpen) return `<button class="button-primary" type="button" data-action="b-use-route" ${current.routeId ? "" : "disabled"}>${current.routeId ? `Use ${routeLabel(current)}` : "Choose crypto and network"}</button>`;
    return `<button class="button-primary" type="button" data-action="b-review">Review payment</button>`;
  }
  if (current.stage === "review") return `<button class="button-primary" type="button" data-action="b-show-details">Show payment details</button>`;
  if (current.stage === "pay" && current.status === "idle") return `<button class="button-primary" type="button" data-action="mark-sent">I’ve sent the payment</button>`;
  return statusPrimaryAction(current, "b");
}

function renderConceptC() {
  const current = activeState();
  const actions = renderCActions(current);
  return `${wizardRail(current)}<div class="screen-body c-body">${renderCStep(current)}</div>${actions ? `<div class="screen-actions c-actions">${actions}</div>` : ""}`;
}

function wizardRail(current) {
  const labels = ["Choose", "Quote", "Pay", "Track"];
  return `<div class="c-rail" role="group" aria-label="Checkout progress"><ol>${labels.map((label, index) => {
    const complete = index < current.step || (index === 3 && current.status === "complete");
    const issue = index === current.step && TERMINAL_PHASES.has(current.status) && current.status !== "complete";
    return `<li class="${complete ? "is-complete" : ""} ${index === current.step ? "is-current" : ""} ${issue ? "has-issue" : ""}" ${index === current.step ? 'aria-current="step"' : ""}><span>${complete ? checkIcon() : index + 1}</span><b>${label}</b><span class="sr-only">${complete ? "Completed" : index === current.step ? "Current step" : "Upcoming"}</span></li>`;
  }).join("")}</ol></div>`;
}

function renderCStep(current) {
  if (current.step === 0) return `<header class="concept-heading"><span class="concept-kicker">Choose route</span><h2 tabindex="-1" data-screen-heading>Choose crypto and network</h2><p>Choose the same network shown in your sending wallet.</p></header>${inlineRoutePicker(current, "c", true)}`;
  if (current.step === 1) {
    const route = routeData(current);
    const quote = quoteData(current);
    return `<header class="concept-heading"><span class="concept-kicker">Quote locked</span><h2 tabindex="-1" data-screen-heading>Your quote is locked</h2><p>We’ll hold this rate for ${formatDuration(ORDER.quoteTtlSeconds)} so the amount stays predictable.</p></header>
      <section class="c-quote"><span>Exact amount</span><strong>${quote.amount} ${route.symbol}</strong><b>${networkDescriptor(route.network.name)}</b></section>
      <dl class="c-disclosure-list"><div><dt>Investment</dt><dd>${ORDER.fiatAmount}</dd></div><div><dt>Rate</dt><dd>1 ${route.symbol} = ${quote.rateLabel}</dd></div><div><dt>Network cost</dt><dd>₦${quote.feeNgn.toLocaleString("en-NG")}</dd></div><div><dt>Expires in</dt><dd>${timerMarkup(current)}</dd></div></dl>
      <p class="c-safety-copy">Crypto transfers can’t be reversed. Check the amount and network on the next screen.</p>`;
  }
  if (current.step === 2 && current.status === "idle") {
    const route = routeData(current);
    const quote = quoteData(current);
    if (!current.payRevealed) return `<header class="concept-heading"><span class="concept-kicker">Safety check</span><h2 tabindex="-1" data-screen-heading>Check before you send</h2><p>The crypto, network, and amount must all match.</p></header>
      ${quoteExpiryNotice(current)}
      <section class="c-send-preflight"><strong>${quote.amount} ${route.symbol}</strong><span>${networkDescriptor(route.network.name)}</span></section>
      <div class="c-warning" role="note">${alertIcon()}<div><strong>Use ${route.network.name} only</strong><p>A different network will not reach this payment.</p></div></div>`;
    return `<header class="concept-heading"><span class="concept-kicker">Payment details</span><h2 tabindex="-1" data-screen-heading>Send exactly ${quote.amount} ${route.symbol}</h2><p>Copy both details into your wallet.</p></header>
      ${quoteExpiryNotice(current)}
      <div class="c-route-guard">${alertIcon()}<strong>${route.symbol} on ${route.network.name} only</strong></div>
      ${paymentDetails(current, { showQrToggle: true })}${walletHelp(route)}`;
  }
  if (current.step === 2 && current.status === "expired") {
    return `<header class="concept-heading"><span class="concept-kicker">Quote expired</span><h2 tabindex="-1" data-screen-heading>Payment details expired</h2><p>Create fresh details before opening your wallet.</p></header>${statusPanel(current, "c")}`;
  }
  return `<header class="concept-heading"><span class="concept-kicker">Tracking payment</span><h2 tabindex="-1" data-screen-heading>${statusTitle(current.status)}</h2><p>${trackTeachingLine(current.status)}</p></header>${statusPanel(current, "c")}`;
}

function renderCActions(current) {
  if (current.step === 0) return `<button class="button-primary" type="button" data-action="c-next" ${current.routeId ? "" : "disabled"}>Get quote</button>`;
  if (current.step === 1) return `<button class="button-secondary" type="button" data-action="c-back">Back</button><button class="button-primary" type="button" data-action="c-next">Use this quote</button>`;
  if (current.step === 2 && current.status === "idle") {
    if (!current.payRevealed) return `<button class="button-secondary" type="button" data-action="c-back">Back</button><button class="button-primary" type="button" data-action="c-reveal-pay">I understand, show address</button>`;
    return `<button class="button-primary" type="button" data-action="mark-sent">I’ve sent ${routeLabel(current)}</button>`;
  }
  return statusActions(current);
}

function renderConceptD() {
  const current = activeState();
  const activeStage = current.routeId ? dStageFromStatus(current.status) : 0;
  const stages = [current.routeId ? "Quote locked" : "Choose route", "Awaiting payment", "Detected", "Confirming", current.status === "hold" ? "Review" : "Converting", "Funded"];
  const actionContent = current.routeId && current.status === "idle" ? `<button class="button-primary" type="button" data-action="mark-sent">I’ve sent the payment</button>` : TERMINAL_PHASES.has(current.status) ? statusActions(current) : "";
  const action = actionContent ? `<div class="screen-actions d-action-dock">${actionContent}</div>` : "";
  return `<div class="screen-body d-body"><header class="concept-heading d-heading"><span class="concept-kicker">Live settlement</span><h2 tabindex="-1" data-screen-heading>Live payment ticket</h2><p>Every stage stays visible until your investment is funded.</p></header>
    <ol class="d-timeline" aria-label="Live settlement timeline">${stages.map((label, index) => renderDStage(current, label, index, activeStage)).join("")}</ol>
  </div>${action}`;
}

function renderDStage(current, label, index, activeStage) {
  const complete = index < activeStage || (index === 5 && current.status === "complete");
  const active = index === activeStage;
  const attention = active && TERMINAL_PHASES.has(current.status) && current.status !== "complete";
  const stageState = complete ? "Complete" : active ? attention ? "Needs attention" : "Current" : "Upcoming";
  return `<li class="d-stage ${complete ? "is-complete" : ""} ${active ? "is-active" : ""} ${attention ? "has-attention" : ""}">
    <div class="d-marker" aria-hidden="true">${complete ? checkIcon() : index + 1}</div>
    <div class="d-stage__content">
      <header><div><h3 ${active ? 'aria-current="step"' : ""}>${label}</h3><span>${dStageSummary(current, index, activeStage)}</span></div><b>${stageState}</b></header>
      ${active ? `<div class="d-stage__body">${renderDStageBody(current, index)}</div>` : ""}
    </div>
  </li>`;
}

function renderDStageBody(current, index) {
  if (TERMINAL_PHASES.has(current.status) && current.status !== "complete") return statusPanel(current, "d");
  if (index === 0) return `<p class="d-stage-copy">Choose a crypto and network to lock the exact amount.</p>${inlineRoutePicker(current, "d", true)}`;
  if (index === 1 && current.status === "waiting") return `<div class="d-watch"><span class="d-watch__pulse">${pulseIcon()}</span><div><strong>Watching this address</strong><p>You can close this sheet. The payment will keep updating.</p></div></div>${paymentDetails(current, { compact: true, locked: true, hideToggle: true })}`;
  if (index === 1) return `${paymentDetails(current, { showQrToggle: true, compact: true })}<div class="d-live-actions"><span>${pulseIcon()}Watching this address</span></div>`;
  if (index === 2) {
    const confirmationTarget = routeData(current).network.confirmations;
    const detectedCount = Math.min(1, confirmationTarget);
    return `<div class="d-telemetry"><strong>${quoteData(current).amount} ${routeData(current).symbol}</strong><span>Payment found on ${routeData(current).network.name}</span></div><progress max="${confirmationTarget}" value="${detectedCount}" aria-label="${detectedCount} of ${confirmationTarget} confirmations"></progress>`;
  }
  if (index === 3) return `<div class="d-counter"><strong>${Math.max(1, current.confirmations)} / ${routeData(current).network.confirmations}</strong><span>network confirmations</span></div><progress max="${routeData(current).network.confirmations}" value="${Math.max(1, current.confirmations)}" aria-label="${Math.max(1, current.confirmations)} of ${routeData(current).network.confirmations} confirmations"></progress>`;
  if (index === 4) return `<div class="d-telemetry">${pulseIcon()}<div><strong>Converting to naira</strong><span>Payment confirmed. Final checks are running.</span></div></div>`;
  return `<div class="d-funded">${checkIcon()}<div><strong>Investment funded</strong><span>${ORDER.fiatAmount} applied to ${escapeHtml(ORDER.product)}.</span></div></div>`;
}

function dStageSummary(current, index, activeStage) {
  const route = routeData(current);
  if (index === 0) return route ? current.status === "idle" ? `${route.symbol} on ${route.network.name} · ${timerMarkup(current)}` : `${route.symbol} on ${route.network.name}` : "Choose route";
  if (index === 1) return route ? `${quoteData(current).amount} ${route.symbol}` : "Payment details next";
  if (index === 2) return activeStage > 2 ? "Payment found" : activeStage === 2 ? "Chain watch active" : "Waiting";
  if (index === 3) return activeStage > 3 ? "Confirmed" : `${current.confirmations} confirmations`;
  if (index === 4) return activeStage > 4 ? "Converted" : "Final checks";
  return current.status === "complete" ? ORDER.fiatAmount : "Investment pending";
}

function inlineRoutePicker(current, concept, loudWarning = false) {
  const query = normalizeQuery(current.query);
  const visibleAssets = Object.entries(ASSETS).filter(([symbol, asset]) => {
    if (!query) return true;
    return normalizeQuery(`${symbol} ${asset.name} ${asset.networks.map((id) => NETWORKS[id].name).join(" ")}`).includes(query);
  });
  const selected = current.selectedAsset ? ASSETS[current.selectedAsset] : null;
  const networks = selected ? selected.networks.filter((networkId) => !query || normalizeQuery(`${current.selectedAsset} ${selected.name} ${NETWORKS[networkId].name}`).includes(query)) : [];
  return `<div class="inline-route-picker inline-route-picker--${concept}">
    ${searchField(current, "Find crypto or network", concept)}
    ${query ? `<span class="sr-only" data-search-status>${visibleAssets.length} crypto ${visibleAssets.length === 1 ? "option" : "options"} found${selected ? `; ${networks.length} network ${networks.length === 1 ? "option" : "options"} shown` : ""}.</span>` : ""}
    <div class="asset-choice-row" role="group" aria-label="Choose crypto">
      ${visibleAssets.map(([symbol, asset]) => `<button class="asset-choice ${current.selectedAsset === symbol ? "is-selected" : ""}" type="button" data-select-asset="${symbol}" data-focus-key="${concept}-asset-${symbol}" aria-pressed="${current.selectedAsset === symbol}"><img src="${ASSET_PATH}${asset.icon}" alt="" /><span><strong>${symbol}</strong><small>${asset.name}</small></span></button>`).join("") || `<p class="route-empty">No supported crypto found.</p>`}
    </div>
    ${selected ? `<fieldset class="inline-networks"><legend>Choose network</legend>${loudWarning ? `<p class="inline-network-note">Choose the same network shown in your wallet.</p>` : ""}<div>${networks.map((networkId) => networkOption(current.selectedAsset, networkId, current, concept)).join("") || `<p class="route-empty">No matching network.</p>`}</div></fieldset>` : `<p class="picker-prompt">Choose a crypto to see its networks.</p>`}
  </div>`;
}

function networkOption(symbol, networkId, current, concept) {
  const network = NETWORKS[networkId];
  const routeId = `${symbol}:${networkId}`;
  const selected = current.routeId === routeId;
  return `<div>
    <input class="network-input" id="${concept}-route-${symbol}-${networkId}" name="${concept === "a" ? `${concept}-route-${symbol}` : `${concept}-route`}" type="radio" value="${routeId}" data-route-choice data-focus-key="${concept}-route-${symbol}-${networkId}" ${selected ? "checked" : ""} />
    <label class="network-option ${selected ? "is-selected" : ""}" for="${concept}-route-${symbol}-${networkId}"><img src="${ASSET_PATH}${network.icon}" alt="" /><span>${network.name}</span><i class="network-check" aria-hidden="true">${checkIcon()}</i></label>
  </div>`;
}

function searchField(current, label, scope = "a") {
  return `<div class="route-search concept-search">${searchIcon()}<div class="route-search__field"><input id="${scope}-route-search" data-route-search="${scope}" data-focus-key="${scope}-route-search" type="search" value="${escapeAttribute(current.query)}" placeholder="USDC, Base, Bitcoin" autocomplete="off" spellcheck="false" /><label for="${scope}-route-search">${label}</label></div>${current.query ? `<button class="search-clear" type="button" data-action="clear-search" aria-label="Clear search">${closeIcon()}</button>` : `<span aria-hidden="true"></span>`}</div>`;
}

function compactRouteSummary(current, changeable = false) {
  const route = routeData(current);
  const quote = quoteData(current);
  return `<section class="compact-route"><span class="asset-icon"><img src="${ASSET_PATH}${route.asset.icon}" alt="" /></span><div><strong>${route.symbol} on ${route.network.name}</strong><span>${quote.amount} ${route.symbol}</span></div>${changeable ? `<button type="button" data-action="b-toggle-picker">Change</button>` : ""}</section>`;
}

function routeAmountSummary(current) {
  if (!current.routeId) return `<div class="route-choice-summary"><span>Select crypto and network to see the final amount</span></div>`;
  const route = routeData(current);
  const quote = quoteData(current);
  return `<div class="route-choice-summary"><span>Amount to send</span><strong class="route-quote-amount">${quote.amount} ${route.symbol}</strong></div>`;
}

function routeLabel(current) {
  const route = routeData(current);
  return route ? `${route.symbol} on ${route.network.name}` : "crypto";
}

function networkDescriptor(name) {
  return /\bnetwork$/i.test(name) ? name : `${name} network`;
}

function paymentHeading(current, showBack) {
  const route = routeData(current);
  return `<header class="screen-heading screen-heading--payment">${showBack && current.status === "idle" ? `<button class="screen-back" type="button" data-action="a-back" aria-label="Back to route selection">${backIcon()}</button>` : `<span aria-hidden="true"></span>`}<div><h2 class="screen-title" tabindex="-1" data-screen-heading>Payment details</h2><p>${route.symbol} on ${route.network.name}</p></div><span aria-hidden="true"></span></header>`;
}

function paymentDetails(current, { showQrToggle = false, compact = false, locked = false, hideToggle = false } = {}) {
  const route = routeData(current);
  const quote = quoteData(current);
  const destination = destinationData(current);
  if (!route || !quote) return "";
  return `<section class="deposit-panel concept-payment-details ${compact ? "is-compact" : ""} ${current.qrOpen ? "is-qr-open" : ""} ${locked ? "is-locked" : ""}" aria-label="Payment details">
    ${showQrToggle && !hideToggle ? `<button class="qr-toggle" type="button" data-action="toggle-qr" data-focus-key="qr-toggle" aria-expanded="${current.qrOpen}" aria-controls="paymentQr" ${locked ? "disabled" : ""}>${qrIcon()}<span>${current.qrOpen ? "Hide QR code" : "Show QR code"}</span></button>` : ""}
    <div class="deposit-panel__grid">
      <div class="qr-pane" id="paymentQr"><div class="qr-frame"><img src="${ASSET_PATH}${destination.qr}" alt="QR code for ${route.symbol} on ${route.network.name} payment address" /><span class="qr-token" aria-hidden="true"><img src="${ASSET_PATH}${route.asset.icon}" alt="" /></span></div></div>
      <div class="deposit-data">
        <div class="deposit-row deposit-row--amount"><div class="deposit-row__copy"><span>Amount to send</span><strong>${quote.amount} ${route.symbol}</strong></div>${copyButton("amount", quote.amount, locked)}</div>
        <div class="deposit-row"><div class="deposit-row__copy"><span>Network</span><strong>${route.network.name}</strong></div><img class="network-mark" src="${ASSET_PATH}${route.network.icon}" alt="" /></div>
        <p class="route-guard">${infoIcon()}<span>Only send ${route.symbol} using ${route.network.name}.</span></p>
        <div class="deposit-row"><div class="deposit-row__copy"><span>Payment address</span><code dir="ltr" tabindex="0" data-focus-key="payment-address">${destination.address}</code></div>${copyButton("address", destination.address, locked)}</div>
      </div>
    </div>
  </section>`;
}

function copyButton(kind, value, locked = false) {
  return `<button class="copy-control" type="button" data-copy-kind="${kind}" data-copy-value="${escapeAttribute(value)}" aria-label="Copy ${kind}" ${locked ? "disabled" : ""}>${copyIcon()}<span>Copy</span></button>`;
}

function walletHelp(route) {
  return `<details class="wallet-help" data-persist-details="wallet-help"><summary data-focus-key="wallet-help-summary"><span>How to send from a wallet</span>${chevronIcon()}</summary><ol><li>Open Send or Withdraw in your wallet.</li><li>Choose ${route.symbol} and ${route.network.name}.</li><li>Paste the address, then enter the exact amount.</li></ol></details>`;
}

function paymentReadyDock(current, label) {
  const route = routeData(current);
  const quote = quoteData(current);
  return `<div class="dock-ready"><div class="dock-rate"><span>Rate expires in ${timerMarkup(current)}</span><span>1 ${route.symbol} = ${quote.rateLabel}</span></div><button class="button-primary" type="button" data-action="mark-sent">${label}</button><span class="action-note">${pulseIcon()}We’ll detect it automatically</span></div>`;
}

function statusPanel(current, concept) {
  const route = routeData(current);
  const quote = quoteData(current);
  const status = current.status;
  if (!route || !quote) return "";
  const data = statusData(current);
  const headingId = `${concept}-status-heading`;
  return `<section class="concept-status is-${data.tone}" data-status="${status}" aria-labelledby="${headingId}">
    <div class="concept-status__head"><span class="concept-status__icon" aria-hidden="true">${data.icon}</span><div><h3 id="${headingId}">${data.title}</h3><p>${data.body}</p></div></div>
    ${data.progress != null ? `<progress max="4" value="${data.progress}" aria-label="${data.progressLabel}"></progress>` : ""}
    ${data.metrics.length ? `<dl class="concept-status__metrics">${data.metrics.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>` : ""}
    ${data.note ? `<p class="concept-status__note">${data.note}</p>` : ""}
    ${concept === "a" ? `<div class="concept-status__actions">${statusActions(current)}</div>` : ""}
  </section>`;
}

function statusData(current) {
  const route = routeData(current);
  const quote = quoteData(current);
  const status = current.status;
  const mismatch = mismatchValues(current, status);
  const map = {
    waiting: { tone: "progress", icon: pulseIcon(), title: "Waiting for payment", body: "Keep this open or return later. We’ll update it automatically.", progress: 0, progressLabel: "Waiting for payment", metrics: [], note: "" },
    detected: { tone: "progress", icon: checkCircleIcon(), title: "Payment detected", body: `${quote.amount} ${route.symbol} arrived. Waiting for confirmation.`, progress: 1, progressLabel: "Payment detected, one of four stages", metrics: [], note: "" },
    confirming: { tone: "progress", icon: layersIcon(), title: `Confirming on ${route.network.name}`, body: `${Math.max(1, clampConfirmations(current, current.confirmations))} of ${route.network.confirmations} confirmations.`, progress: 2, progressLabel: "Network confirmation, two of four stages", metrics: [], note: "" },
    screening: { tone: "review", icon: shieldIcon(), title: "Final check", body: "Payment confirmed. We’re completing a routine verification.", progress: 3, progressLabel: "Final check, three of four stages", metrics: [], note: "" },
    complete: { tone: "success", icon: checkIcon(), title: "Investment funded", body: `${ORDER.fiatAmount} has been applied to ${escapeHtml(ORDER.product)}.`, progress: 4, progressLabel: "Investment funded", metrics: [["Paid", `${quote.amount} ${route.symbol}`], ["Reference", ORDER.id]], note: "" },
    underpaid: { tone: "warning", icon: alertIcon(), title: "Amount received is lower", body: "The payment needs review.", progress: null, progressLabel: "", metrics: [["Required", mismatch.required], ["Received", mismatch.received], ["Difference", mismatch.difference]], note: "Don’t send more unless support asks you to." },
    overpaid: { tone: "warning", icon: alertIcon(), title: "Amount received is higher", body: "We’re reviewing the difference.", progress: null, progressLabel: "", metrics: [["Required", mismatch.required], ["Received", mismatch.received], ["Difference", mismatch.difference]], note: "Don’t send another payment." },
    expired: { tone: "danger", icon: clockIcon(), title: "Payment details expired", body: "Create new details before sending.", progress: null, progressLabel: "", metrics: [], note: "Don’t use the old amount or address." },
    hold: { tone: "review", icon: shieldIcon(), title: "Payment under review", body: "Your funds are secure while we complete a routine review.", progress: 3, progressLabel: "Payment under review", metrics: [["Received", `${quote.amount} ${route.symbol}`], ["Reference", ORDER.id]], note: "Don’t send again." },
    failed: { tone: "danger", icon: closeCircleIcon(), title: "Payment couldn’t be confirmed", body: "If your wallet shows success, contact support before trying again.", progress: null, progressLabel: "", metrics: [], note: "" },
  };
  return map[status] || map.waiting;
}

function mismatchValues(current, status) {
  const route = routeData(current);
  const quote = quoteData(current);
  if (!route || !quote) return { required: "", received: "", difference: "" };
  const delta = route.symbol === "BTC" ? 0.00005 : route.symbol === "XAUT" ? 0.0005 : 5;
  const received = status === "underpaid" ? Math.max(0, quote.numericAmount - delta) : quote.numericAmount + delta;
  const precision = route.asset.precision;
  return {
    required: `${trimFixed(quote.numericAmount, precision)} ${route.symbol}`,
    received: `${trimFixed(received, precision)} ${route.symbol}`,
    difference: `${status === "underpaid" ? "−" : "+"}${trimFixed(delta, precision)} ${route.symbol}`,
  };
}

function statusActions(current) {
  const status = current.status;
  const partnerName = PARTNERS[state.partnerId].logoText;
  if (["waiting", "detected", "confirming", "screening"].includes(status)) return "";
  if (status === "complete") return `<button class="button-primary" type="button" data-action="return">Return to ${escapeHtml(partnerName)}</button><button class="button-secondary" type="button" data-action="receipt">View receipt</button>`;
  if (status === "underpaid" || status === "overpaid") return `<button class="button-primary" type="button" data-action="support">Contact support</button><button class="button-secondary" type="button" data-action="receipt">View transaction</button>`;
  if (status === "expired") return `<button class="button-primary" type="button" data-action="refresh">Create new details</button><button class="button-secondary" type="button" data-action="change-route">Choose another crypto</button>`;
  if (status === "hold") return `<button class="button-primary" type="button" data-action="close">Close for now</button><button class="button-secondary" type="button" data-action="support">Contact support</button>`;
  return `<button class="button-primary" type="button" data-action="support">Contact support</button><button class="button-secondary" type="button" data-action="refresh">Create new details</button>`;
}

function statusPrimaryAction(current) {
  const status = current.status;
  const partnerName = PARTNERS[state.partnerId].logoText;
  if (["waiting", "detected", "confirming", "screening"].includes(status)) return `<span class="b-auto-note">${pulseIcon()}Updates automatically</span>`;
  if (status === "complete") return `<button class="button-primary" type="button" data-action="return">Return to ${escapeHtml(partnerName)}</button>`;
  if (status === "expired") return `<button class="button-primary" type="button" data-action="refresh">Create new details</button>`;
  if (status === "hold") return `<button class="button-primary" type="button" data-action="close">Close for now</button>`;
  return `<button class="button-primary" type="button" data-action="support">Contact support</button>`;
}

function statusTitle(status) {
  return {
    waiting: "Waiting for payment",
    detected: "Payment detected",
    confirming: "Confirming payment",
    screening: "Final check",
    complete: "Investment funded",
    underpaid: "Amount received is lower",
    overpaid: "Amount received is higher",
    expired: "Payment details expired",
    hold: "Payment under review",
    failed: "Payment couldn’t be confirmed",
  }[status] || "Track payment";
}

function trackTeachingLine(status) {
  return {
    waiting: "We’re watching the payment address now.",
    detected: "Your payment arrived and the network is confirming it.",
    confirming: "Each confirmation makes the payment harder to reverse.",
    screening: "The chain is confirmed. We’re finishing routine checks.",
    complete: "The naira value is now applied to your investment.",
  }[status] || "Payment details remain attached to this attempt.";
}

function quoteExpiryNotice(current) {
  return `<div class="pay-expiry"><span>Rate expires in</span>${timerMarkup(current)}</div>`;
}

function timerMarkup(current) {
  return `<span class="quote-clock" role="timer" aria-live="off">${clockSmallIcon()}<span data-quote-timer data-expiry="${current.quoteExpiresAt || ""}">${formatClock(remainingSeconds(current))}</span></span>`;
}

function remainingSeconds(current) {
  if (!current.quoteExpiresAt) return ORDER.quoteTtlSeconds;
  return Math.max(0, Math.ceil((current.quoteExpiresAt - Date.now()) / 1000));
}

function formatClock(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const parts = [];
  if (minutes) parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  if (remainder) parts.push(`${remainder} ${remainder === 1 ? "second" : "seconds"}`);
  return parts.join(" ") || "0 seconds";
}

function emptyRoutes(query) {
  return `<div class="empty-results"><span class="sr-only" data-search-status>No supported routes found.</span>${searchIcon()}<strong>No supported routes</strong><p>Nothing matches “${escapeHtml(query)}”. Try a crypto or network name.</p><button type="button" data-action="clear-search">Clear search</button></div>`;
}

function normalizeQuery(value) {
  return String(value || "").toLowerCase().trim();
}

function announce(message) {
  window.clearTimeout(announcementTimer);
  liveRegion.textContent = "";
  announcementTimer = window.setTimeout(() => { liveRegion.textContent = message; }, 20);
}

function scheduleSearchAnnouncement() {
  window.clearTimeout(searchAnnouncementTimer);
  searchAnnouncementTimer = window.setTimeout(() => {
    const message = screenStack.querySelector("[data-search-status]")?.textContent?.trim();
    announce(message || "All supported routes shown.");
  }, 220);
}

function syncDevState() {
  const current = activeState();
  document.querySelectorAll("[data-force]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.force === current.forced)));
}

function startPaymentSequence(concept) {
  clearLifecycle(concept);
  const current = state.concepts[concept];
  const attemptId = current.attemptId;
  const confirmationTarget = routeData(current)?.network.confirmations || 1;
  const confirmingCount = intermediateConfirmationCount(confirmationTarget);
  const steps = [
    [1000, "detected", Math.min(1, confirmationTarget), "Payment detected."],
    [2400, "confirming", confirmingCount, "Payment is confirming."],
    [4200, "screening", confirmationTarget, "Payment confirmed. Final checks are running."],
    [6200, "complete", confirmationTarget, "Investment funded."],
  ];
  const timers = steps.map(([delay, status, confirmations, announcement]) => window.setTimeout(() => {
    const changed = dispatch({ type: "STATUS", concept, status, confirmations, attemptId }, { preserveFocus: state.concept === concept });
    if (changed && state.concept === concept) announce(announcement);
  }, delay));
  lifecycleTimers.set(concept, timers);
}

function clearLifecycle(concept) {
  (lifecycleTimers.get(concept) || []).forEach(window.clearTimeout);
  lifecycleTimers.delete(concept);
}

function updateQuoteClocks() {
  const now = Date.now();
  Object.entries(state.concepts).forEach(([concept, conceptState]) => {
    if (conceptState.routeId && conceptState.status === "idle" && conceptState.quoteExpiresAt && now >= conceptState.quoteExpiresAt) {
      dispatch({ type: "EXPIRE", concept }, { focus: concept === state.concept ? "[data-screen-heading]" : null, announcement: concept === state.concept ? "Payment details expired." : null });
    }
  });
  document.querySelectorAll("[data-quote-timer]").forEach((node) => {
    const expiry = Number(node.dataset.expiry);
    if (!expiry) return;
    const remaining = Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
    node.textContent = formatClock(remaining);
    node.closest(".quote-clock")?.classList.toggle("is-urgent", remaining <= 60);
  });
}

function handleClick(event) {
  const conceptTab = event.target.closest("[role='tab'][data-concept]");
  if (conceptTab) {
    dispatch({ type: "SWITCH_CONCEPT", concept: conceptTab.dataset.concept }, { animate: true, announcement: `Concept ${conceptTab.dataset.concept.toUpperCase()} selected.` });
    return;
  }

  const assetTrigger = event.target.closest("[data-asset-trigger]");
  if (assetTrigger) {
    dispatch({ type: "TOGGLE_ASSET", symbol: assetTrigger.dataset.assetTrigger }, { preserveFocus: true });
    return;
  }

  const assetChoice = event.target.closest("[data-select-asset]");
  if (assetChoice) {
    dispatch({ type: "SELECT_ASSET", symbol: assetChoice.dataset.selectAsset }, { preserveFocus: true, announcement: `${assetChoice.dataset.selectAsset} selected. Choose a network.` });
    return;
  }

  const forceButton = event.target.closest("[data-force]");
  if (forceButton) {
    clearLifecycle(state.concept);
    const status = forceButton.dataset.force;
    dispatch({ type: "FORCE", status }, { announcement: `${statusTitle(status)}.` });
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;

  if (action === "reset") {
    clearLifecycle(state.concept);
    dispatch({ type: "RESET" }, { announcement: `Concept ${state.concept.toUpperCase()} reset.` });
  } else if (action === "clear-search") {
    dispatch({ type: "SEARCH", query: "" }, { focus: "[data-route-search]", announcement: "All supported routes shown." });
  } else if (action === "a-continue") {
    dispatch({ type: "A_CONTINUE" }, { focus: "[data-screen-heading]", announcement: "Payment details ready." });
  } else if (action === "a-back") {
    dispatch({ type: "A_BACK" }, { focus: `[data-asset-trigger="${routeParts(activeState().routeId).symbol}"]` });
  } else if (action === "b-toggle-picker") {
    dispatch({ type: "B_TOGGLE_PICKER" }, { preserveFocus: true });
  } else if (action === "b-use-route") {
    dispatch({ type: "B_USE_ROUTE" }, { focus: "[data-screen-heading]", announcement: `${routeLabel(activeState())} selected.` });
  } else if (action === "b-review") {
    dispatch({ type: "B_REVIEW" }, { focus: "[data-screen-heading]" });
  } else if (action === "b-show-details") {
    dispatch({ type: "B_SHOW_DETAILS" }, { focus: "[data-screen-heading]", announcement: "Payment details ready." });
  } else if (action === "b-change-route") {
    dispatch({ type: "B_CHANGE_ROUTE" }, { focus: "[data-screen-heading]" });
  } else if (action === "c-next") {
    dispatch({ type: "C_NEXT" }, { focus: "[data-screen-heading]" });
  } else if (action === "c-back") {
    dispatch({ type: "C_BACK" }, { focus: "[data-screen-heading]" });
  } else if (action === "c-reveal-pay") {
    dispatch({ type: "C_REVEAL_PAY" }, { focus: "[data-screen-heading]", announcement: "Payment address shown." });
  } else if (action === "toggle-qr") {
    dispatch({ type: "QR_TOGGLE" }, { preserveFocus: true });
  } else if (action === "mark-sent") {
    const concept = state.concept;
    const changed = dispatch({ type: "MARK_SENT" }, { focus: "[data-screen-heading]", announcement: "Watching for your payment." });
    if (changed) startPaymentSequence(concept);
  } else if (action === "refresh") {
    clearLifecycle(state.concept);
    dispatch({ type: "REFRESH_QUOTE" }, { focus: "[data-screen-heading]", announcement: "New payment details created." });
  } else if (action === "change-route") {
    clearLifecycle(state.concept);
    dispatch({ type: "RESET" }, { focus: "[data-screen-heading]" });
  } else if (action === "return" || action === "close") {
    dialog.close();
  } else if (action === "support") {
    announce(`Support reference ${ORDER.id}.`);
    actionButton.textContent = `Reference ${ORDER.id}`;
  } else if (action === "receipt") {
    announce(`Payment reference ${ORDER.id}.`);
    actionButton.textContent = `Reference ${ORDER.id}`;
  }
}

function handleChange(event) {
  if (event.target.matches("[data-route-choice]")) {
    const focusOptions = state.concept === "d" ? { focus: "[data-screen-heading]" } : { preserveFocus: true };
    dispatch({ type: "SELECT_ROUTE", routeId: event.target.value }, { ...focusOptions, announcement: `${routeLabel({ ...activeState(), routeId: event.target.value })} selected.` });
  } else if (event.target.name === "ui-style") {
    transitionPresentation({ type: "SWITCH_STYLE", visualStyle: event.target.value }, { preserveFocus: true });
  } else if (event.target.name === "partner-theme") {
    transitionPresentation({ type: "SWITCH_PARTNER", partnerId: event.target.value }, { preserveFocus: true, announcement: `${PARTNERS[event.target.value].logoText} theme applied.` });
  }
}

function handleInput(event) {
  if (!event.target.matches("[data-route-search]")) return;
  const value = event.target.value;
  dispatch({ type: "SEARCH", query: value }, { preserveFocus: true });
  const input = screenStack.querySelector("[data-route-search]");
  input?.setSelectionRange(value.length, value.length);
  scheduleSearchAnnouncement();
}

function handleKeydown(event) {
  const tab = event.target.closest("[role='tab'][data-concept]");
  if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  const tabs = [...dialog.querySelectorAll("[role='tab'][data-concept]")];
  const currentIndex = tabs.indexOf(tab);
  let nextIndex = currentIndex;
  if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = tabs.length - 1;
  else nextIndex = (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
  event.preventDefault();
  tabs[nextIndex].focus();
  tabs[nextIndex].click();
}

async function handleCopy(event) {
  const button = event.target.closest("[data-copy-value]");
  if (!button || button.disabled) return;
  const value = button.dataset.copyValue;
  try {
    const copied = await copyText(value);
    if (!copied) throw new Error("Copy unavailable");
    const label = button.querySelector("span");
    if (label) label.textContent = "Copied";
    button.classList.add("is-copied");
    announce(`${button.dataset.copyKind === "address" ? "Address" : "Amount"} copied.`);
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
      if (label) label.textContent = "Copy";
      button.classList.remove("is-copied");
    }, 1400);
  } catch {
    announce("Couldn’t copy. Select the value and copy it manually.");
  }
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await Promise.race([
        navigator.clipboard.writeText(value),
        new Promise((_, reject) => window.setTimeout(() => reject(new Error("Clipboard timeout")), 650)),
      ]);
      return true;
    } catch {
      // Fall through to the native selection fallback for restricted webviews.
    }
  }
  const previousFocus = document.activeElement;
  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  dialog.append(field);
  field.focus({ preventScroll: true });
  field.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    field.remove();
    previousFocus?.focus?.({ preventScroll: true });
  }
  return copied;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function svg(paths, viewBox = "0 0 24 24") {
  return `<svg viewBox="${viewBox}" aria-hidden="true">${paths}</svg>`;
}

function searchIcon() { return svg('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>'); }
function closeIcon() { return svg('<path d="m7 7 10 10M17 7 7 17"/>'); }
function backIcon() { return svg('<path d="m15 18-6-6 6-6"/>'); }
function chevronIcon() { return svg('<path d="m7 10 5 5 5-5"/>'); }
function checkIcon() { return svg('<path d="m6.5 12.5 3.5 3.5 7.5-8"/>'); }
function checkCircleIcon() { return svg('<circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.3 2.3 4.8-5"/>'); }
function closeCircleIcon() { return svg('<circle cx="12" cy="12" r="8"/><path d="m9 9 6 6M15 9l-6 6"/>'); }
function alertIcon() { return svg('<path d="M12 4 3.8 19h16.4L12 4Z"/><path d="M12 9v4.5M12 16.5h.01"/>'); }
function infoIcon() { return svg('<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8h.01"/>'); }
function clockIcon() { return svg('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'); }
function clockSmallIcon() { return clockIcon(); }
function shieldIcon() { return svg('<path d="M12 3.5 19 6v5c0 4.4-2.5 7.5-7 9.5C7.5 18.5 5 15.4 5 11V6l7-2.5Z"/><path d="m9.5 12 1.8 1.8 3.5-3.6"/>'); }
function layersIcon() { return svg('<path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/>'); }
function copyIcon() { return svg('<rect x="8" y="8" width="10" height="10" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'); }
function qrIcon() { return svg('<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM15 14h2v2h-2zM18 17h2v3h-3M13 18h2v2h-2z"/>'); }
function pulseIcon() { return svg('<circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.8 4.8a10.2 10.2 0 0 0 0 14.4M19.2 4.8a10.2 10.2 0 0 1 0 14.4"/>'); }

openButton.addEventListener("click", () => {
  lastOpener = openButton;
  if (!dialog.open) dialog.showModal();
  render({ focus: "[data-screen-heading]" });
});
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", handleClick);
dialog.addEventListener("click", handleCopy);
dialog.addEventListener("change", handleChange);
dialog.addEventListener("input", handleInput);
dialog.addEventListener("keydown", handleKeydown);
dialog.addEventListener("close", () => lastOpener?.focus({ preventScroll: true }));
dialog.addEventListener("cancel", (event) => { event.preventDefault(); dialog.close(); });
document.addEventListener("visibilitychange", () => checkoutShell.classList.toggle("is-page-hidden", document.hidden));

syncGlobalPresentation();
render();
quoteClock = window.setInterval(updateQuoteClocks, 1000);
window.addEventListener("pagehide", (event) => {
  if (event.persisted) return;
  window.clearInterval(quoteClock);
  window.clearTimeout(presentationTimer);
  window.clearTimeout(announcementTimer);
  window.clearTimeout(searchAnnouncementTimer);
  lifecycleTimers.forEach((timers) => timers.forEach(window.clearTimeout));
});
window.setTimeout(() => {
  lastOpener = openButton;
  dialog.showModal();
  render({ focus: "[data-screen-heading]" });
}, 120);
