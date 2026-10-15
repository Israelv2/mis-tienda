const TARGET = 'native';
const LIBS = TARGET === 'native' ? { pdf: 'libs/pdf.min.js', pdfw: 'libs/pdf.worker.min.js' } : { pdf: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', pdfw: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js' };
/* ================= utilidades ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => 'S/ ' + (Number(n) || 0).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const r2 = n => Math.round((Number(n) || 0) * 100) / 100;
const pad = (n, l) => String(n).padStart(l, '0');
const todayISO = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1, 2) + '-' + pad(d.getDate(), 2); };
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MES3 = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const fechaLarga = iso => { const [y, m, d] = iso.split('-').map(Number); const dt = new Date(y, m - 1, d); return `${DIAS[dt.getDay()]} ${d} de ${MESES[m - 1]} de ${y}`; };
const fechaCorta = iso => { if (!iso) return ''; const [y, m, d] = iso.split('-'); return `${d}/${m}/${y}`; };
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const BRANDS = { natura: 'Natura', avon: 'Avon' };
const lsGet = k => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { } };
const ssGet = k => { try { return sessionStorage.getItem(k); } catch { return null; } };
const ssSet = (k, v) => { try { v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch { } };
async function sha(s) {
  try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
  catch { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return 'f' + (h >>> 0).toString(16); }
}
function toast(msg, ms = 2600) { document.querySelectorAll('.toast').forEach(x => x.remove()); const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), ms); }

/* ================= iconos ================= */
const I = (() => {
  const p = {
    home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h4',
    users: 'M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 20v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    box: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8',
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    plus: 'M12 5v14M5 12h14', minus: 'M5 12h14', x: 'M6 6l12 12M18 6L6 18', check: 'M5 12l5 5L20 7',
    trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6',
    edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
    download: 'M12 3v12M7 10l5 5 5-5M5 21h14',
    upload: 'M12 21V9M7 14l5-5 5 5M5 3h14',
    folder: 'M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
    file: 'M14 3H6v18h12V7zM14 3v4h4',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3',
    back: 'M15 18l-6-6 6-6', next: 'M9 18l6-6-6-6',
    cal: 'M4 5h16v16H4zM4 9h16M8 3v4M16 3v4',
    lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
    book: 'M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-5a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h6z',
    refresh: 'M20 11a8 8 0 0 0-14.9-4M4 4v4h4M4 13a8 8 0 0 0 14.9 4M20 20v-4h-4',
    sheet: 'M4 3h16v18H4zM4 9h16M4 15h16M10 3v18',
    logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  };
  return n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${p[n]}"/></svg>`;
})();

/* ================= logos (vectores tomados de las revistas) ================= */
const LOGO = {
  avon: `<svg viewBox="25.9 25.8 443.3 133.4" role="img" aria-label="Avon"><g fill="currentColor"><path fill-rule="nonzero" d="M383.85 153.84L365.29 153.84L365.29 31.12L390.75 31.12L448.53 126.80L448.53 31.12L467.13 31.12L467.13 153.84L443.56 153.84L384.00 55.82L383.85 153.84"/><path fill-rule="nonzero" d="M290.71 157.20C254.94 157.20 227.25 130.05 227.25 92.48C227.25 54.90 254.94 27.76 290.71 27.76C326.67 27.76 354.35 54.90 354.35 92.48C354.35 130.05 326.67 157.20 290.71 157.20M290.71 139.76C316.25 139.76 334.22 119.08 334.22 92.48C334.22 65.87 316.25 45.19 290.71 45.19C265.36 45.19 247.39 65.87 247.39 92.48C247.39 119.08 265.36 139.76 290.71 139.76"/><path fill-rule="nonzero" d="M73.89 31.12L27.87 153.83L47.63 153.83L86.63 49.83L125.64 153.83L145.40 153.83L99.38 31.12L73.89 31.12"/><path fill-rule="nonzero" d="M162.94 153.84L116.92 31.12L136.68 31.12L175.68 135.12L214.69 31.12L234.45 31.12L188.43 153.84L162.94 153.84"/></g></svg>`,
  natura: `<svg viewBox="66 42 436 140" role="img" aria-label="Natura"><g fill="currentColor"><path fill-rule="nonzero" d="M464.70 119.19L464.70 92.21C464.70 71.48 453.07 58.41 430.98 58.41C413.25 58.41 396.98 70.06 396.98 90.51C396.98 109.82 410.35 121.18 428.95 121.18C438.83 121.18 446.39 117.21 450.46 109.82L450.46 119.19L464.70 119.19M449.88 90.51C449.88 105.28 442.03 114.65 430.98 114.65C417.90 114.65 411.80 106.13 411.80 90.51C411.80 76.31 417.90 64.94 430.98 64.94C444.06 64.94 449.88 76.31 449.88 90.51M388.84 65.23C390.29 65.23 392.03 65.23 393.78 65.51L393.78 59.55C390.58 58.70 387.38 58.41 384.19 58.41C369.94 58.41 359.48 66.36 359.48 85.68L359.48 119.19L374.30 119.19L374.30 83.97C374.30 72.61 376.92 65.23 388.84 65.23M343.49 87.67L343.49 60.40L328.67 60.40L328.67 89.09C328.67 104.99 323.44 114.65 310.65 114.65C298.44 114.65 293.21 104.99 293.21 89.09L293.21 60.40L278.39 60.40L278.39 87.67C278.39 108.40 288.85 121.18 310.65 121.18C331.87 121.18 343.49 108.40 343.49 87.67M257.17 121.18C263.27 121.18 268.79 119.48 272.86 116.64C271.41 115.22 270.25 113.51 269.67 111.81C266.76 113.51 263.56 114.37 259.49 114.37C252.23 114.37 247.87 109.82 247.87 95.90L247.87 67.22L267.34 67.22L267.34 60.40L247.87 60.40L247.87 45.63L233.04 45.63L233.04 93.63C233.04 114.65 244.67 121.18 257.17 121.18M202.81 119.19L217.06 119.19L217.06 92.21C217.06 71.48 205.43 58.41 183.34 58.41C165.61 58.41 149.33 70.06 149.33 90.51C149.33 109.82 162.70 121.18 181.30 121.18C191.19 121.18 198.74 117.21 202.81 109.82L202.81 119.19M202.23 90.51C202.23 105.28 194.38 114.65 183.34 114.65C170.26 114.65 164.15 106.13 164.15 90.51C164.15 76.31 170.26 64.94 183.34 64.94C196.42 64.94 202.23 76.31 202.23 90.51M122.01 119.19L136.83 119.19L136.83 91.93C136.83 71.19 125.79 58.41 103.70 58.41C81.90 58.41 69.69 71.19 69.69 91.93L69.69 119.19L84.51 119.19L84.51 90.51C84.51 74.60 90.33 64.94 103.70 64.94C116.20 64.94 122.01 74.60 122.01 90.51L122.01 119.19"/><path fill-rule="nonzero" d="M488.57 150.04C488.57 152.52 487.31 155.52 486.42 157.11C485.92 157.99 485.80 158.19 485.80 158.33C485.80 158.42 485.86 158.50 485.98 158.50C486.57 158.50 491.52 154.69 495.00 154.69C497.03 154.69 498.90 155.77 498.90 158.33C498.90 160.95 497.16 165.13 491.38 168.23C490.96 168.45 490.10 168.91 489.49 169.23C488.71 169.64 488.50 169.85 488.50 170.10C488.50 170.76 490.80 170.45 490.80 171.79C490.80 172.51 489.93 173.70 487.63 174.98C485.53 176.16 482.73 177.12 479.26 177.12C476.78 177.12 475.39 176.63 475.12 176.63C475.02 176.63 474.94 176.66 474.83 176.76C474.69 176.88 472.92 178.40 468.79 178.40C464.04 178.40 458.73 176.46 458.73 174.65C458.73 173.76 459.84 173.52 459.84 173.33C459.84 173.25 459.71 173.22 459.66 173.21C453.04 171.42 445.56 167.89 445.56 163.14C445.56 161.82 446.49 161.14 447.83 161.14C450.16 161.14 453.38 162.22 454.08 162.22C454.25 162.22 454.31 162.12 454.31 162.03C454.31 161.90 454.21 161.76 454.01 161.59C449.77 157.98 448.00 154.66 448.00 151.89C448.00 148.30 450.59 145.58 454.03 144.91C460.38 143.66 464.20 149.07 467.58 153.42C467.68 153.54 467.85 153.80 468.06 153.80C468.32 153.80 468.39 153.55 468.62 152.59C468.86 151.64 468.93 151.34 469.23 150.12C470.22 146.09 472.60 140.98 479.49 140.98C483.55 140.98 488.57 143.73 488.57 150.04M468.93 159.09C467.65 159.09 466.98 158.37 465.67 156.74C465.46 156.48 464.55 155.38 464.32 155.10C461.16 151.28 458.86 149.55 456.24 149.55C454.65 149.55 452.28 150.44 452.28 153.46C452.28 153.86 452.33 155.55 453.97 157.56C456.06 160.11 459.09 163.49 459.36 163.80C459.65 164.13 459.80 164.47 459.79 164.77C459.79 164.94 459.74 165.68 458.48 165.68C457.24 165.68 451.85 164.11 449.97 164.11C449.09 164.11 448.53 164.49 448.53 165.13C448.53 166.78 451.76 170.19 461.93 172.48C463.20 172.77 463.32 173.23 463.32 173.39C463.32 173.98 461.73 174.26 461.73 175.26C461.73 176.74 466.51 177.40 467.88 177.40C470.32 177.40 471.52 176.68 472.43 176.06C473.21 175.52 473.65 175.32 474.17 175.32C475.26 175.32 476.28 176.00 479.59 176.00C483.62 176.00 487.85 173.89 487.85 172.75C487.85 172.30 487.19 172.19 485.68 171.69C484.89 171.43 484.44 171.11 484.44 170.62C484.44 170.15 484.82 169.78 485.96 169.28C487.18 168.76 488.05 168.37 488.95 167.93C493.85 165.57 495.75 162.69 495.76 160.61C495.77 159.27 495.00 158.37 493.75 158.37C492.10 158.37 490.30 159.32 488.54 160.21C485.24 161.88 484.04 162.52 482.88 162.52C482.06 162.52 481.68 161.82 481.68 161.41C481.67 161.17 481.71 160.89 481.82 160.60C482.25 159.45 482.55 158.68 483.02 157.44C483.70 155.62 484.53 153.55 484.53 151.50C484.53 148.29 482.04 146.10 478.77 146.10C475.11 146.10 473.55 149.55 472.62 152.30C472.36 153.04 471.40 155.97 471.11 156.84C470.59 158.38 469.91 159.09 468.93 159.09"/></g></svg>`,
};
function paintLogos(root = document) { $$('[data-logo]', root).forEach(el => { el.innerHTML = LOGO[el.dataset.logo]; }); }

/* ================= carrusel de fondo ================= */
const SLIDES = { natura: ["img/natura_1.jpg","img/natura_24.jpg","img/natura_26.jpg","img/natura_32.jpg","img/natura_33.jpg","img/natura_34.jpg","img/natura_36.jpg","img/natura_40.jpg","img/natura_44.jpg","img/natura_45.jpg","img/natura_71.jpg"], avon: ["img/avon_1.jpg","img/avon_6.jpg","img/avon_13.jpg","img/avon_15.jpg","img/avon_35.jpg","img/avon_43.jpg","img/avon_47.jpg","img/avon_51.jpg","img/avon_57.jpg","img/avon_71.jpg"] };
const Carousel = {
  timer: null, set: null, i: 0,
  show(brand) {
    const list = brand ? SLIDES[brand] : SLIDES.natura.flatMap((x, i) => [x, SLIDES.avon[i]]).filter(Boolean);
    const key = brand || 'both';
    document.body.classList.remove('plain');
    if (this.set === key) return;
    this.set = key; this.i = 0;
    const c = $('#carousel'); c.innerHTML = '';
    list.forEach((src, k) => { const d = document.createElement('div'); d.className = 'slide' + (k === 0 ? ' on' : ''); d.style.backgroundImage = `url("${src}")`; c.appendChild(d); });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const s = $$('#carousel .slide'); if (!s.length) return;
      s[this.i].classList.remove('on'); this.i = (this.i + 1) % s.length; s[this.i].classList.add('on');
    }, 6000);
  },
  hide() { document.body.classList.add('plain'); },
};

/* ================= almacén sincronizado ================= */
const COLS = ['config', 'clients', 'orders', 'catalog', 'history'];
const Store = {
  mode: 'local', db: null, data: { config: {}, clients: {}, orders: {}, catalog: {}, history: {} }, ready: false, listeners: [], loaded: new Set(), readonly: false,
  on(fn) { this.listeners.push(fn); },
  emit(col) { this.listeners.forEach(f => f(col)); },
  user: null, unsubs: [],
  fbReady() { return TARGET === 'native' && window.firebase && window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey && !/PEGA/.test(window.FIREBASE_CONFIG.apiKey); },
  async init() {
    if (this.fbReady()) return this.initFirebase();
    let db = null;
    try { db = window.claude && claude.use ? await claude.use('db') : null; } catch { db = null; }
    if (db) {
      this.db = db; this.mode = 'cloud';
      for (const col of COLS) {
        let q = db.collection(col);
        if (col === 'orders') q = q.orderBy('createdAt', 'desc').limit(1000);
        q.onSnapshot(snap => {
          const m = {}; snap.docs.forEach(d => { m[d.id] = d.data(); });
          this.data[col] = m; this.loaded.add(col);
          if (!this.ready && this.loaded.size === COLS.length) { this.ready = true; this.emit('*ready'); }
          else if (this.ready) this.emit(col);
          setSync(snap.metadata && snap.metadata.fromCache ? 'wait' : 'ok');
        }, e => { console.warn('db', col, e); setSync('off'); if (!this.ready) { this.loaded.add(col); if (this.loaded.size === COLS.length) { this.ready = true; this.emit('*ready'); } } });
      }
      setTimeout(() => { if (!this.ready) { this.ready = true; this.emit('*ready'); } }, 12000);
    } else {
      this.mode = 'local';
      try { const raw = lsGet('mt-local'); if (raw) Object.assign(this.data, JSON.parse(raw)); } catch { }
      this.ready = true; setSync('off'); this.emit('*ready');
    }
  },
  initFirebase() {
    this.mode = 'firebase';
    firebase.initializeApp(window.FIREBASE_CONFIG);
    this.auth = firebase.auth();
    this.fs = firebase.firestore();
    try { this.fs.enablePersistence({ synchronizeTabs: true }).catch(() => { }); } catch { }
    window.addEventListener('online', () => setSync('ok')); window.addEventListener('offline', () => setSync('off'));
    this.auth.onAuthStateChanged(u => {
      this.unsubs.forEach(f => f()); this.unsubs = [];
      this.user = u; this.loaded = new Set(); this.ready = false;
      this.data = { config: {}, clients: {}, orders: {}, catalog: {}, history: {} };
      if (!u) { this.ready = true; this.emit('*ready'); return; }
      const base = this.fs.collection('tiendas').doc(u.uid);
      this.base = base;
      for (const col of COLS) {
        let q = base.collection(col);
        if (col === 'orders') q = q.orderBy('createdAt', 'desc').limit(1000);
        this.unsubs.push(q.onSnapshot({ includeMetadataChanges: true }, snap => {
          const m = {}; snap.docs.forEach(d => { m[d.id] = d.data(); });
          this.data[col] = m; this.loaded.add(col);
          if (!this.ready && this.loaded.size === COLS.length) { this.ready = true; this.emit('*ready'); }
          else if (this.ready) this.emit(col);
          setSync(!navigator.onLine ? 'off' : snap.metadata.hasPendingWrites || snap.metadata.fromCache ? 'wait' : 'ok');
        }, e => { console.warn('fs', col, e); setSync('off'); this.loaded.add(col); if (!this.ready && this.loaded.size === COLS.length) { this.ready = true; this.emit('*ready'); } }));
      }
    });
  },
  persistLocal() { if (this.mode === 'local') lsSet('mt-local', JSON.stringify(this.data)); },
  async set(col, id, obj) {
    obj = JSON.parse(JSON.stringify(obj));
    if (this.mode === 'firebase') {
      // sin await: Firestore guarda primero en el dispositivo (funciona sin internet) y sincroniza después
      this.base.collection(col).doc(id).set(obj).catch(e => this.fail(e));
      if (col === 'config') this.data.config[id] = obj;
      return true;
    }
    if (this.mode === 'cloud') {
      try { await this.db.collection(col).doc(id).set(obj); }
      catch (e) { return this.fail(e); }
    } else { this.data[col][id] = obj; this.persistLocal(); this.emit(col); }
    return true;
  },
  async del(col, id) {
    if (this.mode === 'firebase') { this.base.collection(col).doc(id).delete().catch(e => this.fail(e)); return true; }
    if (this.mode === 'cloud') { try { await this.db.collection(col).doc(id).delete(); } catch (e) { return this.fail(e); } }
    else { delete this.data[col][id]; this.persistLocal(); this.emit(col); }
    return true;
  },
  fail(e) {
    console.error(e);
    const c = e && e.code;
    if (c === 'permission-denied') { toast('Sin permiso para guardar. Cierra sesión y vuelve a entrar.', 5000); return false; }
    if (c === 'quota_exceeded') toast('El almacenamiento está lleno. Borra importaciones antiguas del histórico en Configuración.', 5000);
    else if (c === 'invalid_argument') { toast('No tienes permiso para guardar cambios. Pide acceso de edición al dueño de la app.', 5000); }
    else if (c === 'resource_exhausted') toast('Demasiados cambios seguidos. Espera unos segundos y vuelve a intentarlo.', 4000);
    else toast('No se pudo guardar. Revisa tu conexión e inténtalo otra vez.', 4000);
    return false;
  },
  get cfg() { return this.data.config.main || {}; },
};
function setSync(s) {
  const el = $('#sync'); if (!el) return;
  el.classList.toggle('off', s !== 'ok');
  el.querySelector('span').textContent = Store.mode === 'local' ? 'Solo este equipo' : Store.mode === 'firebase' && s === 'off' ? 'Sin internet · se guarda y sincroniza luego' : s === 'ok' ? 'Sincronizado' : s === 'wait' ? 'Sincronizando…' : 'Sin conexión';
}

