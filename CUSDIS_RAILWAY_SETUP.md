# Cusdis Railway Setup Guide

This guide will help you configure your blog to use the Cusdis instance deployed on Railway.

## Current Status

- ✅ Cusdis server deployed to Railway: `https://cusdis-production-c9b7.up.railway.app`
- ✅ CSP headers configured in `next.config.mjs`
- ⚠️ **Missing**: Environment variables in your blog's Railway deployment

## Step-by-Step Setup

### Step 1: Access Your Cusdis Dashboard

1. Open your browser and navigate to:
   ```
   https://cusdis-production-c9b7.up.railway.app
   ```

2. Log in with your admin credentials:
   - Username: The value you set for `ADMIN_USERNAME` in Railway
   - Password: The value you set for `ADMIN_PASSWORD` in Railway

   > **Note**: If you get a 403 error, your Cusdis deployment may not be running. Check Railway logs.

### Step 2: Create a Website in Cusdis

1. Once logged in, click **"Add Website"** or **"Create Website"**

2. Fill in your website details:
   - **Domain**: Your blog's domain (e.g., `semayawi-menged.vercel.app` or your custom domain)
   - **Name**: A friendly name for your site (e.g., "Semayawi Menged Blog")

3. Click **"Create"** or **"Save"**

4. **Copy the App ID** - You'll see something like:
   ```
   App ID: abc123def456ghi789
   ```

   Save this - you'll need it in the next step!

### Step 3: Configure Environment Variables in Railway

You need to set these variables in your **blog application's** Railway deployment (not the Cusdis server):

1. Go to your Railway dashboard
2. Select your **blog project** (the Next.js app, not the Cusdis server)
3. Go to **Variables** tab
4. Add these two variables:

   ```bash
   NEXT_PUBLIC_CUSDIS_APP_ID=abc123def456ghi789
   NEXT_PUBLIC_CUSDIS_HOST=https://cusdis-production-c9b7.up.railway.app
   ```

   Replace `abc123def456ghi789` with the actual App ID from Step 2.

5. Click **"Save"** or Railway will auto-save

### Step 4: Redeploy Your Blog

After adding the environment variables:

1. Railway will automatically trigger a redeploy
2. Wait for the deployment to complete (usually 1-3 minutes)
3. Once deployed, visit any blog post
4. Scroll down to the comments section - it should now work!

## Troubleshooting

### Issue: Still getting 403 errors

**Solution**: Your Cusdis deployment might not be running. Check:

1. Go to Railway dashboard → Cusdis project
2. Check the deployment logs for errors
3. Verify all environment variables are set:
   ```bash
   DB_PASSWORD=<your-secure-password>
   JWT_SECRET=<your-secret-key>
   ADMIN_USERNAME=<your-username>
   ADMIN_PASSWORD=<your-password>
   NEXTAUTH_URL=https://cusdis-production-c9b7.up.railway.app
   HOST=0.0.0.0
   ```

### Issue: Can't access Cusdis dashboard

**Possible causes**:
- Deployment is not running
- Wrong admin credentials
- Database connection issues

**Solution**:
1. Check Railway logs for the Cusdis service
2. Verify PostgreSQL database is provisioned and healthy
3. Try redeploying the Cusdis service

### Issue: Comments section says "not configured"

**Solution**: You haven't set the environment variables yet. Complete Step 3 above.

## Alternative: Use Cusdis Cloud (Temporary Solution)

If you're having trouble with your self-hosted instance, you can temporarily use Cusdis Cloud:

1. Sign up at [cusdis.com](https://cusdis.com)
2. Create a website and get your App ID
3. Set these environment variables in Railway:
   ```bash
   NEXT_PUBLIC_CUSDIS_APP_ID=<your-app-id-from-cusdis.com>
   NEXT_PUBLIC_CUSDIS_HOST=https://cusdis.com
   ```
4. Update CSP in `next.config.mjs` to allow `https://cusdis.com`

## Verification

To verify everything is working:

1. Visit: `https://cusdis-production-c9b7.up.railway.app/js/cusdis.es.js`
   - Should return JavaScript code, not an error

2. Visit any blog post on your site
   - Comments section should load
   - Console should show: "✅ Cusdis SDK loaded successfully"

3. Try posting a test comment
   - Should appear in your Cusdis dashboard

## Next Steps

Once configured:
- Moderate comments via your Cusdis dashboard
- Configure email notifications (optional)
- Customize comment widget appearance
- Set up automated spam filtering

---

**Need Help?** Check the Railway logs for both your blog and Cusdis deployments for detailed error messages.
