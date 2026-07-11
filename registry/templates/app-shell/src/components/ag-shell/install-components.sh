#!/usr/bin/env bash
# Install components required by the North Star app shell showcase.
# Usage: NS_REGISTRY_URL=https://your-registry.example.com bash install-components.sh

set -euo pipefail

REGISTRY="${NS_REGISTRY_URL:-}"
if [ -z "$REGISTRY" ]; then
  echo "Set NS_REGISTRY_URL to the registry web URL (no trailing slash), not a folder path."
  echo "Terminal:  export NS_REGISTRY_URL=http://localhost:3000  (npm run dev in REGISTRY_DIR)"
  echo "Cursor:    export NS_REGISTRY_URL=http://localhost:3002  (npm run dev:install in REGISTRY_DIR, do not open in browser)"
  echo "Deploy:    export NS_REGISTRY_URL=https://design.northstar.example.com"
  exit 1
fi

add_registry() {
  echo "→ Adding $1 from registry"
  npx shadcn@latest add "${REGISTRY}/r/$1" --yes
}

add_shadcn() {
  echo "→ Adding $1 (shadcn)"
  npx shadcn@latest add "$1" --yes
}

# Upstream shadcn primitives (sidebar shell dependencies)
add_shadcn sidebar
add_shadcn separator
add_shadcn skeleton

# NS registry components
add_registry button
add_registry input
add_registry card
add_registry alert
add_registry badge
add_registry avatar
add_registry table
add_registry stepper
add_registry top-nav

# Charts (includes chart.tsx, card, select, use-document-theme)
add_registry chart-bar-default
add_registry chart-bar-stacked
add_registry chart-pie-donut
add_registry chart-line-dots
add_registry chart-area-interactive

# label often ships with shadcn form, add if missing
add_shadcn label 2>/dev/null || true

echo "Done. Run npm run dev and open /login"
