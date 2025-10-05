# 🛒 React E-commerce App

A simple e-commerce application built with **React + TypeScript**, **MobX** for state management, and **React Router** for navigation.
Includes product listing, filtering, sorting, cart management, and an order success flow.
End-to-end tests are written with **Cypress**.

---

## 🚀 Features

* Browse products by category
* Sort products by price (low → high, high → low)
* View product details
* Add products to cart
* Increment, decrement, and remove items in cart
* Checkout and view order success summary

---

## 🛠️ Tech Stack

* **Frontend**: React, TypeScript, Tailwind CSS, Headless UI
* **State Management**: MobX
* **Routing**: React Router v6
* **API**: Mock `fetchProducts` & `fetchCategories` services
* **Testing**: Cypress (E2E)

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/itiwariarun/Mobx-Ecom.git
cd ecommerce-app

# Install dependencies
npm install
```

---

## ▶️ Running the App

```bash
# Start development server
npm start
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Cypress Tests

```bash
# Start the dev server first
npm start

# In another terminal, run Cypress
npm run cypress:open
```

Run headless:

```bash
npm run cypress:run
```

---

## ✅ Cypress Test Scenarios

Our Cypress suite covers the full e-commerce flow:

1. **Product Display On Home Page**
2. **Navigate to Product Details Page**

---

## 📂 Project Structure

```
ecommerce-app/
├── cypress/                 # Cypress test cases
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── ...
├── src/
│   ├── components/          # UI components
│   │   ├── hooks/
│   │   │   ├── useCategory.ts
│   │   │   └── useProduct.ts
│   │   ├── icons/
│   │   │   ├── Bag.tsx
│   │   │   └── Cart.tsx
│   │   ├── Categories.tsx
│   │   ├── CartSidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileFilters.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── Ratting.tsx
│   │   └── SortMenu.tsx
│   │
│   ├── pages/               # Page-level components
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   ├── Order.tsx
│   │   └── ProductDetail.tsx
│   │
│   ├── services/            # API services
│   │   └── api.ts
│   │
│   ├── store/               # MobX store
│   │   └── index.ts
│   │
│   │
│   ├── type/                # ts interfaces
│   │   └── index.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── constants.ts
│   │   └── index.ts
│   │
│   ├── App.tsx              # Main app component
│   └── index.tsx            # Entry point
│
├── package.json
└── README.md
```

---

## 🎯 Next Steps

* Add authentication
* Connect with real backend for cart flow

---

## 📜 License

MIT License © 2025
