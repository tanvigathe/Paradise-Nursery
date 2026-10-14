# Paradise Nursery 🌿

Paradise Nursery is a responsive React plant-shop demo where customers can browse houseplants, filter and search products, add plants to a cart, change quantities, remove items, and view an order summary.

## Features
- Landing page with a background image and **Get Started** button
- About Us section describing Paradise Nursery
- Responsive plant product grid with category filters and search
- Shopping cart state managed with Redux Toolkit
- Add, remove, and update-quantity cart reducers
- Subtotal, delivery, and total calculations
- Responsive layouts for desktop and mobile

## Tech stack
- React
- Vite
- Redux Toolkit
- React Redux
- CSS

## Run locally
1. Install Node.js (LTS).
2. Open this project folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed in the terminal.

## Project files for the Coursera submission
- `src/README.md` is not required; this root `README.md` describes the project.
- `src/AboutUs.jsx` — company information
- `src/App.css` — landing-page background image and styling
- `src/App.jsx` — landing page and navigation
- `src/CartSlice.jsx` — addItem, removeItem, and updateQuantity reducers
- `src/ProductList.jsx` — product listing page
- `src/CartItem.jsx` — shopping cart page

## Note
Product images load from Unsplash, so an internet connection is needed to display them. Checkout is a demonstration and does not process real payments.