/* ============== Enta — Tier 2 returning-user home dashboard ==============
   Builders for the dark-themed home screen. Mounted via HomeScreen() when
   state.homeOutcome === 'tier2-unlocked'. Shares state on window.state.
   Reuses _ic / icon helpers and setFrame/rerender plumbing from prototype.html. */

(function(){
  // ---------- icons specific to this screen ----------
  function _t2ic(d, opts){
    opts = opts || {};
    var sz = opts.size || 24;
    return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(opts.sw||1.7)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
  }
  var I = {
    eye:        _t2ic('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',{sw:1.7,size:24}),
    eyeOff:     _t2ic('<path d="m3 3 18 18"/><path d="M10.6 6.1A9.7 9.7 0 0 1 12 6c6.5 0 10 7 10 7a14 14 0 0 1-3 3.6"/><path d="M6.1 6.1C3.6 7.7 2 10 2 10s3.5 7 10 7c1.4 0 2.7-.3 3.9-.8"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',{sw:1.7,size:24}),
    refresh:    _t2ic('<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M3 21v-5h5"/>',{sw:1.7,size:16}),
    caretDown:  _t2ic('<path d="m6 9 6 6 6-6"/>',{sw:2.4,size:14}),
    chevRight:  _t2ic('<path d="m9 6 6 6-6 6"/>',{sw:1.7,size:20}),
    chevLeft:   _t2ic('<path d="m15 6-6 6 6 6"/>',{sw:1.7,size:20}),
    searchSm:   _t2ic('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',{sw:1.7,size:16}),
    chevDown:   _t2ic('<path d="m6 9 6 6 6-6"/>',{sw:1.7,size:20}),
    copy:       _t2ic('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',{sw:1.7,size:14}),
    copyMd:     _t2ic('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',{sw:1.7,size:18}),
    check:      _t2ic('<path d="m5 12 5 5L20 7"/>',{sw:2.2,size:14}),
    checkMd:    _t2ic('<path d="m5 12 5 5L20 7"/>',{sw:2.2,size:18}),
    approx:     _t2ic('<path d="M3 9c2-3 5-3 8 0s6 3 8 0"/><path d="M3 15c2-3 5-3 8 0s6 3 8 0"/>',{sw:2,size:14}),
    bell:       _t2ic('<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/>',{sw:1.7,size:24}),
    home:       _t2ic('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" fill="currentColor" stroke="none"/>',{sw:0,size:24}),
    homeOff:    _t2ic('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/>',{sw:1.7,size:24}),
    wallet:     _t2ic('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14" r="1.2"/>',{sw:1.7,size:24}),
    dash:       _t2ic('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',{sw:1.7,size:24}),
    receipt:    _t2ic('<path d="M5 3h14v18l-3-2-3 2-3-2-3 2-2-1.5z"/><path d="M9 8h6M9 12h6M9 16h4"/>',{sw:1.7,size:24}),
    calc:       _t2ic('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0M8 19h6"/>',{sw:1.7,size:24}),
    help:       _t2ic('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 3.5"/><path d="M12 17h.01"/>',{sw:1.7,size:24}),
    upRight:    _t2ic('<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',{sw:1.7,size:24}),
    arrowDownLeft: _t2ic('<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',{sw:2,size:20}),
    arrowUpRight:  _t2ic('<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',{sw:2,size:20}),
    share:      _t2ic('<path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',{sw:1.7,size:18}),
    qrDot:      '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="3"/></svg>',
    midot:      '<svg width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="currentColor"/></svg>',
    userCircle: _t2ic('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3.2"/><path d="M5.5 19.5c1.6-3 4-4 6.5-4s4.9 1 6.5 4"/>',{sw:1.7,size:22}),
    shield:     _t2ic('<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3z"/>',{sw:1.7,size:22}),
    arrowsLR:   _t2ic('<path d="M7 7h13l-3-3M17 17H4l3 3"/>',{sw:1.7,size:22}),
    lockSm:     _t2ic('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',{sw:1.7,size:20})
  };

  // ---------- helpers ----------
  function maskAmt(s){ return state.balanceHidden ? '••••' : s; }

  // ---------- sidebar ----------
  function Tier2Sidebar(hasFunds){
    if (hasFunds === undefined) hasFunds = true;
    // icons are imported directly from the figma file via CSS mask-image
    var navTop = [
      { id:'home',   ic:'home',         label:'Home',         on:true,  has:false },
      { id:'wallets',ic:'wallets',      label:'Wallets',      on:false, has:false },
      { id:'pay',    ic:'payments',     label:'Payments',     on:false, has:true  },
      { id:'tx',     ic:'transactions', label:'Transactions', on:false, has:false }
    ];
    var navBot = [
      { id:'rate', label:'Rate Calculator' },
      { id:'help', label:'Support' }
    ];
    var sideTop = hasFunds
      ? ('<button class="t2-userbtn" data-act="t2-acct-toggle">'+
          '<span class="t2-avatar">J</span>'+
          '<span class="t2-username">Jamie Paul</span>'+
          '<span class="t2-userchev">'+I.caretDown+'</span>'+
        '</button>'+
        (window.state && window.state.acctMenu ? (
          '<div class="t2-acctmenu">'+
            '<div class="t2-acctmenu-head">'+
              '<span class="t2-acctmenu-avatar t2-acctmenu-avatar--lg">J</span>'+
              '<div class="t2-acctmenu-id">'+
                '<div class="t2-acctmenu-name">Jamie Paul</div>'+
                '<div class="t2-acctmenu-email">jamiepaul01@gmail.com</div>'+
              '</div>'+
            '</div>'+
            '<div class="t2-acctmenu-sep"></div>'+
            '<div class="t2-acctmenu-sec">'+
              '<div class="t2-acctmenu-label">ALL ACCOUNTS</div>'+
              '<div class="t2-acctmenu-row">'+
                '<span class="t2-acctmenu-avatar">J</span>'+
                '<span class="t2-acctmenu-rowname">Jamie Paul</span>'+
                '<span class="t2-acctmenu-check"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="rgb(21,94,239)"/><path d="m6 10 3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
              '</div>'+
            '</div>'+
            '<div class="t2-acctmenu-sep"></div>'+
            '<button class="t2-acctmenu-link" data-act="t2-noop">Link an existing account</button>'+
          '</div>'
        ) : ''))
      : ('<button class="t2-userbtn t2-userbtn--empty" data-act="t1-acct-toggle">'+
          '<span class="t2-avatar t2-avatar--empty">'+I.userCircle+'</span>'+
          '<span class="t2-username">Your Personal Wallet</span>'+
          '<span class="t2-userchev">'+I.caretDown+'</span>'+
        '</button>'+
        (window.state && window.state.t1AcctMenu ? (
          '<div class="acct-pop t1-acctmenu" data-t1-acctpop style="position:absolute;left:16px;top:60px;right:auto">'+
            '<div class="ap-head">'+
              '<div class="ap-avatar"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3.2"/><path d="M5.5 19.5c1.6-3 4-4 6.5-4s4.9 1 6.5 4"/></svg></div>'+
              '<div style="min-width:0;flex:1">'+
                '<div class="ap-name">Your personal wallet</div>'+
                '<div class="ap-email">jamiepaul01@gmail.com</div>'+
              '</div>'+
            '</div>'+
            '<div class="ap-rule"></div>'+
            '<div class="ap-promo">'+
              '<div class="ap-promo-t">Make the most out of Enta</div>'+
              '<button class="ap-cta" data-act="t1-acct-continue">Continue Setup</button>'+
            '</div>'+
            '<div class="ap-rule"></div>'+
            '<div class="ap-link" data-act="t1-acct-link">Link an existing account</div>'+
          '</div>'
        ) : ''));
    return '<aside class="t2-side">'+
      '<div class="t2-side-top">'+
        sideTop+
        '<div class="t2-logo"><img src="assets/enta-logo.svg" alt="Enta"/></div>'+
        '<nav class="t2-nav">'+
          navTop.map(function(it){
            return '<a class="t2-navitem '+(it.on?'on':'')+'" data-act="t2-noop">'+
              '<span class="t2-navic t2-navic-'+it.ic+'"></span>'+
              '<span class="t2-navlabel">'+it.label+'</span>'+
              (it.has?'<span class="t2-navchev">'+I.chevDown+'</span>':'')+
            '</a>';
          }).join('')+
        '</nav>'+
        '<div class="t2-navdiv"></div>'+
        '<nav class="t2-nav">'+
          navBot.map(function(it){
            return '<a class="t2-navitem t2-navitem--noic" data-act="t2-noop">'+
              '<span class="t2-navlabel">'+it.label+'</span>'+
            '</a>';
          }).join('')+
        '</nav>'+
      '</div>'+
      '<div class="t2-side-foot">'+
        '<div class="t2-getapp">'+
          '<div class="t2-getapp-txt">'+
            '<div class="t2-getapp-t">Get the app</div>'+
            '<div class="t2-getapp-s">Download Shiga on Android or iOS</div>'+
          '</div>'+
          '<span class="t2-getapp-ic t2-navic-getapp"></span>'+
        '</div>'+
      '</div>'+
    '</aside>';
  }

  // ---------- topbar ----------
  function Tier2Topbar(){
    return '<header class="t2-top">'+
      '<div></div>'+
      '<div class="t2-top-right">'+
        '<button class="t2-bell" data-act="t2-noop">'+I.bell+'</button>'+
        '<button class="t2-userav" data-act="t2-noop">J</button>'+
      '</div>'+
    '</header>';
  }

  // ---------- wallet card ----------
  function CopyBtn(id, sm){
    var copied = !!(state.t2Copies && state.t2Copies[id]);
    var ic = sm ? (copied? I.check : I.copy) : (copied? I.checkMd : I.copyMd);
    return '<button class="t2-copy '+(copied?'ok':'')+(sm?' sm':'')+'" data-act="t2-copy:'+id+'" aria-label="Copy">'+ic+'</button>';
  }

  function WalletCardTier2(hidden, hasFunds, level){
    if (hasFunds === undefined) hasFunds = true;
    // level: 'unlocked' (default) | 'kyc' (smaller balance: $560)
    var isKyc = level === 'kyc';
    var totalDollars = !hasFunds ? '$0<span class="t2-wcard-cents">.00</span>'
                     : isKyc      ? '$560<span class="t2-wcard-cents">.00</span>'
                                  : '$7,628.<span class="t2-wcard-cents">15</span>';
    var totalGbp = !hasFunds ? '0' : isKyc ? '412.47' : '5,607.79';
    var usdtAmt = !hasFunds ? '0 USDT' : isKyc ? maskAmt('560 USDT') : maskAmt('5,749.59 USDT');
    var usdtGbp = !hasFunds ? '0' : isKyc ? maskAmt('412.47') : maskAmt('3,113.98');
    var btcAmt = !hasFunds ? '0 BTC' : isKyc ? maskAmt('0 BTC') : maskAmt('0.023 BTC');
    var btcGbp = !hasFunds ? '0' : isKyc ? maskAmt('0') : maskAmt('1,313.73');
    return '<div class="t2-wcard'+(hasFunds?'':' t2-wcard--empty')+'">'+
      '<div class="t2-wcard-top" data-tour-stop="balance">'+
        '<div class="t2-wcard-info">'+
          '<div class="t2-wcard-label"><span>Total balance</span><span class="t2-wcard-refresh" data-act="t2-noop">'+I.refresh+'</span></div>'+
          '<div class="t2-wcard-amt">'+
            '<span class="t2-wcard-amt-val">'+maskAmt(totalDollars)+'</span>'+
            '<button class="t2-wcard-eye" data-act="t2-toggle-balance" aria-label="Toggle balance visibility">'+(hidden?I.eyeOff:I.eye)+'</button>'+
          '</div>'+
          '<div class="t2-wcard-gbp">'+
            '<span class="t2-approx">'+I.approx+'</span>'+
            '<span>GBP '+maskAmt(totalGbp)+'</span>'+
            '<span class="t2-gbp-caret">'+I.caretDown+'</span>'+
          '</div>'+
        '</div>'+
        '<button class="t2-move" data-act="t2-noop">Move Money</button>'+
      '</div>'+
      '<div class="t2-wcard-currencies" data-tour-stop="currencies">'+
      '<div class="t2-wcard-divider"></div>'+
      '<div class="t2-wcard-row" data-act="t2-noop">'+
        '<img class="t2-glyph" src="assets/glyph-usdt.svg" alt="USDT"/>'+
        '<div class="t2-wcard-meta">'+
          '<div class="t2-wcard-sym">USDT</div>'+
          '<div class="t2-wcard-addrs">'+
            '<span class="t2-addr">EVM: 0x3...e81 '+CopyBtn('usdt-evm', true)+'</span>'+
            '<span class="t2-midot">'+I.midot+'</span>'+
            '<span class="t2-addr">Solana: HRo...bWS '+CopyBtn('usdt-sol', true)+'</span>'+
          '</div>'+
        '</div>'+
        '<div class="t2-wcard-right">'+
          '<div class="t2-wcard-amt-sm">'+usdtAmt+'</div>'+
          '<div class="t2-wcard-sub">GBP '+usdtGbp+'</div>'+
        '</div>'+
        '<span class="t2-wcard-chev">'+I.chevRight+'</span>'+
      '</div>'+
      '<div class="t2-wcard-divider"></div>'+
      '<div class="t2-wcard-row" data-act="t2-noop">'+
        '<img class="t2-glyph" src="assets/glyph-btc.svg" alt="BTC"/>'+
        '<div class="t2-wcard-meta">'+
          '<div class="t2-wcard-sym">BTC</div>'+
          '<div class="t2-wcard-addrs">'+
            '<span class="t2-addr">bc1q...7d3x '+CopyBtn('btc', true)+'</span>'+
          '</div>'+
        '</div>'+
        '<div class="t2-wcard-right">'+
          '<div class="t2-wcard-amt-sm">'+btcAmt+'</div>'+
          '<div class="t2-wcard-sub">GBP '+btcGbp+'</div>'+
        '</div>'+
        '<span class="t2-wcard-chev">'+I.chevRight+'</span>'+
      '</div>'+
      '<a class="t2-wcard-view" data-act="t2-noop">View Wallets</a>'+
      '</div>'+
    '</div>';
  }

  // ---------- recent transactions ----------
  function RecentTxnsTier2(){
    var rows = [
      { kind:'in',  net:'base',     title:'Received USDT', meta:'From 0xDfUE...osUG', date:'Today', time:'11:49 PM', amount:'$700' },
      { kind:'out', net:'optimism', title:'Sent USDT',     meta:'To Bayo Edu',        date:'Today', time:'11:49 PM', amount:'$140' }
    ];
    return '<div class="t2-rc">'+
      '<div class="t2-rc-head"><h3>Recent transactions</h3></div>'+
      '<div class="t2-rc-list">'+
        rows.map(function(r){
          var ic = r.kind==='in' ? I.arrowDownLeft : I.arrowUpRight;
          var tokenSvg = r.net==='optimism' ? 'assets/token-usdt-optimism.svg' : 'assets/token-usdt-base.svg';
          return '<div class="t2-rc-row" data-act="t2-noop">'+
            '<img class="t2-tokavatar-img" src="'+tokenSvg+'" alt="" width="40" height="40"/>'+
            '<div class="t2-rc-meta">'+
              '<div class="t2-rc-t"><span class="t2-rc-arrow '+r.kind+'">'+ic+'</span>'+r.title+'</div>'+
              '<div class="t2-rc-s">'+r.meta+'</div>'+
            '</div>'+
            '<div class="t2-rc-right">'+
              '<div class="t2-rc-amt">'+maskAmt(r.amount)+'</div>'+
              '<div class="t2-rc-dt"><span>'+r.date+'</span><span class="t2-rc-dt-dot"></span><span>'+r.time+'</span></div>'+
            '</div>'+
            '<span class="t2-rc-chev">'+I.chevRight+'</span>'+
          '</div>';
        }).join('')+
      '</div>'+
    '</div>';
  }

  // ---------- quick action card (tabs + body slots) ----------
  var T2_RECV_TOKENS = [
    { sym:'USDT', glyph:'assets/glyph-usdt.svg', nets:[
      { key:'solana',   name:'Solana',   bal:'$6.34',  ic:'assets/network-solana.svg',  addr:'7vYx3wRkRopmtfQfHj7zCRDR9bUu1pTrHazW4DM2fCMP' },
      { key:'base',     name:'Base',     bal:'$23.12', ic:'assets/network-base.svg',    addr:'0xb794f5ea0ba39494ce839613fffba74279579268' },
      { key:'optimism', name:'Optimism', bal:'$0',     ic:'assets/network-optimism.svg',addr:'0x9a8f7cBe1d3e5fA2c4B6e8D1A3F5b7C9d2E4F6a8' },
      { key:'arbitrum', name:'Arbitrum', bal:'$0',     ic:'assets/network-arbitrum.svg',addr:'0x2C4a6E8b0d2F4a6c8E0b2D4f6A8c0E2b4D6f8A0c' },
      { key:'celo',     name:'Celo',     bal:'$2.40',  ic:'assets/network-celo.svg',    addr:'0xE3b9C2f1D5a7B4C6e8D0a2F4c6B8e0D2f4A6c8E0' },
      { key:'polygon',  name:'Polygon',  bal:'$2.40',  ic:'assets/network-polygon.svg', addr:'0x5F7d9B1e3A5c7E9f1B3d5A7c9E1f3B5d7A9c1E3f' }
    ]},
    { sym:'BTC', glyph:'assets/glyph-btc.svg', nets:[
      { key:'bitcoin',   name:'Bitcoin',   bal:'0.046 BTC',  ic:'assets/network-bitcoin.svg',  addr:'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
      { key:'lightning', name:'Lightning', bal:'0.0056 BTC', ic:'assets/network-lightning.svg',addr:'lnbc25u1p3xnhl2pp5jptserfk3zk4qy42tlucycrfwxhydvlemu9pqr93tuzlv9cc7g3sdqsvfhkcap3xyhx7un8cqzpgxqzjcsp5f8c52y2stc300gl6s4xswtjpc37hrnnr3c9wvtgjfuvqmpm35evq9qyyssqy4lgd8tj637qcjp05rdpxxykjenthxftej7a2zzmwrmrl70fyj9hvj0rewhzj7jfvcmnyptk6jrm6sntdc7eaapsh4jeqzslv2xt6q' }
    ]}
  ];
  function t2RecvSel(){
    var s = state.t2RecvSel || { sym:'USDT', net:'base' };
    var tok = T2_RECV_TOKENS.find(function(t){return t.sym===s.sym;}) || T2_RECV_TOKENS[0];
    var net = tok.nets.find(function(n){return n.key===s.net;}) || tok.nets[0];
    return { sym:tok.sym, glyph:tok.glyph, netKey:net.key, netName:net.name, addr:net.addr, netIc:net.ic };
  }
  // ===== MASTER asset picker — shared by Receive / Send / Swap / Buy =====
  // opts: { ctx, groups, sel:{sym,key}, open, q, placeholder }
  // groups: [{ sym, glyph, items:[{ key, name, ic, bal }] }]
  function T2AssetPicker(opts){
    var ctx = opts.ctx;
    var sel = opts.sel || null;
    var open = !!opts.open;
    var pillLabel, pillGlyph='';
    if (sel){
      // find matching item for glyph
      var grp = (opts.groups||[]).find(function(g){return g.sym===sel.sym;});
      var it  = grp && grp.items.find(function(i){return i.key===sel.key;});
      if (it){
        pillGlyph = '<img class="t2-asset-pill-glyph" src="'+it.ic+'" alt=""/>';
        pillLabel = sel.sym+' on '+it.name;
      } else { pillLabel = opts.placeholder || 'Select asset'; }
    } else {
      pillLabel = opts.placeholder || 'Select asset';
    }
    var pill = '<button class="t2-asset-pill" data-act="t2-asset-toggle:'+ctx+'">'+
        pillGlyph+
        '<span class="t2-asset-pill-lbl">'+pillLabel+'</span>'+
        '<span class="t2-asset-pill-chev '+(open?'up':'')+'">'+I.caretDown+'</span>'+
      '</button>';
    if (!open) return pill;
    var pillOut = opts.hidePill ? '' : pill;
    var q = (opts.q || '').toLowerCase();
    var groupsHtml = (opts.groups||[]).map(function(g){
      var items = g.items.filter(function(n){
        if (!q) return true;
        return (g.sym+' '+n.name).toLowerCase().indexOf(q) !== -1;
      });
      if (!items.length) return '';
      var cards = items.map(function(n){
        var on = sel && sel.sym===g.sym && sel.key===n.key;
        return '<button class="t2-recv-netcard '+(on?'on':'')+'" data-act="t2-asset-pick:'+ctx+':'+g.sym+':'+n.key+'">'+
          '<img class="t2-recv-netic" src="'+n.ic+'" alt=""/>'+
          '<span class="t2-recv-netname">'+n.name+'</span>'+
          '<span class="t2-recv-netbal">'+n.bal+'</span>'+
        '</button>';
      }).join('');
      var showChevs = g.items.length > 3;
      var chevsHtml = showChevs ? ('<span class="t2-recv-groupchevs">'+
            '<button class="t2-recv-groupchev" data-act="t2-asset-scroll:left:'+ctx+':'+g.sym+'">'+I.chevLeft+'</button>'+
            '<button class="t2-recv-groupchev" data-act="t2-asset-scroll:right:'+ctx+':'+g.sym+'">'+I.chevRight+'</button>'+
          '</span>') : '';
      return '<div class="t2-recv-group">'+
        '<div class="t2-recv-grouphead">'+
          '<img class="t2-recv-groupglyph" src="'+g.glyph+'" alt=""/>'+
          '<span class="t2-recv-grouptitle">'+g.sym+'</span>'+
          chevsHtml+
        '</div>'+
        '<div class="t2-recv-netrow" data-recv-row="'+ctx+'-'+g.sym+'">'+cards+'</div>'+
      '</div>';
    }).join('');
    return pillOut+
      '<div class="t2-recv-picker">'+
        '<div class="t2-recv-search">'+
          '<span class="t2-recv-searchic">'+I.searchSm+'</span>'+
          '<input type="text" placeholder="Search" value="'+(opts.q||'').replace(/"/g,'&quot;')+'" data-input="t2-asset-q:'+ctx+'"/>'+
        '</div>'+
        '<div class="t2-recv-scroll">'+(groupsHtml || '<div class="t2-recv-empty">No matches</div>')+'</div>'+
      '</div>';
  }
  // Map T2_RECV_TOKENS → master groups shape
  function t2RecvGroups(){
    return T2_RECV_TOKENS.map(function(tok){
      return { sym:tok.sym, glyph:tok.glyph, items: tok.nets.map(function(n){
        return { key:n.key, name:n.name, ic:n.ic, bal:n.bal };
      })};
    });
  }
  window.T2AssetPicker = T2AssetPicker;
  window.t2RecvGroups = t2RecvGroups;

  function ReceiveTabBody(){
    if (window.T2Flows && window.T2Flows.receive) return window.T2Flows.receive();
    var sel = t2RecvSel();
    var open = !!state.t2RecvOpen;
    var pickerHtml = T2AssetPicker({
      ctx:'receive',
      groups: t2RecvGroups(),
      sel: { sym:sel.sym, key:sel.netKey },
      open: open,
      q: state.t2RecvQ
    });
    if (open){
      return '<div class="t2-tab-body t2-receive">'+pickerHtml+'</div>';
    }
    var pill = pickerHtml; // when closed, picker returns just the pill
    return '<div class="t2-tab-body t2-receive">'+
      pill+
      '<div class="t2-qr-card">'+
        '<div class="t2-qr-img"><img src="assets/qr.svg" alt="QR code"/></div>'+
        '<div class="t2-qr-cap">'+
          '<div class="t2-qr-t">Scan to receive '+sel.sym+'</div>'+
          '<div class="t2-qr-s">'+sel.netName+' network</div>'+
        '</div>'+
        '<div class="t2-qr-divider"></div>'+
        '<div class="t2-qr-addr-label">Wallet address</div>'+
        '<div class="t2-qr-addr">'+sel.addr+'</div>'+
        '<div class="t2-qr-actions">'+
          '<button class="t2-qr-btn" data-act="t2-copy:receive-addr">'+
            (state.t2Copies && state.t2Copies['receive-addr'] ? I.checkMd : I.copyMd)+
            '<span>'+(state.t2Copies && state.t2Copies['receive-addr'] ? 'Copied' : 'Copy')+'</span>'+
          '</button>'+
          '<button class="t2-qr-btn" data-act="t2-noop">'+I.share+'<span>Share</span></button>'+
        '</div>'+
      '</div>'+
      '<div class="t2-qr-foot">Only send '+sel.sym+' on '+sel.netName+'; other assets may be lost.</div>'+
    '</div>';
  }
  function SendTabBody(){
    if (window.T2Flows && window.T2Flows.send) return window.T2Flows.send();
    return '<div class="t2-tab-body t2-empty"><!-- TODO: SendTab body --></div>';
  }
  function SwapTabBody(){
    if (window.T2Flows && window.T2Flows.swap) return window.T2Flows.swap();
    return '<div class="t2-tab-body t2-empty"><!-- TODO: SwapTab body --></div>';
  }
  function BuyTabBody(){
    if (window.T2Flows && window.T2Flows.buy) return window.T2Flows.buy();
    return '<div class="t2-tab-body t2-empty"><!-- TODO: BuyTab body --></div>';
  }
  function QuickActionCardTier2(){
    var tabs = [
      { id:'receive', label:'Receive' },
      { id:'send',    label:'Send' },
      { id:'swap',    label:'Swap' },
      { id:'buy',     label:'Buy' }
    ];
    var active = state.t2Tab || 'receive';
    var body = active==='receive' ? ReceiveTabBody()
             : active==='send'    ? SendTabBody()
             : active==='swap'    ? SwapTabBody()
                                  : BuyTabBody();
    // Hide tabs while a "next-screen" subflow is active inside a tab.
    var subscreen =
      (active==='send' && state.send && state.send.screen) ||
      (active==='swap' && state.swap && state.swap.screen) ||
      (active==='buy'  && state.buy  && state.buy.screen) || null;
    var tabsHtml = subscreen ? '' :
      '<div class="t2-qa-tabs">'+
        tabs.map(function(t){
          return '<button class="t2-qa-tab '+(active===t.id?'on':'')+'" data-act="t2-tab:'+t.id+'">'+t.label+'</button>';
        }).join('')+
      '</div>';
    return '<div class="t2-qa-card">'+tabsHtml+body+'</div>';
  }

  // ---------- first-time / KYC empty-state pieces ----------
  function KycProgressBanner(variant){
    // variant: 'first-time' (0%) | 'kyc-progress' (40%)
    var pct = variant === 'kyc-progress' ? 40 : 10;
    var pctText = pct + '%';
    var title = variant === 'kyc-progress'
      ? 'Your Tier 2 verification is in progress'
      : 'Make the most of Enta';
    var subtitle = variant === 'kyc-progress'
      ? 'Complete to move between crypto and cash'
      : 'We\u2019ll ask for a few personal details. You\u2019ll also need to verify your ID and take a selfie.';
    var steps = [
      { label:'Profile',  fill: variant === 'kyc-progress' ? 100 : 10 },
      { label:'Identity', fill: variant === 'kyc-progress' ? 50  : 0 },
      { label:'Selfie',   fill: 0 }
    ];
    // Circle arc (6px stroke; gray bg ring + purple arc)
    var r = 26, c = 2*Math.PI*r;
    var dash = (pct/100) * c;
    var ring = '<svg class="t2-kyc-ring" width="64" height="64" viewBox="0 0 64 64">'+
      '<circle cx="32" cy="32" r="'+r+'" stroke="rgb(228,231,236)" stroke-width="6" fill="none"/>'+
      (pct>0 ? '<circle cx="32" cy="32" r="'+r+'" stroke="rgb(159,26,177)" stroke-width="6" fill="none" stroke-linecap="round" '+
        'stroke-dasharray="'+dash+' '+c+'" transform="rotate(-90 32 32)"/>' : '')+
      '<text x="32" y="36" text-anchor="middle" font-family="Instrument Sans" font-weight="700" font-size="14" fill="rgb(16,42,86)">'+pctText+'</text>'+
      '</svg>';
    var segs = '<div class="t2-kyc-segs">'+
      steps.map(function(s){
        return '<div class="t2-kyc-seg">'+
          '<div class="t2-kyc-bar"><div class="t2-kyc-bar-fill" style="width:'+s.fill+'%"></div></div>'+
          '<div class="t2-kyc-seg-label">'+s.label+'</div>'+
        '</div>';
      }).join('')+
    '</div>';
    var ctaText = 'Continue Setup';
    return '<div class="t2-kyc-banner" data-tour-stop="kyc">'+
      '<div class="t2-kyc-ringwrap">'+ring+'</div>'+
      '<div class="t2-kyc-body">'+
        '<div class="t2-kyc-textblock">'+
          '<div class="t2-kyc-title">'+title+'</div>'+
          '<div class="t2-kyc-sub">'+subtitle+'</div>'+
        '</div>'+
        segs+
      '</div>'+
      '<button class="t2-kyc-cta" data-act="t2-kyc-continue">'+ctaText+'</button>'+
    '</div>';
  }

  function RecentTxnsEmpty(){
    return '<div class="t2-rc" data-tour-stop="transactions">'+
      '<div class="t2-rc-head"><h3>Recent transactions</h3></div>'+
      '<div class="t2-rc-empty">'+
        '<img class="t2-rc-empty-ill" src="assets/empty-chat.svg" alt="" width="64" height="64"/>'+
        '<div class="t2-rc-empty-title">No transactions yet</div>'+
        '<div class="t2-rc-empty-sub">Complete a transaction and we\u2019ll show your most recent ones here</div>'+
      '</div>'+
    '</div>';
  }

  function ForYouCard(outcome){
    var isFirst = outcome === 'first-time';
    var items = [
      { title:'Set up wallet<br/>recovery', ic: I.shield, locked:false, tone:'purple' },
      { title:'Move between<br/>crypto and cash', ic: I.arrowsLR, locked:true, tone:'purple' }
    ];
    return '<div class="t2-foryou">'+
      '<div class="t2-foryou-title">For you</div>'+
      '<div class="t2-foryou-list">'+
        items.map(function(it){
          return '<button class="t2-foryou-row'+(it.locked?' is-locked':'')+'" data-act="t2-noop">'+
            '<span class="t2-foryou-ic">'+it.ic+'</span>'+
            '<span class="t2-foryou-text">'+it.title+'</span>'+
            (it.locked
              ? '<span class="t2-foryou-lock">'+I.lockSm+'</span>'
              : '')+
          '</button>';
        }).join('')+
      '</div>'+
    '</div>';
  }

  // ---------- screen ----------
  function Tier2HomeScreen(){
    if (state.balanceHidden === undefined) state.balanceHidden = false;
    if (!state.t2Tab) state.t2Tab = 'receive';
    if (!state.t2Copies) state.t2Copies = {};
    var outcome = window.state && window.state.homeOutcome ? window.state.homeOutcome : 'tier2-unlocked';
    var isFirstTime = outcome === 'first-time';
    var isKycProg = outcome === 'kyc-progress';
    var hasFunds = !isFirstTime && !isKycProg;
    var greetTitle = hasFunds ? 'Good morning, Jamie' : 'Welcome to Enta';
    var greetSub = hasFunds
      ? 'We\u2019re here to make crypto banking effortless for you'
      : 'Your wallet is ready to send, swap and receive crypto';
    var bannerHtml = isFirstTime ? KycProgressBanner('first-time')
                  : isKycProg   ? KycProgressBanner('kyc-progress')
                                : '';
    // Empty/identity is per state; kyc-progress has funds but still empty avatars/name.
    var hasIdentity = !isFirstTime && !isKycProg;
    var walletHasFunds = isKycProg || hasIdentity;
    var rightCol = isFirstTime ? '' : QuickActionCardTier2();
    var txnsHtml = isFirstTime ? RecentTxnsEmpty() : RecentTxnsTier2();
    return '<div class="t2-screen'+(hasIdentity?'':(isFirstTime?' t2-screen--firsttime':' t2-screen--kycprog'))+'">'+
      Tier2Sidebar(hasIdentity)+
      '<div class="t2-main">'+
        Tier2Topbar()+
        '<div class="t2-content">'+
          '<div class="t2-greet">'+
            '<div class="t2-greet-text">'+
              '<h1>'+greetTitle+'</h1>'+
              '<p>'+greetSub+'</p>'+
            '</div>'+
            '<div class="t2-greet-actions">'+
              '<button class="t2-bell" data-act="t2-noop" aria-label="Notifications">'+I.bell+'</button>'+
              '<button class="t2-userav'+(hasIdentity?'':' t2-userav--empty')+'" data-act="t2-noop" aria-label="Account">'+(hasIdentity?'J':I.userCircle)+'</button>'+
            '</div>'+
          '</div>'+
          bannerHtml+
          '<div class="t2-grid">'+
            '<div class="t2-col-left">'+
              WalletCardTier2(state.balanceHidden, walletHasFunds, isKycProg?'kyc':'unlocked')+
              txnsHtml+
            '</div>'+
            (rightCol ? '<div class="t2-col-right">'+rightCol+'</div>' : '')+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  }

  // Click-outside-to-close for any open asset picker / fiat popover.
  // Use 'click' (not mousedown) so the action dispatcher fires FIRST — otherwise
  // rerendering the DOM here would detach the target before its click handler runs
  // (which broke tab-switching while a picker was open).
  document.addEventListener('click', function(e){
    // Bail early if nothing is open.
    if (!state.t2RecvOpen && !state.assetPickerOpen && !state.popover && !state.acctMenu && !state.t1AcctMenu) return;
    var el = e.target;
    if (!el || !el.closest) return;
    var inPicker = el.closest('.t2-recv-picker') || el.closest('.t2-asset-pill') || el.closest('.t2-pop') || el.closest('.t2-pop-fiat') || el.closest('.t2-modal') || el.closest('.t2-chip-asset') || el.closest('.t2-chip-ben') || el.closest('.t2-bendrop') || el.closest('[data-act^="asset-open:"]') || el.closest('[data-act^="t2-asset-pick:"]') || el.closest('[data-act^="t2-asset-toggle:"]') || el.closest('[data-act="ben-open"]') || el.closest('[data-act^="ben-filter:"]') || el.closest('[data-act^="ben-pick:"]');
    var inAcct = el.closest('.t2-acctmenu') || el.closest('[data-act="t2-acct-toggle"]');
    var inT1Acct = el.closest('.t1-acctmenu') || el.closest('[data-act="t1-acct-toggle"]');
    if (inPicker && !state.acctMenu && !state.t1AcctMenu) return;
    var changed = false;
    if (state.t2RecvOpen && !inPicker){ state.t2RecvOpen = false; state.t2RecvQ = ''; changed = true; }
    if (state.assetPickerOpen && !inPicker){ state.assetPickerOpen = null; state.assetPickerQ = ''; changed = true; }
    if (state.popover && !inPicker){ state.popover = null; changed = true; }
    if (state.acctMenu && !inAcct){ state.acctMenu = false; changed = true; }
    if (state.t1AcctMenu && !inT1Acct){ state.t1AcctMenu = false; changed = true; }
    if (changed) rerenderHome();
  });

  document.addEventListener('input', function(e){
    var el = e.target;
    if (!el || !el.matches) return;
    if (el.matches('[data-input="t2-recv-q"]') || (el.dataset && el.dataset.input && el.dataset.input.indexOf('t2-asset-q:')===0)){
      var ctxQ = el.dataset.input && el.dataset.input.indexOf('t2-asset-q:')===0 ? el.dataset.input.split(':')[1] : 'receive';
      if (ctxQ === 'receive'){
        state.t2RecvQ = el.value;
      } else {
        if (!state.t2Asset) state.t2Asset = {};
        if (!state.t2Asset[ctxQ]) state.t2Asset[ctxQ] = {};
        state.t2Asset[ctxQ].q = el.value;
      }
      // surgical update — re-render just the picker scroll region to keep focus
      var scroll = el.closest('.t2-recv-picker') && el.closest('.t2-recv-picker').querySelector('.t2-recv-scroll');
      if (!scroll) return;
      if (ctxQ === 'receive'){
        var fake = document.createElement('div');
        fake.innerHTML = ReceiveTabBody();
        var fresh = fake.querySelector('.t2-recv-scroll');
        if (fresh) scroll.innerHTML = fresh.innerHTML;
      } else {
        // re-render whole tab body so flows.js picker refreshes
        if (typeof window.rerenderTier2Home === 'function') window.rerenderTier2Home();
      }
      return;
    }
  });

  // ---------- handler wiring ----------
  function rerenderHome(){
    var canvas = document.getElementById('canvas');
    var host = canvas && canvas.querySelector('.t2-screen');
    if (!host) return;
    var div = document.createElement('div');
    div.innerHTML = Tier2HomeScreen();
    host.replaceWith(div.firstElementChild);
  }

  var origHandle = window.handle;
  window.handle = function(act){
    if (act === 't2-noop') return;
    if (act === 't2-acct-toggle'){
      state.acctMenu = !state.acctMenu;
      rerenderHome();
      return;
    }
    if (act === 't1-acct-toggle'){
      state.t1AcctMenu = !state.t1AcctMenu;
      rerenderHome();
      return;
    }
    if (act === 't1-acct-link'){
      state.t1AcctMenu = false;
      rerenderHome();
      return;
    }
    if (act === 't1-acct-continue' || act === 't2-kyc-continue'){
      state.t1AcctMenu = false;
      if (typeof setFrame === 'function') setFrame('kyc-profile');
      rerenderHome();
      return;
    }
    if (act === 't2-toggle-balance'){
      state.balanceHidden = !state.balanceHidden;
      rerenderHome();
      return;
    }
    if (act && act.indexOf('t2-tab:') === 0){
      state.t2Tab = act.split(':')[1];
      rerenderHome();
      return;
    }
    if (act === 't2-recv-toggle' || act === 't2-asset-toggle:receive'){
      state.t2RecvOpen = !state.t2RecvOpen;
      rerenderHome();
      return;
    }
    if (act && act.indexOf('t2-asset-scroll:') === 0){
      var spa = act.split(':');
      var dirA = spa[1], ctxAs = spa[2], symAs = spa[3];
      var rowA = document.querySelector('.t2-recv-netrow[data-recv-row="'+ctxAs+'-'+symAs+'"]');
      if (rowA){ rowA.scrollBy({ left: dirA==='left' ? -112 : 112, behavior:'smooth' }); }
      return;
    }
    if (act && act.indexOf('t2-asset-pick:receive:') === 0){
      var ppr = act.split(':');
      state.t2RecvSel = { sym:ppr[2], net:ppr[3] };
      state.t2RecvOpen = false;
      state.t2RecvQ = '';
      rerenderHome();
      return;
    }
    if (act && act.indexOf('t2-recv-scroll:') === 0){
      var sp = act.split(':');
      var dir = sp[1], sym = sp[2];
      var row = document.querySelector('.t2-recv-netrow[data-recv-row="receive-'+sym+'"]') || document.querySelector('.t2-recv-netrow[data-recv-row="'+sym+'"]');
      if (row){
        var step = 112;
        row.scrollBy({ left: dir==='left' ? -step : step, behavior:'smooth' });
      }
      return;
    }
    if (act && act.indexOf('t2-recv-pick:') === 0){
      var parts = act.split(':');
      state.t2RecvSel = { sym:parts[1], net:parts[2] };
      state.t2RecvOpen = false;
      state.t2RecvQ = '';
      rerenderHome();
      return;
    }
    if (act && act.indexOf('t2-copy:') === 0){
      var id = act.split(':')[1];
      if (!state.t2Copies) state.t2Copies = {};
      state.t2Copies[id] = true;
      rerenderHome();
      setTimeout(function(){
        state.t2Copies[id] = false;
        rerenderHome();
      }, 1600);
      return;
    }
    if (typeof origHandle === 'function') return origHandle(act);
  };

  // ---------- HomeScreen hijack: route tier2-unlocked here ----------
  var origHomeScreen = window.HomeScreen;
  window.HomeScreen = function(outcome){
    if (outcome === 'tier2-unlocked' || outcome === 'first-time' || outcome === 'kyc-progress') return Tier2HomeScreen();
    if (typeof origHomeScreen === 'function') return origHomeScreen(outcome);
    return '';
  };

  // expose
  window.Tier2HomeScreen = Tier2HomeScreen;
  window.rerenderTier2Home = rerenderHome;
  window.t2Icons = I;
  window.t2CopyBtn = CopyBtn;
  window.t2MaskAmt = maskAmt;
})();
