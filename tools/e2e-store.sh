#!/usr/bin/env bash
#
# A throwaway WooCommerce store on a public HTTPS address, for the release end-to-end test
# against production (deploy/PLUGIN-DEPLOY.md "Release end-to-end test").
#
#   tools/e2e-store.sh up [QUIZ_ID...]   build the plugin, start the store, open the tunnel
#   tools/e2e-store.sh refresh           rebuild and reinstall the plugin
#   tools/e2e-store.sh down              close the tunnel and delete the store
#
# The address is a Cloudflare quick tunnel (https://<random>.trycloudflare.com, no account):
# it changes on every `up`, and anyone with the address reaches the store, so keep it up only
# for the test. The admin password is generated per run and kept in tools/e2e-store/.state.
#
# The store's keys and the shop API key travel in query strings: Apache logs paths only
# (e2e-store/path-only-log.conf), the tunnel log hides queries, and the password goes over stdin.
set -euo pipefail
umask 077
cd "$(dirname "$0")/.."

dir=tools/e2e-store
state=$dir/.state
compose=(docker compose -f "$dir/compose.yml")
wp() { "${compose[@]}" exec -T cli wp "$@"; }
slug=product-recommendation-quiz-for-ecommerce

install_plugin() {
    # Readable by the containers' www-data.
    (umask 022 && php tools/build.php ecommerce) >/dev/null
    "${compose[@]}" exec -T cli sh -c "rm -rf wp-content/plugins/$slug && cp -R /plugins/$slug wp-content/plugins/"
    wp plugin activate "$slug" >/dev/null
    echo "Installed $slug $(wp plugin get "$slug" --field=version)"
}

case "${1:-}" in
up)
    shift
    mkdir -p "$state"
    "${compose[@]}" up -d --quiet-pull
    until "${compose[@]}" exec -T db mysqladmin ping -uroot -proot --silent >/dev/null 2>&1 &&
        "${compose[@]}" exec -T cli test -f wp-config.php; do sleep 2; done

    [ -f "$state/tunnel.pid" ] && kill "$(cat "$state/tunnel.pid")" 2>/dev/null || true
    # A failed request is logged with its whole URL: queries hidden. exec keeps the PID cloudflared's.
    bash -c 'exec cloudflared tunnel --no-autoupdate --url http://127.0.0.1:8099 \
        > >(sed -u -E "s/\\?[^[:space:]\"]*/?(query hidden)/g") 2>&1' >"$state/tunnel.log" &
    echo $! >"$state/tunnel.pid"
    url=
    for _ in $(seq 1 30); do
        url=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$state/tunnel.log" | head -1 || true)
        [ -n "$url" ] && break
        sleep 1
    done
    [ -n "$url" ] || { echo "No tunnel address; see $state/tunnel.log"; exit 1; }

    if ! wp core is-installed 2>/dev/null; then
        openssl rand -hex 16 >"$state/admin-password"
        # The password goes over stdin, never into a command line.
        wp core install --url="$url" --title="PRQ e2e store" --admin_user=admin \
            --prompt=admin_password --admin_email=dev@revenuehunt.com --skip-email <"$state/admin-password" >/dev/null
        wp core update >/dev/null
        wp core update-db >/dev/null
        wp rewrite structure '/%postname%/' >/dev/null
        wp plugin install woocommerce --activate >/dev/null
        wp option update woocommerce_coming_soon no >/dev/null
        wp option update woocommerce_currency USD >/dev/null
        for p in "Blue Shirt:25" "Red Shirt:30" "Green Hat:15"; do
            wp wc product create --user=admin --name="${p%%:*}" --regular_price="${p##*:}" --status=publish >/dev/null
        done
    fi
    wp option update siteurl "$url" >/dev/null
    wp option update home "$url" >/dev/null
    install_plugin

    for quiz in "$@"; do
        wp post create --post_type=page --post_status=publish --post_title="Quiz $quiz" --post_name="quiz-$quiz" \
            --post_content="[product_recommendation_quiz id=\"$quiz\"]" >/dev/null
        echo "Inline quiz page: $url/quiz-$quiz/"
    done
    echo "Store: $url  (admin: $url/wp-admin/, user admin, password in $state/admin-password)"
    ;;
refresh)
    install_plugin
    ;;
down)
    [ -f "$state/tunnel.pid" ] && kill "$(cat "$state/tunnel.pid")" 2>/dev/null || true
    "${compose[@]}" down -v
    rm -rf "$state"
    ;;
*)
    sed -n '3,15p' "$0"
    exit 1
    ;;
esac
