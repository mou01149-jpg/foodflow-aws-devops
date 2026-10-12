#!/usr/bin/env bash
# =============================================================================
# FoodFlow – build.sh
# Assembles the production dist/ folder ready for S3 upload.
#
# Usage:
#   bash scripts/build.sh              # build only
#   bash scripts/build.sh --deploy     # build + sync to S3
#
# Required env vars for --deploy:
#   S3_BUCKET        e.g. foodflow-static-prod
#   AWS_DEFAULT_REGION e.g. us-east-1
#   CLOUDFRONT_DIST_ID  (optional) – invalidates CDN cache after upload
# =============================================================================

set -euo pipefail

DIST="dist"
SRC="FoodFlow"
ASSETS="assets"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🍔  FoodFlow – Production Build"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── Clean & create dist/ ──────────────────────────────────────────────────────
echo "[1/5] Cleaning dist/..."
rm -rf "$DIST"
mkdir -p "$DIST/assets/images" \
         "$DIST/assets/fonts"  \
         "$DIST/assets/css"    \
         "$DIST/assets/icons"

# ── Copy HTML pages ───────────────────────────────────────────────────────────
echo "[2/5] Copying HTML pages..."
for f in "$SRC"/*.html; do
  cp "$f" "$DIST/"
  echo "      ✔ $(basename "$f")"
done

# ── Copy CSS & JS ─────────────────────────────────────────────────────────────
echo "[3/5] Copying CSS & JS..."
cp "$SRC/style.css"  "$DIST/"
cp "$SRC/script.js"  "$DIST/"

# ── Copy assets/ ─────────────────────────────────────────────────────────────
echo "[4/5] Copying assets/..."
if [ -d "$ASSETS" ]; then
  cp -r "$ASSETS/." "$DIST/assets/"
fi

# ── Write build metadata ──────────────────────────────────────────────────────
echo "[5/5] Writing build metadata..."
BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
cat > "$DIST/build-info.json" <<JSON
{
  "app":       "FoodFlow",
  "version":   "1.0.0",
  "commit":    "$COMMIT",
  "builtAt":   "$BUILD_TIME",
  "env":       "production"
}
JSON

echo ""
echo "✅  dist/ assembled successfully"
echo "    Files: $(find "$DIST" -type f | wc -l | tr -d ' ')"
echo ""

# ── Optional S3 deploy ────────────────────────────────────────────────────────
if [[ "${1:-}" == "--deploy" ]]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  ☁️   Deploying to S3: s3://$S3_BUCKET"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Sync with correct content-type headers and cache settings
  aws s3 sync "$DIST/" "s3://$S3_BUCKET/" \
    --region "$AWS_DEFAULT_REGION" \
    --delete \
    --exclude "*.DS_Store" \
    --cache-control "public,max-age=31536000,immutable" \
    --include "assets/*"

  # HTML files: no-cache so users always get fresh content
  aws s3 sync "$DIST/" "s3://$S3_BUCKET/" \
    --region "$AWS_DEFAULT_REGION" \
    --exclude "*" \
    --include "*.html" \
    --include "build-info.json" \
    --cache-control "no-cache,no-store,must-revalidate" \
    --content-type "text/html; charset=utf-8"

  echo "✅  S3 sync complete"

  # CloudFront cache invalidation (optional)
  if [[ -n "${CLOUDFRONT_DIST_ID:-}" ]]; then
    echo "🔄  Invalidating CloudFront distribution $CLOUDFRONT_DIST_ID ..."
    aws cloudfront create-invalidation \
      --distribution-id "$CLOUDFRONT_DIST_ID" \
      --paths "/*"
    echo "✅  CloudFront invalidation submitted"
  fi
fi

echo ""
echo "🍔  FoodFlow build done!"
