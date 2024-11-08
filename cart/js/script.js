async function fetchCart() {
    try {
        const response = await fetch("https://dummyjson.com/carts/1");
        const data = await response.json();
        const cart = data;
        const cartItemsContainer = document.getElementById('cart-items');

        let subtotal = 0;

        cart.products.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            let initialQuantity = 1;

            cartItem.innerHTML = 
            `
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="cart-item-details">
                    <h2>${product.title}</h2>
                    <p>Price per item: $${product.price}</p>
                </div>
                <div class="quantity-control">
                    <div class="quantity-control-value">
                        <button class="decrement">-</button>
                        <span class="quantity">${initialQuantity}</span>
                        <button class="increment">+</button>
                    </div>
                    <div class="cart-item-price">$${product.price * initialQuantity}</div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

            const decrementButton = cartItem.querySelector('.decrement');
            const incrementButton = cartItem.querySelector('.increment');
            const quantityDisplay = cartItem.querySelector('.quantity');
            const priceDisplay = cartItem.querySelector('.cart-item-price');

            subtotal += product.price * product.quantity;

            function updateOrderSummary() {
                const subtotal = calculateSubtotal();
                const discountPercentage = 0.20; // 20% discount
                const deliveryFee = 15;
            
                const discount = subtotal * discountPercentage;
                const total = subtotal - discount + deliveryFee;
            
                // Update the order summary DOM elements using the IDs
                document.getElementById('subtotal').innerText = subtotal.toFixed(2);
                document.getElementById('discount').innerText = discount.toFixed(2);
                document.getElementById('delivery-fee').innerText = deliveryFee.toFixed(2);
                document.getElementById('total').innerText = total.toFixed(2);
            }

            // Event listeners for quantity changes
            decrementButton.addEventListener('click', () => {
                let quantity = parseInt(quantityDisplay.innerText);
                if (quantity > 1) {
                    quantity--;
                    quantityDisplay.innerText = quantity;
                    const currentPrice = product.price * quantity;
                    priceDisplay.innerText = `$${currentPrice}`;
                    subtotal -= product.price;
                    updateOrderSummary(subtotal);
                }
            });

            incrementButton.addEventListener('click', () => {
                let quantity = parseInt(quantityDisplay.innerText);
                quantity++;
                quantityDisplay.innerText = quantity;
                const currentPrice = product.price * quantity;
                priceDisplay.innerText = `$${currentPrice}`;
                subtotal += product.price;
                updateOrderSummary(subtotal);
            });
        });

        updateOrderSummary(subtotal);

    } catch (error) {
        console.error("Error fetching the cart data:", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchCart);
