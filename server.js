// ─────────────────────────────────────────────────────────────────────────────
// FoodFlow – Express Server
// Serves the static HTML/CSS/JS app with security, compression & health-check
// ─────────────────────────────────────────────────────────────────────────────

'use strict';

require('dotenv').config();

const express    = require('express');
const path       = require('path');
const helmet     = require('helmet');
const cors       = require('cors');
const morgan     = require('morgan');
const compression = require('compression');

// ── Config ────────────────────────────────────────────────────────────────────
const PORT      = process.env.PORT || 3000;
const NODE_ENV  = process.env.NODE_ENV || 'development';
const STATIC_DIR = path.join(__dirname, 'FoodFlow');

// ── App ───────────────────────────────────────────────────────────────────────
const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc:  ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com'],
        styleSrc:   ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        fontSrc:    ["'self'", 'fonts.gstatic.com'],
        imgSrc:     ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
      },
    },
  })
);

// CORS – restrict to same origin in production
app.use(cors({ origin: NODE_ENV === 'production' ? false : '*' }));

// Gzip compression
app.use(compression());

// HTTP request logging
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Parse JSON / URL-encoded bodies (ready for future API routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health-check endpoint (used by ALB / ECS) ─────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status:  'healthy',
    service: 'FoodFlow',
    env:     NODE_ENV,
    uptime:  process.uptime(),
    time:    new Date().toISOString(),
  });
});

// ── API routes (stub – extend as needed) ─────────────────────────────────────
app.get('/api/v1/menu', (_req, res) => {
  res.json({
    success: true,
    message: 'Menu data endpoint – connect to your DB or DynamoDB here',
    items:   [],
  });
});

app.get('/api/v1/orders', (_req, res) => {
  res.json({ success: true, orders: [] });
});

// ── Serve static files ────────────────────────────────────────────────────────
app.use(
  express.static(STATIC_DIR, {
    maxAge:  NODE_ENV === 'production' ? '1y' : 0,
    etag:    true,
    index:   'index.html',
  })
);

// ── SPA fallback – return index.html for any unknown route ───────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

// ── 404 & Error handlers ─────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({
    error:   NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🍔  FoodFlow server running`);
  console.log(`   Environment : ${NODE_ENV}`);
  console.log(`   Listening   : http://0.0.0.0:${PORT}`);
  console.log(`   Static dir  : ${STATIC_DIR}\n`);
});

module.exports = app; // export for testing
