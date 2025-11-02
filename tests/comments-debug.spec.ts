import { test, expect } from '@playwright/test';

test.describe('Giscus Comments Debug', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a blog post
    await page.goto('http://localhost:3000/blog/eve');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display comments section', async ({ page }) => {
    // Scroll to comments section
    await page.locator('text=አስተያየቶች').scrollIntoViewIfNeeded();

    // Take screenshot of comments section
    await page.screenshot({
      path: 'tests/screenshots/comments-full.png',
      fullPage: false
    });

    console.log('Screenshot saved to tests/screenshots/comments-full.png');
  });

  test('should check Giscus configuration', async ({ page }) => {
    // Get console logs
    const logs: string[] = [];
    page.on('console', msg => {
      logs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Wait for Giscus config to be logged
    await page.waitForTimeout(2000);

    // Print all console logs
    console.log('=== Browser Console Logs ===');
    logs.forEach(log => console.log(log));

    // Check if Giscus config is logged
    const giscusConfigLog = logs.find(log => log.includes('Giscus Config:'));
    console.log('\n=== Giscus Config ===');
    console.log(giscusConfigLog || 'Config not found in logs');
  });

  test('should inspect comments DOM structure', async ({ page }) => {
    // Check if comments section exists
    const commentsSection = page.locator('text=አስተያየቶች').locator('..');
    await expect(commentsSection).toBeVisible();

    // Check for setup instructions (not configured)
    const setupInstructions = page.locator('text=የአስተያየት ክፍል አልተዋቀረም');
    const hasSetupInstructions = await setupInstructions.isVisible().catch(() => false);

    if (hasSetupInstructions) {
      console.log('❌ Comments NOT configured - showing setup instructions');
      await page.screenshot({
        path: 'tests/screenshots/comments-not-configured.png'
      });
    } else {
      console.log('✅ Comments configured - Giscus should be loading');

      // Check for Giscus iframe
      const giscusFrame = page.frameLocator('iframe.giscus-frame');
      const frameExists = await page.locator('iframe.giscus-frame').count();

      console.log(`Giscus iframe count: ${frameExists}`);

      if (frameExists > 0) {
        // Take screenshot of the iframe area
        await page.locator('iframe.giscus-frame').screenshot({
          path: 'tests/screenshots/giscus-iframe.png'
        });

        // Try to get iframe content
        const iframe = page.frameLocator('iframe.giscus-frame');
        await page.screenshot({
          path: 'tests/screenshots/comments-with-iframe.png'
        });

        console.log('✅ Giscus iframe found and screenshot taken');
      } else {
        console.log('❌ Giscus iframe NOT found');
        await page.screenshot({
          path: 'tests/screenshots/comments-no-iframe.png'
        });
      }
    }
  });

  test('should check environment variables', async ({ page }) => {
    // Navigate to page
    await page.goto('http://localhost:3000/blog/eve');

    // Inject script to check env vars from window
    const envVars = await page.evaluate(() => {
      return {
        // These are only available at build time in Next.js
        // But we can check if Giscus loaded
        giscusScriptExists: !!document.querySelector('script[src="https://giscus.app/client.js"]'),
        giscusContainerExists: !!document.querySelector('.giscus-container'),
        giscusIframeExists: !!document.querySelector('iframe.giscus-frame'),
      };
    });

    console.log('=== Giscus Elements Check ===');
    console.log('Giscus script loaded:', envVars.giscusScriptExists);
    console.log('Giscus container exists:', envVars.giscusContainerExists);
    console.log('Giscus iframe exists:', envVars.giscusIframeExists);
  });

  test('should test iframe interaction', async ({ page }) => {
    await page.goto('http://localhost:3000/blog/eve');
    await page.waitForLoadState('networkidle');

    // Wait a bit for Giscus to load
    await page.waitForTimeout(3000);

    const iframeCount = await page.locator('iframe.giscus-frame').count();

    if (iframeCount > 0) {
      console.log('✅ Giscus iframe exists');

      // Get iframe bounding box
      const iframe = page.locator('iframe.giscus-frame');
      const box = await iframe.boundingBox();

      if (box) {
        console.log('Iframe position:', box);
        console.log('Iframe is visible:', await iframe.isVisible());

        // Try to click in the center of iframe
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        console.log('✅ Clicked on iframe area');

        // Take screenshot after click
        await page.screenshot({
          path: 'tests/screenshots/after-iframe-click.png'
        });
      }
    } else {
      console.log('❌ No Giscus iframe found');
    }
  });
});
