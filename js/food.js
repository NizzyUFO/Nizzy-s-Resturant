// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} added to cart!`);
    updateCart();
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
        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    // Update checkout page
    if (checkoutItems && checkoutTotal) {
        checkoutItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            checkoutItems.appendChild(itemElement);
            total += item.price;
        });
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
            window.location.href = 'index.html'; // Redirect to home page
        });
    }

    // Update cart on page load
    updateCart();
}); 

































// const navbarToggle = document.querySelector(
//     '.navbar-toggle'
// )
// const navbarMenu = document.querySelector('.navbar-menu')

// navbarToggle.addEventListener('click', () => {
//     navbarToggle.classList.toggle('active');
//     navbarMenu.classList.toggle('active');
// })


// const  video=document.getElementById('my vid');
//  video.playbackRate=0.3;



//  let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function updateCartUI() {
//   const cartItems = document.getElementById('cart-items');
//   cartItems.innerHTML = '';
//   let total = 0;

//   cart.forEach((item, index) => {
//     const li = document.createElement('li');
//     li.innerHTML = `
//       ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}
//       <button data-index="${index}" class="remove-item">Remove</button>
//     `;
//     cartItems.appendChild(li);
//     total += item.price * item.quantity;
//   });

//   document.getElementById('total').textContent = `Total: ₦${total.toLocaleString()}`;
//   localStorage.setItem('cart', JSON.stringify(cart));

//   document.querySelectorAll('.remove-item').forEach(button => {
//     button.addEventListener('click', (e) => {
//       const index = e.target.dataset.index;
//       cart.splice(index, 1);
//       updateCartUI();
//     });
//   });
// }

// document.querySelectorAll('.add-to-cart').forEach(button => {
//   button.addEventListener('click', () => {
//     const product = button.closest('.product');
//     const id = product.dataset.id;
//     const name = product.dataset.name;
//     const price = parseInt(product.dataset.price);

//     const existing = cart.find(item => item.id === id);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({ id, name, price, quantity: 1 });
//     }

//     updateCartUI();
//   });
// });

// updateCartUI(); 
