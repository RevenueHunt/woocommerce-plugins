# Standard Operating Procedure: Update WooCommerce Extension

This SOP provides step-by-step instructions for updating the Product Recommendation Quiz for WooCommerce extension, including version number updates, Git commits to Keybase, and deployment to WooCommerce Partners Dashboard.

## Prerequisites

- Access to the Keybase Git repository: `keybase://team/revenuehunt.admin/woocommerce`
- Keybase installed and configured on your system
- Access to WooCommerce Partners Dashboard: https://woocommerce.com/
- WordPress.com credentials (username: `revenuehunt`, password stored in KeePassXC)
- Text editor with find-and-replace capabilities
- Ability to create ZIP files

## Overview

The update process consists of 10 main steps:
1. Make edits in the WooCommerce extension
2. Update version numbers across all files
3. Commit and push changes to Keybase Git
4. Copy plugin folder to Desktop
5. Remove .git and nbproject folders
6. Compress the folder to ZIP
7. Log into WooCommerce Partners Dashboard
8. Navigate to the product page
9. Upload new version via Version > Add Version
10. Verify the deployment

---

## Step 1: Make Your Edits

Make all necessary code changes, bug fixes, or feature additions to the WooCommerce extension files in your local workspace.

**Location**: `/Users/libertas/Local Sites/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce/`

---

## Step 2: Update Version Numbers

Update the version number in all relevant files. The version follows semantic versioning (e.g., `2.2.14` → `2.2.15`).

### 2.1 Determine the New Version Number

- If the current version is `2.2.14`, the next version should be `2.2.15`
- Follow semantic versioning: `MAJOR.MINOR.PATCH`
- For bug fixes, increment PATCH
- For new features, increment MINOR
- For breaking changes, increment MAJOR

### 2.2 Files to Update

Update the version number in the following files:

#### A. Main Plugin File
**File**: `product-recommendation-quiz-for-woocommerce.php`

Update these lines:
- Line 18: `Version:           2.2.14` → `Version:           2.2.15`
- Line 42: `define( 'PRQ_PLUGIN_VERSION', '2.2.14' );` → `define( 'PRQ_PLUGIN_VERSION', '2.2.15' );`

#### B. Core Plugin Class
**File**: `includes/class-product-recommendation-quiz-for-woocommerce.php`

No version number in this file (version is read from the constant defined in the main plugin file).

#### C. readme.txt
**File**: `readme.txt`

Update these lines:
- Line 6: `Tested up to: 6.8.3` (update to latest WordPress version if applicable)
- Line 8: `Stable tag: 2.2.14` → `Stable tag: 2.2.15`

#### D. Changelog File
**File**: `changelog.txt`

**IMPORTANT**: Do NOT replace the old version in the changelog. Instead, add a NEW entry at the TOP of the file.

Format:
```
*** Product Recommendation Quiz for WooCommerce ***

YYYY-MM-DD - version 2.2.15
* Description of changes (e.g., "Dev - tested up to WP 6.9.0")

[Previous entries remain below...]
```

Example entry:
```
2025-01-15 - version 2.2.15
* Dev - tested up to WP 6.9.0 and WooCommerce up to Version 10.3.0
```

#### E. Language File (if updated)
**File**: `languages/product-recommendation-quiz-for-woocommerce.pot`

Update version references if the language file was modified.

### 2.3 Version Update Checklist

- [ ] `product-recommendation-quiz-for-woocommerce.php` - Version header (line 18)
- [ ] `product-recommendation-quiz-for-woocommerce.php` - PRQ_PLUGIN_VERSION constant (line 42)
- [ ] `readme.txt` - Stable tag (line 8)
- [ ] `readme.txt` - Tested up to (line 6, if applicable)
- [ ] `changelog.txt` - New entry added at top (DO NOT remove old entries)
- [ ] `languages/product-recommendation-quiz-for-woocommerce.pot` - Version (if modified)

---

## Step 3: Commit and Push to Keybase Git

### 3.1 Navigate to the Extension Directory

```bash
cd "/Users/libertas/Local Sites/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce"
```

### 3.2 Check Git Status

```bash
git status
```

