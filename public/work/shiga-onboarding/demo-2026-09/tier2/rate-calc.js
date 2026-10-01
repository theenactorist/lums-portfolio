/* ============================================================
   Shiga — Floating Rate Calculator window
   Opens from the Rate Calculator sidebar item on the individual
   and business dashboards. Draggable, viewport-clamped, closes on
   Esc / close-button / navigation / reload.
   Live crypto price from Crypto.com public market data, with a
   static fiat-FX fallback so the panel always works.
   ============================================================ */
(function () {
  'use strict';

  // ---------- currency model ----------
  // usd = value of 1 unit of the currency, expressed in USD.
  // usd = value of ONE unit of the currency expressed in USD, so
  // rate(a,b) = CUR[a].usd / CUR[b].usd. dp = display decimal places.
  // Crypto figures are refreshed from Crypto.com on open (see refreshRates);
  // the values here are the offline fallback.
  var CUR = {
    USDT: { code:'USDT', name:'USD₮',           label:'USD₮', kind:'crypto', icon:'assets/coin-usdt.svg',       usd:1,        dp:2 },
    BTC:  { code:'BTC',  name:'Bitcoin (BTC)',   label:'BTC',  kind:'crypto', icon:'assets/glyph-btc.svg',       usd:95000,    dp:6 },
    XAUT: { code:'XAUT', name:'Tether Gold (XAU₮)', label:'XAU₮', kind:'crypto', icon:'assets/coin-xaut.svg',   usd:3350,     dp:6 },
    NGN:  { code:'NGN',  name:'Naira (NGN)',     label:'NGN',  kind:'fiat',   icon:'assets/currency-naira.svg',  usd:1/1448.66, dp:2 },
    USD:  { code:'USD',  name:'Dollar (USD)',    label:'USD',  kind:'fiat',   icon:'assets/currency-dollar.svg', usd:1,        dp:2 },
    EUR:  { code:'EUR',  name:'Euro (EUR)',      label:'EUR',  kind:'fiat',   icon:'assets/currency-euro.svg',   usd:1/0.92,   dp:2 },
    GBP:  { code:'GBP',  name:'Pound (GBP)',     label:'GBP',  kind:'fiat',   icon:'assets/currency-pound.svg',  usd:1/0.79,   dp:2 }
  };
  var ORDER_CRYPTO = ['USDT','BTC','XAUT'];
  var ORDER_FIAT   = ['NGN','USD','EUR','GBP'];
  var TOK_FONT = "Instrument Sans, 'Segoe UI Symbol', 'Noto Sans Symbols2', 'Noto Sans', system-ui, sans-serif";
  var BASE_FS = 24, MIN_FS = 13;

  // ---------- state ----------
  var st = {
    from: 'USDT', to: 'NGN',
    amount: { from: '', to: '' },   // raw numeric strings (no commas)
    focus: null,                    // 'from' | 'to' | null
    picker: null,                   // 'from' | 'to' | null
    pickerQuery: '',
    share: false,
    updatedAt: 0,
    pos: null
  };
  var rootEl = null, meas = null, _anchorEl = null;

  // ---------- helpers ----------
  function avatar(code, size) {
    size = size || 22;
    var c = CUR[code];
    return '<img class="rc-av" src="'+c.icon+'" width="'+size+'" height="'+size+'" alt="" '
      + 'style="width:'+size+'px;height:'+size+'px;border-radius:9999px;display:block;flex:none" />';
  }
  function parseAmt(s) { if (s == null) return 0; var n = parseFloat(String(s).replace(/,/g, '')); return isFinite(n) ? n : 0; }
  function rate(from, to) { return CUR[from].usd / CUR[to].usd; }
  function trimNum(n) { if (!isFinite(n)) return ''; return n.toFixed(8).replace(/\.?0+$/, ''); }
  function escapeHtml(s){ return String(s).replace(/[&<>"]/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[m]; }); }

  function fmtTyped(raw) {
    if (raw === '' || raw == null) return '';
    var p = String(raw).split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return p.join('.');
  }
  // Fixed to the currency's own precision: BTC and XAU₮ to 6dp, everything
  // else to 2. Padding to a fixed width (rather than trimming zeros) keeps
  // 0.023000 BTC reading as a crypto amount rather than a rounded one.
  function fmtComputed(n, cur) {
    if (!isFinite(n)) return '0';
    var dp = cur && typeof cur.dp === 'number' ? cur.dp : 2;
    return n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  }
  // The headline rate needs more precision than a balance does: at the
  // currency's own dp, "1 NGN = 0.00 USDT" rounds away to nothing. Below 1,
  // widen to keep four significant figures.
  function fmtRate(n, cur) {
    if (!isFinite(n)) return '0';
    var dp = cur && typeof cur.dp === 'number' ? cur.dp : 2;
    if (n > 0 && n < 1) dp = Math.min(10, Math.max(dp, 3 - Math.floor(Math.log10(n))));
    return n.toLocaleString('en-US', { minimumFractionDigits: Math.min(dp, 2), maximumFractionDigits: dp });
  }

  function displayValue(side) {
    var raw = st.amount[side];
    if (raw === '' || raw == null) return '';
    if (st.focus === side) return fmtTyped(raw);
    return fmtComputed(parseFloat(raw), CUR[st[side]]);
  }
  function syncFromActive() {
    var act = st.focus || 'from', other = act === 'from' ? 'to' : 'from';
    var a = parseAmt(st.amount[act]);
    st.amount[other] = a ? trimNum(a * rate(st[act], st[other])) : '';
  }

  function ctaForPair() {
    var fk = CUR[st.from].kind, tk = CUR[st.to].kind;
    if (fk === 'crypto' && tk === 'fiat')   return { label:'Cash Out', tab:'swap' };
    if (fk === 'fiat'   && tk === 'crypto') return { label:'Buy',      tab:'buy' };
    if (fk === 'crypto' && tk === 'crypto') return { label:'Swap',     tab:'swap' };
    return { label:'Convert', tab:null };
  }

  // ---------- icons ----------
  // Phosphor glyphs from helium-icons.js (loaded before this file), matching
  // the icons named in Figma. Sizes are the ones the design specifies.
  var _hi = window.HI || function(){ return ''; };
  var ICON = {
    grip:    _hi('list', 16),
    close:   _hi('x', 20),
    caret:   _hi('caret-down', 20),
    swap:    _hi('arrows-down-up-fill', 20),
    refresh: _hi('arrow-clockwise', 16),
    dot:     _hi('dot-outline-fill', 14),
    search:  _hi('magnifying-glass', 20),
    check:   _hi('check', 20),
    share:   _hi('share-network', 20),
    copy:    _hi('copy', 20),
    arrow:   _hi('arrow-right', 20)
  };

  // ---------- live rate fetch (Crypto.com) ----------
  // One request per instrument against Crypto.com public market data. USDT is
  // the quote asset and is treated as 1 USD, so each response is directly the
  // coin's USD value. Fiat FX has no source here, so those stay static.
  var LIVE = [
    { instrument: 'BTC_USDT',  code: 'BTC'  },
    { instrument: 'XAUT_USDT', code: 'XAUT' }
  ];
  function refreshRates(done) {
    var finished = false, pending = LIVE.length;
    function finish(){ if (finished) return; finished = true; st.updatedAt = Date.now(); if (done) done(); }
    function settle(){ if (--pending <= 0) finish(); }
    try {
      LIVE.forEach(function (spec) {
        fetch('https://api.crypto.com/exchange/v1/public/get-tickers?instrument_name=' + spec.instrument, { mode: 'cors' })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var row = j && j.result && j.result.data && j.result.data[0];
            // a = latest trade, k = ask, b = bid — take whichever is present.
            var v = parseFloat(row && (row.a || row.k || row.b));
            if (isFinite(v) && v > 0) CUR[spec.code].usd = v;
            settle();
          })
          .catch(settle);
      });
      // Never leave the panel waiting on a slow or blocked network.
      setTimeout(finish, 4000);
    } catch (e) { finish(); }
  }
  function freshness() {
    if (!st.updatedAt) return 'just now';
    var secs = Math.round((Date.now() - st.updatedAt) / 1000);
    if (secs < 45) return 'just now';
    var mins = Math.round(secs / 60);
    if (mins < 60) return mins + 'm ago';
    return Math.round(mins / 60) + 'h ago';
  }

  // ---------- render ----------
  function selectorPill(side) {
    var c = CUR[st[side]];
    return '<button class="rc-pill" data-rc="pick:'+side+'">'
      + avatar(st[side], 20)
      + '<span class="rc-pill-lbl">'+c.label+'</span>'
      + '<span class="rc-pill-caret">'+ICON.caret+'</span></button>';
  }
  function amountField(side) {
    var v = displayValue(side);
    // The chip is only drawn once the field carries a value (or gains focus,
    // handled in wireInputs) — matching Figma, where the resting field is
    // bg-secondary on a bg-secondary card and so reads as chrome-less.
    return '<div class="rc-amtbox'+(v ? ' is-filled' : '')+'" data-rc-amtbox="'+side+'">'
      + '<input class="rc-amt" data-rc-amt="'+side+'" inputmode="decimal" '
      + 'placeholder="0" value="'+escapeHtml(v)+'" /></div>';
  }
  function rateLine() {
    return '<div class="rc-rateline">'
      + '<span class="rc-rate-eq">1 '+CUR[st.from].label+' = '+fmtRate(rate(st.from, st.to), CUR[st.to])+' '+CUR[st.to].label+'</span>'
      + '<span class="rc-rate-dot">'+ICON.dot+'</span>'
      + '<button class="rc-refresh" data-rc="refresh"><span class="rc-ref-ic">'+ICON.refresh+'</span><span>'+freshness()+'</span></button>'
      + '<span class="rc-spark-slot" aria-hidden="true"></span></div>';
  }
  function pickerPanel() {
    if (!st.picker) return '';
    var q = st.pickerQuery.trim().toLowerCase();
    function match(code){ var c = CUR[code]; return !q || c.name.toLowerCase().indexOf(q) >= 0 || c.label.toLowerCase().indexOf(q) >= 0; }
    var cryptos = ORDER_CRYPTO.filter(match), fiats = ORDER_FIAT.filter(match);
    var sel = st[st.picker];
    function row(code){ var c = CUR[code], on = code === sel;
      return '<button class="rc-opt" data-rc="choose:'+code+'">'+avatar(code, 24)
        + '<span class="rc-opt-lbl">'+c.name+'</span>'
        + (on ? '<span class="rc-opt-check">'+ICON.check+'</span>' : '')+'</button>'; }
    function group(t, codes){ return codes.length ? '<div class="rc-optgroup"><div class="rc-optgroup-h">'+t+'</div>'+codes.map(row).join('')+'</div>' : ''; }
    var body = (cryptos.length || fiats.length)
      ? group('CRYPTO', cryptos) + group('FIAT', fiats)
      : '<div class="rc-noresult"><div class="rc-noresult-h">No results for \u201C'+escapeHtml(q)+'\u201D</div><div class="rc-noresult-p">Check the spelling or search using<br>another keyword.</div></div>';
    return '<div class="rc-picker" data-rc-picker>'
      + '<div class="rc-picker-search"><input class="rc-picker-input" type="text" placeholder="Search" value="'+escapeHtml(st.pickerQuery)+'" autocomplete="off" />'
      +   '<span class="rc-picker-search-ic">'+ICON.search+'</span></div>'
      + '<div class="rc-picker-list">'+body+'</div></div>';
  }
  function shareSheet() {
    if (!st.share) return '';
    var sFrom = st.amount.from ? fmtComputed(parseAmt(st.amount.from), CUR[st.from]) : '0';
    var sTo   = st.amount.to   ? fmtComputed(parseAmt(st.amount.to),   CUR[st.to])   : '0';
    var summary = sFrom + ' ' + CUR[st.from].label + ' = ' + sTo + ' ' + CUR[st.to].label;
    var now = new Date();
    var M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var hr = now.getHours(), mn = now.getMinutes(), ap = hr >= 12 ? 'PM' : 'AM', h12 = (hr % 12) || 12;
    var stamp = M[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear() + ',  ' + (h12 < 10 ? '0'+h12 : h12) + ':' + (mn < 10 ? '0'+mn : mn) + ' ' + ap;
    return '<div class="rc-dim" data-rc="share-close"></div>'
      + '<div class="rc-sheet" role="dialog" aria-label="Share rate">'
      +   '<div class="rc-sheet-title">Share</div>'
      +   '<div class="rc-sheet-summary"><div class="rc-sheet-sumcol">'
      +       '<div class="rc-sheet-sum">'+summary+'</div><div class="rc-sheet-time">'+stamp+'</div></div>'
      +     '<button class="rc-copy" data-rc="copy"><span class="rc-copy-ic">'+ICON.copy+'</span><span class="rc-copy-lbl">Copy</span></button></div>'
      +   '<div class="rc-or">Or</div>'
      +   '<div class="rc-email-field"><label class="rc-email-lbl">Email</label>'
      +     '<div class="rc-email-row"><input class="rc-email-input" type="email" placeholder="Enter email address" autocomplete="email" />'
      +       '<button class="rc-email-send" data-rc="send-email"><span class="rc-send-lbl">Send</span></button></div>'
      +     '<div class="rc-email-err"></div></div>'
      +   '<button class="rc-sheet-close" data-rc="share-close">Close</button></div>';
  }
  function render() {
    if (!rootEl) return;
    var cta = ctaForPair();
    rootEl.innerHTML =
      '<div class="rc-win">'
      + '<div class="rc-head" data-rc-drag>'
      +   '<div class="rc-head-l"><span class="rc-head-ic">'+ICON.grip+'</span><span class="rc-head-t">Rate calculator</span></div>'
      +   '<button class="rc-x" data-rc="close" title="Close">'+ICON.close+'</button></div>'
      + '<div class="rc-body"><div class="rc-pairs">'
      +   '<div class="rc-line"><div class="rc-line-l"><span class="rc-line-lbl">From</span>'+selectorPill('from')+'</div>'+amountField('from')+'</div>'
      // The swap sits inside the rule so it stays centred on it regardless of
      // how tall the rows grow.
      +   '<div class="rc-divider"><button class="rc-swap" data-rc="swap" title="Flip" aria-label="Swap currencies">'+ICON.swap+'</button></div>'
      +   '<div class="rc-line"><div class="rc-line-l"><span class="rc-line-lbl">To</span>'+selectorPill('to')+'</div>'+amountField('to')+'</div>'
      +   '</div>'+rateLine()+'</div>'
      + '<div class="rc-foot"><div class="rc-foot-btns">'
      +   '<button class="rc-btn-share" data-rc="share-open">'+ICON.share+'<span>Share</span></button>'
      +   '<button class="rc-btn-cta" data-rc="cta"><span>'+cta.label+'</span>'+ICON.arrow+'</button></div>'
      +   '<div class="rc-foot-note">Rates may vary at time of transaction</div></div>'
      + pickerPanel() + shareSheet()
      + '</div>';
    positionWindow();
    wireInputs();
  }

  // ---------- input wiring ----------
  function $from(){ return rootEl.querySelector('[data-rc-amt="from"]'); }
  function $to(){ return rootEl.querySelector('[data-rc-amt="to"]'); }

  function sizeAmt(input) {
    if (!input || !rootEl || rootEl.style.display === 'none') return;
    var box = input.parentElement;            // .rc-amtbox — already starts 24px past the selector
    var cs = getComputedStyle(input);
    var padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    // available width = full amount box minus the input's own padding; this is
    // the space from the 24px gutter to the right content edge, and it adapts
    // to the selector width (USDT vs NGN) and the window size automatically.
    var avail = box.clientWidth - padX;
    if (!(avail > 0)) return;
    var text = input.value || input.placeholder || '0';
    // mirror the input's exact font metrics onto the off-screen measurer
    meas.style.fontFamily = cs.fontFamily;
    meas.style.fontWeight = cs.fontWeight;
    meas.style.letterSpacing = cs.letterSpacing;
    meas.style.fontVariantNumeric = cs.fontVariantNumeric || 'tabular-nums';
    meas.style.fontSize = BASE_FS + 'px';
    meas.textContent = text;
    var w0 = meas.offsetWidth;
    var font = BASE_FS, cw = w0;
    if (w0 > avail) {
      // number has reached the max width — shrink the type just enough to fit
      font = Math.max(MIN_FS, BASE_FS * avail / w0);
      meas.style.fontSize = font + 'px';
      cw = Math.min(meas.offsetWidth, avail);
    }
    input.style.fontSize = font + 'px';
    // content-box width hugs the digits; total (width+padding) stays <= box width
    var w = Math.min(Math.ceil(cw) + 1, Math.floor(avail));
    // Default (empty) state: widen the click/active target to ~5x the area left
    // of the zero so it's easy to tap, while typed numbers still hug.
    if ((input.value || '') === '') w = Math.min(Math.round(cw * 6), Math.floor(avail));
    input.style.width = w + 'px';
  }
  function sizeBoth(){ sizeAmt($from()); sizeAmt($to()); }

  function onAmt(side) {
    var input = side === 'from' ? $from() : $to();
    if (!input) return;
    st.focus = side;
    var caret = input.selectionStart, before = input.value.slice(0, caret).replace(/[^0-9.]/g, '');
    var clean = input.value.replace(/[^0-9.]/g, ''); var fd = clean.indexOf('.');
    if (fd !== -1) clean = clean.slice(0, fd + 1) + clean.slice(fd + 1).replace(/\./g, '');
    st.amount[side] = clean;
    var formatted = fmtTyped(clean); input.value = formatted;
    var n = before.length, pos = 0, seen = 0;
    while (pos < formatted.length && seen < n) { if (/[0-9.]/.test(formatted.charAt(pos))) seen++; pos++; }
    try { input.setSelectionRange(pos, pos); } catch (e) {}
    var other = side === 'from' ? 'to' : 'from';
    var a = parseAmt(clean);
    st.amount[other] = a ? trimNum(a * rate(st[side], st[other])) : '';
    var oin = side === 'from' ? $to() : $from();
    if (oin) oin.value = st.amount[other] === '' ? '' : fmtComputed(parseFloat(st.amount[other]), CUR[st[other]]);
    sizeBoth();
  }

  function wireInputs() {
    var f = $from(), t = $to();
    [['from', f], ['to', t]].forEach(function (pair) {
      var side = pair[0], el = pair[1]; if (!el) return;
      var box = el.parentElement;
      var syncChip = function () {
        if (!box) return;
        box.classList.toggle('is-filled', !!el.value);
      };
      el.addEventListener('input', function () {
        onAmt(side);
        // Both fields change together, so refresh each chip, not just this one.
        [f, t].forEach(function (o) { if (o && o.parentElement) o.parentElement.classList.toggle('is-filled', !!o.value); });
      });
      el.addEventListener('focus', function () { st.focus = side; if (box) box.classList.add('is-focus'); });
      el.addEventListener('blur', function () { if (box) box.classList.remove('is-focus'); syncChip(); });
    });
    var inp = rootEl.querySelector('.rc-picker-input');
    if (inp) {
      inp.focus();
      try { inp.setSelectionRange(inp.value.length, inp.value.length); } catch (e) {}
      inp.addEventListener('input', function () { st.pickerQuery = inp.value; renderPickerOnly(); });
      positionPicker();
    }
    var em = rootEl.querySelector('.rc-email-input');
    if (em) em.addEventListener('input', function () {
      var err = rootEl.querySelector('.rc-email-err'); if (err) err.textContent = '';
      em.classList.remove('rc-email-input--err');
    });
    if (!st.picker && !st.share && st.focus) {
      var act = st.focus === 'from' ? f : t;
      if (act) { act.focus(); try { var L = act.value.length; act.setSelectionRange(L, L); } catch (e2) {} }
    }
    sizeBoth();
    // re-measure after layout settles and after the avatar images load (the
    // selector width — hence the available gutter — changes once they paint)
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(sizeBoth);
    [f, t].forEach(function (el) {
      if (!el) return;
      var pill = el.closest('.rc-line').querySelector('.rc-av');
      if (pill && !pill.complete) pill.addEventListener('load', sizeBoth, { once: true });
    });
  }

  function renderPickerOnly() {
    var old = rootEl.querySelector('.rc-picker'); if (!old) return;
    var tmp = document.createElement('div'); tmp.innerHTML = pickerPanel();
    var fresh = tmp.firstElementChild; if (!fresh) return;
    old.replaceWith(fresh);
    var inp = rootEl.querySelector('.rc-picker-input');
    if (inp) {
      inp.focus(); try { inp.setSelectionRange(inp.value.length, inp.value.length); } catch (e) {}
      inp.addEventListener('input', function () { st.pickerQuery = inp.value; renderPickerOnly(); });
    }
    positionPicker();
  }

  // ---------- positioning + drag ----------
  // Figma 17731:8644 is 412 x ~400. The window is drawn at that size and then
  // scaled by --canvas-scale to match the rest of the page, so clamping and
  // picker offsets have to work in scaled pixels.
  var WIN_W = 412, WIN_H = 400;
  function SC(){
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--canvas-scale'));
    return (isFinite(v) && v > 0) ? v : 1;
  }
  function positionWindow() {
    var win = rootEl.querySelector('.rc-win'); if (!win) return;
    var pos = st.pos;
    if (!pos) {
      var a = currentAnchor();
      if (a) { var r = a.getBoundingClientRect(); pos = { left: r.right + 12, top: Math.max(12, r.top - 8) }; }
      else { pos = { left: window.innerWidth - WIN_W - 40, top: 120 }; }
    }
    pos = clamp(pos.left, pos.top); st.pos = pos;
    win.style.left = pos.left + 'px'; win.style.top = pos.top + 'px';
  }
  function positionPicker() {
    var pk = rootEl.querySelector('.rc-picker'); if (!pk || !st.picker) return;
    var pill = rootEl.querySelector('[data-rc="pick:' + st.picker + '"]');
    var win = rootEl.querySelector('.rc-win'); if (!pill || !win) return;
    // Rects are post-transform; the offsets below are written into the scaled
    // coordinate space inside .rc-win, so divide the deltas back out.
    var sc = SC();
    var wr = win.getBoundingClientRect(), pr = pill.getBoundingClientRect();
    pk.style.left = ((pr.left - wr.left) / sc) + 'px';
    pk.style.top = ((pr.bottom - wr.top) / sc + 8) + 'px';
    var maxH = (window.innerHeight - pr.bottom - 16) / sc;
    pk.style.maxHeight = Math.max(180, Math.min(360, maxH)) + 'px';
  }
  function clamp(left, top) {
    var sc = SC();
    var maxL = window.innerWidth - WIN_W * sc - 8, maxT = window.innerHeight - WIN_H * sc - 8;
    return { left: Math.max(8, Math.min(left, Math.max(8, maxL))), top: Math.max(8, Math.min(top, Math.max(8, maxT))) };
  }
  function currentAnchor() {
    if (_anchorEl && document.contains(_anchorEl)) return _anchorEl;
    return document.querySelector('[data-act="open-rate-calc"]');
  }
  function initDrag() {
    var dragging = false, sx = 0, sy = 0, ol = 0, ot = 0;
    rootEl.addEventListener('mousedown', function (e) {
      var handle = e.target.closest('[data-rc-drag]');
      if (!handle || e.target.closest('.rc-x')) return;
      var win = rootEl.querySelector('.rc-win');
      dragging = true; sx = e.clientX; sy = e.clientY;
      ol = parseFloat(win.style.left) || 0; ot = parseFloat(win.style.top) || 0;
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var p = clamp(ol + (e.clientX - sx), ot + (e.clientY - sy)); st.pos = p;
      var win = rootEl.querySelector('.rc-win'); if (win) { win.style.left = p.left + 'px'; win.style.top = p.top + 'px'; }
    });
    document.addEventListener('mouseup', function () { dragging = false; });
    window.addEventListener('resize', function () {
      if (rootEl && rootEl.style.display !== 'none') { positionWindow(); positionPicker(); sizeBoth(); }
    });
  }

  // ---------- actions ----------
  function onClick(e) {
    var t = e.target.closest('[data-rc]'); if (!t) return;
    var act = t.dataset.rc;
    e.stopPropagation();
    if (act === 'close') { close(); return; }
    if (act === 'refresh') {
      var btn = t; btn.classList.remove('rc-spin'); void btn.offsetWidth; btn.classList.add('rc-spin');
      refreshRates(function () { var s = rootEl.querySelector('.rc-rate-eq'); if (s) s.textContent = '1 ' + CUR[st.from].label + ' = ' + fmtComputed(rate(st.from, st.to), CUR[st.to]) + ' ' + CUR[st.to].label; var fr = rootEl.querySelector('.rc-refresh span:last-child'); if (fr) fr.textContent = freshness(); });
      return;
    }
    if (act.indexOf('pick:') === 0) {
      var s = act.split(':')[1];
      st.picker = st.picker === s ? null : s; st.pickerQuery = '';
      render(); return;
    }
    if (act.indexOf('choose:') === 0) {
      var code = act.split(':')[1], which = st.picker, other = which === 'from' ? st.to : st.from;
      if (code === other) doSwap(); else st[which] = code;
      st.picker = null; syncFromActive(); render(); return;
    }
    if (act === 'swap') {
      var sw = rootEl.querySelector('.rc-swap'); if (sw) { sw.classList.remove('rc-turn'); void sw.offsetWidth; sw.classList.add('rc-turn'); }
      doSwap(); render(); return;
    }
    if (act === 'share-open') { st.share = true; st.picker = null; render(); return; }
    if (act === 'share-close') { st.share = false; render(); return; }
    if (act === 'copy') {
      var sum = rootEl.querySelector('.rc-sheet-sum'), time = rootEl.querySelector('.rc-sheet-time');
      var txt = (sum ? sum.textContent : '') + (time ? '\n' + time.textContent : '') + '\nvia Enta';
      try { navigator.clipboard && navigator.clipboard.writeText(txt); } catch (e2) {}
      var cb = rootEl.querySelector('.rc-copy');
      if (cb) { cb.classList.add('rc-copy--ok');
        var lbl = cb.querySelector('.rc-copy-lbl'), ic = cb.querySelector('.rc-copy-ic');
        if (lbl) lbl.textContent = 'Copied'; if (ic) ic.innerHTML = ICON.check; }
      return;
    }
    if (act === 'send-email') {
      var emi = rootEl.querySelector('.rc-email-input'), err = rootEl.querySelector('.rc-email-err');
      var v = (emi && emi.value || '').trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!ok) { if (err) err.textContent = v ? 'This doesn\u2019t look like a valid email.' : 'Add an email address.'; if (emi) emi.classList.add('rc-email-input--err'); return; }
      var sb = rootEl.querySelector('.rc-email-send');
      if (sb) { sb.classList.add('rc-email-send--ok'); sb.disabled = true; sb.innerHTML = ICON.check + '<span class="rc-send-lbl">Sent</span>'; }
      if (emi) emi.disabled = true;
      return;
    }
    if (act === 'cta') { var c = ctaForPair(); launchFlow(c.tab); return; }
  }

  function doSwap() {
    var f = st.from; st.from = st.to; st.to = f;
    var af = st.amount.from; st.amount.from = st.amount.to; st.amount.to = af;
  }

  function launchFlow(tab) {
    try { window.state = window.state || {}; window.state.rateCalcCarry = { from: st.from, to: st.to, amount: parseAmt(st.amount.from), tab: tab }; } catch (e) {}
    close();
    if (!tab) return;
    try {
      window.state.t2Tab = tab;
      if (typeof window.rerenderTier2Home === 'function') window.rerenderTier2Home();
      if (window.state.frame === 'b-tier2-home' && typeof window.setFrame === 'function') window.setFrame('b-tier2-home', { noHistory: true });
    } catch (e2) {}
  }

  // ---------- key + outside-click ----------
  function onKey(e) {
    if (!rootEl || rootEl.style.display === 'none') return;
    if (e.key !== 'Escape') return;
    if (st.share) { st.share = false; render(); return; }
    if (st.picker) { st.picker = null; var pk = rootEl.querySelector('.rc-picker'); if (pk) pk.remove(); return; }
    close();
  }
  function onDocDown(e) {
    if (!rootEl || rootEl.style.display === 'none' || !st.picker) return;
    if (e.target.closest && (e.target.closest('[data-rc-picker]') || e.target.closest('[data-rc^="pick:"]'))) return;
    st.picker = null; st.pickerQuery = '';
    var pk = rootEl.querySelector('.rc-picker'); if (pk) pk.remove();
  }

  // ---------- open / close ----------
  function ensureRoot() {
    if (rootEl) return;
    rootEl = document.createElement('div');
    rootEl.id = 'rate-calc-root';
    rootEl.style.display = 'none';
    document.body.appendChild(rootEl);
    // Measurer lives on <body>, NOT inside rootEl — render() rewrites rootEl's
    // innerHTML on every paint, which would otherwise destroy it and make every
    // measurement return 0 (collapsing the field to its min width).
    meas = document.createElement('span');
    meas.setAttribute('aria-hidden', 'true');
    meas.style.cssText = 'position:absolute;left:-9999px;top:-9999px;white-space:pre;' +
      'visibility:hidden;pointer-events:none;font-variant-numeric:tabular-nums;';
    document.body.appendChild(meas);
    rootEl.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDocDown, true);
    initDrag();
    // Re-measure once the web font is ready — measuring before it loads returns
    // the wrong glyph widths and leaves the field starting too small.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (rootEl && rootEl.style.display !== 'none') sizeBoth();
      });
    }
  }
  function detectTheme(anchor) {
    var t = anchor && anchor.getAttribute && anchor.getAttribute('data-rc-theme');
    if (t === 'business' || t === 'individual') return t;
    try { if (window.state && typeof window.state.frame === 'string' && window.state.frame.indexOf('b-') === 0) return 'business'; } catch (e) {}
    return 'individual';
  }
  function open(anchorEl) {
    ensureRoot();
    _anchorEl = anchorEl || null;
    if (rootEl.style.display !== 'none') { close(); return; }
    st.share = false; st.picker = null;
    rootEl.classList.toggle('rc-theme-business', detectTheme(anchorEl) === 'business');
    if (!st.updatedAt) refreshRates(render);
    syncFromActive();
    rootEl.style.display = 'block';
    render();
  }
  function close() {
    if (!rootEl) return;
    rootEl.style.display = 'none';
    st.picker = null; st.share = false;
  }

  function hookNav() {
    if (window.__rcNavHooked) return;
    var tryHook = function () {
      if (typeof window.setFrame === 'function' && !window.setFrame.__rcWrapped) {
        var orig = window.setFrame;
        var wrapped = function () { close(); return orig.apply(this, arguments); };
        wrapped.__rcWrapped = true; window.setFrame = wrapped; window.__rcNavHooked = true; return true;
      }
      return false;
    };
    if (!tryHook()) { var iv = setInterval(function () { if (tryHook()) clearInterval(iv); }, 120); setTimeout(function () { clearInterval(iv); }, 6000); }
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-act="open-rate-calc"]');
    if (!t) return; e.preventDefault(); open(t);
  });

  // keep the freshness label ticking while open
  setInterval(function () {
    if (!rootEl || rootEl.style.display === 'none' || st.share || st.picker) return;
    var fr = rootEl.querySelector('.rc-refresh span:last-child'); if (fr) fr.textContent = freshness();
  }, 1000);

  hookNav();
  window.RateCalc = { open: open, close: close };
})();
