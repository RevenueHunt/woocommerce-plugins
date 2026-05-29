#!/usr/bin/env bash
#
# .pot freshness gate: fail if the committed template is out of date vs a fresh
# generation from src/. Prevents strings changing without 'composer i18n:pot'.
#
# Requires WP-CLI (CI installs it). Volatile metadata — the creation date, the
# WP-CLI version, the revision date and the copyright year — is normalized out
# so only the actual translatable content is compared.
set -euo pipefail
cd "$(dirname "$0")/.."

SLUG="product-recommendation-quiz-for-ecommerce"
POT="shared/languages/${SLUG}.pot"

if command -v wp >/dev/null 2>&1; then
    WP=(wp)
elif [ -f .wp-cli.phar ]; then
    WP=(php -d error_reporting=24575 .wp-cli.phar)
else
    echo "✗ pot-fresh: WP-CLI required (no 'wp' on PATH, no .wp-cli.phar)."
    exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
"${WP[@]}" i18n make-pot src "$TMP/fresh.pot" --slug="$SLUG" --domain="$SLUG" >/dev/null 2>&1

norm() {
    sed -E -e 's/^# Copyright \(C\) [0-9]+/# Copyright (C) YEAR/' \
           -e '/^"(POT-Creation-Date|X-Generator|PO-Revision-Date):/d' "$1"
}

if diff <(norm "$POT") <(norm "$TMP/fresh.pot") >/dev/null; then
    echo "✓ pot-fresh: committed $POT matches a fresh generation from src/"
else
    echo "✗ pot-fresh: $POT is STALE — run 'composer i18n:pot' and commit the result."
    echo "  (content diff, volatile headers normalized:)"
    diff <(norm "$POT") <(norm "$TMP/fresh.pot") || true
    exit 1
fi
