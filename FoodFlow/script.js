/**
 * FoodFlow - Main JavaScript
 * Handles: Cart, Orders, Search, Filters, Checkout, Toast, Navigation
 */

'use strict';

/* ==========================================
   FOOD DATA
   ========================================== */
const FOOD_ITEMS = [
  {
    id: 'f01',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    category: 'Pizza',
    price: 349,
    rating: 4.6,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    badge: 'Bestseller'
  },
  {
    id: 'f02',
    name: 'Pepperoni Pizza',
    restaurant: 'Pizza Palace',
    category: 'Pizza',
    price: 429,
    rating: 4.8,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80',
    badge: 'Popular'
  },
  {
    id: 'f03',
    name: 'Classic Cheeseburger',
    restaurant: 'Burger Hub',
    category: 'Burger',
    price: 199,
    rating: 4.5,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    badge: null
  },
  {
    id: 'f04',
    name: 'Double Smash Burger',
    restaurant: 'Burger Hub',
    category: 'Burger',
    price: 279,
    rating: 4.7,
    reviews: 303,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
    badge: 'Bestseller'
  },
  {
    id: 'f05',
    name: 'Chicken Hyderabadi Biryani',
    restaurant: 'Biryani Express',
    category: 'Biryani',
    price: 299,
    rating: 4.9,
    reviews: 621,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    badge: 'Top Rated'
  },
  {
    id: 'f06',
    name: 'Mutton Dum Biryani',
    restaurant: 'Biryani Express',
    category: 'Biryani',
    price: 399,
    rating: 4.8,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600&q=80',
    badge: 'Popular'
  },
  {
    id: 'f07',
    name: 'Veg Hakka Noodles',
    restaurant: 'Dragon Wok',
    category: 'Chinese',
    price: 179,
    rating: 4.3,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&q=80',
    badge: null
  },
  {
    id: 'f08',
    name: 'Chicken Manchurian',
    restaurant: 'Dragon Wok',
    category: 'Chinese',
    price: 249,
    rating: 4.5,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80',
    badge: 'Spicy'
  },
  {
    id: 'f09',
    name: 'Butter Chicken',
    restaurant: 'Spice Garden',
    category: 'Indian',
    price: 319,
    rating: 4.7,
    reviews: 529,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
    badge: 'Bestseller'
  },
  {
    id: 'f10',
    name: 'Paneer Tikka Masala',
    restaurant: 'Spice Garden',
    category: 'Indian',
    price: 279,
    rating: 4.6,
    reviews: 367,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    badge: null
  },
  {
    id: 'f11',
    name: 'Gulab Jamun',
    restaurant: 'Sweet Cravings',
    category: 'Desserts',
    price: 99,
    rating: 4.8,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1666639882386-5a36e358a0d3?w=600&q=80',
    badge: null
  },
  {
    id: 'f12',
    name: 'Chocolate Lava Cake',
    restaurant: 'Sweet Cravings',
    category: 'Desserts',
    price: 149,
    rating: 4.9,
    reviews: 318,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    badge: 'Must Try'
  },
  {
    id: 'f13',
    name: 'Mango Lassi',
    restaurant: 'Spice Garden',
    category: 'Beverages',
    price: 89,
    rating: 4.6,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?w=600&q=80',
    badge: null
  },
  {
    id: 'f14',
    name: 'Cold Coffee Frappe',
    restaurant: 'Cafe Buzz',
    category: 'Beverages',
    price: 129,
    rating: 4.4,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    badge: null
  },
  {
    id: 'f15',
    name: 'Dal Makhani',
    restaurant: 'Spice Garden',
    category: 'Indian',
    price: 229,
    rating: 4.5,
    reviews: 289,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80',
    badge: null
  },
  {
    id: 'f16',
    name: 'BBQ Chicken Pizza',
    restaurant: 'Pizza Palace',
    category: 'Pizza',
    price: 479,
    rating: 4.7,
    reviews: 334,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80',
    badge: 'New'
  }
];

