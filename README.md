# Dastarkhwan

The Khan family's weekly dinner planner. *Dastarkhwan* is the Urdu and Persian word for the spread where the family sits down to eat together.

## What it does

- **This week:** a "Tonight" card, then Monday to Sunday. Tap a day to choose dinner (or eating out, takeaway, leftovers), add sides and drinks, pick who is cooking, mark who is not home and add guests. Quantities scale to the number of people eating.
- **Special menus:** Eid dinner, Iftar evening, Guests for dinner, or your own, applied to a day in one tap.
- **Recipes:** the family's own dinner list (Desi, Rice, Western, Asian) plus sides and drinks, all halal, with photos, ingredients, usual shop and a rough price. Add, edit and delete dishes, and take your own food photos.
- **Shopping:** built from the week's dinners and sides, grouped by shop (Al-Akhwan, Nordvest Bazar, Netto, plus Rema, Lidl and 365discount for offers), with a pantry check, household items, a rough weekly cost, and sharing by WhatsApp.
- **Settings:** family names (kept on the phone, not in this public code), usual servings, English or Urdu labels, light or dark theme.

Works on Android and iPhone: open the link and choose **Add to Home Screen**.

## Roadmap

- [x] Weekly plan, recipe bank, shopping list
- [x] Add, edit and delete dishes; change a day; eating out, takeaway, leftovers
- [x] Release A: Tonight card, warmer design, greeting, Urdu labels, dark mode, swipe between weeks, weekend nudge, always-fresh updates
- [x] Release B: servings, who is home, guests, who is cooking
- [x] Release C: WhatsApp sharing, pantry check, rough weekly cost
- [x] Release D: sides and desserts, special menus, food photos
- [x] The family's own dinner list: 57 dinners, 11 sides, 6 drinks; deleted dishes stay deleted
- [ ] Version 2: share the plan and lists across the family's phones
- [ ] Sara's recipes and family photos
- [ ] Family votes and ratings
- [ ] AI: dinner suggestions and the weekly offer check (tilbudsaviser)

Stock photos: [Unsplash](https://unsplash.com/license).

## Files

| File | What it is |
|---|---|
| `index.html` | The page itself: header, three tabs, bottom navigation |
| `style.css` | Colours, layout and phone-friendly design |
| `app.js` | How the app behaves: planning, recipes, shopping list |
| `data.js` | Starter recipes, shops and household items |
| `manifest.webmanifest`, `icon*.png`, `icon.svg` | Lets phones install it like an app |
| `sw.js` | Keeps it working offline, for example in the supermarket |
