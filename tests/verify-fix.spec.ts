import { test, expect } from '@playwright/test';

test.describe('Verify Giscus Fix', () => {
  test('Should load Giscus successfully after fix', async ({ page }) => {
    console.log('\n🧪 VERIFYING GISCUS FIX\n');
    console.log('='.repeat(60));

    // Navigate to blog post
    console.log('\nStep 1: Navigate to blog post...');
    await page.goto('/blog/eve');
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded');

    // Wait for React to hydrate
    await page.waitForTimeout(2000);

    // Check console for config
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.text().includes('Giscus Config')) {
        consoleLogs.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForTimeout(1000);

    console.log('\nStep 2: Check configuration...');
    if (consoleLogs.length > 0) {
      console.log('Giscus Config found:', consoleLogs[0]);
    }

    // Scroll to comments
    console.log('\nStep 3: Scroll to comments section...');
    const commentsHeading = page.getByRole('heading', { name: 'አስተያየቶች' });
    await commentsHeading.scrollIntoViewIfNeeded();
    console.log('✅ Scrolled to comments');

    // Check if "not configured" message is visible
    const notConfigured = await page.locator('text=የአስተያየት ክፍል አልተዋቀረም').isVisible().catch(() => false);
    console.log(`\n"Not configured" message visible: ${notConfigured ? '❌ YES (Fix not working yet)' : '✅ NO (Good!)'}`);

    // Wait for Giscus to potentially load
    console.log('\nStep 4: Waiting 8 seconds for Giscus to load...');
    await page.waitForTimeout(8000);

    // Check for Giscus elements
    const giscusCheck = await page.evaluate(() => {
      return {
        hasScript: !!document.querySelector('script[src*="giscus.app"]'),
        hasIframe: !!document.querySelector('iframe.giscus-frame'),
        iframeCount: document.querySelectorAll('iframe.giscus-frame').length,
        containerEmpty: document.querySelector('.giscus-container')?.childNodes.length === 0,
      };
    });

    console.log('\n📊 Giscus Status:');
    console.log(`   Script in DOM: ${giscusCheck.hasScript ? '✅ YES' : '❌ NO'}`);
    console.log(`   Iframe loaded: ${giscusCheck.hasIframe ? '✅ YES' : '❌ NO'}`);
    console.log(`   Iframe count: ${giscusCheck.iframeCount}`);
    console.log(`   Container empty: ${giscusCheck.containerEmpty ? '❌ YES' : '✅ NO'}`);

    // Take screenshot
    await page.screenshot({
      path: 'test-results/verify-fix-result.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot saved: verify-fix-result.png');

    // Final verdict
    console.log('\n' + '='.repeat(60));
    console.log('🎯 VERDICT');
    console.log('='.repeat(60));

    if (giscusCheck.hasIframe) {
      console.log('\n🎉 SUCCESS! Giscus is now loading correctly!');
      console.log('✅ The fix is working');
      console.log('✅ Script was injected into DOM');
      console.log('✅ Iframe loaded successfully');
      console.log('\n✨ You can now:');
      console.log('   - View comments on blog posts');
      console.log('   - Sign in with GitHub to comment');
      console.log('   - Enable reactions and discussions');
    } else if (giscusCheck.hasScript && !giscusCheck.hasIframe) {
      console.log('\n⏳ PARTIAL SUCCESS');
      console.log('✅ Script was injected (fix is working!)');
      console.log('⚠️  But iframe has not loaded yet');
      console.log('\nPossible reasons:');
      console.log('   - Network delay');
      console.log('   - Giscus app not fully configured on GitHub');
      console.log('   - Repository discussions not enabled');
      console.log('\n💡 Check:');
      console.log('   - https://github.com/DMawi17/semayawi-menged');
      console.log('   - Settings → General → Features → Discussions (enabled?)');
      console.log('   - https://github.com/apps/giscus (installed?)');
    } else {
      console.log('\n❌ FIX NOT APPLIED YET');
      console.log('\n⚠️  The dev server may still be serving cached code.');
      console.log('\n💡 To fix:');
      console.log('   1. Stop the dev server (Ctrl+C)');
      console.log('   2. Clear Next.js cache:');
      console.log('      rm -rf .next');
      console.log('   3. Restart dev server:');
      console.log('      npm run dev');
      console.log('   4. Run this test again:');
      console.log('      npm test tests/verify-fix.spec.ts');
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Assert for the fix
    if (giscusCheck.hasScript || giscusCheck.hasIframe) {
      expect(giscusCheck.hasScript || giscusCheck.hasIframe).toBe(true);
    } else {
      console.log('⚠️  Test will fail until dev server is restarted with the fix\n');
      expect(giscusCheck.hasScript).toBe(true);
    }
  });
});
