// Dastarkhwan: weekly dinner plan, recipe bank and shopping list.
// Data is saved on this device (localStorage). A later version will share it across the family.

const STORE_KEY = 'dastarkhwan-v1';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TYPE_ICON = { dessert: '🍮 ', drink: '🥤 ' };
const SPECIALS = {
  __out: { name: 'Eating out', icon: '🍴' },
  __takeaway: { name: 'Takeaway', icon: '🥡' },
  __leftovers: { name: 'Leftovers', icon: '♻️' },
};

// ---------- state ----------
function freshState() {
  return {
    recipes: JSON.parse(JSON.stringify(STARTER_RECIPES)), occasions: JSON.parse(JSON.stringify(STARTER_OCCASIONS)),
    plan: {}, days: {}, extras: [], checked: {}, saleShop: {}, pantryNeed: {}, photos: {}, removed: [], dataVersion: 2,
    settings: { family: '', members: [], base: 4, lang: 'en', theme: 'auto' },
  };
}
function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { /* storage unavailable */ }
  const base = freshState();
  if (!s) return base;
  const version = s.dataVersion || 1;
  // Upgrade older saved data: add new fields and new starter dishes without touching the family's edits.
  for (const k of Object.keys(base)) if (s[k] === undefined) s[k] = base[k];
  s.settings = Object.assign({}, base.settings, s.settings);
  if (version < 2) moveToFamilyList(s);
  for (const r of STARTER_RECIPES) {
    if (s.removed.includes(r.id)) continue; // the family deleted it: don't bring it back
    const mine = s.recipes.find((x) => x.id === r.id);
    if (!mine) { s.recipes.push(JSON.parse(JSON.stringify(r))); continue; }
    if (!mine.type) mine.type = r.type;
    if (!mine.photo && r.photo) mine.photo = r.photo;
    mine.ingredients.forEach((g) => {
      const o = r.ingredients.find((x) => x.item === g.item);
      if (o && g.price === undefined) g.price = o.price;
    });
  }
  s.recipes.forEach((r) => { if (!r.type) r.type = 'main'; });
  // Remove planned days, sides and menus that point to dishes no longer in the list.
  const ids = new Set(s.recipes.map((r) => r.id));
  for (const [day, id] of Object.entries(s.plan)) if (!ids.has(id) && !SPECIALS[id]) delete s.plan[day];
  Object.values(s.days).forEach((i) => { i.sides = (i.sides || []).filter((x) => ids.has(x)); });
  s.occasions = s.occasions.filter((o) => ids.has(o.main));
  s.occasions.forEach((o) => { o.sides = o.sides.filter((x) => ids.has(x)); });
  return s;
}

// Version 2 (October 2026): the family's own "Dinner Ideas" list replaces the first starter dishes.
// Dishes the family added themselves are kept and moved into the new groups.
const FIRST_STARTERS = ['chicken-karahi', 'daal-chawal', 'chicken-biryani', 'aloo-gosht', 'butter-chicken', 'frikadeller', 'lasagne',
  'spaghetti-bolognese', 'bulgogi', 'pho-bo', 'chicken-stir-fry', 'burgers', 'raita', 'kachumber', 'naan', 'plain-rice', 'agurkesalat', 'kheer', 'fruit-chaat'];
const OLD_GROUPS = { Pakistani: 'Desi', Indian: 'Desi', Danish: 'Western', Italian: 'Western', Chinese: 'Asian', Korean: 'Asian', Vietnamese: 'Asian' };
function moveToFamilyList(s) {
  s.recipes = s.recipes.filter((r) => !FIRST_STARTERS.includes(r.id));
  s.recipes.forEach((r) => { r.cuisine = OLD_GROUPS[r.cuisine] || (CUISINES.includes(r.cuisine) ? r.cuisine : 'Western'); });
  s.recipes.unshift(...JSON.parse(JSON.stringify(STARTER_RECIPES)));
  const starterMenus = STARTER_OCCASIONS.map((o) => o.id);
  s.occasions = JSON.parse(JSON.stringify(STARTER_OCCASIONS)).concat(s.occasions.filter((o) => !starterMenus.includes(o.id)));
  s.removed = [];
  s.dataVersion = 2;
}
let state = loadState();
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { toast('Could not save on this phone'); } }

// ---------- words, theme ----------
// \u2068 and \u2069 keep Urdu words from reordering the English text around them.
const t = (k) => '\u2068' + ((WORDS[state.settings.lang] || WORDS.en)[k] || WORDS.en[k]) + '\u2069';
function applyLook() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.querySelectorAll('[data-w]').forEach((n) => { n.textContent = t(n.dataset.w); });
  const fam = state.settings.family ? `, ${state.settings.family}` : '';
  $('#hello').textContent = `${t('hello')}${fam} 👋`;
}