/* ================= datos derivados ================= */
const D = {
  catalog(brand) {
    const out = [];
    Object.entries(Store.data.catalog).filter(([, d]) => d.brand === brand).sort(([a], [b]) => a.localeCompare(b)).forEach(([id, d]) => (d.items || []).forEach((it, idx) => out.push({ ...it, _doc: id, _idx: idx, brand })));
    return out;
  },
  cycleOf(brand) { const d = Object.values(Store.data.catalog).find(x => x.brand === brand && x.cycle); return d ? d.cycle : null; },
  clients() { return Object.entries(Store.data.clients).map(([id, c]) => ({ id, ...c })).sort((a, b) => norm(a.name).localeCompare(norm(b.name))); },
  orders() { return Object.entries(Store.data.orders).map(([id, o]) => ({ id, ...o })).sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.num || '').localeCompare(a.num || '')); },
  nextClientCode() {
    let mx = 0; for (const c of Object.values(Store.data.clients)) { const m = String(c.code || '').match(/(\d+)/); if (m) mx = Math.max(mx, +m[1]); }
    return 'C' + pad(mx + 1, 4);
  },
  nextBoleta() {
    const serie = Store.cfg.serie || 'B001';
    let mx = Number(Store.cfg.seq) || 0;
    for (const o of Object.values(Store.data.orders)) { const m = String(o.num || '').match(/-(\d+)$/); if (m) mx = Math.max(mx, +m[1]); }
    return serie + '-' + pad(mx + 1, 6);
  },
  margin(brand) { const m = (Store.cfg.margins || {})[brand]; return (m == null ? 30 : Number(m)) / 100; },
  igv() { const v = Store.cfg.igv; return (v == null ? 18 : Number(v)) / 100; },
  /* filas unificadas de ventas (pedidos de la app + histórico importado) */
  salesRows() {
    const rows = [];
    for (const o of Object.values(Store.data.orders)) {
      if (o.status === 'anulado') continue;
      const mg = D.margin(o.brand);
      for (const it of o.items || []) {
        const t = r2(it.p * it.qty);
        rows.push({ d: o.date, b: o.brand, cl: o.client?.name || '', cid: o.client?.id || '', c: it.c, n: it.n + (it.v ? ' · ' + it.v : ''), q: it.qty, t, g: r2(t * mg), gs: 0, pt: (it.pt || 0) * it.qty, src: 'app', oid: o.num });
      }
    }
    for (const h of Object.values(Store.data.history)) {
      for (const r of h.rows || []) {
        const [d, b, cl, c, n, q, p, t, co, ga, gs, pt] = r;
        const tot = t || r2((q || 0) * (p || 0));
        const br = b === 'avon' || b === 'natura' ? b : '';
        const gan = ga != null && ga !== '' ? ga : co != null && co !== '' ? r2(tot - co) : r2(tot * D.margin(br || 'natura'));
        rows.push({ d, b: br, cl: cl || '', c: c || '', n: n || '', q: q || 0, t: tot, g: gan, gs: gs || 0, pt: pt || 0, src: 'hist' });
      }
    }
    return rows.filter(r => r.d);
  },
};

// Catalog parser: turns positioned text items of a magazine page into products.
// items: [{s, x, y, w, h}] with y measured from the TOP of the page (pdf units).
function parseCatalogPage(items, page) {
  const norm = t => t.replace(/\s+/g, ' ').trim();
  // 1) merge items into line segments
  items = items.filter(i => i.s && i.s.trim() !== '' && i.h > 0).sort((a, b) => (a.y - b.y) || (a.x - b.x));
  const segs = [];
  for (const it of items) {
    let best = null;
    for (let k = segs.length - 1; k >= 0 && k >= segs.length - 40; k--) {
      const s = segs[k];
      if (Math.abs(s.y - it.y) < Math.max(s.h, it.h) * 0.45 && it.x >= s.x - 1 && it.x - (s.x + s.w) < Math.max(s.h, it.h) * 1.2 && it.x - (s.x + s.w) > -s.h * 0.5) { best = s; break; }
    }
    if (best) {
      const gap = it.x - (best.x + best.w);
      best.s += (gap > best.h * 0.15 && !best.s.endsWith(' ') && !it.s.startsWith(' ') ? ' ' : '') + it.s;
      best.w = Math.max(best.w, it.x + it.w - best.x);
      best.h = Math.max(best.h, it.h);
    } else segs.push({ s: it.s, x: it.x, y: it.y, w: it.w, h: it.h });
  }
  segs.forEach(s => { s.s = norm(s.s); s.cx = s.x + s.w / 2; s.cy = s.y - s.h / 2; });
  const live = segs.filter(s => s.s);
  // 2) cluster segments into blocks (union-find)
  const par = live.map((_, i) => i);
  const find = i => par[i] === i ? i : (par[i] = find(par[i]));
  for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
    const a = live[i], b = live[j];
    const top = a.y <= b.y ? a : b, bot = a.y <= b.y ? b : a;
    const vgap = (bot.y - bot.h) - top.y;
    const lh = Math.max(Math.min(a.h, b.h), 4);
    const ovl = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const leftAligned = Math.abs(a.x - b.x) < lh * 0.8;
    if (vgap < lh * 0.75 && vgap > -lh * 0.6 && (ovl > -lh * 0.3 || leftAligned) && Math.max(a.h, b.h) / Math.min(a.h, b.h) < 2.2) par[find(i)] = find(j);
  }
  const groups = {};
  live.forEach((s, i) => (groups[find(i)] = groups[find(i)] || []).push(s));
  const blocks = Object.values(groups).map(lines => {
    lines.sort((a, b) => (a.y - b.y) || (a.x - b.x));
    const x0 = Math.min(...lines.map(l => l.x)), x1 = Math.max(...lines.map(l => l.x + l.w));
    const y0 = Math.min(...lines.map(l => l.y - l.h)), y1 = Math.max(...lines.map(l => l.y));
    return { lines, x0, x1, y0, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, text: lines.map(l => l.s).join('\n') };
  });
  const CODE = /\((\d{5,6})\)/g;
  const REG = /\b(NSO[A-Z]?\s?\d|NSOC|NSOH|NSOE|NSOG|R\.?S\.?|DIGESA|Reg\.? San)/i;
  const PRICE = /S\/\s?\d/;
  const NOISE = /^(producto vegano\.?|vegano\.?|lanzamiento|edici[oó]n limitada|nuevo|novedad|intensidad|amaderado|floral|frutal|c[ií]trico|chipre|oriental|arom[aá]tico|fresco|suave|moderada|intensa|refill|repuesto|\d+\s?pts\.?|precio regular.*|te ahorras.*|.*descuento.*|mejor precio.*|del a[ñn]o|\*.*)$/i;
  const isNameBlock = b => REG.test(b.text) || /\b\d+\s?(ml|g|gr|un|unid|und)\b\.?/i.test(b.text);
  const nameOf = b => {
    const out = [];
    for (const l of b.lines) {
      let t = l.s;
      if (REG.test(t)) break;
      t = t.replace(CODE, '').replace(/\b\d+\s?pts\.?/i, '').trim();
      if (!t || NOISE.test(t) || PRICE.test(t)) continue;
      if (/^\(?\d+\)?$/.test(t)) continue;
      out.push(t);
    }
    return norm(out.join(' ')).replace(/\s([,.])/g, '$1');
  };
  const num = s => parseFloat(String(s).replace(/\s/g, '').replace(',', '.'));
  const priceOf = b => {
    const t = b.text.replace(/\n/g, ' ');
    let offer = null, regular = null;
    let m = t.match(/(?:\ba|\bA|solo|SOLO|cualquiera a|CUALQUIERA A)\s*S\/\s?(\d+(?:[.,]\d{1,2})?)/);
    if (m) offer = num(m[1]);
    m = t.match(/(?:\bde|regular|Regular)\s*S\/\s?(\d+(?:[.,]\d{1,2})?)/);
    if (m) regular = num(m[1]);
    if (offer == null) {
      const all = [...t.replace(/te ahorras\s*S\/\s?\d+(?:[.,]\d+)?/ig, '').matchAll(/S\/\s?(\d+(?:[.,]\d{1,2})?)/g)].map(x => num(x[1]));
      if (all.length) offer = Math.min(...all), regular = regular ?? (all.length > 1 ? Math.max(...all) : null);
    }
    return { offer, regular };
  };
  const ptsOf = t => { const m = t.match(/\b(\d{1,3})\s?pts/i); return m ? +m[1] : null; };
  const nameBlocks = blocks.filter(isNameBlock).map(b => ({ b, name: nameOf(b) })).filter(n => n.name.length > 3);
  const priceBlocks = blocks.filter(b => /S\/\s?\d/.test(b.text));
  const dist = (a, b) => {
    const dx = Math.max(0, Math.max(a.x0, b.x0) - Math.min(a.x1, b.x1));
    const dy = Math.max(0, Math.max(a.y0, b.y0) - Math.min(a.y1, b.y1));
    return Math.hypot(dx, dy * 1.2);
  };
  const products = [];
  for (const b of blocks) {
    for (const l of b.lines) {
      for (const m of l.s.matchAll(CODE)) {
        const code = m[1];
        let inName = nameBlocks.find(n => n.b === b);
        const codeLines = b.lines.filter(x => new RegExp(CODE.source).test(x.s));
        if (!inName && codeLines.length === 1) {
          const own = nameOf(b).replace(/precio regular.*$/i, '').trim();
          if (own.split(' ').length >= 3 && b.lines.length >= 3) inName = { b, name: own.slice(0, 90) };
        }
        let nb = inName, variant = '';
        if (!nb && codeLines.length > 1) {
          const before = l.s.replace(CODE, ' ').replace(/\b\d+\s?pts\.?/i, '').trim();
          const idx = b.lines.indexOf(l);
          const prev = b.lines[idx - 1];
          if (before && before.length < 32 && !PRICE.test(before)) variant = before;
          else if (prev && !new RegExp(CODE.source).test(prev.s) && prev.s.length < 32 && !PRICE.test(prev.s) && !REG.test(prev.s)) variant = prev.s;
          let bd = Infinity;
          for (const n of nameBlocks) { const d = dist(n.b, b); if (d < bd) { bd = d; nb = n; } }
        } else if (!nb) {
          // variant label = other text in the code's own block (excluding codes), else closest short segment on the same line
          variant = norm(b.lines.filter(x => !REG.test(x.s)).map(x => x.s.replace(CODE, '').replace(/\b\d+\s?pts\.?/i, '')).join(' '));
          if (!variant) {
            const lh = Math.max(l.h, 5);
            const cand = live.filter(s2 => s2 !== l && s2.y < l.y && l.y - s2.y < lh * 2.2 && Math.abs(s2.cx - l.cx) < Math.max(s2.w, l.w) * 0.8 && s2.s.length < 32 && !new RegExp(CODE.source).test(s2.s) && !PRICE.test(s2.s) && !REG.test(s2.s)).sort((p, q) => q.y - p.y)[0];
            if (cand) variant = cand.s;
          }
          if (variant.length > 40 || PRICE.test(variant)) variant = '';
          let bd = Infinity;
          for (const n of nameBlocks) { const d = dist(n.b, b); if (d < bd) { bd = d; nb = n; } }
        } else {
          const before = l.s.slice(0, m.index).replace(CODE, '').trim();
          if (before && before.length < 30 && !PRICE.test(before) && b.lines.filter(x => new RegExp(CODE.source).test(x.s)).length > 1) variant = before;
        }
        const anchor = nb ? nb.b : b;
        let pb = null, pd = Infinity;
        for (const p of priceBlocks) { const d = dist(p, anchor); if (d < pd) { pd = d; pb = p; } }
        const pr = pb ? priceOf(pb) : { offer: null, regular: null };
        const pts = ptsOf(l.s) ?? (nb ? ptsOf(nb.b.text) : null) ?? (pb ? ptsOf(pb.text) : null);
        if (pr.regular != null && pr.offer != null && pr.regular <= pr.offer) pr.regular = null;
        const nm = (nb ? nb.name : '').replace(/^[A-H]\.\s?/, '').replace(/\s[A-H]\.(?=[A-ZÁÉÍÓÚ])/g, ' ');
        products.push({ code, name: nm, variant: variant.replace(/^[-–•·]\s*/, ''), price: pr.offer, regular: pr.regular, pts, page });
      }
    }
  }
  return products;
}
function mergeCatalog(list) {
  const map = new Map();
  for (const p of list) {
    p.name = (p.name || '').replace(/\s%\s?de\b/g, '').replace(/(\s+[A-ZÁÉÍÓÚÑ]{6,})+\s*$/, '').trim();
    const prev = map.get(p.code);
    const score = x => (x.name ? 2 : 0) + (x.price ? 2 : 0) + (x.pts ? 1 : 0) + (x.variant ? 0.5 : 0);
    if (!prev || score(p) > score(prev)) map.set(p.code, p);
  }
  return [...map.values()];
}


