# 🚀 Resend Setup Guide

**Project**: Semayawi Menged v2 Newsletter
**Service**: Resend (Free Tier - 3,000 emails/month)
**Date**: 2025-11-03

---

## 🚀 Resend Setup Guide

### Step 1: Sign Up for Resend (Free)

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" (or "Get Started")
3. Create your account (you can use GitHub, Google, or email)
4. **Free tier includes: 3,000 emails/month, 100 emails/day**

---

### Step 2: Get Your API Key

Once you're logged in:

1. Go to your Resend Dashboard
2. Click on **"API Keys"** in the left sidebar
3. Click **"Create API Key"**
4. Give it a name (e.g., "Semayawi Menged Newsletter")
5. Select permissions: **"Sending access"**
6. Click **"Create"**
7. **Copy the API key** (it starts with `re_`) - you'll only see it once!

---

### Step 3: Configure Your Local Environment

In your project directory:

```bash
# If you don't have .env.local, create it
cp .env.example .env.local
```

Now open `.env.local` and add your keys:

```bash
# Your site URL (use your actual domain in production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Paste your Resend API key here
RESEND_API_KEY=re_your_actual_key_here_that_you_copied
```

**Important**: Don't commit `.env.local` to git (it's already in .gitignore)

---

### Step 4: Update the Sender Email

The default sender is `onboarding@resend.dev` which works for testing, but for production you should use your own domain.

**Option A: For Testing (Use Now)**

- Keep the default: `onboarding@resend.dev`
- This works immediately, no setup needed
- Good for testing the functionality

**Option B: For Production (Recommended)**

1. **Verify Your Domain in Resend:**
   - In Resend Dashboard, go to **"Domains"**
   - Click **"Add Domain"**
   - Enter your domain (e.g., `semayawmenged.com`)
   - Follow the DNS instructions (add TXT, MX, and CNAME records)
   - Wait for verification (usually 5-15 minutes)

2. **Update the Sender Email in Code:**

   Open: `/app/api/newsletter/route.ts` around line 77

   Change this:

   ```typescript
   from: `${siteConfig.name} <onboarding@resend.dev>`,
   ```

   To this (use your actual email):

   ```typescript
   from: `${siteConfig.name} <newsletter@your-domain.com>`,
   ```

---

### Step 5: Test Locally

1. **Start your dev server:**

   ```bash
   npm run dev
   ```

2. **Navigate to a blog post:**

   ```
   http://localhost:3000/blog/[any-post]
   ```

3. **Scroll down to the newsletter section**

4. **Enter YOUR email and click "ይመዝገቡ" (Subscribe)**

5. **Check your inbox!** You should receive a beautiful bilingual welcome email

---

### Step 6: Deploy to Vercel

When you're ready to deploy:

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "feat: Add newsletter with Resend integration"
   git push origin main
   ```

2. **In Vercel Dashboard:**
   - Go to your project settings
   - Click **"Environment Variables"**
   - Add these variables:
     - `NEXT_PUBLIC_SITE_URL` = `https://your-actual-domain.com`
     - `RESEND_API_KEY` = `re_your_actual_key`

3. **Redeploy** (Vercel will auto-deploy on push, or manually trigger)

---

### 🧪 Testing Checklist

- [ ] API key added to `.env.local`
- [ ] Dev server running (`npm run dev`)
- [ ] Navigate to a blog post
- [ ] Find newsletter form at bottom
- [ ] Subscribe with your email
- [ ] Check inbox for welcome email
- [ ] Verify email looks good (bilingual Amharic/English)
- [ ] Test subscribing again with same email (should say "already subscribed")
- [ ] Try 4+ subscriptions in 1 minute (should hit rate limit)

---

### 📧 What the Welcome Email Looks Like

Your subscribers will receive a beautiful HTML email with:

- **Bilingual content** (Amharic & English)
- **Professional design** with gradient header
- **Clear expectations** about what they'll receive
- **Call-to-action button** to read the blog
- **Your branding** (Semayawi Menged name and colors)

---

### 🔍 Monitoring & Analytics

In your Resend Dashboard you can see:

- **Emails sent** (daily/monthly counts)
- **Delivery status** (sent, delivered, bounced, etc.)
- **Send history** with timestamps
- **API usage** and rate limits

---

### ⚠️ Important Notes

