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

// The family's own dinner list, grouped as in their "Dinner Ideas" sheet: Desi, Rice, Western, Asian.
const CUISINES = ['Desi', 'Rice', 'Western', 'Asian'];

// Emoji and colour used when a dish has no photo yet.
const CUISINE_ART = {
  Desi: ['🍛', '#b5541c'], Rice: ['🍚', '#a8722a'], Western: ['🍔', '#7c4a2d'], Asian: ['🥢', '#2f7a5a'],
};

// Free stock photos from Unsplash (unsplash.com/license). Replace with your own in the app.
const U = (id) => `https://images.unsplash.com/photo-${id}?w=640&q=70&auto=format&fit=crop`;

// One ingredient: name, quantity, unit, shop, rough price in kr, and true if it is usually in the pantry.
const I = (item, qty, unit, shop, price, pantry) => (pantry ? { item, qty, unit, shop, price, pantry: true } : { item, qty, unit, shop, price });

// Ingredients used in many dishes.
const ONIONS = I('Onions', 2, '', 'netto', 4);
const TOMATOES = I('Tomatoes', 3, '', 'netto', 9);
const GARLIC = I('Garlic', 1, 'bulb', 'netto', 5);
const GG_PASTE = I('Ginger and garlic paste', 1, 'jar', 'bazar', 15, true);
const CHILLIES = I('Green chillies', 4, '', 'bazar', 5);
const CORIANDER = I('Fresh coriander', 1, 'bunch', 'bazar', 10);
const YOGHURT = I('Plain yoghurt', 500, 'g', 'netto', 12);
const RICE = I('Basmati rice', 750, 'g', 'bazar', 22, true);
const WHOLE_SPICES = I('Whole spices (cumin, cloves, cardamom)', 1, 'pack', 'bazar', 10, true);
const LAMB = I('Lamb or mutton (bone-in)', 1, 'kg', 'alakhwan', 110);
const CHICKEN = I('Chicken (bone-in)', 1, 'kg', 'alakhwan', 65);
const MINCE = I('Beef mince', 750, 'g', 'alakhwan', 70);
const CHOPPED_TOM = I('Chopped tomatoes (tin)', 2, '', 'netto', 12);
const CHEESE = I('Grated cheese', 200, 'g', 'netto', 20);