/* ================= tema ================= */
function applyTheme() {
  const t = lsGet('mt-theme') || 'system';
  if (t === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
}
applyTheme();

/* ================= navegación ================= */
const TABS = [
  { id: 'home', label: 'Pedido', icon: 'home' },
  { id: 'orders', label: 'Boletas', icon: 'receipt' },
  { id: 'clients', label: 'Clientes', icon: 'users' },
  { id: 'products', label: 'Productos', icon: 'box' },
  { id: 'reports', label: 'Histórico', icon: 'chart' },
  { id: 'settings', label: 'Configuración', icon: 'gear', railOnly: true },
];
const App = { view: 'boot', params: {}, dirty: false };
const VIEWS = {};
const LIVE = new Set(['home', 'orders', 'clients', 'client', 'products', 'reports', 'settings']);

function buildNav() {
  $('#tabs').innerHTML = TABS.filter(t => !t.railOnly).map(t => `<button class="tab" type="button" data-go="${t.id}">${I(t.icon)}<span>${t.label}</span></button>`).join('');
  $('#railtabs').innerHTML = TABS.map(t => `<button class="tab" type="button" data-go="${t.id}">${I(t.icon)}<span>${t.label}</span></button>`).join('')
    + `<button class="tab" type="button" id="lockBtn">${I('lock')}<span>Bloquear</span></button>`;
  $$('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  $('#lockBtn').onclick = lockApp;
  $('#meAvatar').onclick = () => go('settings');
}
function go(view, params = {}) {
  closeSheet();
  App.view = view; App.params = params;
  const tabId = view === 'client' ? 'clients' : view === 'order' ? 'home' : view;
  $$('[data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === tabId));
  document.body.dataset.brand = (view === 'order' && W.brand) ? W.brand : '';
  render();
  window.scrollTo(0, 0);
}
function render() {
  const v = VIEWS[App.view];
  if (!v) return;
  const t = TABS.find(t => t.id === App.view);
  $('#vtitle').textContent = v.title ? v.title() : (t ? t.label : '');
  const fullBleed = ['home', 'order', 'login', 'setup', 'pin', 'boot', 'fblogin'].includes(App.view);
  if (fullBleed) Carousel.show(App.view === 'order' && W.brand ? W.brand : null); else Carousel.hide();
  v.render($('#view'));
  paintLogos($('#view'));
  App.dirty = false;
}
Store.on(col => {
  if (col === '*ready') return boot();
  if (col === 'config') { paintMe(); }
  if (!LIVE.has(App.view)) { App.dirty = true; return; }
  const a = document.activeElement;
  if ($('.sheet-back') || (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName) && a.id !== 'fileAny')) { App.dirty = true; return; }
  render();
});
document.addEventListener('focusout', () => setTimeout(() => { if (App.dirty && LIVE.has(App.view) && !$('.sheet-back') && !(document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))) render(); }, 300));

function paintMe() {
  const c = Store.cfg.consultant || {};
  const el = $('#meAvatar');
  el.innerHTML = c.photo ? `<img src="${esc(c.photo)}" alt="">` : esc((c.name || 'C').trim().charAt(0).toUpperCase());
}

/* ================= hojas (modales) ================= */
function sheet(title, html, onMount) {
  closeSheet();
  const back = document.createElement('div');
  back.className = 'sheet-back';
  back.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="hd"><h3>${esc(title)}</h3><button class="iconbtn" type="button" data-close aria-label="Cerrar">${I('x')}</button></div>${html}</div>`;
  back.addEventListener('click', e => { if (e.target === back || e.target.closest('[data-close]')) closeSheet(); });
  document.body.appendChild(back);
  paintLogos(back);
  onMount && onMount(back.querySelector('.sheet'));
  const f = back.querySelector('input:not([type=hidden]):not([type=file]),select,textarea');
  if (f && window.matchMedia('(min-width:700px)').matches) setTimeout(() => f.focus(), 50);
  return back.querySelector('.sheet');
}
function closeSheet() { const b = $('.sheet-back'); if (b) { b.remove(); if (App.dirty) setTimeout(render, 0); } }
function confirmSheet(title, msg, okLabel, onOk, danger = true) {
  sheet(title, `<p class="muted" style="margin:0">${msg}</p><div class="row" style="justify-content:flex-end"><button class="btn" data-close type="button">Cancelar</button><button class="btn ${danger ? 'danger' : 'pri'}" id="cfOk" type="button">${okLabel}</button></div>`,
    s => { $('#cfOk', s).onclick = async () => { closeSheet(); await onOk(); }; });
}

/* ================= archivos ================= */
function pickFile(accept) {
  return new Promise(res => {
    const inp = $('#fileAny'); inp.value = ''; inp.accept = accept || '';
    inp.onchange = () => res(inp.files[0] || null);
    inp.click();
  });
}
const isNative = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
function blobToB64(blob) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = rej; r.readAsDataURL(blob); }); }
const safeName = s => String(s).replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim();
/* guarda en el celular: Documentos/MiTienda/<carpeta>/<archivo> */
async function nativeWrite(filename, blob, folder) {
  const FS = window.Capacitor.Plugins.Filesystem;
  const path = ['MiTienda', ...(folder || '').split('/').filter(Boolean).map(safeName), safeName(filename)].join('/');
  const data = await blobToB64(blob);
  try {
    try { await FS.requestPermissions(); } catch { }
    const r = await FS.writeFile({ path, data, directory: 'DOCUMENTS', recursive: true });
    return { uri: r.uri, shown: 'Documentos/' + path };
  } catch (e) {
    console.warn('DOCUMENTS', e);
    const r = await FS.writeFile({ path, data, directory: 'DATA', recursive: true });
    return { uri: r.uri, shown: null };
  }
}
async function saveFile(filename, blob, folder) {
  if (isNative()) {
    try {
      const r = await nativeWrite(filename, blob, folder);
      if (r.shown) toast('Guardado en ' + r.shown, 4500);
      else await window.Capacitor.Plugins.Share.share({ title: filename, url: r.uri, dialogTitle: 'Guardar o enviar' });
      return true;
    } catch (e) { console.error(e); toast('No se pudo guardar el archivo en el celular.'); return false; }
  }
  let dl = null;
  try { dl = window.claude && claude.use ? await claude.use('downloads') : null; } catch { }
  if (dl) {
    try { await dl.save({ filename, data: blob }); return true; }
    catch (e) {
      if (e && e.code === 'declined') return false;
      if (e && e.code === 'rate_limited') { toast('Ya hay una descarga esperando tu confirmación.'); return false; }
      toast('No se pudo descargar el archivo en este dispositivo.'); return false;
    }
  }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  return true;
}
/* compartir (WhatsApp, correo…) */
const canShare = () => isNative() || !!(navigator.canShare && navigator.canShare({ files: [new File(['x'], 'x.pdf', { type: 'application/pdf' })] }));
async function shareFile(filename, blob, folder, text) {
  try {
    if (isNative()) { const r = await nativeWrite(filename, blob, folder); await window.Capacitor.Plugins.Share.share({ title: filename, text: text || '', url: r.uri, dialogTitle: 'Enviar boleta' }); return true; }
    const f = new File([blob], filename, { type: blob.type || 'application/pdf' });
    await navigator.share({ files: [f], title: filename, text: text || '' }); return true;
  } catch (e) { if (e && e.name !== 'AbortError' && !/cancel/i.test(e.message || '')) toast('No se pudo compartir el archivo.'); return false; }
}
function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }

/* ================= acceso ================= */
async function authHash(code, pass) { return sha('mt|' + norm(code) + '|' + pass); }
const FB = () => Store.mode === 'firebase';
const sessKey = () => FB() ? (Store.user ? Store.user.uid : '') : (Store.cfg.auth ? Store.cfg.auth.hash : '');
const emailOf = code => 'c' + norm(code).replace(/[^a-z0-9]/g, '') + '@consultora-mitienda.app';
function isUnlocked() {
  if (FB()) return !!Store.user && (!Store.cfg.auth?.pinHash || ssGet('mt-session') === Store.user.uid);
  const a = Store.cfg.auth; return a && ssGet('mt-session') === a.hash;
}
function hasPin() { return !!Store.cfg.auth?.pinHash && (FB() || lsGet('mt-trust') === Store.cfg.auth.hash); }
function lockApp() {
  ssSet('mt-session', null); document.body.classList.add('locked');
  if (FB() && !Store.cfg.auth?.pinHash) { Store.auth.signOut(); return; }
  go(hasPin() ? 'pin' : FB() ? 'fblogin' : 'login');
}
function unlock() {
  ssSet('mt-session', sessKey());
  document.body.classList.remove('locked');
  paintMe();
  go('home');
}
function boot() {
  buildNav(); paintLogos(); paintMe(); setSync(Store.mode === 'local' ? 'off' : 'ok');
  if (FB()) {
    if (!Store.user) { document.body.classList.add('locked'); return go('fblogin'); }
    if (isUnlocked()) { document.body.classList.remove('locked'); return go(App.view && !['boot', 'fblogin', 'pin', 'login', 'setup'].includes(App.view) ? App.view : 'home', App.params); }
    document.body.classList.add('locked'); return go('pin');
  }
  const a = Store.cfg.auth;
  if (!a || !a.hash) { document.body.classList.add('locked'); return go('setup'); }
  if (isUnlocked()) { document.body.classList.remove('locked'); return go('home'); }
  document.body.classList.add('locked');
  go(hasPin() ? 'pin' : 'login');
}
const FB_ERR = c => ({ 'auth/invalid-credential': 'Código o clave incorrectos.', 'auth/wrong-password': 'Código o clave incorrectos.', 'auth/user-not-found': 'No existe una cuenta con ese código. Si es la primera vez, pulsa “Crear acceso”.', 'auth/invalid-login-credentials': 'Código o clave incorrectos.', 'auth/email-already-in-use': 'Ese código ya tiene acceso creado. Entra con tu clave.', 'auth/weak-password': 'La clave debe tener al menos 6 caracteres.', 'auth/network-request-failed': 'Sin conexión a internet. La primera vez hace falta internet para entrar.', 'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.', 'auth/operation-not-allowed': 'Falta activar “Correo/contraseña” en Firebase (ver LEEME).' }[c] || 'No se pudo entrar (' + c + ').');
async function seedCatalogIfEmpty() {
  try {
    const snap = await Store.base.collection('catalog').limit(1).get();
    if (!snap.empty) return;
    const r = await fetch('catalogo-c15.json'); const docs = await r.json();
    for (const [id, d] of Object.entries(docs)) await Store.base.collection('catalog').doc(id).set(d);
  } catch (e) { console.warn('seed', e); }
}
VIEWS.fblogin = {
  mode: 'login',
  render(el) {
    const create = this.mode === 'create';
    el.innerHTML = `<div class="center"><form class="glass auth" id="fFb" autocomplete="off">
      <div class="logos"><span class="nat" data-logo="natura"></span><span class="avn" data-logo="avon"></span></div>
      <div style="text-align:center"><div class="h2">${create ? 'Crear acceso' : 'Bienvenida'}</div><p class="muted small" style="margin:.3em 0 0">${create ? 'Solo la primera vez. Luego entrarás con este código y clave en el celular y en la computadora.' : 'Entra con tu código de consultora y tu clave.'}</p></div>
      ${create ? '<label class="f">Tu nombre<input class="in" id="fbName" required placeholder="Nombre y apellido"></label>' : ''}
      <label class="f">Código de consultora<input class="in mono" id="fbCode" required inputmode="numeric" value="${esc(lsGet('mt-lastcode') || '')}"></label>
      <label class="f">Clave (6 a 8 caracteres)<input class="in" id="fbPass" type="password" minlength="6" maxlength="8" required></label>
      ${create ? '<label class="f">Repite la clave<input class="in" id="fbPass2" type="password" minlength="6" maxlength="8" required></label>' : ''}
      <p class="small" id="fbErr" style="color:var(--bad);margin:0" hidden></p>
      <button class="btn pri block" type="submit" id="fbGo">${create ? 'Crear acceso y entrar' : 'Entrar'}</button>
      <button class="btn ghost sm" type="button" id="fbSwitch">${create ? 'Ya tengo acceso: entrar' : '¿Primera vez? Crear acceso'}</button>
    </form></div>`;
    $('#fbSwitch').onclick = () => { this.mode = create ? 'login' : 'create'; render(); };
    $('#fFb').onsubmit = async e => {
      e.preventDefault();
      const err = m => { $('#fbErr').textContent = m; $('#fbErr').hidden = false; $('#fbGo').disabled = false; };
      const code = $('#fbCode').value.trim(), pass = $('#fbPass').value;
      if (pass.length < 6 || pass.length > 8) return err('La clave debe tener entre 6 y 8 caracteres.');
      $('#fbGo').disabled = true; lsSet('mt-lastcode', code);
      try {
        if (create) {
          if (pass !== $('#fbPass2').value) return err('Las dos claves no coinciden.');
          const name = $('#fbName').value.trim();
          const cred = await Store.auth.createUserWithEmailAndPassword(emailOf(code), pass);
          Store.base = Store.fs.collection('tiendas').doc(cred.user.uid);
          await Store.base.collection('config').doc('main').set({ consultant: { name, code }, auth: {}, margins: { natura: 30, avon: 30 }, igv: 18, serie: 'B001', seq: 0, createdAt: Date.now() });
          ssSet('mt-session', cred.user.uid);
          this.mode = 'login';
          seedCatalogIfEmpty();
          toast('Acceso creado');
        } else {
          const cred = await Store.auth.signInWithEmailAndPassword(emailOf(code), pass);
          ssSet('mt-session', cred.user.uid);
        }
      } catch (ex) { console.warn(ex); err(FB_ERR(ex.code)); }
    };
  }
};
VIEWS.boot = { render(el) { el.innerHTML = `<div class="center"><div class="glass auth" style="text-align:center"><div class="logos"><span class="nat" data-logo="natura"></span><span class="avn" data-logo="avon"></span></div><p class="muted">Cargando tus datos…</p></div></div>`; } };

VIEWS.setup = {
  render(el) {
    el.innerHTML = `<div class="center"><form class="glass auth" id="fSetup" autocomplete="off">
      <div class="logos"><span class="nat" data-logo="natura"></span><span class="avn" data-logo="avon"></span></div>
      <div><div class="h2">Bienvenida</div><p class="muted small" style="margin:.3em 0 0">Primera vez en la app. Crea tu acceso: lo pedirá en el celular y en la computadora.</p></div>
      <label class="f">Tu nombre<input class="in" id="suName" required placeholder="Nombre y apellido"></label>
      <label class="f">Código de consultora<input class="in mono" id="suCode" required inputmode="numeric" placeholder="Ej. 12345678"></label>
      <label class="f">Clave de acceso (6 a 8 caracteres)<input class="in" id="suPass" type="password" minlength="6" maxlength="8" required></label>
      <label class="f">Repite la clave<input class="in" id="suPass2" type="password" minlength="6" maxlength="8" required></label>
      <p class="small" id="suErr" style="color:var(--bad);margin:0" hidden></p>
      <button class="btn pri block" type="submit">Crear acceso y entrar</button>
      ${Store.mode === 'local' ? '<p class="banner">Sin sincronización: los datos se guardan solo en este equipo.</p>' : ''}
    </form></div>`;
    $('#fSetup').onsubmit = async e => {
      e.preventDefault();
      const name = $('#suName').value.trim(), code = $('#suCode').value.trim(), p1 = $('#suPass').value, p2 = $('#suPass2').value;
      const err = m => { $('#suErr').textContent = m; $('#suErr').hidden = false; };
      if (p1.length < 6 || p1.length > 8) return err('La clave debe tener entre 6 y 8 caracteres.');
      if (p1 !== p2) return err('Las dos claves no coinciden.');
      const hash = await authHash(code, p1);
      const cfg = { ...Store.cfg, consultant: { ...(Store.cfg.consultant || {}), name, code }, auth: { hash }, margins: { natura: 30, avon: 30 }, igv: 18, serie: 'B001', seq: 0, createdAt: Date.now() };
      if (await Store.set('config', 'main', cfg)) { Store.data.config.main = cfg; lsSet('mt-trust', hash); unlock(); toast('Acceso creado'); }
    };
  }
};

VIEWS.login = {
  render(el) {
    const c = Store.cfg.consultant || {};
    el.innerHTML = `<div class="center"><form class="glass auth" id="fLogin" autocomplete="off">
      <div class="logos"><span class="nat" data-logo="natura"></span><span class="avn" data-logo="avon"></span></div>
      <div style="text-align:center"><div class="h2">Hola${c.name ? ', ' + esc(c.name.split(' ')[0]) : ''}</div><p class="muted small" style="margin:.3em 0 0">Entra con tu código de consultora y tu clave.</p></div>
      <label class="f">Código de consultora<input class="in mono" id="lgCode" required inputmode="numeric" value="${esc(lsGet('mt-lastcode') || '')}"></label>
      <label class="f">Clave<input class="in" id="lgPass" type="password" required maxlength="8"></label>
      <label class="row small" style="gap:8px"><input type="checkbox" id="lgTrust" ${lsGet('mt-trust') ? 'checked' : ''}> Recordar este dispositivo (permite entrar con PIN)</label>
      <p class="small" id="lgErr" style="color:var(--bad);margin:0" hidden>Código o clave incorrectos.</p>
      <button class="btn pri block" type="submit">Entrar</button>
    </form></div>`;
    $('#fLogin').onsubmit = async e => {
      e.preventDefault();
      const h = await authHash($('#lgCode').value.trim(), $('#lgPass').value);
      if (h !== Store.cfg.auth.hash) { $('#lgErr').hidden = false; $('#fLogin').classList.remove('shake'); void $('#fLogin').offsetWidth; $('#fLogin').classList.add('shake'); return; }
      lsSet('mt-lastcode', $('#lgCode').value.trim());
      lsSet('mt-trust', $('#lgTrust').checked ? h : null);
      unlock();
    };
  }
};

VIEWS.pin = {
  render(el) {
    let buf = '';
    const c = Store.cfg.consultant || {};
    el.innerHTML = `<div class="center"><div class="glass auth">
      <div class="logos"><span class="nat" data-logo="natura"></span><span class="avn" data-logo="avon"></span></div>
      <div style="text-align:center"><div class="h2">Hola${c.name ? ', ' + esc(c.name.split(' ')[0]) : ''}</div><p class="muted small" style="margin:.3em 0 0">Escribe tu PIN</p></div>
      <div class="pindots" id="pdots"></div>
      <div class="pinpad" id="ppad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button type="button" data-n="${n}">${n}</button>`).join('')}<button type="button" data-n="del" aria-label="Borrar">⌫</button><button type="button" data-n="0">0</button><button type="button" data-n="ok" aria-label="Entrar">${I('check')}</button></div>
      <button class="btn ghost sm" type="button" id="pinAlt">Entrar con código y clave</button>
    </div></div>`;
    const len = Store.cfg.auth.pinLen || 4;
    const dots = () => { $('#pdots').innerHTML = Array.from({ length: len }, (_, i) => `<i class="${i < buf.length ? 'f' : ''}"></i>`).join(''); };
    const tryPin = async () => {
      if (await sha('pin|' + buf + '|' + sessKey()) === Store.cfg.auth.pinHash) return unlock();
      buf = ''; dots(); const p = $('#pdots'); p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake');
    };
    dots();
    $('#ppad').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      const n = b.dataset.n;
      if (n === 'del') buf = buf.slice(0, -1); else if (n === 'ok') return tryPin(); else if (buf.length < len) buf += n;
      dots(); if (buf.length === len) tryPin();
    };
    $('#pinAlt').onclick = () => FB() ? Store.auth.signOut() : go('login');
  }
};

/* ================= A) inicio: elegir marca ================= */
let W = { brand: null, date: todayISO(), client: null, items: [], step: 'date', editId: null, pay: 'Efectivo', paid: false, note: '' };
function newOrder(brand, client = null) { W = { brand, date: todayISO(), client, items: [], step: 'date', editId: null, pay: 'Efectivo', paid: false, note: '' }; go('order'); }

VIEWS.home = {
  title: () => 'Nuevo pedido',
  render(el) {
    const c = Store.cfg.consultant || {};
    const h = new Date().getHours();
    const saludo = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
    const ym = todayISO().slice(0, 7);
    const ords = D.orders();
    const mes = ords.filter(o => (o.date || '').startsWith(ym) && o.status !== 'anulado');
    const pend = ords.filter(o => !o.paid && o.status !== 'anulado');
    el.innerHTML = `<div class="chooser">
      <div class="greet"><div class="eyebrow" style="color:rgba(255,255,255,.85)">${esc(fechaLarga(todayISO()))}</div><div class="h1">${saludo}${c.name ? ', ' + esc(c.name.split(' ')[0]) : ''}</div><p style="margin:.4em 0 0;opacity:.9">Elige la marca para preparar el pedido</p></div>
      <div class="brands" id="brands">
        <button class="brandbtn" type="button" data-b="natura"><span data-logo="natura" style="display:contents"></span><span class="lbl">Ciclo ${D.cycleOf('natura') || '–'}</span></button>
        <button class="brandbtn" type="button" data-b="avon"><span data-logo="avon" style="display:contents"></span><span class="lbl">Ciclo ${D.cycleOf('avon') || '–'}</span></button>
      </div>
      <div class="quick">
        <button class="chip" type="button" data-q="orders">Ventas de ${MESES[new Date().getMonth()]}: <b>${money(mes.reduce((s, o) => s + (o.total || 0), 0))}</b></button>
        <button class="chip" type="button" data-q="pend">Por cobrar: <b>${pend.length}</b></button>
      </div>
    </div>`;
    const btns = $$('.brandbtn', el);
    btns.forEach(b => {
      b.onclick = () => newOrder(b.dataset.b);
      b.onpointerenter = () => b.classList.add('lit'); b.onpointerleave = () => b.classList.remove('lit');
    });
    // deslizar el dedo: ilumina la marca bajo el dedo
    $('#brands').addEventListener('touchmove', e => {
      const t = e.touches[0]; const hit = document.elementFromPoint(t.clientX, t.clientY);
      btns.forEach(b => b.classList.toggle('lit', b.contains(hit)));
    }, { passive: true });
    $('#brands').addEventListener('touchend', () => setTimeout(() => btns.forEach(b => b.classList.remove('lit')), 400));
    $$('[data-q]', el).forEach(b => b.onclick = () => go('orders', b.dataset.q === 'pend' ? { filter: 'pend' } : {}));
  }
};

/* ================= B–G) asistente de pedido ================= */
const STEPS = ['date', 'client', 'products', 'review', 'done'];
VIEWS.order = {
  title: () => W.editId ? 'Editar pedido' : 'Pedido ' + BRANDS[W.brand],
  render(el) {
    const si = STEPS.indexOf(W.step);
    el.innerHTML = `<div class="glass wiz">
      <div class="wizhead">
        <button class="iconbtn" type="button" id="wBack" aria-label="Atrás">${I('back')}</button>
        <span class="logo" data-logo="${W.brand}"></span>
        <div class="grow"></div>
        ${W.step === 'products' ? `<button class="btn sm" type="button" id="wNewProd">${I('plus')} Nuevo producto</button>` : ''}
      </div>
      <div class="steps" aria-hidden="true">${STEPS.map((s, i) => `<i class="${i <= si ? 'on' : ''}"></i>`).join('')}</div>
      <div id="wBody" class="stack" style="gap:16px"></div>
    </div>`;
    $('#wBack').onclick = () => {
      if (W.step === 'date' || W.step === 'done') return go('home');
      W.step = STEPS[si - 1]; render();
    };
    STEP_UI[W.step]($('#wBody'));
    if ($('#wNewProd')) $('#wNewProd').onclick = () => manualProductSheet();
  }
};

const STEP_UI = {
  date(b) {
    b.innerHTML = `<div class="eyebrow">Paso 1 · Fecha del pedido</div>
      <div class="datebig" id="dLabel">${esc(fechaLarga(W.date))}</div>
      <label class="f">Cambiar fecha<input class="in" type="date" id="dIn" value="${W.date}"></label>
      <button class="btn pri block" type="button" id="dNext">Continuar ${I('next')}</button>`;
    $('#dIn').onchange = e => { if (e.target.value) { W.date = e.target.value; $('#dLabel').textContent = fechaLarga(W.date); } };
    $('#dNext').onclick = () => { W.step = 'client'; render(); };
  },
  client(b) {
    b.innerHTML = `<div class="eyebrow">Paso 2 · Clienta</div>
      <p class="muted small" style="margin:0">Escribe el código de la clienta o, si no lo recuerdas, su nombre.</p>
      <div class="grid2">
        <label class="f">Código de cliente<input class="in mono" id="cCode" placeholder="C0001" autocomplete="off"></label>
        <label class="f">Nombre de la clienta<input class="in" id="cName" placeholder="Nombre" autocomplete="off"></label>
      </div>
      <div class="sugg" id="cSug" hidden></div>
      <div id="cPicked"></div>
      <div class="row"><button class="btn" type="button" id="cNew">${I('plus')} Nueva clienta</button><div class="grow"></div><button class="btn pri" type="button" id="cNext" ${W.client ? '' : 'disabled'}>Continuar ${I('next')}</button></div>`;
    const paint = () => {
      $('#cPicked').innerHTML = W.client ? `<div class="picked"><div class="row"><span class="code mono">${esc(W.client.code)}</span><b class="grow">${esc(W.client.name)}</b><button class="btn sm ghost" type="button" id="cClear">Cambiar</button></div>${W.client.phone ? `<span class="small muted">${esc(W.client.phone)}</span>` : ''}</div>` : '';
      $('#cNext').disabled = !W.client;
      if ($('#cClear')) $('#cClear').onclick = () => { W.client = null; paint(); $('#cName').focus(); };
    };
    const search = () => {
      const qc = norm($('#cCode').value), qn = norm($('#cName').value);
      const box = $('#cSug');
      if (!qc && !qn) { box.hidden = true; return; }
      const res = D.clients().filter(c => (qc && norm(c.code).includes(qc)) || (qn && norm(c.name).includes(qn))).slice(0, 30);
      box.hidden = false;
      box.innerHTML = res.length ? res.map(c => `<button type="button" data-id="${c.id}"><span class="code mono">${esc(c.code)}</span><span class="nm">${esc(c.name)}</span><span class="small muted">${esc(c.phone || '')}</span></button>`).join('')
        : `<button type="button" data-new="1"><span class="nm">No existe. <b>Crear “${esc($('#cName').value || $('#cCode').value)}”</b></span></button>`;
      $$('button', box).forEach(x => x.onclick = () => {
        if (x.dataset.new) return clientSheet(null, { name: $('#cName').value.trim() }, c => { W.client = pickClient(c); box.hidden = true; paint(); });
        const c = D.clients().find(c => c.id === x.dataset.id); W.client = pickClient(c);
        box.hidden = true; $('#cCode').value = ''; $('#cName').value = ''; paint();
      });
    };
    $('#cCode').oninput = search; $('#cName').oninput = search;
    $('#cNew').onclick = () => clientSheet(null, { name: $('#cName').value.trim() }, c => { W.client = pickClient(c); $('#cSug').hidden = true; paint(); });
    $('#cNext').onclick = () => { W.step = 'products'; render(); };
    paint();
  },
  products(b) {
    const cat = D.catalog(W.brand);
    b.innerHTML = `<div class="eyebrow">Paso 3 · Productos · ${esc(W.client?.name || '')}</div>
      <label class="f">Código de la revista o nombre del producto<div style="position:relative"><input class="in" id="pQ" placeholder="Ej. 146104 o labial" autocomplete="off" enterkeyhint="search"></div></label>
      <div class="sugg" id="pSug" hidden></div>
      <div id="pPick"></div>
      <div class="card" style="padding:12px 14px"><div class="row" style="margin-bottom:4px"><b class="grow">Pedido</b><span class="small muted">${W.items.length} producto${W.items.length === 1 ? '' : 's'}</span></div><div id="pCart"></div></div>
      <button class="btn pri block" type="button" id="pFin" ${W.items.length ? '' : 'disabled'}>Finalizar pedido</button>`;
    let hi = 0, results = [];
    const q = $('#pQ');
    const search = () => {
      const s = norm(q.value); const box = $('#pSug');
      if (!s) { box.hidden = true; results = []; return; }
      const words = s.split(/\s+/);
      results = cat.filter(p => p.c.startsWith(s) || words.every(w => norm(p.n + ' ' + (p.v || '')).includes(w))).slice(0, 40);
      hi = 0; box.hidden = false;
      box.innerHTML = results.length ? results.map((p, i) => `<button type="button" data-i="${i}" class="${i === 0 ? 'hi' : ''}"><span class="code mono">${esc(p.c)}</span><span class="nm">${esc(p.n)}${p.v ? ` <span class="muted">· ${esc(p.v)}</span>` : ''}</span><span class="pr">${money(p.p)}</span></button>`).join('')
        : `<button type="button" data-new="1"><span class="nm">No está en el catálogo. <b>Añadir a mano</b></span></button>`;
      $$('button', box).forEach(x => x.onclick = () => x.dataset.new ? manualProductSheet(/^\d+$/.test(q.value.trim()) ? { c: q.value.trim() } : { n: q.value.trim() }) : pick(results[+x.dataset.i]));
    };
    const pick = p => {
      $('#pSug').hidden = true;
      const ex = W.items.find(i => i.c === p.c && i.n === p.n);
      $('#pPick').innerHTML = `<div class="picked">
        <div class="row" style="align-items:flex-start"><span class="code mono small muted">${esc(p.c || 'manual')}</span><div class="grow"><b>${esc(p.n)}</b>${p.v ? `<div class="small muted">${esc(p.v)}</div>` : ''}${p.r ? `<div class="small muted">Precio regular ${money(p.r)}</div>` : ''}</div></div>
        <div class="row"><div class="qty"><button type="button" id="qm" aria-label="Menos">−</button><input id="qv" inputmode="numeric" value="1" aria-label="Cantidad"><button type="button" id="qp" aria-label="Más">+</button></div>
        <label class="f grow" style="min-width:110px">Precio unitario (S/)<input class="in mono" id="qpr" inputmode="decimal" value="${p.p || ''}"></label></div>
        ${ex ? `<span class="small muted">Ya hay ${ex.qty} en el pedido; se sumarán.</span>` : ''}
        <div class="row"><button class="btn ghost" type="button" id="qCancel">Cancelar</button><div class="grow"></div><button class="btn pri" type="button" id="qOk">${I('check')} Aceptar</button></div>
      </div>`;
      const qv = $('#qv');
      $('#qm').onclick = () => qv.value = Math.max(1, (+qv.value || 1) - 1);
      $('#qp').onclick = () => qv.value = (+qv.value || 0) + 1;
      $('#qCancel').onclick = () => { $('#pPick').innerHTML = ''; q.focus(); };
      $('#qOk').onclick = () => {
        const qty = Math.max(1, parseInt(qv.value) || 1), price = parseFloat(String($('#qpr').value).replace(',', '.')) || 0;
        addItem({ c: p.c || '', n: p.n, v: p.v || '', p: price, r: p.r || null, pt: p.pt || 0 }, qty);
        $('#pPick').innerHTML = ''; q.value = ''; $('#pSug').hidden = true; cart(); q.focus();
        toast('Añadido. Puedes pedir otro producto.');
      };
      $('#qOk').focus();
    };
    q.oninput = search;
    q.onkeydown = e => {
      const bs = $$('#pSug button');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); hi = (hi + (e.key === 'ArrowDown' ? 1 : -1) + bs.length) % bs.length; bs.forEach((x, i) => x.classList.toggle('hi', i === hi)); bs[hi]?.scrollIntoView({ block: 'nearest' }); }
      if (e.key === 'Enter') { e.preventDefault(); bs[hi]?.click(); }
    };
    const cart = () => {
      const tot = W.items.reduce((s, i) => s + i.p * i.qty, 0);
      $('#pCart').innerHTML = W.items.length ? W.items.map((it, k) => `<div class="cartline"><div class="grow"><div class="nm">${esc(it.n)}</div><div class="small muted"><span class="mono">${esc(it.c || 'manual')}</span>${it.v ? ' · ' + esc(it.v) : ''} · ${it.qty} × ${money(it.p)}</div></div><b class="num">${money(it.p * it.qty)}</b><button class="iconbtn" type="button" data-del="${k}" aria-label="Borrar artículo">${I('trash')}</button></div>`).join('') + `<div class="total"><span>Total</span><span class="mono">${money(tot)}</span></div>`
        : `<p class="muted small" style="margin:6px 0">Aún no hay productos. Busca por código o nombre.</p>`;
      $$('[data-del]', $('#pCart')).forEach(x => x.onclick = () => { W.items.splice(+x.dataset.del, 1); cart(); });
      $('#pFin').disabled = !W.items.length;
      const sp = $('.small.muted', b.querySelector('.card .row')); if (sp) sp.textContent = `${W.items.length} producto${W.items.length === 1 ? '' : 's'}`;
    };
    $('#pFin').onclick = () => { W.step = 'review'; render(); };
    cart();
    if (!cat.length) $('#pPick').innerHTML = `<p class="banner">El catálogo de ${BRANDS[W.brand]} está vacío. Usa “Nuevo producto” o cárgalo desde Productos › Actualizar con revista.</p>`;
    if (window.matchMedia('(min-width:700px)').matches) q.focus();
  },
  review(b) {
    const tot = r2(W.items.reduce((s, i) => s + i.p * i.qty, 0));
    b.innerHTML = `<div class="eyebrow">Paso 4 · Revisa el pedido</div>
      <pre class="ticket">${esc(ticketText())}</pre>
      <div class="grid2">
        <label class="f">Forma de pago<select class="in" id="rPay">${['Efectivo', 'Yape', 'Plin', 'Transferencia', 'Tarjeta', 'Crédito'].map(p => `<option ${p === W.pay ? 'selected' : ''}>${p}</option>`).join('')}</select></label>
        <label class="f">Estado del cobro<select class="in" id="rPaid"><option value="0" ${W.paid ? '' : 'selected'}>Pendiente de cobro</option><option value="1" ${W.paid ? 'selected' : ''}>Pagado</option></select></label>
      </div>
      <label class="f">Nota (opcional)<input class="in" id="rNote" value="${esc(W.note)}" placeholder="Ej. entregar el viernes"></label>
      <div class="row"><button class="btn" type="button" id="rEdit">${I('edit')} Editar</button><div class="grow"></div><button class="btn pri" type="button" id="rOk">${I('check')} Aceptar pedido · ${money(tot)}</button></div>`;
    $('#rPay').onchange = e => W.pay = e.target.value;
    $('#rPaid').onchange = e => W.paid = e.target.value === '1';
    $('#rNote').oninput = e => W.note = e.target.value;
    $('#rEdit').onclick = () => { W.step = 'products'; render(); };
    $('#rOk').onclick = async e => { e.target.disabled = true; if (!(await saveOrder())) e.target.disabled = false; };
  },
  done(b) {
    const o = Store.data.orders[W.savedId] || W.saved;
    b.innerHTML = `<div class="eyebrow">Paso 5 · Boletas listas</div>
      <div><div class="h2">Boleta ${esc(o.num)}</div><p class="muted small" style="margin:.2em 0 0">${esc(o.client.name)} · ${fechaCorta(o.date)} · ${money(o.total)}</p></div>
      <div class="boletas">${['cliente', 'consultora'].map(cp => `<div class="bcard"><div class="mini">${miniBoleta(o, cp)}</div><b>Copia para ${cp}</b><button class="btn pri sm" type="button" data-dl="${cp}">${I('download')} Descargar PDF</button></div>`).join('')}</div>
      <div class="row"><button class="btn grow" type="button" id="dBoth">${I('download')} Descargar las dos</button>${canShare() ? `<button class="btn grow" type="button" id="dShare">${I('upload')} Enviar a la clienta</button>` : ''}</div>
      <p class="small muted" style="margin:0">${I('folder').replace('<svg', '<svg style="width:15px;height:15px;vertical-align:-3px"')} Guardada en Clientes › ${esc(o.client.code)} ${esc(o.client.name)} › ${esc(o.date)} · ${esc(o.num)}</p>
      <div class="row"><button class="btn" type="button" id="dFolder">Ver carpeta de la clienta</button><div class="grow"></div><button class="btn pri" type="button" id="dNew">${I('plus')} Nuevo pedido</button></div>`;
    $$('[data-dl]', b).forEach(x => x.onclick = () => downloadBoleta(o, x.dataset.dl));
    $('#dBoth').onclick = async () => { await downloadBoleta(o, 'cliente'); await downloadBoleta(o, 'consultora'); };
    if ($('#dShare')) $('#dShare').onclick = () => shareBoleta(o);
    $('#dFolder').onclick = () => go('client', { id: o.client.id });
    $('#dNew').onclick = () => go('home');
  },
};

function pickClient(c) { return { id: c.id, code: c.code, name: c.name, phone: c.phone || '', doc: c.doc || '', district: c.district || '', address: c.address || '' }; }
function addItem(it, qty) {
  const ex = W.items.find(i => i.c === it.c && i.n === it.n && i.v === it.v && i.p === it.p);
  if (ex) ex.qty += qty; else W.items.push({ ...it, qty });
}
function ticketText() {
  const c = Store.cfg.consultant || {};
  const L = [];
  L.push(`${BRANDS[W.brand].toUpperCase()} · PEDIDO`);
  L.push(`Fecha: ${fechaCorta(W.date)}`);
  L.push(`Clienta: ${W.client.code} · ${W.client.name}`);
  L.push(`Consultora: ${c.name || ''}${c.code ? ' (' + c.code + ')' : ''}`);
  L.push('─'.repeat(32));
  W.items.forEach(i => { L.push(`${i.qty} x ${i.c ? i.c + ' ' : ''}${i.n}${i.v ? ' · ' + i.v : ''}`); L.push(`   ${money(i.p)} c/u`.padEnd(20) + money(i.p * i.qty).padStart(12)); });
  L.push('─'.repeat(32));
  const tot = W.items.reduce((s, i) => s + i.p * i.qty, 0);
  const pts = W.items.reduce((s, i) => s + (i.pt || 0) * i.qty, 0);
  L.push('TOTAL'.padEnd(20) + money(tot).padStart(12));
  if (pts) L.push(`Puntos: ${pts}`);
  return L.join('\n');
}
async function saveOrder() {
  if (!W.items.length || !W.client) return false;
  const total = r2(W.items.reduce((s, i) => s + i.p * i.qty, 0));
  const prev = W.editId ? Store.data.orders[W.editId] : null;
  const num = prev ? prev.num : D.nextBoleta();
  const id = W.editId || num;
  const o = {
    num, brand: W.brand, date: W.date, client: W.client, items: W.items.map(i => ({ c: i.c, n: i.n, v: i.v || '', p: r2(i.p), qty: i.qty, pt: i.pt || 0 })),
    total, pts: W.items.reduce((s, i) => s + (i.pt || 0) * i.qty, 0), pay: W.pay, paid: W.paid, note: W.note || '', status: 'ok',
    consultant: { name: Store.cfg.consultant?.name || '', code: Store.cfg.consultant?.code || '', phone: Store.cfg.consultant?.phone || '' },
    createdAt: prev ? prev.createdAt : Date.now(), updatedAt: Date.now(),
  };
  if (!(await Store.set('orders', id, o))) return false;
  const seq = +num.split('-').pop();
  if (!prev && seq > (Number(Store.cfg.seq) || 0)) await Store.set('config', 'main', { ...Store.cfg, seq });
  W.savedId = id; W.saved = o; W.step = 'done'; render();
  toast(prev ? 'Pedido actualizado' : 'Pedido guardado');
  return true;
}

/* ===== hojas: clienta y producto manual ===== */
function clientSheet(id, preset = {}, after) {
  const c = id ? Store.data.clients[id] : { code: D.nextClientCode(), ...preset };
  sheet(id ? 'Editar clienta' : 'Nueva clienta', `<form id="fCl" class="stack">
    <div class="row"><span class="pill">Código</span><b class="mono">${esc(c.code)}</b><span class="small muted">asignado automáticamente</span></div>
    <label class="f">Nombre y apellido<input class="in" id="clName" required value="${esc(c.name || '')}"></label>
    <div class="grid2">
      <label class="f">Celular<input class="in" id="clPhone" inputmode="tel" value="${esc(c.phone || '')}"></label>
      <label class="f">DNI / RUC<input class="in mono" id="clDoc" inputmode="numeric" value="${esc(c.doc || '')}"></label>
      <label class="f">Distrito<input class="in" id="clDist" value="${esc(c.district || '')}"></label>
      <label class="f">Cumpleaños<input class="in" id="clBday" type="date" value="${esc(c.bday || '')}"></label>
    </div>
    <label class="f">Dirección<input class="in" id="clAddr" value="${esc(c.address || '')}"></label>
    <label class="f">Notas<textarea class="in" id="clNotes" rows="2">${esc(c.notes || '')}</textarea></label>
    <div class="row">${id ? `<button class="btn danger" type="button" id="clDel">${I('trash')} Borrar</button>` : ''}<div class="grow"></div><button class="btn pri" type="submit">Guardar</button></div>
  </form>`, s => {
    $('#fCl', s).onsubmit = async e => {
      e.preventDefault();
      const nid = id || ('cl-' + uid());
      const data = { ...(id ? Store.data.clients[id] : {}), code: c.code, name: $('#clName').value.trim(), phone: $('#clPhone').value.trim(), doc: $('#clDoc').value.trim(), district: $('#clDist').value.trim(), bday: $('#clBday').value, address: $('#clAddr').value.trim(), notes: $('#clNotes').value.trim(), createdAt: c.createdAt || Date.now() };
      if (!data.name) return;
      if (await Store.set('clients', nid, data)) { closeSheet(); toast(id ? 'Clienta actualizada' : `Clienta ${data.code} creada`); after && after({ id: nid, ...data }); }
    };
    if (id) $('#clDel', s).onclick = () => {
      const n = D.orders().filter(o => o.client?.id === id).length;
      confirmSheet('Borrar clienta', n ? `Tiene ${n} boleta(s). Las boletas se conservan, pero la clienta deja de aparecer en la lista.` : '¿Seguro que quieres borrarla?', 'Borrar', async () => { await Store.del('clients', id); toast('Clienta borrada'); go('clients'); });
    };
  });
}
function manualProductSheet(preset = {}) {
  sheet('Nuevo producto', `<form id="fMp" class="stack">
    <p class="small muted" style="margin:0">Para productos que no salen en el catálogo cargado.</p>
    <div class="grid2">
      <label class="f">Código (opcional)<input class="in mono" id="mpC" inputmode="numeric" value="${esc(preset.c || '')}"></label>
      <label class="f">Precio (S/)<input class="in mono" id="mpP" inputmode="decimal" required></label>
    </div>
    <label class="f">Nombre del producto<input class="in" id="mpN" required value="${esc(preset.n || '')}"></label>
    <div class="grid2">
      <label class="f">Tono / variante<input class="in" id="mpV"></label>
      <label class="f">Puntos<input class="in mono" id="mpPt" inputmode="numeric"></label>
    </div>
    <div class="row"><span class="small muted">Cantidad</span><div class="qty"><button type="button" id="mpm">−</button><input id="mpQ" value="1" inputmode="numeric" aria-label="Cantidad"><button type="button" id="mpp">+</button></div></div>
    <label class="row small" style="gap:8px"><input type="checkbox" id="mpSave" checked> Guardar también en el catálogo de ${BRANDS[W.brand]}</label>
    <button class="btn pri block" type="submit">${I('plus')} Añadir al pedido</button>
  </form>`, s => {
    $('#mpm', s).onclick = () => $('#mpQ').value = Math.max(1, (+$('#mpQ').value || 1) - 1);
    $('#mpp', s).onclick = () => $('#mpQ').value = (+$('#mpQ').value || 0) + 1;
    $('#fMp', s).onsubmit = async e => {
      e.preventDefault();
      const it = { c: $('#mpC').value.trim(), n: $('#mpN').value.trim(), v: $('#mpV').value.trim(), p: r2(parseFloat($('#mpP').value.replace(',', '.')) || 0), pt: parseInt($('#mpPt').value) || 0 };
      if (!it.n) return;
      addItem(it, Math.max(1, parseInt($('#mpQ').value) || 1));
      if ($('#mpSave').checked) await addManualToCatalog(W.brand, it);
      closeSheet(); render(); toast('Producto añadido al pedido');
    };
  });
}
async function addManualToCatalog(brand, it) {
  const id = brand + '-manual';
  const d = Store.data.catalog[id] || { brand, manual: true, items: [] };
  const items = [...(d.items || [])];
  const k = it.c ? items.findIndex(x => x.c === it.c) : -1;
  const row = { c: it.c || '', n: it.n, v: it.v || '', p: it.p, pt: it.pt || undefined, m: 1, ok: 1 };
  if (k >= 0) items[k] = row; else items.push(row);
  return Store.set('catalog', id, { ...d, items });
}

/* ================= boleta PDF (A5, modelo de talonario) ================= */
const BCOL = { natura: { main: [239, 123, 34], tint: [254, 243, 233], soft: [252, 228, 207] }, avon: { main: [229, 38, 106], tint: [253, 239, 244], soft: [249, 214, 227] } };
const _logoCache = {};
function logoPNG(brand) {
  if (_logoCache[brand]) return _logoCache[brand];
  const rgb = BCOL[brand].main;
  const svg = LOGO[brand].replace('currentColor', `rgb(${rgb.join(',')})`).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  _logoCache[brand] = new Promise(res => {
    const img = new Image();
    img.onload = () => {
      const vb = svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
      const w = 900, h = Math.round(w * vb[3] / vb[2]);
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      cv.getContext('2d').drawImage(img, 0, 0, w, h);
      res({ data: cv.toDataURL('image/png'), ratio: vb[3] / vb[2] });
    };
    img.onerror = () => res(null);
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  return _logoCache[brand];
}
function fechaBoleta(iso) { const [y, m, d] = iso.split('-').map(Number); return { d: pad(d, 2), m: MESES[m - 1], y: String(y) }; }

async function boletaPDF(o, copy) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a5' });
  const C = BCOL[o.brand] || BCOL.natura;
  const logo = await logoPNG(o.brand);
  const cons = o.consultant || Store.cfg.consultant || {};
  const ink = [55, 40, 48], grey = [120, 108, 114], greyFill = [232, 230, 231], line = [70, 60, 66];
  const W = 148, L = 10, R = 138;
  const per = 12;
  const pages = Math.max(1, Math.ceil(o.items.length / per));
  const igvRate = D.igv();
  const total = r2(o.items.reduce((s, i) => s + i.p * i.qty, 0));
  const base = r2(total / (1 + igvRate)), igv = r2(total - base);
  const rr = (x, y, w, h, style) => doc.roundedRect(x, y, w, h, 2, 2, style);
  const txt = (s, x, y, o2) => doc.text(String(s ?? ''), x, y, o2);

  for (let pg = 0; pg < pages; pg++) {
    if (pg) doc.addPage();
    // fondo de la marca
    doc.setFillColor(...C.tint); doc.rect(0, 0, W, 210, 'F');
    if (logo) {
      try { doc.setGState(new doc.GState({ opacity: 0.06 })); doc.addImage(logo.data, 'PNG', 14, 95, 120, 120 * logo.ratio); doc.setGState(new doc.GState({ opacity: 1 })); } catch { }
    }
    // talón superior + línea discontinua
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...C.main);
    txt(`COPIA PARA ${copy === 'cliente' ? 'CLIENTE' : 'CONSULTOR/A'}`, W / 2, 10, { align: 'center', charSpace: 1.2 });
    doc.setDrawColor(...line); doc.setLineWidth(0.4); doc.setLineDashPattern([4, 2.5], 0); doc.line(0, 16, W, 16); doc.setLineDashPattern([], 0);
    // logo + consultora
    if (logo) doc.addImage(logo.data, 'PNG', L, 22, 36, 36 * logo.ratio);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7.2); doc.setTextColor(...ink);
    let cy = 22 + 36 * logo?.ratio + 5 || 34;
    txt(`Consultora: ${cons.name || ''}`, L, cy); cy += 3.6;
    txt(`Código: ${cons.code || ''}${cons.phone ? '   Cel.: ' + cons.phone : ''}`, L, cy);
    // BOLETA + número
    doc.setFont('helvetica', 'normal'); doc.setFontSize(19); doc.setTextColor(...C.main);
    txt('BOLETA', 96, 32, { align: 'right' });
    doc.setFillColor(...C.soft); doc.setDrawColor(...line); doc.setLineWidth(0.35); rr(99, 24, 39, 11, 'FD');
    doc.setFontSize(7); doc.setTextColor(...ink); txt('Núm.', 101, 28.2);
    doc.setFont('courier', 'bold'); doc.setFontSize(10.5); txt(o.num, 136.5, 32.6, { align: 'right' });
    // fecha
    const f = fechaBoleta(o.date);
    doc.setDrawColor(...line); doc.setLineWidth(0.25); doc.line(60, 41, R, 41);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...ink);
    txt(`${f.d}   de   ${f.m}   de   ${f.y}`, 99, 40, { align: 'center' });
    // cliente
    doc.setLineWidth(0.35); rr(60, 44, 78, 10, 'S');
    doc.setFontSize(6.5); doc.setTextColor(...grey); txt('CLIENTE:', 62, 47.2);
    doc.setFontSize(9); doc.setTextColor(...ink); doc.setFont('helvetica', 'bold');
    txt(doc.splitTextToSize(`${o.client.name}`, 70)[0], 62, 51.8);
    doc.setFont('courier', 'normal'); doc.setFontSize(7.5); txt(o.client.code || '', 136, 47.2, { align: 'right' });
    // datos
    doc.setFont('helvetica', 'normal'); rr(L, 57, 128, 16, 'S'); doc.line(L, 65, R, 65); doc.line(76, 57, 76, 65); doc.line(108, 65, 108, 73);
    doc.setFontSize(6.5); doc.setTextColor(...grey);
    txt('DNI / RUC:', 12, 60.2); txt('DISTRITO:', 78, 60.2); txt('DIRECCIÓN:', 12, 68.2); txt('PAGO:', 110, 68.2);
    doc.setFontSize(8.2); doc.setTextColor(...ink);
    txt(o.client.doc || '', 12, 63.6); txt(doc.splitTextToSize(o.client.district || '', 58)[0] || '', 78, 63.6);
    txt(doc.splitTextToSize(o.client.address || '', 94)[0] || '', 12, 71.6); txt(`${o.pay || ''}${o.paid ? ' · pagado' : ''}`, 110, 71.6);
    // tabla
    const ty = 77, rh = 7, cols = [L, 22, 100, 118, R];
    doc.setFillColor(...C.soft); rr(L, ty, 128, rh, 'F');
    doc.setFillColor(...greyFill); doc.rect(100, ty + rh, 18, rh * per, 'F');
    doc.setFillColor(...C.soft); doc.rect(118, ty + rh, 20, rh * per, 'F');
    doc.setLineWidth(0.35); rr(L, ty, 128, rh * (per + 1), 'S');
    doc.setLineWidth(0.2);
    for (let i = 1; i <= per; i++) doc.line(L, ty + rh * i, R, ty + rh * i);
    [22, 100, 118].forEach(x => doc.line(x, ty, x, ty + rh * (per + 1)));
    doc.setFontSize(8); doc.setTextColor(...ink); doc.setFont('helvetica', 'normal');
    txt('Cant.', 16, ty + 4.8, { align: 'center' }); txt('CONCEPTO', 61, ty + 4.8, { align: 'center' }); txt('Precio', 109, ty + 4.8, { align: 'center' }); txt('IMPORTE', 128, ty + 4.8, { align: 'center' });
    const slice = o.items.slice(pg * per, pg * per + per);
    slice.forEach((it, k) => {
      const y = ty + rh * (k + 1) + 4.7;
      doc.setFont('courier', 'bold'); doc.setFontSize(8.5); txt(String(it.qty), 16, y, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7.2);
      const concept = `${it.c ? it.c + '  ' : ''}${it.n}${it.v ? ' · ' + it.v : ''}`;
      txt(doc.splitTextToSize(concept, 75)[0], 23.5, y);
      doc.setFont('courier', 'normal'); doc.setFontSize(8);
      txt(it.p.toFixed(2), 116.5, y, { align: 'right' }); txt((it.p * it.qty).toFixed(2), 136.5, y, { align: 'right' });
    });
    // totales
    const fy = 175;
    doc.setFont('helvetica', 'normal'); doc.setLineWidth(0.35);
    rr(L, fy, 128, 15, 'S');
    doc.setFillColor(...C.soft); doc.rect(L + 0.2, fy + 0.2, 70, 5, 'F'); doc.rect(101, fy + 5, 36.8, 9.8, 'F');
    doc.setLineWidth(0.2); doc.line(L, fy + 5, R, fy + 5); [40, 62, 80, 101].forEach(x => doc.line(x, fy, x, fy + 15));
    doc.setFontSize(7); doc.setTextColor(...ink);
    txt('TOTAL BRUTO', 12, fy + 3.6); txt('I.G.V.', 71, fy + 2.4, { align: 'center' }); txt('%', 71, fy + 4.6, { align: 'center' }); txt('IMPORTE', 90.5, fy + 3.6, { align: 'center' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); txt('TOTAL', 119.5, fy + 3.8, { align: 'center' });
    if (pg === pages - 1) {
      doc.setFont('courier', 'normal'); doc.setFontSize(9);
      txt(base.toFixed(2), 38.5, fy + 11.3, { align: 'right' }); txt(String(Math.round(igvRate * 100)), 71, fy + 11.3, { align: 'center' }); txt(igv.toFixed(2), 99.5, fy + 11.3, { align: 'right' });
      doc.setFont('courier', 'bold'); doc.setFontSize(11.5); txt('S/ ' + total.toFixed(2), 136.5, fy + 11.6, { align: 'right' });
    } else { doc.setFontSize(7); txt('continúa…', 119.5, fy + 11, { align: 'center' }); }
    // pie
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(...grey);
    const pts = o.pts || 0;
    txt(`${BRANDS[o.brand]}${pts ? ' · ' + pts + ' puntos' : ''}${pages > 1 ? `   ·   Hoja ${pg + 1} de ${pages}` : ''}`, L, 196);
    if (o.note) txt(doc.splitTextToSize('Nota: ' + o.note, 80)[0], L, 199.8);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...C.main);
    txt(copy === 'cliente' ? '(Cliente)' : '(Consultora)', R, 197, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(...ink);
    txt(copy === 'cliente' ? o.client.name : (cons.name || ''), R, 201, { align: 'right' });
    doc.setFontSize(5.8); doc.setTextColor(...grey);
    txt('Comprobante interno de venta de consultora independiente. Precios incluyen IGV.', W / 2, 206.5, { align: 'center' });
  }
  return doc.output('blob');
}
function boletaFilename(o, copy) { return `${o.num}_${(o.client.code || '')}_${o.date}_${copy === 'cliente' ? 'CLIENTE' : 'CONSULTORA'}.pdf`; }
async function downloadBoleta(o, copy) {
  if (!window.jspdf) { toast('Falta la librería de PDF. Revisa tu conexión y recarga.'); return; }
  try { const blob = await boletaPDF(o, copy); const ok = await saveFile(boletaFilename(o, copy), blob, boletaFolder(o)); if (ok && !isNative()) toast(`Boleta (${copy}) descargada`); }
  catch (e) { console.error(e); toast('No se pudo generar el PDF.'); }
}
function boletaFolder(o) { return `Clientes/${o.client.code || ''} ${o.client.name || ''}/${o.date} ${o.num}`; }
async function shareBoleta(o) {
  if (!window.jspdf) return toast('Falta la librería de PDF.');
  const blob = await boletaPDF(o, 'cliente');
  await shareFile(boletaFilename(o, 'cliente'), blob, boletaFolder(o), `Hola ${o.client.name.split(' ')[0]}, te envío tu boleta ${o.num} por ${money(o.total)}. ¡Gracias por tu compra!`);
}
function miniBoleta(o, copy) {
  const col = o.brand === 'avon' ? 'var(--avon)' : 'var(--natura)';
  const rows = o.items.slice(0, 7).map(i => `<div style="display:flex;gap:4px;border-top:1px solid rgba(0,0,0,.12);padding:2px 0"><span style="width:12%">${i.qty}</span><span style="flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${esc(i.n)}</span><span>${(i.p * i.qty).toFixed(2)}</span></div>`).join('');
  return `<div style="position:absolute;inset:0;padding:7% 8%;font-size:7px;line-height:1.3;color:#3a2a32;background:color-mix(in srgb,${col} 8%,#fff);display:flex;flex-direction:column;gap:5px">
    <div style="text-align:center;color:${col};font-weight:700;letter-spacing:.12em;font-size:6px">COPIA PARA ${copy === 'cliente' ? 'CLIENTE' : 'CONSULTOR/A'}</div>
    <div style="border-top:1px dashed #555;margin:0 -9%"></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><span data-logo="${o.brand}" style="color:${col};height:11px;display:flex"></span><span style="color:${col};font-size:10px">BOLETA <b style="font-family:var(--f-mono);color:#3a2a32;font-size:7px">${esc(o.num)}</b></span></div>
    <div style="border:1px solid #555;border-radius:3px;padding:2px 4px">CLIENTE: <b>${esc(o.client.name)}</b></div>
    <div style="flex:1">${rows}${o.items.length > 7 ? `<div>… +${o.items.length - 7}</div>` : ''}</div>
    <div style="display:flex;justify-content:space-between;border-top:1.5px solid #555;padding-top:3px"><b>TOTAL</b><b>S/ ${o.total.toFixed(2)}</b></div>
    <div style="text-align:right;color:${col};font-weight:700">(${copy === 'cliente' ? 'Cliente' : 'Consultora'})</div>
  </div>`;
}

/* ================= Boletas ================= */
const UI = { ordBrand: 'all', ordFilter: 'all', ordQ: '', cliQ: '', prodBrand: 'natura', prodQ: '', prodOnly: 'all', prodLimit: 80, repYear: null, repMonth: 'all', repBrand: 'all' };
function segHTML(id, opts, val) { return `<div class="seg" id="${id}" role="tablist">${opts.map(([v, l]) => `<button type="button" data-v="${v}" class="${v === val ? 'on' : ''}">${l}</button>`).join('')}</div>`; }
function bindSeg(id, fn) { $$('#' + id + ' button').forEach(b => b.onclick = () => fn(b.dataset.v)); }

VIEWS.orders = {
  render(el) {
    if (App.params.filter) { UI.ordFilter = App.params.filter; App.params.filter = null; }
    const q = norm(UI.ordQ);
    const all = D.orders();
    const list = all.filter(o => (UI.ordBrand === 'all' || o.brand === UI.ordBrand) && (UI.ordFilter === 'all' || (UI.ordFilter === 'pend' ? !o.paid : o.paid)) && (!q || norm(o.num + ' ' + o.client?.name + ' ' + o.client?.code).includes(q)));
    const sum = list.reduce((s, o) => s + (o.total || 0), 0);
    el.innerHTML = `<div class="stack">
      <div class="row"><div class="grow"><div class="h1">Boletas</div><p class="muted small" style="margin:.2em 0 0">${list.length} boleta${list.length === 1 ? '' : 's'} · ${money(sum)}</p></div><button class="btn pri" type="button" id="oNew">${I('plus')} Nuevo pedido</button></div>
      <div class="row">${segHTML('oB', [['all', 'Ambas'], ['natura', 'Natura'], ['avon', 'Avon']], UI.ordBrand)}${segHTML('oF', [['all', 'Todas'], ['pend', 'Por cobrar'], ['paid', 'Pagadas']], UI.ordFilter)}</div>
      <input class="in" id="oQ" placeholder="Buscar por número, clienta o código" value="${esc(UI.ordQ)}">
      ${list.length ? `<div class="list">${list.slice(0, 300).map(o => `<div class="li" data-id="${o.id}" tabindex="0"><span class="dot ${o.brand}"></span><div class="grow"><div class="t">${esc(o.client?.name)}</div><div class="s"><span class="mono">${esc(o.num)}</span> · ${fechaCorta(o.date)} · ${o.items.length} prod.</div></div><span class="pill ${o.paid ? 'ok' : 'warn'}">${o.paid ? 'Pagada' : 'Por cobrar'}</span><b class="num">${money(o.total)}</b></div>`).join('')}</div>`
        : `<div class="empty"><b>Sin boletas todavía</b>Cada pedido aceptado crea su boleta aquí y en la carpeta de la clienta.</div>`}
    </div>`;
    $('#oNew').onclick = () => go('home');
    bindSeg('oB', v => { UI.ordBrand = v; render(); }); bindSeg('oF', v => { UI.ordFilter = v; render(); });
    $('#oQ').oninput = e => { UI.ordQ = e.target.value; clearTimeout(this.t); this.t = setTimeout(() => { render(); const i = $('#oQ'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 250); };
    $$('.li', el).forEach(li => { li.onclick = () => orderSheet(li.dataset.id); li.onkeydown = e => e.key === 'Enter' && li.click(); });
  }
};
function orderSheet(id) {
  const o = { id, ...Store.data.orders[id] };
  sheet(`Boleta ${o.num}`, `<div class="row"><span class="pill ${o.brand}">${BRANDS[o.brand]}</span><span class="pill ${o.paid ? 'ok' : 'warn'}">${o.paid ? 'Pagada' : 'Por cobrar'}</span><span class="small muted">${esc(fechaLarga(o.date))}</span></div>
    <div><b>${esc(o.client.name)}</b> <span class="mono small muted">${esc(o.client.code)}</span></div>
    <div class="tablewrap"><table class="t"><thead><tr><th>Cant.</th><th>Producto</th><th class="r">Importe</th></tr></thead><tbody>${o.items.map(i => `<tr><td class="num">${i.qty}</td><td><span class="mono small muted">${esc(i.c)}</span> ${esc(i.n)}${i.v ? ` <span class="muted">· ${esc(i.v)}</span>` : ''}</td><td class="r">${money(i.p * i.qty)}</td></tr>`).join('')}</tbody></table></div>
    <div class="total"><span>Total</span><span class="mono">${money(o.total)}</span></div>
    <div class="small muted">${esc(o.pay || '')}${o.pts ? ' · ' + o.pts + ' puntos' : ''}${o.note ? ' · ' + esc(o.note) : ''}</div>
    <div class="row"><button class="btn sm" type="button" data-dl="cliente">${I('download')} PDF cliente</button><button class="btn sm" type="button" data-dl="consultora">${I('download')} PDF consultora</button>${canShare() ? `<button class="btn sm" type="button" id="osShare">${I('upload')} Enviar</button>` : ''}</div>
    <div class="row"><button class="btn sm ${o.paid ? '' : 'pri'}" type="button" id="osPaid">${o.paid ? 'Marcar por cobrar' : I('check') + ' Marcar pagada'}</button><button class="btn sm" type="button" id="osEdit">${I('edit')} Editar</button><div class="grow"></div><button class="btn sm danger" type="button" id="osDel">${I('trash')} Borrar</button></div>`, s => {
    $$('[data-dl]', s).forEach(b => b.onclick = () => downloadBoleta(o, b.dataset.dl));
    if ($('#osShare', s)) $('#osShare', s).onclick = () => shareBoleta(o);
    $('#osPaid', s).onclick = async () => { const { id: _, ...rest } = o; if (await Store.set('orders', id, { ...rest, paid: !o.paid, paidAt: !o.paid ? Date.now() : null })) { closeSheet(); toast(!o.paid ? 'Marcada como pagada' : 'Marcada por cobrar'); } };
    $('#osEdit', s).onclick = () => { W = { brand: o.brand, date: o.date, client: o.client, items: o.items.map(i => ({ ...i })), step: 'products', editId: id, pay: o.pay || 'Efectivo', paid: !!o.paid, note: o.note || '' }; go('order'); };
    $('#osDel', s).onclick = () => confirmSheet('Borrar boleta', `Se borrará la boleta ${esc(o.num)} y dejará de contar en las ventas.`, 'Borrar boleta', async () => { await Store.del('orders', id); toast('Boleta borrada'); });
  });
}

/* ================= Clientes ================= */
function clientStats() {
  const st = {};
  for (const o of D.orders()) { const k = o.client?.id; if (!k) continue; const s = st[k] || (st[k] = { n: 0, t: 0, last: '' }); s.n++; s.t += o.total || 0; if (o.date > s.last) s.last = o.date; }
  return st;
}
VIEWS.clients = {
  render(el) {
    const st = clientStats(); const q = norm(UI.cliQ);
    const list = D.clients().filter(c => !q || norm(c.code + ' ' + c.name + ' ' + (c.phone || '') + ' ' + (c.district || '')).includes(q));
    el.innerHTML = `<div class="stack">
      <div class="row"><div class="grow"><div class="h1">Clientes</div><p class="muted small" style="margin:.2em 0 0">${D.clients().length} clientas registradas</p></div><button class="btn pri" type="button" id="cAdd">${I('plus')} Nuevo cliente</button></div>
      <input class="in" id="cQ" placeholder="Buscar por código, nombre, celular o distrito" value="${esc(UI.cliQ)}">
      ${list.length ? `<div class="list">${list.map(c => { const s = st[c.id]; return `<div class="li" data-id="${c.id}" tabindex="0"><span class="mono small muted" style="min-width:50px">${esc(c.code)}</span><div class="grow"><div class="t">${esc(c.name)}</div><div class="s">${s ? `${s.n} boleta${s.n === 1 ? '' : 's'} · última ${fechaCorta(s.last)}` : 'Sin compras aún'}${c.phone ? ' · ' + esc(c.phone) : ''}</div></div>${s ? `<b class="num">${money(s.t)}</b>` : ''}${I('next').replace('<svg', '<svg style="width:18px;color:var(--muted)"')}</div>`; }).join('')}</div>`
        : `<div class="empty"><b>${q ? 'Sin resultados' : 'Aún no hay clientas'}</b>${q ? 'Prueba con otro nombre o código.' : 'Pulsa “Nuevo cliente”. El código se asigna solo (C0001, C0002…).'}</div>`}
    </div>`;
    $('#cAdd').onclick = () => clientSheet(null, {}, c => go('client', { id: c.id }));
    $('#cQ').oninput = e => { UI.cliQ = e.target.value; clearTimeout(this.t); this.t = setTimeout(() => { render(); const i = $('#cQ'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 250); };
    $$('.li', el).forEach(li => { li.onclick = () => go('client', { id: li.dataset.id }); li.onkeydown = e => e.key === 'Enter' && li.click(); });
  }
};
VIEWS.client = {
  title: () => Store.data.clients[App.params.id]?.name || 'Clienta',
  render(el) {
    const id = App.params.id; const c = Store.data.clients[id];
    if (!c) { el.innerHTML = `<div class="empty"><b>Clienta no encontrada</b><button class="btn" type="button" onclick="go('clients')">Volver a Clientes</button></div>`; return; }
    const ords = D.orders().filter(o => o.client?.id === id);
    const tot = ords.reduce((s, o) => s + (o.total || 0), 0);
    const pend = ords.filter(o => !o.paid).reduce((s, o) => s + (o.total || 0), 0);
    const hist = D.salesRows().filter(r => r.src === 'hist' && norm(r.cl) === norm(c.name));
    const prodCount = {}; ords.forEach(o => o.items.forEach(i => { prodCount[i.n] = (prodCount[i.n] || 0) + i.qty; }));
    const fav = Object.entries(prodCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
    el.innerHTML = `<div class="stack">
      <div class="row"><button class="iconbtn" type="button" onclick="go('clients')" aria-label="Volver">${I('back')}</button><div class="grow"><div class="eyebrow mono">${esc(c.code)}</div><div class="h1">${esc(c.name)}</div></div><button class="btn sm" type="button" id="ceEdit">${I('edit')} Editar</button></div>
      <div class="small muted">${[c.phone, c.doc && 'DNI/RUC ' + c.doc, c.district, c.address, c.bday && 'Cumple ' + fechaCorta(c.bday).slice(0, 5)].filter(Boolean).map(esc).join(' · ') || 'Sin datos de contacto'}</div>
      <div class="kpis"><div class="kpi"><div class="eyebrow">Total comprado</div><div class="v">${money(tot)}</div></div><div class="kpi"><div class="eyebrow">Boletas</div><div class="v">${ords.length}</div></div><div class="kpi"><div class="eyebrow">Por cobrar</div><div class="v" style="color:${pend ? 'var(--warn)' : 'inherit'}">${money(pend)}</div></div>${hist.length ? `<div class="kpi"><div class="eyebrow">Histórico importado</div><div class="v">${money(hist.reduce((s, r) => s + r.t, 0))}</div></div>` : ''}</div>
      ${fav.length ? `<div class="small"><span class="muted">Le gusta:</span> ${fav.map(([n, q]) => esc(n) + ` <span class="muted">(${q})</span>`).join(' · ')}</div>` : ''}
      <div class="row"><div class="h2 grow">Carpetas de boletas</div><button class="btn pri sm" type="button" data-nb="natura">${I('plus')} Pedido Natura</button><button class="btn pri sm" type="button" data-nb="avon" style="background:var(--avon);border-color:var(--avon)">${I('plus')} Pedido Avon</button></div>
      ${ords.length ? `<div class="list">${ords.map(o => `<details class="li" style="display:block;cursor:default"><summary style="display:flex;gap:12px;align-items:center;cursor:pointer;list-style:none">${I('folder').replace('<svg', `<svg style="width:22px;color:var(--${o.brand});flex:none"`)}<div class="grow"><div class="t">${esc(o.date)} · <span class="mono">${esc(o.num)}</span></div><div class="s">${BRANDS[o.brand]} · ${o.items.length} prod. · ${o.paid ? 'pagada' : 'por cobrar'}</div></div><b class="num">${money(o.total)}</b></summary>
          <div class="stack" style="padding:10px 0 4px 34px;gap:6px">${['cliente', 'consultora'].map(cp => `<button class="btn sm ghost" type="button" style="justify-content:flex-start" data-o="${o.id}" data-cp="${cp}">${I('file')} ${esc(boletaFilename(o, cp))} ${I('download')}</button>`).join('')}<button class="btn sm" type="button" data-open="${o.id}" style="align-self:flex-start">Ver detalle</button></div></details>`).join('')}</div>`
        : `<div class="empty"><b>Sin boletas</b>Cuando le hagas un pedido, aquí se crea una carpeta con fecha y número de boleta.</div>`}
    </div>`;
    $('#ceEdit').onclick = () => clientSheet(id);
    $$('[data-nb]', el).forEach(b => b.onclick = () => { newOrder(b.dataset.nb, pickClient({ id, ...c })); W.step = 'products'; render(); });
    $$('[data-o]', el).forEach(b => b.onclick = () => downloadBoleta({ id: b.dataset.o, ...Store.data.orders[b.dataset.o] }, b.dataset.cp));
    $$('[data-open]', el).forEach(b => b.onclick = () => orderSheet(b.dataset.open));
  }
};

/* ================= Productos ================= */
VIEWS.products = {
  render(el) {
    const cat = D.catalog(UI.prodBrand);
    const q = norm(UI.prodQ); const words = q.split(/\s+/).filter(Boolean);
    const needs = p => !p.p || /revisar/.test(p.n) || p.n.length < 6;
    let list = cat.filter(p => (!q || p.c.startsWith(q) || words.every(w => norm(p.n + ' ' + p.v).includes(w))) && (UI.prodOnly === 'all' || (UI.prodOnly === 'rev' ? needs(p) : p.m)));
    const rev = cat.filter(needs).length;
    const cyc = D.cycleOf(UI.prodBrand);
    el.innerHTML = `<div class="stack">
      <div><div class="h1">Productos</div><p class="muted small" style="margin:.2em 0 0">${cat.length} productos de ${BRANDS[UI.prodBrand]}${cyc ? ' · revista ciclo ' + cyc : ''}</p></div>
      <div class="row"><button class="btn" type="button" id="pUpd">${I('refresh')} Actualizar con revista digital</button><button class="btn pri" type="button" id="pAdd">${I('plus')} Nuevo producto</button></div>
      <div class="row">${segHTML('pB', [['natura', 'Natura'], ['avon', 'Avon']], UI.prodBrand)}${segHTML('pO', [['all', 'Todos'], ['rev', `Por revisar (${rev})`], ['man', 'Añadidos a mano']], UI.prodOnly)}</div>
      <input class="in" id="pQs" placeholder="Buscar por código o nombre" value="${esc(UI.prodQ)}">
      ${list.length ? `<div class="list">${list.slice(0, UI.prodLimit).map(p => `<div class="li" data-d="${p._doc}" data-i="${p._idx}" tabindex="0"><span class="mono small muted" style="min-width:56px">${esc(p.c || '—')}</span><div class="grow"><div class="t">${esc(p.n)}</div><div class="s">${p.v ? esc(p.v) + ' · ' : ''}${p.pt ? p.pt + ' pts · ' : ''}${p.pg ? 'pág. ' + p.pg : 'manual'}${p.r ? ' · regular ' + money(p.r) : ''}</div></div>${needs(p) ? '<span class="pill warn">Revisar</span>' : ''}<b class="num">${p.p ? money(p.p) : '—'}</b></div>`).join('')}</div>${list.length > UI.prodLimit ? `<button class="btn block" type="button" id="pMore">Ver más (${list.length - UI.prodLimit} restantes)</button>` : ''}`
        : `<div class="empty"><b>${cat.length ? 'Sin resultados' : 'Catálogo vacío'}</b>${cat.length ? 'Prueba con otro código o nombre.' : 'Pulsa “Actualizar con revista digital” y sube el PDF de la revista del ciclo.'}</div>`}
    </div>`;
    bindSeg('pB', v => { UI.prodBrand = v; UI.prodLimit = 80; render(); }); bindSeg('pO', v => { UI.prodOnly = v; UI.prodLimit = 80; render(); });
    $('#pQs').oninput = e => { UI.prodQ = e.target.value; UI.prodLimit = 80; clearTimeout(this.t); this.t = setTimeout(() => { render(); const i = $('#pQs'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 250); };
    if ($('#pMore')) $('#pMore').onclick = () => { UI.prodLimit += 200; render(); };
    $('#pAdd').onclick = () => productSheet(UI.prodBrand, null, null);
    $('#pUpd').onclick = () => updateCatalogSheet(UI.prodBrand);
    $$('.li', el).forEach(li => { li.onclick = () => productSheet(UI.prodBrand, li.dataset.d, +li.dataset.i); li.onkeydown = e => e.key === 'Enter' && li.click(); });
  }
};
function productSheet(brand, docId, idx) {
  const p = docId ? Store.data.catalog[docId].items[idx] : { c: '', n: '', v: '', p: '' };
  sheet(docId ? 'Editar producto' : 'Nuevo producto', `<form id="fP" class="stack">
    <div class="grid2"><label class="f">Código<input class="in mono" id="epC" value="${esc(p.c)}"></label><label class="f">Precio de venta (S/)<input class="in mono" id="epP" inputmode="decimal" value="${p.p || ''}" required></label></div>
    <label class="f">Nombre<input class="in" id="epN" value="${esc(/revisar/.test(p.n) ? '' : p.n)}" required></label>
    <div class="grid2"><label class="f">Tono / variante<input class="in" id="epV" value="${esc(p.v || '')}"></label><label class="f">Puntos<input class="in mono" id="epPt" inputmode="numeric" value="${p.pt || ''}"></label>
    <label class="f">Precio regular (S/)<input class="in mono" id="epR" inputmode="decimal" value="${p.r || ''}"></label>${p.pg ? `<div class="small muted" style="align-self:end">Sale en la página ${p.pg} de la revista</div>` : ''}</div>
    <div class="row">${docId ? `<button class="btn danger" type="button" id="epDel">${I('trash')} Quitar</button>` : ''}<div class="grow"></div><button class="btn pri" type="submit">Guardar</button></div></form>`, s => {
    $('#fP', s).onsubmit = async e => {
      e.preventDefault();
      const num = v => r2(parseFloat(String(v).replace(',', '.')) || 0);
      const row = { ...p, c: $('#epC').value.trim(), n: $('#epN').value.trim(), v: $('#epV').value.trim(), p: num($('#epP').value), ok: 1 };
      const pt = parseInt($('#epPt').value); if (pt) row.pt = pt; else delete row.pt;
      const rg = num($('#epR').value); if (rg) row.r = rg; else delete row.r;
      if (!docId) { await addManualToCatalog(brand, row); closeSheet(); toast('Producto añadido'); return; }
      const d = Store.data.catalog[docId]; const items = [...d.items]; items[idx] = row;
      if (await Store.set('catalog', docId, { ...d, items })) { closeSheet(); toast('Producto guardado'); }
    };
    if (docId) $('#epDel', s).onclick = async () => { const d = Store.data.catalog[docId]; const items = d.items.filter((_, i) => i !== idx); if (await Store.set('catalog', docId, { ...d, items })) { closeSheet(); toast('Producto quitado del catálogo'); } };
  });
}
/* --- actualizar catálogo desde la revista en PDF --- */
const MAGAZINE_LINKS = { natura: 'https://www.natura.com.pe', avon: 'https://www.avon.com.pe' };
function updateCatalogSheet(brand) {
  sheet('Actualizar con revista digital', `<div class="stack">
    <p class="small muted" style="margin:0">Descarga la revista del nuevo ciclo en PDF (desde la web de la marca o la que te envían) y súbela aquí. La app lee los códigos, nombres y precios y te muestra qué es nuevo, qué falta y qué cambió antes de aplicar nada.</p>
    <div class="row">${segHTML('ucB', [['natura', 'Natura'], ['avon', 'Avon']], brand)}<a class="btn sm ghost" id="ucLink" href="${MAGAZINE_LINKS[brand]}" target="_blank" rel="noopener">Abrir web de ${BRANDS[brand]} ↗</a></div>
    <div class="grid2"><label class="f">Ciclo<input class="in mono" id="ucCy" inputmode="numeric" value="${(D.cycleOf(brand) || 0) + 1}"></label><label class="f">Año<input class="in mono" id="ucY" inputmode="numeric" value="${new Date().getFullYear()}"></label></div>
    <div class="drop" id="ucDrop" tabindex="0">${I('upload').replace('<svg', '<svg style="width:28px;height:28px"')}<div><b>Elegir la revista en PDF</b></div><div class="small muted">Puede tardar un minuto: son más de 150 páginas</div></div>
    <div id="ucProg" hidden><div class="progress"><i id="ucBar"></i></div><p class="small muted" id="ucMsg" style="margin:6px 0 0"></p></div>
    <div id="ucRes"></div></div>`, s => {
    let br = brand;
    bindSeg('ucB', v => { br = v; $$('#ucB button').forEach(b => b.classList.toggle('on', b.dataset.v === v)); $('#ucLink').href = MAGAZINE_LINKS[v]; $('#ucLink').textContent = `Abrir web de ${BRANDS[v]} ↗`; $('#ucCy').value = (D.cycleOf(v) || 0) + 1; });
    const run = async () => {
      const file = await pickFile('application/pdf,.pdf'); if (!file) return;
      $('#ucProg').hidden = false; $('#ucRes').innerHTML = '';
      try {
        const prods = await parseMagazine(file, (i, n) => { $('#ucBar').style.width = (100 * i / n) + '%'; $('#ucMsg').textContent = `Leyendo página ${i} de ${n}…`; });
        $('#ucMsg').textContent = `Encontrados ${prods.length} productos en la revista.`;
        showDiff(br, prods, +$('#ucCy').value || null, +$('#ucY').value || null);
      } catch (e) { console.error(e); $('#ucMsg').textContent = 'No se pudo leer el PDF. Comprueba que es la revista en PDF (no una foto) e inténtalo otra vez.'; }
    };
    $('#ucDrop', s).onclick = run; $('#ucDrop', s).onkeydown = e => e.key === 'Enter' && run();
  });
}
async function parseMagazine(file, onProg) {
  if (!window.pdfjsLib) {
    await loadScript(LIBS.pdf);
    await loadScript(LIBS.pdfw);
  }
  const pdfjs = window.pdfjsLib;
  try { pdfjs.GlobalWorkerOptions.workerSrc = LIBS.pdfw; } catch { }
  const buf = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data: buf, disableWorker: true, isEvalSupported: false }).promise;
  const all = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const pg = await doc.getPage(i); const vp = pg.getViewport({ scale: 1 });
    const tc = await pg.getTextContent();
    const items = tc.items.filter(t => t.str !== undefined).map(t => ({ s: t.str, x: t.transform[4], y: vp.height - t.transform[5], w: t.width, h: Math.hypot(t.transform[2], t.transform[3]) || t.height }));
    all.push(...parseCatalogPage(items, i));
    pg.cleanup(); onProg(i, doc.numPages);
    if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
  }
  return mergeCatalog(all).map(p => ({ c: p.code, n: p.name || '(sin nombre – revisar)', v: p.variant || '', p: p.price || 0, r: p.regular || undefined, pt: p.pts || undefined, pg: p.page }));
}
function showDiff(brand, fresh, cycle, year) {
  const cur = D.catalog(brand).filter(p => !p.m);
  const byC = new Map(cur.map(p => [p.c, p]));
  const fC = new Map(fresh.map(p => [p.c, p]));
  const nuevos = fresh.filter(p => !byC.has(p.c));
  const faltan = cur.filter(p => !fC.has(p.c));
  const cambios = fresh.filter(p => byC.has(p.c) && Math.abs((byC.get(p.c).p || 0) - (p.p || 0)) > 0.009);
  const iguales = fresh.length - nuevos.length - cambios.length;
  const li = (arr, f) => arr.slice(0, 60).map(f).join('') + (arr.length > 60 ? `<div class="small muted" style="padding:6px 0">… y ${arr.length - 60} más</div>` : '');
  $('#ucRes').innerHTML = `<div class="stack">
    <div class="kpis"><div class="kpi"><div class="eyebrow">Nuevos</div><div class="v" style="color:var(--ok)">${nuevos.length}</div></div><div class="kpi"><div class="eyebrow">Ya no están</div><div class="v" style="color:var(--bad)">${faltan.length}</div></div><div class="kpi"><div class="eyebrow">Cambian de precio</div><div class="v" style="color:var(--warn)">${cambios.length}</div></div><div class="kpi"><div class="eyebrow">Iguales</div><div class="v">${iguales}</div></div></div>
    ${nuevos.length ? `<details><summary><b>Nuevos (${nuevos.length})</b></summary>${li(nuevos, p => `<div class="small" style="padding:3px 0"><span class="mono muted">${p.c}</span> ${esc(p.n)}${p.v ? ' · ' + esc(p.v) : ''} — ${money(p.p)}</div>`)}</details>` : ''}
    ${cambios.length ? `<details><summary><b>Cambios de precio (${cambios.length})</b></summary>${li(cambios, p => `<div class="small" style="padding:3px 0"><span class="mono muted">${p.c}</span> ${esc(byC.get(p.c).n)}: ${money(byC.get(p.c).p)} → <b>${money(p.p)}</b></div>`)}</details>` : ''}
    ${faltan.length ? `<details><summary><b>Ya no salen en la revista (${faltan.length})</b></summary>${li(faltan, p => `<div class="small" style="padding:3px 0"><span class="mono muted">${p.c}</span> ${esc(p.n)}</div>`)}</details>` : ''}
    <label class="row small" style="gap:8px"><input type="checkbox" id="ucRm" checked> Quitar del catálogo los que ya no salen</label>
    <label class="row small" style="gap:8px"><input type="checkbox" id="ucKeep" checked> Conservar los nombres que corregí a mano</label>
    <button class="btn pri block" type="button" id="ucApply">${I('check')} Aplicar cambios al catálogo</button></div>`;
  $('#ucApply').onclick = async e => {
    e.target.disabled = true;
    const keep = $('#ucKeep').checked, rm = $('#ucRm').checked;
    const merged = fresh.map(p => { const o = byC.get(p.c); return o && keep && o.ok ? { ...p, n: o.n, v: o.v } : p; });
    if (!rm) faltan.forEach(p => { const { _doc, _idx, brand: _b, ...rest } = p; merged.push(rest); });
    merged.forEach(p => Object.keys(p).forEach(k => p[k] === undefined && delete p[k]));
    const old = Object.keys(Store.data.catalog).filter(id => Store.data.catalog[id].brand === brand && !Store.data.catalog[id].manual);
    const chunks = []; for (let i = 0; i < merged.length; i += 300) chunks.push(merged.slice(i, i + 300));
    let ok = true;
    for (let k = 0; k < chunks.length; k++) ok = ok && await Store.set('catalog', `${brand}-${k}`, { brand, cycle, year, chunk: k, updatedAt: Date.now(), items: chunks[k] });
    for (const id of old) if (!chunks[+id.split('-')[1]]) await Store.del('catalog', id);
    if (ok) { closeSheet(); toast(`Catálogo de ${BRANDS[brand]} actualizado: ${merged.length} productos`); UI.prodBrand = brand; go('products'); }
    else e.target.disabled = false;
  };
}

/* ================= Histórico y reportes ================= */
function aggregate(rows) {
  const a = { t: 0, g: 0, gs: 0, pt: 0, q: 0, orders: new Set(), prod: {}, cli: {}, brand: { natura: 0, avon: 0, otra: 0 } };
  for (const r of rows) {
    a.t += r.t; a.g += r.g; a.gs += r.gs || 0; a.pt += r.pt || 0; a.q += r.q || 0;
    if (r.oid) a.orders.add(r.oid);
    const k = (r.c ? r.c + ' ' : '') + r.n;
    if (r.n || r.c) { const p = a.prod[k] || (a.prod[k] = { c: r.c, n: r.n, b: r.b, q: 0, t: 0 }); p.q += r.q || 0; p.t += r.t; }
    if (r.cl) { const c = a.cli[norm(r.cl)] || (a.cli[norm(r.cl)] = { n: r.cl, t: 0, q: 0 }); c.t += r.t; c.q += r.q || 0; }
    a.brand[r.b || 'otra'] += r.t;
  }
  return a;
}
VIEWS.reports = {
  render(el) {
    const rows = D.salesRows();
    const years = [...new Set(rows.map(r => +r.d.slice(0, 4)))].filter(Boolean).sort((a, b) => b - a);
    const cy = new Date().getFullYear();
    if (!years.includes(cy)) years.unshift(cy);
    if (!UI.repYear || !years.includes(UI.repYear)) UI.repYear = years.includes(cy) && rows.some(r => r.d.startsWith(cy)) ? cy : (years[0] || cy);
    const Y = UI.repYear, M = UI.repMonth;
    const inB = r => UI.repBrand === 'all' || r.b === UI.repBrand;
    const yRows = rows.filter(r => r.d.startsWith(String(Y)) && inB(r));
    const sel = M === 'all' ? yRows : yRows.filter(r => +r.d.slice(5, 7) === +M);
    const prevRows = M === 'all' ? rows.filter(r => r.d.startsWith(String(Y - 1)) && inB(r)) : rows.filter(r => r.d.startsWith(`${Y - 1}-${pad(M, 2)}`) && inB(r));
    const A = aggregate(sel), P = aggregate(prevRows);
    const delta = (a, b) => b ? `<span class="d" style="color:${a >= b ? 'var(--ok)' : 'var(--bad)'}">${a >= b ? '▲' : '▼'} ${Math.abs(Math.round((a - b) / b * 100))}% vs ${M === 'all' ? Y - 1 : MES3[M - 1] + ' ' + (Y - 1)}</span>` : `<span class="d">&nbsp;</span>`;
    const months = Array.from({ length: 12 }, (_, i) => aggregate(yRows.filter(r => +r.d.slice(5, 7) === i + 1)));
    const prods = Object.values(A.prod).sort((a, b) => b.q - a.q || b.t - a.t);
    const top = prods.slice(0, 10), low = prods.length > 10 ? prods.slice(-10).reverse() : [];
    const clis = Object.values(A.cli).sort((a, b) => b.t - a.t).slice(0, 8);
    const periodo = M === 'all' ? `año ${Y}` : `${MESES[M - 1]} ${Y}`;
    el.innerHTML = `<div class="stack" style="gap:16px">
      <div class="row"><div class="grow"><div class="h1">Histórico</div><p class="muted small" style="margin:.2em 0 0">Ventas de la app${Object.keys(Store.data.history).length ? ' + histórico importado de Excel' : ''} · ${periodo}</p></div>
        <button class="btn" type="button" id="rExp">${I('sheet')} Exportar a Excel</button></div>
      <div class="row"><label class="f" style="flex-direction:row;align-items:center;gap:8px">Año <select class="in" id="rY" style="width:auto;padding:8px 10px">${years.map(y => `<option ${y === Y ? 'selected' : ''}>${y}</option>`).join('')}</select></label>${segHTML('rB', [['all', 'Ambas'], ['natura', 'Natura'], ['avon', 'Avon']], UI.repBrand)}</div>
      <div style="overflow-x:auto">${segHTML('rM', [['all', 'Todo el año'], ...MES3.map((m, i) => [String(i + 1), m])], String(M))}</div>
      ${rows.length ? `
      <div class="kpis">
        <div class="kpi"><div class="eyebrow">Ventas</div><div class="v">${money(A.t)}</div>${delta(A.t, P.t)}</div>
        <div class="kpi"><div class="eyebrow">Ganancia</div><div class="v">${money(A.g - A.gs)}</div><span class="d">${A.gs ? 'descontados gastos ' + money(A.gs) : 'margen según Configuración'}</span></div>
        <div class="kpi"><div class="eyebrow">Puntos</div><div class="v">${Math.round(A.pt).toLocaleString('es-PE')}</div>${delta(A.pt, P.pt)}</div>
        <div class="kpi"><div class="eyebrow">Unidades vendidas</div><div class="v">${Math.round(A.q).toLocaleString('es-PE')}</div><span class="d">${A.orders.size ? A.orders.size + ' boletas · ticket medio ' + money(A.t / Math.max(1, A.orders.size)) : '&nbsp;'}</span></div>
      </div>
      <div class="card"><div class="row" style="margin-bottom:8px"><b class="grow">Ventas por mes · ${Y}</b><span class="small muted">Toca una barra para ver ese mes</span></div><div class="chart" id="rChart">${monthChart(months, M)}</div></div>
      <div class="grid2">
        <div class="card"><b>Más vendidos</b><p class="small muted" style="margin:.2em 0 10px">Por unidades · ${periodo}</p>${barsList(top, x => x.q, x => `${x.q} u · ${money(x.t)}`)}</div>
        <div class="card"><b>Menos vendidos</b><p class="small muted" style="margin:.2em 0 10px">Productos con pocas ventas: candidatos a impulsar</p>${low.length ? barsList(low, x => x.q, x => `${x.q} u · ${money(x.t)}`, top[0]?.q) : '<p class="small muted">Hace falta más variedad de ventas para comparar.</p>'}</div>
        <div class="card"><b>Mejores clientas</b><p class="small muted" style="margin:.2em 0 10px">Por importe · ${periodo}</p>${barsList(clis.map(c => ({ n: c.n, t: c.t, q: c.q })), x => x.t, x => money(x.t))}</div>
        <div class="card"><b>Por marca</b><p class="small muted" style="margin:.2em 0 10px">Reparto de ventas · ${periodo}</p>${barsList([{ n: 'Natura', t: A.brand.natura, col: 'var(--natura)' }, { n: 'Avon', t: A.brand.avon, col: 'var(--avon)' }, ...(A.brand.otra ? [{ n: 'Sin marca', t: A.brand.otra }] : [])], x => x.t, x => `${money(x.t)} · ${A.t ? Math.round(x.t / A.t * 100) : 0}%`)}</div>
      </div>` : `<div class="empty"><b>Aún no hay ventas</b>Los pedidos que aceptes aparecerán aquí. Para ver años anteriores, sube tu Excel en Configuración › Histórico de ventas.<div style="margin-top:12px"><button class="btn pri" type="button" onclick="go('settings',{sec:'hist'})">${I('upload')} Subir histórico</button></div></div>`}
    </div>`;
    $('#rY').onchange = e => { UI.repYear = +e.target.value; render(); };
    bindSeg('rB', v => { UI.repBrand = v; render(); });
    bindSeg('rM', v => { UI.repMonth = v === 'all' ? 'all' : +v; render(); });
    $$('#rChart [data-m]').forEach(b => { b.onclick = () => { UI.repMonth = UI.repMonth === +b.dataset.m ? 'all' : +b.dataset.m; render(); }; });
    chartTips();
    $('#rExp').onclick = () => exportSales(sel, periodo);
  }
};
function monthChart(months, M) {
  const W = 640, H = 230, padL = 56, padB = 28, padT = 14, cw = (W - padL - 8) / 12;
  const max = Math.max(1, ...months.map(m => m.t));
  const step = niceStep(max / 4); const top = Math.ceil(max / step) * step;
  const y = v => padT + (H - padT - padB) * (1 - v / top);
  let g = '';
  for (let v = 0; v <= top + 1e-9; v += step) g += `<line x1="${padL}" x2="${W - 8}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">${v >= 1000 ? (v / 1000).toLocaleString('es-PE') + ' mil' : v}</text>`;
  const bw = Math.min(30, cw - 10);
  months.forEach((m, i) => {
    const x = padL + cw * i + (cw - bw) / 2, h = y(0) - y(m.t), sel = M !== 'all' && +M === i + 1, dim = M !== 'all' && !sel;
    const r = Math.min(4, h / 2);
    if (m.t > 0) g += `<path d="M${x} ${y(0)}V${y(m.t) + r}Q${x} ${y(m.t)} ${x + r} ${y(m.t)}H${x + bw - r}Q${x + bw} ${y(m.t)} ${x + bw} ${y(m.t) + r}V${y(0)}Z" fill="var(--accent)" opacity="${dim ? 0.35 : 1}"/>`;
    g += `<text x="${padL + cw * i + cw / 2}" y="${H - 9}" text-anchor="middle" font-size="11" fill="${sel ? 'var(--fg)' : 'var(--muted)'}" font-weight="${sel ? 700 : 400}">${MES3[i]}</text>`;
    g += `<rect data-m="${i + 1}" data-tip="${MESES[i]}: ventas ${money(m.t)} · ganancia ${money(m.g - m.gs)} · ${Math.round(m.pt)} pts" x="${padL + cw * i}" y="${padT}" width="${cw}" height="${H - padT}" fill="transparent" style="cursor:pointer"><title>${MESES[i]}: ${money(m.t)}</title></rect>`;
  });
  g += `<line x1="${padL}" x2="${W - 8}" y1="${y(0)}" y2="${y(0)}" stroke="var(--muted)" stroke-width="1"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Ventas por mes">${g}</svg><div id="tip" class="pill" style="position:fixed;pointer-events:none;background:var(--fg);color:var(--bg);display:none;z-index:30"></div>`;
}
function chartTips() {
  const tip = $('#tip'); if (!tip) return;
  $$('#rChart [data-tip]').forEach(r => {
    r.onmousemove = e => { tip.textContent = r.dataset.tip; tip.style.display = 'block'; tip.style.left = Math.min(e.clientX + 12, innerWidth - tip.offsetWidth - 8) + 'px'; tip.style.top = (e.clientY - 36) + 'px'; };
    r.onmouseleave = () => tip.style.display = 'none';
  });
}
function niceStep(x) { const p = Math.pow(10, Math.floor(Math.log10(x || 1))); const f = x / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p; }
function barsList(arr, val, label, maxV) {
  if (!arr.length) return '<p class="small muted">Sin datos en este periodo.</p>';
  const mx = maxV || Math.max(1, ...arr.map(val));
  return `<div class="bars">${arr.map(x => `<div class="bar"><span class="nm">${x.c ? `<span class="mono muted small">${esc(x.c)}</span> ` : ''}${esc(x.n)}</span><span class="small num">${label(x)}</span><span class="track"><i style="width:${Math.max(2, val(x) / mx * 100)}%;${x.col ? 'background:' + x.col : ''}"></i></span></div>`).join('')}</div>`;
}
async function exportSales(rows, periodo) {
  if (!window.XLSX) return toast('Falta la librería de Excel. Revisa tu conexión y recarga.');
  const data = [['Fecha', 'Marca', 'Cliente', 'Código', 'Producto', 'Cantidad', 'Total venta', 'Ganancia', 'Gasto', 'Puntos', 'Origen', 'Boleta']]
    .concat(rows.sort((a, b) => a.d.localeCompare(b.d)).map(r => [r.d, BRANDS[r.b] || '', r.cl, r.c, r.n, r.q, r.t, r.g, r.gs || 0, r.pt, r.src === 'app' ? 'App' : 'Histórico', r.oid || '']));
  const wb = XLSX.utils.book_new(); const ws = XLSX.utils.aoa_to_sheet(data); ws['!cols'] = [10, 8, 24, 9, 40, 8, 11, 10, 8, 7, 10, 14].map(w => ({ wch: w }));
  XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
  const out = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  await saveFile(`ventas_${periodo.replace(/\s+/g, '_')}.xlsx`, new Blob([out]), 'Reportes');
}

/* ================= Configuración ================= */
VIEWS.settings = {
  render(el) {
    const cfg = Store.cfg, c = cfg.consultant || {}, th = lsGet('mt-theme') || 'system';
    const imports = {};
    Object.entries(Store.data.history).forEach(([id, h]) => { const k = h.importId || id; const i = imports[k] || (imports[k] = { file: h.file, at: h.importedAt, n: 0, ids: [], from: '9999', to: '0000' }); i.n += (h.rows || []).length; i.ids.push(id); (h.rows || []).forEach(r => { if (r[0] < i.from) i.from = r[0]; if (r[0] > i.to) i.to = r[0]; }); });
    el.innerHTML = `<div class="stack" style="gap:18px;max-width:760px">
      <div class="h1">Configuración</div>
      <section class="card stack"><b>Apariencia</b>${segHTML('sTh', [['light', 'Claro'], ['dark', 'Oscuro'], ['system', 'Automático']], th)}<span class="small muted">Se guarda en cada dispositivo.</span></section>

      <section class="card stack"><b>Datos de la consultora</b>
        <div class="photo-up"><div class="avatar" id="sPhoto">${c.photo ? `<img src="${esc(c.photo)}" alt="">` : esc((c.name || 'C').charAt(0))}</div><div class="stack" style="gap:6px"><button class="btn sm" type="button" id="sPhotoUp">${I('upload')} Subir foto</button>${c.photo ? '<button class="btn sm ghost" type="button" id="sPhotoDel">Quitar foto</button>' : ''}</div></div>
        <form id="fCons" class="stack">
          <div class="grid2"><label class="f">Nombre<input class="in" id="scName" value="${esc(c.name || '')}"></label><label class="f">Código de consultora<input class="in mono" id="scCode" value="${esc(c.code || '')}" disabled></label>
          <label class="f">Celular<input class="in" id="scPhone" inputmode="tel" value="${esc(c.phone || '')}"></label><label class="f">Correo<input class="in" id="scMail" type="email" value="${esc(c.email || '')}"></label>
          <label class="f">DNI / RUC<input class="in mono" id="scDoc" value="${esc(c.doc || '')}"></label><label class="f">Distrito / ciudad<input class="in" id="scCity" value="${esc(c.city || '')}"></label></div>
          <button class="btn pri" type="submit" style="align-self:flex-start">Guardar datos</button></form></section>

      <section class="card stack"><b>Boletas y ganancias</b>
        <form id="fBiz" class="grid2">
          <label class="f">Serie de boleta<input class="in mono" id="sbSerie" value="${esc(cfg.serie || 'B001')}" maxlength="6"></label>
          <label class="f">IGV (%)<input class="in mono" id="sbIgv" inputmode="decimal" value="${cfg.igv ?? 18}"></label>
          <label class="f">Ganancia Natura (% sobre precio de venta)<input class="in mono" id="sbMn" inputmode="decimal" value="${cfg.margins?.natura ?? 30}"></label>
          <label class="f">Ganancia Avon (% sobre precio de venta)<input class="in mono" id="sbMa" inputmode="decimal" value="${cfg.margins?.avon ?? 30}"></label>
          <button class="btn pri" type="submit" style="align-self:end">Guardar</button></form>
        <span class="small muted">La próxima boleta será <b class="mono">${esc(D.nextBoleta())}</b>.</span></section>

      <section class="card stack" id="secHist"><b>Histórico de ventas (Excel)</b>
        <p class="small muted" style="margin:0">Adjunta tu Excel con las ventas anteriores. La app reconoce las columnas (fecha, clienta, código, producto, cantidad, precio, total, costo, ganancia, gasto, puntos, marca) y las suma al Histórico por año y mes.</p>
        <div class="row"><button class="btn pri" type="button" id="sImp">${I('upload')} Adjuntar archivo Excel</button><button class="btn" type="button" id="sTpl">${I('download')} Descargar plantilla</button></div>
        ${Object.keys(imports).length ? `<div class="list">${Object.entries(imports).map(([k, i]) => `<div class="li" style="cursor:default">${I('sheet').replace('<svg', '<svg style="width:20px;color:var(--ok);flex:none"')}<div class="grow"><div class="t">${esc(i.file || 'Excel')}</div><div class="s">${i.n} filas · ${fechaCorta(i.from)} – ${fechaCorta(i.to)} · subido ${new Date(i.at || 0).toLocaleDateString('es-PE')}</div></div><button class="btn sm danger" type="button" data-rmimp="${k}">${I('trash')}</button></div>`).join('')}</div>` : ''}
      </section>

      <section class="card stack"><b>Seguridad</b>
        <div class="row"><button class="btn" type="button" id="sPass">${I('lock')} Cambiar clave</button><button class="btn" type="button" id="sPin">${cfg.auth?.pinHash ? 'Cambiar PIN' : 'Crear PIN numérico'}</button>${cfg.auth?.pinHash ? '<button class="btn ghost" type="button" id="sPinDel">Quitar PIN</button>' : ''}<button class="btn ghost" type="button" id="sLock">${I('lock')} Bloquear ahora</button>${FB() ? `<button class="btn ghost" type="button" id="sOut">${I('logout')} Cerrar sesión</button>` : ''}</div>
        <span class="small muted">El PIN sirve para entrar rápido en los dispositivos que marcaste como “recordar”.</span></section>

      <section class="card stack"><b>Celular y computadora</b>
        <p class="small muted" style="margin:0">${Store.mode === 'cloud' || Store.mode === 'firebase' ? 'Los datos se guardan en la nube y se sincronizan solos: lo que haces en el celular aparece en la computadora en segundos, y al revés. Abre este mismo enlace en los dos dispositivos.' : (TARGET === 'native' ? 'Modo demostración: falta pegar la configuración de Firebase (ver LEEME). Los datos se guardan solo en este dispositivo.' : 'Este dispositivo no está sincronizando: abre la app desde su enlace de claude.ai para que los datos se compartan entre celular y computadora.')}</p>
        <div class="row"><button class="btn" type="button" id="sBk">${I('download')} Copia de seguridad (JSON)</button><button class="btn" type="button" id="sRs">${I('upload')} Restaurar copia</button></div></section>
      <p class="legal">App personal de gestión de la consultora. No es una app oficial de Natura ni de Avon; los logos identifican la marca de cada pedido.</p>
    </div>`;
    if (App.params.sec === 'hist') { setTimeout(() => $('#secHist')?.scrollIntoView({ behavior: 'smooth' }), 50); App.params.sec = null; }
    bindSeg('sTh', v => { lsSet('mt-theme', v); applyTheme(); render(); });
    $('#sPhotoUp').onclick = async () => {
      const f = await pickFile('image/*'); if (!f) return;
      const url = await resizeImage(f, 320);
      if (await Store.set('config', 'main', { ...Store.cfg, consultant: { ...(Store.cfg.consultant || {}), photo: url } })) toast('Foto guardada');
    };
    if ($('#sPhotoDel')) $('#sPhotoDel').onclick = async () => { const cs = { ...(Store.cfg.consultant || {}) }; delete cs.photo; await Store.set('config', 'main', { ...Store.cfg, consultant: cs }); };
    $('#fCons').onsubmit = async e => { e.preventDefault(); if (await Store.set('config', 'main', { ...Store.cfg, consultant: { ...(Store.cfg.consultant || {}), name: $('#scName').value.trim(), phone: $('#scPhone').value.trim(), email: $('#scMail').value.trim(), doc: $('#scDoc').value.trim(), city: $('#scCity').value.trim() } })) toast('Datos guardados'); };
    $('#fBiz').onsubmit = async e => { e.preventDefault(); const n = v => parseFloat(String(v).replace(',', '.')); if (await Store.set('config', 'main', { ...Store.cfg, serie: ($('#sbSerie').value.trim() || 'B001').toUpperCase(), igv: n($('#sbIgv').value) || 0, margins: { natura: n($('#sbMn').value) || 0, avon: n($('#sbMa').value) || 0 } })) toast('Guardado'); };
    $('#sImp').onclick = importHistory;
    $('#sTpl').onclick = downloadTemplate;
    $$('[data-rmimp]', el).forEach(b => b.onclick = () => confirmSheet('Borrar importación', `Se quitarán ${imports[b.dataset.rmimp].n} filas del histórico.`, 'Borrar', async () => { for (const id of imports[b.dataset.rmimp].ids) await Store.del('history', id); toast('Importación borrada'); }));
    $('#sPass').onclick = changePassSheet;
    $('#sPin').onclick = pinSheet;
    if ($('#sPinDel')) $('#sPinDel').onclick = async () => { const a = { ...Store.cfg.auth }; delete a.pinHash; delete a.pinLen; await Store.set('config', 'main', { ...Store.cfg, auth: a }); toast('PIN quitado'); };
    $('#sLock').onclick = lockApp;
    if ($('#sOut')) $('#sOut').onclick = () => confirmSheet('Cerrar sesión', 'Para volver a entrar en este dispositivo necesitarás tu código y tu clave.', 'Cerrar sesión', async () => { ssSet('mt-session', null); await Store.auth.signOut(); }, false);
    $('#sRs').onclick = async () => {
      const f = await pickFile('application/json,.json'); if (!f) return;
      let data; try { data = JSON.parse(await f.text()); } catch { return toast('Ese archivo no es una copia de seguridad válida.'); }
      if (!data || !data.clients || !data.orders) return toast('Ese archivo no es una copia de seguridad de esta app.');
      const n = Object.keys(data.clients).length, m = Object.keys(data.orders).length;
      confirmSheet('Restaurar copia', `Se añadirán ${n} clientas, ${m} boletas, el catálogo y el histórico de la copia del ${esc((data.exportedAt || '').slice(0, 10))}. Lo que ya tienes con el mismo código se reemplaza.`, 'Restaurar', async () => {
        let k = 0;
        for (const col of ['clients', 'orders', 'catalog', 'history']) for (const [id, d] of Object.entries(data[col] || {})) { await Store.set(col, id, d); if (++k % 40 === 0) await new Promise(r => setTimeout(r, 300)); }
        if (data.config) { const { auth, ...rest } = data.config; await Store.set('config', 'main', { ...rest, consultant: { ...(rest.consultant || {}), ...(Store.cfg.consultant?.code ? { code: Store.cfg.consultant.code } : {}) }, auth: Store.cfg.auth || {} }); }
        toast(`Copia restaurada: ${k} registros`, 4000);
      }, false);
    };
    $('#sBk').onclick = async () => { const { auth, ...cfgSafe } = Store.cfg; const data = { exportedAt: new Date().toISOString(), config: cfgSafe, clients: Store.data.clients, orders: Store.data.orders, catalog: Store.data.catalog, history: Store.data.history }; await saveFile(`copia_seguridad_${todayISO()}.json`, new Blob([JSON.stringify(data)], { type: 'application/json' }), 'Copias'); };
  }
};
function resizeImage(file, max) {
  return new Promise((res, rej) => {
    const img = new Image(); img.onload = () => {
      const side = Math.min(img.width, img.height);
      const cv = document.createElement('canvas');
      const sz = Math.min(max, side); cv.width = cv.height = sz;
      cv.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, sz, sz);
      res(cv.toDataURL('image/jpeg', 0.82)); URL.revokeObjectURL(img.src);
    }; img.onerror = rej; img.src = URL.createObjectURL(file);
  });
}
function changePassSheet() {
  sheet('Cambiar clave', `<form id="fPw" class="stack"><label class="f">Clave actual<input class="in" type="password" id="pwOld" required></label><label class="f">Nueva clave (6 a 8 caracteres)<input class="in" type="password" id="pwNew" minlength="6" maxlength="8" required></label><label class="f">Repite la nueva clave<input class="in" type="password" id="pwNew2" minlength="6" maxlength="8" required></label><p class="small" id="pwErr" style="color:var(--bad);margin:0" hidden></p><button class="btn pri" type="submit">Cambiar clave</button></form>`, s => {
    $('#fPw', s).onsubmit = async e => {
      e.preventDefault(); const code = Store.cfg.consultant?.code || '';
      const err = m => { $('#pwErr').textContent = m; $('#pwErr').hidden = false; };
      if (FB()) {
        const n = $('#pwNew').value; if (n.length < 6 || n.length > 8) return err('La clave debe tener entre 6 y 8 caracteres.'); if (n !== $('#pwNew2').value) return err('Las claves nuevas no coinciden.');
        try { const u = Store.auth.currentUser; await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, $('#pwOld').value)); await u.updatePassword(n); closeSheet(); toast('Clave cambiada'); }
        catch (ex) { err(ex.code === 'auth/wrong-password' || ex.code === 'auth/invalid-credential' ? 'La clave actual no es correcta.' : FB_ERR(ex.code)); }
        return;
      }
      if (await authHash(code, $('#pwOld').value) !== Store.cfg.auth.hash) return err('La clave actual no es correcta.');
      const n = $('#pwNew').value; if (n.length < 6 || n.length > 8) return err('La clave debe tener entre 6 y 8 caracteres.'); if (n !== $('#pwNew2').value) return err('Las claves nuevas no coinciden.');
      const hash = await authHash(code, n);
      if (await Store.set('config', 'main', { ...Store.cfg, auth: { hash } })) { ssSet('mt-session', hash); if (lsGet('mt-trust')) lsSet('mt-trust', hash); closeSheet(); toast('Clave cambiada. Si tenías PIN, vuelve a crearlo.', 4000); }
    };
  });
}
function pinSheet() {
  sheet('PIN numérico', `<form id="fPin" class="stack"><p class="small muted" style="margin:0">De 4 a 6 números. Lo usarás en este dispositivo y en los que marques como “recordar”.</p><label class="f">Nuevo PIN<input class="in mono" id="pinA" inputmode="numeric" pattern="[0-9]{4,6}" maxlength="6" required type="password"></label><label class="f">Repite el PIN<input class="in mono" id="pinB" inputmode="numeric" maxlength="6" required type="password"></label><p class="small" id="pinErr" style="color:var(--bad);margin:0" hidden></p><button class="btn pri" type="submit">Guardar PIN</button></form>`, s => {
    $('#fPin', s).onsubmit = async e => {
      e.preventDefault(); const a = $('#pinA').value, b = $('#pinB').value; const err = m => { $('#pinErr').textContent = m; $('#pinErr').hidden = false; };
      if (!/^\d{4,6}$/.test(a)) return err('El PIN debe tener de 4 a 6 números.'); if (a !== b) return err('Los PIN no coinciden.');
      const auth = { ...(Store.cfg.auth || {}), pinHash: await sha('pin|' + a + '|' + sessKey()), pinLen: a.length };
      if (await Store.set('config', 'main', { ...Store.cfg, auth })) { if (!FB()) lsSet('mt-trust', auth.hash); ssSet('mt-session', sessKey()); closeSheet(); toast('PIN guardado'); }
    };
  });
}

/* --- importar histórico desde Excel --- */
const HFIELDS = [
  ['fecha', 'Fecha', ['fecha', 'date', 'dia']], ['anio', 'Año', ['ano', 'anio', 'year']], ['mes', 'Mes', ['mes', 'month']],
  ['marca', 'Marca', ['marca', 'brand', 'empresa']], ['cliente', 'Clienta', ['cliente', 'clienta', 'nombre cliente', 'comprador']],
  ['codigo', 'Código', ['codigo', 'cod', 'sku', 'ref']], ['producto', 'Producto', ['producto', 'descripcion', 'articulo', 'concepto', 'item']],
  ['cantidad', 'Cantidad', ['cantidad', 'cant', 'unidades', 'qty']], ['precio', 'Precio unitario', ['precio unit', 'precio', 'p.u', 'pu', 'valor unit']],
  ['total', 'Total venta', ['total', 'importe', 'venta', 'monto', 'subtotal']], ['costo', 'Costo', ['costo', 'precio consultora', 'compra', 'pago a']],
  ['ganancia', 'Ganancia', ['ganancia', 'utilidad', 'beneficio', 'margen']], ['gasto', 'Gasto', ['gasto', 'egreso']], ['puntos', 'Puntos', ['puntos', 'pts', 'points']],
];
function guessMap(headers) {
  const map = {}; const used = new Set();
  for (const [key, , syn] of HFIELDS) {
    let best = -1;
    headers.forEach((h, i) => { if (used.has(i)) return; const n = norm(h); if (!n) return; if (best < 0 && syn.some(s => n === s || n.startsWith(s) || n.includes(s))) best = i; });
    if (best >= 0) { map[key] = best; used.add(best); }
  }
  return map;
}
function toISO(v, anio, mes) {
  if (v instanceof Date && !isNaN(v)) return v.getFullYear() + '-' + pad(v.getMonth() + 1, 2) + '-' + pad(v.getDate(), 2);
  if (typeof v === 'number' && v > 20000 && v < 80000) { const d = XLSX.SSF.parse_date_code(v); return d.y + '-' + pad(d.m, 2) + '-' + pad(d.d, 2); }
  const s = String(v ?? '').trim();
  let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/); if (m) return m[1] + '-' + pad(m[2], 2) + '-' + pad(m[3], 2);
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/); if (m) { const y = m[3].length === 2 ? '20' + m[3] : m[3]; return y + '-' + pad(m[2], 2) + '-' + pad(m[1], 2); }
  m = s.match(/^(\d{1,2})[-/.](\d{4})$/); if (m) return m[2] + '-' + pad(m[1], 2) + '-01';
  if (anio) {
    let mm = parseInt(mes); if (!mm) { const k = MESES.findIndex(x => norm(mes).startsWith(x.slice(0, 3))); mm = k + 1; }
    if (mm >= 1 && mm <= 12) return String(parseInt(anio)) + '-' + pad(mm, 2) + '-01';
  }
  return null;
}
const toNum = v => { if (typeof v === 'number') return v; const s = String(v ?? '').replace(/s\/|\s/gi, '').replace(/,(?=\d{3}\b)/g, ''); const n = parseFloat(s.replace(',', '.')); return isNaN(n) ? null : n; };
async function importHistory() {
  if (!window.XLSX) return toast('Falta la librería de Excel. Revisa tu conexión y recarga.');
  const f = await pickFile('.xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); if (!f) return;
  let wb; try { wb = XLSX.read(await f.arrayBuffer(), { cellDates: true }); } catch { return toast('No se pudo abrir el archivo. Usa un Excel .xlsx, .xls o .csv.'); }
  const sheets = wb.SheetNames;
  const prep = name => {
    const aoa = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, raw: true, defval: '' });
    let hr = 0, bestN = -1;
    for (let i = 0; i < Math.min(15, aoa.length); i++) { const n = Object.keys(guessMap(aoa[i].map(String))).length; if (n > bestN) { bestN = n; hr = i; } }
    return { aoa, hr, headers: (aoa[hr] || []).map(h => String(h).trim()) };
  };
  let cur = prep(sheets[0]);
  let map = guessMap(cur.headers);
  const ui = () => {
    const opts = sel => `<option value="">— no usar —</option>` + cur.headers.map((h, i) => `<option value="${i}" ${sel === i ? 'selected' : ''}>${esc(h || 'Columna ' + (i + 1))}</option>`).join('');
    const rowsPrev = buildRows(cur, map, 6);
    return `<p class="small muted" style="margin:0"><b>${esc(f.name)}</b> · ${cur.aoa.length - cur.hr - 1} filas. Revisa que cada dato apunte a la columna correcta.</p>
      ${sheets.length > 1 ? `<label class="f">Hoja<select class="in" id="hSheet">${sheets.map(s => `<option>${esc(s)}</option>`).join('')}</select></label>` : ''}
      <div class="grid-sm">${HFIELDS.map(([k, l]) => `<label class="f">${l}${k === 'fecha' ? ' *' : ''}<select class="in" data-k="${k}">${opts(map[k])}</select></label>`).join('')}</div>
      <div class="eyebrow">Vista previa</div>
      <div class="tablewrap"><table class="t"><thead><tr><th>Fecha</th><th>Marca</th><th>Clienta</th><th>Producto</th><th class="r">Cant.</th><th class="r">Total</th></tr></thead><tbody>${rowsPrev.ok.map(r => `<tr><td class="num">${fechaCorta(r[0])}</td><td>${BRANDS[r[1]] || ''}</td><td>${esc(r[2] || '')}</td><td>${esc((r[3] ? r[3] + ' ' : '') + (r[4] || ''))}</td><td class="r">${r[5] ?? ''}</td><td class="r">${r[7] != null ? money(r[7]) : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Ninguna fila tiene una fecha reconocible. Elige la columna de Fecha (o Año y Mes).</td></tr>'}</tbody></table></div>
      <label class="f">Marca para filas sin marca<select class="in" id="hDefB"><option value="">Sin marca</option><option value="natura">Natura</option><option value="avon">Avon</option></select></label>
      <button class="btn pri block" type="button" id="hGo">${I('check')} Importar ${buildRows(cur, map).ok.length} filas</button>`;
  };
  const s = sheet('Importar histórico', `<div class="stack" id="hBox">${ui()}</div>`);
  const bind = () => {
    $$('[data-k]', s).forEach(x => x.onchange = () => { map[x.dataset.k] = x.value === '' ? undefined : +x.value; $('#hBox').innerHTML = ui(); bind(); });
    if ($('#hSheet')) $('#hSheet').onchange = e => { cur = prep(e.target.value); map = guessMap(cur.headers); $('#hBox').innerHTML = ui(); $('#hSheet').value = e.target.value; bind(); };
    $('#hGo').onclick = async e => {
      e.target.disabled = true;
      const defB = $('#hDefB').value;
      const { ok, bad } = buildRows(cur, map);
      ok.forEach(r => { if (!r[1]) r[1] = defB; });
      if (!ok.length) { e.target.disabled = false; return toast('No hay filas con fecha válida para importar.'); }
      const impId = 'imp-' + Date.now().toString(36);
      const parts = Math.ceil(ok.length / 600);
      let good = true;
      for (let k = 0; k < parts && good; k++) good = await Store.set('history', `${impId}-${k}`, { importId: impId, file: f.name, importedAt: Date.now(), part: k, parts, rows: ok.slice(k * 600, k * 600 + 600) });
      if (good) { closeSheet(); toast(`Importadas ${ok.length} filas${bad ? ` (${bad} sin fecha se omitieron)` : ''}`, 4500); }
      else e.target.disabled = false;
    };
  };
  bind();
}
function buildRows(cur, map, limit) {
  const g = (row, k) => map[k] == null ? '' : row[map[k]];
  const ok = []; let bad = 0;
  for (let i = cur.hr + 1; i < cur.aoa.length; i++) {
    const row = cur.aoa[i]; if (!row || row.every(v => v === '' || v == null)) continue;
    const d = toISO(g(row, 'fecha'), g(row, 'anio'), g(row, 'mes'));
    if (!d) { bad++; continue; }
    const mb = norm(g(row, 'marca')); const b = mb.includes('avon') ? 'avon' : mb.includes('natura') ? 'natura' : '';
    const q = toNum(g(row, 'cantidad')), p = toNum(g(row, 'precio')); let t = toNum(g(row, 'total'));
    if (t == null && q != null && p != null) t = r2(q * p);
    ok.push([d, b, String(g(row, 'cliente') || '').trim(), String(g(row, 'codigo') || '').trim(), String(g(row, 'producto') || '').trim(), q ?? (t != null ? 1 : 0), p, t ?? 0, toNum(g(row, 'costo')), toNum(g(row, 'ganancia')), toNum(g(row, 'gasto')), toNum(g(row, 'puntos'))]);
    if (limit && ok.length >= limit) break;
  }
  return { ok, bad };
}
async function downloadTemplate() {
  if (!window.XLSX) return toast('Falta la librería de Excel.');
  const data = [['Fecha', 'Marca', 'Cliente', 'Código', 'Producto', 'Cantidad', 'Precio unitario', 'Total venta', 'Costo', 'Ganancia', 'Gasto', 'Puntos'],
  ['15/03/2025', 'Natura', 'EJEMPLO – María López', '135068', 'EJEMPLO – Natura Homem elo 100 ml', 1, 94.9, 94.9, 66.43, 28.47, '', 29],
  ['20/03/2025', 'Avon', 'EJEMPLO – Rosa Díaz', '146104', 'EJEMPLO – Power Stay Labial Líquido Mate', 2, 25.9, 51.8, '', '', '', 16],
  ['31/03/2025', '', '', '', 'EJEMPLO – Envío de pedidos (gasto)', '', '', 0, '', '', 12, '']];
  const wb = XLSX.utils.book_new(); const ws = XLSX.utils.aoa_to_sheet(data); ws['!cols'] = [12, 9, 24, 9, 40, 9, 14, 12, 9, 10, 8, 8].map(w => ({ wch: w }));
  XLSX.utils.book_append_sheet(wb, ws, 'Histórico');
  await saveFile('plantilla_historico_ventas.xlsx', new Blob([XLSX.write(wb, { type: 'array', bookType: 'xlsx' })]));
}

/* ================= arranque ================= */
if (isNative() && window.Capacitor.Plugins.App) {
  window.Capacitor.Plugins.App.addListener('backButton', () => {
    if ($('.sheet-back')) return closeSheet();
    if (App.view === 'order') { const i = STEPS.indexOf(W.step); if (i > 0 && W.step !== 'done') { W.step = STEPS[i - 1]; return render(); } return go('home'); }
    if (App.view === 'client') return go('clients');
    if (!['home', 'pin', 'fblogin', 'login', 'setup'].includes(App.view) && !document.body.classList.contains('locked')) return go('home');
    window.Capacitor.Plugins.App.exitApp();
  });
}
if (TARGET === 'native' && 'serviceWorker' in navigator && !isNative() && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
Store.init();

