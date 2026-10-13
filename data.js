// Starter data for Dastarkhwan. Sara's own recipes will replace and extend these.
// Every recipe is halal. Each ingredient names the shop where the family usually buys it.

const SHOPS = [
  { id: 'alakhwan', name: 'Al-Akhwan', note: 'Halal meat' },
  { id: 'bazar', name: 'Nordvest Bazar', note: 'Rice, lentils, spices' },
  { id: 'netto', name: 'Netto', note: 'Main supermarket' },
  { id: 'rema', name: 'Rema 1000', note: 'On offer' },
  { id: 'lidl', name: 'Lidl', note: 'On offer' },
  { id: '365', name: '365discount', note: 'On offer' },
];

const CUISINES = ['Pakistani', 'Indian', 'Danish', 'Western', 'Italian', 'Chinese', 'Korean', 'Vietnamese'];

// qty is for 4 people. Pantry items (rice, spices, oil) are marked pantry: true
// and only reach the shopping list when someone marks them as running low.
const STARTER_RECIPES = [
  {
    id: 'chicken-karahi', name: 'Chicken karahi', cuisine: 'Pakistani', minutes: 45,
    ingredients: [
      { item: 'Chicken (bone-in, karahi cut)', qty: 1, unit: 'kg', shop: 'alakhwan' },
      { item: 'Tomatoes', qty: 5, unit: '', shop: 'netto' },
      { item: 'Green chillies', qty: 4, unit: '', shop: 'netto' },
      { item: 'Ginger', qty: 1, unit: 'piece', shop: 'netto' },
      { item: 'Garlic', qty: 1, unit: 'bulb', shop: 'netto' },
      { item: 'Fresh coriander', qty: 1, unit: 'bunch', shop: 'netto' },
      { item: 'Karahi spice mix', qty: 1, unit: 'pack', shop: 'bazar', pantry: true },
      { item: 'Naan', qty: 4, unit: '', shop: 'bazar' },
    ],
  },
  {
    id: 'daal-chawal', name: 'Daal chawal', cuisine: 'Pakistani', minutes: 40,
    ingredients: [
      { item: 'Red lentils (masoor)', qty: 500, unit: 'g', shop: 'bazar', pantry: true },
      { item: 'Basmati rice', qty: 500, unit: 'g', shop: 'bazar', pantry: true },
      { item: 'Onions', qty: 2, unit: '', shop: 'netto' },
      { item: 'Tomatoes', qty: 2, unit: '', shop: 'netto' },
      { item: 'Garlic', qty: 1, unit: 'bulb', shop: 'netto' },
    ],
  },
  {
    id: 'chicken-biryani', name: 'Chicken biryani', cuisine: 'Pakistani', minutes: 90,
    ingredients: [
      { item: 'Chicken (bone-in)', qty: 1, unit: 'kg', shop: 'alakhwan' },
      { item: 'Basmati rice', qty: 750, unit: 'g', shop: 'bazar', pantry: true },
      { item: 'Biryani spice mix', qty: 1, unit: 'pack', shop: 'bazar', pantry: true },
      { item: 'Onions', qty: 3, unit: '', shop: 'netto' },
      { item: 'Plain yoghurt', qty: 500, unit: 'g', shop: 'netto' },
      { item: 'Potatoes', qty: 4, unit: '', shop: 'netto' },
      { item: 'Fresh mint', qty: 1, unit: 'bunch', shop: 'netto' },
    ],
  },
  {
    id: 'butter-chicken', name: 'Butter chicken', cuisine: 'Indian', minutes: 50,
    ingredients: [
      { item: 'Boneless chicken thighs', qty: 800, unit: 'g', shop: 'alakhwan' },
      { item: 'Chopped tomatoes (tin)', qty: 2, unit: '', shop: 'netto' },
      { item: 'Cream', qty: 250, unit: 'ml', shop: 'netto' },
      { item: 'Butter', qty: 1, unit: 'pack', shop: 'netto' },
      { item: 'Garam masala', qty: 1, unit: 'pack', shop: 'bazar', pantry: true },
      { item: 'Basmati rice', qty: 500, unit: 'g', shop: 'bazar', pantry: true },
    ],
  },
  {
    id: 'frikadeller', name: 'Halal frikadeller with potatoes', cuisine: 'Danish', minutes: 45,
    note: 'Made with halal beef or lamb mince instead of the traditional pork.',
    ingredients: [
      { item: 'Beef mince', qty: 750, unit: 'g', shop: 'alakhwan' },
      { item: 'Eggs', qty: 2, unit: '', shop: 'netto' },
      { item: 'Onions', qty: 1, unit: '', shop: 'netto' },
      { item: 'Milk', qty: 1, unit: 'l', shop: 'netto' },
      { item: 'New potatoes', qty: 1, unit: 'kg', shop: 'netto' },
      { item: 'Cucumber', qty: 1, unit: '', shop: 'netto' },
    ],
  },
  {
    id: 'lasagne', name: 'Beef lasagne', cuisine: 'Italian', minutes: 75,
    note: 'Use stock instead of wine in the sauce.',
    ingredients: [
      { item: 'Beef mince', qty: 750, unit: 'g', shop: 'alakhwan' },
      { item: 'Lasagne sheets', qty: 1, unit: 'pack', shop: 'netto' },
      { item: 'Chopped tomatoes (tin)', qty: 2, unit: '', shop: 'netto' },
      { item: 'Grated cheese', qty: 200, unit: 'g', shop: 'netto' },
      { item: 'Milk', qty: 1, unit: 'l', shop: 'netto' },
      { item: 'Onions', qty: 2, unit: '', shop: 'netto' },
    ],
  },
  {
    id: 'spaghetti-bolognese', name: 'Spaghetti bolognese', cuisine: 'Italian', minutes: 40,
    ingredients: [
      { item: 'Beef mince', qty: 500, unit: 'g', shop: 'alakhwan' },
      { item: 'Spaghetti', qty: 500, unit: 'g', shop: 'netto' },
      { item: 'Chopped tomatoes (tin)', qty: 2, unit: '', shop: 'netto' },
      { item: 'Onions', qty: 1, unit: '', shop: 'netto' },
      { item: 'Carrots', qty: 2, unit: '', shop: 'netto' },
    ],
  },
  {
    id: 'bulgogi', name: 'Beef bulgogi with rice', cuisine: 'Korean', minutes: 35,
    note: 'Skip mirin or rice wine; a little honey and pear give the sweetness.',
    ingredients: [
      { item: 'Thinly sliced beef', qty: 600, unit: 'g', shop: 'alakhwan' },
      { item: 'Soy sauce', qty: 1, unit: 'bottle', shop: 'netto', pantry: true },
      { item: 'Pear', qty: 1, unit: '', shop: 'netto' },
      { item: 'Spring onions', qty: 1, unit: 'bunch', shop: 'netto' },
      { item: 'Jasmine rice', qty: 500, unit: 'g', shop: 'bazar', pantry: true },
    ],
  },
  {
    id: 'pho-bo', name: 'Pho with beef', cuisine: 'Vietnamese', minutes: 60,
    ingredients: [
      { item: 'Beef (brisket or sirloin)', qty: 600, unit: 'g', shop: 'alakhwan' },
      { item: 'Rice noodles', qty: 400, unit: 'g', shop: 'netto' },
      { item: 'Beef stock', qty: 2, unit: 'l', shop: 'netto' },
      { item: 'Bean sprouts', qty: 1, unit: 'pack', shop: 'netto' },
      { item: 'Fresh herbs (basil, coriander)', qty: 1, unit: 'pack', shop: 'netto' },
      { item: 'Limes', qty: 2, unit: '', shop: 'netto' },
    ],
  },
  {
    id: 'chicken-stir-fry', name: 'Chicken stir-fry with noodles', cuisine: 'Chinese', minutes: 25,
    note: 'Leave out Shaoxing wine; check oyster sauce is alcohol-free.',
    ingredients: [
      { item: 'Boneless chicken breast', qty: 600, unit: 'g', shop: 'alakhwan' },
      { item: 'Egg noodles', qty: 400, unit: 'g', shop: 'netto' },
      { item: 'Peppers', qty: 2, unit: '', shop: 'netto' },
      { item: 'Broccoli', qty: 1, unit: '', shop: 'netto' },
      { item: 'Soy sauce', qty: 1, unit: 'bottle', shop: 'netto', pantry: true },
    ],
  },
  {
    id: 'burgers', name: 'Homemade burgers', cuisine: 'Western', minutes: 30,
    ingredients: [
      { item: 'Beef mince', qty: 600, unit: 'g', shop: 'alakhwan' },
      { item: 'Burger buns', qty: 4, unit: '', shop: 'netto' },
      { item: 'Cheese slices', qty: 1, unit: 'pack', shop: 'netto' },
      { item: 'Lettuce', qty: 1, unit: '', shop: 'netto' },
      { item: 'Tomatoes', qty: 2, unit: '', shop: 'netto' },
      { item: 'Oven fries', qty: 1, unit: 'bag', shop: 'netto' },
    ],
  },
  {
    id: 'aloo-gosht', name: 'Aloo gosht', cuisine: 'Pakistani', minutes: 90,
    ingredients: [
      { item: 'Lamb or mutton (bone-in)', qty: 1, unit: 'kg', shop: 'alakhwan' },
      { item: 'Potatoes', qty: 5, unit: '', shop: 'netto' },
      { item: 'Onions', qty: 2, unit: '', shop: 'netto' },
      { item: 'Tomatoes', qty: 3, unit: '', shop: 'netto' },
      { item: 'Naan', qty: 4, unit: '', shop: 'bazar' },
    ],
  },
];

