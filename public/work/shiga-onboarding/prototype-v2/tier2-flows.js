/* ============== Enta — Quick action card flows (Send / Swap / Buy) ==============
   Builds tab body content for Send, Swap, Buy. Receive stays in tier2-home.js.
   Mounted by overriding window.T2Flows. Reuses state/handle/rerender from tier2-home.js. */

(function(){
  // ----- shared utilities pulled from tier2-home -----
  function I(){ return window.t2Icons; }
  function mask(s){ return window.t2MaskAmt ? window.t2MaskAmt(s) : s; }
  function copyBtn(id, sm){ return window.t2CopyBtn ? window.t2CopyBtn(id, sm) : ''; }
  function rerender(){ if (window.rerenderTier2Home) window.rerenderTier2Home(); }

  // ----- inline icons specific to flows -----
  function _ic(d, opts){
    opts = opts || {};
    var sz = opts.size || 20;
    return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(opts.sw||1.7)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
  }
  var IF = {
    caretDown: _ic('<path d="m6 9 6 6 6-6"/>', {sw:2.2, size:20}),
    caretLeft: _ic('<path d="m15 18-6-6 6-6"/>', {sw:2.2, size:20}),
    caretRight: _ic('<path d="m9 6 6 6-6 6"/>', {sw:2.2, size:20}),
    search:    _ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', {sw:1.7, size:18}),
    close:     _ic('<path d="M6 6 18 18M18 6 6 18"/>', {sw:2, size:18}),
    flip:      _ic('<path d="M3 7h13M16 7l-3-3M16 7l-3 3"/><path d="M21 17H8M8 17l3-3M8 17l3 3"/>', {sw:1.8, size:18}),
    plus:      _ic('<path d="M12 5v14M5 12h14"/>', {sw:2, size:18}),
    bank:      _ic('<path d="M3 9 12 4l9 5"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 20h18"/>', {sw:1.7, size:20}),
    atSign:    _ic('<circle cx="12" cy="12" r="9"/><path d="M12 8a4 4 0 1 0 4 4v1a2 2 0 0 0 4 0v-1a8 8 0 1 0-3.2 6.4"/>', {sw:1.7, size:20}),
    walletGlyph:_ic('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14" r="1.2"/>', {sw:1.7, size:20}),
    clock:     _ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', {sw:1.8, size:48}),
    clockCountdown: _ic('<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7v5l3.2 2"/><circle cx="18" cy="6" r=".7" fill="currentColor" stroke="none"/><circle cx="21" cy="9" r=".7" fill="currentColor" stroke="none"/><circle cx="20.5" cy="4" r=".7" fill="currentColor" stroke="none"/>', {sw:1.8, size:24}),
    clockSm:   _ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', {sw:1.8, size:16}),
    checkBig:  _ic('<path d="m5 12 5 5L20 7"/>', {sw:2.4, size:28}),
    copySm:    _ic('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>', {sw:1.7, size:16})
  };

  // ----- mock asset / network / beneficiary data -----
  // each network row: token+network with balance + rate to GBP
  var NETWORKS = [
    { sym:'USDT', net:'Solana',   key:'solana',    glyph:'assets/network-solana.svg',      balCrypto:'2,749.59', balFiat:'2,113.04' },
    { sym:'USDT', net:'Base',     key:'base',      glyph:'assets/network-base.svg',     balCrypto:'1,500.00', balFiat:'1,153.45' },
    { sym:'USDT', net:'Optimism', key:'optimism',  glyph:'assets/network-optimism.svg', balCrypto:'1,500.00', balFiat:'1,153.45' },
    { sym:'USDT', net:'Arbitrum', key:'arbitrum',  glyph:'assets/network-arbitrum.svg',    balCrypto:'0',        balFiat:'0' },
    { sym:'USDT', net:'Celo',     key:'celo',      glyph:'assets/network-celo.svg',        balCrypto:'3.11',     balFiat:'2.40' },
    { sym:'USDT', net:'Polygon',  key:'polygon',   glyph:'assets/network-polygon.svg',     balCrypto:'3.11',     balFiat:'2.40' },
    { sym:'BTC',  net:'Bitcoin',  key:'bitcoin',   glyph:'assets/network-bitcoin.svg',     balCrypto:'0.023',    balFiat:'1,313.73' },
    { sym:'BTC',  net:'Lightning',key:'lightning', glyph:'assets/network-lightning.svg',   balCrypto:'0.006',    balFiat:'350.00' }
  ];

  var FIATS = [
    { code:'NGN', name:'Naira', glyph:'assets/currency-naira.svg' },
    { code:'EUR', name:'Euro',  glyph:'assets/currency-euro.svg' },
    { code:'GBP', name:'Pound', glyph:'assets/currency-pound.svg' }
  ];

  var BENEFICIARIES = [
    { id:'joyce',   name:'Joyce Abdul',   type:'crypto', detail:'USDT on Base',           glyph:'assets/token-usdt-base.svg' },
    { id:'segi',    name:'Segilola Edu',  type:'fiat',   detail:'GT Bank · 0126627506',   glyph:'assets/currency-naira.svg', currency:'NGN', accountNo:'0126627506', bank:'GT Bank' },
    { id:'mark',    name:'Mark Carter',   type:'crypto', detail:'BTC · Bitcoin',          glyph:'assets/glyph-btc.svg' },
    { id:'kemi',    name:'Kemi Adebayo',  type:'fiat',   detail:'Access Bank · 0099112277', glyph:'assets/currency-naira.svg', currency:'NGN', accountNo:'0099112277', bank:'Access Bank' },
    { id:'leo',     name:'Leo Park',      type:'crypto', detail:'USDT on Optimism',       glyph:'assets/token-usdt-optimism.svg' },
    { id:'eu',      name:'Anna Müller',   type:'fiat',   detail:'N26 · DE89 3704 0044',   glyph:'assets/currency-euro.svg',  currency:'EUR', accountNo:'DE89370400440532013000', bank:'N26' },
    { id:'uk',      name:'Tom Reid',      type:'fiat',   detail:'Monzo · 04-00-04',       glyph:'assets/currency-pound.svg', currency:'GBP', accountNo:'12345678', bank:'Monzo' }
  ];

  // simple mock rates anchored to USDT (1 USDT = X)
  var RATES = {
    'USDT':1, 'BTC': 60000, 'GBP': 0.78, 'EUR': 0.92, 'NGN': 1450
  };
  function fmtNum(v){
    if (v == null || v === '') return v;
    var s = String(v).replace(/,/g,'');
    if (s === '' || s === '-' || s === '.') return s;
    var neg = s.charAt(0) === '-'; if (neg) s = s.slice(1);
    // preserve trailing dot if user is typing "12."
    var trailingDot = s.charAt(s.length-1) === '.';
    if (!isFinite(parseFloat(s))) return v;
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var out = parts.join('.');
    if (trailingDot && out.indexOf('.') === -1) out += '.';
    return (neg?'-':'') + out;
  }
  window.fmtNum = fmtNum;

  function convert(amount, from, to){
    var n = parseFloat(String(amount).replace(/,/g,''));
    if (!isFinite(n) || !n) return '';
    var inUsdt = n / (RATES[from] || 1);
    var out = inUsdt * (RATES[to] || 1);
    var fixed;
    if (to === 'BTC') fixed = out.toFixed(6).replace(/\.?0+$/,'');
    else if (to === 'NGN') fixed = out.toFixed(0);
    else fixed = out.toFixed(2);
    return fmtNum(fixed);
  }
  function convertRate(from, to){
    var inUsdt = 1 / (RATES[from] || 1);
    var out = inUsdt * (RATES[to] || 1);
    // always 4 decimal places per design
    return fmtNum(out.toFixed(4));
  }
  function fmtAmt(s){ return s == null ? '' : String(s); }

  // ----- state init -----
  function initFlows(){
    // Use the same state object the rest of the app uses (set by prototype.html).
    // Do NOT replace it — that would fork lexical `state` from `window.state`.
    var s = window.state;
    if (!s) return; // prototype.html hasn't set up state yet
    if (!s.send) s.send = { beneficiary:null, network:null, amount:'', toAmount:'', narration:'', beamAsset:false };
    if (!s.swap) s.swap = { from:null, to:null, amount:'', toAmount:'' };
    if (!s.buy)  s.buy  = { asset:null, fiat:'GBP', fiatAmount:'', cryptoAmount:'' };
    if (!s.modal) s.modal = null;
    if (!s.popover) s.popover = null;
    if (s.assetPickerOpen === undefined) s.assetPickerOpen = null;
    if (s.assetPickerQ === undefined) s.assetPickerQ = '';
    if (!s.t2Copies) s.t2Copies = {};
  }

  // ----- popovers -----
  // ----- inline asset picker (matches Receive tab picker visually) -----
  function InlineAssetPicker(ctx){
    var s = window.state;
    var selKey = ctx === 'send' ? s.send.network
              : ctx === 'swap-from' ? s.swap.from
              : ctx === 'swap-to'   ? s.swap.to
              : ctx === 'buy'       ? s.buy.asset
              : null;
    // Use the SAME data as the Receive picker.
    var groups = (window.t2RecvGroups ? window.t2RecvGroups() : []);
    // Find selection {sym, key} across groups by key match.
    var selSym = null;
    if (selKey){
      for (var gi=0; gi<groups.length; gi++){
        for (var ii=0; ii<groups[gi].items.length; ii++){
          if (groups[gi].items[ii].key === selKey){ selSym = groups[gi].sym; break; }
        }
        if (selSym) break;
      }
    }
    var pickerHtml = window.T2AssetPicker({
      ctx: ctx,
      groups: groups,
      sel: selSym ? { sym:selSym, key:selKey } : null,
      open: true,
      q: s.assetPickerQ,
      placeholder: 'Select asset',
      hidePill: true
    });
    return '<div class="t2-tab-body t2-receive">'+pickerHtml+'</div>';
  }

  function NetworkPicker(ctx){
    // grouped by asset symbol
    var groups = {};
    NETWORKS.forEach(function(n){
      if (!groups[n.sym]) groups[n.sym] = [];
      groups[n.sym].push(n);
    });
    var html = '<div class="t2-pop-back" data-act="pop-close"></div>';
    html += '<div class="t2-pop t2-pop-assets">';
    html += '<div class="t2-pop-head"><span class="t2-pop-title">Select asset</span><button class="t2-pop-x" data-act="pop-close">'+IF.close+'</button></div>';
    html += '<div class="t2-pop-search"><span class="t2-pop-searchic">'+IF.search+'</span><input placeholder="Search" data-act="t2-noop"/></div>';
    html += '<div class="t2-pop-scroll">';
    Object.keys(groups).forEach(function(sym){
      html += '<div class="t2-pop-group">';
      html += '<div class="t2-pop-grouphead">'+sym+'</div>';
      html += '<div class="t2-pop-netrow">';
      groups[sym].forEach(function(n){
        html += '<button class="t2-pop-netcard" data-act="pop-pick:'+ctx+':'+n.key+'">'+
          '<img src="'+n.glyph+'" alt="" width="32" height="32"/>'+
          '<div class="t2-pop-netname">'+n.net+'</div>'+
          '<div class="t2-pop-netbal">'+n.balCrypto+' '+sym+'</div>'+
        '</button>';
      });
      html += '</div></div>';
    });
    html += '</div></div>';
    return html;
  }

  function BeneficiaryPicker(){
    var filter = (window.state.popover && window.state.popover.filter) || 'all';
    var rows = BENEFICIARIES.filter(function(b){
      if (filter === 'wallets') return b.type === 'crypto';
      if (filter === 'banks') return b.type === 'fiat';
      return true;
    });
    var html = '<div class="t2-bendrop">';
    html += '<div class="t2-bendrop-filters">';
    [['all','All'],['wallets','Wallets'],['banks','Banks']].forEach(function(f){
      html += '<button class="t2-bendrop-filter '+(filter===f[0]?'on':'')+'" data-act="ben-filter:'+f[0]+'">'+f[1]+'</button>';
    });
    html += '</div>';
    html += '<div class="t2-bendrop-search"><span class="t2-bendrop-searchic">'+IF.search+'</span><input placeholder="Search beneficiaries" data-act="t2-noop"/></div>';
    html += '<div class="t2-bendrop-scroll">';
    rows.forEach(function(b){
      var ic = '<img class="t2-ben-ic-img" src="'+b.glyph+'" alt=""/>';
      html += '<button class="t2-ben-row" data-act="ben-pick:'+b.id+'">'+
        ic+
        '<div class="t2-ben-meta"><div class="t2-ben-name">'+b.name+'</div><div class="t2-ben-detail">'+b.detail+'</div></div>'+
      '</button>';
    });
    html += '</div></div>';
    return html;
  }

  function FiatPopover(){
    var sel = window.state.buy.fiat;
    var html = '<div class="t2-pop-fiat-back" data-act="pop-close"></div>';
    html += '<div class="t2-pop-fiat">';
    FIATS.forEach(function(f){
      html += '<button class="t2-pop-fiat-row '+(sel===f.code?'on':'')+'" data-act="fiat-pick:'+f.code+'">'+
        '<img src="'+f.glyph+'" alt="" width="24" height="24"/>'+
        '<span class="t2-pop-fiat-name">'+f.name+'</span>'+
      '</button>';
    });
    html += '</div>';
    return html;
  }

  // ----- helpers -----
  function netByKey(key){ for (var i=0;i<NETWORKS.length;i++) if (NETWORKS[i].key===key) return NETWORKS[i]; return null; }
  function benById(id){ for (var i=0;i<BENEFICIARIES.length;i++) if (BENEFICIARIES[i].id===id) return BENEFICIARIES[i]; return null; }
  function fiatByCode(c){ for (var i=0;i<FIATS.length;i++) if (FIATS[i].code===c) return FIATS[i]; return null; }

  // ----- shared bits -----
  function tabsStrip(active){
    var tabs = [['receive','Receive'],['send','Send'],['swap','Swap'],['buy','Buy']];
    return '<div class="t2-qa-tabs">'+tabs.map(function(t){
      return '<button class="t2-qa-tab '+(active===t[0]?'on':'')+'" data-act="t2-tab:'+t[0]+'">'+t[1]+'</button>';
    }).join('')+'</div>';
  }
  // beam helper - wraps element with fuchsia ring class when active
  function beamCls(isBeam){ return isBeam ? ' t2-beam' : ''; }

  function reviewBtn(label, enabled, act){
    return '<button class="t2-rev-btn '+(enabled?'on':'off')+'" '+(enabled?'data-act="'+act+'"':'')+'>'+label+'</button>';
  }

  function chevDown(){ return '<span class="t2-chip-chev">'+IF.caretDown+'</span>'; }

  function pctChips(act){
    return '<div class="t2-pct">'+['25%','50%','75%','MAX'].map(function(p){
      return '<button class="t2-pct-pill" data-act="'+act+':'+p+'">'+p+'</button>';
    }).join('')+'</div>';
  }

  // Asset chip — when selected shows token+name, when empty shows "Select asset"
  function assetChip(net, action, opts){
    opts = opts || {};
    if (!net){
      return '<button class="t2-chip t2-chip-asset'+beamCls(opts.beam)+'" data-act="'+action+'">'+
        '<span class="t2-chip-text">Select asset</span>'+chevDown()+
      '</button>';
    }
    var label = net.net;
    return '<button class="t2-chip t2-chip-asset filled" data-act="'+action+'">'+
      '<img class="t2-chip-glyph" src="'+net.glyph+'" alt=""/>'+
      '<span class="t2-chip-text">'+label+'</span>'+chevDown()+
    '</button>';
  }

  function fiatChip(fiat, action, opts){
    opts = opts || {};
    return '<button class="t2-chip t2-chip-asset filled" data-act="'+action+'">'+
      '<img class="t2-chip-glyph" src="'+fiat.glyph+'" alt=""/>'+
      '<span class="t2-chip-text">'+fiat.name+'</span>'+chevDown()+
    '</button>';
  }

  // Dual-amount card pair (From/To-style)
  function amountCard(opts){
    // opts: { label, chip, amount, balanceText, percentChipsAction, amountAction, accent, readonlySm, smallChipLabel }
    var amt = opts.amount;
    var isEmpty = !amt || amt === '0';
    var amtColor = isEmpty ? 'empty' : 'filled';
    var amtDisplay = isEmpty ? '' : fmtNum(amt);
    // Auto-shrink amount font when the value gets long. Length includes commas.
    var refLen = isEmpty ? 0 : String(amtDisplay).length;
    var sizeCls = refLen <= 8 ? '' : refLen <= 11 ? ' t2-amt-md' : refLen <= 14 ? ' t2-amt-sm' : ' t2-amt-xs';
    var top = '<div class="t2-amtc-top">'+
      '<span class="t2-amtc-label">'+opts.label+'</span>';
    if (opts.percentChipsAction){
      top += pctChips(opts.percentChipsAction);
    } else if (opts.smallChipLabel){
      top += '<span class="t2-amtc-sublabel">'+opts.smallChipLabel+'</span>';
    }
    top += '</div>';
    var bot = '<div class="t2-amtc-bot">'+opts.chip;
    if (opts.amountAction){
      bot += '<input class="t2-amt-input '+amtColor+sizeCls+'" value="'+amtDisplay+'" placeholder="0" inputmode="decimal" data-act="'+opts.amountAction+'"/>';
    } else {
      bot += '<span class="t2-amt-static '+amtColor+sizeCls+'">'+(isEmpty?'0':amtDisplay)+'</span>';
    }
    bot += '</div>';
    var extra = '';
    if (opts.balanceText){
      extra = '<div class="t2-amtc-balance">'+opts.balanceText+'</div>';
    }
    return '<div class="t2-amtc">'+top+bot+extra+'</div>';
  }

  // ====================================================================
  // SEND FLOW
  // ====================================================================
  function SendTabBody(){
    var apoSend = window.state.assetPickerOpen === 'send';
    var s = window.state.send;
    var ben = s.beneficiary ? benById(s.beneficiary) : null;
    var net = s.network ? netByKey(s.network) : null;
    var benBeam = !ben;
    var assetBeam = !!ben && !net;
    if (s && s.beamAsset) assetBeam = true;
    var hasAmt = !!s.amount && parseFloat(s.amount) > 0;
    var isFiat = ben && ben.type === 'fiat';
    var benLabel = ben ? ben.name : 'Select beneficiary';

    var benChip = '<button class="t2-chip t2-chip-ben'+beamCls(benBeam)+(ben?' filled':'')+'" data-act="ben-open">'+
      '<span class="t2-chip-text">'+benLabel+'</span>'+chevDown()+
    '</button>';

    // From card
    var fromChip = assetChip(net, 'asset-open:send', { shortName:true, beam: assetBeam });
    var fromCard = amountCard({
      label:'Send',
      chip: fromChip,
      amount: net ? (s.amount || '0') : '0',
      balanceText: net ? ('Balance: '+net.balCrypto+' '+net.sym) : '',
      percentChipsAction: net ? 'send-pct' : null,
      amountAction: net ? 'send-amt' : 'send-need-asset'
    });

    // To card — differs for crypto vs fiat
    var toCard;
    if (isFiat){
      var fiat = fiatByCode(ben.currency || 'NGN');
      var toChip = '<button class="t2-chip t2-chip-disabled" data-act="t2-noop" tabindex="-1" aria-disabled="true">'+
        '<img class="t2-chip-glyph" src="'+fiat.glyph+'" alt=""/>'+
        '<span class="t2-chip-text">'+fiat.name+'</span>'+
      '</button>';
      toCard = amountCard({
        label: ben.name + ' gets',
        chip: toChip,
        amount: s.toAmount || '0',
        smallChipLabel: 'Amount'
      });
    } else if (ben && ben.id === 'joyce') {
      // Crypto beneficiary — mirror what they receive (USDT on Base)
      var joyceNet = netByKey('base');
      var joyceChip = '<button class="t2-chip t2-chip-disabled" data-act="t2-noop" tabindex="-1" aria-disabled="true">'+
        '<img class="t2-chip-glyph" src="'+joyceNet.glyph+'" alt=""/>'+
        '<span class="t2-chip-text">'+joyceNet.sym+' on '+joyceNet.net+'</span>'+
      '</button>';
      toCard = amountCard({
        label: ben.name + ' gets',
        chip: joyceChip,
        amount: s.toAmount || '0',
        smallChipLabel:'Amount'
      });
    } else {
      // Default crypto beneficiary — show "USDT on <Net>" with combined glyph
      var defaultLabel = ben ? ben.detail : 'Asset';
      var defaultGlyphImg = ben ? '<img class="t2-chip-glyph" src="'+ben.glyph+'" alt=""/>' : '';
      var toChipC = '<button class="t2-chip t2-chip-disabled" data-act="t2-noop" tabindex="-1" aria-disabled="true">'+
        defaultGlyphImg+
        '<span class="t2-chip-text">'+defaultLabel+'</span>'+
      '</button>';
      toCard = amountCard({
        label: (ben ? ben.name : 'Beneficiary') + ' gets',
        chip: toChipC,
        amount: s.toAmount || '0',
        smallChipLabel:'Amount'
      });
    }

    // Rate caption
    var rateLine = '';
    if (net){
      var rateRight = isFiat ? (ben.currency || 'NGN') : 'USDT';
      var rateVal = convert(1, net.sym, rateRight);
      rateLine = '<div class="t2-rate">1 '+net.sym+' \u2248 '+convertRate(net.sym, rateRight)+' '+rateRight+'</div>';
    }

    // Narration for fiat
    var narration = '';
    if (isFiat){
      narration = '<div class="t2-narration"><input placeholder="Add a description (optional)" value="'+(s.narration||'')+'" data-act="send-narration"/></div>';
    }

    var pop = window.state.popover;
    var benDrop = (pop && pop.kind === 'ben') ? BeneficiaryPicker() : '';
    var assetDrop = apoSend ? '<div class="t2-assetdrop t2-assetdrop-send">'+InlineAssetPicker('send')+'</div>' : '';
    return '<div class="t2-tab-body t2-send">'+
      '<div class="t2-to-row"><span class="t2-to-label">To:</span>'+benChip+'</div>'+
      benDrop+
      '<div class="t2-amtc-stack">'+fromCard+toCard+rateLine+narration+'</div>'+
      assetDrop+
      reviewBtn('Review send', hasAmt && !!net, 'send-review')+
    '</div>';
  }

  // ====================================================================
  // SWAP FLOW
  // ====================================================================
  function SwapTabBody(){
    var apoFrom = window.state.assetPickerOpen === 'swap-from';
    var apoTo   = window.state.assetPickerOpen === 'swap-to';
    var s = window.state.swap;
    var from = s.from ? netByKey(s.from) : null;
    var to   = s.to   ? netByKey(s.to)   : null;
    var fromBeam = !from;
    var toBeam = !!from && !to;
    var hasAmt = !!s.amount && parseFloat(s.amount) > 0;

    var fromChip = from
      ? '<button class="t2-chip t2-chip-asset filled" data-act="asset-open:swap-from"><img class="t2-chip-glyph" src="'+from.glyph+'"/><span class="t2-chip-text">'+from.net+'</span>'+chevDown()+'</button>'
      : '<button class="t2-chip t2-chip-asset'+beamCls(fromBeam)+'" data-act="asset-open:swap-from"><span class="t2-chip-text">Select asset</span>'+chevDown()+'</button>';

    var toChip = to
      ? '<button class="t2-chip t2-chip-asset filled" data-act="asset-open:swap-to"><img class="t2-chip-glyph" src="'+to.glyph+'"/><span class="t2-chip-text">'+to.net+'</span>'+chevDown()+'</button>'
      : '<button class="t2-chip t2-chip-asset'+beamCls(toBeam)+'" data-act="asset-open:swap-to"><span class="t2-chip-text">Select asset</span>'+chevDown()+'</button>';

    var fromCard = amountCard({
      label:'From',
      chip: fromChip,
      amount: from ? (s.amount || '0') : '0',
      balanceText: from ? ('Balance: '+from.balCrypto+' '+from.sym) : '',
      percentChipsAction: from ? 'swap-pct' : null,
      amountAction: from ? 'swap-amt-from' : null
    });
    var toCard = amountCard({
      label:'To',
      chip: toChip,
      amount: to ? (s.toAmount || '0') : '0',
      smallChipLabel: to ? 'You receive' : '',
      amountAction: to ? 'swap-amt-to' : null
    });

    var flipBtn = (from && to) ? '<button class="t2-swap-flip" data-act="swap-flip">'+IF.flip+'</button>' : '';

    var rateLine = '';
    if (from && to){
      rateLine = '<div class="t2-rate">1 '+from.sym+' \u2248 '+convertRate(from.sym, to.sym)+' '+to.sym+'</div>';
    }

    var fromDrop = apoFrom ? '<div class="t2-assetdrop t2-assetdrop-from">'+InlineAssetPicker('swap-from')+'</div>' : '';
    var toDrop   = apoTo   ? '<div class="t2-assetdrop t2-assetdrop-to">'+InlineAssetPicker('swap-to')+'</div>'   : '';
    return '<div class="t2-tab-body t2-swap">'+
      '<div class="t2-amtc-stack swap">'+fromCard+flipBtn+toCard+rateLine+'</div>'+
      fromDrop+toDrop+
      reviewBtn('Review swap', hasAmt && !!from && !!to, 'swap-review')+
    '</div>';
  }

  // ====================================================================
  // BUY FLOW
  // ====================================================================
  function BuyTabBody(){
    var apoBuy = window.state.assetPickerOpen === 'buy';
    var s = window.state.buy;
    var asset = s.asset ? netByKey(s.asset) : null;
    var fiat = fiatByCode(s.fiat);
    var assetBeam = !asset;
    var hasAmt = !!s.fiatAmount && parseFloat(s.fiatAmount) > 0;

    var fiatChipEl = '<button class="t2-chip t2-chip-asset filled" data-act="fiat-open"><img class="t2-chip-glyph" src="'+fiat.glyph+'" alt=""/><span class="t2-chip-text">'+fiat.name+'</span>'+chevDown()+'</button>';
    var assetChipEl = asset
      ? '<button class="t2-chip t2-chip-asset filled" data-act="asset-open:buy"><img class="t2-chip-glyph" src="'+asset.glyph+'" alt=""/><span class="t2-chip-text">'+asset.net+'</span>'+chevDown()+'</button>'
      : '<button class="t2-chip t2-chip-asset'+beamCls(assetBeam)+'" data-act="asset-open:buy"><span class="t2-chip-text">Select asset</span>'+chevDown()+'</button>';

    var payCard = amountCard({
      label:'You pay',
      chip: fiatChipEl,
      amount: s.fiatAmount || '0',
      amountAction:'buy-amt-fiat'
    });
    var getCard = amountCard({
      label:'You get',
      chip: assetChipEl,
      amount: asset ? (s.cryptoAmount || '0') : '0',
      smallChipLabel: asset ? 'You receive' : '',
      amountAction: asset ? 'buy-amt-crypto' : null
    });

    var rateLine = '';
    if (asset){
      rateLine = '<div class="t2-rate">1 '+fiat.code+' \u2248 '+convertRate(fiat.code, asset.sym)+' '+asset.sym+'</div>';
    }

    var buyDrop = apoBuy ? '<div class="t2-assetdrop t2-assetdrop-buy">'+InlineAssetPicker('buy')+'</div>' : '';
    return '<div class="t2-tab-body t2-buy">'+
      '<div class="t2-amtc-stack">'+payCard+getCard+rateLine+'</div>'+
      buyDrop+
      reviewBtn('Review buy', hasAmt && !!asset, 'buy-review')+
    '</div>';
  }

  // ====================================================================
  // REVIEW MODALS
  // ====================================================================
  // In-card buy review (replaces the modal).
  function BuyReviewScreen(){
    var s = window.state.buy;
    var asset = netByKey(s.asset);
    var fiat = fiatByCode(s.fiat);
    if (!asset || !fiat){ s.screen = null; return BuyTabBody(); }
    var addr = '0x7a31...f8e2a';
    var fiatGlyph = '<img class="t2-rev-glyph" src="'+fiat.glyph+'" alt=""/>';
    return '<div class="t2-tab-body t2-buy t2-review">'+
      '<div class="t2-review-head">'+
        '<button class="t2-review-back" data-act="buy-review-back" aria-label="Back">'+IF.caretLeft+'</button>'+
        '<span class="t2-review-title">Review buy</span>'+
      '</div>'+
      '<div class="t2-review-headline">'+
        '<div class="t2-rev-eyebrow">Buy</div>'+
        '<div class="t2-rev-bigamt"><span class="t2-rev-bignum">'+fmtNum(s.cryptoAmount)+'</span><span class="t2-rev-bigsym">'+asset.sym+'</span></div>'+
        '<div class="t2-rev-eyebrow">Pay with '+fiat.name+'</div>'+
      '</div>'+
      '<div class="t2-review-card">'+
        '<div class="t2-review-row">'+
          '<span class="t2-review-k">Settle in</span>'+
          '<div class="t2-review-v">'+
            '<div class="t2-review-v-top"><img class="t2-rev-glyph" src="'+asset.glyph+'" alt=""/><div class="t2-rev-strong">You, ('+addr+')</div></div>'+
            '<div class="t2-swrev-badge">Shiga Wallet</div>'+
          '</div>'+
        '</div>'+
        '<div class="t2-review-sep"></div>'+
        '<div class="t2-review-row">'+
          '<span class="t2-review-k">Amount</span>'+
          '<div class="t2-review-v">'+
            '<div class="t2-review-v-top">'+fiatGlyph+'<div class="t2-rev-strong">'+fmtNum(s.fiatAmount)+'</div></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<button class="t2-rev-btn on" data-act="buy-confirm">Place Order</button>'+
    '</div>';
  }
  function SwapSuccessScreen(){
    var s = window.state.swap;
    var from = netByKey(s.from); var to = netByKey(s.to);
    if (!from || !to){ s.screen = null; return SwapTabBody(); }
    var toAmt = fmtNum(s.toAmount || convert(s.amount, from.sym, to.sym));
    var head = 'Swapped '+fmtNum(s.amount)+' '+from.sym+' ('+from.net+') for '+toAmt+' '+to.sym+' ('+to.net+')';
    return '<div class="t2-tab-body t2-swap t2-success">'+
      '<div class="t2-success-stack">'+
        '<div class="t2-success-check">'+IF.checkBig+'</div>'+
        '<div class="t2-success-head">'+head+'</div>'+
      '</div>'+
      '<div class="t2-success-cta">'+
        '<button class="t2-rev-btn on" data-act="swap-done">Done</button>'+
        '<button class="t2-rev-btn ghost" data-act="swap-done">View transaction</button>'+
      '</div>'+
    '</div>';
  }
  function SwapReviewScreen(){
    var s = window.state.swap;
    var from = netByKey(s.from); var to = netByKey(s.to);
    if (!from || !to){ s.screen = null; return SwapTabBody(); }
    var toAmt = fmtNum(s.toAmount || convert(s.amount, from.sym, to.sym));
    var addr = '0x7a31...f8e2a';
    function side(amt, sym, net){
      return '<div class="t2-swrev-side">'+
        '<div class="t2-swrev-num">'+amt+'</div>'+
        '<div class="t2-swrev-sub">'+sym+', '+net+'</div>'+
      '</div>';
    }
    var arrow = '<svg class="t2-swrev-arrow" width="24" height="24" viewBox="0 0 24 24" fill="rgb(102,112,133)"><path d="M13.5 4.5a1.5 1.5 0 0 1 2.56-1.06l7.5 7.5a1.5 1.5 0 0 1 0 2.12l-7.5 7.5a1.5 1.5 0 0 1-2.56-1.06V16.5H3a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 3 7.5h10.5V4.5z"/></svg>';
    function partyRow(label){
      return '<div class="t2-review-row t2-swrev-row">'+
        '<span class="t2-review-k">'+label+'</span>'+
        '<div class="t2-review-v">'+
          '<div class="t2-review-v-top"><img class="t2-rev-glyph" src="'+from.glyph+'" alt=""/><div class="t2-rev-strong">You, ('+addr+')</div></div>'+
          '<div class="t2-swrev-badge">Shiga Wallet</div>'+
        '</div>'+
      '</div>';
    }
    return '<div class="t2-tab-body t2-swap t2-review">'+
      '<div class="t2-review-head">'+
        '<button class="t2-review-back" data-act="swap-review-back" aria-label="Back">'+IF.caretLeft+'</button>'+
        '<span class="t2-review-title">Review swap</span>'+
      '</div>'+
      '<div class="t2-review-headline">'+
        '<div class="t2-rev-eyebrow">Swap</div>'+
        '<div class="t2-swrev-amounts">'+
          side(fmtNum(s.amount), from.sym, from.net)+
          arrow+
          side(toAmt, to.sym, to.net)+
        '</div>'+
      '</div>'+
      '<div class="t2-review-card">'+
        partyRow('From')+
        '<div class="t2-review-sep"></div>'+
        partyRow('To')+
      '</div>'+
      '<button class="t2-rev-btn on" data-act="swap-confirm">Confirm Swap</button>'+
    '</div>';
  }
  function SendSuccessScreen(){
    var s = window.state.send;
    var ben = benById(s.beneficiary);
    var net = netByKey(s.network);
    if (!ben || !net){ s.screen = null; return SendTabBody(); }
    var isFiat = ben.type === 'fiat';
    var toAsset = isFiat ? (ben.currency||'NGN') : (ben.id==='joyce' ? 'BTC' : 'USDT');
    var toAmt = fmtNum(s.toAmount || convert(s.amount, net.sym, toAsset));
    // Per Figma the headline uses the user's source amount + asset for crypto sends
    // ("0.24 BTC on its way to Joyce Abdul"). For fiat sends we show the destination
    // currency amount + bank.
    var head = isFiat
      ? toAmt+' '+(ben.currency||'NGN')+' on its way to '+(ben.bank||ben.name)
      : fmtNum(s.amount)+' '+net.sym+' on its way to '+ben.name;
    return '<div class="t2-tab-body t2-send t2-success">'+
      '<div class="t2-success-stack">'+
        '<div class="t2-success-check">'+IF.checkBig+'</div>'+
        '<div class="t2-success-head">'+head+'</div>'+
      '</div>'+
      '<div class="t2-success-cta">'+
        '<button class="t2-rev-btn on" data-act="send-done">Done</button>'+
        '<button class="t2-rev-btn ghost" data-act="send-done">View transaction</button>'+
      '</div>'+
    '</div>';
  }
  function SendReviewScreen(){
    var s = window.state.send;
    var ben = benById(s.beneficiary);
    var net = netByKey(s.network);
    if (!ben || !net){
      // Defensive: bounce back to the enter-amount screen.
      s.screen = null;
      return SendTabBody();
    }
    var isFiat = ben.type === 'fiat';
    var toAsset = isFiat ? (ben.currency || 'NGN') : (ben.id==='joyce' ? 'BTC' : 'USDT');
    var toAmt = fmtNum(s.toAmount || convert(s.amount, net.sym, toAsset));
    // Figma headline: crypto variant shows the FROM amount + asset (e.g. "0.24 BTC")
    // and "to <recipient>"; fiat variant shows the converted GBP/NGN amount and
    // "to <bank> (<account>)".
    var bigNum = isFiat ? toAmt : fmtNum(s.amount);
    var bigSym = isFiat ? (ben.currency || 'NGN') : net.sym;
    var toLine = isFiat
      ? 'to '+(ben.bank || ben.name)+' ('+(ben.accountNo || '')+')'
      : 'to '+ben.name;

    var toLabel = isFiat
      ? (ben.currency==='GBP'?'Pounds':ben.currency==='EUR'?'Euros':'Naira')
      : (ben.id==='joyce'||ben.id==='mark' ? 'Bitcoin' : 'USDT');
    var toSub = isFiat
      ? (ben.accountNo || '')
      : (ben.id==='joyce'||ben.id==='mark' ? 'bc1q...x9k' : ben.detail);
    var toGlyphSrc = isFiat
      ? (ben.glyph || 'assets/currency-naira.svg')
      : (ben.id==='joyce'||ben.id==='mark' ? 'assets/glyph-btc.svg' : ben.glyph || 'assets/glyph-usdt.svg');

    return '<div class="t2-tab-body t2-send t2-review">'+
      '<div class="t2-review-head">'+
        '<button class="t2-review-back" data-act="send-review-back" aria-label="Back">'+IF.caretLeft+'</button>'+
        '<span class="t2-review-title">Review send</span>'+
      '</div>'+
      '<div class="t2-review-headline">'+
        '<div class="t2-rev-eyebrow">Send</div>'+
        '<div class="t2-rev-bigamt"><span class="t2-rev-bignum">'+bigNum+'</span><span class="t2-rev-bigsym">'+bigSym+'</span></div>'+
        '<div class="t2-rev-eyebrow">'+toLine+'</div>'+
      '</div>'+
      '<div class="t2-review-card">'+
        '<div class="t2-review-row">'+
          '<span class="t2-review-k">From</span>'+
          '<div class="t2-review-v">'+
            '<div class="t2-review-v-top"><img class="t2-rev-glyph" src="'+net.glyph+'" alt=""/><div class="t2-rev-strong">'+fmtNum(s.amount)+' '+net.sym+'</div></div>'+
            '<div class="t2-rev-sub">'+net.net+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="t2-review-sep"></div>'+
        '<div class="t2-review-row">'+
          '<span class="t2-review-k">To</span>'+
          '<div class="t2-review-v">'+
            '<div class="t2-review-v-top"><img class="t2-rev-glyph" src="'+toGlyphSrc+'" alt=""/><div class="t2-rev-strong">'+toLabel+'</div></div>'+
            '<div class="t2-rev-sub">'+toSub+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="t2-review-sep"></div>'+
        '<div class="t2-review-row">'+
          '<span class="t2-review-k">Rate</span>'+
          '<div class="t2-review-v">'+
            '<div class="t2-rev-strong">1 '+net.sym+' \u2248 '+convertRate(net.sym, toAsset)+' '+toAsset+'</div>'+
            '<div class="t2-rev-sub">0 fee</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<button class="t2-rev-btn on" data-act="send-confirm">Confirm Send</button>'+
    '</div>';
  }

  function SwapReviewModal(){
    var s = window.state.swap;
    var from = netByKey(s.from); var to = netByKey(s.to);
    var toAmt = fmtNum(s.toAmount || convert(s.amount, from.sym, to.sym));
    var rows = [
      ['You send',  '<span class="t2-rev-strong">'+fmtNum(s.amount)+' '+from.sym+'</span><span class="t2-rev-sub">on '+from.net+'</span>'],
      ['You get',   '<span class="t2-rev-strong">'+toAmt+' '+to.sym+'</span><span class="t2-rev-sub">on '+to.net+'</span>'],
      ['Rate',      '1 '+from.sym+' \u2248 '+convertRate(from.sym, to.sym)+' '+to.sym],
      ['Rate lock', '30 seconds'],
      ['Network fee', '\u2248 0.40 USDT'],
      ['Shiga fee', '0.10%'],
      ['Slippage tolerance', '0.5%'],
      ['Total received', '<span class="t2-rev-total">'+toAmt+' '+to.sym+'</span>']
    ];
    return '<div class="t2-modal-back" data-act="modal-close"></div>'+
      '<div class="t2-modal t2-modal-card">'+
        '<div class="t2-modal-head"><button class="t2-modal-back-btn" data-act="modal-close">'+IF.caretLeft+'</button><span class="t2-modal-title">Review swap</span><span style="width:20px"></span></div>'+
        '<div class="t2-modal-body">'+
          '<div class="t2-rev-headline">'+
            '<div class="t2-rev-eyebrow">Swap</div>'+
            '<div class="t2-rev-bigamt"><span class="t2-rev-bignum">'+fmtNum(s.amount)+'</span><span class="t2-rev-bigsym">'+from.sym+'</span></div>'+
            '<div class="t2-rev-eyebrow">for '+toAmt+' '+to.sym+'</div>'+
          '</div>'+
          '<div class="t2-rev-rows">'+
            rows.map(function(r){ return '<div class="t2-rev-row"><span class="t2-rev-k">'+r[0]+'</span><span class="t2-rev-v">'+r[1]+'</span></div>'; }).join('')+
          '</div>'+
        '</div>'+
        '<button class="t2-rev-btn on" data-act="swap-confirm">Confirm Swap</button>'+
      '</div>';
  }

  function BuyReviewModal(){
    var s = window.state.buy;
    var asset = netByKey(s.asset);
    var fiat = fiatByCode(s.fiat);
    var rows = [
      ['You pay', '<span class="t2-rev-strong">'+fmtNum(s.fiatAmount)+' '+fiat.code+'</span><span class="t2-rev-sub">from your bank</span>'],
      ['You receive', '<span class="t2-rev-strong">'+fmtNum(s.cryptoAmount)+' '+asset.sym+'</span><span class="t2-rev-sub">on '+asset.net+'</span>'],
      ['Rate', '1 '+fiat.code+' \u2248 '+convertRate(fiat.code, asset.sym)+' '+asset.sym],
      ['Rate lock', '15 minutes'],
      ['Shiga fee', '1.0%'],
      ['Settlement', '\u2248 5 minutes after payment'],
      ['Total to pay', '<span class="t2-rev-total">'+fmtNum(s.fiatAmount)+' '+fiat.code+'</span>']
    ];
    return '<div class="t2-modal-back" data-act="modal-close"></div>'+
      '<div class="t2-modal t2-modal-card">'+
        '<div class="t2-modal-head"><button class="t2-modal-back-btn" data-act="modal-close">'+IF.caretLeft+'</button><span class="t2-modal-title">Review buy</span><span style="width:20px"></span></div>'+
        '<div class="t2-modal-body">'+
          '<div class="t2-rev-headline">'+
            '<div class="t2-rev-eyebrow">Buy</div>'+
            '<div class="t2-rev-bigamt"><span class="t2-rev-bignum">'+fmtNum(s.cryptoAmount)+'</span><span class="t2-rev-bigsym">'+asset.sym+'</span></div>'+
            '<div class="t2-rev-eyebrow">for '+fmtNum(s.fiatAmount)+' '+fiat.code+'</div>'+
          '</div>'+
          '<div class="t2-rev-rows">'+
            rows.map(function(r){ return '<div class="t2-rev-row"><span class="t2-rev-k">'+r[0]+'</span><span class="t2-rev-v">'+r[1]+'</span></div>'; }).join('')+
          '</div>'+
        '</div>'+
        '<button class="t2-rev-btn on" data-act="buy-confirm">Confirm Buy</button>'+
      '</div>';
  }

  // ====================================================================
  // SUCCESS MODALS
  // ====================================================================
  function successCheck(){ return '<div class="t2-suc-check">'+IF.checkBig+'</div>'; }

  function SendSuccessModal(){
    var s = window.state.send;
    var ben = benById(s.beneficiary);
    var net = netByKey(s.network);
    var isFiat = ben && ben.type === 'fiat';
    var toAmt = fmtNum(s.toAmount || convert(s.amount, net.sym, isFiat ? (ben.currency||'NGN') : (ben.id==='joyce' ? 'BTC' : 'USDT')));
    var head = isFiat
      ? toAmt+' '+(ben.currency||'NGN')+' on its way to '+ben.bank
      : toAmt+' '+(ben.id==='joyce' ? 'BTC' : 'USDT')+' on its way to '+ben.name;
    var steps = isFiat
      ? [['Submitted','Just now',true],['Converting','\u2248 1 min',false],['Arrives at bank','1\u20132 business days',false]]
      : [['Submitted','Just now',true],['Confirming','\u2248 30 sec',false],['Delivered','\u2248 1 min',false]];

    return '<div class="t2-modal-back" data-act="modal-close"></div>'+
      '<div class="t2-modal t2-modal-card">'+
        '<div class="t2-suc-eyebrow">SUBMITTED</div>'+
        successCheck()+
        '<div class="t2-suc-headline">'+head+'</div>'+
        '<div class="t2-suc-timeline">'+steps.map(function(st){
          return '<div class="t2-suc-step '+(st[2]?'on':'')+'"><span class="t2-suc-dot"></span><span class="t2-suc-stepname">'+st[0]+'</span><span class="t2-suc-steptime">'+st[1]+'</span></div>';
        }).join('')+'</div>'+
        '<div class="t2-suc-ref"><span class="t2-suc-ref-k">Reference</span><span class="t2-suc-ref-v">SHG\u00B70F2C\u00B7B19A</span>'+copyBtn('suc-ref', true)+'</div>'+
        '<div class="t2-suc-cta">'+
          '<button class="t2-rev-btn on" data-act="send-done">Done</button>'+
          '<button class="t2-rev-btn ghost" data-act="modal-close">View transaction</button>'+
        '</div>'+
      '</div>';
  }

  function SwapSuccessModal(){
    var s = window.state.swap;
    var from = netByKey(s.from); var to = netByKey(s.to);
    var toAmt = fmtNum(s.toAmount || convert(s.amount, from.sym, to.sym));
    return '<div class="t2-modal-back" data-act="modal-close"></div>'+
      '<div class="t2-modal t2-modal-card">'+
        '<div class="t2-suc-eyebrow">COMPLETE</div>'+
        successCheck()+
        '<div class="t2-suc-headline">Swapped '+fmtNum(s.amount)+' '+from.sym+' for '+toAmt+' '+to.sym+'</div>'+
        '<div class="t2-suc-balcard">'+
          '<div class="t2-suc-balcol"><div class="t2-suc-balk">'+from.sym+' on '+from.net+'</div><div class="t2-suc-balv">\u2212 '+fmtNum(s.amount)+' '+from.sym+'</div></div>'+
          '<div class="t2-suc-balcol"><div class="t2-suc-balk">'+to.sym+' on '+to.net+'</div><div class="t2-suc-balv">+ '+toAmt+' '+to.sym+'</div></div>'+
        '</div>'+
        '<div class="t2-suc-rate">Rate locked: 1 '+from.sym+' \u2248 '+convertRate(from.sym, to.sym)+' '+to.sym+'</div>'+
        '<div class="t2-suc-cta">'+
          '<button class="t2-rev-btn on" data-act="swap-done">Done</button>'+
          '<button class="t2-rev-btn ghost" data-act="modal-close">View transaction</button>'+
        '</div>'+
      '</div>';
  }

  function BuySuccessModal(){
    var s = window.state.buy;
    var asset = netByKey(s.asset); var fiat = fiatByCode(s.fiat);
    return '<div class="t2-modal-back" data-act="modal-close"></div>'+
      '<div class="t2-modal t2-modal-card">'+
        '<div class="t2-suc-eyebrow">COMPLETE</div>'+
        successCheck()+
        '<div class="t2-suc-headline">'+fmtNum(s.cryptoAmount)+' '+asset.sym+' delivered to your Shiga wallet</div>'+
        '<div class="t2-suc-balcard">'+
          '<div class="t2-suc-balcol"><div class="t2-suc-balk">Paid</div><div class="t2-suc-balv">\u2212 '+fmtNum(s.fiatAmount)+' '+fiat.code+'</div></div>'+
          '<div class="t2-suc-balcol"><div class="t2-suc-balk">'+asset.sym+' on '+asset.net+'</div><div class="t2-suc-balv">+ '+fmtNum(s.cryptoAmount)+' '+asset.sym+'</div></div>'+
        '</div>'+
        '<div class="t2-suc-cta">'+
          '<button class="t2-rev-btn on" data-act="buy-done">Done</button>'+
          '<button class="t2-rev-btn ghost" data-act="modal-close">View transaction</button>'+
        '</div>'+
      '</div>';
  }

  // ====================================================================
  // BUY ORDER PAGE (in-card, 4.6)
  // ====================================================================
  function BuyOrderTabBody(){
    var s = window.state.buy;
    var fiat = fiatByCode(s.fiat);
    var asset = netByKey(s.asset);
    return '<div class="t2-tab-body t2-buyorder">'+
      '<div class="t2-bo-badge">'+IF.clockCountdown+'</div>'+
      '<div class="t2-bo-head">'+fmtNum(s.cryptoAmount)+' '+asset.sym+' reserved for '+fmtNum(s.fiatAmount)+' '+fiat.name+'</div>'+
      '<div class="t2-bo-next">'+
        '<div class="t2-bo-next-eyebrow">NEXT STEP</div>'+
        '<div class="t2-bo-next-title">Pay '+fmtNum(s.fiatAmount)+' '+fiat.code+' from your bank</div>'+
        '<div class="t2-bo-next-sub">Once we receive your payment, your '+asset.sym+' arrives in seconds to minutes.</div>'+
      '</div>'+
      '<div class="t2-bo-section-label">TRANSFER TO</div>'+
      '<div class="t2-bo-card">'+
        '<div class="t2-bo-row"><span class="t2-bo-k">Amount</span><span class="t2-bo-vwrap"><span class="t2-bo-v">'+fmtNum(s.fiatAmount)+' '+fiat.code+'</span>'+copyBtn('order-amt', true)+'</span></div>'+
        '<div class="t2-bo-row"><span class="t2-bo-k">Account number</span><span class="t2-bo-vwrap"><span class="t2-bo-v">0126627506</span>'+copyBtn('order-acct', true)+'</span></div>'+
        '<div class="t2-bo-row"><span class="t2-bo-k">Bank</span><span class="t2-bo-v">GT Bank</span></div>'+
        '<div class="t2-bo-row"><span class="t2-bo-k">Account name</span><span class="t2-bo-v">Segilola Edu</span></div>'+
        '<div class="t2-bo-sep"></div>'+
        '<div class="t2-bo-expiry"><span class="t2-bo-expiry-ic">'+IF.clockSm+'</span><span>This account is for this transaction only and expires in 10:00</span></div>'+
      '</div>'+
      '<button class="t2-rev-btn on" data-act="buy-done">Done</button>'+
      '<button class="t2-rev-btn ghost" data-act="buy-done">View Order</button>'+
    '</div>';
  }

  // ====================================================================
  // POPOVER ROUTER
  // ====================================================================
  function PopoverLayer(){
    var p = window.state.popover;
    if (!p) return '';
    if (p.kind === 'asset') return NetworkPicker(p.ctx);
    if (p.kind === 'ben')   return ''; // ben picker renders inline inside SendTabBody
    if (p.kind === 'fiat')  return FiatPopover();
    return '';
  }

  function ModalLayer(){
    var m = window.state.modal;
    if (!m) return '';
    if (m === 'send-success') return SendSuccessModal();
    if (m === 'swap-review')  return SwapReviewModal();
    if (m === 'swap-success') return SwapSuccessModal();
    if (m === 'buy-review')   return BuyReviewModal();
    if (m === 'buy-success')  return BuySuccessModal();
    return '';
  }

  // ====================================================================
  // OVERRIDE TAB BODY EXPORTS + MOUNT MODAL/POPOVER LAYERS
  // ====================================================================
  initFlows();

  window.T2Flows = {
    send: function(){
      // If buy-order is active, that's a Buy-specific state. Send body unaffected.
      if (window.state.send && window.state.send.screen === 'success') return SendSuccessScreen();
      if (window.state.send && window.state.send.screen === 'review')  return SendReviewScreen();
      return SendTabBody();
    },
    swap: function(){
      if (window.state.swap && window.state.swap.screen === 'success') return SwapSuccessScreen();
      if (window.state.swap && window.state.swap.screen === 'review')  return SwapReviewScreen();
      return SwapTabBody();
    },
    buy: function(){
      if (window.state.buy && window.state.buy.orderActive) return BuyOrderTabBody();
      if (window.state.buy && window.state.buy.screen === 'review') return BuyReviewScreen();
      return BuyTabBody();
    }
  };

  // Inject popover/modal layers after the home screen renders
  function mountLayers(){
    var host = document.getElementById('canvas');
    if (!host) return;
    var existing = host.querySelectorAll('.t2-overlay-host');
    existing.forEach(function(el){ el.remove(); });
    var overlay = document.createElement('div');
    overlay.className = 't2-overlay-host';
    var popHtml = PopoverLayer();
    var modalHtml = ModalLayer();
    overlay.innerHTML = popHtml + modalHtml;
    host.appendChild(overlay);

    // Anchor the fiat popover under its triggering chip (rather than the
    // hard-coded right/top in CSS).
    var pop = overlay.querySelector('.t2-pop-fiat');
    var chip = host.querySelector('[data-act="fiat-open"]');
    if (pop && chip){
      // Walk offsetParents up to host so we get pre-transform coords.
      var left = 0, top = 0, node = chip;
      while (node && node !== host){
        left += node.offsetLeft;
        top  += node.offsetTop;
        node = node.offsetParent;
      }
      pop.style.left = left + 'px';
      pop.style.top  = (top + chip.offsetHeight + 8) + 'px';
      pop.style.right = 'auto';
    }
  }

  // Wrap rerenderTier2Home to also remount layers
  var _origRerender = window.rerenderTier2Home;
  window.rerenderTier2Home = function(){
    if (typeof _origRerender === 'function') _origRerender();
    mountLayers();
  };

  // ----- handler additions -----
  var _origHandle = window.handle;
  window.handle = function(act){
    if (!act) return;
    var s = window.state;
    // popover/modal lifecycle
    if (act === 'pop-close'){ s.popover = null; rerender(); return; }
    if (act === 'modal-close'){ s.modal = null; rerender(); return; }

    // beneficiary picker
    if (act === 'ben-open'){
      if (s.popover && s.popover.kind === 'ben'){ s.popover = null; }
      else { s.popover = { kind:'ben', filter:'all' }; }
      rerender();
      return;
    }
    if (act.indexOf('ben-filter:') === 0){ s.popover.filter = act.split(':')[1]; rerender(); return; }
    if (act.indexOf('ben-pick:') === 0){
      var id = act.split(':')[1];
      s.send.beneficiary = id;
      s.send.network = null; s.send.amount = ''; s.send.toAmount = '';
      s.popover = null;
      rerender(); return;
    }

    // asset picker
    if (act.indexOf('asset-open:') === 0){
      var ctxA = act.split(':')[1];
      if (ctxA === 'send' || ctxA === 'swap-from' || ctxA === 'swap-to' || ctxA === 'buy'){
        if (s.assetPickerOpen === ctxA){ s.assetPickerOpen = null; s.assetPickerQ = ''; }
        else { s.assetPickerOpen = ctxA; s.assetPickerQ = ''; }
        rerender(); return;
      }
    }
    if (act.indexOf('t2-asset-toggle:') === 0){
      var ttctx = act.split(':')[1];
      if (ttctx !== 'receive'){
        s.assetPickerOpen = null; s.assetPickerQ = '';
        rerender(); return;
      }
    }
    if (act.indexOf('t2-asset-pick:') === 0){
      var pp = act.split(':'); var pctx = pp[1];
      if (pctx !== 'receive'){
        // New format: t2-asset-pick:<ctx>:<sym>:<key>; legacy: t2-asset-pick:<ctx>:<key>
        var pkey = pp.length >= 4 ? pp[3] : pp[2];
        if (pctx === 'send')      { s.send.network = pkey; recomputeSend(); }
      else if (pctx === 'swap-from'){ s.swap.from = pkey; recomputeSwap(); }
      else if (pctx === 'swap-to')  { s.swap.to = pkey;   recomputeSwap(); }
      else if (pctx === 'buy')      { s.buy.asset = pkey; recomputeBuy(); }
      s.assetPickerOpen = null; s.assetPickerQ = '';
      rerender(); return;
      }
    }
    if (act.indexOf('asset-open:') === 0){
      var ctx = act.split(':')[1];
      s.popover = { kind:'asset', ctx: ctx };
      rerender(); return;
    }
    if (act.indexOf('pop-pick:') === 0){
      var parts = act.split(':');
      var ctx2 = parts[1]; var key = parts[2];
      if (ctx2 === 'send'){ s.send.network = key; }
      else if (ctx2 === 'swap-from'){ s.swap.from = key; recomputeSwap(); }
      else if (ctx2 === 'swap-to'){   s.swap.to = key;   recomputeSwap(); }
      else if (ctx2 === 'buy'){ s.buy.asset = key; recomputeBuy(); }
      s.popover = null;
      rerender(); return;
    }

    // fiat popover
    if (act === 'fiat-open'){ s.popover = { kind:'fiat' }; rerender(); return; }
    if (act.indexOf('fiat-pick:') === 0){ s.buy.fiat = act.split(':')[1]; recomputeBuy(); s.popover = null; rerender(); return; }

    // send amounts
    if (act.indexOf('send-amt:') === 0){
      s.send.amount = act.split(':').slice(1).join(':');
      recomputeSend(); rerender(); return;
    }
    if (act.indexOf('send-pct:') === 0){
      var pct = act.split(':')[1];
      var net = netByKey(s.send.network);
      if (net){
        var bal = parseFloat(net.balCrypto.replace(/,/g,''));
        var mul = pct === 'MAX' ? 1 : parseFloat(pct)/100;
        s.send.amount = (bal * mul).toFixed(2).replace(/\.?0+$/,'');
        recomputeSend();
      }
      rerender(); return;
    }
    if (act.indexOf('send-narration:') === 0){
      s.send.narration = act.split(':').slice(1).join(':');
      rerender(); return;
    }

    // swap amounts
    if (act.indexOf('swap-amt-from:') === 0){
      s.swap.amount = act.split(':').slice(1).join(':');
      var f = netByKey(s.swap.from), t = netByKey(s.swap.to);
      if (f && t) s.swap.toAmount = convert(s.swap.amount, f.sym, t.sym);
      rerender(); return;
    }
    if (act.indexOf('swap-amt-to:') === 0){
      s.swap.toAmount = act.split(':').slice(1).join(':');
      var f2 = netByKey(s.swap.from), t2 = netByKey(s.swap.to);
      if (f2 && t2) s.swap.amount = convert(s.swap.toAmount, t2.sym, f2.sym);
      rerender(); return;
    }
    if (act.indexOf('swap-pct:') === 0){
      var pct2 = act.split(':')[1];
      var nf = netByKey(s.swap.from);
      if (nf){
        var b2 = parseFloat(nf.balCrypto.replace(/,/g,''));
        var m2 = pct2 === 'MAX' ? 1 : parseFloat(pct2)/100;
        s.swap.amount = (b2 * m2).toFixed(2).replace(/\.?0+$/,'');
        recomputeSwap();
      }
      rerender(); return;
    }
    if (act === 'swap-flip'){
      var tmp = s.swap.from; s.swap.from = s.swap.to; s.swap.to = tmp;
      var tmp2 = s.swap.amount; s.swap.amount = s.swap.toAmount; s.swap.toAmount = tmp2;
      rerender(); return;
    }

    // buy amounts
    if (act.indexOf('buy-amt-fiat:') === 0){
      s.buy.fiatAmount = act.split(':').slice(1).join(':');
      var asset = netByKey(s.buy.asset);
      if (asset) s.buy.cryptoAmount = convert(s.buy.fiatAmount, s.buy.fiat, asset.sym);
      rerender(); return;
    }
    if (act.indexOf('buy-amt-crypto:') === 0){
      s.buy.cryptoAmount = act.split(':').slice(1).join(':');
      var asset2 = netByKey(s.buy.asset);
      if (asset2) s.buy.fiatAmount = convert(s.buy.cryptoAmount, asset2.sym, s.buy.fiat);
      rerender(); return;
    }

    // review / confirm / done
    if (act === 'send-review'){ s.send.screen = 'review'; rerender(); return; }
    if (act === 'send-review-back'){ s.send.screen = null; rerender(); return; }
    if (act === 'send-confirm'){ s.send.screen = 'success'; rerender(); return; }
    if (act === 'send-done'){
      s.modal = null;
      s.send = { beneficiary:null, network:null, amount:'', toAmount:'', narration:'', beamAsset:false, screen:null };
      rerender(); return;
    }
    if (act === 'swap-review'){ s.swap.screen = 'review'; rerender(); return; }
    if (act === 'swap-review-back'){ s.swap.screen = null; rerender(); return; }
    if (act === 'swap-confirm'){ s.swap.screen = 'success'; rerender(); return; }
    if (act === 'swap-done'){
      s.swap = { from:null, to:null, amount:'', toAmount:'', screen:null };
      rerender(); return;
    }
    if (act === 'buy-review'){ s.buy.screen = 'review'; rerender(); return; }
    if (act === 'buy-review-back'){ s.buy.screen = null; rerender(); return; }
    if (act === 'buy-confirm'){ s.buy.screen = null; s.buy.orderActive = true; rerender(); return; }
    if (act === 'buy-done'){
      s.buy = { asset:'solana', fiat:'NGN', fiatAmount:'', cryptoAmount:'', screen:null, orderActive:false };
      rerender(); return;
    }

    if (typeof _origHandle === 'function') return _origHandle(act);
  };

  function recomputeSend(){
    var s = window.state.send;
    var ben = benById(s.beneficiary);
    var net = netByKey(s.network);
    if (!ben || !net || !s.amount) return;
    var toAsset = ben.type === 'fiat' ? (ben.currency || 'NGN') : (ben.id==='joyce' ? 'BTC' : 'USDT');
    s.toAmount = convert(s.amount, net.sym, toAsset);
  }
  function recomputeSwap(){
    var s = window.state.swap;
    var f = netByKey(s.from), t = netByKey(s.to);
    if (f && t && s.amount) s.toAmount = convert(s.amount, f.sym, t.sym);
  }
  function recomputeBuy(){
    var s = window.state.buy;
    var asset = netByKey(s.asset);
    if (asset && s.fiatAmount) s.cryptoAmount = convert(s.fiatAmount, s.fiat, asset.sym);
  }

  // Input event wiring — text inputs need oninput rather than data-act clicks
  document.addEventListener('input', function(e){
    var el = e.target;
    if (!el || !el.matches) return;
    if (!el.matches('[data-act^="send-amt"], [data-act^="swap-amt"], [data-act^="buy-amt"], [data-act^="send-narration"], [data-act="send-need-asset"]')) return;
    var act = el.getAttribute('data-act');
    var val = el.value;
    // amount fields: strip everything that isn't digits or '.'; allow only one decimal point
    if (act.indexOf('-amt') !== -1){
      var cleaned = val.replace(/,/g,'').replace(/[^0-9.]/g,'');
      var firstDot = cleaned.indexOf('.');
      if (firstDot !== -1){
        cleaned = cleaned.slice(0, firstDot+1) + cleaned.slice(firstDot+1).replace(/\./g,'');
      }
      if (cleaned !== val){
        // Surgically update without losing focus; downstream handler will rerender.
        el.value = cleaned;
      }
      val = cleaned;
    }
    if (act === 'send-need-asset'){
      el.value = '';
      window.state.send.beamAsset = true;
      window.rerender && window.rerender();
      clearTimeout(window.__sendBeamT);
      window.__sendBeamT = setTimeout(function(){
        window.state.send.beamAsset = false;
        window.rerender && window.rerender();
      }, 1600);
      return;
    }
    window.handle(act+':'+val);
    // restore caret position
    setTimeout(function(){
      var fresh = document.querySelector('[data-act^="'+act+'"]');
      if (fresh) { fresh.focus(); try { fresh.setSelectionRange(val.length, val.length); } catch(_){} }
    }, 0);
  }, true);

  // Click delegation already exists in prototype.html. Layers also need it.
  // mount initial layers after DOM ready
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(mountLayers, 50); });
  } else {
    setTimeout(mountLayers, 50);
  }
})();
