# V2 mode verification — 16 November 2026

All source edits and commands ran from the `task/v2-mode` worktree. No deploy,
push, merge, rebase, compose-file edit or change to the V3 reference plugin.

## V1 before and after

After `composer install` (exit 0), `V1ModeTest.php` was written first and run
against otherwise untouched source at `c6067c2e8f4be6dd5d9094cf2f6df3cd2c42259f`:

| Command | Result | Exit |
| --- | --- | --- |
| `vendor/bin/phpunit tests/Characterization/V1ModeTest.php` (before) | 3 tests, 8 assertions | 0 |
| `composer test` (before) | 135 tests, 326 assertions | 0 |
| `vendor/bin/phpunit tests/Characterization/V1ModeTest.php` (after) | 3 tests, 9 assertions | 0 |
| `vendor/bin/phpunit tests/Characterization/V1ModeTest.php tests/Characterization/V2ModeTest.php tests/Characterization/V2CatalogProductTest.php tests/Characterization/V2OrdersTest.php` | 18 tests, 114 assertions | 0 |
| `composer check` (final) | PHPCS clean; i18n lint clean; PHPStan clean; 150 tests, 432 assertions | 0 |
| `composer i18n:pot-check` | Fresh POT matches | 0 |
| `composer build` | Both artifacts built | 0 |
| `find build/product-recommendation-quiz-for-ecommerce build/product-recommendation-quiz-for-woocommerce -name '*.php' -exec php -l {} \;` | 78 PHP files clean | 0 |
| `git diff --check` | Clean | 0 |

The extra V1 assertion after the implementation verifies the V2 route registrar
adds no routes when the mode option is absent. The snapshot pins the script
URL/payload/tag, actual shortcode/block HTML, connected admin HTML and REST routes.
The version in the payload intentionally follows `PRQ_PLUGIN_VERSION`.

During development, lint first reported formatting errors (fixed with PHPCBF);
PHPStan with the previous 1 GB limit exhausted memory after adding official
WooCommerce stubs. The final command uses 2 GB. No new-source findings were
baselined. The one newly visible legacy finding is the **pre-existing V1**
`WC_REST_Authentication::authenticate()` `int|false` versus `WP_User` mismatch;
V1 is unchanged, and V2 has its own authenticated capability check.

## Actual local store

Sandbox: `http://localhost:8088`, WooCommerce 10.7.0 / PHP 8.2.
Built eCommerce artifact installed with:

```sh
composer build
docker cp build/product-recommendation-quiz-for-ecommerce/. woocommerce-test-wordpress-1:/var/www/html/wp-content/plugins/product-recommendation-quiz-for-ecommerce/
docker compose -f /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test/docker-compose.yml --profile tools run --rm wpcli wp plugin activate product-recommendation-quiz-for-ecommerce
```

Throwaway scripts were executed with the commands below, then deleted. They
used the real WP/WC REST router, WC CRUD and Action Scheduler, not unit-test
framework stubs. The notification HTTP request was intercepted locally, its
signature verified and a 200 returned; no V2 receiver is running yet.

```sh
docker compose -f /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test/docker-compose.yml --profile tools run --rm -T wpcli wp eval-file - < tools/smoke-local-v2.php
docker compose -f /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test/docker-compose.yml --profile tools run --rm -T -e RH_SMOKE_BATCHES=1 wpcli wp eval-file - < tools/smoke-local-v2.php
docker compose -f /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test/docker-compose.yml --profile tools run --rm -T wpcli wp eval-file - < tools/smoke-local-v2-orders.php
```

All three commands exited 0. Observed:

- Authenticated V2 connect through `/wc/v3/prq_set_token`; signed Sync now returned 202.
- Real catalogue: **50 products, 61 lines** (1 header, 50 products, 1 field-name line, 9 categories), 35,243 bytes.
- Separate batch-boundary probe: query interception duplicated the existing 50 IDs, without creating products; **100 product rows, 111 lines, 2 completed AS batches**.
- `catalog_ready` signature and product count verified. Next nightly job: `2026-11-17T03:00:00+00:00`, matching site timezone `+00:00`.
- `curl -sS -o build/direct-export-response -w 'direct status=%{http_code} bytes=%{size_download}\n' '<private URL>'`: 200, **0 bytes**.
- `curl -sS -o build/local-proof.jsonl -w 'signed status=%{http_code} bytes=%{size_download}\n' '<signed URL>'`: 200, **35,243 bytes**. `wc -l build/local-proof.jsonl`: **61**.
- Repeating the same signed URL: **401**, denied by WordPress's unauthenticated REST permission response. Download removed its file/manifest.
- Both `woocommerce_checkout_create_order` and `woocommerce_store_api_checkout_update_order_meta` persisted both attribution fields on real orders; native Woo webhook payload contained the attribution. Signed lookup returned **200**, wrong HMAC **403**. Temporary orders deleted.
- Browser screenshot inspected: existing admin shell with iframe `/auth/woocommerce?token=…`, no embed.js script. Hosted V2 sign-in is **not verified**: no V2 admin was running. The temporary iframe origin was `https://example.com`.

Two exact sample lines from the final real-store export:

```jsonl
{"format":"rh-catalog","version":1,"platform":"woocommerce","generatedAt":"2026-11-16T18:59:11Z","currency":"USD","locale":"en_US"}
{"id":"gid://woocommerce/Product/12","title":"Hydra Cloud Cream Cleanser","description":"A gentle cream cleanser for dry and sensitive skin that removes impurities without stripping the barrier.","handle":"hydra-cloud-cream-cleanser","link":"http://localhost:8088/product/hydra-cloud-cream-cleanser/","image_link":"http://localhost:8088/wp-content/uploads/2026/05/product-12.jpg","vendor":"","product_type":"simple","status":"active","tags":[],"collections":["gid://woocommerce/Collection/15"],"attributes":{},"metafields":{},"variants":[{"id":"gid://woocommerce/ProductVariant/12","title":"Hydra Cloud Cream Cleanser","sku":"rh-v3-hydra-cloud-cream-cleanser","price":"18.00","availability":"in_stock","inventory_quantity":100}]}
```

Teardown removed synthetic connection credentials, two test webhooks, remaining
private exports/manifests and scheduled PRQ jobs. Verified `pending_prq_actions=0`
and connection absent. Built plugin remains **installed but inactive**; original
sandbox plugins remain active. No actual product data was modified.

## Remaining scope / tooling notes

- V2 storefront script and real admin sign-in are later integration phases; this
  version deliberately emits only the agreed V2 mount, with no cached nonce.
- Existing uninstall cleanup handles legacy options only; V2 uninstall lifecycle
  (new options, export files and webhooks) remains a follow-up, not implemented here.
- `composer audit --format=plain` exited 1: three pre-existing high advisories in
  dev-only `phpcsstandards/phpcsutils`, `squizlabs/php_codesniffer` and
  `wp-coding-standards/wpcs`. These versions were not changed and are not shipped.
