const navbarToggle = document.querySelector(
    '.navbar-toggle'
)
const navbarMenu = document.querySelector('.navbar-menu')

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
})


const  video=document.getElementById('my vid');
 video.playbackRate=0.3;



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
