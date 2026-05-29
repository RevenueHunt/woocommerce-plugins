# Deploy — single-source flow

**Source of truth is this repo.** Never hand-edit the SVN checkout or the Local
installs — they are *deploy/test targets*. The flow is always: edit `src/` →
bump version → `composer test` → `composer build` → deploy `build/<slug>/`.

```
edit src/ ───► composer test ───► composer build ───► build/<slug>/ ───► pipeline
                (green before        (one source           (deploy target,
                 AND after)           → two artifacts)      never hand-edited)
```

## Release checklist (both plugins, lockstep version)

1. Make the change in `src/` (and/or `targets/<key>/` for distribution-specific bits).
2. Bump version in **one** place — `src/<main>.php` `Version:` + `PRQ_PLUGIN_VERSION`
   (both artifacts inherit it). Update each `targets/<key>/readme*` `Stable tag:`
   and prepend a `targets/<key>/changelog.txt` entry.
3. `composer test` — suite green.
4. `composer build && bash tools/verify-build.sh` — artifacts built, single-source proven.
5. Smoke-test in Local (install `build/<slug>/` — quiz loads, recommendations render, cart works).
6. Deploy per pipeline below.

## wp.org (eCommerce, free)

```bash
SVN=~/Projects/RevenueHunt/woocommerce/svn-wporg
rsync -a --delete --exclude='.svn' build/product-recommendation-quiz-for-ecommerce/ "$SVN/trunk/"
# screenshots live in the SVN repo-root /assets/, NOT in trunk:
rsync -a build/product-recommendation-quiz-for-ecommerce/assets/ "$SVN/assets/"
cd "$SVN"
svn add --force trunk assets >/dev/null; svn ci -m "Bump X.Y.Z: <summary>"
svn cp ^/product-recommendation-quiz-for-ecommerce/trunk \
       ^/product-recommendation-quiz-for-ecommerce/tags/X.Y.Z -m "Tag X.Y.Z"
```

The wp.org **listing** reads `trunk/README.txt`; the **download** is served from
`tags/X.Y.Z/`. A matching SVN tag is required for the new version to publish.

## woocommerce.com (paid channel)

```bash
cd build
zip -rq ~/Desktop/product-recommendation-quiz-for-woocommerce.zip product-recommendation-quiz-for-woocommerce
# upload via vendor dashboard: Version > Add Version
```

The zip's top folder **must** be named exactly `product-recommendation-quiz-for-woocommerce/`
(`build/` already names it correctly). Push the source to its git/Keybase remote too if that
mirror is still maintained.

## Notes / gotchas

- `[youtube …]` bracket shortcode is required in `README.txt` for the video to render on wp.org.
- Dev files never reach an artifact — `build.php` only assembles `src/` + `shared/` + the target's files.
- See the per-pipeline SOPs in this folder and `~/Projects/RevenueHunt/PLUGIN-DEPLOY.md`.
