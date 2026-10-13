// Dastarkhwan, version 1: weekly dinner plan, recipe bank and shopping list.
// Data is saved on this device (localStorage). Version 2 will share it across the family.

const STORE_KEY = 'dastarkhwan-v1';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ---------- state ----------
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) return saved;
  } catch (e) { /* storage unavailable: start fresh */ }
  return { recipes: STARTER_RECIPES, plan: {}, extras: [], checked: {}, saleShop: {}, pantryLow: {} };
}
let state = loadState();
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

// ---------- dates ----------
function mondayOf(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = (x.getDay() + 6) % 7; // Monday = 0
  x.setDate(x.getDate() - dow);
  return x;
}
let weekStart = mondayOf(new Date());
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
function weekDates() {
  return DAYS.map((_, i) => { const d = new Date(weekStart); d.setDate(d.getDate() + i); return d; });
}
const weekKey = () => iso(weekStart);

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
  return n;
};
const recipeById = (id) => state.recipes.find((r) => r.id === id);
const shopName = (id) => (SHOPS.find((s) => s.id === id) || { name: id }).name;

// ---------- tabs ----------
document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('.tabs button').forEach((x) => x.classList.toggle('on', x === b));
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.id === 'tab-' + b.dataset.tab));
  render();
}));

// ---------- this week ----------
function renderWeek() {
  const dates = weekDates();
  $('#weekLabel').textContent = `Week of ${fmt(dates[0])} – ${fmt(dates[6])}`;
  const sec = $('#tab-week');
  sec.replaceChildren();
  sec.append(el('div', { class: 'weeknav' },
    el('button', { class: 'ghost', onclick: () => { weekStart.setDate(weekStart.getDate() - 7); render(); } }, '← Previous'),
    el('button', { class: 'ghost', onclick: () => { weekStart = mondayOf(new Date()); render(); } }, 'This week'),
    el('button', { class: 'ghost', onclick: () => { weekStart.setDate(weekStart.getDate() + 7); render(); } }, 'Next →'),
  ));
  let prevCuisine = null;
  dates.forEach((d, i) => {
    const r = recipeById(state.plan[iso(d)]);
    const repeat = r && prevCuisine === r.cuisine;
    prevCuisine = r ? r.cuisine : null;
    sec.append(el('button', { class: 'day' + (r ? '' : ' empty'), onclick: () => openPicker(d) },
      el('span', { class: 'dname' }, DAYS[i], el('small', {}, fmt(d))),
      el('span', { class: 'dish' }, r ? r.name : 'Tap to choose dinner'),
      r ? el('span', { class: 'tag' }, r.cuisine) : null,
      repeat ? el('span', { class: 'warn', title: 'Same cuisine as the day before' }, 'same cuisine twice') : null,
    ));
  });
  const planned = dates.map((d) => recipeById(state.plan[iso(d)])).filter(Boolean);
  const mix = [...new Set(planned.map((r) => r.cuisine))];
  if (mix.length) sec.append(el('p', { class: 'mix' }, 'This week\'s mix: ' + mix.join(' · ')));
}

let pickerDate = null;
function openPicker(d) {
  pickerDate = d;
  $('#pickerTitle').textContent = `Dinner for ${DAYS[(d.getDay() + 6) % 7]} ${fmt(d)}`;
  const list = $('#pickerList');
  list.replaceChildren();
  for (const c of CUISINES) {
    const rs = state.recipes.filter((r) => r.cuisine === c);
    if (!rs.length) continue;
    list.append(el('h3', {}, c));
    rs.forEach((r) => list.append(el('button', { type: 'button', class: 'pick', onclick: () => {
      state.plan[iso(pickerDate)] = r.id; save(); $('#picker').close(); render();
    } }, r.name, el('small', {}, ` ${r.minutes} min`))));
  }
  $('#picker').showModal();
}
$('#picker').addEventListener('close', () => {
  if ($('#picker').returnValue === 'clear' && pickerDate) { delete state.plan[iso(pickerDate)]; save(); render(); }
});

