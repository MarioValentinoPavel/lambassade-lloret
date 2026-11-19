// L'Ambassade · comportamiento de la página.
(() => {
  document.documentElement.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const L = () => (window.I18N ? I18N.get() : 'fr');
  const T = (m) => (m ? (m[L()] ?? m.fr ?? m.es ?? m.en ?? '') : '');
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const S = window.SHOP;
  const KEY = 'lambassade-lloret-cart';

  const money = (c) => {
    const v = (c / 100).toFixed(2);
    return L() === 'en' ? '€' + v : v.replace('.', ',') + ' €';
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- textos que dependen del idioma ----------
  const TX = {
    hours: { fr: '10 h – 3 h', es: '10:00 – 3:00', en: '10 am – 3 am' },
    openNow: { fr: 'Ouvert maintenant · jusqu’à 3 h', es: 'Abierto ahora · hasta las 3:00', en: 'Open now · until 3 am' },
    closedNow: { fr: 'Fermé · ouvre à 10 h', es: 'Cerrado · abre a las 10:00', en: 'Closed · opens at 10 am' },
    hello: { fr: 'Bonjour L’Ambassade !', es: '¡Hola, L’Ambassade!', en: 'Hello L’Ambassade!' },
    want: { fr: 'Je voudrais commander :', es: 'Quisiera pedir:', en: 'I would like to order:' },
    total: { fr: 'Total indicatif', es: 'Total orientativo', en: 'Estimated total' },
    mode: { fr: 'Mode', es: 'Modo', en: 'Mode' },
    take: { fr: 'À emporter', es: 'Para llevar', en: 'Take away' },
    deliv: { fr: 'Livraison', es: 'A domicilio', en: 'Delivery' },
    note: { fr: 'Remarque', es: 'Comentario', en: 'Note' },
    flavour: { fr: 'parfum à préciser', es: 'sabor a concretar', en: 'flavour to confirm' },
    addL: { fr: 'Ajouter', es: 'Añadir', en: 'Add' },
    added: { fr: 'Ajouté à la commande', es: 'Añadido al pedido', en: 'Added to the order' },
    less: { fr: 'Retirer un', es: 'Quitar uno', en: 'Remove one' },
    more: { fr: 'Ajouter un', es: 'Añadir uno', en: 'Add one' },
    flagOf: { fr: 'Drapeau : ', es: 'Bandera: ', en: 'Flag: ' },
    meat1: { fr: '1 viande', es: '1 carne', en: '1 meat' },
    meatN: { fr: '{n} viandes', es: '{n} carnes', en: '{n} meats' },
    pickOne: { fr: 'Choisissez au moins une viande.', es: 'Elige al menos una carne.', en: 'Pick at least one meat.' },
    xlName: { fr: 'Tacos XL', es: 'Tacos XL', en: 'XL tacos' },
    trans: { fr: 'traduit', es: 'traducido', en: 'translated' },
    transG: { fr: 'traduit par Google', es: 'traducción de Google', en: 'translated by Google' },
    cats: { xl: { fr: 'Tacos XL', es: 'Tacos XL', en: 'XL tacos' }, bar: { fr: 'Au bar', es: 'En la barra', en: 'At the bar' } },
    perLitre: { fr: 'le litre', es: 'el litro', en: 'per litre' },
    vidPause: { fr: 'Mettre la vidéo en pause', es: 'Pausar el vídeo', en: 'Pause the video' },
    vidPlay: { fr: 'Lire la vidéo', es: 'Reproducir el vídeo', en: 'Play the video' },
    rvPause: { fr: 'Mettre en pause', es: 'Pausar', en: 'Pause' },
    rvPlay: { fr: 'Reprendre', es: 'Reanudar', en: 'Resume' },
    ticker: {
      fr: ['Tacos français', 'Burgers signature', 'French Tasty Crousty', 'Mojitos à 6 €', 'Ouvert 7 j/7, même l’hiver', 'Sur place · À emporter · Livraison', 'Le QG des francophones depuis 2014'],
      es: ['Tacos franceses', 'Burgers de la casa', 'French Tasty Crousty', 'Mojitos a 6 €', 'Abierto 7 días, también en invierno', 'En el local · Para llevar · A domicilio', 'Le QG des francophones depuis 2014'],
      en: ['French tacos', 'Signature burgers', 'French Tasty Crousty', '€6 mojitos', 'Open 7 days, winter included', 'Eat in · Take away · Delivery', 'Le QG des francophones depuis 2014']
    }
  };

  // ---------- cabecera ----------
  const top = $('[data-top]');
  const wm = $('.hero .wm');
  const onScroll = () => {
    top.classList.toggle('solid', scrollY > 40);
    const r = wm.getBoundingClientRect();
    top.classList.toggle('mark', r.bottom < 40);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = $('.top-menu'), mnav = $('#mnav');
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    mnav.hidden = !open;
    document.documentElement.classList.toggle('lock', open);
    top.classList.toggle('solid', open || scrollY > 40);
  };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  mnav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mnav.hidden) { setMenu(false); menuBtn.focus(); } });
  matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  // ---------- marca a todo lo ancho ----------
  function fitWord(el, max) {
    if (!el) return;
    const box = Math.min($('.hero-in').clientWidth - (matchMedia('(max-width: 720px)').matches ? 4 : 40), 1240);
    el.style.setProperty('--wm', '100px');
    el.style.fontSize = '100px';
    const w = el.scrollWidth;
    el.style.fontSize = '';
    const size = Math.max(28, Math.min(max, (box / w) * 100 * 0.985));
    el.style.setProperty('--wm', size.toFixed(2) + 'px');
  }
  const fitAll = () => {
    fitWord(wm, Math.min(230, innerHeight * 0.24));
    const f = $('.foot-wm');
    if (f) { f.style.fontSize = '100px'; const w = f.scrollWidth, box = f.parentElement.clientWidth - 2 * parseFloat(getComputedStyle(f.parentElement).paddingLeft); f.style.fontSize = Math.min(240, (box / w) * 100 * 0.985).toFixed(2) + 'px'; }
  };
  if (document.fonts) {
    document.fonts.load('400 100px Stardom').then(fitAll, fitAll);
    document.fonts.ready.then(fitAll);
    document.fonts.addEventListener('loadingdone', fitAll);
  }
  new ResizeObserver(fitAll).observe(document.body);

  // ---------- vídeo de la portada ----------
  const vid = $('.hero-vid'), vBtn = $('[data-vid]');
  let userPaused = false;
  if (vid) {
    if (matchMedia('(max-width: 720px)').matches && vid.dataset.posterM) vid.poster = vid.dataset.posterM;
    const setBtn = () => {
      const paused = vid.paused;
      vBtn.classList.toggle('is-paused', paused);
      vBtn.setAttribute('aria-label', T(paused ? TX.vidPlay : TX.vidPause));
    };
    const tryPlay = () => { const pr = vid.play(); if (pr && pr.catch) pr.catch(() => setBtn()); };
    if (RM.matches || (navigator.connection && navigator.connection.saveData)) { vid.removeAttribute('autoplay'); vid.pause(); userPaused = true; }
    vid.addEventListener('play', setBtn); vid.addEventListener('pause', setBtn);
    vBtn.addEventListener('click', () => { if (vid.paused) { userPaused = false; tryPlay(); } else { userPaused = true; vid.pause(); } });
    // fuera de pantalla no gasta batería
    new IntersectionObserver((es) => { if (es[0].isIntersecting) { if (!userPaused) tryPlay(); } else vid.pause(); }, { threshold: 0.05 }).observe(vid);
    document.addEventListener('langchange', setBtn);
    setBtn();
  }

  // ---------- cinta con banderas ----------
  const FLAGS = [...new Set([...SIGNATURES.tacos, ...SIGNATURES.burgers].map((x) => x.flag)), 'be'];
  function renderTicker() {
    const el = $('[data-ticker]'); if (!el) return;
    const items = T(TX.ticker);
    const one = items.map((t, i) => `<span class="tk">${esc(t)}</span><img class="tk-f" src="assets/flags/${FLAGS[i % FLAGS.length]}.svg" alt="" width="27" height="18">`).join('');
    el.innerHTML = `<div class="tk-set">${one}</div><div class="tk-set">${one}</div>`;
  }
  function renderFootFlags() {
    const el = $('[data-foot-flags]'); if (!el) return;
    el.innerHTML = FLAGS.map((f) => `<img src="assets/flags/${f}.svg" alt="" width="30" height="20" loading="lazy">`).join('');
  }

  // ---------- recetas de autor ----------
  const sigLists = { tacos: $('[data-list="tacos"]'), burgers: $('[data-list="burgers"]') };
  const allSig = [...SIGNATURES.tacos, ...SIGNATURES.burgers];
  let cur = allSig[0];
  const sigCanvas = $('#sig-flag');
  const sigMast = $('.sig-mast');
  let sigFlag = null;
  if (window.Flag && sigCanvas) sigFlag = new Flag.Cloth(sigCanvas, { code: cur.flag, ratio: cur.r, ratioMax: 2, amp: 0.15, pad: [0, 0.18, 0.12, 0.12], valign: 1 });
  const MAXR = 2, PADR = 0.18;
  function centerMast(r) {
    // el mástil se desplaza para que la bandera quede centrada en su columna, sea larga o corta
    const w = sigMast.getBoundingClientRect().width;
    const unit = w / (MAXR + PADR);
    sigMast.style.translate = (((MAXR - r) / 2) * unit).toFixed(1) + 'px 0';
  }
  sigMast.style.transition = RM.matches ? 'none' : 'translate .8s cubic-bezier(.7,0,.2,1)';

  function renderSigLists() {
    Object.entries(sigLists).forEach(([k, ul]) => {
      ul.innerHTML = SIGNATURES[k].map((s) => `<li><button type="button" data-sig="${s.id}" aria-pressed="${s.id === cur.id}">
        <span class="sw" aria-hidden="true"><img src="assets/flags/${s.flag}.svg" alt="" width="21" height="14"></span><span class="nm">${esc(s.name)}</span><span class="pr">${money(s.price)}</span></button></li>`).join('');
    });
  }
  function renderSigCard(anim) {
    const card = $('.sig-card');
    $('[data-sig-name]').textContent = cur.name;
    $('[data-sig-desc]').textContent = T(cur.d);
    $('[data-sig-country]').textContent = T(cur.c);
    $('[data-sig-price]').textContent = money(cur.price);
    $('[data-sig-mini]').src = 'assets/flags/' + cur.flag + '.svg';
    sigCanvas.setAttribute('aria-label', T(TX.flagOf) + T(cur.c));
    if (anim && !RM.matches) { card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap'); }
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sig]');
    if (!b) return;
    const s = allSig.find((x) => x.id === b.dataset.sig);
    if (!s || s.id === cur.id) return;
    const prevFlag = cur.flag, prevR = cur.r;
    cur = s;
    $$('[data-sig]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.sig === s.id)));
    renderSigCard(true);
    centerMast(s.r);
    if (sigFlag && (s.flag !== prevFlag || s.r !== prevR)) sigFlag.set(s.flag, s.r);
    // en móvil la bandera está fija arriba: nada que desplazar
  });
  $('[data-sig-add]').addEventListener('click', (e) => { add({ k: 'sig:' + cur.id }); pulse(e.currentTarget); });

  // ---------- carta ----------
  const XL = window.TACOS_XL;
  let meats = ['tenders'];
  function renderXL() {
    $('.xl-meats').innerHTML = XL.meats.map((m) => `<button type="button" data-meat="${m.id}" aria-pressed="${meats.includes(m.id)}">${esc(T(m.t))}</button>`).join('');
    updateXL();
    $('[data-xl-scale]').textContent = XL.prices.map((p, i) => (i ? T(TX.meatN).replace('{n}', i + 1) : T(TX.meat1)) + ' ' + money(p)).join(' · ');
  }
  function xlLabel(ids) {
    return T(TX.xlName) + ' · ' + ids.map((id) => T(XL.meats.find((m) => m.id === id).t)).join(' + ');
  }
  function updateXL() {
    const ok = meats.length > 0;
    $('[data-xl-sum]').textContent = ok ? xlLabel(meats) : T(TX.pickOne);
    $('[data-xl-price]').textContent = ok ? money(XL.prices[meats.length - 1]) : '';
    const b = $('[data-xl-add]');
    b.disabled = !ok;
    b.setAttribute('aria-label', T(TX.addL) + (ok ? ' : ' + xlLabel(meats) : ''));
  }
  $('.xl-meats').addEventListener('click', (e) => {
    const b = e.target.closest('[data-meat]'); if (!b) return;
    const id = b.dataset.meat;
    meats = meats.includes(id) ? meats.filter((x) => x !== id) : [...meats, id];
    meats.sort((a, b2) => XL.meats.findIndex((m) => m.id === a) - XL.meats.findIndex((m) => m.id === b2));
    b.setAttribute('aria-pressed', String(meats.includes(id)));
    updateXL();
  });
  $('[data-xl-add]').addEventListener('click', (e) => { if (!meats.length) return; add({ k: 'xl:' + meats.join('+') }); pulse(e.currentTarget); });

  function renderMenu() {
    const colL = $('[data-col="l"]'), colR = $('[data-col="r"]');
    $$('.cat-dyn').forEach((n) => n.remove());
    MENU.forEach((c) => {
      const el = document.createElement('article');
      el.className = 'cat cat-dyn';
      el.id = 'cat-' + c.id;
      el.setAttribute('aria-labelledby', 'h-' + c.id);
      el.innerHTML = `<h3 id="h-${c.id}">${esc(T(c.t))}</h3>${c.n ? `<p class="cat-n">${esc(T(c.n))}</p>` : ''}
        <ul class="it-list">${c.items.map((it) => `<li class="it"><span><span class="it-n">${esc(T(it.name))}</span>${it.d ? `<span class="it-d">${esc(T(it.d))}</span>` : ''}</span>
          <span class="it-p">${money(it.price)}</span>
          <button class="it-add" type="button" data-add="${it.id}" aria-label="${esc(T(TX.addL) + ' : ' + T(it.name))}"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-plus"/></svg></button></li>`).join('')}</ul>`;
      (c.side === 'l' ? colL : colR).appendChild(el);
    });
    // navegación por categorías (en el orden de lectura)
    const order = [{ id: 'xl', t: TX.cats.xl }, ...MENU.map((c) => ({ id: c.id, t: c.t })), { id: 'bar', t: TX.cats.bar }];
    $('.carte-nav').innerHTML = order.map((o) => `<a href="#cat-${o.id}">${esc(T(o.t))}</a>`).join('');
    $('[data-bar]').innerHTML = BAR.map((b) => `<li><b>${esc(T(b.t))}</b><span class="p">${esc(L() === 'en' ? b.p.replace(/(\d+),(\d+) €/g, '€$1.$2') : b.p)}</span><span class="l">${esc(T(TX.perLitre))}${L() === 'fr' ? ' :' : ':'} ${esc(L() === 'en' ? b.l.replace(/(\d+),(\d+) €/, '€$1.$2') : b.l)}</span><span class="d">${esc(T(b.d))}</span></li>`).join('');
    observeNew();
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    add({ k: 'menu:' + b.dataset.add }); pulse(b);
  });

  // ---------- opiniones ----------
  const COLORS = ['#1633a8', '#d61f27', '#0b154f'];
  function card(r, i, hidden) {
    const lang = L();
    const orig = r.o === lang;
    const tag = r.o === 'gt' ? (lang === 'es' ? T(TX.transG) : T(TX.trans)) : (orig ? '' : T(TX.trans));
    return `<article class="rv-card"${hidden ? ' aria-hidden="true"' : ''}>
      <header><span class="av" style="--c:${COLORS[i % COLORS.length]}" aria-hidden="true">${esc(r.who.trim()[0].toUpperCase())}</span>
      <span class="who"><b>${esc(r.who)}</b><small>${esc(r.src)} · ${esc(T(r.date))}${tag ? ' · ' + esc(tag) : ''}</small></span>
      <span class="src src-${r.src.toLowerCase()}" aria-hidden="true">${r.src === 'Google' ? 'G' : 'TA'}</span></header>
      <p${orig ? ` lang="${r.o}"` : ''}>${esc(r.q[lang] || r.q.es)}</p></article>`;
  }
  function renderReviews() {
    const lang = L();
    const f = REVIEWS.find((r) => r.feat);
    if (f) {
      const orig = f.o === lang;
      const tag = f.o === 'gt' ? (lang === 'es' ? T(TX.transG) : T(TX.trans)) : (orig ? '' : T(TX.trans));
      $('[data-feat-q]').textContent = f.q[lang] || f.q.es;
      $('[data-feat-c]').innerHTML = `<b>${esc(f.who)}</b> · ${esc(f.src)} · ${esc(T(f.date))}${tag ? ' · <i>' + esc(tag) + '</i>' : ''}`;
    }
    const rest = REVIEWS.filter((r) => !r.feat);
    const half = Math.ceil(rest.length / 2);
    const rows = [rest.slice(0, half), rest.slice(half)];
    $('[data-reviews]').innerHTML = rows.map((row, k) => {
      const set = (hid) => row.map((r, i) => card(r, i + k, hid)).join('');
      return `<div class="rv-row${k ? ' rev' : ''}"><div class="rv-track">${set(false)}${set(true)}</div></div>`;
    }).join('');
    $$('.score-n').forEach((n) => (n.textContent = lang === 'en' ? n.dataset.n : n.dataset.n.replace('.', ',')));
    rvLabel();
  }
  const rvBtn = $('[data-rv]'), rvRows = $('[data-reviews]');
  function rvLabel() {
    const p = rvRows.classList.contains('paused');
    rvBtn.setAttribute('aria-pressed', String(p));
    rvBtn.querySelector('span').textContent = T(p ? TX.rvPlay : TX.rvPause);
    rvBtn.classList.toggle('is-paused', p);
  }
  rvBtn.addEventListener('click', () => { rvRows.classList.toggle('paused'); rvLabel(); });

  // ---------- pedido ----------
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (_) { /* sin almacenamiento */ } };
  function info(k) {
    const [kind, id] = k.split(':');
    if (kind === 'sig') { const s = allSig.find((x) => x.id === id); return s && { name: s.name, price: s.price }; }
    if (kind === 'xl') { const ids = id.split('+'); return { name: xlLabel(ids), price: XL.prices[ids.length - 1] }; }
    if (kind === 'menu') {
      for (const c of MENU) { const it = c.items.find((x) => x.id === id); if (it) return { name: T(it.name), price: it.price, ask: it.ask }; }
    }
    return null;
  }
  function add(item) {
    const f = cart.find((x) => x.k === item.k);
    if (f) f.q += 1; else cart.push({ k: item.k, q: 1 });
    save(); renderCart(true);
  }
  function pulse(btn) {
    if (!btn) return;
    btn.classList.add('ok');
    const live = $('[data-live]');
    if (live) live.textContent = T(TX.added);
    setTimeout(() => btn.classList.remove('ok'), 650);
  }
  const fab = $('[data-cart-open]'), dlg = $('dialog.cart');
  function totals() {
    let n = 0, sum = 0;
    cart.forEach((x) => { const i = info(x.k); if (i) { n += x.q; sum += i.price * x.q; } });
    return { n, sum };
  }
  function message() {
    const lines = [T(TX.hello), T(TX.want)];
    cart.forEach((x) => { const i = info(x.k); if (i) lines.push(`• ${x.q} × ${i.name}${i.ask ? ' (' + T(TX.flavour) + ')' : ''} – ${money(i.price * x.q)}`); });
    lines.push('', `${T(TX.total)} : ${money(totals().sum)}`.replace(' :', L() === 'fr' ? ' :' : ':'));
    const mode = ($('input[name="mode"]:checked') || {}).value === 'deliv' ? T(TX.deliv) : T(TX.take);
    lines.push(`${T(TX.mode)}${L() === 'fr' ? ' :' : ':'} ${mode}`);
    const note = $('[data-cart-note]').value.trim();
    if (note) lines.push(`${T(TX.note)}${L() === 'fr' ? ' :' : ':'} ${note}`);
    return lines.join('\n');
  }
  function renderCart(bump) {
    const { n, sum } = totals();
    fab.hidden = n === 0;
    document.body.classList.toggle('has-cart', n > 0);
    $('[data-cart-count]').textContent = n;
    $('[data-cart-total]').textContent = money(sum);
    if (bump && n && !RM.matches) { fab.classList.remove('bump'); void fab.offsetWidth; fab.classList.add('bump'); }
    $('[data-cart-list]').innerHTML = cart.map((x) => {
      const i = info(x.k); if (!i) return '';
      return `<li><span class="nm">${esc(i.name)}</span><span class="sub">${money(i.price)} × ${x.q} = ${money(i.price * x.q)}</span>
        <span class="qty"><button type="button" data-q="-1" data-k="${esc(x.k)}" aria-label="${esc(T(TX.less) + ' : ' + i.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-minus"/></svg></button><output>${x.q}</output><button type="button" data-q="1" data-k="${esc(x.k)}" aria-label="${esc(T(TX.more) + ' : ' + i.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-plus"/></svg></button></span></li>`;
    }).join('');
    $('[data-cart-empty]').hidden = n > 0;
    $('[data-cart-sum]').textContent = money(sum);
    updateSend();
  }
  function updateSend() {
    const a = $('[data-cart-send]');
    const has = totals().n > 0;
    a.href = 'https://wa.me/' + S.wa + (has ? '?text=' + encodeURIComponent(message()) : '');
    a.setAttribute('aria-disabled', String(!has));
  }
  fab.addEventListener('click', () => { dlg.showModal(); document.documentElement.classList.add('lock'); });
  dlg.addEventListener('close', () => document.documentElement.classList.remove('lock'));
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('[data-cart-close]')) { dlg.close(); return; }
    const q = e.target.closest('[data-q]');
    if (q) {
      const it = cart.find((x) => x.k === q.dataset.k);
      if (it) { it.q += +q.dataset.q; if (it.q <= 0) cart = cart.filter((x) => x !== it); }
      save(); renderCart();
      if (!cart.length) setTimeout(() => dlg.open && dlg.close(), 250);
      return;
    }
    if (e.target.closest('[data-cart-clear]')) { cart = []; save(); renderCart(); dlg.close(); }
  });
  dlg.addEventListener('input', updateSend);
  dlg.addEventListener('change', updateSend);

  // ---------- horario y estado ----------
  function nowMin() {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: S.tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const h = +p.find((x) => x.type === 'hour').value, m = +p.find((x) => x.type === 'minute').value;
    return h * 60 + m;
  }
  function renderStatus() {
    const m = nowMin();
    const open = S.close < S.open ? (m >= S.open || m < S.close) : (m >= S.open && m < S.close);
    $$('[data-status]').forEach((el) => (el.textContent = T(open ? TX.openNow : TX.closedNow)));
    $$('[data-dot]').forEach((d) => d.classList.toggle('on', open));
    $$('[data-hours]').forEach((el) => (el.textContent = T(TX.hours)));
  }
  setInterval(renderStatus, 60000);

  // ---------- enlaces de WhatsApp con saludo ----------
  function renderWa() {
    $$('[data-wa]').forEach((a) => (a.href = 'https://wa.me/' + S.wa + '?text=' + encodeURIComponent(T(TX.hello))));
  }

  // ---------- entradas al hacer scroll ----------
  let io = null;
  const marks = '.sec-h, .carte-photos figure, .cat, .cat-bar, .qg-ph, .qg-c, .qg-wide, .qg-trio figure, .scores, .feat, .rv-rows, .cta-in, .cta-card, .plaques, .info, .map-box, .sig-col, .sig-c, .foot-cols, .foot-wm';
  function observeNew() {
    if (RM.matches || !('IntersectionObserver' in window)) return;
    if (!io) io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$(marks).forEach((el) => {
      if (el.dataset.rv) return;
      // la columna fija de la bandera en móvil no se anima (es sticky)
      if (el.matches('.sig-c') && matchMedia('(max-width: 720px)').matches) return;
      el.dataset.rv = '1';
      const sib = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(marks)) : [];
      const i = Math.max(0, sib.indexOf(el));
      el.style.setProperty('--d', Math.min(i, 3) * 0.08 + 's');
      el.classList.add('rv');
      io.observe(el);
    });
  }

  // ---------- paralaje suave en las fotos del local ----------
  const par = $$('[data-par]');
  let parT = 0;
  function parallax() {
    parT = 0;
    const vh = innerHeight;
    par.forEach((im) => {
      const r = im.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const k = ((r.top + r.height / 2) - vh / 2) / vh;
      im.style.translate = `0 ${(-k * +im.dataset.par).toFixed(1)}px`;
    });
  }
  if (!RM.matches && par.length) {
    addEventListener('scroll', () => { if (!parT) parT = requestAnimationFrame(parallax); }, { passive: true });
    parallax();
  }

  // ---------- región para avisos de accesibilidad ----------
  const live = document.createElement('p');
  live.setAttribute('data-live', '');
  live.setAttribute('aria-live', 'polite');
  live.className = 'sr';
  live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
  document.body.appendChild(live);

  // ---------- todo lo que cambia con el idioma ----------
  function renderAll() {
    renderSigLists(); renderSigCard(false); renderXL(); renderMenu(); renderReviews(); renderTicker(); renderFootFlags(); renderCart(); renderStatus(); renderWa();
    fitAll();
  }
  document.addEventListener('langchange', renderAll);
  renderAll();
  addEventListener('resize', () => centerMast(cur.r));
  requestAnimationFrame(() => centerMast(cur.r));
})();