Expected output should show modified files:
```
On branch master
Your branch is up to date with 'keybase/master'.
Changes not staged for commit:
  modified: readme.txt
  modified: changelog.txt
  modified: includes/class-product-recommendation-quiz-for-woocommerce.php
  modified: languages/product-recommendation-quiz-for-woocommerce.pot
  modified: product-recommendation-quiz-for-woocommerce.php
```

### 3.3 Stage and Commit Changes

```bash
git add -A
git commit -m "fix: [description of changes]"
```

**Commit Message Guidelines**:
- Use conventional commit format: `fix:`, `feat:`, `dev:`, `chore:`
- Be descriptive but concise
- Examples:
  - `fix: php error undefined array key host`
  - `feat: add new quiz template`
  - `dev: tested up to WP 6.9.0`

### 3.4 Push to Keybase Remote Repository

```bash
git push
```

Expected output:
```
Initializing Keybase... done.
Syncing with Keybase... done.
Preparing and encrypting: (100.00%) 9/9 objects... done.
Indexing hashes: (100.00%) 9/9 objects... done.
Indexing CRCs: (100.00%) 9/9 objects... done.
Indexing offsets: (100.00%) 9/9 objects... done.
Syncing encrypted data to Keybase: (100.00%) 105.39/105.39 KB... done.
To keybase://team/revenuehunt.admin/woocommerce
[commit-hash]..[commit-hash] master -> master
```

Verify the push was successful:
```bash
git status
```

Expected output:
```
On branch master
Your branch is up to date with 'keybase/master'.
nothing to commit, working tree clean
```

---

## Step 4: Copy Plugin Folder to Desktop

Copy the entire plugin folder to your Desktop for preparation:

```bash
# From the plugins directory
cp -r "/Users/libertas/Local Sites/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce" ~/Desktop/
```

Or use Finder:
1. Navigate to the plugin directory
2. Copy the `product-recommendation-quiz-for-woocommerce` folder
3. Paste it on your Desktop

---

## Step 5: Remove Development Folders

Navigate to the Desktop copy and remove development folders:

```bash
cd ~/Desktop/product-recommendation-quiz-for-woocommerce

# Remove .git folder
rm -rf .git

# Remove nbproject folder (if it exists)
rm -rf nbproject
```

**Important**: These folders should NOT be included in the ZIP file that gets uploaded to WooCommerce.

---

## Step 6: Compress the Folder

Create a ZIP file of the plugin folder:

### Method 1: Using Finder (Recommended)

1. Right-click on the `product-recommendation-quiz-for-woocommerce` folder on Desktop
2. Select **Compress "product-recommendation-quiz-for-woocommerce"**
3. This creates `product-recommendation-quiz-for-woocommerce.zip` on your Desktop

### Method 2: Using Command Line

```bash
cd ~/Desktop
zip -r product-recommendation-quiz-for-woocommerce.zip product-recommendation-quiz-for-woocommerce
```

**Verify the ZIP file**:
- The ZIP should contain the plugin files directly (not nested in a parent folder)
- Do NOT include `.git`, `nbproject`, `.claude`, `.project`, or `CLAUDE.md`

---

## Step 7: Log into WooCommerce Partners Dashboard

1. Go to https://woocommerce.com/
2. Click on **LOG IN**
3. You'll be redirected to WordPress.com for authentication
4. Use credentials:
   - **Username**: `revenuehunt`
   - **Password**: Retrieve from KeePassXC (search for "wordpress.com")

---

## Step 8: Navigate to Vendor Dashboard

1. After logging in, navigate to the **Vendor Dashboard**:
   - URL: https://woocommerce.com/wp-admin/

2. Navigate to **Products** → **Product Recommendation Quiz for WooCommerce**
   - Direct URL: https://woocommerce.com/wp-admin/edit.php?post_type=product&page=view-product&post=6046806

---

## Step 9: Upload New Version

1. On the product page, click on **Version** → **Add Version**

2. Fill in the version details:
   - **Version Number**: Enter the new version (e.g., `2.2.15`)
   - **Upload ZIP File**: Select the `product-recommendation-quiz-for-woocommerce.zip` file from your Desktop
   - **Changes in release**: Add a description of what changed (e.g., "Dev - tested up to WP 6.9.0")

3. Click **Submit** or **Publish** to upload

