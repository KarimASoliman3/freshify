# 🛒 Freshify

> A modern, full-featured e-commerce web application built with **Next.js 14** and **Clean Architecture** principles.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-freshify--beta.vercel.app-brightgreen?style=flat-square&logo=vercel)](https://freshify-beta.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📖 Overview

**Freshify** is a fully responsive e-commerce platform that allows users to browse products across multiple categories and brands, manage a wishlist, add items to a cart, and track their orders — all with a smooth and modern shopping experience.

The project is built following **Clean Architecture** to ensure a clear separation of concerns, high testability, and easy scalability.

---

## 🌐 Live Demo

🔗 [https://freshify-beta.vercel.app](https://freshify-beta.vercel.app)

---

## ✨ Features

- 🏠 **Home Page** — Hero banner, featured categories, brands, and products
- 🛍️ **Products** — Browse all products with filtering support
- 🗂️ **Categories** — Shop by category (Men's Fashion, Women's Fashion, Supermarket, Baby & Toys, Home, Music)
- 🏷️ **Brands** — Browse products by brand (Canon, Dell, Sony, Lenovo, Nokia, etc.)
- ❤️ **Wishlist** — Save favourite products for later
- 🛒 **Cart** — Add/remove products and manage quantities
- 📦 **All Orders** — View order history
- 🔐 **Authentication** — User login and registration
- 📱 **Fully Responsive** — Mobile-first design

---

## 🏗️ Architecture

This project follows **Clean Architecture**, separating the codebase into distinct, independent layers:

```
src/
├── app/                      # Next.js App Router (Presentation Layer)
│   ├── (auth)/               # Authentication routes (login, register)
│   ├── products/             # Product listing & detail pages
│   ├── categories/           # Category pages
│   ├── brands/               # Brand pages
│   ├── wishlist/             # Wishlist page
│   ├── allorders/            # Orders page
│   └── layout.tsx            # Root layout
│
├── components/               # Reusable UI Components
│   ├── ui/                   # Shadcn/UI primitives
│   ├── Navbar/               # Navigation bar
│   ├── Footer/               # Footer
│   ├── ProductCard/          # Product card widget
│   └── ...
│
├── domain/                   # Domain Layer (Business Entities & Interfaces)
│   ├── entities/             # Core data models (Product, Category, Brand, etc.)
│   └── repositories/         # Repository interfaces / contracts
│
├── data/                     # Data Layer (API calls & repository implementations)
│   ├── repositories/         # Concrete repository implementations
│   └── datasources/          # Remote data sources (API clients)
│
├── usecases/                 # Application Layer (Business Logic)
│   ├── products/             # Product-related use cases
│   ├── cart/                 # Cart use cases
│   ├── wishlist/             # Wishlist use cases
│   └── auth/                 # Auth use cases
│
├── context/                  # React Context (Global State)
│   ├── CartContext.tsx
│   └── AuthContext.tsx
│
└── lib/                      # Utilities & helpers
    └── utils.ts
```

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| **Presentation** (`app/`, `components/`) | UI rendering, routing, user interaction |
| **Application** (`usecases/`) | Business rules, orchestration of domain logic |
| **Domain** (`domain/`) | Core entities and repository contracts |
| **Data** (`data/`) | API calls, data fetching, external services |

> **Dependency Rule:** Each layer only depends on the layer directly below it. The domain layer has zero external dependencies.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework with App Router & SSR |
| [TypeScript](https://www.typescriptlang.org/) | Static type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Shadcn/UI](https://ui.shadcn.com/) | Accessible component library |
| [ESLint](https://eslint.org/) | Code linting |
| [Vercel](https://vercel.com/) | Deployment & hosting |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/KarimASoliman3/freshify.git

# 2. Navigate into the project
cd freshify

# 3. Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure (Top Level)

```
freshify/
├── public/             # Static assets (images, icons)
├── src/                # Application source code
├── components.json     # Shadcn/UI component config
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── eslint.config.mjs   # ESLint configuration
└── package.json        # Project dependencies & scripts
```

---

## 🌍 Deployment

This project is deployed on **Vercel**. Every push to the `master` branch triggers an automatic deployment.

To deploy your own instance:

1. Fork the repository
2. Import the project into [Vercel](https://vercel.com/new)
3. Set any required environment variables
4. Click **Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KarimASoliman3/freshify)

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build the application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👤 Author

**Karim A. Soliman**

- GitHub: [@KarimASoliman3](https://github.com/KarimASoliman3)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ using Next.js & Clean Architecture</p>
