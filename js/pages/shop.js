import { initGlobal, products } from '../main.js';

document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
    initShop();
});

function initShop() {
    const grid = document.getElementById('product-grid');
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat') || 'all';
    const search = params.get('search') || '';

    // Price Filter
    const range = document.getElementById('price-range');
    const display = document.getElementById('price-display');

    let maxPrice = 300;
    if (range) {
        range.addEventListener('input', (e) => {
            maxPrice = e.target.value;
            display.innerText = `$${maxPrice}`;
            render();
        });
    }

    function render() {
        let list = products.filter(p => p.price <= maxPrice);

        // Cat Filter
        if (cat !== 'all') list = list.filter(p => p.category === cat);
        else list = list.filter(p => p.category !== 'unisex');

        // Search Filter
        if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

        if (!list.length) {
            grid.innerHTML = '<p class="text-center" style="grid-column:1/-1">No treasures found.</p>';
            return;
        }

        grid.innerHTML = list.map(p => `
            <div class="product-card">
                <div class="card-img-wrapper">
                    <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
                </div>
                <h3 style="font-size:1.1rem; margin-bottom:0.5rem;">${p.name}</h3>
                <p style="color:var(--accent-primary); font-weight:700;">$${p.price}</p>
                <button class="btn btn-outline" style="margin-top:1rem; padding:0.5rem 1.5rem;" onclick="window.addToCart(${p.id})">Add to Cart</button>
            </div>
        `).join('');
    }

    document.querySelectorAll('.filter-link').forEach(l => {
        if (l.dataset.cat === cat) l.classList.add('active');
    });

    render();
}
