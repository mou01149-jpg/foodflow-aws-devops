#!/bin/bash
# ============================================================
# FoodFlow – AWS CodeDeploy: Install Dependencies Hook
# Target OS: Amazon Linux 2 / Amazon Linux 2023 / RHEL
# ============================================================

set -e

echo "=== [CodeDeploy] Installing Apache (httpd) ==="

# Update package lists and install Apache httpd if not already installed
if ! command -v httpd &> /dev/null; then
    echo "httpd package not found. Installing..."
    if command -v dnf &> /dev/null; then
        dnf update -y
        dnf install -y httpd
    elif command -v yum &> /dev/null; then
        yum update -y
        yum install -y httpd
    fi
else
    echo "Apache httpd is already installed."
fi

# Ensure web root directory exists
mkdir -p /var/www/html
chown -R apache:apache /var/www/html
chmod -R 755 /var/www/html

echo "=== [CodeDeploy] Dependencies installation complete ==="
