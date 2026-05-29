#!/usr/bin/env bash
#
# Regenerate the canonical translation template (.pot) from src/.
#
# The committed shared/languages/<canonical-slug>.pot is the single source the
# build renames + token-substitutes per target (tools/build.php). Regenerating
# it is a dev/release step — NOT part of the build itself, so building an
# artifact never requires WP-CLI; it just copies the committed .pot.
#
# WP-CLI is a documented dev/build prerequisite (https://wp-cli.org/). This
# script resolves it from PATH (`wp`) or a gitignored local phar (.wp-cli.phar),
# and skips gracefully (using the committed .pot as-is) when neither is present.
set -euo pipefail
cd "$(dirname "$0")/.."

SLUG="product-recommendation-quiz-for-ecommerce"
POT="shared/languages/${SLUG}.pot"

# Resolve a WP-CLI runner. The local phar emits PHP 8.x deprecation notices from
# a bundled dependency; error_reporting=24575 (E_ALL & ~E_DEPRECATED) mutes them.
if command -v wp >/dev/null 2>&1; then
    WP=(wp)
elif [ -f .wp-cli.phar ]; then
    WP=(php -d error_reporting=24575 .wp-cli.phar)
else
    echo "⚠ WP-CLI not found (no 'wp' on PATH, no .wp-cli.phar)."
    echo "  Skipping .pot regeneration; the committed ${POT} is used as-is."
    echo "  Install WP-CLI to refresh translations: https://wp-cli.org/"
    exit 0
fi

"${WP[@]}" i18n make-pot src "$POT" --slug="$SLUG" --domain="$SLUG"
echo "✓ regenerated $POT"