const RESTAURANTS = [
  {
    id: 'r01',
    name: 'Pizza Palace',
    cuisine: 'Italian, Pizza',
    rating: 4.7,
    deliveryTime: '25-35 min',
    minOrder: 200,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
  },
  {
    id: 'r02',
    name: 'Burger Hub',
    cuisine: 'American, Burgers',
    rating: 4.5,
    deliveryTime: '20-30 min',
    minOrder: 150,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80'
  },
  {
    id: 'r03',
    name: 'Biryani Express',
    cuisine: 'Indian, Mughlai',
    rating: 4.9,
    deliveryTime: '30-40 min',
    minOrder: 250,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80'
  },
  {
    id: 'r04',
    name: 'Dragon Wok',
    cuisine: 'Chinese, Asian',
    rating: 4.4,
    deliveryTime: '25-35 min',
    minOrder: 180,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80'
  },
  {
    id: 'r05',
    name: 'Spice Garden',
    cuisine: 'North Indian, Mughlai',
    rating: 4.7,
    deliveryTime: '35-45 min',
    minOrder: 300,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
  },
  {
    id: 'r06',
    name: 'Sweet Cravings',
    cuisine: 'Desserts, Sweets',
    rating: 4.8,
    deliveryTime: '20-30 min',
    minOrder: 100,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80'
  }
];

/* ==========================================
   LOCALSTORAGE HELPERS
   ========================================== */
const Storage = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.error('Storage error:', e); }
  },
  remove(key) { localStorage.removeItem(key); }
};

/* ==========================================
   CART MANAGER
   ========================================== */
const Cart = {
  STORAGE_KEY: 'foodflow_cart',

  getItems() { return Storage.get(this.STORAGE_KEY) || []; },

  save(items) { Storage.set(this.STORAGE_KEY, items); },

  addItem(food) {
    const items = this.getItems();
    const existing = items.find(i => i.id === food.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...food, qty: 1 });
    }
    this.save(items);
    this.updateBadge();
    showToast('Added to cart!', `${food.name} added successfully.`, 'success');
  },

  removeItem(id) {
    const items = this.getItems().filter(i => i.id !== id);
    this.save(items);
    this.updateBadge();
  },

  updateQty(id, delta) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    const filtered = items.filter(i => i.qty > 0);
    this.save(filtered);
    this.updateBadge();
    return filtered;
  },

  clear() { this.save([]); this.updateBadge(); },

  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  getSubtotal() {
    return this.getItems().reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  getDeliveryFee(subtotal) {
    if (subtotal === 0) return 0;
    if (subtotal >= 500) return 0;
    return 40;
  },

  getDiscount(subtotal) {
    if (subtotal >= 600) return Math.round(subtotal * 0.05);
    return 0;
  },

  getTotal() {
    const sub = this.getSubtotal();
    const delivery = this.getDeliveryFee(sub);
    const discount = this.getDiscount(sub);
    return sub + delivery - discount;
  },

  updateBadge() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) { badge.classList.remove('hidden'); }
      else { badge.classList.add('hidden'); }
    });
  }
};

/* ==========================================
   ORDERS MANAGER
   ========================================== */
const Orders = {
  STORAGE_KEY: 'foodflow_orders',

  getAll() { return Storage.get(this.STORAGE_KEY) || []; },

  save(orders) { Storage.set(this.STORAGE_KEY, orders); },

  createOrder(details) {
    const orders = this.getAll();
    const id = 'FF-' + Date.now().toString(36).toUpperCase();
    const order = {
      id,
      items: Cart.getItems(),
      subtotal: Cart.getSubtotal(),
      delivery: Cart.getDeliveryFee(Cart.getSubtotal()),
      discount: Cart.getDiscount(Cart.getSubtotal()),
      total: Cart.getTotal(),
      date: new Date().toISOString(),
      status: 'placed',
      ...details
    };
    orders.unshift(order);
    this.save(orders);
    Cart.clear();
    return order;
  },

  getStatusLabel(status) {
    const map = {
      placed: 'Order Placed',
      preparing: 'Preparing',
      outfordelivery: 'Out for Delivery',
      delivered: 'Delivered'
    };
    return map[status] || 'Order Placed';
  },

  getStatusStep(status) {
    const steps = { placed: 0, preparing: 1, outfordelivery: 2, delivered: 3 };
    return steps[status] ?? 0;
  }
};

/* ==========================================
   TOAST NOTIFICATIONS
   ========================================== */