// ---------- dates ----------
function mondayOf(d) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; }
let weekStart = mondayOf(new Date());
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const dayName = (d) => DAYS[(d.getDay() + 6) % 7];
function weekDates(start = weekStart) { return DAYS.map((_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); return d; }); }
const weekKey = () => iso(weekStart);
const todayIso = () => iso(new Date());

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null && k !== false) n.append(k.nodeType ? k : document.createTextNode(k));
  return n;
};
const recipeById = (id) => state.recipes.find((r) => r.id === id);
const shopName = (id) => (SHOPS.find((s) => s.id === id) || { name: id }).name;
const kr = (n) => `≈ ${Math.round(n).toLocaleString('da-DK')} kr`;
const members = () => (state.settings.members.length ? state.settings.members : []);
const dayInfo = (key) => state.days[key] || (state.days[key] = { sides: [], cooks: [], away: [], guests: 0 });
// A chef and any number of helpers. Older saved days had "cook" or "cooks".
function crew(info) {
  if (!info) return { chef: '', helpers: [] };
  if (info.chef !== undefined || info.helpers) return { chef: info.chef || '', helpers: info.helpers || [] };
  const c = info.cooks || (info.cook ? [info.cook] : []);
  return { chef: c[0] || '', helpers: c.slice(1) };
}
function cookText(info) {
  const { chef, helpers } = crew(info);
  if (!chef && !helpers.length) return '';
  return [chef ? `👩‍🍳 ${chef}` : '', helpers.length ? `🤝 ${helpers.join(' & ')}` : ''].filter(Boolean).join(' · ');
}
let toastTimer;
function toast(msg) { const n = $('#toast'); n.textContent = msg; n.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => n.classList.remove('show'), 2200); }

// A dish's picture: the family's own photo, then a stock photo, then a drawn placeholder.
// The placeholder sits underneath, so it shows while a photo loads or if it cannot load.
function picture(r, cls = 'thumb') {
  const src = r && (state.photos[r.id] || r.photo);
  const [emoji, colour] = CUISINE_ART[(r && r.cuisine) || 'Desi'] || ['🍽️', '#7a2e1d'];
  const box = el('div', { class: cls + ' art', style: `background:${colour}` }, el('span', {}, emoji));
  if (src) {
    const img = el('img', { src, alt: r.name, loading: 'lazy' });
    img.addEventListener('error', () => img.remove());
    box.append(img);
  }
  return box;
}

// How many people eat on a day, and the scaling factor against the usual servings.
function headcount(key) {
  const info = state.days[key] || { away: [], guests: 0 };
  const n = members().length || state.settings.base;
  return Math.max(0, n - (info.away || []).length + (info.guests || 0));
}
const factor = (key) => headcount(key) / (state.settings.base || 4);

function scaleQty(q, unit, f) {
  if (!q) return 0;
  const x = q * f;
  if (['g', 'ml'].includes(unit)) return Math.max(50, Math.round(x / 50) * 50);
  if (['kg', 'l'].includes(unit)) return Math.round(x * 10) / 10;
  return Math.max(1, Math.round(x));
}

// ---------- tabs and swipe ----------
let currentTab = 'week';
document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => {
  currentTab = b.dataset.tab;
  document.querySelectorAll('.tabs button').forEach((x) => x.classList.toggle('on', x === b));
  document.querySelectorAll('.tab').forEach((s) => s.classList.toggle('active', s.id === 'tab-' + currentTab));
  render();
}));
let touchX = null;
// Swiping changes the week, except on the row of days, which scrolls sideways.
$('#tab-week').addEventListener('touchstart', (e) => { touchX = e.target.closest('.week-strip') ? null : e.touches[0].clientX; }, { passive: true });
$('#tab-week').addEventListener('touchend', (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX; touchX = null;
  if (Math.abs(dx) > 70) { weekStart.setDate(weekStart.getDate() + (dx < 0 ? 7 : -7)); render(); }
});

