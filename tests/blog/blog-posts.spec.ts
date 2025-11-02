import { test, expect } from '@playwright/test';
import { BlogPostPage, BlogAssertions, testBlogPosts } from '../fixtures/blog-fixtures';

test.describe('Blog Post Pages', () => {
  test.describe('Page Load and Structure', () => {
    test('should load homepage', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Semayawi Menged|ሰማያዊ ምንገድ/);
      await expect(page.locator('main')).toBeVisible();
    });

    test('should load blog list page', async ({ page }) => {
      await page.goto('/blog');
      await expect(page.locator('main')).toBeVisible();

      // Should have blog post cards or list items
      const blogPosts = page.locator('article, [data-testid="blog-post"]');
      await expect(blogPosts.first()).toBeVisible();
    });

    test('should load Eve blog post', async ({ page }) => {
      const blogPage = new BlogPostPage(page);
      await blogPage.goto('eve');

      await BlogAssertions.assertPageLoaded(page);
      await BlogAssertions.assertHasTitle(page);
      await BlogAssertions.assertHasContent(page);
    });

    test('should load Hannah blog post', async ({ page }) => {
      const blogPage = new BlogPostPage(page);
      await blogPage.goto('hanah');

      await BlogAssertions.assertPageLoaded(page);
      await BlogAssertions.assertHasTitle(page);
      await BlogAssertions.assertHasContent(page);
    });
  });

  test.describe('Navigation', () => {
    test('should navigate from blog list to post', async ({ page }) => {
      await page.goto('/blog');

      // Click on first blog post
      const firstPost = page.locator('a[href*="/blog/"]').first();
      await firstPost.click();

      // Should navigate to blog post
      await expect(page).toHaveURL(/\/blog\/.+/);
      await BlogAssertions.assertHasTitle(page);
    });

    test('should have working breadcrumb navigation', async ({ page }) => {
      await page.goto('/blog/eve');

      // Look for breadcrumb or back link
      const breadcrumb = page.locator('nav[aria-label*="breadcrumb"], a[href="/blog"]').first();
      if (await breadcrumb.isVisible()) {
        await breadcrumb.click();
        await expect(page).toHaveURL(/\/blog$/);
      }
    });
  });

  test.describe('Content Display', () => {
    test('should display blog post metadata', async ({ page }) => {
      await page.goto('/blog/eve');

      // Check for common metadata elements
      const metadataSelectors = [
        'time', // publish date
        '[data-testid="reading-time"]',
        '[data-testid="author"]',
      ];

      // At least one metadata element should be visible
      let metadataFound = false;
      for (const selector of metadataSelectors) {
        const element = page.locator(selector).first();
        if (await element.isVisible().catch(() => false)) {
          metadataFound = true;
          break;
        }
      }

      expect(metadataFound).toBeTruthy();
    });

    test('should display formatted content', async ({ page }) => {
      await page.goto('/blog/eve');

      // Check for prose content (likely using Tailwind prose class)
      const content = page.locator('article, .prose, [data-testid="blog-content"]');
      await expect(content.first()).toBeVisible();
    });

    test('should support Amharic text', async ({ page }) => {
      await page.goto('/blog/eve');

      // Get page content
      const content = await page.textContent('body');

      // Should contain Amharic characters (Unicode range: U+1200 to U+137F)
      const hasAmharic = /[\u1200-\u137F]/.test(content || '');
      expect(hasAmharic).toBeTruthy();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
      await page.goto('/blog/eve');

      await BlogAssertions.assertPageLoaded(page);
      await BlogAssertions.assertHasTitle(page);

      // Check if content is not overflowing
      const content = page.locator('article, .prose').first();
      const box = await content.boundingBox();
      expect(box?.width).toBeLessThanOrEqual(375);
    });

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
      await page.goto('/blog/eve');

      await BlogAssertions.assertPageLoaded(page);
      await BlogAssertions.assertHasTitle(page);
    });
  });

  test.describe('SEO and Accessibility', () => {
    test('should have proper page title', async ({ page }) => {
      await page.goto('/blog/eve');
      const title = await page.title();

      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    test('should have meta description', async ({ page }) => {
      await page.goto('/blog/eve');

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/blog/eve');

      // Should have exactly one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test('should have alt text for images', async ({ page }) => {
      await page.goto('/blog/eve');

      const images = page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        for (let i = 0; i < imageCount; i++) {
          const img = images.nth(i);
          const alt = await img.getAttribute('alt');
          // Alt can be empty string for decorative images, but should exist
          expect(alt).not.toBeNull();
        }
      }
    });
  });

  test.describe('Performance', () => {
    test('should load page within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/blog/eve');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });
});
