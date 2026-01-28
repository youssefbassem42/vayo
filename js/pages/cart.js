import { initGlobal, state, saveCart } from '../main.js';

document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
    initCart();
});

function initCart() {
    const body = document.getElementById('cart-body');
    if (!state.cart.length) {
        body.innerHTML = '<tr><td colspan="6" class="text-center" style="padding:4rem; color:var(--text-secondary);">Your bag is currently empty.</td></tr>';
        return;
    }

    const render = () => {
        let sub = 0;
        body.innerHTML = state.cart.map(i => {
            sub += i.price * i.qty;
            return `
            <tr>
                <td>
                   <img src="${i.image}" class="cart-img-preview" alt="${i.name}">
                </td>
                <td>
                    <a href="product.html?id=${i.id}" class="cart-item-title">${i.name}</a>
                    <span class="cart-item-meta">${i.category ? i.category.charAt(0).toUpperCase() + i.category.slice(1) : 'Candle'}</span>
                </td>
                <td>$${i.price}</td>
                <td>
                    <div class="qty-control">
                       <button class="qty-btn-cart" onclick="window.updateQty(${i.id}, -1)">-</button>
                       <span class="qty-val-cart">${i.qty}</span>
                       <button class="qty-btn-cart" onclick="window.updateQty(${i.id}, 1)">+</button>
                    </div>
                </td>
                <td style="font-weight:700; color:var(--text-primary);">$${(i.price * i.qty).toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="window.del(${i.id})"><i class="fas fa-times"></i></button>
                </td>
            </tr>`;
        }).join('');

        const vat = sub * 0.15;
        document.getElementById('subtotal').innerText = `$${sub.toFixed(2)}`;
        document.getElementById('vat').innerText = `$${vat.toFixed(2)}`;
        document.getElementById('total').innerText = `$${(sub + vat).toFixed(2)}`;
    };

    window.del = (id) => {
        state.cart = state.cart.filter(x => x.id !== id);
        saveCart();
        location.reload();
    };

    window.updateQty = (id, delta) => {
        const item = state.cart.find(x => x.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty < 1) item.qty = 1;
            saveCart();
            location.reload();
        }
    };

    render();
}