// ---------- this week ----------
function tonightCard() {
  const key = todayIso();
  const id = state.plan[key];
  const sp = SPECIALS[id];
  const r = sp ? null : recipeById(id);
  const info = state.days[key] || {};
  const card = el('button', { class: 'tonight', onclick: () => openDay(new Date()) });
  const label = el('p', { class: 'tonight-label' }, `${t('tonight')} · ${dayName(new Date())}`);
  if (!r && !sp) { card.append(label, el('p', { class: 'tonight-empty' }, t('nothing'))); return card; }
  if (sp) { card.append(label, el('h2', {}, `${sp.icon} ${sp.name}`)); return card; }
  // A wide banner: the dish photo across the card, with the details on top of it.
  card.classList.add('banner');
  card.append(picture(r, 'tonight-pic'), el('div', { class: 'tonight-text' }, label,
    el('h2', {}, r.name),
    el('p', { class: 'meta' }, `${r.minutes} min · ${headcount(key)} eating`, cookText(info) ? ` · ${cookText(info)}` : ''),
    (info.sides || []).length ? el('p', { class: 'meta' }, '+ ' + info.sides.map((s) => (recipeById(s) || {}).name).filter(Boolean).join(', ')) : null));
  return card;
}

function renderWeek() {
  const dates = weekDates();
  $('#weekLabel').textContent = `${t('week')} · ${fmt(dates[0])} – ${fmt(dates[6])}`;
  const sec = $('#tab-week');
  sec.replaceChildren();
  if (weekKey() === iso(mondayOf(new Date()))) sec.append(tonightCard());

  // Weekend nudge to plan next week.
  const dow = (new Date().getDay() + 6) % 7;
  const nextWeek = weekDates(new Date(mondayOf(new Date()).getTime() + 7 * 864e5));
  if (dow >= 5 && weekKey() === iso(mondayOf(new Date())) && nextWeek.filter((d) => state.plan[iso(d)]).length < 3) {
    sec.append(el('button', { class: 'nudge', onclick: () => { weekStart.setDate(weekStart.getDate() + 7); render(); } }, `📅 ${t('planNext')} →`));
  }

  sec.append(el('div', { class: 'weeknav' },
    el('button', { class: 'ghost', onclick: () => { weekStart.setDate(weekStart.getDate() - 7); render(); } }, '←'),
    el('button', { class: 'ghost', onclick: () => { weekStart = mondayOf(new Date()); render(); } }, t('week')),
    el('button', { class: 'ghost', onclick: () => { weekStart.setDate(weekStart.getDate() + 7); render(); } }, '→'),
  ));
  let prevCuisine = null;
  const strip = el('div', { class: 'week-strip' });
  sec.append(strip);
  dates.forEach((d) => {
    const key = iso(d);
    const id = state.plan[key];
    const sp = SPECIALS[id];
    const r = sp ? null : recipeById(id);
    const info = state.days[key] || {};
    const repeat = r && prevCuisine === r.cuisine;
    prevCuisine = r ? r.cuisine : null;
    const away = (info.away || []).length, guests = info.guests || 0;
    strip.append(el('button', { class: 'day' + (r || sp ? '' : ' empty') + (sp ? ' special' : '') + (key === todayIso() ? ' today' : ''), onclick: () => openDay(d) },
      el('span', { class: 'dname' }, dayName(d).slice(0, 3), el('small', {}, ' ' + fmt(d))),
      r ? picture(r, 'day-pic') : el('div', { class: 'day-pic art blank' }, el('span', {}, sp ? sp.icon : '＋')),
      el('span', { class: 'day-main' },
        el('span', { class: 'dish' }, sp ? sp.name : r ? r.name : 'Tap to plan'),
        (info.sides || []).length ? el('small', { class: 'sides-line' }, '+ ' + info.sides.map((s) => (recipeById(s) || {}).name).filter(Boolean).join(', ')) : null,
        el('span', { class: 'chips-line' },
          r ? el('span', { class: 'tag' }, r.cuisine) : null,
          cookText(info) ? el('span', { class: 'pill' }, cookText(info)) : null,
          away ? el('span', { class: 'pill' }, `🚶 ${away} out`) : null,
          guests ? el('span', { class: 'pill' }, `➕ ${guests} guest${guests > 1 ? 's' : ''}`) : null,
          repeat ? el('span', { class: 'warn' }, 'same cuisine')
          : null)),
    ));
  });
  // Start the row at today (or Monday for other weeks).
  requestAnimationFrame(() => { const today = strip.querySelector('.today'); strip.scrollLeft = today ? today.offsetLeft - strip.offsetLeft - 8 : 0; });
  const planned = dates.map((d) => recipeById(state.plan[iso(d)])).filter((r) => r && r.type === 'main');
  const mix = [...new Set(planned.map((r) => r.cuisine))];
  if (mix.length) sec.append(el('p', { class: 'mix' }, 'This week\'s mix: ' + mix.map((c) => `${CUISINE_ART[c][0]} ${c}`).join(' · ')));
  sec.append(el('p', { class: 'hint center' }, 'Tip: swipe the days sideways; use the arrows to change week.'));
}