// type: 'main', 'side', 'drink' or 'dessert'. Quantities and prices are for 4 people.
// pantry: usually at home; only bought when the pantry check says it is needed.
const STARTER_RECIPES = [
  // ---------- Desi ----------
  { id: 'daal-chawal', name: 'Daal chawal', cuisine: 'Desi', type: 'main', minutes: 40, ingredients: [
    I('Red lentils (masoor)', 500, 'g', 'bazar', 15, true), I('Basmati rice', 500, 'g', 'bazar', 15, true), ONIONS, I('Tomatoes', 2, '', 'netto', 6), GARLIC] },
  { id: 'palak-ghosht', name: 'Palak ghosht', cuisine: 'Desi', type: 'main', minutes: 90, ingredients: [
    LAMB, I('Spinach (frozen)', 1, 'kg', 'netto', 20), ONIONS, TOMATOES, GG_PASTE] },
  { id: 'palak-aloo', name: 'Palak aloo', cuisine: 'Desi', type: 'main', minutes: 35, ingredients: [
    I('Spinach (frozen)', 1, 'kg', 'netto', 20), I('Potatoes', 1, 'kg', 'netto', 12), ONIONS, TOMATOES, GG_PASTE] },
  { id: 'palak-murghi', name: 'Palak murghi', cuisine: 'Desi', type: 'main', minutes: 60, ingredients: [
    CHICKEN, I('Spinach (frozen)', 1, 'kg', 'netto', 20), ONIONS, TOMATOES, GG_PASTE] },
  { id: 'aloo-gosht', name: 'Aloo ghosht', cuisine: 'Desi', type: 'main', minutes: 90, ingredients: [
    LAMB, I('Potatoes', 5, '', 'netto', 10), ONIONS, TOMATOES, GG_PASTE] },
  { id: 'butter-chicken', name: 'Butter chicken', cuisine: 'Desi', type: 'main', minutes: 50, ingredients: [
    I('Boneless chicken thighs', 800, 'g', 'alakhwan', 75), CHOPPED_TOM, I('Cream', 250, 'ml', 'netto', 12),
    I('Butter', 1, 'pack', 'netto', 20), I('Garam masala', 1, 'pack', 'bazar', 12, true)] },
  { id: 'keema-aloo', name: 'Keema aloo', cuisine: 'Desi', type: 'main', minutes: 45, ingredients: [
    MINCE, I('Potatoes', 4, '', 'netto', 8), ONIONS, TOMATOES, CHILLIES] },
  { id: 'chaney-aloo', name: 'Chaney aloo', cuisine: 'Desi', type: 'main', minutes: 40, ingredients: [
    I('Chickpeas (tin)', 3, '', 'netto', 18), I('Potatoes', 4, '', 'netto', 8), ONIONS, TOMATOES] },
  { id: 'chaney-murghi', name: 'Chaney murghi', cuisine: 'Desi', type: 'main', minutes: 60, ingredients: [
    CHICKEN, I('Chickpeas (tin)', 2, '', 'netto', 12), ONIONS, TOMATOES, GG_PASTE] },
  { id: 'chane-ki-daal-ghosht', name: 'Chane ki daal ghosht', cuisine: 'Desi', type: 'main', minutes: 100, ingredients: [
    I('Lamb or mutton (bone-in)', 750, 'g', 'alakhwan', 85), I('Chana daal', 400, 'g', 'bazar', 15, true), ONIONS, TOMATOES] },
  { id: 'mix-daal', name: 'Mix daal', cuisine: 'Desi', type: 'main', minutes: 50, ingredients: [
    I('Mixed lentils', 500, 'g', 'bazar', 18, true), ONIONS, I('Tomatoes', 2, '', 'netto', 6), GARLIC] },
  { id: 'brown-masoor', name: 'Brown masoor', cuisine: 'Desi', type: 'main', minutes: 50, ingredients: [
    I('Whole brown masoor', 500, 'g', 'bazar', 15, true), ONIONS, I('Tomatoes', 2, '', 'netto', 6), GARLIC] },
  { id: 'maash-ghosht', name: 'Maash (urid) ghosht', cuisine: 'Desi', type: 'main', minutes: 100, ingredients: [
    I('Lamb or mutton (bone-in)', 750, 'g', 'alakhwan', 85), I('Maash (urid) daal', 400, 'g', 'bazar', 15, true), ONIONS, TOMATOES] },
  { id: 'koftay', name: 'Koftay', cuisine: 'Desi', type: 'main', minutes: 60, ingredients: [
    MINCE, I('Eggs', 1, '', 'netto', 3), I('Onions', 3, '', 'netto', 6), TOMATOES, YOGHURT] },
  { id: 'achaar-murghi', name: 'Achaar murghi / ghosht', cuisine: 'Desi', type: 'main', minutes: 60,
    note: 'Use chicken, or lamb for achaar ghosht.', ingredients: [
    CHICKEN, I('Achaar masala', 1, 'pack', 'bazar', 15, true), YOGHURT, ONIONS, I('Green chillies', 6, '', 'bazar', 6)] },
  { id: 'chana-daal-kaddu', name: 'Chana daal kaddu', cuisine: 'Desi', type: 'main', minutes: 50, ingredients: [
    I('Chana daal', 400, 'g', 'bazar', 15, true), I('Kaddu (bottle gourd)', 1, '', 'bazar', 20), ONIONS, I('Tomatoes', 2, '', 'netto', 6)] },
  { id: 'gobi-ghosht', name: 'Gobi ghosht', cuisine: 'Desi', type: 'main', minutes: 80, ingredients: [
    I('Lamb or mutton (bone-in)', 750, 'g', 'alakhwan', 85), I('Cauliflower', 1, '', 'netto', 15), ONIONS, TOMATOES] },
  { id: 'kebab-naan', name: 'Kebab and naan', cuisine: 'Desi', type: 'main', minutes: 30, ingredients: [
    I('Seekh or shami kebabs', 1, 'pack', 'alakhwan', 60), I('Naan', 4, '', 'bazar', 20), I('Lettuce', 1, '', 'netto', 12),
    I('Red onion', 1, '', 'netto', 3), I('Mint chutney', 1, 'jar', 'bazar', 15)] },
  { id: 'chicken-karahi', name: 'Chicken karahi', cuisine: 'Desi', type: 'main', minutes: 45, ingredients: [
    I('Chicken (bone-in, karahi cut)', 1, 'kg', 'alakhwan', 65), I('Tomatoes', 5, '', 'netto', 15), CHILLIES,
    I('Ginger', 1, 'piece', 'netto', 6), GARLIC, CORIANDER, I('Karahi spice mix', 1, 'pack', 'bazar', 15, true)] },
  { id: 'korma', name: 'Korma', cuisine: 'Desi', type: 'main', minutes: 75, ingredients: [
    CHICKEN, YOGHURT, I('Onions', 3, '', 'netto', 6), I('Korma spice mix', 1, 'pack', 'bazar', 15, true), GG_PASTE] },
  { id: 'baingan', name: 'Baingan', cuisine: 'Desi', type: 'main', minutes: 40, ingredients: [
    I('Aubergines', 3, '', 'netto', 24), ONIONS, TOMATOES, GARLIC] },
  { id: 'dam-kebab', name: 'Dam kebab', cuisine: 'Desi', type: 'main', minutes: 60, ingredients: [
    I('Beef mince', 1, 'kg', 'alakhwan', 90), ONIONS, I('Plain yoghurt', 250, 'g', 'netto', 8), CHILLIES, CORIANDER] },
  { id: 'haleem', name: 'Haleem', cuisine: 'Desi', type: 'main', minutes: 180, note: 'Slow-cooked; good for weekends and guests.', ingredients: [
    I('Boneless beef', 1, 'kg', 'alakhwan', 120), I('Haleem mix (wheat and lentils)', 1, 'pack', 'bazar', 25, true),
    I('Onions', 4, '', 'netto', 8), I('Ginger', 1, 'piece', 'netto', 6), I('Lemons', 2, '', 'netto', 8), CORIANDER] },
  { id: 'payaaz-gosht', name: 'Payaaz gosht', cuisine: 'Desi', type: 'main', minutes: 90, ingredients: [
    LAMB, I('Onions', 1, 'kg', 'netto', 12), I('Tomatoes', 2, '', 'netto', 6), I('Plain yoghurt', 250, 'g', 'netto', 8)] },

  // ---------- Rice ----------
  { id: 'chicken-biryani', name: 'Biryani', cuisine: 'Rice', type: 'main', minutes: 90, photo: U('1631515243349-e0cb75fb8d3a'), ingredients: [
    CHICKEN, RICE, I('Biryani spice mix', 1, 'pack', 'bazar', 15, true), I('Onions', 3, '', 'netto', 6), YOGHURT,
    I('Potatoes', 4, '', 'netto', 8), I('Fresh mint', 1, 'bunch', 'bazar', 10)] },
  { id: 'pilao', name: 'Pilao (beef or murghi)', cuisine: 'Rice', type: 'main', minutes: 75, note: 'Beef or chicken.', ingredients: [
    I('Beef or chicken (bone-in)', 1, 'kg', 'alakhwan', 90), RICE, ONIONS, WHOLE_SPICES, I('Plain yoghurt', 250, 'g', 'netto', 8)] },
  { id: 'tahri', name: 'Tahri', cuisine: 'Rice', type: 'main', minutes: 45, ingredients: [
    RICE, I('Potatoes', 4, '', 'netto', 8), I('Frozen peas', 500, 'g', 'netto', 12), ONIONS, WHOLE_SPICES] },
  { id: 'kabli-pilao', name: 'Kabli pilao', cuisine: 'Rice', type: 'main', minutes: 90, ingredients: [
    LAMB, RICE, I('Carrots', 4, '', 'netto', 8), I('Raisins', 1, 'pack', 'netto', 12), ONIONS, WHOLE_SPICES] },
  { id: 'chana-pilao', name: 'Chana pilao', cuisine: 'Rice', type: 'main', minutes: 50, ingredients: [
    RICE, I('Chickpeas (tin)', 2, '', 'netto', 12), ONIONS, WHOLE_SPICES] },
  { id: 'mattar-pilao', name: 'Mattar pilao', cuisine: 'Rice', type: 'main', minutes: 40, ingredients: [
    RICE, I('Frozen peas', 500, 'g', 'netto', 12), ONIONS, WHOLE_SPICES] },

  // ---------- Western ----------
  { id: 'chicken-roast', name: 'Chicken roast and potatoes', cuisine: 'Western', type: 'main', minutes: 90, ingredients: [
    I('Whole chicken', 1, '', 'alakhwan', 70), I('Potatoes', 1.5, 'kg', 'netto', 18), I('Carrots', 4, '', 'netto', 8), ONIONS, I('Butter', 1, 'pack', 'netto', 20, true)] },
  { id: 'frikadeller', name: 'Frikadeller', cuisine: 'Western', type: 'main', minutes: 45,
    note: 'Made with halal beef or lamb mince instead of the traditional pork.', ingredients: [
    MINCE, I('Eggs', 2, '', 'netto', 6), I('Onions', 1, '', 'netto', 2), I('Milk', 1, 'l', 'netto', 12), I('New potatoes', 1, 'kg', 'netto', 15)] },
  { id: 'chicken-pan-fry', name: 'Chicken pan fry', cuisine: 'Western', type: 'main', minutes: 30, ingredients: [
    I('Chicken breast', 800, 'g', 'alakhwan', 70), I('Peppers', 3, '', 'netto', 15), ONIONS, I('Mixed vegetables', 1, 'bag', 'netto', 15)] },
  { id: 'fried-chicken', name: 'Fried chicken', cuisine: 'Western', type: 'main', minutes: 60, ingredients: [
    I('Chicken drumsticks and thighs', 1.5, 'kg', 'alakhwan', 80), I('Flour', 1, 'pack', 'netto', 10, true), I('Eggs', 2, '', 'netto', 6),
    I('Cooking oil', 1, 'bottle', 'netto', 25, true), I('Oven fries', 1, 'bag', 'netto', 15)] },
  { id: 'bof-med-log', name: 'Bøf med løg', cuisine: 'Western', type: 'main', minutes: 40, ingredients: [
    I('Beef mince', 600, 'g', 'alakhwan', 60), I('Onions', 4, '', 'netto', 8), I('Potatoes', 1, 'kg', 'netto', 12),
    I('Brown sauce mix', 1, 'pack', 'netto', 10), I('Butter', 1, 'pack', 'netto', 20, true)] },
  { id: 'burgers', name: 'Burgers', cuisine: 'Western', type: 'main', minutes: 30, photo: U('1560971017-e22e6a4fbefd'), ingredients: [
    I('Beef mince (or halal burger patties)', 600, 'g', 'alakhwan', 60), I('Burger buns', 1, 'pack', 'netto', 15), I('Lettuce', 1, '', 'netto', 12),
    I('Tomatoes', 2, '', 'netto', 6), I('Cheese slices', 1, 'pack', 'netto', 15), I('Oven fries', 1, 'bag', 'netto', 15)] },
  { id: 'chili-con-carne', name: 'Chili con carne', cuisine: 'Western', type: 'main', minutes: 50, ingredients: [
    I('Beef mince', 500, 'g', 'alakhwan', 50), I('Kidney beans (tin)', 2, '', 'netto', 14), CHOPPED_TOM, ONIONS,
    I('Basmati rice', 400, 'g', 'bazar', 12, true), I('Chili spice mix', 1, 'pack', 'netto', 10, true)] },
  { id: 'wraps', name: 'Wraps (chicken or beef)', cuisine: 'Western', type: 'main', minutes: 30, ingredients: [
    I('Chicken or beef strips', 600, 'g', 'alakhwan', 55), I('Tortilla wraps', 1, 'pack', 'netto', 15), I('Lettuce', 1, '', 'netto', 12),
    I('Tomatoes', 2, '', 'netto', 6), CHEESE, I('Sour cream', 1, 'tub', 'netto', 10)] },
  { id: 'lasagne', name: 'Lasagna (meat)', cuisine: 'Western', type: 'main', minutes: 75, note: 'Use stock instead of wine in the sauce.', ingredients: [
    MINCE, I('Lasagne sheets', 1, 'pack', 'netto', 12), CHOPPED_TOM, CHEESE, I('Milk', 1, 'l', 'netto', 12), ONIONS] },
  { id: 'low-carb-lasagna', name: 'Low-carb lasagna', cuisine: 'Western', type: 'main', minutes: 75, note: 'Sliced courgette instead of lasagne sheets.', ingredients: [
    MINCE, I('Courgettes', 3, '', 'netto', 18), CHOPPED_TOM, CHEESE, I('Cottage cheese', 1, 'tub', 'netto', 15)] },
  { id: 'veggie-lasagna', name: 'Veggie lasagna', cuisine: 'Western', type: 'main', minutes: 75, ingredients: [
    I('Lasagne sheets', 1, 'pack', 'netto', 12), I('Courgettes', 2, '', 'netto', 12), I('Spinach (frozen)', 450, 'g', 'netto', 15),
    CHOPPED_TOM, CHEESE, I('Milk', 1, 'l', 'netto', 12)] },
  { id: 'pizza', name: 'Pizza', cuisine: 'Western', type: 'main', minutes: 40, ingredients: [
    I('Pizza dough', 2, 'pack', 'netto', 20), I('Tomato passata', 1, '', 'netto', 8), I('Mozzarella', 2, '', 'netto', 20),
    I('Halal pepperoni or chicken', 1, 'pack', 'alakhwan', 30), I('Peppers', 2, '', 'netto', 10)] },
  { id: 'spaghetti-bolognese', name: 'Pasta kødsovs', cuisine: 'Western', type: 'main', minutes: 40, photo: U('1673442635965-34f1b36d8944'), ingredients: [
    I('Beef mince', 500, 'g', 'alakhwan', 50), I('Spaghetti', 500, 'g', 'netto', 10), CHOPPED_TOM, I('Onions', 1, '', 'netto', 2), I('Carrots', 2, '', 'netto', 4)] },
  { id: 'baked-pasta', name: 'Baked pasta', cuisine: 'Western', type: 'main', minutes: 50, ingredients: [
    I('Penne', 500, 'g', 'netto', 10), I('Beef mince', 500, 'g', 'alakhwan', 50), CHOPPED_TOM, CHEESE, I('Onions', 1, '', 'netto', 2)] },
  { id: 'meatball-spaghetti', name: 'Meatballs and spaghetti', cuisine: 'Western', type: 'main', minutes: 50, ingredients: [
    I('Beef mince', 600, 'g', 'alakhwan', 60), I('Spaghetti', 500, 'g', 'netto', 10), CHOPPED_TOM, I('Eggs', 1, '', 'netto', 3),
    I('Breadcrumbs', 1, 'pack', 'netto', 10, true), I('Onions', 1, '', 'netto', 2)] },
  { id: 'kylling-karry', name: 'Kylling i karrysovs', cuisine: 'Western', type: 'main', minutes: 40, ingredients: [
    I('Chicken breast', 800, 'g', 'alakhwan', 70), I('Curry powder', 1, 'pack', 'netto', 10, true), I('Cream', 250, 'ml', 'netto', 12),
    I('Leek', 1, '', 'netto', 8), I('Apple', 1, '', 'netto', 3), I('Basmati rice', 400, 'g', 'bazar', 12, true)] },
  { id: 'shepherds-pie', name: "Shepherd's pie", cuisine: 'Western', type: 'main', minutes: 75, ingredients: [
    I('Lamb mince', 750, 'g', 'alakhwan', 80), I('Potatoes', 1.5, 'kg', 'netto', 18), I('Carrots', 3, '', 'netto', 6),
    I('Frozen peas', 300, 'g', 'netto', 8), ONIONS, I('Milk', 0.5, 'l', 'netto', 6)] },
  { id: 'mac-fried-chicken', name: 'Mac and cheese with fried chicken', cuisine: 'Western', type: 'main', minutes: 50, ingredients: [
    I('Macaroni', 500, 'g', 'netto', 10), I('Cheddar', 300, 'g', 'netto', 30), I('Milk', 1, 'l', 'netto', 12),
    I('Butter', 1, 'pack', 'netto', 20, true), I('Breaded chicken strips', 600, 'g', 'alakhwan', 55)] },
  { id: 'fish-pan-fried', name: 'Fish, pan fried', cuisine: 'Western', type: 'main', minutes: 30, ingredients: [
    I('White fish fillets (cod or plaice)', 800, 'g', 'netto', 80), I('Potatoes', 1, 'kg', 'netto', 12), I('Lemon', 1, '', 'netto', 4),
    I('Flour', 1, 'pack', 'netto', 10, true), I('Remoulade or tartar sauce', 1, '', 'netto', 12)] },
  { id: 'fish-sticks', name: 'Fish sticks', cuisine: 'Western', type: 'main', minutes: 25, ingredients: [
    I('Fish fingers', 1, 'big pack', 'netto', 35), I('Oven fries', 1, 'bag', 'netto', 15), I('Frozen peas', 500, 'g', 'netto', 12)] },

  // ---------- Asian ----------
  { id: 'beef-stir-fry', name: 'Stir-fry beef', cuisine: 'Asian', type: 'main', minutes: 30, ingredients: [
    I('Beef strips', 600, 'g', 'alakhwan', 70), I('Stir-fry vegetables', 2, 'bag', 'netto', 30), I('Soy sauce', 1, 'bottle', 'netto', 15, true),
    I('Egg noodles', 1, 'pack', 'netto', 12)] },
  { id: 'chicken-stir-fry', name: 'Stir-fry chicken', cuisine: 'Asian', type: 'main', minutes: 30, ingredients: [
    I('Chicken breast', 600, 'g', 'alakhwan', 55), I('Stir-fry vegetables', 2, 'bag', 'netto', 30), I('Soy sauce', 1, 'bottle', 'netto', 15, true),
    I('Basmati rice', 400, 'g', 'bazar', 12, true)] },
  { id: 'noodles', name: 'Noodles', cuisine: 'Asian', type: 'main', minutes: 25, ingredients: [
    I('Egg noodles', 2, 'pack', 'netto', 20), I('Chicken strips', 400, 'g', 'alakhwan', 40), I('Stir-fry vegetables', 1, 'bag', 'netto', 15),
    I('Soy sauce', 1, 'bottle', 'netto', 15, true), I('Eggs', 2, '', 'netto', 6)] },
  { id: 'chicken-soup', name: 'Chicken soup', cuisine: 'Asian', type: 'main', minutes: 60, photo: U('1701480253822-1842236c9a97'), ingredients: [
    CHICKEN, I('Carrots', 3, '', 'netto', 6), ONIONS, I('Rice noodles', 1, 'pack', 'netto', 10), I('Ginger', 1, 'piece', 'netto', 6)] },
  { id: 'halal-ramen', name: 'Halal ramen', cuisine: 'Asian', type: 'main', minutes: 40, note: 'Check the noodles’ flavour sachet is halal.', ingredients: [
    I('Ramen noodles', 4, 'pack', 'bazar', 40), I('Chicken breast', 500, 'g', 'alakhwan', 45), I('Eggs', 4, '', 'netto', 12),
    I('Spring onions', 1, 'bunch', 'netto', 8), I('Pak choi', 2, '', 'netto', 12)] },
  { id: 'thai-red-curry', name: 'Thai red curry', cuisine: 'Asian', type: 'main', minutes: 40, ingredients: [
    I('Chicken breast', 800, 'g', 'alakhwan', 70), I('Red curry paste', 1, 'jar', 'bazar', 18), I('Coconut milk (tin)', 2, '', 'netto', 20),
    I('Peppers', 2, '', 'netto', 10), I('Jasmine rice', 500, 'g', 'netto', 15, true)] },
  { id: 'salmon-teriyaki', name: 'Salmon teriyaki', cuisine: 'Asian', type: 'main', minutes: 30, note: 'Choose a teriyaki sauce without mirin (alcohol).', ingredients: [
    I('Salmon fillets', 4, '', 'netto', 90), I('Teriyaki sauce', 1, 'bottle', 'netto', 20), I('Jasmine rice', 400, 'g', 'netto', 12, true),
    I('Broccoli', 1, '', 'netto', 12)] },

  // ---------- Sides ----------
  { id: 'hot-wings', name: 'Hot wings', cuisine: 'Western', type: 'side', minutes: 40, ingredients: [
    I('Chicken wings', 1, 'kg', 'alakhwan', 50), I('Hot sauce', 1, 'bottle', 'netto', 15, true)] },
  { id: 'cream-potatoes', name: 'Cream potatoes', cuisine: 'Western', type: 'side', minutes: 60, ingredients: [
    I('Potatoes', 1, 'kg', 'netto', 12), I('Cream', 250, 'ml', 'netto', 12), GARLIC, I('Grated cheese', 100, 'g', 'netto', 10)] },
  { id: 'coleslaw', name: 'Coleslaw', cuisine: 'Western', type: 'side', minutes: 15, ingredients: [
    I('White cabbage', 1, '', 'netto', 10), I('Carrots', 2, '', 'netto', 4), I('Mayonnaise', 1, 'jar', 'netto', 15, true)] },
  { id: 'mash', name: 'Mash potatoes', cuisine: 'Western', type: 'side', minutes: 30, ingredients: [
    I('Potatoes', 1, 'kg', 'netto', 12), I('Milk', 0.5, 'l', 'netto', 6), I('Butter', 1, 'pack', 'netto', 20, true)] },
  { id: 'bean-salad', name: 'Bean salad', cuisine: 'Western', type: 'side', minutes: 10, ingredients: [
    I('Mixed beans (tin)', 2, '', 'netto', 14), I('Red onion', 1, '', 'netto', 3), I('Tomatoes', 2, '', 'netto', 6), I('Lemon', 1, '', 'netto', 4)] },
  { id: 'naan', name: 'Naan', cuisine: 'Desi', type: 'side', minutes: 5, ingredients: [
    I('Naan', 4, '', 'bazar', 20)] },
  { id: 'potato-wedges', name: 'Potato wedges', cuisine: 'Western', type: 'side', minutes: 40, ingredients: [
    I('Potatoes', 1, 'kg', 'netto', 12), I('Cooking oil', 1, 'bottle', 'netto', 25, true)] },
  { id: 'hasselback', name: 'Hasselback kartofler', cuisine: 'Western', type: 'side', minutes: 60, ingredients: [
    I('Potatoes', 1, 'kg', 'netto', 12), I('Butter', 1, 'pack', 'netto', 20, true)] },
  { id: 'biscuits', name: 'Biscuits', cuisine: 'Western', type: 'side', minutes: 2, ingredients: [
    I('Biscuits', 1, 'pack', 'netto', 15)] },
  { id: 'salad', name: 'Salad', cuisine: 'Desi', type: 'side', minutes: 10, photo: U('1752766074879-62b66c5f3477'), ingredients: [
    I('Lettuce', 1, '', 'netto', 12), TOMATOES, I('Cucumber', 1, '', 'netto', 6)] },
  { id: 'achar', name: 'Achar', cuisine: 'Desi', type: 'side', minutes: 1, ingredients: [
    I('Mixed pickle (achar)', 1, 'jar', 'bazar', 20, true)] },

  // ---------- Drinks ----------
  { id: 'yoghurt', name: 'Yoghurt', cuisine: 'Desi', type: 'drink', minutes: 2, ingredients: [
    I('Plain yoghurt', 1, 'kg', 'netto', 20)] },
  { id: 'lipton-lemon', name: 'Lipton lemon', cuisine: 'Western', type: 'drink', minutes: 1, ingredients: [
    I('Lipton Ice Tea lemon', 1.5, 'l', 'netto', 20)] },
  { id: 'ginger-ale', name: 'Ginger ale', cuisine: 'Western', type: 'drink', minutes: 1, ingredients: [
    I('Ginger ale', 1.5, 'l', 'netto', 18)] },
  { id: 'homemade-fanta', name: 'Homemade Fanta', cuisine: 'Western', type: 'drink', minutes: 10, ingredients: [
    I('Oranges', 1, 'kg', 'netto', 20), I('Sparkling water', 1.5, 'l', 'netto', 8), I('Sugar', 1, 'pack', 'netto', 10, true)] },
  { id: 'water', name: 'Water', cuisine: 'Western', type: 'drink', minutes: 1, ingredients: [] },
  { id: 'lemonade', name: 'Lemonade', cuisine: 'Western', type: 'drink', minutes: 10, ingredients: [
    I('Lemons', 4, '', 'netto', 16), I('Sugar', 1, 'pack', 'netto', 10, true)] },
];