4. Wait for the upload to complete (may take a few minutes)

---

## Step 10: Verify the Deployment

### 10.1 Check Version Status

After uploading, check the version status on the product page:

| Statistics | Version |
|------------|---------|
| **Current version** | |
| **Version:** | **Published on:** |
| 2.2.15 | [Date] |
| **Changes in release:** | |
| • Description of changes | |

### 10.2 Fix Any Flags or Warnings

- Review any flags or warnings that appear
- Fix any issues and re-upload if necessary
- Common issues:
  - Missing required files
  - Incorrect file structure
  - Version number mismatches

### 10.3 Wait for Processing

WooCommerce may take a few minutes to process the new version. Refresh the page after a few minutes to see the updated version.

---

## Troubleshooting

### Keybase Git Issues

If Keybase Git push fails:
- Ensure Keybase is running: `keybase status`
- Check Keybase authentication: `keybase login`
- Verify repository access: `git remote -v`

### ZIP File Issues

If the ZIP file is rejected:
- Verify the ZIP contains plugin files directly (not nested)
- Check that `.git` and `nbproject` folders are removed
- Ensure all required plugin files are present
- Check file permissions

### WooCommerce Dashboard Access

If you can't access the dashboard:
- Verify WordPress.com credentials in KeePassXC
- Check that you have vendor access permissions
- Contact WooCommerce support if access issues persist

### Version Upload Fails

If version upload fails:
- Check file size limits
- Verify ZIP file is not corrupted
- Ensure version number format is correct (e.g., `2.2.15`)
- Check for any error messages on the upload page

---

## Quick Reference: Version Update Locations

| File | Line/Location | What to Update |
|------|--------------|----------------|
| `product-recommendation-quiz-for-woocommerce.php` | Line 18 | `Version:` header |
| `product-recommendation-quiz-for-woocommerce.php` | Line 42 | `PRQ_PLUGIN_VERSION` constant |
| `readme.txt` | Line 8 | `Stable tag:` |
| `readme.txt` | Line 6 | `Tested up to:` (if applicable) |
| `changelog.txt` | Top of file | Add new entry (DO NOT remove old) |
| `languages/*.pot` | Header | Version (if modified) |

---

## Complete Workflow Example

Here's a complete example workflow for updating from version `2.2.14` to `2.2.15`:

```bash
# 1. Make your edits (in your editor)

# 2. Update version numbers (in your editor)

# 3. Git workflow
cd "/Users/libertas/Local Sites/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce"
git status
git add -A
git commit -m "dev: tested up to WP 6.9.0"
git push

# 4. Copy to Desktop
cp -r "/Users/libertas/Local Sites/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce" ~/Desktop/

# 5. Remove development folders
cd ~/Desktop/product-recommendation-quiz-for-woocommerce
rm -rf .git
rm -rf nbproject

# 6. Compress (using Finder: Right-click > Compress)
# Or command line:
cd ~/Desktop
zip -r product-recommendation-quiz-for-woocommerce.zip product-recommendation-quiz-for-woocommerce

# 7-9. Upload via WooCommerce Partners Dashboard (manual steps)

# 10. Verify deployment
```

---

## Notes

- **Changelog**: Always add new entries at the TOP of `changelog.txt`. Never remove old entries as they provide version history.
- **Version Format**: Use semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `2.2.15`)
- **Commit Messages**: Use clear, descriptive commit messages that explain what changed
- **ZIP File**: Ensure the ZIP contains plugin files directly, not nested in a parent folder
- **Development Files**: Always remove `.git`, `nbproject`, `.claude`, `.project`, and `CLAUDE.md` before creating ZIP
- **Testing**: Test your changes locally before committing and deploying
- **Processing Time**: Allow a few minutes for WooCommerce to process the new version

---

## Related Resources

- Keybase Git Repository: `keybase://team/revenuehunt.admin/woocommerce`
- WooCommerce Partners Dashboard: https://woocommerce.com/wp-admin/
- Product Page: https://woocommerce.com/wp-admin/edit.php?post_type=product&page=view-product&post=6046806
- WordPress.com Login: https://wordpress.com/

---

**Last Updated**: 2025-01-15  
**Current Extension Version**: 2.2.14  
**SOP Version**: 1.0
