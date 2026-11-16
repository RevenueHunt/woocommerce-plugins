# V2 lifecycle release gate — 16 November 2026

Required before releasing either plugin artifact: `composer check`, `composer build`,
and the local lifecycle sequence below must pass. V1 snapshots and the exact V1
uninstall characterization must remain green. Do not release on a failed gate.

## Baseline and unit coverage

Source started clean at `9f88f41` on `task/v2-mode`. Before source changes:

- `composer test`: **152 tests, 452 assertions**, exit **0**.
- Added the exact V1 uninstall characterization first, then ran
  `vendor/bin/phpunit tests/Characterization/LifecycleTest.php tests/Characterization/V1ModeTest.php`:
  **7 tests, 23 assertions**, exit **0**, against otherwise untouched source.
  It requires the real `src/uninstall.php` and asserts the four legacy deletions
  and four cache invalidations, with no HTTP, export-file or scheduler work.

`V2LifecycleTest.php` covers deactivation, reactivation, uninstall, stored webhook
IDs, exact delivery-URL fallback, cancellation of owned queued native deliveries
(not unrelated webhooks), guarded-file deletion, manifest/download/lock deletion,
connection deletion before HTTP, the canonical uninstall signature, and tolerated
WP_Error / HTTP 500 notification failures. `V2ModeTest.php` now also verifies the
IDs returned by webhook creation are saved in the connection.

Canceled exports are discarded during deactivation as well as uninstall: leaving
an active export lock after canceling its batch/cleanup actions would otherwise
prevent all exports after reactivation. Picked fields and connection credentials
remain on deactivation, but not on uninstall.

## Final checks

| Command (from plugin worktree) | Result | Exit |
| --- | --- | --- |
| `vendor/bin/phpunit tests/Characterization/V2ModeTest.php tests/Characterization/V2LifecycleTest.php tests/Characterization/LifecycleTest.php tests/Characterization/V1ModeTest.php` | 23 tests, 168 assertions | 0 |
| `composer check` | PHPCS / i18n lint / PHPStan clean; 157 tests, 507 assertions | 0 |
| `composer build` | Both artifacts built | 0 |
| `find build/product-recommendation-quiz-for-ecommerce build/product-recommendation-quiz-for-woocommerce -name '*.php' -exec php -l {} \;` | Both artifacts' PHP syntax clean | 0 |
| `git diff --check` | Clean | 0 |

## Real localhost:8088 gate

All commands below used the existing sandbox, with no compose/config changes.
The proof used real WordPress/WooCommerce REST routing, CRUD, files and Action
Scheduler, not the unit stubs. Two throwaway scripts lived in this worktree's
`tools/` only for the proof and were deleted afterward.

Command prefix/path definitions (used exactly below):

```sh
repo=/Users/kulupu/Desktop/src/RevenueHunt/worktrees/woo-plugin
cd /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test
# Every wp command below is run by this Compose service:
# docker compose --profile tools run --rm wpcli wp ...
```

Preflight: `wp plugin list --fields=name,status,version` showed the built plugin
installed **inactive**, WooCommerce 10.7.0 and `prq-v3` active; Akismet and Hello
inactive. Read-only `wp eval` checks found connection absent, all `prq_v2_*`
options **0**, guarded exports **0**, pending PRQ actions **0**, native webhook
rows **0**, and the four legacy options present as empty strings. Both preflight
commands exited **0**. `curl -sS -o /dev/null -w 'store_http=%{http_code}\n' http://localhost:8088`
returned **200**, exit **0**.

Build/install (exit **0** each):

```sh
cd "$repo"
composer build
docker cp build/product-recommendation-quiz-for-ecommerce/. woocommerce-test-wordpress-1:/var/www/html/wp-content/plugins/product-recommendation-quiz-for-ecommerce/
cd /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test
docker compose --profile tools run --rm wpcli wp plugin activate product-recommendation-quiz-for-ecommerce
docker compose --profile tools run --rm -T wpcli wp eval-file - < "$repo/tools/smoke-lifecycle-v2.php"
```

Setup used synthetic shop `wc-lifecycleproof` and a public synthetic secret,
connected as an authenticated manager through `/wc/v3/prq_set_token`, exported
**50 products**, and verified/intercepted `catalog_ready` locally (HTTP 200).
Observed **2 webhooks**, **1 guarded export**, **3 pending PRQ actions** (nightly,
batch, cleanup), and **5 pending native deliveries**. One of those deliveries was
explicitly queued for this connection to prove cancellation. The other four
were pre-existing orphan deliveries for nonexistent webhook IDs 1 and 7.
The created webhook IDs were **9 and 10**.

Lifecycle commands (final runs all exit **0**):

```sh
docker compose --profile tools run --rm wpcli wp plugin deactivate product-recommendation-quiz-for-ecommerce
docker compose --profile tools run --rm -T -e PRQ_PROOF_STAGE=deactivated wpcli wp eval-file - < "$repo/tools/smoke-lifecycle-v2.php"
docker compose --profile tools run --rm wpcli wp plugin activate product-recommendation-quiz-for-ecommerce
docker compose --profile tools run --rm -T -e PRQ_PROOF_STAGE=reactivated wpcli wp eval-file - < "$repo/tools/smoke-lifecycle-v2.php"
```

