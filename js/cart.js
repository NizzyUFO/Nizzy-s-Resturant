(async function () {
  // DOM hooks (existing from your page)
  const searchInput = document.getElementById('searchInput');
  const categoryButtonsEl = document.getElementById('categoryButtons');
  const resultsContainer = document.getElementById('resultsContainer');

  // state
  let searchTerm = '';
  let activeCategory = 'All';
  let dishes = []; // loaded from JSON

  // Load local JSON "offline API"
  async function loadDishes() {
    try {
      const res = await fetch('./data/nigerian-dishes.json', {cache: "no-store"});
      dishes = await res.json();
    } catch (err) {
      console.error('Failed to load dishes JSON', err);
      resultsContainer.innerHTML = `<div class="text-center py-20">
        <h3 class="text-red-600">Error loading menu. Please check the data file.</h3>
      </div>`;
    }
  }

  // CART helpers (localStorage)
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
  }

  function updateCartBadge() {
    // find navbar cart anchor
    const cartAnchor = document.querySelector('.cart-icon a');

    if (!cartAnchor) return;

    // create badge if missing
    let badge = document.getElementById('cart-count');
if (!badge) return; // if no badge, skip


    const cart = getCart();
   const count = cart.length; // shows number of distinct dishes, not total quantity

    badge.textContent = count;
    badge.style.display = count ? 'inline-block' : 'none';
  }

  // Toast (SweetAlert2) fallback if not loaded
  function showToast(message = 'Added to cart', icon = 'success') {
    if (window.Swal) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });
    } else {
      // minimal fallback
      const t = document.createElement('div');
      t.textContent = message;
      t.style.cssText = 'position:fixed; top:20px; right:20px; background:#111; color:#fff; padding:10px 16px; border-radius:8px; z-index:9999; opacity:.95;';
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 1500);
    }
  }

  // render category buttons (uses your categories - infer from menu page)
  const categories = [
    'Specials of the Day', 'Breakfast', 'Lunch',
    'Dinner', 'Snacks', 'Drinks', 'Traditional Meals'
  ];

  function cn(...cls){ return cls.filter(Boolean).join(' '); }

  function renderCategoryButtons() {
    categoryButtonsEl.innerHTML = '';
    categoryButtonsEl.appendChild(makeCategoryBtn('All', ' All Dishes'));
    categories.forEach(cat => categoryButtonsEl.appendChild(makeCategoryBtn(cat, cat)));
  }
  function makeCategoryBtn(catVal, label) {
    const btn = document.createElement('button');
    const isActive = activeCategory === catVal;
    btn.textContent = label;
    btn.className = cn('rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105',
      isActive ? 'active-cat' : 'inactive-cat');
    btn.onclick = () => {
      activeCategory = catVal;
      renderCategoryButtons();
      renderResults();
    };
    return btn;
  }

  function formatPrice(n) {
    return '₦' + Number(n).toLocaleString();
  }

  // Render results (uses dishes loaded from JSON)
  function renderResults() {
    const filtered = dishes.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    resultsContainer.innerHTML = '';

    if (filtered.length) {
  const heading = document.createElement('div');
  heading.className = 'text-center mb-8';
  heading.innerHTML = `<h2 class="text-3xl font-bold text-gray-800 mb-2">
    ${activeCategory === 'All' ? 'Our Menu' : activeCategory}
  </h2>`;
  resultsContainer.appendChild(heading);


      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
      filtered.forEach((item, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'animate-fade-in-up';
        wrapper.style.animationDelay = `${idx * 0.06}s`;
        wrapper.appendChild(makeFoodCard(item));
        grid.appendChild(wrapper);
      });
      resultsContainer.appendChild(grid);
    } else {
      resultsContainer.innerHTML = `<div class="text-center py-20 animate-fade-in-up">
        <div class="text-6xl mb-4">🍽️</div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">No dishes found</h2>
        <p class="text-gray-500 text-lg max-w-md mx-auto">We couldn't find any dishes matching your search. Try adjusting your filters or search terms.</p>
        <button class="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-8 py-3" onclick="resetFilters()">Show All Dishes</button>
      </div>`;
    }
  }

  // Create food card — updated to include image and add-to-cart functionality
  function makeFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-3xl shadow hover:shadow-xl transition-shadow duration-300 flex flex-col';

    const imgBox = document.createElement('div');
    imgBox.className = 'w-full h-40 rounded-t-3xl overflow-hidden bg-gray-200 flex items-center justify-center';
    const img = document.createElement('img');
    img.src = item.image || '';
    img.alt = item.name;
    img.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block;';
    imgBox.appendChild(img);
    card.appendChild(imgBox);

    const content = document.createElement('div');
    content.className = 'p-6 flex flex-col gap-4 flex-grow';
    const name = document.createElement('h3'); name.className = 'text-lg font-bold text-gray-800'; name.textContent = item.name;
    const price = document.createElement('p'); price.className = 'text-orange-600 font-semibold text-xl'; price.textContent = formatPrice(item.price);
    content.appendChild(name); content.appendChild(price);

    // Quantity
    let qty = 1; // default 1
    const qtyWrap = document.createElement('div'); qtyWrap.className = 'flex items-center gap-3';
    const minus = document.createElement('button'); minus.textContent='−'; minus.className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-xl';
    const display = document.createElement('span'); display.textContent = qty; display.style.minWidth='20px';
    const plus = document.createElement('button'); plus.textContent='+'; plus.className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-xl';
    minus.onclick = () => { if (qty>1) { qty--; display.textContent=qty; } };
    plus.onclick = () => { qty++; display.textContent=qty; };
    qtyWrap.append(minus, display, plus);
    content.appendChild(qtyWrap);

    // Add to cart button
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add to Cart';
    addBtn.className = 'bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-2 mt-auto';
    addBtn.onclick = () => {
      addToCart(item, qty);
    };
    content.appendChild(addBtn);

    card.appendChild(content);
    return card;
  }

  // Add item to cart
  window.addToCart = function(item, qty) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === item.id);
    if (idx > -1) {
      cart[idx].quantity = (cart[idx].quantity || 0) + qty;
    } else {
      cart.push({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: qty });
    }
    saveCart(cart);
    showToast(`${item.name} added to cart`);
  }

  // Reset helper for empty state button
  window.resetFilters = function() {
    searchTerm = '';
    activeCategory = 'All';
    if (searchInput) searchInput.value = '';
    renderCategoryButtons();
    renderResults();
  };

  // init
  await loadDishes();
  renderCategoryButtons();
  renderResults();
  updateCartBadge();

  // search listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      renderResults();
    });
  }

  // Expose updateCartBadge to other pages if needed
  window.updateCartBadge = updateCartBadge;

})();



const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "checkout.html");
      if (window.Swal) {
        Swal.fire({
          icon: "warning",
          title: "Please log in first",
          showConfirmButton: false,
          timer: 2000
        }).then(() => window.location.href = "login.html");
      } else {
        alert("Please log in first");
        window.location.href = "login.html";
      }
    } else {
      window.location.href = "checkout.html";
    }
  });
}