// ---------- day planner ----------
let dayDate = null, showDishList = false;
function openDay(d) { dayDate = new Date(d); showDishList = !state.plan[iso(d)]; renderDay(); $('#dayDlg').showModal(); }
function renderDay() {
  const key = iso(dayDate);
  const info = dayInfo(key);
  const id = state.plan[key];
  const sp = SPECIALS[id];
  const r = sp ? null : recipeById(id);
  const body = $('#dayBody');
  body.replaceChildren();
  const set = (fn) => { fn(); save(); renderDay(); render(); };

  body.append(el('h2', {}, `${dayName(dayDate)} ${fmt(dayDate)}`));

  // Dinner
  body.append(el('h3', {}, 'Dinner'));
  if (r || sp) {
    body.append(el('div', { class: 'current-dish' }, r ? picture(r, 'thumb') : el('div', { class: 'thumb art blank' }, el('span', {}, sp.icon)),
      el('div', { class: 'grow' }, el('b', {}, r ? r.name : sp.name), r ? el('small', {}, ` · ${r.cuisine} · ${r.minutes} min`) : null),
      el('button', { class: 'ghost small', onclick: () => { showDishList = !showDishList; renderDay(); } }, showDishList ? 'Hide list' : t('change'))));
  }
  if (showDishList) {
    const list = el('div', { class: 'dish-list' });
    const choose = (newId) => set(() => { state.plan[key] = newId; showDishList = false; });
    list.append(el('div', { class: 'special-row' }, Object.entries(SPECIALS).map(([sid, s]) =>
      el('button', { class: 'pick special-pick' + (sid === id ? ' current-pick' : ''), onclick: () => choose(sid) }, `${s.icon} ${s.name}`))));
    for (const c of CUISINES) {
      const rs = state.recipes.filter((x) => x.cuisine === c && x.type === 'main');
      if (!rs.length) continue;
      list.append(el('p', { class: 'group' }, `${CUISINE_ART[c][0]} ${c}`));
      rs.forEach((x) => list.append(el('button', { class: 'pick' + (x.id === id ? ' current-pick' : ''), onclick: () => choose(x.id) },
        picture(x, 'mini'), el('span', { class: 'grow' }, x.name), el('small', {}, `${x.minutes} min`))));
    }
    body.append(list);
  }

  // Special menus
  if (state.occasions.length) {
    body.append(el('h3', {}, t('menus')));
    body.append(el('div', { class: 'chips' }, state.occasions.map((o) => el('button', { class: 'chip', onclick: () => set(() => {
      state.plan[key] = o.main; info.sides = [...o.sides]; showDishList = false; toast(`${o.name} planned`);
    }) }, `${o.icon} ${o.name}`))));
  }

  if (r) {
    // Sides, drinks and dessert
    const chip = (x) => el('button', {
      class: 'chip' + (info.sides.includes(x.id) ? ' on' : ''),
      onclick: () => set(() => { info.sides = info.sides.includes(x.id) ? info.sides.filter((s) => s !== x.id) : [...info.sides, x.id]; }),
    }, (TYPE_ICON[x.type] || '') + x.name);
    body.append(el('h3', {}, t('sides')));
    body.append(el('div', { class: 'chips' }, state.recipes.filter((x) => x.type === 'side' || x.type === 'dessert').map(chip)));
    const drinks = state.recipes.filter((x) => x.type === 'drink');
    if (drinks.length) {
      body.append(el('p', { class: 'hint' }, t('drinks')));
      body.append(el('div', { class: 'chips' }, drinks.map(chip)));
    }
  }

  // People
  if (!members().length) {
    body.append(el('div', { class: 'card settings-hint' },
      el('p', { class: 'hint' }, 'Add your family\'s names to choose who is cooking and who is home.'),
      el('button', { class: 'small', onclick: () => { $('#dayDlg').close(); openSettings(); } }, '⚙︎ Open Settings')));
  } else {
    if (r) {
      const setCrew = (fn) => set(() => { const c = crew(info); fn(c); delete info.cook; delete info.cooks; info.chef = c.chef; info.helpers = c.helpers; });
      const c = crew(info);
      body.append(el('h3', {}, t('cooking')));
      body.append(el('p', { class: 'hint' }, 'Chef'));
      body.append(el('div', { class: 'chips' }, members().map((m) => el('button', {
        class: 'chip' + (c.chef === m ? ' on' : ''),
        onclick: () => setCrew((x) => { x.chef = x.chef === m ? '' : m; x.helpers = x.helpers.filter((h) => h !== x.chef); }),
      }, '👩‍🍳 ' + m))));
      body.append(el('p', { class: 'hint' }, 'Helpers (tap one or more)'));
      body.append(el('div', { class: 'chips' }, members().filter((m) => m !== c.chef).map((m) => el('button', {
        class: 'chip' + (c.helpers.includes(m) ? ' on' : ''),
        onclick: () => setCrew((x) => { x.helpers = x.helpers.includes(m) ? x.helpers.filter((h) => h !== m) : [...x.helpers, m]; }),
      }, '🤝 ' + m))));
    }
    body.append(el('h3', {}, t('home')));
    body.append(el('div', { class: 'chips' }, members().map((m) => el('button', {
      class: 'chip' + (info.away.includes(m) ? ' off' : ' on'),
      onclick: () => set(() => { info.away = info.away.includes(m) ? info.away.filter((x) => x !== m) : [...info.away, m]; }),
    }, (info.away.includes(m) ? '🚶 ' : '🏠 ') + m))));
  }
  body.append(el('div', { class: 'stepper' }, el('span', {}, `${t('guests')}: `),
    el('button', { class: 'ghost small', onclick: () => set(() => { info.guests = Math.max(0, (info.guests || 0) - 1); }) }, '−'),
    el('b', {}, String(info.guests || 0)),
    el('button', { class: 'ghost small', onclick: () => set(() => { info.guests = (info.guests || 0) + 1; }) }, '+'),
    el('span', { class: 'hint' }, ` → ${headcount(key)} eating`)));

  body.append(el('menu', {},
    el('button', { class: 'ghost', onclick: () => set(() => { delete state.plan[key]; delete state.days[key]; showDishList = true; }) }, t('clear')),
    el('button', { onclick: () => $('#dayDlg').close() }, t('done'))));
}

