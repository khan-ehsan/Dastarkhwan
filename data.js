// Starter data for Dastarkhwan. Every recipe is halal.
// Family names and other personal details are NOT stored here (this file is public);
// they are entered in the app's Settings and saved on the phone.

const SHOPS = [
  { id: 'alakhwan', name: 'Al-Akhwan', note: 'Halal meat' },
  { id: 'bazar', name: 'Nordvest Bazar', note: 'Rice, lentils, spices' },
  { id: 'netto', name: 'Netto', note: 'Main supermarket' },
  { id: 'rema', name: 'Rema 1000', note: 'On offer' },
  { id: 'lidl', name: 'Lidl', note: 'On offer' },
  { id: '365', name: '365discount', note: 'On offer' },
];

const CUISINES = ['Pakistani', 'Indian', 'Danish', 'Western', 'Italian', 'Chinese', 'Korean', 'Vietnamese'];

// Emoji and colour used when a dish has no photo yet.
const CUISINE_ART = {
  Pakistani: ['🍛', '#b5541c'], Indian: ['🥘', '#c2410c'], Danish: ['🥔', '#2f6b8a'], Western: ['🍔', '#7c4a2d'],
  Italian: ['🍝', '#a33a2b'], Chinese: ['🥢', '#b8860b'], Korean: ['🍚', '#6b4fa3'], Vietnamese: ['🍜', '#2f7a5a'],
};

// Free stock photos from Unsplash (unsplash.com/license). Replace with your own in the app.
const U = (id) => `https://images.unsplash.com/photo-${id}?w=640&q=70&auto=format&fit=crop`;

