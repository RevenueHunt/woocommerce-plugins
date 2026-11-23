# WordPress / WooCommerce Plugin Deploy — Quick Reference

Two plugins, two pipelines. Keep this short. Full SOPs live next to each codebase.

## The two plugins

| | WP Plugin (eCommerce) | WooCommerce Extension |
|---|---|---|
| Slug | `product-recommendation-quiz-for-ecommerce` | `product-recommendation-quiz-for-woocommerce` |
| Distribution | wordpress.org (free) | woocommerce.com marketplace (free) |
| Local source | `~/Projects/RevenueHunt/woocommerce/svn-wporg/trunk/` (SVN checkout — **deploy target only**) | `~/Projects/local/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce/` (git, master) |
| Remote | `https://plugins.svn.wordpress.org/product-recommendation-quiz-for-ecommerce/` | `keybase://team/revenuehunt.admin/woocommerce` |
| Deploy mechanism | SVN trunk + tag | Keybase git push + ZIP upload to vendor dashboard |
| Listing URL | https://wordpress.org/plugins/product-recommendation-quiz-for-ecommerce/ | https://woocommerce.com/products/product-recommendation-quiz-for-woocommerce/ |
| Full SOP | `~/Projects/RevenueHunt/docs/.claude/skills/deploy-wordpress-plugin.md` (and similar inside plugin dir) | `~/Projects/local/.../product-recommendation-quiz-for-woocommerce/.project/sops/SOP_Update-WooCommerce-Extension.md` |
| Vendor dashboard | n/a (auto from SVN tag) | https://woocommerce.com/wp-admin/edit.php?post_type=product&page=view-product&post=6046806 |
| Credentials | SVN user/pass in KeePassXC | wordpress.com `revenuehunt` user, pass in KeePassXC |

## Files to update for ANY release (both plugins)

1. Main PHP file (`product-recommendation-quiz-for-{ecommerce,woocommerce}.php`):
   - `* Version:           X.X.X` (header)
   - `define( 'PRQ_PLUGIN_VERSION', 'X.X.X' );`
2. `README.txt` / `readme.txt`:
   - `Stable tag: X.X.X`
   - `Tested up to:` if WP changed
   - `WC tested up to:` (woo only) if WooCommerce changed
3. `changelog.txt`: **prepend** new entry at the TOP. Never remove old entries.

## Quick deploy — WP Plugin (wordpress.org)

```bash
cd ~/Projects/RevenueHunt/woocommerce/svn-wporg
# 1. edit trunk/README.txt + trunk/product-recommendation-quiz-for-ecommerce.php + trunk/changelog.txt
svn update trunk/
svn ci -m "Bump X.X.X: <summary>" trunk/
# 2. tag the release (required for the public listing to publish the new version)
svn cp https://plugins.svn.wordpress.org/product-recommendation-quiz-for-ecommerce/trunk \
       https://plugins.svn.wordpress.org/product-recommendation-quiz-for-ecommerce/tags/X.X.X \
       -m "Tag X.X.X release"
# 3. wait 5-15 min for wp.org build queue
```

The listing page caches; a hard refresh (Cmd+Shift+R) after ~15 min should show the new version.

## Quick deploy — WooCommerce Extension (woocommerce.com)

```bash
WOO="$HOME/Projects/local/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce"
cd "$WOO"
# 1. edit main PHP file + readme.txt + changelog.txt
git add -A && git commit -m "<summary>" && git push  # pushes to Keybase remote
# 2. build the upload zip — folder MUST be named exactly product-recommendation-quiz-for-woocommerce/
STAGE=$(mktemp -d)
rsync -a \
  --exclude='.git' --exclude='.claude' --exclude='.project' \
  --exclude='CLAUDE.md' --exclude='nbproject' --exclude='.DS_Store' \
  "$WOO/" "$STAGE/product-recommendation-quiz-for-woocommerce/"
( cd "$STAGE" && zip -rq ~/Desktop/product-recommendation-quiz-for-woocommerce.zip product-recommendation-quiz-for-woocommerce )
rm -rf "$STAGE"
# 3. upload via dashboard: Version > Add Version > Version Number + ZIP + Changes in release
```

## 2.6.0 release (bundled embed.js, operator on open, update gate)

In this order. Each step needs the one before it.

1. **Deploy the monolith** with `task/wp-plugin-260` merged (oauth records the operator who opens
   RevenueHunt; `WoocommerceShop::MIN_PLUGIN_VERSION` ships `nil`, so nobody is gated yet; the
   hosted embed.js is unchanged, so old plugins are unaffected).
2. **End-to-end test against production**, with the 2.6.0 build:
   `tools/e2e-store.sh up 7jHv3Vz GrHLzo` (our own quizzes: custom JS, Meta pixel) prints a public
   HTTPS store with three products. In its wp-admin (password in `tools/e2e-store/.state/`):
   - Product Quiz → connect: WooCommerce authorizes, RevenueHunt opens in the frame, signed in.
     The admin appears as a contact of the new shop (source `woocommerce_admin`).
   - Put a product in a quiz result, take the quiz on the store, Add to cart: the cart has it.
   - The inline quiz pages show the quizzes; the pixel page loads nothing from connect.facebook.net.
   - Keep the store up for step 4.
3. **Upload**: wordpress.org SVN (above) and woocommerce.com (below), from `composer build`.
4. **Once 2.6.0 is live on both listings and checked**, raise `MIN_PLUGIN_VERSION` to `"2.6.0"`
   in the monolith and deploy: older plugins then show only "Update the plugin to continue" in
   the admin; their storefronts keep working. Check it on the test store:
   `docker compose -f tools/e2e-store/compose.yml exec -T cli wp plugin install product-recommendation-quiz-for-ecommerce --version=2.5.6 --force`,
   open Product Quiz: only the update notice, and Go to Plugins opens the Plugins page.
   Then `tools/e2e-store.sh down` and uninstall the test shop in our admin.

Later releases that change embed.js: regenerate `src/front/js/embed.js` (README "Bundled embed.js")
and raise `MIN_PLUGIN_VERSION` only when every store must have the change.

## Gotchas (learned the hard way)

1. **`[youtube ...]` shortcode brackets are required** in readme.txt for the video embed to render on the wp.org listing. Bare URL (autoembed) does NOT reliably work in plugin readme. Form: `[youtube https://www.youtube.com/watch?v=VIDEO_ID]`.
2. **Woo zip folder name must be exactly `product-recommendation-quiz-for-woocommerce/`** — vendor dashboard validates this. Different from the wp.org slug (`...-for-ecommerce`).
3. **wp.org needs the SVN tag** (`tags/X.X.X/`) for the public listing to publish a new version. Just bumping `Stable tag:` in `trunk/README.txt` is not enough — without a matching tag, the listing keeps serving the previous version.
4. **wp.org listing display reads `trunk/README.txt`**, but the **downloaded zip is served from `tags/X.X.X/`**. If you edit README after tagging, edit BOTH or the zip and the listing will disagree.
5. **Dev files must be excluded from the woo zip**: `.git/`, `.claude/`, `.project/`, `CLAUDE.md`, `nbproject/`.
6. **wp.org propagation: 5-15 min** after the tag commit. Browser cache too — hard refresh.

## Cross-references

- `~/Projects/RevenueHunt/docs/CLAUDE.md` — long-form context on both plugins and how they connect to the monolith
- `~/Projects/local/.../product-recommendation-quiz-for-woocommerce/.claude/skills/deploy-woocommerce-extension.md` — full WooCommerce deploy skill
- `.project/sops/SOP_Update-WooCommerce-Extension.md` inside the woo plugin dir — full SOP