// ---------- recipes ----------
let recipeFilter = 'All';
function renderRecipes() {
  const sec = $('#tab-recipes');
  sec.replaceChildren();
  sec.append(el('button', { class: 'wide add-btn', onclick: () => openEditor(null) }, '+ Add new dish'));
  const chips = el('div', { class: 'chips' });
  ['All', ...CUISINES, 'Sides & drinks'].forEach((c) => chips.append(el('button', {
    class: 'chip' + (c === recipeFilter ? ' on' : ''), onclick: () => { recipeFilter = c; renderRecipes(); },
  }, c)));
  sec.append(chips);
  const show = state.recipes.filter((r) => recipeFilter === 'All' || (recipeFilter === 'Sides & drinks' ? r.type !== 'main' : r.cuisine === recipeFilter && r.type === 'main'));
  show.forEach((r) => {
    const cost = r.ingredients.reduce((a, g) => a + (g.price || 0), 0);
    sec.append(el('details', { class: 'recipe' },
      el('summary', {}, picture(r, 'mini'), el('span', { class: 'grow' }, r.name,
        el('small', {}, ` ${r.minutes} min${cost ? ' · ' + kr(cost) : ''}`)), el('span', { class: 'tag' }, r.type === 'main' ? r.cuisine : r.type)),
      picture(r, 'hero'),
      r.note ? el('p', { class: 'note' }, '☪︎ ' + r.note) : null,
      el('ul', {}, r.ingredients.map((g) => el('li', {},
        `${g.qty ? g.qty + (g.unit ? ' ' + g.unit : '') + ' ' : ''}${g.item}`,
        el('small', {}, ` · ${shopName(g.shop)}${g.pantry ? ' · pantry' : ''}${g.price ? ' · ' + g.price + ' kr' : ''}`)))),
      el('div', { class: 'recipe-actions' },
        el('button', { class: 'ghost', onclick: () => openEditor(r) }, '✏️ Edit'),
        el('button', { class: 'ghost danger', onclick: () => deleteRecipe(r) }, '🗑️ Delete')),
    ));
  });

  sec.append(el('h2', { class: 'section' }, t('menus')));
  state.occasions.forEach((o) => sec.append(el('div', { class: 'card menu-card' },
    el('div', { class: 'grow' }, el('b', {}, `${o.icon} ${o.name}`), el('small', {},
      ' ' + [o.main, ...o.sides].map((id) => (recipeById(id) || {}).name).filter(Boolean).join(' + '))),
    el('button', { class: 'ghost small danger', onclick: () => { if (window.confirm(`Delete menu "${o.name}"?`)) { state.occasions = state.occasions.filter((x) => x !== o); save(); renderRecipes(); } } }, '🗑️'))));
  sec.append(el('button', { class: 'ghost wide', onclick: openMenuDlg }, '+ New special menu'));
}

