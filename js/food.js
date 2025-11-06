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


// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  try {
    lucide.createIcons();
  } catch (error) {
    console.error('Failed to initialize Lucide icons:', error);
    document.querySelectorAll('.lucide-icon.fallback').forEach(svg => {
      svg.style.display = 'block';
    });
  }
});

// Animated Counters
const animateCounters = () => {
  const targets = { meals: 10000, customers: 5000, restaurants: 200 };
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  let currentStep = 0;

  const mealsEl = document.getElementById('meals-counter');
  const customersEl = document.getElementById('customers-counter');
  const restaurantsEl = document.getElementById('restaurants-counter');

  if (!mealsEl || !customersEl || !restaurantsEl) {
    console.error('Counter elements not found');
    return;
  }

  // Reset counters to 0
  mealsEl.textContent = '0+';
  customersEl.textContent = '0+';
  restaurantsEl.textContent = '0+';

  const timer = setInterval(() => {
    currentStep++;
    const progress = Math.min(currentStep / steps, 1);
    mealsEl.textContent = Math.floor(targets.meals * progress).toLocaleString() + '+';
    customersEl.textContent = Math.floor(targets.customers * progress).toLocaleString() + '+';
    restaurantsEl.textContent = Math.floor(targets.restaurants * progress).toLocaleString() + '+';

    if (currentStep >= steps) {
      clearInterval(timer);
      mealsEl.textContent = targets.meals.toLocaleString() + '+';
      customersEl.textContent = targets.customers.toLocaleString() + '+';
      restaurantsEl.textContent = targets.restaurants.toLocaleString() + '+';
    }
  }, stepDuration);
};

const statsSection = document.getElementById('stats');

if (statsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(statsSection);

  // Initial check in case section is already in view
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    animateCounters();
  }
}

// Testimonials
const testimonials = [
  {
    text: "Savora has transformed the way I order food. The delivery is always on time and the food arrives fresh and hot!",
    author: "Lisa Wang",
    location: "San Francisco"
  },
  {
    text: "As a restaurant owner, partnering with Savora has increased our reach significantly. Their platform is intuitive and effective.",
    author: "Tony Martinez",
    location: "Austin"
  },
  {
    text: "The variety of restaurants and cuisines available is amazing. I discover new favorites every week!",
    author: "Jennifer Adams",
    location: "Seattle"
  }
];

let activeTestimonial = 0;
let testimonialTimer = null;

const initializeTestimonials = () => {
  const textEl = document.getElementById('testimonial-text');
  const authorEl = document.getElementById('testimonial-author');
  const locationEl = document.getElementById('testimonial-location');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (!textEl || !authorEl || !locationEl || !dots.length) {
    console.error('Testimonial elements not found');
    return;
  }

  const updateTestimonial = () => {
    if (!testimonials[activeTestimonial]) {
      console.error('Invalid testimonial index:', activeTestimonial);
      return;
    }
    textEl.textContent = `"${testimonials[activeTestimonial].text}"`;
    authorEl.textContent = testimonials[activeTestimonial].author;
    locationEl.textContent = testimonials[activeTestimonial].location;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeTestimonial);
    });
  };

  const setTestimonial = (index) => {
    if (index < 0 || index >= testimonials.length) {
      console.error('Invalid testimonial index:', index);
      return;
    }
    activeTestimonial = index;
    updateTestimonial();
    if (testimonialTimer) {
      clearInterval(testimonialTimer);
    }
    testimonialTimer = setInterval(() => {
      activeTestimonial = (activeTestimonial + 1) % testimonials.length;
      updateTestimonial();
    }, 5000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => setTestimonial(index));
  });

  updateTestimonial();

  testimonialTimer = setInterval(() => {
    activeTestimonial = (activeTestimonial + 1) % testimonials.length;
    updateTestimonial();
  }, 5000);

  window.addEventListener('unload', () => {
    if (testimonialTimer) {
      clearInterval(testimonialTimer);
    }
  });
};

document.addEventListener('DOMContentLoaded', initializeTestimonials);

// Team Bio Toggle
const toggleBio = (btn) => {
  const bio = btn.nextElementSibling;
  const isVisible = bio.classList.contains('show');
  bio.classList.toggle('show');
  btn.textContent = isVisible ? 'Read Bio' : 'Hide Bio';
};

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

