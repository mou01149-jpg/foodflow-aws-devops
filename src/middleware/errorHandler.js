// ─────────────────────────────────────────────────────────────────────────────
// FoodFlow – Middleware
// src/middleware/errorHandler.js
// ─────────────────────────────────────────────────────────────────────────────

'use strict';

/**
 * Centralised error-handling middleware.
 * Must be registered AFTER all routes.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  console.error(`[ERROR] ${req.method} ${req.originalUrl}`, err);

  const status  = err.status || err.statusCode || 500;
  const message = isProd ? 'Internal server error' : err.message;

  res.status(status).json({
    success: false,
    error:   message,
    ...(isProd ? {} : { stack: err.stack }),
  });
};

module.exports = errorHandler;
