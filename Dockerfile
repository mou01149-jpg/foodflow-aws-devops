# ─────────────────────────────────────────────────────────────────────────────
# FoodFlow – AWS Pipeline Dockerfile
# Base image : nginx:alpine  (small, secure, production-ready)
# Serves     : static HTML/CSS/JS app on port 80
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build stage (optional linting / asset validation) ────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all application source files
COPY FoodFlow/ .

# (Optional) If you add a package.json / build step later, install deps here.
# RUN npm ci && npm run build

# For now just validate that the key files exist
RUN ls -la index.html style.css script.js


# ── Stage 2: Production stage ─────────────────────────────────────────────────
FROM nginx:alpine AS production

LABEL maintainer="FoodFlow Team"
LABEL description="FoodFlow static web application"
LABEL version="1.0"

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built/validated static assets from builder stage
COPY --from=builder /app /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 inside the container
EXPOSE 80

# Health-check so ECS / ALB can verify the container is healthy
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in the foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