function showToast(title, message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.success}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="dismissToast(this.parentElement)">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => dismissToast(toast), 3500);
}

function dismissToast(el) {
  if (!el || !el.parentElement) return;
  el.classList.add('removing');
  setTimeout(() => { if (el.parentElement) el.parentElement.removeChild(el); }, 300);
}

/* ==========================================
   NAVIGATION
   ========================================== */
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // Set active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Scroll to top button
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) scrollBtn.classList.add('visible');
      else scrollBtn.classList.remove('visible');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

/* ==========================================
   HERO / HOME PAGE
   ========================================== */
function initHeroSearch() {
  const btn = document.getElementById('hero-search-btn');
  const input = document.getElementById('hero-search-input');
  const wrap = document.querySelector('.search-input-wrap');

  if (btn && input && wrap) {
    // Create live search popup container
    let dropdown = document.createElement('div');
    dropdown.className = 'hero-search-dropdown hidden';
    wrap.parentElement.appendChild(dropdown);

    const go = (searchQuery) => {
      const q = searchQuery !== undefined ? searchQuery.trim() : input.value.trim();
      if (q) window.location.href = `menu.html?search=${encodeURIComponent(q)}`;
      else window.location.href = 'menu.html';
    };

    btn.addEventListener('click', () => go());
    input.addEventListener('keypress', e => { if (e.key === 'Enter') go(); });

    // Live search suggestions on hero input
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        dropdown.classList.add('hidden');
        dropdown.innerHTML = '';
        return;
      }

      const matches = FOOD_ITEMS.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.restaurant.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `<div class="dropdown-item empty">No food found for "${input.value}"</div>`;
      } else {
        dropdown.innerHTML = matches.map(f => `
          <div class="dropdown-item" data-search="${f.name}">
            <img src="${f.image}" alt="${f.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=80'"/>
            <div class="dropdown-info">
              <div class="dropdown-name">${f.name}</div>
              <div class="dropdown-meta">${f.restaurant} • <span class="price">₹${f.price}</span></div>
            </div>
            <span class="dropdown-arrow">→</span>
          </div>
        `).join('');

        dropdown.querySelectorAll('.dropdown-item:not(.empty)').forEach(item => {
          item.addEventListener('click', () => {
            go(item.dataset.search);
          });
        });
      }

      dropdown.classList.remove('hidden');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!wrap.parentElement.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      window.location.href = `menu.html?search=${encodeURIComponent(tag.textContent.trim())}`;
    });
  });
}

function renderHomeFood() {
  const grid = document.getElementById('home-food-grid');
  if (!grid) return;
  const featured = FOOD_ITEMS.slice(0, 8);
  grid.innerHTML = featured.map(f => foodCardHTML(f)).join('');
  attachAddToCartEvents(grid);
}

function renderHomeRestaurants() {
  const grid = document.getElementById('home-restaurant-grid');
  if (!grid) return;
  grid.innerHTML = RESTAURANTS.map(r => restaurantCardHTML(r)).join('');
}

/* ==========================================
   MENU PAGE
   ========================================== */
let currentCategory = 'All';
let currentSort = 'default';
let currentSearch = '';

function initMenuPage() {
  const searchInput = document.getElementById('menu-search');
  const params = new URLSearchParams(window.location.search);
  const q = params.get('search');

  if (q) {
    currentSearch = q.trim().toLowerCase();
    if (searchInput) searchInput.value = q;

    // Check if query matches a category name exactly
    const catMatch = ['Pizza', 'Burger', 'Biryani', 'Chinese', 'Indian', 'Desserts', 'Beverages'].find(
      c => c.toLowerCase() === currentSearch
    );
    if (catMatch) {
      currentCategory = catMatch;
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat.toLowerCase() === catMatch.toLowerCase());
      });
      // Clear currentSearch so all items in this category show up
      currentSearch = '';
    }
  }

  renderMenuItems();

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim().toLowerCase();
      // Reset active category button to 'All' when typing in search to search across all dishes
      if (currentSearch.length > 0) {
        currentCategory = 'All';
        document.querySelectorAll('.cat-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.cat === 'All');
        });
      }
      renderMenuItems();
    });
  }

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      // Clear search when clicking category button
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      renderMenuItems();
    });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderMenuItems();
    });
  }
}

