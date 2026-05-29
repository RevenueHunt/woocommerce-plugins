#!/usr/bin/env bash
#
# Build-diff guard: proves the two artifacts derive from ONE source.
#
# Applies the configured token axes to every PHP file of the eCommerce build
# (the same forward transform build.php performs) and asserts the result is
# byte-identical to the WooCommerce build (after dropping the WC-only headers,
# which are the one legitimate code-level difference). Any divergence beyond
# the documented axes fails.
#
# Self-contained: depends only on build/ outputs. Run after build.php.
set -euo pipefail
cd "$(dirname "$0")/.."

php tools/build.php all >/dev/null

E=build/product-recommendation-quiz-for-ecommerce
W=build/product-recommendation-quiz-for-woocommerce
fail=0

while IFS= read -r ef; do
    rel="${ef#"$E"/}"
    wf="$W/${rel//ecommerce/woocommerce}"
    if [ ! -f "$wf" ]; then
        echo "  MISSING in woo build: ${rel//ecommerce/woocommerce}"; fail=1; continue
    fi
    # forward-transform the eComm file (axes) vs the woo file (minus WC headers)
    if ! diff -q \
        <(sed -e 's/Product_Recommendation_Quiz_For_Ecommerce/Product_Recommendation_Quiz_For_Woocommerce/g' \
              -e 's/product_recommendation_quiz_for_ecommerce/product_recommendation_quiz_for_woocommerce/g' \
              -e 's/product-recommendation-quiz-for-ecommerce/product-recommendation-quiz-for-woocommerce/g' \
              -e 's/Product Recommendation Quiz for eCommerce/Product Recommendation Quiz for WooCommerce/g' \
              -e 's/eCommerce/WooCommerce/g' \
              -e "s/=> 'wordpress'/=> 'woocommerce'/g" "$ef") \
        <(sed -e '/^ \* WC requires at least:/d' -e '/^ \* WC tested up to:/d' "$wf") \
        >/dev/null; then
        echo "  CODE DIVERGES beyond configured axes: ${rel//ecommerce/woocommerce}"; fail=1
    fi
done < <(find "$E" -name '*.php')

if [ "$fail" -eq 0 ]; then
    echo "✓ build-diff OK — both artifacts derive from one source (PHP identical modulo axes)"
else
    echo "✗ build-diff FAILED"; exit 1
fi
