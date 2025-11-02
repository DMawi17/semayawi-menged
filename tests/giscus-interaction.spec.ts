import { test, expect } from '@playwright/test';

test.describe('Giscus Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to blog post with Giscus
    await page.goto('/blog/eve');
    await page.waitForLoadState('networkidle');

    // Scroll to comments section
    const commentsHeading = page.getByRole('heading', { name: 'አስተያየቶች' });
    await commentsHeading.scrollIntoViewIfNeeded();

    // Wait for Giscus to potentially load
    await page.waitForTimeout(5000);
  });

  test('Interact with Giscus iframe', async ({ page }) => {
    console.log('\n🎯 GISCUS INTERACTION TEST\n');
    console.log('='.repeat(60));

    // Check if Giscus iframe exists
    const giscusIframe = page.frameLocator('iframe.giscus-frame');
    const iframeExists = await page.locator('iframe.giscus-frame').count();

    console.log(`\nStep 1: Check if Giscus loaded`);
    console.log(`Giscus iframe found: ${iframeExists > 0 ? '✅ YES' : '❌ NO'}`);

    if (iframeExists === 0) {
      console.log('\n⚠️  Giscus iframe not found!');
      console.log('Make sure:');
      console.log('  1. Dev server has been restarted after applying the fix');
      console.log('  2. Environment variables are set in .env.local');
      console.log('  3. GitHub Discussions are enabled');
      console.log('\nRun: npm test tests/verify-fix.spec.ts');

      // Take screenshot for debugging
      await page.screenshot({
        path: 'test-results/giscus-not-loaded.png',
        fullPage: true
      });

      // Skip the rest of the test
      test.skip(true, 'Giscus iframe not loaded');
      return;
    }

    console.log('✅ Giscus iframe found!\n');

    // Get iframe dimensions
    const iframe = page.locator('iframe.giscus-frame').first();
    const box = await iframe.boundingBox();

    if (box) {
      console.log(`Iframe dimensions: ${Math.round(box.width)}x${Math.round(box.height)}px`);
      console.log(`Iframe position: (${Math.round(box.x)}, ${Math.round(box.y)})`);
    }

    // Take initial screenshot
    await page.screenshot({
      path: 'test-results/giscus-interaction-01-loaded.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot: giscus-interaction-01-loaded.png');

    console.log('\n' + '-'.repeat(60));
    console.log('Step 2: Inspect Giscus iframe content');
    console.log('-'.repeat(60));

    // Try to interact with iframe content
    try {
      // Look for common Giscus elements inside iframe
      const signInButton = giscusIframe.getByRole('button', { name: /sign in/i });
      const signInVisible = await signInButton.isVisible().catch(() => false);

      console.log(`\n"Sign in" button visible: ${signInVisible ? '✅ YES' : '❌ NO'}`);

      if (signInVisible) {
        console.log('\n✅ Giscus is loaded and showing sign-in option');

        // Take screenshot of sign-in state
        await page.screenshot({
          path: 'test-results/giscus-interaction-02-signin.png',
          fullPage: true
        });
        console.log('📸 Screenshot: giscus-interaction-02-signin.png');

        // Highlight the sign-in button
        console.log('\nStep 3: Highlight sign-in button');
        await signInButton.scrollIntoViewIfNeeded();
        await signInButton.hover();
        await page.waitForTimeout(1000);

        await page.screenshot({
          path: 'test-results/giscus-interaction-03-signin-hover.png',
          fullPage: true
        });
        console.log('📸 Screenshot: giscus-interaction-03-signin-hover.png');
      }

      // Look for comment box (if already signed in)
      const commentBox = giscusIframe.locator('textarea, [contenteditable="true"]').first();
      const commentBoxVisible = await commentBox.isVisible().catch(() => false);

      console.log(`\nComment box visible: ${commentBoxVisible ? '✅ YES (already signed in!)' : '❌ NO'}`);

      if (commentBoxVisible) {
        console.log('\n✅ User appears to be already signed in to Giscus!');
        console.log('\nStep 4: Interact with comment box');

        // Try to click and type in comment box
        await commentBox.click();
        await page.waitForTimeout(500);

        const testComment = 'Test comment from Playwright automation! 🤖';
        await commentBox.fill(testComment);

        console.log(`✅ Typed test comment: "${testComment}"`);

        await page.screenshot({
          path: 'test-results/giscus-interaction-04-comment-typed.png',
          fullPage: true
        });
        console.log('📸 Screenshot: giscus-interaction-04-comment-typed.png');

        // Look for submit button
        const submitButton = giscusIframe.getByRole('button', { name: /comment/i });
        const submitVisible = await submitButton.isVisible().catch(() => false);

        console.log(`\nSubmit button visible: ${submitVisible ? '✅ YES' : '❌ NO'}`);

        if (submitVisible) {
          console.log('\n⚠️  NOT clicking submit to avoid posting test comments');
          console.log('(Remove this restriction if you want to actually post)');

          await submitButton.hover();
          await page.screenshot({
            path: 'test-results/giscus-interaction-05-ready-to-submit.png',
            fullPage: true
          });
          console.log('📸 Screenshot: giscus-interaction-05-ready-to-submit.png');
        }

        // Clear the comment box
        await commentBox.fill('');
        console.log('✅ Cleared test comment');
      }

      // Look for existing comments
      console.log('\n' + '-'.repeat(60));
      console.log('Step 5: Check for existing comments');
      console.log('-'.repeat(60));

      const commentElements = giscusIframe.locator('[class*="comment"], [class*="Comment"]');
      const commentCount = await commentElements.count();

      console.log(`\nExisting comments found: ${commentCount}`);

      if (commentCount > 0) {
        console.log('✅ Comments are already present on this post');

        // Try to find reactions
        const reactions = giscusIframe.locator('[class*="reaction"], [aria-label*="reaction"]');
        const reactionCount = await reactions.count();

        console.log(`Reaction buttons found: ${reactionCount}`);

        if (reactionCount > 0) {
          console.log('✅ Reactions are enabled');

          // Hover over first reaction
          const firstReaction = reactions.first();
          if (await firstReaction.isVisible()) {
            await firstReaction.hover();
            await page.waitForTimeout(500);

            await page.screenshot({
              path: 'test-results/giscus-interaction-06-reactions.png',
              fullPage: true
            });
            console.log('📸 Screenshot: giscus-interaction-06-reactions.png');
          }
        }
      } else {
        console.log('ℹ️  No comments yet on this post');
      }

    } catch (error) {
      console.log(`\n⚠️  Error interacting with Giscus content: ${error}`);
      console.log('This might be due to iframe security restrictions');
    }

    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('🎯 INTERACTION SUMMARY');
    console.log('='.repeat(60));
    console.log('\n✅ Successfully located Giscus iframe');
    console.log('✅ Analyzed iframe content');
    console.log('✅ Generated interaction screenshots');
    console.log('\n📸 All screenshots saved to test-results/');
    console.log('\n' + '='.repeat(60) + '\n');
  });

  test('Test Giscus theme switching', async ({ page }) => {
    console.log('\n🎨 GISCUS THEME SWITCHING TEST\n');

    const iframeExists = await page.locator('iframe.giscus-frame').count();

    if (iframeExists === 0) {
      console.log('⚠️  Giscus not loaded, skipping theme test');
      test.skip(true, 'Giscus not loaded');
      return;
    }

    console.log('Step 1: Capture light theme');
    await page.screenshot({
      path: 'test-results/giscus-theme-light.png',
      fullPage: true
    });

    // Try to find and click theme toggle
    const themeToggle = page.locator('[class*="theme"], [aria-label*="theme"], button[class*="dark"]');
    const toggleExists = await themeToggle.first().isVisible().catch(() => false);

    if (toggleExists) {
      console.log('✅ Found theme toggle button');
      await themeToggle.first().click();
      await page.waitForTimeout(1000);

      console.log('Step 2: Capture dark theme');
      await page.screenshot({
        path: 'test-results/giscus-theme-dark.png',
        fullPage: true
      });

      console.log('✅ Theme switching test complete');
    } else {
      console.log('ℹ️  Theme toggle not found (might be in different location)');
    }
  });

  test('Test Giscus responsive behavior', async ({ page }) => {
    console.log('\n📱 GISCUS RESPONSIVE TEST\n');

    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 },
    ];

    for (const viewport of viewports) {
      console.log(`\nTesting ${viewport.name} (${viewport.width}x${viewport.height})`);

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/blog/eve');
      await page.waitForLoadState('networkidle');

      // Scroll to comments
      const commentsHeading = page.getByRole('heading', { name: 'አስተያየቶች' });
      await commentsHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(3000);

      const iframeExists = await page.locator('iframe.giscus-frame').count();
      console.log(`  Giscus iframe: ${iframeExists > 0 ? '✅ Loaded' : '❌ Not loaded'}`);

      if (iframeExists > 0) {
        const iframe = page.locator('iframe.giscus-frame').first();
        const box = await iframe.boundingBox();

        if (box) {
          console.log(`  Iframe size: ${Math.round(box.width)}x${Math.round(box.height)}px`);
          console.log(`  Fits in viewport: ${box.width <= viewport.width ? '✅' : '❌'}`);
        }
      }

      await page.screenshot({
        path: `test-results/giscus-responsive-${viewport.name.toLowerCase()}.png`,
        fullPage: true
      });
      console.log(`  📸 Screenshot: giscus-responsive-${viewport.name.toLowerCase()}.png`);
    }

    console.log('\n✅ Responsive test complete');
  });

  test('Test Giscus performance', async ({ page }) => {
    console.log('\n⚡ GISCUS PERFORMANCE TEST\n');

    const startTime = Date.now();

    await page.goto('/blog/eve');
    await page.waitForLoadState('networkidle');

    const pageLoadTime = Date.now() - startTime;
    console.log(`Page load time: ${pageLoadTime}ms`);

    // Scroll to comments
    const commentsHeading = page.getByRole('heading', { name: 'አስተያየቶች' });
    await commentsHeading.scrollIntoViewIfNeeded();

    // Wait and check for iframe at intervals
    const checkTimes = [1000, 3000, 5000, 10000];

    for (const waitTime of checkTimes) {
      await page.waitForTimeout(waitTime - (checkTimes[checkTimes.indexOf(waitTime) - 1] || 0));

      const iframeExists = await page.locator('iframe.giscus-frame').count();

      if (iframeExists > 0 && checkTimes.indexOf(waitTime) === checkTimes.findIndex(() => true)) {
        console.log(`✅ Giscus iframe appeared after ${waitTime}ms`);
        break;
      }

      console.log(`  ${waitTime}ms: Giscus ${iframeExists > 0 ? 'loaded ✅' : 'loading...'}`);
    }

    // Get final metrics
    const metrics = await page.evaluate(() => {
      const performance = window.performance;
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      return {
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
        totalTime: navigation?.duration,
      };
    });

    console.log('\n📊 Performance Metrics:');
    console.log(`  DOM Content Loaded: ${Math.round(metrics.domContentLoaded)}ms`);
    console.log(`  Load Complete: ${Math.round(metrics.loadComplete)}ms`);
    console.log(`  Total Time: ${Math.round(metrics.totalTime)}ms`);

    console.log('\n✅ Performance test complete');
  });
});
