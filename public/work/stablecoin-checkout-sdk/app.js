const DEFAULT_ORDER = Object.freeze({
  id: "DTB-8X4J2",
  itemName: "Dangote T-Bill",
  amount: Object.freeze({ minorUnits: 100000000, currency: "NGN", locale: "en-NG" }),
  quoteTtlSeconds: 600,
});

const NETWORKS = Object.freeze({
  arbitrum: { name: "Arbitrum", icon: "network-arbitrum.svg", routeFeeMinorUnits: 14500 },
  base: { name: "Base", icon: "network-base.svg", routeFeeMinorUnits: 10700 },
  celo: { name: "Celo", icon: "network-celo.svg", routeFeeMinorUnits: 4500 },
  ethereum: { name: "Ethereum", icon: "network-ethereum.svg", routeFeeMinorUnits: 235000 },
  optimism: { name: "Optimism", icon: "network-optimism.svg", routeFeeMinorUnits: 18500 },
  polygon: { name: "Polygon", icon: "network-polygon.svg", routeFeeMinorUnits: 26000 },
  plasma: { name: "Plasma", icon: "network-plasma.svg", routeFeeMinorUnits: 9000 },
  bitcoin: { name: "Bitcoin network", icon: "network-bitcoin.svg", routeFeeMinorUnits: 120000 },
  spark: { name: "Spark network", icon: "network-spark.svg", routeFeeMinorUnits: 7500 },
});

const ASSETS = Object.freeze({
  USDT: {
    name: "Tether",
    icon: "asset-usdt.svg",
    precision: 6,
    networks: ["arbitrum", "base", "celo", "ethereum", "optimism", "polygon", "plasma"],
    rates: [1470, 1473],
  },
  USDC: {
    name: "USD Coin",
    icon: "asset-usdc.svg",
    precision: 6,
    networks: ["arbitrum", "base", "celo", "ethereum", "optimism", "polygon", "plasma"],
    rates: [1468, 1471],
  },
  XAUT: {
    name: "Tether Gold",
    icon: "asset-xaut.svg",
    precision: 6,
    networks: ["arbitrum", "ethereum", "polygon", "plasma"],
    rates: [4700000, 4720000],
  },
  BTC: {
    name: "Bitcoin",
    icon: "asset-btc.svg",
    precision: 8,
    networks: ["bitcoin", "spark"],
    rates: [156250000, 156800000],
  },
});

const PARTNERS = Object.freeze({
  northstar: Object.freeze({ logoText: "Northstar", accentColor: "#635BFF", cornerRadius: 28 }),
  cedar: Object.freeze({ logoText: "Cedar", accentColor: "#0A7A5B", cornerRadius: 18 }),
});

const ROUTES = Object.freeze(Object.fromEntries(
  Object.entries(ASSETS).flatMap(([symbol, asset]) => asset.networks.map((networkId) => {
    const id = `${symbol}:${networkId}`;
    return [id, Object.freeze({ id, symbol, networkId })];
  })),
));

const DESTINATIONS = Object.freeze({
  evm: { display: "0x000000000000000000000000000000000000dEaD", qr: "qr-demo.svg" },
  bitcoin: { display: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT", qr: "qr-demo-bitcoin.svg" },
  spark: { display: "sp1qrelaydemo0000000000000000000000000000000", qr: "qr-demo-spark.svg" },
});

const PAYMENT_PHASES = new Set([
  "payment", "waiting", "detected", "confirming", "screening", "complete",
  "underpaid", "overpaid", "expired", "hold", "failed",
]);
const TERMINAL_PHASES = new Set(["complete", "underpaid", "overpaid", "expired", "hold", "failed"]);
const TRANSACTION_HASH = "0x5b60c1493f9b86aaf009df935cb9c82720232ff61d51e81658c857cd92741e93";
const ASSET_PATH = "./assets/";

const registryIsValid = Object.values(ROUTES).every((route) => {
  const asset = ASSETS[route.symbol];
  const network = NETWORKS[route.networkId];
  return Boolean(
    asset &&
    network &&
    Number.isInteger(asset.precision) &&
    asset.precision >= 0 &&
    asset.precision <= 18 &&
    Array.isArray(asset.rates) &&
    asset.rates.length > 0 &&
    asset.rates.every((rate) => Number.isSafeInteger(rate) && rate > 0) &&
    Number.isSafeInteger(network.routeFeeMinorUnits) &&
    network.routeFeeMinorUnits >= 0
  );
});

if (Object.keys(ROUTES).length !== 20 || !registryIsValid) {
  throw new Error("The checkout registry must contain 20 valid, quoteable routes.");
}

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
const forcedStateLabel = document.querySelector("#forcedStateLabel");
const sdkOrderItem = document.querySelector("#sdkOrderItem");
const sdkOrderAmount = document.querySelector("#sdkOrderAmount");
const sdkOrderReference = document.querySelector("#sdkOrderReference");
const sdkDialogTitle = document.querySelector("#sdkDialogTitle");
const sdkDialogDescription = document.querySelector("#sdkDialogDescription");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let ORDER = normalizeOrder(window.RELAY_CHECKOUT_CONFIG?.order || DEFAULT_ORDER);
let state = createInitialState("northstar");
let quoteInterval = null;
let sequenceTimers = [];
let searchAnnouncementTimer = null;
let closeTimer = null;
let lastOpener = openButton;
let lastAnnouncement = "";
let timerThresholds = new Set();

function normalizeOrder(input = DEFAULT_ORDER) {
  const source = input && typeof input === "object" ? input : DEFAULT_ORDER;
  const amount = source.amount && typeof source.amount === "object" ? source.amount : DEFAULT_ORDER.amount;
  const reference = String(source.id || "").trim();
  const product = String(source.itemName || "").trim();
  const currency = String(amount.currency || "").toUpperCase();
  const locale = String(amount.locale || "en-NG");
  const minorUnits = Number(amount.minorUnits);
  const quoteTtlSeconds = Number(source.quoteTtlSeconds ?? 600);

  if (!reference || !product) throw new TypeError("Relay checkout requires order.id and order.itemName.");
  if (currency !== "NGN") throw new TypeError("This checkout is configured for NGN orders only.");
  if (!Number.isSafeInteger(minorUnits) || minorUnits <= 0) throw new TypeError("order.amount.minorUnits must be a positive integer.");
  if (!Number.isFinite(quoteTtlSeconds) || quoteTtlSeconds < 30 || quoteTtlSeconds > 3600) {
    throw new TypeError("order.quoteTtlSeconds must be between 30 and 3600.");
  }

  const amountMajor = minorUnits / 100;
  const fractionDigits = minorUnits % 100 === 0 ? 0 : 2;
  const fiatAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amountMajor);

  return Object.freeze({
    reference: reference.slice(0, 64),
    product: product.slice(0, 120),
    currency,
    locale,
    minorUnits,
    amountMajor,
    fiatAmount,
    quoteTtlSeconds,
  });
}

