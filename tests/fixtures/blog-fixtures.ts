import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  // Add custom fixtures here if needed
});

export { expect };

/**
 * Test data for blog posts
 */
export const testBlogPosts = {
  eve: {
    slug: 'eve',
    url: '/blog/eve',
    expectedTitle: 'ሔዋን',
  },
  hannah: {
    slug: 'hanah',
    url: '/blog/hanah',
    expectedTitle: 'ሐና',
  },
  mary: {
    slug: "jesus's_mother_mary",
    url: "/blog/jesus's_mother_mary",
    expectedTitle: 'ማርያም (የኢየሱስ እናት)',
  },
  miriam: {
    slug: "Moses's_Sister_Miriam",
    url: "/blog/Moses's_Sister_Miriam",
    expectedTitle: 'ሚርያም (የሙሴ እህት)',
  },
};

/**
 * Common page object helpers
 */
export class BlogPostPage {
  constructor(private page: any) {}

  async goto(slug: string) {
    await this.page.goto(`/blog/${slug}`);
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle() {
    return this.page.locator('h1').first().textContent();
  }

  async scrollToComments() {
    const commentsHeading = this.page.locator('text=አስተያየቶች');
    await commentsHeading.scrollIntoViewIfNeeded();
    return commentsHeading;
  }

  async checkCommentsSection() {
    const commentsHeading = await this.scrollToComments();
    await expect(commentsHeading).toBeVisible();
  }

  async waitForGiscusIframe(timeout = 5000) {
    try {
      await this.page.waitForSelector('iframe.giscus-frame', { timeout });
      return true;
    } catch {
      return false;
    }
  }

  async getGiscusIframeCount() {
    return this.page.locator('iframe.giscus-frame').count();
  }
}

/**
 * Common assertions for blog pages
 */
export class BlogAssertions {
  static async assertPageLoaded(page: any) {
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.locator('main')).toBeVisible();
  }

  static async assertHasTitle(page: any) {
    const title = page.locator('h1').first();
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
  }

  static async assertHasContent(page: any) {
    const content = page.locator('article, .prose');
    await expect(content).toBeVisible();
  }

  static async assertCommentsConfigured(page: any) {
    const setupInstructions = page.locator('text=የአስተያየት ክፍል አልተዋቀረም');
    await expect(setupInstructions).not.toBeVisible();
  }
}
