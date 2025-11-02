import { test, expect } from '@playwright/test';

test.describe('Giscus Simple Debug', () => {
  test('Debug Giscus loading step by step', async ({ page }) => {
    console.log('=== Step 1: Navigate to blog post ===');
    await page.goto('/blog/eve');
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded');

    // Take a screenshot
    await page.screenshot({ path: 'test-results/01-page-loaded.png', fullPage: true });
    console.log('📸 Screenshot saved: 01-page-loaded.png');

    console.log('\n=== Step 2: Find comments section ===');
    const commentsHeading = page.getByRole('heading', { name: 'አስተያየቶች' });
    const headingExists = await commentsHeading.count();
    console.log(`Comments heading found: ${headingExists > 0 ? 'YES ✅' : 'NO ❌'}`);

    if (headingExists > 0) {
      await commentsHeading.scrollIntoViewIfNeeded();
      console.log('✅ Scrolled to comments section');
      await page.screenshot({ path: 'test-results/02-comments-section.png' });
      console.log('📸 Screenshot saved: 02-comments-section.png');
    }

    console.log('\n=== Step 3: Check for "not configured" message ===');
    const notConfiguredMsg = page.locator('text=የአስተያየት ክፍል አልተዋቀረም');
    const isNotConfigured = await notConfiguredMsg.isVisible().catch(() => false);
    console.log(`"Not configured" message visible: ${isNotConfigured ? 'YES ⚠️' : 'NO'}`);

    if (isNotConfigured) {
      console.log('\n⚠️  GISCUS IS NOT CONFIGURED YET');
      console.log('This is expected if you haven\'t set up Giscus environment variables');
      await page.screenshot({ path: 'test-results/03-not-configured.png' });
      console.log('📸 Screenshot saved: 03-not-configured.png');
    }

    console.log('\n=== Step 4: Check for Giscus script ===');
    const giscusScript = page.locator('script[src*="giscus.app/client.js"]');
    const scriptCount = await giscusScript.count();
    console.log(`Giscus script tags: ${scriptCount}`);

    if (scriptCount > 0) {
      console.log('✅ Giscus script is loaded');
    } else {
      console.log('❌ Giscus script NOT found');
    }

    console.log('\n=== Step 5: Wait for Giscus iframe ===');
    console.log('Waiting 5 seconds for Giscus iframe to load...');
    await page.waitForTimeout(5000);

    const giscusIframe = page.locator('iframe.giscus-frame');
    const iframeCount = await giscusIframe.count();
    console.log(`Giscus iframe count: ${iframeCount}`);

    if (iframeCount > 0) {
      console.log('✅ Giscus iframe FOUND!');

      const iframe = giscusIframe.first();
      const isVisible = await iframe.isVisible();
      console.log(`Iframe visible: ${isVisible ? 'YES ✅' : 'NO ❌'}`);

      const box = await iframe.boundingBox();
      if (box) {
        console.log(`Iframe dimensions: ${Math.round(box.width)}x${Math.round(box.height)}px`);
        console.log(`Iframe position: x=${Math.round(box.x)}, y=${Math.round(box.y)}`);
      }

      await page.screenshot({ path: 'test-results/04-with-iframe.png', fullPage: true });
      console.log('📸 Screenshot saved: 04-with-iframe.png');
    } else {
      console.log('❌ Giscus iframe NOT found');
      await page.screenshot({ path: 'test-results/04-no-iframe.png', fullPage: true });
      console.log('📸 Screenshot saved: 04-no-iframe.png');
    }

    console.log('\n=== Step 6: Check Giscus container ===');
    const giscusContainer = page.locator('.giscus, [data-giscus], .giscus-container');
    const containerCount = await giscusContainer.count();
    console.log(`Giscus container elements: ${containerCount}`);

    if (containerCount > 0) {
      // Get the HTML of the container
      const containerHTML = await giscusContainer.first().innerHTML().catch(() => 'Could not read');
      console.log('Container content preview:', containerHTML.substring(0, 200));
    }

    console.log('\n=== Step 7: Check console logs ===');
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    });

    // Reload to capture console logs
    await page.reload();
    await page.waitForTimeout(3000);

    const giscusLogs = consoleLogs.filter(log =>
      log.toLowerCase().includes('giscus') ||
      log.toLowerCase().includes('comment')
    );

    if (giscusLogs.length > 0) {
      console.log('\n📋 Giscus-related console logs:');
      giscusLogs.forEach(log => console.log(log));
    } else {
      console.log('\nℹ️  No Giscus-related console logs found');
    }

    console.log('\n=== Step 8: Check environment variables in component ===');
    const envCheck = await page.evaluate(() => {
      return {
        hasGiscusScript: !!document.querySelector('script[src*="giscus.app"]'),
        hasGiscusContainer: !!document.querySelector('.giscus, [data-giscus]'),
        hasGiscusIframe: !!document.querySelector('iframe.giscus-frame'),
      };
    });

    console.log('\n🔍 DOM Check:');
    console.log(`  - Giscus script in DOM: ${envCheck.hasGiscusScript ? '✅' : '❌'}`);
    console.log(`  - Giscus container in DOM: ${envCheck.hasGiscusContainer ? '✅' : '❌'}`);
    console.log(`  - Giscus iframe in DOM: ${envCheck.hasGiscusIframe ? '✅' : '❌'}`);

    console.log('\n=== SUMMARY ===');
    if (isNotConfigured) {
      console.log('🔴 STATUS: Giscus is NOT configured');
      console.log('');
      console.log('TO FIX:');
      console.log('1. Create a GitHub repository for discussions');
      console.log('2. Enable Discussions in repository settings');
      console.log('3. Install Giscus app: https://github.com/apps/giscus');
      console.log('4. Get your Giscus config: https://giscus.app');
      console.log('5. Add environment variables to your .env.local file');
    } else if (iframeCount > 0) {
      console.log('🟢 STATUS: Giscus appears to be working!');
    } else {
      console.log('🟡 STATUS: Giscus partially configured - iframe not loading');
      console.log('');
      console.log('POSSIBLE ISSUES:');
      console.log('- Check environment variables are set correctly');
      console.log('- Verify repository has discussions enabled');
      console.log('- Check browser console for errors');
      console.log('- Verify Giscus app is installed on your repository');
    }

    console.log('\n📸 All screenshots saved to: test-results/');
    console.log('✅ Debug test complete!');
  });
});
