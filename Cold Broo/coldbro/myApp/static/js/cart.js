
const cart = JSON.parse(localStorage.getItem('cart')) || {};


const selectedAmount = parseInt(localStorage.getItem('selectedAmount'), 10) || 0;


function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let totalItems = 0;

    for (const [type, quantity] of Object.entries(cart)) {
        if (quantity > 0) {
            const li = document.createElement('li');
            li.textContent = `${type}: ${quantity}`;
            cartItems.appendChild(li);
            totalItems += quantity;
        }
    }

    cartTotal.textContent = totalItems;
}


function addItem(type) {
    const totalItemsInCart = Object.values(cart).reduce((total, qty) => total + qty, 0);

    if (totalItemsInCart < selectedAmount) {
        if (cart[type]) {
            cart[type]++;
        } else {
            cart[type] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    } else {
        alert(`You can only add up to ${selectedAmount} items to the cart.`);
    }
}


function removeItem(type) {
    if (cart[type] && cart[type] > 0) {
        cart[type]--;
        if (cart[type] === 0) {
            delete cart[type];
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}


document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        addItem(type);
    });
});

document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        removeItem(type);
    });
});


document.addEventListener('DOMContentLoaded', updateCartUI);
