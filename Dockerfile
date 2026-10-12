# ─────────────────────────────────────────────────────────────────────────────
# FoodFlow – AWS Pipeline Dockerfile (updated)
# Stage 1 : node:20-alpine  → installs deps & validates assets
# Stage 2 : nginx:alpine    → serves static files on port 80
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build / dependency stage ────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (leverages Docker layer caching)
COPY package*.json ./

# Install production + dev dependencies (nodemon needed for nothing at build
# time, but installs fast on Alpine – skip devDeps if you prefer speed)
RUN npm ci --omit=dev

# Copy application source
COPY FoodFlow/ ./client/
COPY server.js  ./
COPY .env*      ./

# Validate key static assets exist
RUN ls -la client/index.html client/style.css client/script.js


# ── Stage 2: Production (nginx) ───────────────────────────────────────────────
FROM nginx:alpine AS production

LABEL maintainer="FoodFlow Team"
LABEL description="FoodFlow – modern food-ordering app (nginx static)"
LABEL version="1.1"

# Clean the default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder
COPY --from=builder /app/client /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health-check for ECS / ALB
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