function deleteRecipe(r) {
  if (!window.confirm(`Delete "${r.name}"? It will also be removed from any planned days.`)) return;
  state.recipes = state.recipes.filter((x) => x.id !== r.id);
  if (!state.removed.includes(r.id)) state.removed.push(r.id);
  for (const [day, id] of Object.entries(state.plan)) if (id === r.id) delete state.plan[day];
  Object.values(state.days).forEach((i) => { i.sides = (i.sides || []).filter((s) => s !== r.id); });
  delete state.photos[r.id];
  save(); render();
}

// ---------- dish editor ----------
function ingredientRow(g = {}) {
  const row = el('div', { class: 'ing-row' },
    el('input', { class: 'i-item', placeholder: 'Ingredient', value: g.item || '', 'aria-label': 'Ingredient' }),
    el('input', { class: 'i-qty', type: 'number', step: 'any', min: '0', placeholder: 'Qty', value: g.qty || '', 'aria-label': 'Quantity' }),
    el('input', { class: 'i-unit', placeholder: 'Unit', value: g.unit || '', 'aria-label': 'Unit' }),
    el('input', { class: 'i-price', type: 'number', step: 'any', min: '0', placeholder: 'kr', value: g.price || '', 'aria-label': 'Rough price in kr' }),
    el('select', { class: 'i-shop', 'aria-label': 'Shop' }, SHOPS.map((s) => el('option', { value: s.id, selected: (g.shop || 'netto') === s.id }, s.name))),
    el('label', { class: 'i-pantry' }, el('input', { type: 'checkbox', class: 'i-pan', checked: !!g.pantry }), 'Pantry'),
    el('button', { type: 'button', class: 'ghost i-del', 'aria-label': 'Remove ingredient', onclick: () => row.remove() }, '✕'));
  return row;
}

let editingId = null, pendingPhoto;
function showPhoto(src, r) {
  const box = $('#photoPreview');
  const base = r || { cuisine: $('#editorForm').elements.cuisine.value };
  box.replaceChildren(picture(src ? Object.assign({}, base, { id: '_preview', photo: src, name: '' }) : Object.assign({}, base, { id: '_preview', photo: null }), 'thumb'));
}
function openEditor(r) {
  editingId = r ? r.id : null;
  pendingPhoto = undefined;
  const f = $('#editorForm');
  $('#editorTitle').textContent = r ? `Edit ${r.name}` : 'Add new dish';
  f.elements.name.value = r ? r.name : '';
  f.elements.type.value = r ? r.type : 'main';
  f.elements.cuisine.replaceChildren(...CUISINES.map((c) => el('option', { selected: r && r.cuisine === c }, c)));
  f.elements.minutes.value = r ? r.minutes : 45;
  f.elements.note.value = r && r.note ? r.note : '';
  showPhoto(r ? state.photos[r.id] || r.photo : null, r);
  $('#ingRows').replaceChildren(...(r && r.ingredients.length ? r.ingredients : [{}, {}, {}]).map(ingredientRow));
  $('#editor').showModal();
}
// Shrink a photo from the camera to about 640 px so it fits in the phone's storage.
$('#photoFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    const scale = Math.min(1, 640 / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    pendingPhoto = c.toDataURL('image/jpeg', 0.75);
    showPhoto(pendingPhoto);
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(file);
  e.target.value = '';
});
$('#photoRemove').addEventListener('click', () => { pendingPhoto = null; showPhoto(null, { cuisine: $('#editorForm').elements.cuisine.value }); });
$('#addIng').addEventListener('click', () => $('#ingRows').append(ingredientRow()));
$('#editorCancel').addEventListener('click', () => $('#editor').close());
$('#editorForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  const name = f.elements.name.value.trim();
  if (!name) return;
  const ingredients = [...document.querySelectorAll('#ingRows .ing-row')].map((row) => ({
    item: row.querySelector('.i-item').value.trim(),
    qty: Number(row.querySelector('.i-qty').value) || 0,
    unit: row.querySelector('.i-unit').value.trim(),
    price: Number(row.querySelector('.i-price').value) || undefined,
    shop: row.querySelector('.i-shop').value,
    pantry: row.querySelector('.i-pan').checked || undefined,
  })).filter((g) => g.item);
  const data = { name, type: f.elements.type.value, cuisine: f.elements.cuisine.value, minutes: Number(f.elements.minutes.value) || 45,
    note: f.elements.note.value.trim() || undefined, ingredients };
  let r = editingId && recipeById(editingId);
  if (r) Object.assign(r, data);
  else { r = Object.assign({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36) }, data); state.recipes.push(r); }
  if (pendingPhoto) state.photos[r.id] = pendingPhoto;
  if (pendingPhoto === null) { delete state.photos[r.id]; delete r.photo; }
  save(); $('#editor').close(); render(); toast('Dish saved');
});