// Ready-made menus for special occasions (main dish plus sides and drinks).
const STARTER_OCCASIONS = [
  { id: 'eid', name: 'Eid dinner', icon: '🌙', main: 'chicken-biryani', sides: ['salad', 'achar', 'yoghurt', 'ginger-ale'] },
  { id: 'iftar', name: 'Iftar evening', icon: '🕌', main: 'chicken-karahi', sides: ['naan', 'salad', 'lemonade'] },
  { id: 'guests', name: 'Guests for dinner', icon: '🎉', main: 'korma', sides: ['naan', 'salad', 'achar', 'homemade-fanta'] },
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
    cooking: 'Who is cooking?', home: 'Who is home?', guests: 'Guests', sides: 'Sides', drinks: 'Drinks', menus: 'Special menus',
    change: 'Change', clear: 'Clear day', done: 'Done', planNext: 'Plan next week', pantry: 'Pantry check',
    total: 'Rough cost this week', settings: 'Settings', nothing: 'Nothing planned yet. Tap to choose.' },
  ur: { week: 'اس ہفتے', recipes: 'ترکیبیں', shop: 'خریداری', tonight: 'آج رات', hello: 'السلام علیکم',
    cooking: 'کون پکائے گا؟', home: 'گھر پر کون ہے؟', guests: 'مہمان', sides: 'سائیڈ', drinks: 'مشروبات', menus: 'خاص مینو',
    change: 'تبدیل کریں', clear: 'دن صاف کریں', done: 'ٹھیک ہے', planNext: 'اگلے ہفتے کا پلان', pantry: 'گھر کا سامان',
    total: 'اس ہفتے کا اندازاً خرچ', settings: 'ترتیبات', nothing: 'ابھی کچھ طے نہیں۔ چننے کے لیے دبائیں۔' },
};
