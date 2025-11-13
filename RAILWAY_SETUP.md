# Railway Setup from Scratch

## 1. Create New Project in Railway

1. Go to railway.app and create a new project
2. Create 3 services:

### Service 1: PostgreSQL
- Click "New" → "Database" → "PostgreSQL"
- Railway auto-configures it

### Service 2: Cusdis
- Click "New" → "Docker Image"
- Enter: `djyde/cusdis:latest`
- **Important:** Do NOT connect any Git repo to this service
- Add variables:
  ```
  USERNAME=admin
  PASSWORD=<your-admin-password>
  HOST=https://<your-cusdis-domain>
  JWT_SECRET=<random-string>
  NEXTAUTH_URL=https://<your-cusdis-domain>
  DATABASE_URL=${{Postgres.DATABASE_URL}}
  ```
- Generate domain in Settings → Networking → Public Networking

### Service 3: Next.js Blog
- Click "New" → "GitHub Repo"
- Connect your repository
- Add variables:
  ```
  NEXT_PUBLIC_CUSDIS_APP_ID=<get-this-after-cusdis-setup>
  NEXT_PUBLIC_CUSDIS_HOST=https://<your-cusdis-domain>
  ```
- Generate domain in Settings → Networking → Public Networking

## 2. Access Cusdis Dashboard

1. Visit `https://<your-cusdis-domain>`
2. Login with your USERNAME and PASSWORD
3. Create a new website
4. Copy the App ID
5. Add App ID to Next.js service as `NEXT_PUBLIC_CUSDIS_APP_ID`

## 3. Deploy

Redeploy your Next.js service after adding the App ID.

Done!
