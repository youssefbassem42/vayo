import { initGlobal, products, saveCart } from '../main.js';

document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
    initProduct();
});

function initProduct() {
    const id = parseInt(new URLSearchParams(window.location.search).get('id'));
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById('p-image').src = p.image;
    document.getElementById('p-name').textContent = p.name;
    document.getElementById('p-price').textContent = `$${p.price}`;
    document.getElementById('p-desc').textContent = p.description;

    const qtyInput = document.getElementById('qty-input');

    // Qty Logic
    document.getElementById('qty-minus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        qtyInput.value = val + 1;
    });

    document.getElementById('add-btn').onclick = () => window.addToCart(id, parseInt(qtyInput.value));

    document.getElementById('buy-btn').onclick = () => {
        window.addToCart(id, parseInt(qtyInput.value));
        window.location.href = 'cart.html';
    };

    // Reviews local (simple mock for product page)
    const reviews = JSON.parse(localStorage.getItem('vayo_reviews')) || {};
    const list = document.getElementById('p-reviews');
    const pReviews = reviews[id] || [];

    if (pReviews.length === 0) list.innerHTML = '<li style="color:var(--text-muted); font-style:italic;">No reviews yet.</li>';
    else {
        list.innerHTML = pReviews.map(r => `
            <li style="margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid var(--border-color);">
               <p>"${r.text}"</p>
               <small style="color:var(--text-secondary);">- ${r.user}, ${r.date}</small>
            </li>
        `).join('');
    }

    document.getElementById('review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const text = document.getElementById('review-text').value;
        if (!text) return;

        if (!reviews[id]) reviews[id] = [];
        reviews[id].unshift({ text, date: new Date().toLocaleDateString(), user: "Guest" });
        localStorage.setItem('vayo_reviews', JSON.stringify(reviews));
        location.reload();
    });
}