function getFilteredItems() {
  let items = [...FOOD_ITEMS];

  if (currentCategory !== 'All') {
    items = items.filter(f => f.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (currentSearch) {
    const query = currentSearch.trim().toLowerCase();
    items = items.filter(f =>
      f.name.toLowerCase().includes(query) ||
      f.restaurant.toLowerCase().includes(query) ||
      f.category.toLowerCase().includes(query) ||
      (f.badge && f.badge.toLowerCase().includes(query))
    );
  }

  if (currentSort === 'price-asc') items.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') items.sort((a, b) => b.price - a.price);
  else if (currentSort === 'rating') items.sort((a, b) => b.rating - a.rating);
  else if (currentSort === 'popular') items.sort((a, b) => b.reviews - a.reviews);

  return items;
}

function renderMenuItems() {
  const grid = document.getElementById('menu-food-grid');
  const info = document.getElementById('results-info');
  if (!grid) return;

  const items = getFilteredItems();
  if (info) {
    const searchInput = document.getElementById('menu-search');
    const term = searchInput && searchInput.value ? ` for "${searchInput.value}"` : '';
    info.innerHTML = `Showing <span>${items.length}</span> item${items.length !== 1 ? 's' : ''}${term}`;
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3>No food found</h3>
        <p>Try searching something else or clearing your filters.</p>
        <button class="btn-primary" style="margin-top:16px;padding:8px 20px;" onclick="resetMenuFilters()">Reset Filters</button>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(f => foodCardHTML(f)).join('');
  attachAddToCartEvents(grid);
}

function resetMenuFilters() {
  currentCategory = 'All';
  currentSearch = '';
  currentSort = 'default';
  const searchInput = document.getElementById('menu-search');
  const sortSelect = document.getElementById('sort-select');
  if (searchInput) searchInput.value = '';
  if (sortSelect) sortSelect.value = 'default';
  document.querySelectorAll('.cat-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === 'All');
  });
  renderMenuItems();
}

/* ==========================================
   CARD GENERATORS
   ========================================== */
function foodCardHTML(f) {
  return `
    <div class="food-card" data-id="${f.id}">
      <div class="food-card-image">
        <img src="${f.image}" alt="${f.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'"/>
        ${f.badge ? `<span class="food-card-badge">${f.badge}</span>` : ''}
        <button class="food-card-fav" aria-label="Favourite" title="Add to wishlist">♥</button>
      </div>
      <div class="food-card-body">
        <div class="food-card-category">${f.category}</div>
        <h3 class="food-card-name">${f.name}</h3>
        <div class="food-card-restaurant">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          ${f.restaurant}
        </div>
        <div class="food-card-meta">
          <div class="food-card-rating">
            <span class="star">★</span>
            <span>${f.rating}</span>
            <span class="count">(${f.reviews})</span>
          </div>
          <div class="food-card-price">₹${f.price}</div>
        </div>
        <button class="food-card-add-btn" data-id="${f.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add to Cart
        </button>
      </div>
    </div>`;
}

function restaurantCardHTML(r) {
  const stars = '★'.repeat(Math.floor(r.rating)) + (r.rating % 1 >= 0.5 ? '½' : '');
  return `
    <div class="restaurant-card">
      <div class="restaurant-image">
        <img src="${r.image}" alt="${r.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'"/>
        <span class="restaurant-time-badge">🕐 ${r.deliveryTime}</span>
      </div>
      <div class="restaurant-body">
        <h3 class="restaurant-name">${r.name}</h3>
        <p class="restaurant-cuisine">${r.cuisine}</p>
        <div class="restaurant-meta">
          <span class="restaurant-rating" style="color:#f59e0b">★ ${r.rating}</span>
          <span class="restaurant-min-order">Min ₹${r.minOrder}</span>
        </div>
      </div>
    </div>`;
}

function attachAddToCartEvents(container) {
  container.querySelectorAll('.food-card-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const food = FOOD_ITEMS.find(f => f.id === id);
      if (food) {
        Cart.addItem(food);
        btn.textContent = 'Added ✓';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        setTimeout(() => {
          btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add to Cart`;
          btn.style.background = '';
        }, 1500);
      }
    });
  });

  container.querySelectorAll('.food-card-fav').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });
}

/* ==========================================
   CART PAGE
   ========================================== */
function initCartPage() {
  renderCartPage();
}

function renderCartPage() {
  const items = Cart.getItems();
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFull = document.getElementById('cart-full');
  const clearBtn = document.getElementById('clear-cart-btn');
  const placeOrderBtn = document.getElementById('place-order-btn');

  if (!cartItemsEl) return;

  if (items.length === 0) {
    if (cartEmpty) cartEmpty.classList.remove('hidden');
    if (cartFull) cartFull.classList.add('hidden');
    return;
  }

  if (cartEmpty) cartEmpty.classList.add('hidden');
  if (cartFull) cartFull.classList.remove('hidden');

  cartItemsEl.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80'"/>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <p class="cart-item-restaurant">${item.restaurant}</p>
        <div class="cart-item-bottom">
          <div class="qty-control">
            <button class="qty-btn qty-dec" data-id="${item.id}" aria-label="Decrease">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn qty-inc" data-id="${item.id}" aria-label="Increase">+</button>
          </div>
          <span class="cart-item-price">₹${item.price * item.qty}</span>
          <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  updateCartSummary();

  // Events
  cartItemsEl.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => { Cart.updateQty(btn.dataset.id, 1); renderCartPage(); });
  });
  cartItemsEl.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => { Cart.updateQty(btn.dataset.id, -1); renderCartPage(); });
  });
  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      Cart.removeItem(btn.dataset.id);
      showToast('Removed', 'Item removed from cart.', 'info');
      renderCartPage();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all items from cart?')) {
        Cart.clear();
        renderCartPage();
        showToast('Cart cleared', '', 'info');
      }
    });
  }

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', openCheckoutModal);
  }
}

function updateCartSummary() {
  const sub = Cart.getSubtotal();
  const delivery = Cart.getDeliveryFee(sub);
  const discount = Cart.getDiscount(sub);
  const total = sub + delivery - discount;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('cart-subtotal', `₹${sub}`);
  set('cart-delivery', delivery === 0 ? 'FREE' : `₹${delivery}`);
  set('cart-discount', discount > 0 ? `-₹${discount}` : '₹0');
  set('cart-total', `₹${total}`);

  const discountRow = document.getElementById('discount-row');
  if (discountRow) discountRow.style.display = discount > 0 ? '' : 'none';

  const deliveryNote = document.getElementById('delivery-note');
  if (deliveryNote) {
    if (sub === 0) deliveryNote.textContent = '';
    else if (sub >= 500) deliveryNote.textContent = '🎉 Free delivery!';
    else deliveryNote.textContent = `Add ₹${500 - sub} more for free delivery`;
  }
}

/* ==========================================
   CHECKOUT MODAL
   ========================================== */
let selectedPayment = 'cod';

function openCheckoutModal() {
  if (Cart.getItems().length === 0) {
    showToast('Cart is empty', 'Add items before checkout.', 'warning');
    return;
  }

  const existing = document.getElementById('checkout-modal-overlay');
  if (existing) existing.remove();

  const sub = Cart.getSubtotal();
  const delivery = Cart.getDeliveryFee(sub);
  const discount = Cart.getDiscount(sub);
  const total = sub + delivery - discount;

  const itemsHTML = Cart.getItems().map(i => `
    <div class="order-item-mini">
      <span class="item-name">${i.name} × ${i.qty}</span>
      <span>₹${i.price * i.qty}</span>
    </div>`).join('');

  const overlay = document.createElement('div');
  overlay.id = 'checkout-modal-overlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div class="modal-header">
        <h3 id="checkout-title">Checkout</h3>
        <button class="modal-close" onclick="closeCheckoutModal()" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">
        <div class="order-summary-mini">
          <h4>Order Summary</h4>
          ${itemsHTML}
          <div class="order-item-mini" style="margin-top:8px;padding-top:8px;border-top:1px solid #e8e0d8">
            <span>Subtotal</span><span>₹${sub}</span>
          </div>
          <div class="order-item-mini">
            <span>Delivery</span><span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span>
          </div>
          ${discount > 0 ? `<div class="order-item-mini" style="color:#22c55e"><span>Discount</span><span>-₹${discount}</span></div>` : ''}
          <div class="order-item-mini" style="font-weight:700;color:#1a1a2e">
            <span>Total</span><span>₹${total}</span>
          </div>
        </div>

        <form id="checkout-form" novalidate>
          <div class="form-group">
            <label for="cust-name">Full Name *</label>
            <input type="text" id="cust-name" placeholder="Enter your full name" required />
          </div>
          <div class="form-group">
            <label for="cust-phone">Mobile Number *</label>
            <input type="tel" id="cust-phone" placeholder="10-digit mobile number" pattern="[0-9]{10}" required />
          </div>
          <div class="form-group">
            <label for="cust-address">Delivery Address *</label>
            <textarea id="cust-address" placeholder="House no., Street, Area..." required></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="cust-city">City *</label>
              <input type="text" id="cust-city" placeholder="City" required />
            </div>
            <div class="form-group">
              <label for="cust-pincode">Pincode *</label>
              <input type="text" id="cust-pincode" placeholder="6-digit pincode" pattern="[0-9]{6}" required />
            </div>
          </div>
          <div class="form-group">
            <label>Payment Method *</label>
            <div class="payment-options">
              <div class="payment-option selected" data-pay="cod" id="pay-cod" tabindex="0" role="button">
                <span class="pay-icon">💵</span>Cash on Delivery
              </div>
              <div class="payment-option" data-pay="upi" id="pay-upi" tabindex="0" role="button">
                <span class="pay-icon">📱</span>UPI
              </div>
              <div class="payment-option" data-pay="card" id="pay-card" tabindex="0" role="button">
                <span class="pay-icon">💳</span>Card
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="place-order-btn" onclick="submitOrder()" id="submit-order-btn">
          Place Order — ₹${total}
        </button>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  overlay.querySelectorAll('.payment-option').forEach(opt => {
    const select = () => {
      overlay.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedPayment = opt.dataset.pay;
    };
    opt.addEventListener('click', select);
    opt.addEventListener('keypress', e => { if (e.key === 'Enter' || e.key === ' ') select(); });
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCheckoutModal();
  });

  document.addEventListener('keydown', handleEscClose);
}

function handleEscClose(e) {
  if (e.key === 'Escape') closeCheckoutModal();
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-modal-overlay');
  if (overlay) {
    overlay.style.animation = 'fadeIn 0.2s ease reverse';
    setTimeout(() => overlay.remove(), 200);
  }
  document.removeEventListener('keydown', handleEscClose);
}

function submitOrder() {
  const name = document.getElementById('cust-name')?.value.trim();
  const phone = document.getElementById('cust-phone')?.value.trim();
  const address = document.getElementById('cust-address')?.value.trim();
  const city = document.getElementById('cust-city')?.value.trim();
  const pincode = document.getElementById('cust-pincode')?.value.trim();

  if (!name) { showToast('Missing Name', 'Please enter your full name.', 'error'); return; }
  if (!phone || !/^\d{10}$/.test(phone)) { showToast('Invalid Phone', 'Please enter a valid 10-digit mobile number.', 'error'); return; }
  if (!address) { showToast('Missing Address', 'Please enter your delivery address.', 'error'); return; }
  if (!city) { showToast('Missing City', 'Please enter your city.', 'error'); return; }
  if (!pincode || !/^\d{6}$/.test(pincode)) { showToast('Invalid Pincode', 'Please enter a valid 6-digit pincode.', 'error'); return; }

  const payMap = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Card' };

  const order = Orders.createOrder({
    name, phone, address, city, pincode,
    paymentMethod: payMap[selectedPayment] || 'Cash on Delivery'
  });

  showOrderSuccess(order);
}

function showOrderSuccess(order) {
  const modal = document.querySelector('#checkout-modal-overlay .modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="order-success">
      <div class="success-icon checkmark"></div>
      <h3>Order Placed!</h3>
      <p>Your order has been placed successfully.</p>
      <p class="order-id">Order ID: <strong>${order.id}</strong></p>
      <p style="margin-top:8px;font-size:0.88rem;color:#888">Estimated delivery: 30-45 minutes</p>
      <div style="margin-top:28px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a href="orders.html" class="btn-primary" style="padding:12px 24px;font-size:0.9rem">View Orders</a>
        <a href="menu.html" class="btn-ghost" style="padding:12px 24px;font-size:0.9rem" onclick="closeCheckoutModal()">Order More</a>
      </div>
    </div>`;
}

/* ==========================================
   ORDERS PAGE
   ========================================== */
function initOrdersPage() {
  renderOrdersPage();
}

function renderOrdersPage() {
  const container = document.getElementById('orders-container');
  const emptyState = document.getElementById('orders-empty');
  if (!container) return;

  const orders = Orders.getAll();

  if (orders.length === 0) {
    container.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  container.classList.remove('hidden');

  container.innerHTML = orders.map(order => {
    const statusStep = Orders.getStatusStep(order.status);
    const statusLabels = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    const statusClass = 'status-' + order.status.replace(/\s/g,'').toLowerCase();
    const progressWidth = [0, 33, 66, 100][statusStep];

    const itemsHTML = order.items.map(item => `
      <div class="order-item-row">
        <img class="order-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=80'"/>
        <div class="order-item-details">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-qty">Qty: ${item.qty} × ₹${item.price}</div>
        </div>
        <div class="order-item-price">₹${item.price * item.qty}</div>
      </div>`).join('');

    const stepsHTML = statusLabels.map((label, i) => `
      <div class="progress-step">
        <div class="step-dot ${i < statusStep ? 'done' : i === statusStep ? 'active' : ''}">
          ${i < statusStep ? '✓' : i + 1}
        </div>
        <span class="step-label ${i === statusStep ? 'active' : ''}">${label}</span>
      </div>`).join('');

    return `
      <div class="order-card">
        <div class="order-card-header">
          <div>
            <div class="order-id-label">Order ID</div>
            <div class="order-id-value">${order.id}</div>
          </div>
          <div class="order-date">${new Date(order.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
          <span class="order-status-badge ${statusClass}">${Orders.getStatusLabel(order.status)}</span>
        </div>
        <div class="order-card-body">
          <div class="order-progress">
            <div class="progress-fill" style="width:calc(${progressWidth}% - 30px)"></div>
            ${stepsHTML}
          </div>
          <div class="divider" style="margin:20px 0 14px"></div>
          <div class="order-items-list">${itemsHTML}</div>
          <div class="order-info-grid">
            <div class="order-info-item">
              <div class="info-label">Delivery Address</div>
              <div class="info-value">${order.address}, ${order.city} - ${order.pincode}</div>
            </div>
            <div class="order-info-item">
              <div class="info-label">Payment Method</div>
              <div class="info-value">${order.paymentMethod}</div>
            </div>
            <div class="order-info-item">
              <div class="info-label">Customer</div>
              <div class="info-value">${order.name} · ${order.phone}</div>
            </div>
            <div class="order-info-item">
              <div class="info-label">Delivery</div>
              <div class="info-value" style="color:#22c55e">${order.delivery === 0 ? 'FREE' : '₹' + order.delivery}</div>
            </div>
          </div>
          <div class="order-total-row">
            <span>Order Total</span>
            <span>₹${order.total}</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ==========================================
   CONTACT FORM
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Missing Fields', 'Please fill all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }

    showToast('Message Sent!', "We'll get back to you within 24 hours.", 'success');
    form.reset();
  });
}

/* ==========================================
   GLOBAL INIT
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Init nav
  initNavigation();

  // Update cart badge on all pages
  Cart.updateBadge();

  // Page-specific init
  const path = window.location.pathname.split('/').pop() || 'index.html';

  if (path === 'index.html' || path === '') {
    initHeroSearch();
    renderHomeFood();
    renderHomeRestaurants();
  }

  if (path === 'menu.html') {
    initMenuPage();
  }

  if (path === 'cart.html') {
    initCartPage();
  }

  if (path === 'orders.html') {
    initOrdersPage();
  }

  if (path === 'contact.html') {
    initContactForm();
  }

  // Smooth hover effect for fav buttons
  document.querySelectorAll('.food-card-fav').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('active'));
  });
});
