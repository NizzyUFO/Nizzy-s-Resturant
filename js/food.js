// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* CHANGE START */
function addToCart(itemName, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 }); // Add new item with quantity 1
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} added to cart!`);
    updateCart();
}

function updateQuantity(index, change) {
    if (cart[index].quantity + change >= 1) { // Ensure quantity doesn't go below 1
        cart[index].quantity += change;
    } else {
        removeFromCart(index); // Remove item if quantity would be 0
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
/* CHANGE END */

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCart(); // Refresh cart display
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');

    // Update cart page
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;
        /* CHANGE START */
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}</span>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)" class="quantity-btn">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="quantity-btn">+</button>
                    <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
            total += itemTotal;
        });
        /* CHANGE END */
        cartTotal.textContent = total.toFixed(2);
    }

    // Update checkout page
    if (checkoutItems && checkoutTotal) {
        checkoutItems.innerHTML = '';
        let total = 0;
        /* CHANGE START */
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}`;
            checkoutItems.appendChild(itemElement);
            total += itemTotal;
        });
        /* CHANGE END */
        checkoutTotal.textContent = total.toFixed(2);
    }
}

function saveCartForCheckout() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Form submissions
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const bookingForm = document.getElementById('booking-form');
    const signupForm = document.getElementById('signup-form');
    const checkoutForm = document.getElementById('checkout-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! We will get back to you soon.');
            contactForm.reset();
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Table booked successfully!');
            bookingForm.reset();
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Sign up successful! Welcome to TastyBite.');
            signupForm.reset();
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Your cart is empty! Please add items to proceed.');
                return;
            }
            const name = document.getElementById('name').value;
            alert(`Thank you for your order, ${name}! Your order has been placed successfully.`);
            checkoutForm.reset();
            clearCart();
            window.location.href = 'index.html';
        });
    }

    // Update cart on page load
    updateCart();
}); 
