// ─────────────────────────────────────────────────────────────────────────────
// FoodFlow – Menu API Routes
// src/routes/menu.js
// ─────────────────────────────────────────────────────────────────────────────

'use strict';

const express = require('express');
const router  = express.Router();

// Static menu data – replace with DB/DynamoDB queries in production
const MENU_ITEMS = [
  {
    id: 1, category: 'burgers',
    name: 'Classic Smash Burger', price: 12.99,
    description: 'Double smashed patty, cheddar, special sauce, brioche bun',
    image: '/assets/burger-classic.jpg', available: true, rating: 4.8,
  },
  {
    id: 2, category: 'pizza',
    name: 'Margherita Inferno', price: 14.99,
    description: 'San Marzano tomato, fresh mozzarella, basil, EVOO',
    image: '/assets/pizza-margherita.jpg', available: true, rating: 4.7,
  },
  {
    id: 3, category: 'sushi',
    name: 'Dragon Roll', price: 16.99,
    description: 'Shrimp tempura, avocado, spicy mayo, tobiko',
    image: '/assets/sushi-dragon.jpg', available: true, rating: 4.9,
  },
  {
    id: 4, category: 'desserts',
    name: 'Lava Cake', price: 7.99,
    description: 'Warm chocolate lava cake with vanilla bean ice cream',
    image: '/assets/dessert-lava.jpg', available: true, rating: 4.6,
  },
];

// GET /api/v1/menu
router.get('/', (_req, res) => {
  res.json({ success: true, count: MENU_ITEMS.length, items: MENU_ITEMS });
});

// GET /api/v1/menu/:id
router.get('/:id', (req, res) => {
  const item = MENU_ITEMS.find(i => i.id === parseInt(req.params.id, 10));
  if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
  res.json({ success: true, item });
});

// GET /api/v1/menu/category/:category
router.get('/category/:category', (req, res) => {
  const items = MENU_ITEMS.filter(i => i.category === req.params.category.toLowerCase());
  res.json({ success: true, count: items.length, items });
});

module.exports = router;