// ---------- special menu editor ----------
function openMenuDlg() {
  const mains = state.recipes.filter((r) => r.type === 'main');
  $('#menuMain').replaceChildren(...mains.map((r) => el('option', { value: r.id }, r.name)));
  $('#menuSides').replaceChildren(...state.recipes.filter((r) => r.type !== 'main').map((r) =>
    el('label', { class: 'chip check' }, el('input', { type: 'checkbox', value: r.id }), r.name)));
  $('#menuForm').reset();
  $('#menuDlg').showModal();
}
$('#menuCancel').addEventListener('click', () => $('#menuDlg').close());
$('#menuForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  state.occasions.push({ id: 'menu-' + Date.now().toString(36), name: f.elements.name.value.trim(), icon: f.elements.icon.value || '⭐',
    main: f.elements.main.value, sides: [...document.querySelectorAll('#menuSides input:checked')].map((i) => i.value) });
  save(); $('#menuDlg').close(); renderRecipes(); toast('Menu saved');
});

// ---------- shopping ----------
function weekDishes() {
  const out = [];
  weekDates().forEach((d) => {
    const key = iso(d);
    const r = recipeById(state.plan[key]);
    if (!r) return;
    const f = factor(key);
    out.push({ r, f });
    ((state.days[key] || {}).sides || []).forEach((s) => { const x = recipeById(s); if (x) out.push({ r: x, f }); });
  });
  return out;
}

function shoppingItems() {
  const wk = weekKey();
  const need = state.pantryNeed[wk] || {};
  const map = new Map();
  const add = (item, qty, unit, shop, source, price) => {
    const key = `${item.toLowerCase()}|${unit}`;
    const cur = map.get(key) || { key, item, qty: 0, unit, shop, sources: new Set(), price: 0 };
    cur.qty += qty || 0; cur.price += price || 0; cur.sources.add(source); map.set(key, cur);
  };
  weekDishes().forEach(({ r, f }) => r.ingredients.forEach((g) => {
    if (g.pantry && !need[g.item]) return;
    add(g.item, (g.qty || 0) * f, g.unit, g.shop, r.name, (g.price || 0) * f);
  }));
  state.extras.forEach((x) => add(x.item, 0, '', x.shop, x.who || 'Household', x.price || 0));
  const list = [...map.values()];
  list.forEach((x) => { x.qty = scaleQty(x.qty, x.unit, 1); const sale = (state.saleShop[wk] || {})[x.key]; if (sale) x.saleShop = sale; });
  return list;
}

function pantryItems() {
  const seen = new Map();
  weekDishes().forEach(({ r }) => r.ingredients.filter((g) => g.pantry).forEach((g) => { if (!seen.has(g.item)) seen.set(g.item, r.name); }));
  return [...seen.entries()];
}