1. **Rate Limits (Built-in):**
   - 3 requests per minute per IP
   - Prevents spam/abuse
   - Adjust in `/app/api/newsletter/route.ts` if needed

2. **Duplicate Prevention:**
   - Currently uses in-memory storage (resets on server restart)
   - For production, consider a database (MongoDB, PostgreSQL)
   - Or use Resend's audience management features

3. **Free Tier Limits:**
   - 3,000 emails/month
   - 100 emails/day
   - Upgrade when you need more

4. **Email Best Practices:**
   - Always include unsubscribe link (future enhancement)
   - Keep emails under 102KB
   - Test in multiple email clients

---

### 🆘 Troubleshooting

**Problem: "Newsletter service not configured" error**

- **Solution**: Check that `RESEND_API_KEY` is in `.env.local`
- Restart dev server after adding env variables

**Problem: Email not received**

- **Solution**: Check spam/junk folder
- Verify API key is correct
- Check Resend dashboard for send status

**Problem: "Failed to send email" error**

- **Solution**: Check Resend dashboard for error details
- Verify sender email is verified (if using custom domain)
- Check API key permissions

**Problem: Rate limit hit**

- **Solution**: This is normal! Wait 1 minute and try again
- Adjust rate limit in `/app/api/newsletter/route.ts` if needed

**Problem: Duplicate subscriber message appearing incorrectly**

- **Solution**: This is in-memory storage, resets on restart
- For production, implement database storage or use Resend Audiences

---

### 🎯 Next Steps After Setup

1. ✅ Test locally with your email
2. ✅ Verify email delivery and design
3. ✅ Deploy to Vercel with environment variables
4. ✅ Test in production
5. 📈 Monitor subscriber growth in Resend dashboard
6. 📧 Plan your newsletter content strategy!

---

### 📋 Quick Reference

**Files Modified for Newsletter:**

- `/app/api/newsletter/route.ts` - API endpoint (line 77 for sender email)
- `/lib/email-templates.ts` - Email templates (customize if needed)
- `/components/blog/newsletter.tsx` - Newsletter form (already integrated)
- `.env.local` - Environment variables (NOT committed to git)

**Environment Variables Needed:**

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production domain
RESEND_API_KEY=re_xxxxxxxxxxxxx  # from Resend dashboard
```

**API Endpoint:**

- Local: `http://localhost:3000/api/newsletter`
- Production: `https://your-domain.com/api/newsletter`

**Resend Dashboard Links:**

- Main Dashboard: <https://resend.com/home>
- API Keys: <https://resend.com/api-keys>
- Domains: <https://resend.com/domains>
- Emails Log: <https://resend.com/emails>

---

### 💡 Tips for Success

1. **Start with Testing Email:**
   - Use `onboarding@resend.dev` sender
   - Test with your personal email first
   - Verify email arrives and looks good

2. **Before Production:**
   - Verify your custom domain
   - Update sender email in code
   - Test from production environment
   - Check spam score (Resend provides this)

3. **Growing Your List:**
   - Mention newsletter in blog posts
   - Add signup in sidebar/header (future)
   - Share newsletter benefits clearly
   - Keep content valuable and regular

4. **Staying Under Free Tier:**
   - 3,000 emails/month = ~100 subscribers with weekly emails
   - Monitor usage in Resend dashboard
   - Upgrade when needed (paid plans start at $20/mo)

---

### 🎨 Customizing the Welcome Email

The email template is in `/lib/email-templates.ts`. You can customize:

- **Header gradient colors** (line 25-26)
- **Email content** (line 49-63)
- **Call-to-action button text** (line 67-69)
- **Footer text** (line 76-85)

The template is fully responsive and works in all major email clients!

---

### 📚 Additional Resources

- **Resend Documentation**: <https://resend.com/docs>
- **Next.js Route Handlers**: <https://nextjs.org/docs/app/building-your-application/routing/route-handlers>
- **Email Best Practices**: <https://resend.com/docs/knowledge-base/best-practices>

---

**Setup Complete?** 🎉

Once you've completed all steps:

1. ✅ Resend account created
2. ✅ API key added to `.env.local`
3. ✅ Test email received successfully
4. ✅ Ready to deploy to production

**Questions?** Check the troubleshooting section above or the Resend documentation!

---

**Document Created**: 2025-11-03
**Status**: Ready for setup
**Estimated Setup Time**: 15-20 minutes
