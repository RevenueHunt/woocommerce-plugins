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

## Bundled embed.js

`src/front/js/embed.js` is generated, never hand-edited. WordPress.org does not allow
loading scripts from our servers, so the plugin ships a readable copy of the monolith's
embed.js, built from the same source as the hosted one (no remote icons, never loads
Meta's script). Regenerate it in each plugin release that should carry embed changes:

```bash
M=../v1/monolith   # a monolith checkout at the commit to ship
node $M/scripts/build-embed.cjs production --wordpress \
  --commit $(git -C $M rev-parse --short HEAD) --output src/front/js/embed.js
```

The hosted `admin.revenuehunt.com/embed.js` keeps serving older plugin versions, so the
quiz-to-embed messages stay additive only. To make every store update, raise
`WoocommerceShop::MIN_PLUGIN_VERSION` in the monolith: below it, the admin shows only
"Update the plugin to continue" (the storefront keeps working).

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
