# WooCommerce Extension Deployment Skill

Automate the complete deployment workflow for the Product Recommendation Quiz for WooCommerce extension, including version updates, Keybase Git commits, and deployment to WooCommerce Partners Dashboard.

## When to Use

- After completing code changes that are ready for release
- When user requests deployment or version bump
- Before releasing to WooCommerce Partners Dashboard
- When triggered by `/deploy` command

## Prerequisites

Before starting, verify:
- [ ] All code changes are complete and tested
- [ ] Code review has been performed (run `/review-staged` if needed)
- [ ] User has confirmed readiness to deploy
- [ ] Keybase is installed and configured
- [ ] WooCommerce Partners Dashboard access is available
- [ ] WordPress.com credentials are available (username: `revenuehunt`, password in KeePassXC)

## Deployment Workflow

### Phase 1: Determine New Version Number

1. **Read current version** from `product-recommendation-quiz-for-woocommerce.php`:
   - Line 18: `Version:` header
   - Line 42: `PRQ_PLUGIN_VERSION` constant

2. **Calculate next version** using semantic versioning:
   - Bug fix → increment PATCH (e.g., `2.2.14` → `2.2.15`)
   - New feature → increment MINOR (e.g., `2.2.14` → `2.3.0`)
   - Breaking change → increment MAJOR (e.g., `2.2.14` → `3.0.0`)

3. **Ask user to confirm** the new version number if uncertain

### Phase 2: Update Version Numbers

Update version in these files (in order):

#### A. Main Plugin File
**File**: `product-recommendation-quiz-for-woocommerce.php`

- Line 18: Update `Version:` header
- Line 42: Update `PRQ_PLUGIN_VERSION` constant

#### B. readme.txt
**File**: `readme.txt`

- Line 8: Update `Stable tag:`
- Line 6: Update `Tested up to:` (if WordPress version changed)

#### C. Changelog
**File**: `changelog.txt`

**CRITICAL**: Add a NEW entry at the TOP of the file. DO NOT remove old entries.

Format:
```markdown
*** Product Recommendation Quiz for WooCommerce ***

YYYY-MM-DD - version X.X.X
* Description of changes

[Previous entries remain below...]
```

Example:
```markdown
2025-01-15 - version 2.2.15
* Dev - tested up to WP 6.9.0 and WooCommerce up to Version 10.3.0
```

#### D. Language File (if modified)
**File**: `languages/product-recommendation-quiz-for-woocommerce.pot`

Update version in header if the file was modified.

### Phase 3: Verify Changes

Before proceeding, verify all version updates:

1. **Check version consistency**:
   ```bash
   grep -r "2.2.14" product-recommendation-quiz-for-woocommerce.php readme.txt
   ```
   Should return no results (or only in comments/changelog history)

2. **Verify changelog entry**:
   - New entry is at the top
   - Old entries are preserved
   - Date format is correct (YYYY-MM-DD)

3. **Check for missed files**:
   - Review git status to see all modified files
   - Ensure no version references were missed

### Phase 4: Keybase Git Workflow

**IMPORTANT**: According to `.claude/rules/development.md`, agents should NOT perform git write operations. However, for deployment, we need to guide the user through the process.

#### Step 1: Show Git Status

```bash
git status
```

Display the output to the user showing what will be committed.

#### Step 2: Provide Git Commands

Provide the user with the exact commands to run:

```bash
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "dev: tested up to WP 6.9.0"

# Push to Keybase
git push
```

**Commit Message Guidelines**:
- Use conventional commit format: `fix:`, `feat:`, `dev:`, `chore:`
- Be descriptive: `fix: php error undefined array key host`
- Include context: `dev: tested up to WP 6.9.0`

**Expected Keybase Output**:
```
Initializing Keybase... done.
Syncing with Keybase... done.
Preparing and encrypting: (100.00%) 9/9 objects... done.
...
To keybase://team/revenuehunt.admin/woocommerce
[commit-hash]..[commit-hash] master -> master
```

#### Step 3: Wait for User Confirmation

Wait for the user to confirm:
- [ ] Git commit completed successfully
- [ ] Git push to Keybase completed successfully

### Phase 5: Prepare ZIP File

**IMPORTANT**: The ZIP file must NOT contain development folders. Guide the user through the process.

#### Step 1: Copy to Desktop

Provide instructions for copying the plugin folder to Desktop:

```bash
cp -r "/Users/libertas/Local Sites/productrecommendationquiz/app/public/wp-content/plugins/product-recommendation-quiz-for-woocommerce" ~/Desktop/
```

Or use Finder to copy the folder.

#### Step 2: Remove Development Folders

Provide commands to remove development folders:

```bash
cd ~/Desktop/product-recommendation-quiz-for-woocommerce

# Remove .git folder
rm -rf .git

# Remove nbproject folder (if it exists)
rm -rf nbproject

# Also remove .claude and .project if they exist
rm -rf .claude .project

# Remove CLAUDE.md if it exists
rm -f CLAUDE.md
```

**CRITICAL**: These folders/files should NOT be in the ZIP:
- `.git/` - Git repository
- `nbproject/` - Development project files
- `.claude/` - Development configuration
- `.project/` - Project documentation
- `CLAUDE.md` - Development documentation