// Household items the family can add with one tap ("running low").
const HOUSEHOLD_ITEMS = [
  { item: 'Toilet paper', category: 'Bathroom', shop: 'netto' },
  { item: 'Paper towels', category: 'Kitchen', shop: 'netto' },
  { item: 'Washing-up liquid', category: 'Kitchen', shop: 'netto' },
  { item: 'Dishwasher tablets', category: 'Kitchen', shop: 'netto' },
  { item: 'Bin bags', category: 'Kitchen', shop: 'netto' },
  { item: 'Laundry detergent', category: 'Laundry', shop: 'netto' },
  { item: 'Toothpaste', category: 'Bathroom', shop: 'netto' },
  { item: 'Shampoo', category: 'Bathroom', shop: 'netto' },
  { item: 'Milk', category: 'Breakfast', shop: 'netto' },
  { item: 'Bread', category: 'Breakfast', shop: 'netto' },
  { item: 'Eggs', category: 'Breakfast', shop: 'netto' },
  { item: 'Skyr', category: 'Breakfast', shop: 'netto' },
  { item: 'Basmati rice', category: 'Pantry', shop: 'bazar' },
  { item: 'Red lentils (masoor)', category: 'Pantry', shop: 'bazar' },
  { item: 'Cooking oil', category: 'Pantry', shop: 'netto' },
];
