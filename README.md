# VAYO - Luxury Candle eCommerce

![VAYO Preview](img/all_products.png)

**VAYO** is a premium, ultra-luxury eCommerce interface designed for high-end candle brands. Built with a focus on aesthetics, "Night Candlelight" dark mode, and smooth user experience, it mimics the feel of top-tier luxury retail sites.

## 🌟 Features

*   **Premium Design System**: Custom "Warm Sand" & "Charcoal" palette with a deeply integrated Dark Mode ("Night Candlelight").
*   **Modular Architecture**: Clean separation of concerns with page-specific CSS and JavaScript modules.
*   **Dynamic Cart**: Fully functional shopping cart with local storage persistence, kinetic quantity controls, and VAT calculation.
*   **Responsive Layouts**:
    *   **Hero Slider**: Full-screen immersive slider.
    *   **Sub-Hero Video**: Cinematic video section with blur overlays.
    *   **Split Sections**: Zig-zag layouts for Men/Women collections.
    *   **Mobile-First**: Optimized for devices from small phones (XS) to ultra-wide monitors (XXL).
*   **Search & Filtering**: Real-time product search and category filtering logic.

## 🛠️ Technology Stack

*   **Core**: Semantic HTML5, Vanilla CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+ Modules).
*   **Styling**: No frameworks. Pure, performance-optimized CSS with a modular file structure.
*   **Icons**: FontAwesome Solid.
*   **Fonts**: 'Playfair Display' (Headers) & 'Lato' (Body).

## 📂 Project Structure

The project follows a modular "Page-Based" architecture for easier maintenance:

```text
vayo-ecommerce/
├── css/
│   ├── style.css           # Core globals, vars, reset, header/footer
│   └── pages/              # Page-specific styles
│       ├── index.css
│       ├── shop.css
│       ├── product.css
│       ├── cart.css
│       └── auth.css
├── js/
│   ├── main.js             # Core logic (State, Cart, Global Events)
│   ├── data.js             # Product database
│   └── pages/              # Page-specific logic
│       ├── index.js
│       ├── shop.js
│       ├── ...
├── img/                    # Assets
├── index.html
├── shop.html
├── product.html
├── cart.html
└── ...
```

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/vayo-ecommerce.git
    ```
2.  **Open the project**:
    Simply open `index.html` in your browser. No build step or node server required (Live Server extension recommended for VS Code).

## 🎨 Design Philosophy

Inspired by the warmth of oud and the silence of the desert. The UI avoids pure black/white, favoring "Porcelain" and "Smoked Charcoal" to reduce eye strain and feel organic.

## 📄 License

[MIT](LICENSE) © 2026 VAYO.
