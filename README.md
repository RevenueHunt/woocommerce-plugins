# RevenueHunt WordPress / WooCommerce Plugins — Single Source

One source of truth for both distributions of the **Product Recommendation Quiz**:

| Artifact | Slug | Distribution |
|---|---|---|
| WP Plugin (eCommerce) | `product-recommendation-quiz-for-ecommerce` | wordpress.org (free) |
| WooCommerce Extension | `product-recommendation-quiz-for-woocommerce` | woocommerce.com (free) |

Both plugins are ~identical thin wrappers that enqueue `embed.js` and drive the
WooCommerce OAuth/token flow. They used to be maintained as two drifting copies;
this repo collapses them into **one source that builds two artifacts**.

## Layout

```
src/                 # canonical PHP source (authored in the eCommerce identity)
shared/              # changelog, LICENSE, languages (.pot)
targets/<key>/       # per-distribution config (target.json) + readme + listing assets
tools/build.php      # one source -> build/<slug>/ artifacts
tests/               # PHPUnit characterization suite (Brain Monkey, no Docker needed)
deploy/              # deploy SOPs for each pipeline
```

The eCommerce artifact is a near-identity copy of `src/`. The WooCommerce
artifact is a deterministic transform: a few scoped token substitutions
(slug, class prefix, function prefix, `channel`, plugin name) plus the two
WC-only plugin headers. See `targets/*/target.json`.

## Commands

```bash
composer install      # dev deps (phpunit, brain/monkey)
composer test         # run the characterization suite (before AND after every change)
composer build        # build both artifacts into build/<slug>/
php tools/build.php woocommerce   # build a single target
```

## V2 mode (3.0.0-dev)

The monolith selects the mode at first connect; the `prq_v2_connection` option is
absent for V1 stores. Existing V1 credentials never opt a shop into V2.
The shared wire specification is [CONTRACT.md](../../v2/docs/woocommerce/CONTRACT.md).

V2 provisioning uses the WooCommerce-authenticated `wc/v3/prq_set_token` route and
requires a user with `manage_woocommerce`. The legacy `prq/v1/settoken` route stays
V1-only. The admin iframe receives a server-minted, 60-second HS256 launch token.

V2 WordPress submenus come from the public `<admin_url>/api/admin-nav` endpoint,
with `platform=woocommerce` and the WordPress locale. Validated paths and plain-text
labels are cached for one day; fetch failure leaves only the main Product Quiz
item. Menu clicks launch only exact advertised destinations. Origin- and
iframe-source-checked `rh:navigate` messages keep the selected submenu and reload
URL aligned with in-iframe navigation. V1 keeps its original Display submenu.

V2 exports use WooCommerce's bundled Action Scheduler (group `prq`), 100 products
per batch, nightly at 03:00 in the site's timezone or on signed Sync now requests.
Private random `.php` files in uploads start with an exit/compiler guard; only the
signed, one-use REST download removes that guard and streams neutral JSONL.
Export failures are visible in WooCommerce → Status → Scheduled Actions. Failed
export files/manifests are cleaned up after one hour, and ready downloads expire
one hour after readiness. The `catalog_ready.expires_at` value is a Unix timestamp.

In V2 mode, deactivation pauses the plugin's native webhooks, cancels its queued
webhook deliveries and Action Scheduler group `prq`, and removes canceled export
files/manifests/locks. The connection and picked fields remain; reactivation
resumes the webhooks and schedules the next 03:00 export. Uninstall deletes those
webhooks, export state, picked fields and the connection (including its secret),
then attempts a signed uninstall notice with a 3-second timeout and no redirects.
V1 lifecycle cleanup is unchanged. The [V2 lifecycle release gate](tests/V2-LIFECYCLE-PROOF.md)
must pass before releasing either artifact.

Order delivery uses native WooCommerce webhooks and their native
`X-WC-Webhook-Signature`, not the timestamped PRQ signature used by plugin routes.
The shortcode and quiz block render V2 mount elements and enqueue the hosted
`<admin_url>/woocommerce/quiz-renderer.js` module only on requests with a mount.
WordPress before 6.5 uses the script enqueue API with a module-tag filter. No
Store API nonce is printed in cached page output.

See [the verification record](tests/V2-PROOF.md) for the before/after V1 snapshot
and local-store export proof. WooCommerce stubs are dev-only (not built into either
artifact); PHPStan needs a 2 GB limit with these stubs.

## Deploy

Build artifacts feed the existing pipelines (they are **deploy targets**, not
sources — never hand-edit them):

- **wp.org:** `build/product-recommendation-quiz-for-ecommerce/` → `../svn-wporg/trunk/`, screenshots → `../svn-wporg/assets/`, then `svn ci` + tag.
- **woocommerce.com:** `build/product-recommendation-quiz-for-woocommerce/` → zip (folder named exactly the slug) → vendor dashboard.

See `deploy/` and `~/Projects/RevenueHunt/PLUGIN-DEPLOY.md`.

## Testing discipline

The suite must be **green before and after every change**. Characterization
tests pin current behavior first; new behavior (e.g. security fixes) is added
red→green. CI runs the suite on every push.