// ---------- recipes ----------
let recipeFilter = 'All';
function renderRecipes() {
  const sec = $('#tab-recipes');
  sec.replaceChildren();
  sec.append(el('button', { class: 'wide add-btn', onclick: () => openEditor(null) }, '+ Add new dish'));
  const chips = el('div', { class: 'chips' });
  ['All', ...CUISINES].forEach((c) => chips.append(el('button', {
    class: 'chip' + (c === recipeFilter ? ' on' : ''), onclick: () => { recipeFilter = c; renderRecipes(); },
  }, c)));
  sec.append(chips);
  state.recipes.filter((r) => recipeFilter === 'All' || r.cuisine === recipeFilter).forEach((r) => {
    sec.append(el('details', { class: 'recipe' },
      el('summary', {}, r.name, el('span', { class: 'tag' }, r.cuisine), el('small', {}, ` ${r.minutes} min`)),
      r.note ? el('p', { class: 'note' }, '☪︎ Note: ' + r.note) : null,
      el('ul', {}, r.ingredients.map((g) => el('li', {},
        `${g.qty ? g.qty + (g.unit ? ' ' + g.unit : '') + ' ' : ''}${g.item}`,
        el('small', {}, ` · ${shopName(g.shop)}${g.pantry ? ' · pantry' : ''}`)))),
      el('div', { class: 'recipe-actions' },
        el('button', { class: 'ghost', onclick: () => openEditor(r) }, '✏️ Edit'),
        el('button', { class: 'ghost danger', onclick: () => deleteRecipe(r) }, '🗑️ Delete')),
    ));
  });
}

function deleteRecipe(r) {
  if (!window.confirm(`Delete "${r.name}"? It will also be removed from any planned days.`)) return;
  state.recipes = state.recipes.filter((x) => x.id !== r.id);
  for (const [day, id] of Object.entries(state.plan)) if (id === r.id) delete state.plan[day];
  save(); render();
}

// One row per ingredient: item, quantity, unit, shop, pantry tick, remove button.
function ingredientRow(g = {}) {
  const shopSel = el('select', { class: 'i-shop', 'aria-label': 'Shop' },
    SHOPS.map((s) => el('option', Object.assign({ value: s.id }, (g.shop || 'netto') === s.id ? { selected: '' } : {}), s.name)));
  const row = el('div', { class: 'ing-row' },
    el('input', { class: 'i-item', placeholder: 'Ingredient', value: g.item || '', 'aria-label': 'Ingredient' }),
    el('input', { class: 'i-qty', type: 'number', step: 'any', min: '0', placeholder: 'Qty', value: g.qty || '', 'aria-label': 'Quantity' }),
    el('input', { class: 'i-unit', placeholder: 'Unit', value: g.unit || '', 'aria-label': 'Unit (g, kg, pack…)' }),
    shopSel,
    el('label', { class: 'i-pantry', title: 'Usually at home (rice, spices, oil)' },
      el('input', Object.assign({ type: 'checkbox', class: 'i-pan' }, g.pantry ? { checked: '' } : {})), 'Pantry'),
    el('button', { type: 'button', class: 'ghost i-del', 'aria-label': 'Remove ingredient', onclick: () => row.remove() }, '✕'),
  );
  return row;
}

let editingId = null;
function openEditor(r) {
  editingId = r ? r.id : null;
  const f = $('#editorForm');
  $('#editorTitle').textContent = r ? `Edit ${r.name}` : 'Add new dish';
  f.elements.name.value = r ? r.name : '';
  f.elements.cuisine.replaceChildren(...CUISINES.map((c) => el('option', Object.assign({}, r && r.cuisine === c ? { selected: '' } : {}), c)));
  f.elements.minutes.value = r ? r.minutes : 45;
  f.elements.note.value = r && r.note ? r.note : '';
  const rows = $('#ingRows');
  rows.replaceChildren(...(r && r.ingredients.length ? r.ingredients : [{}, {}, {}]).map(ingredientRow));
  $('#editor').showModal();
}

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
    shop: row.querySelector('.i-shop').value,
    pantry: row.querySelector('.i-pan').checked || undefined,
  })).filter((g) => g.item);
  const data = { name, cuisine: f.elements.cuisine.value, minutes: Number(f.elements.minutes.value) || 45,
    note: f.elements.note.value.trim() || undefined, ingredients };
  if (editingId) {
    const r = recipeById(editingId);
    Object.assign(r, data);
  } else {
    state.recipes.push(Object.assign({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36) }, data));
  }
  save(); $('#editor').close(); render();
});

