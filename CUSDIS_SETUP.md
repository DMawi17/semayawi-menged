# Cusdis Comments Setup Guide

This guide will help you set up **Cusdis** comments for your blog. Cusdis is a lightweight, privacy-friendly alternative to traditional comment systems.

## Why Cusdis?

- **Lightweight**: Minimal JavaScript footprint
- **Privacy-Friendly**: GDPR-compliant, no tracking
- **Self-Hostable**: Full control over your data
- **Simple**: Easy setup and moderation
- **Free Tier**: Cloud hosting available at cusdis.com

## Table of Contents

1. [Quick Start](#quick-start)
2. [Option 1: Using Cusdis Cloud](#option-1-using-cusdis-cloud-recommended)
3. [Option 2: Self-Hosting](#option-2-self-hosting)
4. [Configuration](#configuration)
5. [Troubleshooting](#troubleshooting)

---

## Quick Start

The fastest way to get started is using Cusdis Cloud:

1. Sign up at [cusdis.com](https://cusdis.com)
2. Create a website
3. Copy your App ID
4. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-here
   ```
5. Restart your dev server

Comments will now appear on your blog posts!

---

## Option 1: Using Cusdis Cloud (Recommended)

### Step 1: Create a Cusdis Account

1. Visit [cusdis.com](https://cusdis.com)
2. Click "Sign Up" or "Get Started"
3. Create an account with your email

### Step 2: Add Your Website

1. Log in to your Cusdis dashboard
2. Click "Add Website" or "New Project"
3. Enter your website details:
   - **Website Name**: Your blog name (e.g., "Semayawi Menged")
   - **Domain**: Your production domain (e.g., "semayawi-menged.com")
     - For local development, you can use `localhost:3000`
   - **Language**: Select your preferred language

4. Click "Create" or "Save"

### Step 3: Get Your App ID

1. After creating your website, you'll see your **App ID**
2. It will look something like: `abc123def456`
3. Copy this ID

### Step 4: Configure Environment Variables

1. Open your `.env.local` file (create it if it doesn't exist)
2. Add your Cusdis App ID:

```bash
# Cusdis Comments Configuration
NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-here
```

3. Replace `your-app-id-here` with your actual App ID

### Step 5: Restart Your Server

```bash
# Stop your dev server (Ctrl+C)
npm run dev
```

### Step 6: Test Comments

1. Navigate to any blog post (e.g., `/blog/eve-mother-of-all-living`)
2. Scroll to the bottom
3. You should see the Cusdis comment widget
4. Try posting a test comment

---

## Option 2: Self-Hosting

If you want full control over your comment data, you can self-host Cusdis.

### Prerequisites

- Docker (recommended) or Node.js 16+
- PostgreSQL database
- Optional: Reverse proxy (Nginx, Caddy)

### Step 1: Deploy Cusdis

#### Using Docker (Recommended)

```bash
# Clone the Cusdis repository
git clone https://github.com/djyde/cusdis.git
cd cusdis

# Create environment file
cp .env.example .env

# Configure your database and JWT secret
# Edit .env with your settings

# Start with Docker Compose
docker-compose up -d
```

#### Manual Deployment

```bash
# Clone and install
git clone https://github.com/djyde/cusdis.git
cd cusdis
npm install

# Build
npm run build

# Set environment variables
export DATABASE_URL=postgresql://user:password@localhost:5432/cusdis
export JWT_SECRET=your-secret-key
export NEXTAUTH_URL=https://your-cusdis-domain.com

# Start the server
npm start
```

### Step 2: Configure Environment Variables

In your blog's `.env.local`:

```bash
# Cusdis Comments Configuration
NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-here
NEXT_PUBLIC_CUSDIS_HOST=https://your-cusdis-domain.com
```

### Step 3: Create Your Website in Cusdis

1. Visit your self-hosted Cusdis dashboard
2. Create an account
3. Add your website
4. Copy the App ID
5. Update your `.env.local` with the App ID

---

## Configuration

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_CUSDIS_APP_ID` | Yes | Your Cusdis App ID | - |
| `NEXT_PUBLIC_CUSDIS_HOST` | No | Custom Cusdis host URL | `https://cusdis.com` |

### Example Configurations

#### Production (Cusdis Cloud)

```bash
NEXT_PUBLIC_CUSDIS_APP_ID=abc123def456
```

#### Production (Self-Hosted)

```bash
NEXT_PUBLIC_CUSDIS_APP_ID=abc123def456
NEXT_PUBLIC_CUSDIS_HOST=https://comments.your-domain.com
```

#### Development

```bash
# Use the same App ID as production or create a separate one for testing
NEXT_PUBLIC_CUSDIS_APP_ID=test123test456
```

---

## Features

### Dark Mode Support

The comment component automatically switches between light and dark themes based on your site's theme setting.

### Moderation Dashboard

Cusdis provides a moderation dashboard where you can:

- Approve/reject comments
- Reply to comments
- Delete spam
- Manage users
- Export comments

Access your dashboard at:
- Cloud: [cusdis.com/dashboard](https://cusdis.com/dashboard)
- Self-hosted: `https://your-cusdis-domain.com/dashboard`

### Notifications

Enable email notifications in your Cusdis dashboard to receive alerts when:
- New comments are posted
- Comments need moderation
- Users reply to your responses

---

## Troubleshooting

### Comments Not Showing

**Problem**: Comment widget doesn't appear on blog posts

**Solutions**:
1. Check that `NEXT_PUBLIC_CUSDIS_APP_ID` is set in `.env.local`
2. Restart your dev server after adding environment variables
3. Clear browser cache and reload the page
4. Check browser console for errors (F12 → Console)

### "Not Configured" Message

**Problem**: Seeing "የአስተያየት ክፍል አልተዋቀረም" message

**Solution**: This means the App ID is missing. Add it to `.env.local`:

```bash
NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-here
```

### Comments Not Loading

**Problem**: Widget shows but comments don't load

**Solutions**:
1. Verify your App ID is correct
2. Check your domain is registered in Cusdis dashboard
3. If self-hosting, ensure `NEXT_PUBLIC_CUSDIS_HOST` is correct
4. Check Cusdis service status (cloud) or server logs (self-hosted)

### Theme Not Changing

**Problem**: Dark mode not working in comments

**Solution**: This is handled automatically. If it's not working:
1. Clear browser cache
2. Check that your site's theme provider is working
3. Verify the component is receiving theme updates

### Self-Hosted Connection Issues

**Problem**: Can't connect to self-hosted instance

**Solutions**:
1. Ensure your Cusdis server is running
2. Check firewall rules allow connections
3. Verify SSL certificate is valid (if using HTTPS)
4. Check CORS settings in Cusdis configuration

---

## Migration from Giscus

If you're migrating from Giscus to Cusdis:

### 1. Export Existing Comments

Unfortunately, there's no direct migration path from Giscus to Cusdis since they use different storage systems:
- Giscus: GitHub Discussions
- Cusdis: PostgreSQL database

Options:
- Start fresh with Cusdis
- Manually copy important comments
- Run both systems temporarily (not recommended)

### 2. Remove Giscus Configuration

The migration has already removed all Giscus-related code. If you need to reference the old setup:

```bash
# Old Giscus variables (no longer needed)
# NEXT_PUBLIC_GISCUS_REPO=
# NEXT_PUBLIC_GISCUS_REPO_ID=
# NEXT_PUBLIC_GISCUS_CATEGORY=
# NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

---

## Additional Resources

### Official Documentation
- [Cusdis Documentation](https://cusdis.com/doc)
- [Cusdis GitHub Repository](https://github.com/djyde/cusdis)
- [Self-Hosting Guide](https://cusdis.com/doc#/self-host)

### Support
- [Cusdis Discord](https://discord.gg/cV4kyPh)
- [GitHub Issues](https://github.com/djyde/cusdis/issues)

### Alternatives to Consider
- [Giscus](https://giscus.app/) - GitHub Discussions based
- [Utterances](https://utteranc.es/) - GitHub Issues based
- [Commento](https://commento.io/) - Privacy-focused alternative
- [Hyvor Talk](https://talk.hyvor.com/) - Feature-rich commercial option

---

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different App IDs** for development and production
3. **Enable moderation** to prevent spam
4. **Set up email notifications** to catch inappropriate comments
5. **Regular backups** if self-hosting
6. **Keep Cusdis updated** if self-hosting

---

## Support

If you need help:

1. Check this guide first
2. Review the [Cusdis documentation](https://cusdis.com/doc)
3. Search [GitHub issues](https://github.com/djyde/cusdis/issues)
4. Ask in [Cusdis Discord](https://discord.gg/cV4kyPh)

For issues specific to this blog implementation:
- Check the component code: `components/blog/comments.tsx`
- Review environment configuration: `.env.local` and `.env.example`

---

**Last Updated**: 2025-11-10
**Cusdis Version Compatibility**: v2.x
