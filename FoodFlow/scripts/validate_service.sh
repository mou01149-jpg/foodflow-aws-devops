#!/bin/bash
# ============================================================
# FoodFlow – AWS CodeDeploy: ValidateService Hook
# ============================================================

echo "=== [CodeDeploy] Validating FoodFlow web service ==="

# Give server 2 seconds to initialize
sleep 2

# Check if process is active
if systemctl is-active --quiet httpd; then
    echo "OK: Apache httpd service is active."
else
    echo "ERROR: Apache httpd service is NOT active!"
    exit 1
fi

# Send HTTP request to verify home page returns HTTP 200 OK
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/)

echo "HTTP Response Status Code: $HTTP_STATUS"

if [ "$HTTP_STATUS" -eq 200 ] || [ "$HTTP_STATUS" -eq 301 ] || [ "$HTTP_STATUS" -eq 302 ]; then
    echo "SUCCESS: FoodFlow application is serving web traffic cleanly!"
    exit 0
else
    echo "ERROR: Unexpected HTTP status $HTTP_STATUS when connecting to http://localhost/"
    exit 1
fi
