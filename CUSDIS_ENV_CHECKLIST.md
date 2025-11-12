# Cusdis Railway Environment Variables Checklist

Based on your DB_URL: `postgresql://postgres:<password>@postgres.railway.internal:5432/railway`

This confirms you have Cusdis deployed on Railway. Let's verify all environment variables are set correctly.

## Required Environment Variables for Cusdis Service

In your **Cusdis service** (not Next.js), verify these are all set:

### ✅ Database Configuration
```bash
DB_TYPE=pgsql
DB_URL=postgresql://postgres:<your-password>@postgres.railway.internal:5432/railway
```
- ✅ You have the correct internal Railway URL
- Replace `<your-password>` with your actual PostgreSQL password
- The password should match what's in your PostgreSQL service variables

### ✅ Authentication & Security
```bash
JWT_SECRET=<at-least-32-character-random-string>
NEXTAUTH_SECRET=<same-value-as-jwt-secret>
USERNAME=<your-admin-username>
PASSWORD=<your-admin-password>
```

**How to generate JWT_SECRET:**
```bash
# Run this in your terminal to generate a secure random string:
openssl rand -base64 32
```

Example:
```bash
JWT_SECRET=vQ8xK2nP7mR9wL4tY6uI3oA5sD8fG1hJ9kM2nB4vC7xZ
NEXTAUTH_SECRET=vQ8xK2nP7mR9wL4tY6uI3oA5sD8fG1hJ9kM2nB4vC7xZ
USERNAME=admin
PASSWORD=your-secure-password-here
```

### ✅ URL Configuration
```bash
NEXTAUTH_URL=https://cusdis-production-c9b7.up.railway.app
```
- This MUST match your Cusdis domain exactly
- Include `https://`
- No trailing slash

### ✅ Server Configuration
```bash
HOST=0.0.0.0
PORT=3000
```
- HOST must be `0.0.0.0` to accept external connections
- PORT is typically 3000 (Railway auto-detects this)

## Complete Environment Variable Template

Copy this and fill in your values:

```bash
# Database
DB_TYPE=pgsql
DB_URL=postgresql://postgres:YOUR_POSTGRES_PASSWORD@postgres.railway.internal:5432/railway

# Security
JWT_SECRET=YOUR_32_CHAR_RANDOM_STRING
NEXTAUTH_SECRET=YOUR_32_CHAR_RANDOM_STRING
USERNAME=admin
PASSWORD=YOUR_ADMIN_PASSWORD

# URL
NEXTAUTH_URL=https://cusdis-production-c9b7.up.railway.app

# Server
HOST=0.0.0.0
PORT=3000
```

## How to Set in Railway

1. Go to Railway Dashboard
2. Click on your **Cusdis service** (not Next.js, not PostgreSQL)
3. Click **Variables** tab
4. For each variable above:
   - Click **+ New Variable**
   - Enter the name and value
   - Click **Add**
5. Railway will automatically redeploy after you save

## Verification Steps

After setting all variables:

### 1. Check Deployment Status
- Go to **Deployments** tab in Cusdis service
- Latest deployment should show "Success" with green checkmark
- If it shows "Failed" or "Crashed", check logs

### 2. Check Logs
- Click on the latest deployment
- Look for these success messages:
  ```
  ✓ Ready in Xms
  ✓ Database connected
  ○ Server running on http://0.0.0.0:3000
  ```
- If you see errors about:
  - `DATABASE_URL` → Check DB_URL format
  - `JWT_SECRET` → Make sure it's set
  - `NEXTAUTH_URL` → Verify it matches your domain

### 3. Test the Domain
- Visit: `https://cusdis-production-c9b7.up.railway.app`
  - ✅ Should show **Cusdis login page**
  - ❌ If shows your blog → domain is assigned to wrong service

- Visit: `https://cusdis-production-c9b7.up.railway.app/js/cusdis.es.js`
  - ✅ Should return **JavaScript code**
  - ❌ If 403/404 → Cusdis isn't running properly

## Common Issues

### Issue: "DATABASE_URL is not defined"
**Solution:**
- Verify `DB_URL` is set (not `DATABASE_URL`)
- Check the format matches exactly
- Ensure password doesn't have special characters that need URL encoding

### Issue: "Invalid JWT"
**Solution:**
- Make sure `JWT_SECRET` and `NEXTAUTH_SECRET` have the same value
- Ensure they're at least 32 characters long
- No quotes around the value

### Issue: "NEXTAUTH_URL mismatch"
**Solution:**
- Must match your domain exactly
- Include `https://`
- No trailing `/`
- Example: `https://cusdis-production-c9b7.up.railway.app`

### Issue: Domain shows blog instead of Cusdis
**Solution:**
1. Go to Next.js service → Settings → Domains
2. Remove `cusdis-production-c9b7.up.railway.app` if it's there
3. Go to Cusdis service → Settings → Domains
4. Add `cusdis-production-c9b7.up.railway.app`
5. Wait for DNS to update (1-2 minutes)

## PostgreSQL Password

To get your PostgreSQL password:
1. Go to PostgreSQL service in Railway
2. Click **Variables** tab
3. Look for `POSTGRES_PASSWORD` or `PGPASSWORD`
4. Copy that value
5. Use it in your Cusdis `DB_URL`

## Next Steps

Once all variables are set and Cusdis is running:

1. **Log into Cusdis dashboard:**
   - URL: `https://cusdis-production-c9b7.up.railway.app`
   - Username: (value from `USERNAME` variable)
   - Password: (value from `PASSWORD` variable)

2. **Create a website:**
   - Click "Add Website"
   - Domain: `semayawi-menged-production.up.railway.app`
   - Name: "Semayawi Menged Blog"
   - Copy the **App ID**

3. **Configure Next.js app:**
   - Go to Next.js service in Railway
   - Add these variables:
     ```bash
     NEXT_PUBLIC_CUSDIS_APP_ID=<app-id-from-step-2>
     NEXT_PUBLIC_CUSDIS_HOST=https://cusdis-production-c9b7.up.railway.app
     ```

4. **Deploy and test!**
   - Railway auto-deploys after variable changes
   - Visit a blog post
   - Comments should now load!

## Need Help?

If you're still having issues, share:
1. Screenshot of Cusdis service variables (names only, hide values)
2. Last 20 lines of Cusdis deployment logs
3. What you see when visiting the Cusdis domain
