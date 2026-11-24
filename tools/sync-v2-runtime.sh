#!/usr/bin/env bash
# Generated runtime: build in frontend_v2, then sync before building the plugin.
set -euo pipefail
if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <frontend_v2 path>" >&2
  exit 1
fi
source_dir="$1/build/woocommerce"
target_dir="$(cd "$(dirname "$0")/.." && pwd)/src/assets/v2"
if [[ ! -f "$source_dir/quiz-renderer.js" || ! -f "$source_dir/runtime.json" ]]; then
  echo "Missing WooCommerce runtime. Run npm run build:woocommerce in frontend_v2 first." >&2
  exit 1
fi
# The frontend commit the build recorded: the release check compares it with frontend feat/v3.
built_from="$(sed -nE 's/.*"frontend":"([0-9a-f]{40}(-dirty)?)".*/\1/p' "$source_dir/runtime.json")"
if [[ ! "$built_from" =~ ^[0-9a-f]{40}$ ]]; then
  echo "The runtime names no clean frontend commit (runtime.json frontend: ${built_from:-none}). Rebuild it from a clean frontend_v2 checkout." >&2
  exit 1
fi
mkdir -p "$target_dir"
# Remove old hashed chunks as well as the previous entry.
find "$target_dir" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -R "$source_dir"/. "$target_dir"/
echo "Synced WooCommerce runtime built from frontend_v2 $built_from to $target_dir"
