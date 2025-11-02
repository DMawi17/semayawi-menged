# Giscus Comments Setup Guide

This guide will help you configure the Giscus comments system for your blog.

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions. It's free, open-source, and integrates seamlessly with GitHub.

## Prerequisites

- A GitHub account
- A public GitHub repository (can be the same repo as your blog or a separate one)

## Setup Steps

### 1. Enable GitHub Discussions

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to the **Features** section
4. Check the box next to **Discussions**

### 2. Install the Giscus App

1. Visit [https://github.com/apps/giscus](https://github.com/apps/giscus)
2. Click **Install**
3. Select the repository where you enabled Discussions
4. Click **Install & Authorize**

### 3. Get Your Configuration

1. Visit [https://giscus.app](https://giscus.app)
2. Fill in the form with your repository information:
   - **Repository**: `username/repo-name` (e.g., `johndoe/my-blog`)
   - **Page ↔️ Discussions Mapping**: Choose "pathname" (recommended)
   - **Discussion Category**: Choose or create a category (e.g., "General" or "Comments")
   - **Features**: Enable reactions if desired
   - **Theme**: This is handled automatically by your blog

3. Scroll down to see the generated configuration script
4. Copy the following values from the script:
   - `data-repo` → This is your `NEXT_PUBLIC_GISCUS_REPO`
   - `data-repo-id` → This is your `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `data-category` → This is your `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `data-category-id` → This is your `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

### 4. Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Giscus configuration:
   ```env
   NEXT_PUBLIC_GISCUS_REPO=username/repo-name
   NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxxx
   NEXT_PUBLIC_GISCUS_CATEGORY=General
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxxx
   ```

3. Save the file

### 5. Restart Your Development Server

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

### 6. Test the Comments

1. Visit any blog post on your site
2. Scroll down to the comments section
3. You should now see the Giscus comments widget
4. Try posting a comment (you'll need to sign in with GitHub)

## Verification

After setup, you should see:
- ✅ A functional comment box at the bottom of each blog post
- ✅ Comments appear in your GitHub Discussions
- ✅ Theme automatically switches with your blog's dark/light mode

## Troubleshooting

### Comments Not Showing

1. **Check environment variables**: Make sure all four variables are set correctly in `.env.local`
2. **Restart dev server**: Environment variables require a server restart
3. **Check repository visibility**: Your repository must be public
4. **Verify Discussions**: Make sure Discussions are enabled in your repo settings
5. **Check browser console**: Look for any error messages

### Comments Loading Slowly

This is normal - Giscus loads the GitHub Discussions iframe, which can take a moment on first load.

### Wrong Theme

The theme should automatically match your blog's dark/light mode. If it doesn't:
1. Check that `next-themes` is working correctly
2. Clear your browser cache
3. Try toggling the theme manually

## Customization

You can customize the comments appearance by modifying the `GISCUS_CONFIG` object in `components/blog/comments.tsx`:

```typescript
const GISCUS_CONFIG = {
  // ... existing config
  reactionsEnabled: "1",  // Set to "0" to disable reactions
  inputPosition: "bottom", // Or "top" to move comment box to top
  lang: "en",             // Or "am" for Amharic (if supported)
};
```

## Benefits of Giscus

✅ **Free and open-source**
✅ **No database required** - comments stored in GitHub Discussions
✅ **Spam protection** - GitHub account required to comment
✅ **Markdown support** - Rich text formatting in comments
✅ **Reactions** - Emoji reactions on comments
✅ **Moderation** - Manage comments via GitHub Discussions
✅ **Privacy-friendly** - No tracking or ads

## Alternative: Disable Comments

If you don't want to use comments, you can remove the `<Comments />` component from `app/blog/[...slug]/page.tsx`.

## Need Help?

- **Giscus Documentation**: [https://github.com/giscus/giscus](https://github.com/giscus/giscus)
- **GitHub Discussions**: [https://docs.github.com/discussions](https://docs.github.com/discussions)

---

**Note**: The comments component will show helpful setup instructions on your blog until you configure the environment variables.