function normalizeTheme(input) {
  if (!input || typeof input !== "object") throw new TypeError("Relay checkout requires a theme object.");
  const logoText = String(input.logoText || "").trim();
  const accentColor = String(input.accentColor || "").trim();
  const cornerRadius = Number(input.cornerRadius);
  if (!logoText) throw new TypeError("theme.logoText is required.");
  if (!/^#[0-9a-f]{6}$/i.test(accentColor)) throw new TypeError("theme.accentColor must be a six-digit hex color.");
  if (!Number.isFinite(cornerRadius) || cornerRadius < 12 || cornerRadius > 40) {
    throw new TypeError("theme.cornerRadius must be between 12 and 40.");
  }
  return Object.freeze({ logoText: logoText.slice(0, 40), accentColor, cornerRadius });
}

function orderSignature(order = ORDER) {
  return JSON.stringify([
    order.reference,
    order.product,
    order.minorUnits,
    order.currency,
    order.locale,
    order.quoteTtlSeconds,
  ]);
}

function createInitialState(partnerId) {
  return {
    phase: "composer",
    routeId: null,
    expandedAsset: null,
    query: "",
    partnerId,
    quoteVersion: 0,
    quoteRevision: 0,
    expiresAt: null,
    attemptId: 0,
    qrOpen: false,
    forced: null,
    confirmations: 0,
    supportOpen: false,
    transactionOpen: false,
  };
}

function routeData(routeId = state.routeId) {
  return routeId ? ROUTES[routeId] : null;
}

function assetData(symbol = routeData()?.symbol) {
  return symbol ? ASSETS[symbol] : null;
}

function networkData(networkId = routeData()?.networkId) {
  return networkId ? NETWORKS[networkId] : null;
}

function quoteFor(routeOrId, version = state.quoteVersion) {
  const route = typeof routeOrId === "string" ? ROUTES[routeOrId] : routeOrId;
  const asset = route ? ASSETS[route.symbol] : null;
  const network = route ? NETWORKS[route.networkId] : null;
  if (!route || !asset || !network) return null;
  if (!Number.isInteger(version)) throw new TypeError("Quote version must be an integer.");
  const versionIndex = ((version % asset.rates.length) + asset.rates.length) % asset.rates.length;
  const marketRate = asset.rates[versionIndex];
  const routeTotalMinorUnits = BigInt(ORDER.minorUnits) + BigInt(network.routeFeeMinorUnits);
  const amount = quoteAmountFromMinorUnits(routeTotalMinorUnits, marketRate, asset.precision);
  const effectiveRate = ORDER.amountMajor / Number(amount);
  return Object.freeze({
    amount,
    effectiveRate,
    marketRate,
    routeFeeMinorUnits: network.routeFeeMinorUnits,
    rateLabel: new Intl.NumberFormat(ORDER.locale, {
      style: "currency",
      currency: ORDER.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(effectiveRate),
  });
}

function quoteAmountFromMinorUnits(totalMinorUnits, marketRate, precision) {
  const scale = 10n ** BigInt(precision);
  const numerator = totalMinorUnits * scale;
  const denominator = BigInt(marketRate) * 100n;
  const atomicAmount = (numerator + denominator - 1n) / denominator;
  return formatAtomicUnits(atomicAmount, precision);
}

function formatAtomicUnits(atomicAmount, precision) {
  if (precision === 0) return atomicAmount.toString();
  const scale = 10n ** BigInt(precision);
  const whole = atomicAmount / scale;
  const fraction = (atomicAmount % scale).toString().padStart(precision, "0");
  return `${whole}.${fraction}`;
}

function decimalToAtomicUnits(value, precision) {
  const [whole = "0", fraction = ""] = String(value).split(".");
  const scale = 10n ** BigInt(precision);
  const normalizedFraction = fraction.padEnd(precision, "0").slice(0, precision);
  return BigInt(whole) * scale + BigInt(normalizedFraction || "0");
}

function quoteData() {
  const route = routeData();
  return route ? quoteFor(route) : null;
}

function destinationData() {
  const networkId = routeData()?.networkId;
  if (networkId === "bitcoin") return DESTINATIONS.bitcoin;
  if (networkId === "spark") return DESTINATIONS.spark;
  return DESTINATIONS.evm;
}

function paymentDetailKey() {
  if (!state.routeId) return "";
  return `${state.routeId}:${state.quoteRevision}:${state.quoteVersion}:${destinationData().display}`;
}

function clearSequenceTimers() {
  sequenceTimers.forEach((timer) => window.clearTimeout(timer));
  sequenceTimers = [];
}

function clearQuoteTimer() {
  if (quoteInterval) window.clearInterval(quoteInterval);
  quoteInterval = null;
}

function invalidateAttempt() {
  state.attemptId += 1;
  clearSequenceTimers();
  clearQuoteTimer();
}

function createQuote({ advance = false } = {}) {
  invalidateAttempt();
  timerThresholds = new Set();
  const versionCount = assetData()?.rates.length || 1;
  state.quoteVersion = advance ? (state.quoteVersion + 1) % versionCount : 0;
  state.quoteRevision += 1;
  state.expiresAt = Date.now() + ORDER.quoteTtlSeconds * 1000;
  state.qrOpen = false;
  startQuoteTimer();
}

function loadCanonicalFixture() {
  invalidateAttempt();
  state.routeId = "USDC:base";
  state.expandedAsset = "USDC";
  state.query = "";
  state.quoteVersion = 0;
  state.expiresAt = null;
  state.qrOpen = false;
  state.confirmations = 1;
  state.supportOpen = false;
  state.transactionOpen = false;
  timerThresholds = new Set();
}

function dispatch(action) {
  const previousPhase = state.phase;
  const previousKey = paymentDetailKey();
  let direction = action.direction || "forward";
  let transition = "screen";
  let focusHeading = true;
  let focusDock = false;
  let announcement = "";
  let startHappyPath = false;
  let nextLifecycle = null;

  switch (action.type) {
    case "TOGGLE_ASSET": {
      const symbol = action.symbol;
      if (!ASSETS[symbol]) return;
      state.expandedAsset = state.expandedAsset === symbol ? null : symbol;
      renderRouteResults({ focusAsset: symbol });
      return;
    }
    case "SELECT_ROUTE": {
      const route = ROUTES[action.routeId];
      if (!route) return;
      state.routeId = route.id;
      state.expandedAsset = route.symbol;
      renderRouteResults({ focusRoute: route.id });
      updateComposerActions();
      announce(`${route.symbol} on ${NETWORKS[route.networkId].name} selected. Amount to send ${quoteData().amount} ${route.symbol}.`);
      return;
    }
    case "CONTINUE_TO_PAYMENT":
      if (!routeData()) return;
      state.phase = "payment";
      state.query = "";
      state.forced = null;
      state.supportOpen = false;
      state.transactionOpen = false;
      createQuote();
      announcement = `Payment details ready for ${quoteData().amount} ${routeData().symbol} on ${networkData().name}.`;
      break;
    case "BACK_TO_COMPOSER":
      if (state.phase !== "payment") return;
      invalidateAttempt();
      state.phase = "composer";
      state.query = "";
      state.quoteVersion = 0;
      state.expiresAt = null;
      state.forced = null;
      direction = "back";
      announcement = "Choose crypto and network.";
      break;
    case "TOGGLE_QR":
      if (state.phase !== "payment") return;
      state.qrOpen = !state.qrOpen;
      focusHeading = false;
      break;
    case "MARK_SENT": {
      if (state.phase !== "payment") return;
      if (!state.expiresAt || Date.now() >= state.expiresAt) {
        dispatch({ type: "EXPIRE" });
        return;
      }
      clearSequenceTimers();
      clearQuoteTimer();
      state.phase = "waiting";
      state.expiresAt = null;
      state.qrOpen = false;
      state.forced = null;
      transition = "state";
      focusHeading = false;
      focusDock = true;
      announcement = "Looking for your payment.";
      startHappyPath = true;
      break;
    }
    case "RUN_HAPPY":
      loadCanonicalFixture();
      resetHostCompletion();
      state.phase = "waiting";
      state.forced = null;
      transition = "state";
      focusHeading = false;
      announcement = "Looking for your payment.";
      startHappyPath = true;
      break;
    case "HAPPY_DETECTED":
      if (!acceptLifecycleAction(action, "waiting")) return;
      state.phase = "detected";
      state.confirmations = 1;
      transition = "state";
      focusHeading = false;
      announcement = "Payment detected.";
      nextLifecycle = { action: "HAPPY_CONFIRMING", delay: 3200 };
      break;
    case "HAPPY_CONFIRMING":
      if (!acceptLifecycleAction(action, "detected")) return;
      state.phase = "confirming";
      state.confirmations = 2;
      transition = "state";
      focusHeading = false;
      announcement = "Payment is confirming.";
      nextLifecycle = { action: "HAPPY_SCREENING", delay: 3200 };
      break;
    case "HAPPY_SCREENING":
      if (!acceptLifecycleAction(action, "confirming")) return;
      state.phase = "screening";
      state.confirmations = 3;
      transition = "state";
      focusHeading = false;
      announcement = "Payment confirmed. Final check in progress.";
      nextLifecycle = { action: "HAPPY_COMPLETE", delay: 3600 };
      break;
    case "HAPPY_COMPLETE":
      if (!acceptLifecycleAction(action, "screening")) return;
      state.phase = "complete";
      transition = "state";
      focusHeading = false;
      announcement = `Payment complete for ${ORDER.product}.`;
      updateHostCompletion();
      break;
    case "FORCE_STATE":
      if (!PAYMENT_PHASES.has(action.phase) || action.phase === "payment" || action.phase === "waiting") return;
      loadCanonicalFixture();
      state.forced = action.phase;
      state.phase = action.phase;
      transition = "state";
      focusHeading = false;
      announcement = forcedAnnouncement(action.phase);
      if (action.phase === "complete") updateHostCompletion();
      else resetHostCompletion();
      break;
    case "EXPIRE":
      if (state.phase !== "payment") return;
      invalidateAttempt();
      state.phase = "expired";
      state.forced = null;
      state.qrOpen = false;
      transition = "state";
      focusHeading = false;
      focusDock = true;
      announcement = "Payment details expired. Create new details before sending.";
      break;
    case "REFRESH":
    case "TRY_AGAIN":
      state.phase = "payment";
      state.forced = null;
      state.supportOpen = false;
      state.transactionOpen = false;
      createQuote({ advance: true });
      transition = "state";
      focusHeading = true;
      announcement = "New payment details are ready.";
      break;
    case "TOGGLE_SUPPORT":
      if (!PAYMENT_PHASES.has(state.phase)) return;
      state.supportOpen = !state.supportOpen;
      focusHeading = false;
      announcement = state.supportOpen ? "Support reference opened." : "Support reference closed.";
      break;
    case "TOGGLE_TRANSACTION":
      if (!PAYMENT_PHASES.has(state.phase)) return;
      state.transactionOpen = !state.transactionOpen;
      focusHeading = false;
      announcement = state.transactionOpen ? "Transaction details opened." : "Transaction details closed.";
      break;
    case "CHOOSE_ANOTHER":
      invalidateAttempt();
      state.phase = "composer";
      state.forced = null;
      state.expiresAt = null;
      state.query = "";
      state.expandedAsset = routeData()?.symbol || null;
      state.quoteVersion = 0;
      state.supportOpen = false;
      state.transactionOpen = false;
      direction = "back";
      announcement = "Choose crypto and network.";
      break;
    case "RESET": {
      invalidateAttempt();
      const partnerId = state.partnerId;
      state = createInitialState(partnerId);
      transition = "state";
      announcement = "Checkout reset. Choose crypto and network.";
      resetHostCompletion();
      break;
    }
    default:
      return;
  }

  commitView({ previousPhase, previousKey, direction, transition, focusHeading, focusDock, announcement });
  if (startHappyPath) renderAndRunHappyPath(state.attemptId);
  if (nextLifecycle) scheduleVisible(nextLifecycle.action, nextLifecycle.delay, state.attemptId);
}

function acceptLifecycleAction(action, expectedPhase) {
  return !state.forced && action.attemptId === state.attemptId && state.phase === expectedPhase && !TERMINAL_PHASES.has(state.phase);
}

function scheduleVisible(action, delay, attemptId) {
  const timer = window.setTimeout(() => {
    if (attemptId !== state.attemptId || state.forced || TERMINAL_PHASES.has(state.phase)) return;
    if (document.hidden) {
      scheduleVisible(action, 500, attemptId);
      return;
    }
    dispatch({ type: action, attemptId });
  }, delay);
  sequenceTimers.push(timer);
}

function renderAndRunHappyPath(attemptId) {
  scheduleVisible("HAPPY_DETECTED", 2200, attemptId);
}

function commitView({ previousPhase, previousKey, direction, transition, focusHeading, focusDock, announcement }) {
  updateProgress();
  updateDevPanel();
  const activeLayer = screenStack.querySelector(".screen-layer:not([aria-hidden='true'])");
  const wasPayment = PAYMENT_PHASES.has(previousPhase);
  const isPayment = PAYMENT_PHASES.has(state.phase);

  if (activeLayer && wasPayment && isPayment && previousKey === paymentDetailKey()) {
    activeLayer.dataset.phase = state.phase;
    updatePaymentSurface({ focusDock, announcement });
    return;
  }

  if (activeLayer && wasPayment && isPayment) {
    renderScreen({ replaceOnly: true, focusHeading, announcement });
    return;
  }

  renderScreen({ direction, transition, focusHeading, announcement, previousPhase });
}

function renderScreen({ direction = "forward", transition = "screen", replaceOnly = false, focusHeading = true, announcement = "", previousPhase = null } = {}) {
  const markup = screenTemplate();
  const activeLayer = screenStack.querySelector(".screen-layer:not([aria-hidden='true'])");

  if (replaceOnly && activeLayer) {
    activeLayer.innerHTML = markup;
    activeLayer.dataset.phase = state.phase;
    if (PAYMENT_PHASES.has(state.phase)) updatePaymentSurface();
    else updateComposerActions();
    if (dialog.open && focusHeading) {
      window.requestAnimationFrame(() => activeLayer.querySelector("h2[tabindex='-1']")?.focus({ preventScroll: true }));
    }
    if (announcement) announce(announcement);
    return;
  }

  const nextLayer = document.createElement("section");
  const enterClass = transition === "state" ? "enter-state" : direction === "back" ? "enter-back" : "enter-forward";
  nextLayer.className = `screen-layer ${enterClass}`;
  nextLayer.dataset.phase = state.phase;
  nextLayer.innerHTML = markup;

  screenStack.setAttribute("aria-busy", "true");
  if (activeLayer) {
    activeLayer.setAttribute("aria-hidden", "true");
    activeLayer.inert = true;
    activeLayer.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    const exitClass = transition === "state" ? "exit-state" : direction === "back" ? "exit-back" : "exit-forward";
    activeLayer.classList.add(exitClass);
  } else {
    screenStack.replaceChildren();
  }

  screenStack.append(nextLayer);
  screenStack.setAttribute("aria-busy", "false");
  if (PAYMENT_PHASES.has(state.phase)) updatePaymentSurface();

  const duration = reducedMotion.matches ? 90 : 230;
  window.setTimeout(() => {
    screenStack.querySelectorAll(".screen-layer[aria-hidden='true']").forEach((layer) => layer.remove());
  }, duration);

  if (dialog.open) {
    window.requestAnimationFrame(() => {
      if (focusHeading) {
        nextLayer.querySelector("h2[tabindex='-1']")?.focus({ preventScroll: true });
      } else if (direction === "back" && previousPhase === "payment" && state.routeId) {
        nextLayer.querySelector(`[data-asset-trigger="${routeData().symbol}"]`)?.focus({ preventScroll: true });
      }
    });
  }

  if (announcement) announce(announcement);
}

function screenTemplate() {
  return state.phase === "composer" ? composerScreen() : paymentScreen();
}

function composerScreen() {
  return `
    <div class="screen-body composer-body">
      <h2 class="sr-only" tabindex="-1">Choose crypto and network</h2>
      <div class="route-search">
        ${searchIcon()}
        <div class="route-search__field">
          <input id="routeSearch" data-route-search type="search" value="${escapeAttribute(state.query)}" placeholder="USDC, Base, Bitcoin" autocomplete="off" spellcheck="false" aria-controls="routeResults" />
          <label for="routeSearch">Search crypto or network</label>
        </div>
        <button class="search-clear" type="button" data-action="clear-search" aria-label="Clear search" ${state.query ? "" : "hidden"}>${closeIcon()}</button>
      </div>
      <div class="result-label"><span>Crypto / coin</span><span>Then choose network</span></div>
      <div class="route-results" id="routeResults">${routeResultsMarkup()}</div>
      <div class="sr-only" id="routeResultStatus" role="status" aria-live="polite"></div>
    </div>
    <div class="screen-actions composer-actions">
      <div class="route-choice-summary" data-route-summary>${routeSummaryMarkup()}</div>
      <button class="button-primary" type="button" data-action="continue" ${state.routeId ? "" : "disabled"}>${continueLabel()}</button>
    </div>`;
}

function routeResultsMarkup() {
  const query = normalize(state.query);
  const groups = filteredGroups(query);
  if (!groups.length) {
    return `<div class="empty-results">
      ${searchEmptyIcon()}
      <strong>No supported routes</strong>
      <p>Nothing matches “${escapeHtml(state.query)}”. Try a crypto or network name.</p>
      <button type="button" data-action="clear-search">Clear search</button>
    </div>`;
  }

  return `<div class="route-list">${groups.map(({ symbol, visibleNetworks, autoExpanded }) => {
    const asset = ASSETS[symbol];
    const selected = routeData()?.symbol === symbol;
    const expanded = state.expandedAsset === symbol || autoExpanded;
    const selectedNetwork = selected ? networkData()?.name : null;
    const accessibleName = `${symbol}, ${asset.name}, ${asset.networks.length} networks${selectedNetwork ? `, selected ${selectedNetwork}` : ""}`;
    return `<section class="asset-group">
      <button class="asset-trigger ${selected ? "is-selected" : ""}" type="button" data-asset-trigger="${symbol}" aria-expanded="${expanded}" ${expanded ? `aria-controls="networks-${symbol}"` : ""} aria-label="${escapeAttribute(accessibleName)}">
        <span class="asset-icon"><img src="${ASSET_PATH}${asset.icon}" alt="" /></span>
        <span class="asset-copy"><strong>${symbol}</strong><span>${asset.name}</span></span>
        <span class="asset-quote"><b>${asset.networks.length} networks</b><span>Choose one</span></span>
        ${chevronIcon()}
      </button>
      ${expanded ? networkChooser(symbol, visibleNetworks) : ""}
    </section>`;
  }).join("")}</div>`;
}

function filteredGroups(query) {
  return Object.entries(ASSETS).flatMap(([symbol, asset]) => {
    const assetMatches = !query || normalize(`${symbol} ${asset.name}`).includes(query);
    const networkMatches = asset.networks.filter((networkId) => normalize(NETWORKS[networkId].name).includes(query));
    if (query && !assetMatches && networkMatches.length === 0) return [];
    return [{
      symbol,
      visibleNetworks: query && networkMatches.length ? networkMatches : asset.networks,
      autoExpanded: Boolean(query && networkMatches.length),
    }];
  });
}

function networkChooser(symbol, networkIds) {
  return `<div class="network-chooser" id="networks-${symbol}">
    <div class="network-chooser__head"><strong>Choose network</strong><span>Match your sending wallet</span></div>
    <div class="network-grid" role="radiogroup" aria-label="${symbol} networks">
      ${networkIds.map((networkId) => {
        const network = NETWORKS[networkId];
        const routeId = `${symbol}:${networkId}`;
        const selected = state.routeId === routeId;
        return `<div>
          <input class="network-input" id="route-${symbol}-${networkId}" name="route-choice-${symbol}" type="radio" value="${routeId}" data-route-choice ${selected ? "checked" : ""} />
          <label class="network-option ${selected ? "is-selected" : ""}" for="route-${symbol}-${networkId}">
            <img src="${ASSET_PATH}${network.icon}" alt="" />
            <span>${network.name}</span>
            <i class="network-check" aria-hidden="true">${checkIcon()}</i>
          </label>
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

function routeSummaryMarkup() {
  const route = routeData();
  if (!route) return `<span>Select crypto and network to see the final amount</span>`;
  const quote = quoteData();
  return `<span>Amount to send</span><strong class="route-quote-amount">${quote.amount} ${route.symbol}</strong>`;
}

function continueLabel() {
  const route = routeData();
  return route ? `Continue with ${route.symbol} on ${networkData().name}` : "Continue";
}

function paymentScreen() {
  const route = routeData();
  const asset = assetData();
  const network = networkData();
  const quote = quoteData();
  const destination = destinationData();
  const locked = state.phase !== "payment";
  return `
    <div class="screen-body payment-body">
      <header class="screen-heading screen-heading--payment">
        <button class="screen-back" type="button" data-action="back" aria-label="Back to crypto and network selection" ${locked ? "hidden disabled" : ""}>${backIcon()}</button>
        <div><h2 class="screen-title" tabindex="-1">Payment details</h2><p>${route.symbol} on ${network.name}</p></div>
        <span aria-hidden="true"></span>
      </header>
      <section class="deposit-panel ${state.qrOpen ? "is-qr-open" : ""} ${locked ? "is-locked" : ""}" aria-label="Payment details" aria-disabled="${locked}" ${locked ? "aria-describedby=\"paymentDockStatus\"" : ""}>
        <button class="qr-toggle" type="button" data-action="toggle-qr" aria-expanded="${state.qrOpen}" aria-controls="paymentQr" ${locked ? "disabled aria-describedby=\"paymentDockStatus\"" : ""}>${qrIcon()}<span>${state.qrOpen ? "Hide QR code" : "Show QR code"}</span></button>
        <div class="deposit-panel__grid">
          <div class="qr-pane" id="paymentQr">
            <div class="qr-frame">
              <img src="${ASSET_PATH}${destination.qr}" alt="QR code for ${route.symbol} on ${network.name} payment address" />
              <span class="qr-token" aria-hidden="true"><img src="${ASSET_PATH}${asset.icon}" alt="" /></span>
            </div>
          </div>
          <div class="deposit-data">
            <div class="deposit-row deposit-row--amount">
              <div class="deposit-row__copy"><span>Amount to send</span><strong>${quote.amount} ${route.symbol}</strong></div>
              ${copyButton("amount", quote.amount, `Copy amount, ${quote.amount} ${route.symbol}`, locked)}
            </div>
            <div class="deposit-row">
              <div class="deposit-row__copy"><span>Network</span><strong>${network.name}</strong></div>
              <img class="network-mark" src="${ASSET_PATH}${network.icon}" alt="" />
            </div>
            <p class="route-guard">${infoIcon()}<span>Only send ${route.symbol} using ${network.name}.</span></p>
            <div class="deposit-row">
              <div class="deposit-row__copy"><span>Payment address</span><code dir="ltr" tabindex="0" data-address-value ${locked ? "aria-describedby=\"paymentDockStatus\"" : ""}>${destination.display}</code></div>
              ${copyButton("address", destination.display, `Copy ${network.name} payment address`, locked)}
            </div>
          </div>
        </div>
      </section>
      <details class="wallet-help">
        <summary><span>How to send from a wallet</span>${chevronIcon()}</summary>
        <ol>
          <li>Open Send or Withdraw in your wallet.</li>
          <li>Choose ${route.symbol} and ${network.name}.</li>
          <li>Paste the address or scan the QR, then enter the exact amount.</li>
        </ol>
      </details>
    </div>
    <div class="screen-actions payment-dock" id="paymentDock" tabindex="-1" data-status="${state.phase}" aria-labelledby="paymentDockTitle">
      ${paymentDockMarkup()}
    </div>`;
}

function paymentDockMarkup() {
  const route = routeData();
  const quote = quoteData();
  const network = networkData();
  if (!route || !quote || !network) return "";

  if (state.phase === "payment") {
    return `<div class="dock-ready" id="paymentDockStatus">
      <h3 class="sr-only" id="paymentDockTitle">Payment ready</h3>
      <div class="dock-rate"><span>Rate expires in ${timerMarkup()}</span><span>1 ${route.symbol} = ${quote.rateLabel}</span></div>
      <button class="button-primary" type="button" data-action="mark-sent">I’ve sent the payment</button>
      <span class="action-note">${radarIcon()}We will detect it automatically</span>
    </div>`;
  }

  if (state.phase === "waiting") {
    return dockStatus({
      tone: "progress",
      icon: waitingIcon(),
      title: "Looking for payment",
      body: "We will update this page automatically.",
      progress: 0,
      progressLabel: "Waiting for payment detection",
    });
  }

  if (state.phase === "detected") {
    return dockStatus({
      tone: "progress",
      icon: checkCircleIcon(),
      title: "Payment detected",
      body: `${quote.amount} ${route.symbol} arrived and is confirming.`,
      progress: 1,
      progressLabel: "Payment processing: detected, 1 of 4",
      actions: `<button class="button-secondary" type="button" data-action="transaction">View transaction</button>`,
    });
  }

  if (state.phase === "confirming") {
    return dockStatus({
      tone: "progress",
      icon: layersIcon(),
      title: `Confirming on ${network.name}`,
      body: "The network is confirming your payment.",
      progress: 2,
      progressLabel: "Payment processing: network confirmation, 2 of 4",
    });
  }

  if (state.phase === "screening") {
    return dockStatus({
      tone: "review",
      icon: shieldIcon(),
      title: "Final check",
      body: "Payment confirmed. Relay is finishing its checks.",
      progress: 3,
      progressLabel: "Payment processing: final check, 3 of 4",
    });
  }

  if (state.phase === "complete") {
    return dockStatus({
      tone: "success",
      icon: checkIcon(),
      title: "Payment complete",
      body: `${ORDER.fiatAmount} paid for ${escapeHtml(ORDER.product)}.`,
      progress: 4,
      progressLabel: "Payment processing: complete, 4 of 4",
      metrics: [["Paid", `${quote.amount} ${route.symbol}`], ["Reference", ORDER.reference]],
      actions: `<button class="button-primary" type="button" data-action="return">Return to app</button><button class="button-secondary" type="button" data-action="transaction">View transaction</button>`,
    });
  }

  if (state.phase === "underpaid" || state.phase === "overpaid") {
    const values = mismatchValues(state.phase);
    return dockStatus({
      tone: "warning",
      icon: alertIcon(),
      title: "Amount needs review",
      body: state.phase === "underpaid" ? "The received amount is lower than required." : "The received amount is higher than required.",
      metrics: [["Required", values.required], ["Received", values.received], ["Difference", values.difference]],
      note: "Do not send again unless support asks you to.",
      actions: `<button class="button-primary" type="button" data-action="support">Contact support</button><button class="button-secondary" type="button" data-action="transaction">View transaction</button>`,
    });
  }

  if (state.phase === "expired") {
    return dockStatus({
      tone: "danger",
      icon: clockIcon(),
      title: "Payment details expired",
      body: "Create new details before sending.",
      note: "Do not use the old amount or address.",
      actions: `<button class="button-primary" type="button" data-action="refresh">Create new details</button><button class="button-secondary" type="button" data-action="choose-another">Choose another crypto</button>`,
    });
  }

  if (state.phase === "hold") {
    return dockStatus({
      tone: "review",
      icon: shieldIcon(),
      title: "Payment under review",
      body: "Your payment is secure while Relay completes a routine review.",
      metrics: [["Received", `${quote.amount} ${route.symbol}`], ["Reference", ORDER.reference]],
      note: "Do not send another payment.",
      actions: `<button class="button-primary" type="button" data-action="close">Close for now</button><button class="button-secondary" type="button" data-action="support">Contact support</button>`,
    });
  }

  return dockStatus({
    tone: "danger",
    icon: closeCircleIcon(),
    title: "Payment not found",
    body: `We could not confirm a payment on ${network.name}.`,
    note: "If your wallet shows success, contact support before trying again.",
    actions: `<button class="button-primary" type="button" data-action="try-again">Create new details</button><button class="button-secondary" type="button" data-action="support">Contact support</button>`,
  });
}

function dockStatus({ tone, icon, title, body, progress = null, progressLabel = "", metrics = [], note = "", actions = "" }) {
  const panels = `${state.transactionOpen ? transactionPanel() : ""}${state.supportOpen ? supportPanel() : ""}`;
  return `<section class="dock-status is-${tone}" id="paymentDockStatus">
    <div class="dock-status__head">
      <span class="dock-status__symbol" aria-hidden="true">${icon}</span>
      <div><strong id="paymentDockTitle">${title}</strong><p>${body}</p></div>
    </div>
    ${progress !== null ? `<progress class="dock-progress" max="4" value="${progress}" aria-label="${escapeAttribute(progressLabel)}"></progress>` : ""}
    ${metrics.length ? `<dl class="dock-metrics">${metrics.map(([key, value]) => `<div><dt>${key}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>` : ""}
    ${note ? `<p class="dock-note">${note}</p>` : ""}
    ${actions ? `<div class="dock-actions">${actions}</div>` : ""}
    ${panels}
  </section>`;
}

function mismatchValues(phase) {
  const asset = assetData();
  const quote = quoteData();
  const precision = asset.precision;
  const scale = 10n ** BigInt(precision);
  const requiredAtomic = decimalToAtomicUnits(quote.amount, precision);
  const requestedDeltaAtomic = routeData().symbol === "BTC" || routeData().symbol === "XAUT"
    ? 5000n
    : 5n * scale;
  const deltaAtomic = phase === "underpaid" && requestedDeltaAtomic > requiredAtomic
    ? requiredAtomic
    : requestedDeltaAtomic;
  const receivedAtomic = phase === "underpaid"
    ? requiredAtomic - deltaAtomic
    : requiredAtomic + deltaAtomic;
  const sign = phase === "underpaid" ? "−" : "+";
  return {
    required: `${formatAtomicUnits(requiredAtomic, precision)} ${routeData().symbol}`,
    received: `${formatAtomicUnits(receivedAtomic, precision)} ${routeData().symbol}`,
    difference: `${sign}${formatAtomicUnits(deltaAtomic, precision)} ${routeData().symbol}`,
  };
}

function transactionPanel() {
  return `<section class="inline-panel" aria-labelledby="transaction-title">
    <div><strong id="transaction-title" tabindex="-1">Demo transaction</strong><span>${networkData().name} fixture</span></div>
    ${copyButton("transaction", TRANSACTION_HASH, "Copy demo transaction hash")}
    <code>${TRANSACTION_HASH}</code>
  </section>`;
}

function supportPanel() {
  return `<section class="inline-panel" aria-labelledby="support-title">
    <div><strong id="support-title" tabindex="-1">Support reference</strong><span>Share this with the host app’s support team.</span></div>
    ${copyButton("reference", ORDER.reference, "Copy support reference")}
    <code>${escapeHtml(ORDER.reference)}</code>
  </section>`;
}

function copyButton(kind, value, label, disabled = false) {
  return `<button class="copy-control" type="button" data-copy-kind="${kind}" data-copy-value="${escapeAttribute(value)}" aria-label="${escapeAttribute(label)}" ${disabled ? "disabled aria-describedby=\"paymentDockStatus\"" : ""}>${copyIcon()}<span>Copy</span></button>`;
}

function timerMarkup() {
  return `<span class="quote-clock" role="timer" aria-live="off">${clockSmallIcon()}<span data-quote-timer>10:00</span></span>`;
}

function updatePaymentSurface({ focusDock = false, announcement = "" } = {}) {
  const layer = screenStack.querySelector(".screen-layer:not([aria-hidden='true'])");
  if (!layer || !PAYMENT_PHASES.has(state.phase)) return;
  const dock = layer.querySelector("#paymentDock");
  const panel = layer.querySelector(".deposit-panel");
  const locked = state.phase !== "payment";
  const focusedInsideDock = Boolean(dock?.contains(document.activeElement));
  const focusedAction = focusedInsideDock ? document.activeElement.closest?.("[data-action]")?.dataset.action : null;

  if (dock) {
    dock.dataset.status = state.phase;
    dock.innerHTML = paymentDockMarkup();
  }
  if (panel) {
    panel.classList.toggle("is-locked", locked);
    panel.classList.toggle("is-qr-open", !locked && state.qrOpen);
    panel.setAttribute("aria-disabled", String(locked));
    if (locked) panel.setAttribute("aria-describedby", "paymentDockStatus");
    else panel.removeAttribute("aria-describedby");
  }

  const back = layer.querySelector(".screen-back");
  if (back) {
    back.hidden = locked;
    back.disabled = locked;
  }
  const qrToggle = layer.querySelector(".qr-toggle");
  if (qrToggle) {
    qrToggle.disabled = locked;
    qrToggle.setAttribute("aria-expanded", String(!locked && state.qrOpen));
    if (locked) qrToggle.setAttribute("aria-describedby", "paymentDockStatus");
    else qrToggle.removeAttribute("aria-describedby");
    const label = qrToggle.querySelector("span");
    if (label) label.textContent = !locked && state.qrOpen ? "Hide QR code" : "Show QR code";
  }
  layer.querySelectorAll(".deposit-panel .copy-control").forEach((button) => {
    button.disabled = locked;
    if (locked) button.setAttribute("aria-describedby", "paymentDockStatus");
    else button.removeAttribute("aria-describedby");
  });
  const addressValue = layer.querySelector("[data-address-value]");
  if (addressValue) {
    if (locked) addressValue.setAttribute("aria-describedby", "paymentDockStatus");
    else addressValue.removeAttribute("aria-describedby");
  }

  updateCountdown();
  if (dock && (focusDock || focusedInsideDock)) {
    window.requestAnimationFrame(() => {
      const revealedPanelTitle = focusedAction === "support" && state.supportOpen
        ? dock.querySelector("#support-title")
        : focusedAction === "transaction" && state.transactionOpen
          ? dock.querySelector("#transaction-title")
          : null;
      const restoredAction = focusedAction
        ? [...dock.querySelectorAll("[data-action]")].find((element) => element.dataset.action === focusedAction)
        : null;
      (revealedPanelTitle || restoredAction || dock).focus({ preventScroll: true });
    });
  }
  if (announcement) announce(announcement);
}

function updateComposerActions() {
  const layer = screenStack.querySelector(".screen-layer:not([aria-hidden='true'])");
  if (!layer || state.phase !== "composer") return;
  const summary = layer.querySelector("[data-route-summary]");
  const button = layer.querySelector("[data-action='continue']");
  if (summary) summary.innerHTML = routeSummaryMarkup();
  if (button) {
    button.disabled = !state.routeId;
    button.textContent = continueLabel();
  }
}

function renderRouteResults({ focusAsset = null, focusRoute = null } = {}) {
  const layer = screenStack.querySelector(".screen-layer:not([aria-hidden='true'])");
  if (!layer || state.phase !== "composer") return;
  const results = layer.querySelector("#routeResults");
  if (!results) return;
  results.innerHTML = routeResultsMarkup();
  const clear = layer.querySelector(".search-clear");
  if (clear) clear.hidden = !state.query;
  updateComposerActions();
  window.requestAnimationFrame(() => {
    if (focusRoute) layer.querySelector(`[data-route-choice][value="${focusRoute}"]`)?.focus({ preventScroll: true });
    else if (focusAsset) layer.querySelector(`[data-asset-trigger="${focusAsset}"]`)?.focus({ preventScroll: true });
  });
}

function announceSearchResults() {
  window.clearTimeout(searchAnnouncementTimer);
  searchAnnouncementTimer = window.setTimeout(() => {
    const status = screenStack.querySelector("#routeResultStatus");
    if (!status || state.phase !== "composer") return;
    const count = filteredGroups(normalize(state.query)).reduce((sum, group) => sum + group.visibleNetworks.length, 0);
    status.textContent = count === 1 ? "1 route found." : `${count} routes found.`;
  }, 250);
}

function updateProgress() {
  const segments = [...flowProgress.children];
  segments.forEach((segment) => { segment.className = ""; });
  if (state.phase === "composer") {
    segments[0]?.classList.add("is-active");
    return;
  }
  segments[0]?.classList.add("is-complete");
  segments[1]?.classList.add(state.phase === "complete" ? "is-complete" : "is-active");
}

function updateDevPanel() {
  const labels = {
    detected: "Forced: payment detected",
    underpaid: "Forced: underpaid",
    overpaid: "Forced: overpaid",
    expired: "Forced: quote expired",
    hold: "Forced: screening hold",
    failed: "Forced: payment failed",
    complete: "Forced: payment complete",
  };
  forcedStateLabel.textContent = state.forced ? labels[state.forced] : "Live flow";
  dialog.querySelectorAll("[data-force]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.force === state.forced));
  });
}

function forcedAnnouncement(phase) {
  const mismatch = phase === "underpaid" || phase === "overpaid" ? mismatchValues(phase) : null;
  const announcements = {
    detected: "Payment detected.",
    underpaid: mismatch ? `Amount needs review. Received ${mismatch.received}, difference ${mismatch.difference}.` : "Amount needs review.",
    overpaid: mismatch ? `Amount needs review. Received ${mismatch.received}, difference ${mismatch.difference}.` : "Amount needs review.",
    expired: "Payment details expired.",
    hold: "Payment under review.",
    failed: "Payment not found.",
    complete: `Payment complete for ${ORDER.product}.`,
  };
  return announcements[phase] || "Checkout state changed.";
}

function applyTheme(input, { animate = true } = {}) {
  const partnerId = typeof input === "string" && PARTNERS[input] ? input : findPartnerId(input);
  const theme = typeof input === "string" ? PARTNERS[input] : normalizeTheme(input);
  if (!theme) return;

  const commit = () => {
    state.partnerId = partnerId;
    dialog.style.setProperty("--partner-accent", theme.accentColor);
    dialog.style.setProperty("--partner-radius", `${theme.cornerRadius}px`);
    document.documentElement.style.setProperty("--partner-accent", theme.accentColor);
    document.documentElement.style.setProperty("--partner-radius", `${theme.cornerRadius}px`);
    hostBrandName.textContent = theme.logoText;
    hostBrand.setAttribute("aria-label", `${theme.logoText} home`);
    hostBrandMark.style.background = theme.accentColor;
    document.title = `${theme.logoText} crypto payment | Lums`;
    dialog.querySelectorAll("input[name='partner-theme']").forEach((inputElement) => {
      inputElement.checked = inputElement.value === partnerId;
    });
  };

  if (!animate || reducedMotion.matches || !dialog.open) {
    commit();
    return;
  }
  checkoutShell.classList.add("is-theme-switching");
  window.setTimeout(commit, 70);
  window.setTimeout(() => checkoutShell.classList.remove("is-theme-switching"), 180);
}

function findPartnerId(input) {
  if (!input || typeof input !== "object") return "custom";
  return Object.entries(PARTNERS).find(([, partner]) => (
    partner.logoText === input.logoText &&
    partner.accentColor.toLowerCase() === String(input.accentColor).toLowerCase() &&
    partner.cornerRadius === Number(input.cornerRadius)
  ))?.[0] || "custom";
}

function syncOrderContext() {
  sdkOrderItem.textContent = ORDER.product;
  sdkOrderItem.title = ORDER.product;
  sdkOrderAmount.textContent = ORDER.fiatAmount;
  sdkOrderReference.textContent = ORDER.reference;
  sdkOrderReference.title = ORDER.reference;
  sdkDialogTitle.textContent = `Pay with crypto for ${ORDER.product}`;
  sdkDialogDescription.textContent = `Choose a crypto route and send payment for ${ORDER.fiatAmount}, ${ORDER.product}.`;
}

function configureCheckout(config = {}) {
  let orderChanged = false;
  if (config.order) {
    const nextOrder = normalizeOrder(config.order);
    orderChanged = orderSignature(nextOrder) !== orderSignature(ORDER);
    ORDER = nextOrder;
  }
  if (config.theme) applyTheme(config.theme, { animate: dialog.open });
  syncOrderContext();

  if (orderChanged) {
    invalidateAttempt();
    const partnerId = state.partnerId;
    state = createInitialState(partnerId);
    resetHostCompletion();
    updateProgress();
    updateDevPanel();
  }
  return orderChanged;
}

function startQuoteTimer() {
  clearQuoteTimer();
  updateCountdown();
  quoteInterval = window.setInterval(() => {
    if (!document.hidden) updateCountdown();
  }, 1000);
}

function updateCountdown() {
  if (!state.expiresAt || state.phase !== "payment") return;
  const remaining = Math.max(0, Math.ceil((state.expiresAt - Date.now()) / 1000));
  const value = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  dialog.querySelectorAll("[data-quote-timer]").forEach((timer) => {
    timer.textContent = value;
    timer.closest(".quote-clock")?.classList.toggle("is-urgent", remaining <= 60);
  });

  [60, 30, 10].forEach((threshold) => {
    if (remaining === threshold && !timerThresholds.has(threshold)) {
      timerThresholds.add(threshold);
      announce(threshold === 60 ? "Payment details expire in 1 minute." : `Payment details expire in ${threshold} seconds.`);
    }
  });

  if (remaining === 0) dispatch({ type: "EXPIRE" });
}

function announce(message) {
  if (!message || message === lastAnnouncement) return;
  lastAnnouncement = message;
  liveRegion.textContent = "";
  window.requestAnimationFrame(() => { liveRegion.textContent = message; });
}

async function copyValue(button) {
  if (button.disabled) return;
  const value = button.dataset.copyValue;
  const kind = button.dataset.copyKind;
  const originalMarkup = button.innerHTML;
  const originalLabel = button.getAttribute("aria-label");
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      dialog.append(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (!copied) throw new Error("Clipboard copy failed");
    }
    const copiedLabel = kind === "amount" ? "Amount copied" : kind === "address" ? "Address copied" : "Copied";
    button.classList.add("is-copied");
    button.innerHTML = `${checkIcon()}<span>Copied</span>`;
    button.setAttribute("aria-label", copiedLabel);
    announce(`${copiedLabel}.`);
    window.setTimeout(() => {
      if (!button.isConnected) return;
      button.classList.remove("is-copied");
      button.innerHTML = originalMarkup;
      button.setAttribute("aria-label", originalLabel);
    }, 1400);
  } catch {
    announce("Copy failed. Select the value manually.");
    button.focus();
    if (kind === "address") screenStack.querySelector("[data-address-value]")?.focus?.();
  }
}

function openCheckout(opener = openButton) {
  if (closeTimer) {
    window.clearTimeout(closeTimer);
    closeTimer = null;
    dialog.classList.remove("is-closing");
  }
  if (dialog.open) return;
  lastOpener = resolveOpener(opener);
  dialog.classList.remove("is-closing");
  dialog.showModal();
  updateProgress();
  updateDevPanel();
  renderScreen({
    focusHeading: true,
    announcement: state.phase === "composer" ? "Choose crypto and network." : "Checkout resumed.",
  });
  updateCountdown();
}

function closeCheckout() {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;
  dialog.classList.add("is-closing");
  closeTimer = window.setTimeout(() => {
    dialog.close();
    dialog.classList.remove("is-closing");
    closeTimer = null;
    lastOpener?.focus({ preventScroll: true });
  }, reducedMotion.matches ? 90 : 200);
}

function resolveOpener(candidate) {
  if (!(candidate instanceof HTMLElement) || !candidate.isConnected) return openButton;
  const focusableSelector = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
  return candidate.matches(focusableSelector) ? candidate : openButton;
}

function updateHostCompletion() {
  openButton.innerHTML = `<span>View payment receipt</span>${arrowIcon()}`;
  openButton.dataset.complete = "true";
}

function resetHostCompletion() {
  openButton.innerHTML = `<span>Pay with crypto</span>${arrowIcon()}`;
  delete openButton.dataset.complete;
}

dialog.addEventListener("input", (event) => {
  if (!event.target.matches("[data-route-search]")) return;
  state.query = event.target.value;
  renderRouteResults();
  announceSearchResults();
});

dialog.addEventListener("change", (event) => {
  if (event.target.matches("[data-route-choice]")) {
    dispatch({ type: "SELECT_ROUTE", routeId: event.target.value });
    return;
  }
  if (event.target.name === "partner-theme") applyTheme(event.target.value);
});

dialog.addEventListener("click", (event) => {
  const copy = event.target.closest("[data-copy-value]");
  if (copy) {
    copyValue(copy);
    return;
  }

  const force = event.target.closest("[data-force]");
  if (force) {
    dispatch({ type: "FORCE_STATE", phase: force.dataset.force });
    return;
  }

  const assetTrigger = event.target.closest("[data-asset-trigger]");
  if (assetTrigger) {
    dispatch({ type: "TOGGLE_ASSET", symbol: assetTrigger.dataset.assetTrigger });
    return;
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  const actions = {
    continue: () => dispatch({ type: "CONTINUE_TO_PAYMENT" }),
    back: () => dispatch({ type: "BACK_TO_COMPOSER", direction: "back" }),
    "clear-search": () => {
      state.query = "";
      const input = screenStack.querySelector("[data-route-search]");
      if (input) input.value = "";
      renderRouteResults();
      input?.focus({ preventScroll: true });
      announce("Search cleared.");
    },
    "toggle-qr": () => dispatch({ type: "TOGGLE_QR" }),
    "mark-sent": () => dispatch({ type: "MARK_SENT" }),
    "run-happy": () => dispatch({ type: "RUN_HAPPY" }),
    refresh: () => dispatch({ type: "REFRESH" }),
    "try-again": () => dispatch({ type: "TRY_AGAIN" }),
    "choose-another": () => dispatch({ type: "CHOOSE_ANOTHER", direction: "back" }),
    support: () => dispatch({ type: "TOGGLE_SUPPORT" }),
    transaction: () => dispatch({ type: "TOGGLE_TRANSACTION" }),
    reset: () => dispatch({ type: "RESET" }),
    close: closeCheckout,
    return: closeCheckout,
  };
  actions[action]?.();
});

dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeCheckout();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) updateCountdown();
});

openButton.addEventListener("click", () => window.RelayCheckout.open(window.RELAY_CHECKOUT_CONFIG));
closeButton.addEventListener("click", closeCheckout);

window.RelayCheckout = Object.freeze({
  open(config = {}) {
    const opener = document.activeElement;
    const changed = configureCheckout(config);
    if (dialog.open) {
      if (dialog.classList.contains("is-closing")) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
        dialog.classList.remove("is-closing");
        lastOpener = resolveOpener(opener);
      }
      if (changed) renderScreen({ replaceOnly: true, focusHeading: true, announcement: `Pay with crypto for ${ORDER.product}.` });
      return;
    }
    openCheckout(opener);
  },
  close: closeCheckout,
});

function normalize(value) {
  return String(value || "").trim().toLocaleLowerCase();
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function searchIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>`; }
function searchEmptyIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4 4M8 10.5h5"/></svg>`; }
function closeIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>`; }
function chevronIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5"/></svg>`; }
function checkIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`; }
function copyIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`; }
function backIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>`; }
function arrowIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>`; }
function qrIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM15 14h2v2h-2zM19 14h2v4h-2zM14 19h4v2h-4zM20 20h1v1h-1z"/></svg>`; }
function infoIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>`; }
function radarIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="2"/><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"/></svg>`; }
function clockSmallIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>`; }
function waitingIcon() { return `<span class="waiting-mark"><i></i><i></i><i></i></span>`; }
function checkCircleIcon() { return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>`; }
function layersIcon() { return `<svg viewBox="0 0 24 24"><path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/></svg>`; }
function shieldIcon() { return `<svg viewBox="0 0 24 24"><path d="M12 3 19 6v5c0 4.6-2.7 8-7 10-4.3-2-7-5.4-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>`; }
function alertIcon() { return `<svg viewBox="0 0 24 24"><path d="M10.3 4.5 3.4 17a2 2 0 0 0 1.8 3h13.6a2 2 0 0 0 1.8-3L13.7 4.5a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`; }
function clockIcon() { return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`; }
function closeCircleIcon() { return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg>`; }

syncOrderContext();
applyTheme(window.RELAY_CHECKOUT_CONFIG?.theme || PARTNERS.northstar, { animate: false });
updateProgress();
updateDevPanel();
window.requestAnimationFrame(() => openCheckout(openButton));