const handleScroll = () => {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

if (scrollTopBtn) {
  window.addEventListener('scroll', handleScroll);
  scrollTopBtn.addEventListener('click', scrollToTop);
}










// Sample food items data (replace with your actual data)
const foodItems = [
  { id: 1, name: "Margherita Pizza", category: "Dinner", description: "Classic pizza with tomato and mozzarella", price: 12.99 },
  { id: 2, name: "Pancakes", category: "Breakfast", description: "Fluffy pancakes with maple syrup", price: 8.99 },
  { id: 3, name: "Iced Coffee", category: "Drinks", description: "Chilled coffee with milk", price: 4.99 },
  // Add more items as needed
];

let searchTerm = '';
let activeCategory = 'All';

function renderFoodItems(items) {
  const foodGrid = document.getElementById('foodGrid');
  const resultsSection = document.getElementById('resultsSection');
  const noResultsSection = document.getElementById('noResultsSection');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsCount = document.getElementById('resultsCount');

  if (items.length > 0) {
    resultsSection.style.display = 'block';
    noResultsSection.style.display = 'none';
    resultsTitle.textContent = activeCategory === 'All' ? 'Our Complete Menu' : activeCategory;
    resultsCount.textContent = `${items.length} delicious ${items.length === 1 ? 'dish' : 'dishes'} found`;
    
    foodGrid.innerHTML = '';
    items.forEach((item, index) => {
      const template = document.getElementById('foodCardTemplate').content.cloneNode(true);
      const card = template.querySelector('.food-card');
      card.style.animationDelay = `${index * 0.1}s`;
      card.querySelector('h3').textContent = item.name;
      card.querySelector('p').textContent = item.description;
      card.querySelector('.text-orange-600').textContent = `$${item.price.toFixed(2)}`;
      
      // Quantity controls
      const quantitySpan = card.querySelector('.quantity');
      let quantity = 1;
      quantitySpan.textContent = quantity;
      card.querySelector('.decrease').addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
        }
      });
      card.querySelector('.increase').addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
      });
      
      // Add to cart (placeholder functionality)
      card.querySelector('.add-to-cart').addEventListener('click', () => {
        alert(`Added ${quantity} ${item.name} to cart!`);
      });
      
      foodGrid.appendChild(template);
    });
  } else {
    resultsSection.style.display = 'none';
    noResultsSection.style.display = 'block';
  }
}

function filterItems() {
  const filteredItems = foodItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  renderFoodItems(filteredItems);
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchTerm = e.target.value;
  filterItems();
});

document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    
    // Update button styles
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('bg-gradient-to-r', 'from-orange-500', 'to-red-500', 'text-white', 'shadow-lg', 'hover-shadow-xl', 'active');
      btn.classList.add('border-2', 'border-gray-200', 'hover-border-orange-300', 'hover-bg-orange-50');
    });
    button.classList.add('bg-gradient-to-r', 'from-orange-500', 'to-red-500', 'text-white', 'shadow-lg', 'hover-shadow-xl', 'active');
    button.classList.remove('border-2', 'border-gray-200', 'hover-border-orange-300', 'hover-bg-orange-50');
    
    filterItems();
  });
});

document.getElementById('resetFilters').addEventListener('click', () => {
  searchTerm = '';
  activeCategory = 'All';
  document.getElementById('searchInput').value = '';
  
  // Reset button styles
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('bg-gradient-to-r', 'from-orange-500', 'to-red-500', 'text-white', 'shadow-lg', 'hover-shadow-xl', 'active');
    btn.classList.add('border-2', 'border-gray-200', 'hover-border-orange-300', 'hover-bg-orange-50');
  });
  document.querySelector('.category-btn[data-category="All"]').classList.add('bg-gradient-to-r', 'from-orange-500', 'to-red-500', 'text-white', 'shadow-lg', 'hover-shadow-xl', 'active');
  
  filterItems();
});

// Initial render
renderFoodItems(foodItems);














document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("userIcon");
  const userCircle = document.getElementById("userCircle");
  const logoutBtn = document.getElementById("logoutBtn");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  // If user is logged in
  if (loggedUser) {
    userIcon.style.display = "none";
    userCircle.style.display = "flex";
    logoutBtn.style.display = "inline-block";
    userCircle.textContent = loggedUser.firstName[0] + loggedUser.lastName[0];
  }

  // When user clicks the user icon (login)
  userIcon.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // When user logs out
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    alert("✅ You have been logged out.");
    userCircle.style.display = "none";
    logoutBtn.style.display = "none";
    userIcon.style.display = "inline";
  });
});
