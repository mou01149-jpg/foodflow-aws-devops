#!/bin/bash
# ============================================================
# FoodFlow – AWS CodeDeploy: ApplicationStart Hook
# ============================================================

set -e

echo "=== [CodeDeploy] Starting Apache httpd service ==="

# Set ownership of deployed files in /var/www/html
chown -R apache:apache /var/www/html
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;

# Enable httpd on boot and start/restart service
systemctl enable httpd
systemctl restart httpd

echo "=== [CodeDeploy] Apache httpd started successfully ==="
