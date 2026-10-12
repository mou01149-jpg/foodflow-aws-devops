// ─────────────────────────────────────────────────────────────────────────────
// FoodFlow – Orders API Routes
// src/routes/orders.js
// ─────────────────────────────────────────────────────────────────────────────

'use strict';

const express = require('express');
const router  = express.Router();

// In-memory order store – replace with DynamoDB / RDS in production
const orders = [];
let orderIdCounter = 1;

// POST /api/v1/orders  – place a new order
router.post('/', (req, res) => {
  const { items, customerName, deliveryAddress, paymentMethod } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Order must contain at least one item' });
  }

  const total = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);

  const order = {
    id:              orderIdCounter++,
    items,
    customerName:    customerName || 'Guest',
    deliveryAddress: deliveryAddress || '',
    paymentMethod:   paymentMethod || 'card',
    total:           parseFloat(total.toFixed(2)),
    status:          'pending',
    createdAt:       new Date().toISOString(),
    estimatedTime:   '25–35 mins',
  };

  orders.push(order);
  console.log(`[ORDER] New order #${order.id} – $${order.total}`);

  res.status(201).json({ success: true, order });
});

// GET /api/v1/orders – list all orders
router.get('/', (_req, res) => {
  res.json({ success: true, count: orders.length, orders });
});

// GET /api/v1/orders/:id – get single order
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id, 10));
  if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
  res.json({ success: true, order });
});

// PATCH /api/v1/orders/:id/status – update order status
router.patch('/:id/status', (req, res) => {
  const VALID_STATUSES = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  const order = orders.find(o => o.id === parseInt(req.params.id, 10));
  if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

  order.status    = status;
  order.updatedAt = new Date().toISOString();

  res.json({ success: true, order });
});

module.exports = router;