Observed:

| Stage | Native hooks | Pending PRQ | In-progress PRQ | Owned queued native delivery | Exports | Connection |
| --- | --- | --- | --- | --- | --- | --- |
| Deactivated | 2, both paused | 0 | 0 | 0 | 0 | present |
| Reactivated | 2, both active | 1 (03:00 nightly) | 0 | 0 | 0 | present |

The reactivated check then ran another real export successfully: **1 guarded
file**, **3 pending PRQ actions** immediately before uninstall. The active lock
from the canceled export had not blocked it. Four unrelated orphan deliveries
were deliberately preserved throughout.

Actual uninstall, including failure-tolerant notification (exit **0** each):

```sh
cd "$repo"
docker cp tools/smoke-lifecycle-notify.php woocommerce-test-wordpress-1:/var/www/html/prq-lifecycle-notify.php
cd /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test
docker compose --profile tools run --rm wpcli wp --require=/var/www/html/prq-lifecycle-notify.php plugin uninstall product-recommendation-quiz-for-ecommerce --deactivate
docker compose --profile tools run --rm -T -e PRQ_PROOF_STAGE=uninstalled wpcli wp eval-file - < "$repo/tools/smoke-lifecycle-v2.php"
```

The temporary HTTP interceptor verified the exact POST route/body, canonical
signature, **3-second timeout**, **zero redirects**, and connection deletion
before HTTP. It deliberately returned `WP_Error('http_request_failed', ...)`.
The actual uninstall still succeeded. No real V2 receiver was contacted.

After uninstall: **webhooks=0, pending PRQ=0, in-progress PRQ=0, export files=0,
all V2 options=0, connection absent**. Exact plugin-owned guarded uploads were
removed; there is **no dedicated export directory** in this plugin's layout.
Canceled/historical Action Scheduler records are retained by Action Scheduler;
the zero counts refer to runnable work, not audit-history rows.

Restore (exit **0** each):

```sh
cd "$repo"
docker cp build/product-recommendation-quiz-for-ecommerce/. woocommerce-test-wordpress-1:/var/www/html/wp-content/plugins/product-recommendation-quiz-for-ecommerce/
cd /Users/kulupu/Desktop/src/RevenueHunt/v3/woocommerce-test
docker compose --profile tools run --rm -T -e PRQ_PROOF_STAGE=restored wpcli wp eval-file - < "$repo/tools/smoke-lifecycle-v2.php"
docker compose --profile tools run --rm wpcli wp plugin list --fields=name,status,version
docker exec woocommerce-test-wordpress-1 rm /var/www/html/prq-lifecycle-notify.php
```

Restored the four originally empty legacy options and removed the proof marker.
Built artifact is installed **inactive** again; all other plugin statuses match
preflight. No products/orders were created or changed. Synthetic connection,
webhooks, exports and runnable PRQ jobs are absent. The four unrelated orphan
native delivery actions were not canceled. Final independent read-only check
(exit **0**) confirmed `webhooks=0 pending_prq=0 inprogress_prq=0 export_files=0
v2_options=0 legacy_empty=4 proof_marker=absent proof_hook=absent
pending_unrelated_native=4`.

## Failures observed and corrected / tooling notes

- Initial PHPCS reported two direct-query warnings in option-name discovery;
  documented that deliberate uncached lookup (each deletion uses `delete_option`
  to clear caches). PHPStan initially rejected null AS args and the magic data
  store method. Switched to the native group-wide cancellation API with array
  args, and the concrete native webhook data store for fallback discovery.
  Subsequent PHPCS and PHPStan runs passed, exit **0**, no findings.
- Initial deactivated/reactivated smoke checks exited **1** because they counted
  all pending native deliveries, including the four pre-existing orphan ones.
  Inspection showed those reference IDs **1/7**, not this connection's **9/10**;
  corrected the proof to check only owned deliveries. No production-code change
  or unrelated-action deletion was needed. Repeated lifecycle checks passed.
- This WP-CLI's uninstall command reported running the uninstall procedure
  **without deleting plugin files**; cleanup itself was verified. A subsequent
  attempted `wp plugin uninstall product-recommendation-quiz-for-ecommerce --delete`
  exited **1** (`unknown --delete parameter`), changing nothing. The built artifact
  was copied back and its installed/inactive state verified as above.

## Accepted boundary / release dependency

Native webhook cleanup uses WooCommerce CRUD and requires WooCommerce active.
With WooCommerce itself inactive at uninstall, native rows can remain; they
contain only the **derived webhook key**, never the master secret, and cannot
post while WooCommerce is inactive. Phase 3 must reject native order webhooks
for uninstalled shops if WooCommerce later comes back. No temporary WooCommerce
loading or direct database-delete workaround is included (owner accepted).

The new V2 uninstall receiver is a separate integration dependency; this gate
proves the plugin's signed attempt and local cleanup, not hosted receipt. The
shared contract was not edited.
