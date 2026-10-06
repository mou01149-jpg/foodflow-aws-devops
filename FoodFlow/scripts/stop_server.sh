#!/bin/bash
# ============================================================
# FoodFlow – AWS CodeDeploy: ApplicationStop Hook
# ============================================================

echo "=== [CodeDeploy] Stopping Apache httpd ==="

if systemctl is-active --quiet httpd; then
    echo "Stopping running httpd service..."
    systemctl stop httpd
else
    echo "Apache httpd service is not currently running."
fi

echo "=== [CodeDeploy] ApplicationStop hook completed ==="
