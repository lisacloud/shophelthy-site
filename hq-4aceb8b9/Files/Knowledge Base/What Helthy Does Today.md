# What Helthy Does Today

A plain-language map of every feature already built into the app, grouped by area. This is the spec we kept in Notion as "User Stories," all marked shipped as of early June 2026. It describes the current web app, before the iPhone wrap.

## Scanning

- **Scan a barcode.** After a scan, a preview drawer shows the product name, image, and score right away, so you can confirm you scanned the right item before opening the full detail.
- **Tag the store.** You can attach the store where you found a product, so future shoppers know where to buy it.

## The diabetes score

- **One verdict per product.** Every product gets a single green, yellow, red, or unknown score, and it is the most prominent thing on the product page. Green requires every threshold to pass; red is triggered by any single critical failure.
- **Honest about missing data.** When essential nutrition data is missing, the score returns "unknown" with a note on what is missing, rather than guessing a verdict that could mislead.
- **Updates itself.** If extra product data arrives in the background, the score refreshes on the spot, with no page reload and no stale "unknown" badges left behind.

## Product detail

- **Everything at a glance.** The header shows the image (or a clear "no image" label), name, brand, and score together.
- **Nutrition, summarized and in full.** A short summary of the key macros, plus a complete nutrient breakdown with units for anyone who wants to dig in.
- **Ingredients with severity highlighting.** The ingredient list is collapsible, flags ultra-processed (red) and processed (yellow) items inline with counts, and marks the top three as key ingredients.
- **Additives.** Detected additives are listed, and the section hides itself when there are none.
- **Serving size.** Shown below the header so the basis for the score is clear.

## Home

- **A personalized welcome banner** that greets the signed-in user.
- **A curated carousel of diabetes-friendly products**, so there are ideas to buy even without scanning. Each card shows image, name, brand, and a green score, and tapping it opens the product.
- **Recent scans** are shown so a returning user can jump back to something they just looked at.
- **A persistent scan button** is always within reach.

## Grocery list

- **Add and remove from the product page.** When an item is already on the list, the button switches to "Remove," and changes show immediately.
- **A full list view** of every item with its image, name, brand, and score.
- **It persists.** The list is tied to your account and reloads on any device when you sign in, so nothing is lost between shopping trips.

## Search

- **Search products by name or brand**, with results showing image, name, brand, and score. Tapping a result opens the product, so a list can be planned without scanning each item.

## Stores nearby

- **Find grocery stores near you.** The app requests your location and lists nearby stores. Store data comes from Open Food Facts tags and the Kroger API, and the location lookup runs in the background so it never blocks the screen.

## Food preferences

- **Set dietary preferences** such as low-carb or gluten-free. They save to your profile and shape how alternatives are ranked for you.

## Accounts

- **Sign up and sign in with email and password.** Sessions persist across reloads, so scans, list, and preferences sync across devices.
- **Sign out** from the profile page, so a device can be handed off without exposing data.
- **Protected screens.** Pages that need an account redirect to sign-in rather than showing broken or blank UI when a session expires.

## Under the hood

- **Product data is pulled from several sources in order:** Open Food Facts first, then Kroger, then GoUPC, with USDA as a fallback. The first source that answers wins, so the app rarely says "not found" for an item that exists somewhere.
- **Backend:** Supabase (project id `wnhwcgmlbqimphfleyqq`).