// type: 'main', 'side' or 'dessert'. qty and price (rough, in kr) are for 4 people.
// pantry: usually at home; only bought when the pantry check says it is needed.
const STARTER_RECIPES = [
  { id: 'chicken-karahi', name: 'Chicken karahi', cuisine: 'Pakistani', type: 'main', minutes: 45, ingredients: [
    { item: 'Chicken (bone-in, karahi cut)', qty: 1, unit: 'kg', shop: 'alakhwan', price: 65 },
    { item: 'Tomatoes', qty: 5, unit: '', shop: 'netto', price: 15 },
    { item: 'Green chillies', qty: 4, unit: '', shop: 'bazar', price: 5 },
    { item: 'Ginger', qty: 1, unit: 'piece', shop: 'netto', price: 6 },
    { item: 'Garlic', qty: 1, unit: 'bulb', shop: 'netto', price: 5 },
    { item: 'Fresh coriander', qty: 1, unit: 'bunch', shop: 'bazar', price: 10 },
    { item: 'Karahi spice mix', qty: 1, unit: 'pack', shop: 'bazar', pantry: true, price: 15 },
  ] },
  { id: 'daal-chawal', name: 'Daal chawal', cuisine: 'Pakistani', type: 'main', minutes: 40, ingredients: [
    { item: 'Red lentils (masoor)', qty: 500, unit: 'g', shop: 'bazar', pantry: true, price: 15 },
    { item: 'Basmati rice', qty: 500, unit: 'g', shop: 'bazar', pantry: true, price: 15 },
    { item: 'Onions', qty: 2, unit: '', shop: 'netto', price: 4 },
    { item: 'Tomatoes', qty: 2, unit: '', shop: 'netto', price: 6 },
    { item: 'Garlic', qty: 1, unit: 'bulb', shop: 'netto', price: 5 },
  ] },
  { id: 'chicken-biryani', name: 'Chicken biryani', cuisine: 'Pakistani', type: 'main', minutes: 90, photo: U('1631515243349-e0cb75fb8d3a'), ingredients: [
    { item: 'Chicken (bone-in)', qty: 1, unit: 'kg', shop: 'alakhwan', price: 65 },
    { item: 'Basmati rice', qty: 750, unit: 'g', shop: 'bazar', pantry: true, price: 22 },
    { item: 'Biryani spice mix', qty: 1, unit: 'pack', shop: 'bazar', pantry: true, price: 15 },
    { item: 'Onions', qty: 3, unit: '', shop: 'netto', price: 6 },
    { item: 'Plain yoghurt', qty: 500, unit: 'g', shop: 'netto', price: 12 },
    { item: 'Potatoes', qty: 4, unit: '', shop: 'netto', price: 8 },
    { item: 'Fresh mint', qty: 1, unit: 'bunch', shop: 'bazar', price: 10 },
  ] },
  { id: 'aloo-gosht', name: 'Aloo gosht', cuisine: 'Pakistani', type: 'main', minutes: 90, ingredients: [
    { item: 'Lamb or mutton (bone-in)', qty: 1, unit: 'kg', shop: 'alakhwan', price: 110 },
    { item: 'Potatoes', qty: 5, unit: '', shop: 'netto', price: 10 },
    { item: 'Onions', qty: 2, unit: '', shop: 'netto', price: 4 },
    { item: 'Tomatoes', qty: 3, unit: '', shop: 'netto', price: 9 },
  ] },
  { id: 'butter-chicken', name: 'Butter chicken', cuisine: 'Indian', type: 'main', minutes: 50, ingredients: [
    { item: 'Boneless chicken thighs', qty: 800, unit: 'g', shop: 'alakhwan', price: 75 },
    { item: 'Chopped tomatoes (tin)', qty: 2, unit: '', shop: 'netto', price: 12 },
    { item: 'Cream', qty: 250, unit: 'ml', shop: 'netto', price: 12 },
    { item: 'Butter', qty: 1, unit: 'pack', shop: 'netto', price: 20 },
    { item: 'Garam masala', qty: 1, unit: 'pack', shop: 'bazar', pantry: true, price: 12 },
  ] },
  { id: 'frikadeller', name: 'Halal frikadeller with potatoes', cuisine: 'Danish', type: 'main', minutes: 45,
    note: 'Made with halal beef or lamb mince instead of the traditional pork.', ingredients: [
    { item: 'Beef mince', qty: 750, unit: 'g', shop: 'alakhwan', price: 70 },
    { item: 'Eggs', qty: 2, unit: '', shop: 'netto', price: 6 },
    { item: 'Onions', qty: 1, unit: '', shop: 'netto', price: 2 },
    { item: 'Milk', qty: 1, unit: 'l', shop: 'netto', price: 12 },
    { item: 'New potatoes', qty: 1, unit: 'kg', shop: 'netto', price: 15 },
  ] },
  { id: 'lasagne', name: 'Beef lasagne', cuisine: 'Italian', type: 'main', minutes: 75,
    note: 'Use stock instead of wine in the sauce.', ingredients: [
    { item: 'Beef mince', qty: 750, unit: 'g', shop: 'alakhwan', price: 70 },
    { item: 'Lasagne sheets', qty: 1, unit: 'pack', shop: 'netto', price: 12 },
    { item: 'Chopped tomatoes (tin)', qty: 2, unit: '', shop: 'netto', price: 12 },
    { item: 'Grated cheese', qty: 200, unit: 'g', shop: 'netto', price: 20 },
    { item: 'Milk', qty: 1, unit: 'l', shop: 'netto', price: 12 },
    { item: 'Onions', qty: 2, unit: '', shop: 'netto', price: 4 },
  ] },
  { id: 'spaghetti-bolognese', name: 'Spaghetti bolognese', cuisine: 'Italian', type: 'main', minutes: 40, photo: U('1673442635965-34f1b36d8944'), ingredients: [
    { item: 'Beef mince', qty: 500, unit: 'g', shop: 'alakhwan', price: 50 },
    { item: 'Spaghetti', qty: 500, unit: 'g', shop: 'netto', price: 10 },
    { item: 'Chopped tomatoes (tin)', qty: 2, unit: '', shop: 'netto', price: 12 },
    { item: 'Onions', qty: 1, unit: '', shop: 'netto', price: 2 },
    { item: 'Carrots', qty: 2, unit: '', shop: 'netto', price: 4 },
  ] },
  { id: 'bulgogi', name: 'Beef bulgogi with rice', cuisine: 'Korean', type: 'main', minutes: 35,
    note: 'Skip mirin or rice wine; a little honey and pear give the sweetness.', ingredients: [
    { item: 'Thinly sliced beef', qty: 600, unit: 'g', shop: 'alakhwan', price: 85 },
    { item: 'Soy sauce', qty: 1, unit: 'bottle', shop: 'netto', pantry: true, price: 15 },
    { item: 'Pear', qty: 1, unit: '', shop: 'netto', price: 5 },
    { item: 'Spring onions', qty: 1, unit: 'bunch', shop: 'netto', price: 8 },
    { item: 'Jasmine rice', qty: 500, unit: 'g', shop: 'bazar', pantry: true, price: 15 },
  ] },
  { id: 'pho-bo', name: 'Pho with beef', cuisine: 'Vietnamese', type: 'main', minutes: 60, photo: U('1701480253822-1842236c9a97'), ingredients: [
    { item: 'Beef (brisket or sirloin)', qty: 600, unit: 'g', shop: 'alakhwan', price: 90 },
    { item: 'Rice noodles', qty: 400, unit: 'g', shop: 'bazar', price: 15 },
    { item: 'Beef stock', qty: 2, unit: 'l', shop: 'netto', price: 15 },
    { item: 'Bean sprouts', qty: 1, unit: 'pack', shop: 'netto', price: 10 },
    { item: 'Fresh herbs (basil, coriander)', qty: 1, unit: 'pack', shop: 'bazar', price: 12 },
    { item: 'Limes', qty: 2, unit: '', shop: 'netto', price: 6 },
  ] },
  { id: 'chicken-stir-fry', name: 'Chicken stir-fry with noodles', cuisine: 'Chinese', type: 'main', minutes: 25,
    note: 'Leave out Shaoxing wine; check oyster sauce is alcohol-free.', ingredients: [
    { item: 'Boneless chicken breast', qty: 600, unit: 'g', shop: 'alakhwan', price: 60 },
    { item: 'Egg noodles', qty: 400, unit: 'g', shop: 'netto', price: 12 },
    { item: 'Peppers', qty: 2, unit: '', shop: 'netto', price: 10 },
    { item: 'Broccoli', qty: 1, unit: '', shop: 'netto', price: 10 },
    { item: 'Soy sauce', qty: 1, unit: 'bottle', shop: 'netto', pantry: true, price: 15 },
  ] },
  { id: 'burgers', name: 'Homemade burgers', cuisine: 'Western', type: 'main', minutes: 30, photo: U('1560971017-e22e6a4fbefd'), ingredients: [
    { item: 'Beef mince', qty: 600, unit: 'g', shop: 'alakhwan', price: 60 },
    { item: 'Burger buns', qty: 4, unit: '', shop: 'netto', price: 15 },
    { item: 'Cheese slices', qty: 1, unit: 'pack', shop: 'netto', price: 15 },
    { item: 'Lettuce', qty: 1, unit: '', shop: 'netto', price: 8 },
    { item: 'Tomatoes', qty: 2, unit: '', shop: 'netto', price: 6 },
    { item: 'Oven fries', qty: 1, unit: 'bag', shop: 'netto', price: 15 },
  ] },

  // Sides and desserts
  { id: 'raita', name: 'Raita', cuisine: 'Pakistani', type: 'side', minutes: 10, ingredients: [
    { item: 'Plain yoghurt', qty: 500, unit: 'g', shop: 'netto', price: 12 },
    { item: 'Cucumber', qty: 1, unit: '', shop: 'netto', price: 6 },
    { item: 'Fresh mint', qty: 1, unit: 'bunch', shop: 'bazar', price: 10 },
  ] },
  { id: 'kachumber', name: 'Kachumber salad', cuisine: 'Pakistani', type: 'side', minutes: 10, photo: U('1752766074879-62b66c5f3477'), ingredients: [
    { item: 'Tomatoes', qty: 3, unit: '', shop: 'netto', price: 9 },
    { item: 'Cucumber', qty: 1, unit: '', shop: 'netto', price: 6 },
    { item: 'Red onion', qty: 1, unit: '', shop: 'netto', price: 3 },
    { item: 'Lemon', qty: 1, unit: '', shop: 'netto', price: 4 },
  ] },
  { id: 'naan', name: 'Naan', cuisine: 'Pakistani', type: 'side', minutes: 5, ingredients: [
    { item: 'Naan', qty: 4, unit: '', shop: 'bazar', price: 20 },
  ] },
  { id: 'plain-rice', name: 'Plain basmati rice', cuisine: 'Pakistani', type: 'side', minutes: 20, ingredients: [
    { item: 'Basmati rice', qty: 400, unit: 'g', shop: 'bazar', pantry: true, price: 12 },
  ] },
  { id: 'agurkesalat', name: 'Agurkesalat (cucumber salad)', cuisine: 'Danish', type: 'side', minutes: 10, ingredients: [
    { item: 'Cucumber', qty: 1, unit: '', shop: 'netto', price: 6 },
    { item: 'Vinegar', qty: 1, unit: 'bottle', shop: 'netto', pantry: true, price: 10 },
  ] },
  { id: 'kheer', name: 'Kheer (rice pudding)', cuisine: 'Pakistani', type: 'dessert', minutes: 60, ingredients: [
    { item: 'Milk', qty: 1.5, unit: 'l', shop: 'netto', price: 18 },
    { item: 'Basmati rice', qty: 100, unit: 'g', shop: 'bazar', pantry: true, price: 3 },
    { item: 'Sugar', qty: 1, unit: 'pack', shop: 'netto', pantry: true, price: 10 },
    { item: 'Cardamom and pistachios', qty: 1, unit: 'pack', shop: 'bazar', price: 20 },
  ] },
  { id: 'fruit-chaat', name: 'Fruit chaat', cuisine: 'Pakistani', type: 'dessert', minutes: 15, ingredients: [
    { item: 'Mixed fruit (apples, bananas, oranges)', qty: 1, unit: 'kg', shop: 'netto', price: 25 },
    { item: 'Chaat masala', qty: 1, unit: 'pack', shop: 'bazar', pantry: true, price: 10 },
  ] },
];

