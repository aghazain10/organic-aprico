#!/bin/bash
# Redeploy organic-aprico from GitHub main.
# Usage: /var/www/organic-aprico/deploy.sh
set -euo pipefail

# Resolve Node/npm/pm2 from nvm. A non-interactive SSH session does not source
# ~/.bashrc, so without this the script fails with "npm: command not found".
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -d "$NVM_DIR/versions/node" ]; then
    NODE_BIN="$(ls -d "$NVM_DIR"/versions/node/*/bin 2>/dev/null | sort -V | tail -1)"
    [ -n "$NODE_BIN" ] && export PATH="$NODE_BIN:$PATH"
fi

cd "$(dirname "$0")"

echo "Pulling latest code..."
git pull --ff-only origin main

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Syncing database schema..."
npx prisma db push

# Order ids are INT AUTO_INCREMENT. `prisma db push` creates the table with
# AUTO_INCREMENT = 1, so the first order would otherwise be #1. Raise the floor
# to 10001 once per database (continues past the ~10000 orders on the previous
# stores). Idempotent: MySQL never lowers the counter, so re-running is a no-op
# and never errors. See prisma/setup.sql for the same step + verification query.
echo "Seeding order number floor (first order = 10001)..."
printf 'ALTER TABLE `Order` AUTO_INCREMENT = 10001;\n' | npx prisma db execute --stdin --schema prisma/schema.prisma

echo "Building..."
npm run build

echo "Restarting process..."
pm2 restart organic-aprico --update-env

echo "Deploy complete."
