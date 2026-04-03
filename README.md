# E-Commerce Platform (React JS)

A modern, fast, and feature-rich front-end e-commerce application built with React. This platform provides a seamless shopping experience with product listings, dynamic filtering, a robust shopping cart, a user wishlist, and a side-by-side product comparison tool.

## 🚀 Features

- **Storefront & Product Browsing:** Displays diverse products with search, pagination, and category filtering.
- **Shopping Cart:** Add, remove, and adjust product quantities. State is persisted across browser sessions.
- **User Wishlist:** Save items for later viewing. Wishlist items are stored locally so you don't lose them.
- **Product Comparison:** Select up to 2 items and compare their fields (Price, Category, Rating, Stock) side by side.
- **Global State Persistence:** Utilizing advanced state management to keep user selections intact upon page refresh.
- **Form Management:** Fast, type-safe checkout forms with integrated schema validation.

## 📦 Technology Stack & Packages

This project leverages modern tooling to ensure high performance and strict type safety:

### Core Framework
- **[React 19](https://react.dev/):** Library for building user interfaces.
- **[Vite](https://vitejs.dev/):** Next-generation, lightning-fast frontend tooling and bundler.
- **[React Router DOM](https://reactrouter.com/):** Enabling declarative routing for the application pages (Home, Products, Compare, Cart, Categories, Checkout, etc.).

### State Management
- **[Zustand](https://github.com/pmndrs/zustand):** A small, fast, and scalable bearbones state management solution.
  - *Note: We utilize Zustand's `persist` middleware to automatically synchronize the Cart, Wishlist, and Comparison store states with `localStorage`.*

### Styling & UI
- **[Tailwind CSS (v4)](https://tailwindcss.com/):** A utility-first CSS framework for rapid and responsive UI development.
- **[React Hot Toast](https://react-hot-toast.com/):** Smoking hot notifications for user feedback (e.g., "Item added to cart!").

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/):** Performant, flexible, and extensible forms with easy-to-use validation.
- **[Yup](https://github.com/jquense/yup) & [@hookform/resolvers](https://github.com/react-hook-form/resolvers):** Schema validations tightly integrated with React Hook Form for robust validation rules.

### Testing
- **[Vitest](https://vitest.dev/):** Unbeatably fast unit testing framework integrated with the Vite build pipeline.
- **[Happy DOM](https://github.com/capricorn86/happy-dom):** A web browser environment used for running DOM-related Vitest tests.

## 🛠️ Installation & Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-platform-reactjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

Here are the commands you can run in your terminal:

- `npm run dev` - Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build` - Bundles the application into the `dist/` folder for production.
- `npm run lint` - Runs ESLint to check for code quality and syntax errors.
- `npm run preview` - Boots up a local static web server that serves the files from `dist/` to preview the production build.
- `npm run test` - Runs the Vitest test suite once.
- `npm run test:watch` - Runs Vitest in watch mode (reruns tests automatically when you modify files).

## 📂 Project Structure Overview

We organize the project primarily by **Feature** to make it scalable. 

```text
├── public/                 # Static assets (images, favicon, etc.)
├── src/                    
│   ├── components/         # Shared global UI components (Navbar, Footer, Modal, Layouts)
│   ├── features/           # Feature-based capsules
│   │   ├── cart/           # Cart components, Zustand store, hooks, logic
│   │   ├── compare/        # Compare functional hooks and store
│   │   ├── products/       # Product service API methods, components (ProductCard)
│   │   └── wishlist/       # Wishlist Zustand store and logic
│   ├── pages/              # View-level React Components mapped to Routes
│   │   ├── CartPage.jsx
│   │   ├── ComparePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailsPage.jsx
│   │   └── ...
│   ├── App.jsx             # Main App layout & Routing Provider
│   └── main.jsx            # React root mount point
├── package.json            # Project standard metadata & dependencies
├── vite.config.js          # Vite build and plugins configuration
└── eslint.config.js        # ESLint flat config file
```

## 🧪 Testing

We use **Vitest** testing library configured with **Happy DOM** for rendering React components virtually. 

To execute the test suites, run:
```bash
npm run test
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.