// Ready-made menus for special occasions (main dish plus sides).
const STARTER_OCCASIONS = [
  { id: 'eid', name: 'Eid dinner', icon: '🌙', main: 'chicken-biryani', sides: ['raita', 'kachumber', 'kheer'] },
  { id: 'iftar', name: 'Iftar evening', icon: '🕌', main: 'chicken-karahi', sides: ['naan', 'fruit-chaat', 'kachumber'] },
  { id: 'guests', name: 'Guests for dinner', icon: '🎉', main: 'butter-chicken', sides: ['plain-rice', 'naan', 'raita', 'kheer'] },
];

// Household items the family can add with one tap ("running low").
const HOUSEHOLD_ITEMS = [
  { item: 'Toilet paper', shop: 'netto', price: 35 },
  { item: 'Paper towels', shop: 'netto', price: 25 },
  { item: 'Washing-up liquid', shop: 'netto', price: 15 },
  { item: 'Dishwasher tablets', shop: 'netto', price: 40 },
  { item: 'Bin bags', shop: 'netto', price: 20 },
  { item: 'Laundry detergent', shop: 'netto', price: 45 },
  { item: 'Toothpaste', shop: 'netto', price: 15 },
  { item: 'Shampoo', shop: 'netto', price: 25 },
  { item: 'Milk', shop: 'netto', price: 12 },
  { item: 'Bread', shop: 'netto', price: 20 },
  { item: 'Eggs', shop: 'netto', price: 30 },
  { item: 'Skyr', shop: 'netto', price: 15 },
  { item: 'Cooking oil', shop: 'netto', price: 25 },
];

