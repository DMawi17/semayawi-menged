# Cusdis Self-Hosting Guide

Complete guide to self-hosting Cusdis for full control over your comment system's styling and functionality.

## Table of Contents

1. [Why Self-Host?](#why-self-host)
2. [Prerequisites](#prerequisites)
3. [Quick Start with Docker](#quick-start-with-docker)
4. [Production Deployment](#production-deployment)
5. [Custom Styling](#custom-styling)
6. [Database Setup](#database-setup)
7. [Environment Variables](#environment-variables)
8. [Troubleshooting](#troubleshooting)

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

### Required

- **Docker** (recommended) OR **Node.js 16+**
- **PostgreSQL** or **SQLite** database
- **Domain name** (for production)
- **SSL certificate** (for production - use Let's Encrypt)

### Optional

- **Reverse proxy** (Nginx, Caddy, Traefik)
- **Email service** (for notifications - Sendgrid, AWS SES, etc.)

---

## Quick Start with Docker

### Option 1: SQLite (Easiest for Development)

```bash
docker run -d \\
  --name cusdis \\
  -e USERNAME=admin \\
  -e PASSWORD=your_secure_password \\
  -e JWT_SECRET=your_jwt_secret_min_32_chars \\
  -e DB_TYPE=sqlite \\
  -e DB_URL=file:/data/db.sqlite \\
  -e NEXTAUTH_URL=http://localhost:3000 \\
  -p 3000:3000 \\
  -v cusdis_data:/data \\
  djyde/cusdis
```

### Option 2: PostgreSQL (Recommended for Production)

```bash
# First, start PostgreSQL
docker run -d \\
  --name cusdis-postgres \\
  -e POSTGRES_DB=cusdis \\
  -e POSTGRES_USER=cusdis \\
  -e POSTGRES_PASSWORD=your_db_password \\
  -v cusdis_postgres:/var/lib/postgresql/data \\
  postgres:15-alpine

# Then start Cusdis
docker run -d \\
  --name cusdis \\
  --link cusdis-postgres:postgres \\
  -e USERNAME=admin \\
  -e PASSWORD=your_secure_password \\
  -e JWT_SECRET=your_jwt_secret_min_32_chars \\
  -e DB_TYPE=pgsql \\
  -e DB_URL=postgresql://cusdis:your_db_password@postgres:5432/cusdis \\
  -e NEXTAUTH_URL=http://localhost:3000 \\
  -p 3000:3000 \\
  djyde/cusdis
```

### Access Your Instance

1. Open http://localhost:3000
2. Login with your username and password
3. Create your first website
4. Copy the App ID

---

## Production Deployment

### Using Docker Compose (Recommended)

Create `docker-compose.yml`:

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
      # Optional: Email notifications
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASSWORD: ${SMTP_PASSWORD}
      SMTP_SENDER: ${SMTP_SENDER}
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    networks:
      - cusdis-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  cusdis-network:
    driver: bridge
```

Create `.env` file:

```bash
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_very_secure_password

# JWT Secret (min 32 characters)
JWT_SECRET=your_jwt_secret_at_least_32_characters_long

# Database
DB_PASSWORD=your_database_password

# URLs
NEXTAUTH_URL=https://comments.your-domain.com
HOST=0.0.0.0

# Optional: Email Configuration
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
SMTP_SENDER=noreply@your-domain.com
```

Start the services:

```bash
docker-compose up -d
```

### Nginx Reverse Proxy Configuration

Create `/etc/nginx/sites-available/cusdis`:

```nginx
server {
    listen 80;
    server_name comments.your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name comments.your-domain.com;

    # SSL Configuration (use Certbot for Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/comments.your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/comments.your-domain.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Proxy to Cusdis
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/cusdis /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Custom Styling

One of the main benefits of self-hosting is full control over styling.

### Modify Widget Styles

Clone the Cusdis repository:

```bash
git clone https://github.com/djyde/cusdis.git
cd cusdis
npm install
```

### Edit Widget Component

Edit `widget/index.svelte` for the comment form layout:

```svelte
<!-- Change from vertical to horizontal layout -->
<div class="cusdis-input-row">
  <input
    type="text"
    placeholder={__('nickname')}
    bind:value={nickname}
  />
  <input
    type="email"
    placeholder={__('email') + ' (' + __('optional') + ')'}
    bind:value={email}
  />
</div>
```

### Add Custom CSS

Edit `widget/styles.scss`:

```scss
.cusdis-input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
}
```

### Build Custom Widget

```bash
npm run build:widget
```

### Build Custom Docker Image

Create `Dockerfile.custom`:

```dockerfile
FROM djyde/cusdis:latest

# Copy your custom built widget
COPY widget/dist /app/public/widget
```

Build and use:

```bash
docker build -f Dockerfile.custom -t cusdis:custom .
```

Update your `docker-compose.yml` to use `cusdis:custom` instead of `djyde/cusdis:latest`.

---

## Database Setup

### SQLite (Development)

Pros:
- Simple setup
- No external dependencies
- File-based

Cons:
- Not suitable for high traffic
- Limited concurrent connections

```bash
DB_TYPE=sqlite
DB_URL=file:/data/db.sqlite
```

### PostgreSQL (Production)

Pros:
- Better performance
- Concurrent connections
- Suitable for production

Cons:
- Requires separate database server
- More complex setup

```bash
DB_TYPE=pgsql
DB_URL=postgresql://user:password@host:5432/database
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `USERNAME` | Admin dashboard username | `admin` |
| `PASSWORD` | Admin dashboard password | `SecurePassword123!` |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | `your_jwt_secret_at_least_32_characters` |
| `DB_TYPE` | Database type | `sqlite` or `pgsql` |
| `DB_URL` | Database connection string | `postgresql://...` |
| `NEXTAUTH_URL` | Public URL of your Cusdis instance | `https://comments.example.com` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `HOST` | Listen address | `0.0.0.0` |
| `PORT` | Listen port | `3000` |
| `SMTP_HOST` | Email server | `smtp.gmail.com` |
| `SMTP_PORT` | Email port | `587` |
| `SMTP_USER` | Email username | `your-email@gmail.com` |
| `SMTP_PASSWORD` | Email password | `your-app-password` |
| `SMTP_SENDER` | From email address | `noreply@example.com` |

---

## Update Your Blog Configuration

Once your self-hosted instance is running:

1. **Get your App ID** from the Cusdis dashboard
2. **Update `.env.local`**:

```bash
NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id
NEXT_PUBLIC_CUSDIS_HOST=https://comments.your-domain.com
```

3. **Update CSP in `next.config.mjs`**:

```javascript
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://comments.your-domain.com https://vercel.live https://va.vercel-scripts.com",
"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://comments.your-domain.com",
"frame-src https://comments.your-domain.com",
"connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://comments.your-domain.com",
```

4. **Restart your blog**:

```bash
npm run dev
```

---

## Troubleshooting

### Issue: Cusdis won't start

**Solution**: Check logs

```bash
docker logs cusdis
```

Common issues:
- Invalid JWT_SECRET (must be 32+ characters)
- Database connection failed
- Port 3000 already in use

### Issue: Can't access dashboard

**Solution**: Verify NEXTAUTH_URL is correct

```bash
# Must match exactly where you access Cusdis
NEXTAUTH_URL=http://localhost:3000  # for local
NEXTAUTH_URL=https://comments.your-domain.com  # for production
```

### Issue: Comments not appearing

**Solution**: Check moderation settings

1. Log into dashboard
2. Go to comments section
3. Approve pending comments
4. Enable auto-approval in settings

### Issue: Widget not loading on blog

**Solution**: Check CSP and CORS

1. Verify CSP allows your Cusdis domain
2. In Cusdis dashboard, add your blog domain to allowed origins
3. Check browser console for errors

### Issue: Email notifications not working

**Solution**: Test SMTP configuration

```bash
# Use a test script
docker exec -it cusdis node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
});
transporter.sendMail({
  from: process.env.SMTP_SENDER,
  to: 'test@example.com',
  subject: 'Test',
  text: 'Test email'
});
"
```

---

## Updating Cusdis

### Docker

```bash
# Pull latest image
docker pull djyde/cusdis:latest

# Restart container
docker-compose down
docker-compose up -d
```

### Manual

```bash
cd cusdis
git pull origin main
npm install
npm run build
pm2 restart cusdis
```

---

## Backup & Restore

### Backup Database

**PostgreSQL**:

```bash
docker exec cusdis-postgres pg_dump -U cusdis cusdis > cusdis-backup-$(date +%Y%m%d).sql
```

**SQLite**:

```bash
docker cp cusdis:/data/db.sqlite ./cusdis-backup-$(date +%Y%m%d).sqlite
```

### Restore Database

**PostgreSQL**:

```bash
docker exec -i cusdis-postgres psql -U cusdis cusdis < cusdis-backup-20250110.sql
```

**SQLite**:

```bash
docker cp ./cusdis-backup-20250110.sqlite cusdis:/data/db.sqlite
docker restart cusdis
```

---

## Production Checklist

- [ ] Use PostgreSQL instead of SQLite
- [ ] Set strong admin password (min 16 characters)
- [ ] Use 32+ character JWT_SECRET
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure reverse proxy (Nginx/Caddy)
- [ ] Set up automated backups
- [ ] Configure email notifications
- [ ] Set up monitoring (Uptime Kuma, etc.)
- [ ] Restrict database access
- [ ] Enable firewall rules
- [ ] Set up log rotation
- [ ] Configure auto-restart on failure

---

## Additional Resources

- **Official Documentation**: https://cusdis.com/doc
- **GitHub Repository**: https://github.com/djyde/cusdis
- **Discord Community**: https://discord.gg/eDs5fc4Jcq
- **Railway Quick Deploy**: https://railway.app (one-click deployment)

---

**Last Updated**: 2025-11-10
**Cusdis Version**: Latest (check GitHub for version)
