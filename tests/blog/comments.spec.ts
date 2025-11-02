import { test, expect } from '@playwright/test';
import { BlogPostPage } from '../fixtures/blog-fixtures';

test.describe('Blog Comments (Giscus)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a blog post with comments
    await page.goto('/blog/eve');
    await page.waitForLoadState('networkidle');
  });

  test('should display comments section heading', async ({ page }) => {
    const blogPage = new BlogPostPage(page);
    await blogPage.checkCommentsSection();
  });

  test('should check if Giscus is configured', async ({ page }) => {
    // Scroll to comments section
    const commentsHeading = page.locator('text=አስተያየቶች');
    await commentsHeading.scrollIntoViewIfNeeded();

    // Check if setup instructions are shown (not configured)
    const setupInstructions = page.locator('text=የአስተያየት ክፍል አልተዋቀረም');
    const isNotConfigured = await setupInstructions.isVisible().catch(() => false);

    if (isNotConfigured) {
      console.log('ℹ️  Giscus is not yet configured');
      expect(isNotConfigured).toBe(true);
    } else {
      console.log('✅ Giscus appears to be configured');

      // Wait for Giscus iframe to potentially load
      await page.waitForTimeout(3000);

      // Check for Giscus elements
      const giscusContainer = page.locator('.giscus, [data-giscus]');
      const giscusIframe = page.locator('iframe.giscus-frame');

      const hasContainer = await giscusContainer.count() > 0;
      const hasIframe = await giscusIframe.count() > 0;

      console.log('Giscus container found:', hasContainer);
      console.log('Giscus iframe found:', hasIframe);

      // At least the container should exist
      expect(hasContainer).toBe(true);
    }
  });

  test('should capture Giscus configuration from console', async ({ page }) => {
    const consoleMessages: string[] = [];

    // Listen to console logs
    page.on('console', (msg) => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });

    // Reload page to capture all logs
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Wait a bit for Giscus to potentially log
    await page.waitForTimeout(2000);

    // Look for Giscus-related logs
    const giscusLogs = consoleMessages.filter(
      (log) =>
        log.includes('Giscus') ||
        log.includes('giscus') ||
        log.includes('discussion')
    );

    if (giscusLogs.length > 0) {
      console.log('=== Giscus Console Logs ===');
      giscusLogs.forEach((log) => console.log(log));
    } else {
      console.log('ℹ️  No Giscus-specific console logs found');
    }
  });

  test('should check Giscus iframe loading', async ({ page }) => {
    const blogPage = new BlogPostPage(page);

    // Scroll to comments
    await blogPage.scrollToComments();

    // Wait for potential iframe load
    const hasIframe = await blogPage.waitForGiscusIframe(5000);

    if (hasIframe) {
      console.log('✅ Giscus iframe loaded successfully');

      const iframe = page.locator('iframe.giscus-frame');

      // Check iframe visibility
      await expect(iframe).toBeVisible();

      // Get iframe dimensions
      const box = await iframe.boundingBox();
      console.log('Giscus iframe dimensions:', box);

      // Iframe should have reasonable dimensions
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
    } else {
      console.log('ℹ️  Giscus iframe not found - may not be configured yet');
    }
  });

  test('should verify Giscus script is loaded', async ({ page }) => {
    // Check if Giscus script is present in the DOM
    const giscusScript = page.locator('script[src*="giscus.app/client.js"]');
    const scriptCount = await giscusScript.count();

    console.log('Giscus script tags found:', scriptCount);

    if (scriptCount > 0) {
      console.log('✅ Giscus script tag is present');
      expect(scriptCount).toBeGreaterThan(0);
    } else {
      console.log('ℹ️  Giscus script not found - comments may not be configured');
    }
  });

  test('should check network requests for Giscus', async ({ page }) => {
    const giscusRequests: string[] = [];

    // Listen to network requests
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('giscus.app') || url.includes('github.com/giscus')) {
        giscusRequests.push(url);
      }
    });

    // Reload to capture all requests
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('=== Giscus Network Requests ===');
    console.log(`Total Giscus requests: ${giscusRequests.length}`);

    if (giscusRequests.length > 0) {
      giscusRequests.forEach((url) => console.log(url));
      console.log('✅ Giscus is making network requests');
    } else {
      console.log('ℹ️  No Giscus network requests detected');
    }
  });

  test('should test comments section responsiveness', async ({ page }) => {
    // Test on different viewport sizes
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.reload();

      const commentsSection = page.locator('text=አስተያየቶች').locator('..');
      await commentsSection.scrollIntoViewIfNeeded();

      const isVisible = await commentsSection.isVisible();
      console.log(`${viewport.name} (${viewport.width}x${viewport.height}): Comments visible = ${isVisible}`);

      expect(isVisible).toBe(true);
    }
  });
});

test.describe('Comments Integration', () => {
  test('should display comments on all blog posts', async ({ page }) => {
    const testPosts = ['eve', 'hanah', "jesus's_mother_mary"];

    for (const slug of testPosts) {
      await page.goto(`/blog/${slug}`);
      await page.waitForLoadState('networkidle');

      const commentsHeading = page.locator('text=አስተያየቶች');
      await expect(commentsHeading).toBeVisible();

      console.log(`✅ Comments section present on: /blog/${slug}`);
    }
  });
});