#### Step 3: Create ZIP File

Provide instructions for creating the ZIP:

**Method 1: Using Finder (Recommended)**
1. Right-click on `product-recommendation-quiz-for-woocommerce` folder on Desktop
2. Select **Compress "product-recommendation-quiz-for-woocommerce"**
3. This creates `product-recommendation-quiz-for-woocommerce.zip`

**Method 2: Using Command Line**
```bash
cd ~/Desktop
zip -r product-recommendation-quiz-for-woocommerce.zip product-recommendation-quiz-for-woocommerce
```

#### Step 4: Verify ZIP Contents

Verify the ZIP file:
- Contains plugin files directly (not nested in a parent folder)
- Does NOT contain `.git`, `nbproject`, `.claude`, `.project`, or `CLAUDE.md`
- All required plugin files are present

### Phase 6: WooCommerce Partners Dashboard Upload

**IMPORTANT**: This requires manual steps in the browser. Guide the user through the process.

#### Step 1: Login Instructions

Provide login instructions:
1. Go to https://woocommerce.com/
2. Click **LOG IN**
3. You'll be redirected to WordPress.com
4. Use credentials:
   - Username: `revenuehunt`
   - Password: Retrieve from KeePassXC (search for "wordpress.com")

#### Step 2: Navigate to Product Page

Provide navigation instructions:
1. After logging in, go to Vendor Dashboard: https://woocommerce.com/wp-admin/
2. Navigate to **Products** → **Product Recommendation Quiz for WooCommerce**
3. Direct URL: https://woocommerce.com/wp-admin/edit.php?post_type=product&page=view-product&post=6046806

#### Step 3: Upload Version

Provide upload instructions:
1. Click **Version** → **Add Version**
2. Fill in:
   - **Version Number**: [NEW_VERSION] (e.g., `2.2.15`)
   - **Upload ZIP File**: Select `product-recommendation-quiz-for-woocommerce.zip` from Desktop
   - **Changes in release**: Description of changes (e.g., "Dev - tested up to WP 6.9.0")
3. Click **Submit** or **Publish**
4. Wait for upload to complete (may take a few minutes)

#### Step 4: Wait for User Confirmation

Wait for the user to confirm:
- [ ] Successfully logged into WooCommerce Partners Dashboard
- [ ] Navigated to product page
- [ ] ZIP file uploaded successfully
- [ ] Version appears in version list

### Phase 7: Verification

#### Step 1: Check Version Status

After upload, verify on the product page:
- [ ] Version number matches new version
- [ ] "Published on" date is recent
- [ ] "Changes in release" displays correctly

#### Step 2: Fix Any Issues

If flags or warnings appear:
- Review and address any issues
- Re-upload if necessary
- Common issues: missing files, incorrect structure, version mismatches

#### Step 3: Wait for Processing

WooCommerce may take a few minutes to process. If version doesn't appear immediately:
- Wait 2-5 minutes
- Refresh the page
- Check for any error messages

## Error Handling

### Keybase Git Issues

If Keybase push fails:
- Verify Keybase is running: `keybase status`
- Check authentication: `keybase login`
- Verify repository access: `git remote -v`

### ZIP File Issues

If ZIP is rejected:
- Verify ZIP contains files directly (not nested)
- Check that development folders are removed
- Ensure all required files are present
- Check file permissions

### Dashboard Access Issues

- Verify WordPress.com credentials in KeePassXC
- Check vendor access permissions
- Contact WooCommerce support if needed

### Upload Failures

- Check file size limits
- Verify ZIP is not corrupted
- Ensure version number format is correct
- Review error messages on upload page

## Output Format

When deployment is complete, provide a summary:

```markdown
## Deployment Complete ✅

### Version Updated
- From: 2.2.14
- To: 2.2.15

### Files Updated
- ✅ product-recommendation-quiz-for-woocommerce.php
- ✅ readme.txt
- ✅ changelog.txt
- ✅ [other files]

### Git Status
- ✅ Committed: [commit message]
- ✅ Pushed to: keybase://team/revenuehunt.admin/woocommerce

### ZIP Preparation
- ✅ Copied to Desktop
- ✅ Development folders removed
- ✅ ZIP file created: product-recommendation-quiz-for-woocommerce.zip

### WooCommerce Upload
- ✅ Logged into Partners Dashboard
- ✅ Navigated to product page
- ✅ Version uploaded: 2.2.15
- ⏳ Processing: [may take a few minutes]
```

## Notes

- **Changelog**: Always add new entries at TOP, never remove old entries
- **Version Format**: Use semantic versioning (MAJOR.MINOR.PATCH)
- **User Interaction**: Git and dashboard operations require user to execute
- **ZIP File**: Must NOT contain development folders
- **Verification**: Always verify version appears on WooCommerce dashboard
- **Timing**: Allow 2-5 minutes for WooCommerce to process uploads

## Related Resources

- SOP Document: `SOP_Update-WooCommerce-Extension.md`
- Keybase Git Repository: `keybase://team/revenuehunt.admin/woocommerce`
- WooCommerce Partners Dashboard: https://woocommerce.com/wp-admin/
- Product Page: https://woocommerce.com/wp-admin/edit.php?post_type=product&page=view-product&post=6046806
