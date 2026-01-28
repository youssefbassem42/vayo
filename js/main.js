/* =========================================
   CORE / COMMON JS
   ========================================= */
import { products } from "./data.js";
export { products };

export const state = {
    cart: JSON.parse(localStorage.getItem('vayo_cart')) || [],
    theme: localStorage.getItem('vayo_theme') || 'light',
    user: JSON.parse(localStorage.getItem('vayo_user')) || null
};

export function saveCart() {
    localStorage.setItem('vayo_cart', JSON.stringify(state.cart));
    updateCartBadge();
}

export function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const qty = state.cart.reduce((a, b) => a + b.qty, 0);
        badge.textContent = qty;
        badge.style.display = qty > 0 ? 'flex' : 'none';
    }
}

export function checkAuth() {
    const userIcon = document.querySelector('.fa-user');
    if (userIcon && state.user) {
        // Change user icon to checkmark or something to indicate logged in, or link to profile
        userIcon.parentElement.href = "#"; // Prevent login link
        userIcon.style.color = "var(--accent-primary)";
        userIcon.title = `Logged in as ${state.user.username}`;

        // Add logout option? For now just visual indicator
        userIcon.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm(`Logout from ${state.user.username}?`)) {
                localStorage.removeItem('vayo_user');
                state.user = null;
                window.location.reload();
            }
        });
    }
}

export function initGlobal() {
    // Theme
    document.documentElement.setAttribute('data-theme', state.theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('vayo_theme', state.theme);
        });
    }

    updateCartBadge();
    checkAuth();

    // Search Modal
    const trig = document.querySelector('.search-icon');
    const modal = document.querySelector('.search-modal');
    const input = document.querySelector('.search-input');
    if (trig && modal) {
        trig.addEventListener('click', () => {
            modal.classList.toggle('active');
            if (modal.classList.contains('active')) input.focus();
        });
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                window.location.href = `shop.html?search=${encodeURIComponent(input.value)}`;
            }
        });
    }

    // Mobile Menu
    const ham = document.querySelector('.hamburger');
    const drawer = document.querySelector('.mobile-menu-drawer');
    if (ham && drawer) {
        ham.addEventListener('click', () => drawer.classList.toggle('active'));
    }
}

// Attach global helpers to window
window.addToCart = (id, qty = 1) => {
    const p = products.find(x => x.id === id);
    if (p) {
        const exist = state.cart.find(x => x.id === id);
        if (exist) exist.qty += qty;
        else state.cart.push({ ...p, qty });
        saveCart();
        alert('Added to Bag');
    } else {
        console.error("Product not found ID:", id);
    }
};