function nice(q, unit) {
  if (unit === 'g' && q >= 1000) return [Math.round(q / 100) / 10, 'kg'];
  if (unit === 'ml' && q >= 1000) return [Math.round(q / 100) / 10, 'l'];
  return [q, unit];
}
const lineText = (x) => { const [q, u] = nice(x.qty, x.unit); return `${q ? q + (u ? ' ' + u : '') + ' ' : ''}${x.item}`; };
function shareText(title, items) {
  return `🛒 ${title}\n` + items.map((x) => `• ${lineText(x)}`).join('\n') + '\n\nfrom Dastarkhwan';
}
function share(title, items) {
  const text = shareText(title, items);
  if (navigator.share) navigator.share({ text }).catch(() => {});
  else window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

function renderShop() {
  const sec = $('#tab-shop');
  sec.replaceChildren();
  const wk = weekKey();
  const checked = state.checked[wk] || (state.checked[wk] = {});
  const items = shoppingItems();

  // Pantry check
  const pantry = pantryItems();
  if (pantry.length) {
    const need = state.pantryNeed[wk] || (state.pantryNeed[wk] = {});
    sec.append(el('details', { class: 'card pantry', open: Object.keys(need).length === 0 },
      el('summary', {}, `🧂 ${t('pantry')}`, el('small', {}, ` · ${pantry.length} items used this week`)),
      el('p', { class: 'hint' }, 'Tap anything you are running low on, and it goes on the list.'),
      el('div', { class: 'chips' }, pantry.map(([item, dish]) => el('button', {
        class: 'chip' + (need[item] ? ' on' : ''), title: dish,
        onclick: () => { if (need[item]) delete need[item]; else need[item] = true; save(); renderShop(); },
      }, (need[item] ? '🛒 ' : '✓ ') + item)))));
  }

  if (!items.length) sec.append(el('p', { class: 'empty-msg' }, 'Plan some dinners or add household items, and the list builds itself.'));
  const byShop = {};
  items.forEach((x) => { const s = x.saleShop || x.shop; (byShop[s] = byShop[s] || []).push(x); });
  let total = 0;
  SHOPS.forEach((s) => {
    const list = byShop[s.id];
    if (!list) return;
    const sub = list.reduce((a, x) => a + x.price, 0);
    total += sub;
    const left = list.filter((x) => !checked[x.key]).length;
    sec.append(el('div', { class: 'shop-head' },
      el('h2', { class: 'shop' }, s.name, el('small', {}, ` ${left}/${list.length} · ${sub ? kr(sub) : s.note}`)),
      el('button', { class: 'ghost small', onclick: () => share(s.name, list.filter((x) => !checked[x.key])) }, '📤 Share')));
    list.sort((a, b) => a.item.localeCompare(b.item)).forEach((x) => {
      const sel = el('select', { class: 'sale', 'aria-label': 'Shop for this item this week', onchange: (e) => {
        const m = state.saleShop[wk] || (state.saleShop[wk] = {});
        if (e.target.value === x.shop) delete m[x.key]; else m[x.key] = e.target.value;
        save(); renderShop();
      } }, SHOPS.map((o) => el('option', { value: o.id, selected: (x.saleShop || x.shop) === o.id }, o.id === x.shop ? o.name : `🏷️ ${o.name}`)));
      sec.append(el('div', { class: 'item' + (checked[x.key] ? ' done' : '') },
        el('label', {},
          el('input', { type: 'checkbox', checked: !!checked[x.key], onchange: (e) => { checked[x.key] = e.target.checked; save(); setTimeout(renderShop, 250); } }),
          el('span', {}, lineText(x), el('small', {}, ' ' + [...x.sources].join(', ')))),
        sel));
    });
  });
  if (total) sec.append(el('div', { class: 'card total' }, el('span', {}, t('total')), el('b', {}, kr(total))));
  if (items.length) sec.append(el('button', { class: 'wide', onclick: () => share('Shopping list', items.filter((x) => !checked[x.key])) }, '📤 Share the whole list (WhatsApp)'));

  const quick = el('div', { class: 'chips' });
  HOUSEHOLD_ITEMS.forEach((h) => quick.append(el('button', { class: 'chip', onclick: () => {
    if (!state.extras.some((x) => x.item === h.item)) state.extras.push({ item: h.item, shop: h.shop, price: h.price, who: 'Household' });
    save(); renderShop(); toast(`${h.item} added`);
  } }, '+ ' + h.item)));
  sec.append(el('div', { class: 'card' }, el('h2', {}, 'Running low? Tap to add'), quick,
    el('form', { class: 'row', onsubmit: (e) => {
      e.preventDefault(); const v = e.target.elements.x.value.trim();
      if (v) { state.extras.push({ item: v, shop: 'netto', who: 'Added' }); save(); renderShop(); }
    } }, el('input', { name: 'x', placeholder: 'Something else…' }), el('button', {}, 'Add'))));
  sec.append(el('button', { class: 'ghost wide', onclick: () => {
    const done = new Set(Object.keys(checked).filter((k) => checked[k]));
    state.extras = state.extras.filter((x) => !done.has(`${x.item.toLowerCase()}|`));
    state.checked[wk] = {}; save(); renderShop();
  } }, 'Clear ticked items'));
}

// ---------- settings ----------
function openSettings() {
  const f = $('#settingsForm'), s = state.settings;
  f.elements.family.value = s.family; f.elements.members.value = s.members.join('\n');
  f.elements.base.value = s.base; f.elements.lang.value = s.lang; f.elements.theme.value = s.theme;
  $('#settingsDlg').showModal();
}
$('#openSettings').addEventListener('click', openSettings);
$('#settingsCancel').addEventListener('click', () => $('#settingsDlg').close());
$('#settingsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  state.settings = { family: f.elements.family.value.trim(), members: f.elements.members.value.split('\n').map((x) => x.trim()).filter(Boolean),
    base: Number(f.elements.base.value) || 4, lang: f.elements.lang.value, theme: f.elements.theme.value };
  save(); $('#settingsDlg').close(); render(); toast('Settings saved');
});

// ---------- render ----------
function render() {
  applyLook();
  if (currentTab === 'week') renderWeek();
  if (currentTab === 'recipes') renderRecipes();
  if (currentTab === 'shop') renderShop();
}
render();
if (!state.settings.members.length) setTimeout(() => toast('Tip: add your family in ⚙︎ Settings'), 800);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').then((reg) => reg.update()).catch(() => {}));
}