// ---------- shopping ----------
function shoppingItems() {
  const wk = weekKey();
  const map = new Map();
  const add = (item, qty, unit, shop, source) => {
    const key = `${item.toLowerCase()}|${unit}`;
    const cur = map.get(key) || { key, item, qty: 0, unit, shop, sources: new Set() };
    cur.qty += qty || 0; cur.sources.add(source); map.set(key, cur);
  };
  weekDates().forEach((d) => {
    const r = recipeById(state.plan[iso(d)]);
    if (!r) return;
    r.ingredients.forEach((g) => { if (!g.pantry || state.pantryLow[g.item]) add(g.item, g.qty, g.unit, g.shop, r.name); });
  });
  state.extras.forEach((x) => add(x.item, 0, '', x.shop, x.who || 'Household'));
  const list = [...map.values()];
  list.forEach((x) => { const sale = (state.saleShop[wk] || {})[x.key]; if (sale) { x.saleShop = sale; } });
  return list;
}

function renderShop() {
  const sec = $('#tab-shop');
  sec.replaceChildren();
  const wk = weekKey();
  const checked = state.checked[wk] || (state.checked[wk] = {});
  const items = shoppingItems();
  if (!items.length) sec.append(el('p', { class: 'empty-msg' }, 'Plan some dinners or add household items, and the list builds itself.'));
  const byShop = {};
  items.forEach((x) => { const s = x.saleShop || x.shop; (byShop[s] = byShop[s] || []).push(x); });
  SHOPS.forEach((s) => {
    const list = byShop[s.id];
    if (!list) return;
    sec.append(el('h2', { class: 'shop' }, s.name, el('small', {}, ' ' + s.note)));
    list.sort((a, b) => a.item.localeCompare(b.item)).forEach((x) => {
      const sel = el('select', { class: 'sale', title: 'On sale somewhere else this week?', onchange: (e) => {
        const m = state.saleShop[wk] || (state.saleShop[wk] = {});
        if (e.target.value === x.shop) delete m[x.key]; else m[x.key] = e.target.value;
        save(); renderShop();
      } }, SHOPS.map((o) => el('option', Object.assign({ value: o.id }, (x.saleShop || x.shop) === o.id ? { selected: '' } : {}),
        o.id === x.shop ? o.name : `🏷️ ${o.name}`)));
      sec.append(el('div', { class: 'item' + (checked[x.key] ? ' done' : '') },
        el('label', {},
          el('input', Object.assign({ type: 'checkbox', onchange: (e) => { checked[x.key] = e.target.checked; save(); renderShop(); } }, checked[x.key] ? { checked: '' } : {})),
          el('span', {}, `${x.qty ? x.qty + (x.unit ? ' ' + x.unit : '') + ' ' : ''}${x.item}`,
            el('small', {}, ' ' + [...x.sources].join(', ')))),
        sel));
    });
  });

  const quick = el('div', { class: 'chips' });
  HOUSEHOLD_ITEMS.forEach((h) => quick.append(el('button', { class: 'chip', onclick: () => {
    if (!state.extras.some((x) => x.item === h.item)) state.extras.push({ item: h.item, shop: h.shop, who: 'Running low' });
    save(); renderShop();
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

// ---------- render ----------
function render() {
  renderWeek();
  if ($('#tab-recipes').classList.contains('active')) renderRecipes();
  if ($('#tab-shop').classList.contains('active')) renderShop();
}
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
