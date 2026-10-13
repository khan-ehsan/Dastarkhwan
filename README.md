# Dastarkhwan

The Khan family's weekly dinner planner. *Dastarkhwan* is the Urdu and Persian word for the spread where the family sits down to eat together.

## What it does (version 1)

- **This week:** pick a dinner for each day, Monday to Sunday. It warns when the same cuisine comes twice in a row.
- **Recipes:** halal family recipes tagged by cuisine (Pakistani, Indian, Danish, Western, Italian, Chinese, Korean, Vietnamese), each with ingredients and the shop where we usually buy them. Add your own with the form.
- **Shopping:** built automatically from the week's dinners and grouped by shop (Al-Akhwan, Nordvest Bazar, Netto, plus Rema, Lidl and 365discount for offers). Use the shop selector to move an item to where it is on sale this week. Add household items with one tap.

Works on Android and iPhone: open the link and choose **Add to Home Screen**.

## Roadmap

1. Weekly plan, recipe bank, shopping list (data saved on each phone) ✅
2. Share the plan and list across the family's phones
3. Sara's recipe book and dish list loaded
4. Family voting on dinners
5. AI: dinner suggestions and the weekly offer check (tilbudsaviser)

## Files

| File | What it is |
|---|---|
| `index.html` | The page itself: header, three tabs, bottom navigation |
| `style.css` | Colours, layout and phone-friendly design |
| `app.js` | How the app behaves: planning, recipes, shopping list |
| `data.js` | Starter recipes, shops and household items |
| `manifest.webmanifest`, `icon*.png`, `icon.svg` | Lets phones install it like an app |
| `sw.js` | Keeps it working offline, for example in the supermarket |