// Interface words in English and Urdu.
const WORDS = {
  en: { week: 'This week', recipes: 'Recipes', shop: 'Shopping', tonight: 'Tonight', hello: 'Assalam-o-Alaikum',
    cooking: 'Who is cooking?', home: 'Who is home?', guests: 'Guests', sides: 'Sides and dessert', menus: 'Special menus',
    change: 'Change', clear: 'Clear day', done: 'Done', planNext: 'Plan next week', pantry: 'Pantry check',
    total: 'Rough cost this week', settings: 'Settings', nothing: 'Nothing planned yet. Tap to choose.' },
  ur: { week: 'اس ہفتے', recipes: 'ترکیبیں', shop: 'خریداری', tonight: 'آج رات', hello: 'السلام علیکم',
    cooking: 'کون پکائے گا؟', home: 'گھر پر کون ہے؟', guests: 'مہمان', sides: 'سائیڈ اور میٹھا', menus: 'خاص مینو',
    change: 'تبدیل کریں', clear: 'دن صاف کریں', done: 'ٹھیک ہے', planNext: 'اگلے ہفتے کا پلان', pantry: 'گھر کا سامان',
    total: 'اس ہفتے کا اندازاً خرچ', settings: 'ترتیبات', nothing: 'ابھی کچھ طے نہیں۔ چننے کے لیے دبائیں۔' },
};
