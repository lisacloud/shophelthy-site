/* ============================================================================
   Helthy Design Playground — SHELL / chassis logic
   ----------------------------------------------------------------------------
   Owns: language switching, surface switching, the live token control panel,
   "Save this look" (modern-screenshot -> Supabase, localStorage fallback), the
   portfolio + exports, theme toggle. Tiles are spliced in at assembly; this
   file only ever drives the --pg-* contract on :root and the stage placeholders.
   ========================================================================== */
(() => {
  'use strict';

  /* ----------------------------------------------------------------------
     CONFIG
     ---------------------------------------------------------------------- */
  const SB_URL = 'https://xnfobhzhczzviuhivimo.supabase.co/rest/v1';
  const SB_KEY = 'sb_publishable_xnjjsu1dnc8HOrFbHiMGig_XTwjP_bT';
  const PICKS_KEY = 'helthy_pg_picks_v1';
  const SEED_FLAG = 'helthy_pg_seeded_v1';
  const THEME_KEY = 'helthy_pg_theme';

  const root = document.documentElement;
  const shell = document.querySelector('.pg-shell');
  const stage = document.getElementById('pg-stage');

  /* ----------------------------------------------------------------------
     TOKEN CONTRACT (SPEC §1)
     ---------------------------------------------------------------------- */
  // Color pickers: [cssVar, label, group]  (group: 'palette' | 'trio')
  const COLOR_TOKENS = [
    ['--pg-primary',  'Brand',       'palette'],
    ['--pg-accent',   'Accent',      'palette'],
    ['--pg-surface',  'Surface',     'palette'],
    ['--pg-bg',       'Background',  'palette'],
    ['--pg-ink',      'Text',        'palette'],
    ['--pg-ink-soft', 'Text soft',   'palette'],
    ['--pg-good',     'Good',        'trio'],
    ['--pg-ok',       'Ok',          'trio'],
    ['--pg-avoid',    'Avoid',       'trio'],
  ];
  // Tokens that the dark-theme stylesheet re-defines; if the user hasn't
  // explicitly touched them we let the theme drive them (clear the override).
  const THEME_DRIVEN = new Set(['--pg-bg', '--pg-surface', '--pg-ink', '--pg-ink-soft']);

  const FONT_TOKENS = ['--pg-font-head', '--pg-font-body'];

  // [cssVar, label, min, max, step, unit]
  const SLIDER_TOKENS = [
    ['--pg-radius',    'Corner radius', 0,   40,  1,    'px'],
    ['--pg-elevation', 'Elevation',     0,   2,   0.05, '×'],
    ['--pg-blur',      'Glass blur',    0,   40,  1,    'px'],
    ['--pg-density',   'Density',       0.8, 1.3, 0.01, '×'],
  ];

  const ALL_TOKENS = [
    ...COLOR_TOKENS.map(t => t[0]),
    ...FONT_TOKENS,
    ...SLIDER_TOKENS.map(t => t[0]),
  ];

  /* Which sliders each language actually CONSUMES (verified 2026-06-28 by
     grepping `var(--…)` usage in every tile.css). A slider only renders for a
     language whose tile reads that token — e.g. --pg-blur is read ONLY by
     glassmorphic, so "Glass blur" no longer shows up as a dead control on the
     other five tiles. radius / elevation / density are read by all six. */
  const TILE_SLIDERS = {
    'claymorphic':         ['--pg-radius', '--pg-elevation', '--pg-density'],
    'glassmorphic':        ['--pg-radius', '--pg-elevation', '--pg-blur', '--pg-density'],
    'neumorphic':          ['--pg-radius', '--pg-elevation', '--pg-density'],
    'material-expressive': ['--pg-radius', '--pg-elevation', '--pg-density'],
    'editorial':           ['--pg-radius', '--pg-elevation', '--pg-density'],
    'organic-bento':       ['--pg-radius', '--pg-elevation', '--pg-density'],
  };

  /* Section -> the tokens its per-section "reset" clears, plus a friendly label. */
  const SECTION_TOKENS = {
    palette: COLOR_TOKENS.filter(t => t[2] === 'palette').map(t => t[0]),
    trio:    COLOR_TOKENS.filter(t => t[2] === 'trio').map(t => t[0]),
    type:    [...FONT_TOKENS],
    shape:   SLIDER_TOKENS.map(t => t[0]),
  };
  const SECTION_LABEL = { palette: 'palette', trio: 'score colors', type: 'type', shape: 'shape & feel' };

  /* ----------------------------------------------------------------------
     FONT SHORTLIST (curated Google Fonts) — loaded lazily on pick.
     ---------------------------------------------------------------------- */
  // family -> { spec: google css2 family param, stack fallback, role }
  const FONTS = {
    // serif / display
    'Fraunces':         { spec: 'Fraunces:opsz,wght@9..144,400;9..144,600', fb: 'Georgia, serif' },
    'Playfair Display': { spec: 'Playfair+Display:wght@400;600;700',        fb: 'Georgia, serif' },
    'DM Serif Display': { spec: 'DM+Serif+Display',                         fb: 'Georgia, serif' },
    'Spectral':         { spec: 'Spectral:wght@400;500;600',                fb: 'Georgia, serif' },
    'Instrument Serif': { spec: 'Instrument+Serif',                         fb: 'Georgia, serif' },
    'Lora':             { spec: 'Lora:wght@400;500;600',                    fb: 'Georgia, serif' },
    // sans / grotesk
    'Inter':            { spec: 'Inter:wght@400;500;600;700',               fb: 'system-ui, sans-serif' },
    'Space Grotesk':    { spec: 'Space+Grotesk:wght@400;500;600;700',       fb: 'system-ui, sans-serif' },
    'Sora':             { spec: 'Sora:wght@400;500;600;700',                fb: 'system-ui, sans-serif' },
    'Outfit':           { spec: 'Outfit:wght@400;500;600;700',              fb: 'system-ui, sans-serif' },
    'DM Sans':          { spec: 'DM+Sans:wght@400;500;700',                 fb: 'system-ui, sans-serif' },
    'Work Sans':        { spec: 'Work+Sans:wght@400;500;600',               fb: 'system-ui, sans-serif' },
    'IBM Plex Sans':    { spec: 'IBM+Plex+Sans:wght@400;500;600',           fb: 'system-ui, sans-serif' },
    'Manrope':          { spec: 'Manrope:wght@400;500;600;700',             fb: 'system-ui, sans-serif' },
    'Nunito':           { spec: 'Nunito:wght@400;600;700',                  fb: 'system-ui, sans-serif' },
    // rounded / friendly (suits clay / bento)
    'Baloo 2':          { spec: 'Baloo+2:wght@400;500;600;700',             fb: 'system-ui, sans-serif' },
    'Quicksand':        { spec: 'Quicksand:wght@400;500;600;700',           fb: 'system-ui, sans-serif' },
    'Fredoka':          { spec: 'Fredoka:wght@400;500;600',                 fb: 'system-ui, sans-serif' },
    // expressive / display
    'Bricolage Grotesque': { spec: 'Bricolage+Grotesque:wght@400;600;700',  fb: 'system-ui, sans-serif' },
    'Clash-ish (Syne)': { spec: 'Syne:wght@400;600;700',                    fb: 'system-ui, sans-serif' },
  };
  const loadedFonts = new Set();

  function ensureFont(family) {
    if (!family || loadedFonts.has(family) || !FONTS[family]) return;
    loadedFonts.add(family);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${FONTS[family].spec}&display=swap`;
    document.head.appendChild(link);
  }
  function fontStack(family) {
    const f = FONTS[family];
    return f ? `"${family}", ${f.fb}` : family;
  }
  // best-effort: parse the leading family name out of a var stack value
  function familyOf(stack) {
    const m = String(stack).match(/^\s*["']?([^"',]+)["']?/);
    return m ? m[1].trim() : '';
  }

  /* Per-language display faces. The tile assembler fills this from each tile's
     manifest; left empty so the shell never asserts an unverified face. When a
     language has a registered face it appears as a pinned option in the picker. */
  const TILE_DISPLAY_FACES = {
    'claymorphic': null,
    'glassmorphic': null,
    'neumorphic': null,
    'material-expressive': null,
    'editorial': null,
    'organic-bento': null,
  };

  /* ----------------------------------------------------------------------
     STATE
     ---------------------------------------------------------------------- */
  let activeLang = 'claymorphic';
  let activeSurface = 'app';
  const touched = new Set(); // which --pg-* vars the user has explicitly set
  const overrides = new Map(); // varName -> value, applied to the ACTIVE tile element
  // Tiles set their --pg-* defaults on .pg-tile[data-lang=…], which is a closer
  // ancestor than :root — so overrides must land on the active tile element (its
  // inline style beats its own scoped rule and cascades to its children).
  function getActiveTile() { return stage.querySelector('.pg-tile.is-active') || stage; }

  /* ----------------------------------------------------------------------
     TOKEN READ / WRITE
     ---------------------------------------------------------------------- */
  function readVar(name) {
    return getComputedStyle(getActiveTile()).getPropertyValue(name).trim();
  }
  function writeVar(name, value) {
    overrides.set(name, value);
    getActiveTile().style.setProperty(name, value);
    touched.add(name);
  }
  // normalize a CSS color to #rrggbb for <input type=color>
  function toHex(value) {
    if (!value) return '#000000';
    if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
    const c = document.createElement('canvas').getContext('2d');
    c.fillStyle = '#000';
    c.fillStyle = value;            // browser resolves named/rgb to a hex
    return /^#[0-9a-f]{6}$/i.test(c.fillStyle) ? c.fillStyle : '#000000';
  }

  function collectTokens() {
    const out = {};
    for (const name of ALL_TOKENS) out[name] = readVar(name);
    out['data-theme'] = root.getAttribute('data-theme') || 'light';
    return out;
  }

  /* ----------------------------------------------------------------------
     BUILD CONTROL PANEL
     ---------------------------------------------------------------------- */
  function colorRow([varName, label]) {
    const wrap = document.createElement('div');
    wrap.className = 'pg-color';
    const id = 'c' + varName.replace(/[^a-z]/g, '');
    const hex = toHex(readVar(varName));
    wrap.innerHTML = `
      <span class="pg-swatch"><input type="color" id="${id}" data-var="${varName}" value="${hex}"></span>
      <label for="${id}">${label}<span class="pg-hex" id="${id}-hex">${hex}</span></label>`;
    wrap.querySelector('input').addEventListener('input', (e) => {
      const v = e.target.value;
      writeVar(varName, v);
      document.getElementById(`${id}-hex`).textContent = v;
      pushHistoryDebounced();
    });
    return wrap;
  }

  function buildColors() {
    const pal = document.getElementById('pg-palette');
    const trio = document.getElementById('pg-trio');
    COLOR_TOKENS.forEach((t) => (t[2] === 'trio' ? trio : pal).appendChild(colorRow(t)));
  }

  function buildFontSelect(selectEl) {
    const varName = selectEl.dataset.var;
    const previewEl = document.getElementById(selectEl.id + '-preview');

    function rebuildOptions() {
      const current = familyOf(readVar(varName));
      selectEl.innerHTML = '';
      // pinned: the active tile's own display face (head picker only)
      const tileFace = TILE_DISPLAY_FACES[activeLang];
      if (varName === '--pg-font-head' && tileFace) {
        const og = document.createElement('optgroup');
        og.label = 'This tile’s face';
        const o = document.createElement('option');
        o.value = tileFace; o.textContent = tileFace;
        og.appendChild(o); selectEl.appendChild(og);
      }
      const og = document.createElement('optgroup');
      og.label = 'Google Fonts';
      Object.keys(FONTS).forEach((fam) => {
        const o = document.createElement('option');
        o.value = fam; o.textContent = fam;
        og.appendChild(o);
      });
      selectEl.appendChild(og);
      // select whatever is currently active if present in the list
      if ([...selectEl.options].some(o => o.value === current)) selectEl.value = current;
      if (previewEl) previewEl.style.fontFamily = readVar(varName);
    }

    selectEl.addEventListener('change', (e) => {
      const fam = e.target.value;
      ensureFont(fam);
      writeVar(varName, fontStack(fam));
      if (previewEl) {
        ensureFontThen(fam, () => { previewEl.style.fontFamily = fontStack(fam); });
      }
      pushHistory();  // font pick is a discrete change — commit immediately
    });

    rebuildOptions();
    selectEl._rebuild = rebuildOptions;
  }
  function ensureFontThen(fam, cb) {
    ensureFont(fam);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(cb); else cb();
  }

  function buildSliders() {
    const host = document.getElementById('pg-sliders');
    host.innerHTML = '';  // rebuilt on every language switch so only relevant sliders show
    const allow = TILE_SLIDERS[activeLang] || SLIDER_TOKENS.map(t => t[0]);
    SLIDER_TOKENS.filter(t => allow.includes(t[0])).forEach(([varName, label, min, max, step, unit]) => {
      const raw = parseFloat(readVar(varName)) || 0;
      const id = 's' + varName.replace(/[^a-z]/g, '');
      const wrap = document.createElement('div');
      wrap.className = 'pg-slider';
      wrap.innerHTML = `
        <div class="pg-slider-top">
          <label for="${id}">${label}</label>
          <span class="pg-slider-val" id="${id}-val"></span>
        </div>
        <input type="range" id="${id}" data-var="${varName}" data-unit="${unit}"
               min="${min}" max="${max}" step="${step}" value="${raw}">`;
      host.appendChild(wrap);
      const input = wrap.querySelector('input');
      const valEl = wrap.querySelector(`#${id}-val`);
      const fmt = (v) => (step < 1 ? Number(v).toFixed(2) : Math.round(v)) + (unit === 'px' ? 'px' : ' ' + unit);
      valEl.textContent = fmt(raw);
      input.addEventListener('input', (e) => {
        const v = e.target.value;
        writeVar(varName, unit === 'px' ? v + 'px' : v);
        valEl.textContent = fmt(v);
        pushHistoryDebounced();
      });
    });
  }

  // re-sync every control's displayed value from the live computed vars
  function syncControls() {
    COLOR_TOKENS.forEach(([varName]) => {
      const id = 'c' + varName.replace(/[^a-z]/g, '');
      const input = document.getElementById(id);
      if (!input) return;
      const hex = toHex(readVar(varName));
      input.value = hex;
      const hx = document.getElementById(`${id}-hex`);
      if (hx) hx.textContent = hex;
    });
    SLIDER_TOKENS.forEach(([varName, , , , step, unit]) => {
      const id = 's' + varName.replace(/[^a-z]/g, '');
      const input = document.getElementById(id);
      if (!input) return;
      const raw = parseFloat(readVar(varName)) || 0;
      input.value = raw;
      const valEl = document.getElementById(`${id}-val`);
      if (valEl) valEl.textContent = (step < 1 ? raw.toFixed(2) : Math.round(raw)) + (unit === 'px' ? 'px' : ' ' + unit);
    });
    FONT_TOKENS.forEach((varName) => {
      const sel = document.querySelector(`select[data-var="${varName}"]`);
      if (sel && sel._rebuild) sel._rebuild();
    });
  }

  /* ----------------------------------------------------------------------
     LANGUAGE + SURFACE SWITCHING
     ---------------------------------------------------------------------- */
  function setLang(lang) {
    activeLang = lang;
    stage.querySelectorAll('.pg-tile').forEach((t) =>
      t.classList.toggle('is-active', t.dataset.lang === lang));
    document.querySelectorAll('.pg-langtab').forEach((b) =>
      b.setAttribute('aria-selected', String(b.dataset.lang === lang)));
    // carry the user's overrides onto the newly active tile (its scoped vars would
    // otherwise shadow them), then refresh the panel to show THIS tile's values.
    const tile = getActiveTile();
    overrides.forEach((v, n) => tile.style.setProperty(n, v));
    buildSliders();   // re-filter sliders to the ones THIS language actually uses
    syncControls();
  }
  function setSurface(surface) {
    activeSurface = surface;
    stage.setAttribute('data-surface', surface);
    document.querySelectorAll('.pg-surfbtn').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.surface === surface)));
  }

  /* ----------------------------------------------------------------------
     THEME
     ---------------------------------------------------------------------- */
  function setTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    // let the theme re-drive any theme-token the user hasn't explicitly set
    THEME_DRIVEN.forEach((v) => { if (!touched.has(v)) root.style.removeProperty(v); });
    syncControls();
  }

  /* ----------------------------------------------------------------------
     VIEW SWITCHING
     ---------------------------------------------------------------------- */
  function setView(view) {
    shell.setAttribute('data-view', view);
    document.querySelectorAll('.pg-viewtab').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    if (view === 'portfolio') renderPortfolio();
  }

  /* ----------------------------------------------------------------------
     SAVE FLOW
     ---------------------------------------------------------------------- */
  const modal = document.getElementById('pg-save-modal');
  const labelInput = document.getElementById('pg-save-label');

  function openSaveModal() {
    document.getElementById('pg-save-meta').textContent = `${activeLang} · ${activeSurface}`;
    labelInput.value = '';
    modal.classList.add('is-open');
    setTimeout(() => labelInput.focus(), 30);
  }
  function closeSaveModal() { modal.classList.remove('is-open'); }

  // Lazy-load the screenshot library only when a screenshot is actually needed,
  // so the app's own init never waits on (or breaks with) the third-party CDN.
  //
  // We use modern-screenshot (foreignObject -> the browser's own renderer),
  // NOT html2canvas. The tiles lean heavily on color-mix()/color() CSS, which
  // the browser resolves to the modern color() notation in computed styles;
  // html2canvas 1.4.1's own color parser throws on color() ("Attempting to
  // parse an unsupported color function"), so every capture failed silently and
  // saved a blank screenshot. modern-screenshot renders through the real CSS
  // engine, so color-mix()/color()/oklch() and gradients all come through.
  // (Known limit of every foreignObject capturer: backdrop-filter blur is not
  // rasterized, so the glassmorphic tile's blur is approximated — acceptable
  // next to a fully blank image.)
  let _capturePromise = null;
  function ensureCapture() {
    if (window.modernScreenshot && typeof window.modernScreenshot.domToPng === 'function') return Promise.resolve(true);
    if (_capturePromise) return _capturePromise;
    _capturePromise = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/modern-screenshot@4.7.0/dist/index.js';
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
    return _capturePromise;
  }

  async function captureStage() {
    const target = stage.querySelector('.pg-tile.is-active') || stage;
    const ready = await ensureCapture();
    if (!ready || !window.modernScreenshot) return '';
    try {
      return await window.modernScreenshot.domToPng(target, {
        backgroundColor: readVar('--pg-bg') || '#ffffff',
        scale: Math.min(1, window.devicePixelRatio || 1),
      });
    } catch (e) {
      console.warn('screenshot capture failed', e);
      return '';
    }
  }

  async function saveToSupabase(record) {
    const res = await fetch(`${SB_URL}/design_picks`, {
      method: 'POST',
      headers: {
        'apikey': SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        label: record.label,
        language: record.language,
        surface: record.surface,
        tokens: record.tokens,
        png: record.png,
      }),
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text().catch(() => '')}`);
    const rows = await res.json();
    return Array.isArray(rows) ? rows[0] : rows;
  }

  async function doSave() {
    const btn = document.getElementById('pg-save-confirm');
    btn.disabled = true;
    const label = (labelInput.value || '').trim() || `${activeLang} look`;
    closeSaveModal();
    const busy = toastBusy('Capturing screenshot…');

    const png = await captureStage();
    const record = {
      id: cryptoId(),
      created_at: new Date().toISOString(),
      label, language: activeLang, surface: activeSurface,
      tokens: collectTokens(), png, synced: false,
    };

    busy.update('Saving to your portfolio…');
    try {
      const row = await saveToSupabase(record);
      record.synced = true;
      if (row && row.id) record.id = row.id;
      if (row && row.created_at) record.created_at = row.created_at;
      busy.done('Saved to your portfolio', 'ok');
    } catch (e) {
      console.warn('Supabase save failed, kept locally:', e.message);
      busy.done('Saved locally (offline) — it’s in your portfolio', 'warn', 3200);
    }
    addLocal(record);
    btn.disabled = false;
    renderPortfolio();
  }

  /* ----------------------------------------------------------------------
     LOCAL STORE
     ---------------------------------------------------------------------- */
  function loadLocal() {
    try { return JSON.parse(localStorage.getItem(PICKS_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function saveLocal(arr) {
    try { localStorage.setItem(PICKS_KEY, JSON.stringify(arr)); }
    catch (e) { console.warn('localStorage full', e); }
  }
  function addLocal(record) {
    const arr = loadLocal();
    arr.unshift(record);
    saveLocal(arr);
  }
  function removeLocal(id) {
    saveLocal(loadLocal().filter((r) => r.id !== id));
  }
  function cryptoId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  /* ----------------------------------------------------------------------
     PORTFOLIO RENDER + EXPORTS
     ---------------------------------------------------------------------- */
  const gallery = document.getElementById('pg-gallery');

  function cssBlock(tokens) {
    const lines = ALL_TOKENS
      .filter((n) => tokens[n])
      .map((n) => `  ${n}: ${tokens[n]};`);
    const sel = tokens['data-theme'] === 'dark' ? ':root[data-theme="dark"]' : ':root';
    return `${sel}{\n${lines.join('\n')}\n}`;
  }

  function renderPortfolio() {
    const picks = loadLocal();
    gallery.innerHTML = '';
    if (!picks.length) {
      gallery.innerHTML = `<div class="pg-empty">
        <h3>No looks yet</h3>
        <p>Head back to the studio, tune a tile until it feels right, and hit <b>Save this look</b>.</p>
      </div>`;
      return;
    }
    picks.forEach((p) => gallery.appendChild(card(p)));
  }

  function card(p) {
    const t = p.tokens || {};
    const el = document.createElement('article');
    el.className = 'pg-card';
    const when = new Date(p.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const sw = (v) => `<span style="background:${v || '#ccc'}"></span>`;
    const head = familyOf(t['--pg-font-head'] || '');
    const body = familyOf(t['--pg-font-body'] || '');
    const radius = t['--pg-radius'] || '–';
    const elev = t['--pg-elevation'] || '–';
    const dens = t['--pg-density'] || '–';

    el.innerHTML = `
      <div class="pg-card-thumb" style="${p.png ? `background-image:url(${p.png})` : ''}"></div>
      <div class="pg-card-body">
        <div class="pg-card-titlerow">
          <span class="pg-card-title"></span>
          <span class="pg-card-meta">${when}${p.synced ? '' : ' · local'}</span>
        </div>
        <div class="pg-tagrow">
          <span class="pg-tag">${p.language || '?'}</span>
          <span class="pg-tag">${p.surface || '?'}</span>
          <span class="pg-tag">${t['data-theme'] === 'dark' ? 'dark' : 'light'}</span>
        </div>
        <div class="pg-card-swatches">
          ${sw(t['--pg-primary'])}${sw(t['--pg-accent'])}${sw(t['--pg-good'])}${sw(t['--pg-ok'])}${sw(t['--pg-avoid'])}
        </div>
        <div class="pg-card-fonts">Type <b>${head || '–'}</b> / ${body || '–'}</div>
        <div class="pg-card-knobs">radius ${radius} · elev ${elev} · density ${dens}</div>
        <div class="pg-card-actions">
          <button class="pg-chipbtn" data-act="css">Copy CSS</button>
          <button class="pg-chipbtn" data-act="json">Copy JSON</button>
          <button class="pg-chipbtn" data-act="png">PNG</button>
          <button class="pg-card-del" data-act="del" aria-label="Delete look" title="Delete">&times;</button>
        </div>
      </div>`;
    el.querySelector('.pg-card-title').textContent = p.label || 'Untitled';

    el.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === 'css') copyText(cssBlock(t), 'CSS block copied');
      else if (act === 'json') copyText(JSON.stringify(p, null, 2), 'JSON copied');
      else if (act === 'png') downloadPng(p);
      else if (act === 'del') { removeLocal(p.id); renderPortfolio(); }
    });
    return el;
  }

  function copyText(text, okMsg) {
    const done = () => toast(okMsg, 'ok');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); cb(); } catch (e) { toast('Copy failed', 'warn'); }
    document.body.removeChild(ta);
  }
  function downloadPng(p) {
    if (!p.png) { toast('No screenshot on this look', 'warn'); return; }
    const a = document.createElement('a');
    a.href = p.png;
    a.download = `helthy-${(p.label || 'look').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ----------------------------------------------------------------------
     TOASTS
     ---------------------------------------------------------------------- */
  const toastHost = document.getElementById('pg-toasts');
  function toast(msg, kind = 'ok', ms = 2200) {
    const el = document.createElement('div');
    el.className = 'pg-toast';
    el.dataset.kind = kind;
    el.innerHTML = `<span class="pg-toast-dot"></span><span></span>`;
    el.lastElementChild.textContent = msg;
    toastHost.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .25s, transform .25s';
      el.style.opacity = '0'; el.style.transform = 'translateY(6px)';
      setTimeout(() => el.remove(), 260);
    }, ms);
  }
  // A toast that stays up (pulsing dot) across a multi-step async op instead of
  // auto-dismissing, so a slow save never leaves a silent gap. update() changes
  // the message in place; done() settles it into a normal toast and lets it fade.
  function toastBusy(msg) {
    const el = document.createElement('div');
    el.className = 'pg-toast';
    el.dataset.kind = 'busy';
    el.innerHTML = `<span class="pg-toast-dot"></span><span></span>`;
    el.lastElementChild.textContent = msg;
    toastHost.appendChild(el);
    return {
      update(newMsg) { el.lastElementChild.textContent = newMsg; },
      done(newMsg, kind = 'ok', ms = 2200) {
        el.dataset.kind = kind;
        el.lastElementChild.textContent = newMsg;
        setTimeout(() => {
          el.style.transition = 'opacity .25s, transform .25s';
          el.style.opacity = '0'; el.style.transform = 'translateY(6px)';
          setTimeout(() => el.remove(), 260);
        }, ms);
      },
    };
  }

  /* ----------------------------------------------------------------------
     SEED EXAMPLES (so the portfolio is never empty)
     ---------------------------------------------------------------------- */
  function seedThumb(tokens, language) {
    const w = 480, h = 330, c = document.createElement('canvas');
    c.width = w; c.height = h;
    const x = c.getContext('2d');
    const bg = tokens['--pg-bg'] || '#eef3f0';
    x.fillStyle = bg; x.fillRect(0, 0, w, h);
    // soft card
    const r = 26, cx = 40, cy = 40, cw = w - 80, ch = h - 80;
    x.fillStyle = tokens['--pg-surface'] || '#fff';
    roundRect(x, cx, cy, cw, ch, r); x.fill();
    x.shadowColor = 'rgba(0,0,0,.12)'; x.shadowBlur = 18; x.shadowOffsetY = 8;
    x.fill(); x.shadowColor = 'transparent';
    // score ring
    const gx = cx + 70, gy = cy + ch / 2, rad = 44;
    x.lineWidth = 12;
    x.strokeStyle = (tokens['--pg-ink-soft'] || '#ccc') + '33';
    x.beginPath(); x.arc(gx, gy, rad, 0, Math.PI * 2); x.stroke();
    x.strokeStyle = tokens['--pg-good'] || '#2f9e72';
    x.beginPath(); x.arc(gx, gy, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.55); x.stroke();
    x.fillStyle = tokens['--pg-ink'] || '#14241d';
    x.font = '700 30px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('88', gx, gy - 4);
    x.font = '600 11px Inter, sans-serif';
    x.fillStyle = tokens['--pg-good'] || '#2f9e72';
    x.fillText('GOOD', gx, gy + 22);
    // text lines
    const tx = gx + rad + 30;
    x.textAlign = 'left'; x.fillStyle = tokens['--pg-ink'] || '#14241d';
    x.font = '600 17px Inter, sans-serif';
    x.fillText("Siggi's Whole-Milk", tx, gy - 18);
    x.fillStyle = tokens['--pg-ink-soft'] || '#5c6f67';
    x.font = '400 13px Inter, sans-serif';
    x.fillText('Skyr · 4.4 oz cup', tx, gy + 4);
    // trio dots
    [tokens['--pg-good'], tokens['--pg-ok'], tokens['--pg-avoid']].forEach((col, i) => {
      x.fillStyle = col || '#999';
      x.beginPath(); x.arc(tx + 8 + i * 22, gy + 30, 6, 0, Math.PI * 2); x.fill();
    });
    return c.toDataURL('image/png');
  }
  function roundRect(x, a, b, w, h, r) {
    x.beginPath();
    x.moveTo(a + r, b);
    x.arcTo(a + w, b, a + w, b + h, r);
    x.arcTo(a + w, b + h, a, b + h, r);
    x.arcTo(a, b + h, a, b, r);
    x.arcTo(a, b, a + w, b, r);
    x.closePath();
  }

  function seedExamples() {
    if (loadLocal().length) return;
    try { if (localStorage.getItem(SEED_FLAG)) return; } catch (e) {}
    const base = {
      '--pg-font-head': '"Fraunces", Georgia, serif',
      '--pg-font-body': '"Inter", system-ui, sans-serif',
      '--pg-elevation': '1', '--pg-blur': '14px', '--pg-density': '1',
      'data-theme': 'light',
    };
    const a = {
      label: 'Calm Clay', language: 'claymorphic', surface: 'app', synced: false,
      id: cryptoId(), created_at: new Date(Date.now() - 864e5).toISOString(),
      tokens: { ...base,
        '--pg-bg': '#eef1ec', '--pg-surface': '#ffffff', '--pg-ink': '#1d3128', '--pg-ink-soft': '#5c7066',
        '--pg-primary': '#2f9e72', '--pg-accent': '#f4b740',
        '--pg-good': '#3aa379', '--pg-ok': '#e8a13a', '--pg-avoid': '#d8584f',
        '--pg-font-head': '"Baloo 2", system-ui, sans-serif',
        '--pg-radius': '28px', '--pg-elevation': '1.3', '--pg-density': '1.05' },
    };
    a.png = seedThumb(a.tokens, a.language);
    const b = {
      label: 'Morning Editorial', language: 'editorial', surface: 'web', synced: false,
      id: cryptoId(), created_at: new Date(Date.now() - 36e5).toISOString(),
      tokens: { ...base,
        '--pg-bg': '#f7f6f2', '--pg-surface': '#ffffff', '--pg-ink': '#15110d', '--pg-ink-soft': '#5a544c',
        '--pg-primary': '#1f6f4e', '--pg-accent': '#c9462f',
        '--pg-good': '#1f6f4e', '--pg-ok': '#b8862a', '--pg-avoid': '#c9462f',
        '--pg-font-head': '"Spectral", Georgia, serif',
        '--pg-font-body': '"Work Sans", system-ui, sans-serif',
        '--pg-radius': '4px', '--pg-elevation': '0.4', '--pg-density': '1.1' },
    };
    b.png = seedThumb(b.tokens, b.language);
    saveLocal([b, a]);
    try { localStorage.setItem(SEED_FLAG, '1'); } catch (e) {}
  }

  /* ----------------------------------------------------------------------
     HISTORY (undo / redo) — snapshots of the user's --pg-* overrides.
     A snapshot is just the `overrides` map serialized; applying one re-derives
     the inline styles + `touched`. Language/surface/theme are navigation, not
     token edits, so they stay out of the timeline.
     ---------------------------------------------------------------------- */
  const HISTORY_MAX = 200;     // generous: 200 steps of undo
  let history = [];            // array of JSON snapshots of `overrides`
  let histIndex = -1;          // pointer into `history`
  let histTimer = null;        // debounce handle for drag-coalescing

  function snapshot() { return JSON.stringify(Object.fromEntries(overrides)); }

  function pushHistory() {
    clearTimeout(histTimer); histTimer = null;
    const snap = snapshot();
    if (histIndex >= 0 && history[histIndex] === snap) return; // identical -> no step
    history = history.slice(0, histIndex + 1);                 // drop any redo branch
    history.push(snap);
    if (history.length > HISTORY_MAX) history.shift();
    histIndex = history.length - 1;
    updateHistButtons();
  }
  function pushHistoryDebounced() {  // coalesce a continuous drag into ONE step
    clearTimeout(histTimer);
    histTimer = setTimeout(pushHistory, 220);
  }
  function flushHistory() {           // commit any pending drag before navigating the timeline
    if (histTimer) { clearTimeout(histTimer); histTimer = null; pushHistory(); }
  }
  function applySnapshot(obj) {
    const tile = getActiveTile();
    ALL_TOKENS.forEach((n) => tile.style.removeProperty(n));
    overrides.clear(); touched.clear();
    Object.entries(obj).forEach(([n, v]) => {
      overrides.set(n, v); touched.add(n);
      tile.style.setProperty(n, v);
    });
    syncControls();
  }
  function undo() {
    flushHistory();
    if (histIndex <= 0) return;
    applySnapshot(JSON.parse(history[--histIndex]));
    updateHistButtons();
  }
  function redo() {
    flushHistory();
    if (histIndex >= history.length - 1) return;
    applySnapshot(JSON.parse(history[++histIndex]));
    updateHistButtons();
  }
  function updateHistButtons() {
    const u = document.getElementById('pg-undo');
    const r = document.getElementById('pg-redo');
    if (u) u.disabled = histIndex <= 0;
    if (r) r.disabled = histIndex >= history.length - 1;
  }

  /* ----------------------------------------------------------------------
     RESET — global + per-section
     ---------------------------------------------------------------------- */
  function resetTokens() {
    const tile = getActiveTile();
    ALL_TOKENS.forEach((n) => tile.style.removeProperty(n));
    overrides.clear();
    touched.clear();
    syncControls();
    pushHistory();
    toast('Reset everything to the tile’s defaults', 'ok');
  }
  function resetSection(section) {
    const names = SECTION_TOKENS[section];
    if (!names) return;
    const tile = getActiveTile();
    names.forEach((n) => { tile.style.removeProperty(n); overrides.delete(n); touched.delete(n); });
    syncControls();
    pushHistory();
    toast(`Reset ${SECTION_LABEL[section] || section} to defaults`, 'ok', 1600);
  }

  /* ----------------------------------------------------------------------
     WIRE EVENTS
     ---------------------------------------------------------------------- */
  function wire() {
    // language tabs (with arrow-key roving)
    const tabs = [...document.querySelectorAll('.pg-langtab')];
    tabs.forEach((b, i) => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
      b.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        next.focus(); setLang(next.dataset.lang);
      });
    });
    // surface
    document.querySelectorAll('.pg-surfbtn').forEach((b) =>
      b.addEventListener('click', () => setSurface(b.dataset.surface)));
    // view tabs
    document.querySelectorAll('.pg-viewtab').forEach((b) =>
      b.addEventListener('click', () => setView(b.dataset.view)));
    // theme
    document.getElementById('pg-theme-toggle').addEventListener('click', () =>
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
    // reset — global + per-section
    document.getElementById('pg-reset').addEventListener('click', resetTokens);
    document.querySelectorAll('.pg-group-reset').forEach((b) =>
      b.addEventListener('click', () => resetSection(b.dataset.section)));
    // undo / redo
    document.getElementById('pg-undo').addEventListener('click', undo);
    document.getElementById('pg-redo').addEventListener('click', redo);
    // keyboard: ⌘Z / ⌃Z undo, ⇧⌘Z / ⌘Y redo (ignore while typing in a field)
    document.addEventListener('keydown', (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const k = e.key.toLowerCase();
      if (k !== 'z' && k !== 'y') return;
      if (e.target.matches('input, select, textarea')) return;
      e.preventDefault();
      if (k === 'y' || (k === 'z' && e.shiftKey)) redo(); else undo();
    });
    // welcome dismiss
    document.getElementById('pg-welcome-dismiss').addEventListener('click', () =>
      shell.setAttribute('data-welcome', 'off'));
    // save flow
    document.getElementById('pg-save-btn').addEventListener('click', openSaveModal);
    document.getElementById('pg-save-cancel').addEventListener('click', closeSaveModal);
    document.getElementById('pg-save-confirm').addEventListener('click', doSave);
    labelInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSave(); });
    modal.addEventListener('click', (e) => { if (e.target === modal) closeSaveModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      // a modal swallows Esc to close itself; otherwise, when embedded in the HQ
      // takeover, ask the parent to close the studio so Esc works from inside too
      if (modal.classList.contains('is-open')) { closeSaveModal(); return; }
      if (window.parent && window.parent !== window) {
        try { window.parent.postMessage('helthy-studio-close', '*'); } catch (err) {}
      }
    });
  }

  /* ----------------------------------------------------------------------
     INIT
     ---------------------------------------------------------------------- */
  function init() {
    // restore theme preference
    let theme = 'light';
    try { theme = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) {}
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');

    buildColors();
    document.querySelectorAll('select.pg-select').forEach(buildFontSelect);
    buildSliders();
    wire();
    setLang(activeLang);
    setSurface(activeSurface);
    pushHistory();   // seed history[0] = the pristine default state, so undo can reach it
    seedExamples();
    renderPortfolio();
    // when embedded in the HQ takeover, announce that we actually rendered so the
    // launcher can reveal the studio (an iframe load alone isn't proof it's up)
    if (window.parent && window.parent !== window) {
      try { window.parent.postMessage('helthy-studio-ready', '*'); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // expose a tiny hook for the assembler / verification
  window.HelthyPlayground = { setLang, setSurface, setTheme, collectTokens, writeVar, readVar, undo, redo, resetSection, resetTokens };
})();
