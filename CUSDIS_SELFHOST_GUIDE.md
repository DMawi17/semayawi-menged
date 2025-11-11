# Cusdis Self-Hosting Guide

Complete guide to self-hosting Cusdis for full control over your comment system's styling and functionality.

## Table of Contents

1. [Why Self-Host?](#why-self-host)
2. [Prerequisites](#prerequisites)
3. [Deployment with Docker Compose](#deployment-with-docker-compose)
4. [Configuration](#configuration)
5. [Troubleshooting](#troubleshooting)

---

## Why Self-Host?

Self-hosting Cusdis gives you:

- ✅ **Full UI customization** - Complete control over widget styling
- ✅ **Data ownership** - All comments stored in your database
- ✅ **No external dependencies** - No reliance on third-party services
- ✅ **Privacy** - Complete control over user data
- ✅ **Custom features** - Ability to modify the codebase
- ✅ **No rate limits** - Unlimited comments and traffic

---

## Prerequisites

- **Docker** with Docker Compose v2
- **Domain name** (for production)
- **SSL certificate** (for production - use Let's Encrypt)

---

## Deployment with Docker Compose

This project is configured to run Cusdis via Docker Compose, which orchestrates the Cusdis application, a PostgreSQL database, and an Nginx reverse proxy.

### Step 1: Create Configuration Files

All the necessary files are located in the `cusdis-server/` directory.

#### `docker-compose.yml`

This file defines the three services: `postgres`, `cusdis`, and `nginx`.

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: cusdis-postgres
    environment:
      POSTGRES_DB: cusdis
      POSTGRES_USER: cusdis
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - cusdis-network
    restart: unless-stopped

  cusdis:
    image: djyde/cusdis:latest
    container_name: cusdis
    environment:
      USERNAME: ${ADMIN_USERNAME}
      PASSWORD: ${ADMIN_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      DB_TYPE: pgsql
      DB_URL: postgresql://cusdis:${DB_PASSWORD}@postgres:5432/cusdis
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      HOST: ${HOST}
    depends_on:
      - postgres
    networks:
      - cusdis-network
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: cusdis-nginx
    ports:
      - "3000:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - cusdis
    networks:
      - cusdis-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  cusdis-network:
    driver: bridge
```

#### `.env`

Create a `.env` file inside the `cusdis-server/` directory to store your secrets. **Do not commit this file.**

```bash
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=aVeryComplexPassword!123

# JWT Secret (min 32 characters)
JWT_SECRET=aVeryComplexJwtSecret_min_32_chars

# Database
DB_PASSWORD=aVeryComplexDbPassword!123

# URLs
NEXTAUTH_URL=http://localhost:3000
HOST=0.0.0.0
```

#### `nginx.conf`

This file configures Nginx to act as a reverse proxy and, crucially, handles the CORS (Cross-Origin Resource Sharing) headers.

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        # Hide the header from the backend to avoid duplicates
        proxy_hide_header 'Access-Control-Allow-Origin';
        # Add the correct CORS header
        add_header 'Access-Control-Allow-Origin' '*' always;

        # Handle pre-flight CORS requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-timezone-offset';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        proxy_pass http://cusdis:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 2: Start the Services

1. Navigate to the `cusdis-server` directory.
2. Run the following command:
   ```bash
   docker compose up -d
   ```
3. The Cusdis dashboard will be available at `http://localhost:3000`.

---

## Configuration

### Step 1: Configure Cusdis Dashboard

1. **Log in** to the Cusdis dashboard at `http://localhost:3000` with the credentials from your `.env` file.
2. **Create a new website**.
3. Copy the **App ID**.
4. Go to the **Settings** page for your new website.
5. In the **Allowed Origins** field, add the URL of your blog. For local development, this will be `http://localhost:3100`.

### Step 2: Configure the Blog

1. In the root of this project, create a `.env.local` file.
2. Add the App ID and the URL of your self-hosted Cusdis instance:

```bash
NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-from-dashboard
NEXT_PUBLIC_CUSDIS_HOST=http://localhost:3000
```

### Step 3: Restart the Blog's Dev Server

1. Stop your blog's development server if it's running.
2. Start it on a port other than 3000 (which is now used by Cusdis). For example, use port 3100:
   ```bash
   npm run dev -- -p 3100
   ```
3. The comment section should now be visible on your blog posts.

---

## Troubleshooting

### Issue: Comments Not Loading (White Box)

This is almost always a Cross-Origin Resource Sharing (CORS) issue. Open the browser console (F12) and check for CORS errors.

#### "No 'Access-Control-Allow-Origin' header is present"

This means the Nginx reverse proxy is not running or is misconfigured. Ensure the `docker-compose.yml` and `nginx.conf` files are correct and the services are running.

#### "Request header field ... is not allowed by Access-Control-Allow-Headers"

This means a specific HTTP header sent by Cusdis is being blocked. The `nginx.conf` provided in this guide includes a fix for the `x-timezone-offset` header. If a new header is added in a future Cusdis version, you may need to add it to the `Access-Control-Allow-Headers` list in `nginx.conf`.

#### "The 'Access-Control-Allow-Origin' header contains multiple values"

This error means both the Cusdis application and the Nginx proxy are trying to set the CORS header. The `nginx.conf` in this guide uses `proxy_hide_header 'Access-Control-Allow-Origin';` to prevent this.

#### Final Check

The most critical step for fixing CORS issues is to ensure you have added your blog's domain (e.g., `http://localhost:3100`) to the **"Allowed Origins"** field in your website's settings in the Cusdis dashboard.

### Issue: Can't access dashboard

**Solution**: Verify `NEXTAUTH_URL` in your `cusdis-server/.env` file is correct. For this local setup, it must be `http://localhost:3000`.

---

## Updating Cusdis

### Docker

```bash
# Navigate to the cusdis-server directory
cd cusdis-server

# Pull the latest image
docker compose pull cusdis

# Restart the services
docker compose up -d --force-recreate
```

---

## Backup & Restore

### Backup Database

**PostgreSQL**:

```bash
docker exec cusdis-postgres pg_dump -U cusdis cusdis > cusdis-backup-$(date +%Y%m%d).sql
```

### Restore Database

**PostgreSQL**:

```bash
docker exec -i cusdis-postgres psql -U cusdis cusdis < cusdis-backup-20250110.sql
```

---

**Last Updated**: 2025-11-11
**Cusdis Version**: Latest (check GitHub for version)
