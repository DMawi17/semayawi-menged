# Railway Cusdis Self-Hosting Troubleshooting Guide

## Problem

Your Cusdis domain `https://cusdis-production-c9b7.up.railway.app` is redirecting to your blog site instead of showing the Cusdis dashboard. This means the Cusdis service isn't running properly.

## Railway Deployment Architecture

You should have **3 separate services** in Railway:

1. **PostgreSQL** - Database service
2. **Cusdis** - Docker container running djyde/cusdis
3. **Next.js Blog** - Your main blog application

## Debugging Steps

### Step 1: Check Your Railway Services

**In Railway Dashboard:**

1. Open your Railway project
2. You should see **3 services** listed
3. Check each service status:
   - ✅ Green = Running
   - ❌ Red = Crashed/Failed
   - ⚠️ Yellow = Building/Deploying

### Step 2: Identify Which Service Has Which Domain

**Critical Check:**

1. Click on each service in Railway
2. Go to **Settings** → **Domains** (or **Networking**)
3. Write down which domain belongs to which service:

```
Service Name: ____________  Domain: cusdis-production-c9b7.up.railway.app
Service Name: ____________  Domain: semayawi-menged-production.up.railway.app
```

**Expected Result:**
- Cusdis service should have: `cusdis-production-c9b7.up.railway.app`
- Next.js service should have: `semayawi-menged-production.up.railway.app`

**Current Problem:**
If both are pointing to Next.js, you need to reassign the domain.

### Step 3: Check Cusdis Service Deployment

**If Cusdis service exists:**

1. Click on the Cusdis service
2. Check **Deployments** tab:
   - Is there a successful deployment?
   - Or are they all failing?

3. Check **Logs**:
   - Look for error messages
   - Common errors:
     ```
     DATABASE_URL not found
     Connection refused
     Port already in use
     ```

**If Cusdis service doesn't exist:**
You need to create it! (See Step 5)

### Step 4: Verify Environment Variables

**In your Cusdis service, verify these variables are set:**

Required variables:
```bash
DB_TYPE=pgsql
DB_URL=postgresql://username:password@host:port/database
JWT_SECRET=<random-string-at-least-32-chars>
NEXTAUTH_SECRET=<same-as-jwt-secret>
USERNAME=<admin-username>
PASSWORD=<admin-password>
NEXTAUTH_URL=https://cusdis-production-c9b7.up.railway.app
HOST=0.0.0.0
PORT=3000
```

**Critical: DB_URL format**

Railway provides PostgreSQL connection details. You need to construct the DB_URL:

1. Go to your PostgreSQL service
2. Click **Connect** or **Variables**
3. Look for these variables:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

4. Construct DB_URL:
   ```
   postgresql://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE
   ```

   Example:
   ```
   postgresql://postgres:secretpass@maglev.proxy.rlwy.net:23549/railway
   ```

### Step 5: Deploy Cusdis on Railway (If Not Deployed)

Railway doesn't support `docker-compose.yml` directly. You need to deploy services separately:

#### A. Deploy PostgreSQL (Already Done)
✅ You have: `maglev.proxy.rlwy.net:23549`

#### B. Deploy Cusdis Service

**Method 1: Using Railway Template (Easiest)**
Unfortunately, there's no official Cusdis Railway template.

**Method 2: Deploy from Docker Image**

1. In Railway Dashboard, click **+ New**
2. Select **Deploy from Docker Image**
3. Enter: `djyde/cusdis:latest`
4. Set environment variables (from Step 4)
5. Assign the domain: `cusdis-production-c9b7.up.railway.app`

#### C. Configure Networking

1. Make sure Cusdis service can access PostgreSQL:
   - Railway services in the same project can communicate
   - Use the internal PostgreSQL URL (Railway provides this)

2. Expose Cusdis to public internet:
   - Port: 3000 (default for Cusdis)
   - Railway should auto-detect this

### Step 6: Domain Assignment

**If domain is assigned to wrong service:**

1. Go to **Next.js service** → Settings → Domains
2. If `cusdis-production-c9b7.up.railway.app` is listed here, **remove it**
3. Go to **Cusdis service** → Settings → Domains
4. Click **Generate Domain** or **Add Custom Domain**
5. Assign `cusdis-production-c9b7.up.railway.app`

### Step 7: Test the Deployment

Once deployed correctly:

1. Visit: `https://cusdis-production-c9b7.up.railway.app`
   - Should show Cusdis login page (not your blog!)

2. Visit: `https://cusdis-production-c9b7.up.railway.app/js/cusdis.es.js`
   - Should return JavaScript code

3. Check logs for startup messages:
   ```
   Cusdis is running on port 3000
   Database connected successfully
   ```

## Common Issues & Solutions

### Issue 1: Domain points to wrong service

**Solution:**
- Remove domain from Next.js service
- Add domain to Cusdis service
- Redeploy

### Issue 2: Cusdis service crashes immediately

**Check logs for:**
- Database connection errors → Fix DB_URL
- Missing environment variables → Add all required vars
- Port conflicts → Use PORT=3000

### Issue 3: Can't connect to database

**Solution:**
1. Verify PostgreSQL service is running
2. Check DB_URL format is correct
3. Ensure services are in same Railway project (for internal networking)
4. Use Railway's internal database URL if available

### Issue 4: 403 Forbidden errors

**Solution:**
1. Check if Cusdis is actually receiving requests (check logs)
2. Verify NEXTAUTH_URL matches your domain
3. Check JWT_SECRET is set

## Alternative: Deploy with Railway CLI

If GUI isn't working, you can use Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Create new service for Cusdis
railway service create cusdis

# Set environment variables
railway variables set DB_URL="postgresql://..."
railway variables set JWT_SECRET="your-secret"
# ... set all other variables

# Deploy from Docker image
railway up --service cusdis --image djyde/cusdis:latest
```

## What to Share for Help

If you need help, please provide:

1. **Screenshot of Railway project showing all services**
2. **Cusdis service logs** (last 50 lines)
3. **Domain assignment** for each service
4. **Environment variables** (names only, not values!)
5. **Deployment status** of Cusdis service

## Next Steps

Once Cusdis is running:

1. Visit the dashboard: `https://cusdis-production-c9b7.up.railway.app`
2. Login with your admin credentials
3. Create a website and get App ID
4. Set in your Next.js Railway deployment:
   ```bash
   NEXT_PUBLIC_CUSDIS_APP_ID=<your-app-id>
   NEXT_PUBLIC_CUSDIS_HOST=https://cusdis-production-c9b7.up.railway.app
   ```
5. Deploy and test!

---

**Need more help?** Share your Railway project structure and I'll help debug further!
