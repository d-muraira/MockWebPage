document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    const cartDataInput = document.getElementById('cart-data');

    if (orderForm && cartDataInput) {
        orderForm.addEventListener('submit', function(e) {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            const cartData = JSON.stringify(cart);
            cartDataInput.value = cartData;
        });
    } else {
        console.error('Order form or cart data input not found');
    }
});