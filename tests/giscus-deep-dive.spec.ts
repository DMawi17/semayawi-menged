import { test, expect } from '@playwright/test';

test.describe('Giscus Deep Dive Analysis', () => {
  test('Analyze React state and DOM timing', async ({ page }) => {
    console.log('\n=== REACT STATE & DOM TIMING ANALYSIS ===\n');

    // Set up console listener BEFORE navigation
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push(`[${msg.type()}] ${text}`);
      console.log(`  ${msg.type()}: ${text}`);
    });

    console.log('Step 1: Navigate to page...');
    await page.goto('/blog/eve');
    await page.waitForLoadState('domcontentloaded');
    console.log('✅ DOM loaded\n');

    // Wait a bit for React hydration
    await page.waitForTimeout(1000);
    console.log('✅ Waited 1s for React hydration\n');

    // Check what's in the comments container
    console.log('Step 2: Inspect comments container HTML...');
    const containerHTML = await page.evaluate(() => {
      const container = document.querySelector('.giscus-container');
      return {
        exists: !!container,
        innerHTML: container?.innerHTML || 'NOT FOUND',
        hasChildren: container?.hasChildNodes() || false,
        childCount: container?.childNodes.length || 0,
        children: Array.from(container?.childNodes || []).map(node => ({
          type: node.nodeName,
          content: node.textContent?.substring(0, 50)
        }))
      };
    });

    console.log('Giscus Container:', JSON.stringify(containerHTML, null, 2));
    console.log('');

    // Check the ref state
    console.log('Step 3: Check React component state...');
    const componentState = await page.evaluate(() => {
      // Try to find the component state
      const heading = document.querySelector('h2.text-2xl');
      const notConfiguredMsg = document.querySelector('h3');

      return {
        commentsHeadingExists: !!heading,
        commentsHeadingText: heading?.textContent,
        notConfiguredMsgExists: !!notConfiguredMsg,
        notConfiguredMsgText: notConfiguredMsg?.textContent,
        allH3Elements: Array.from(document.querySelectorAll('h3')).map(h3 => h3.textContent),
        giscusContainerVisible: !!document.querySelector('.giscus-container'),
      };
    });

    console.log('Component State:');
    console.log(JSON.stringify(componentState, null, 2));
    console.log('');

    // Check for the specific "not configured" message
    console.log('Step 4: Check if "not configured" UI is visible...');
    const notConfiguredVisible = await page.locator('text=የአስተያየት ክፍል አልተዋቀረም').isVisible();
    console.log(`Not configured message visible: ${notConfiguredVisible ? '❌ YES (This is the problem!)' : '✅ NO (Good!)'}`);
    console.log('');

    // Take a detailed screenshot
    await page.screenshot({
      path: 'test-results/deep-dive-full-page.png',
      fullPage: true
    });

    // Scroll to comments and take another screenshot
    const commentsSection = page.locator('text=አስተያየቶች').first();
    await commentsSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: 'test-results/deep-dive-comments-section.png',
      clip: await commentsSection.boundingBox() ? {
        x: 0,
        y: (await commentsSection.boundingBox())!.y - 50,
        width: await page.viewportSize().then(v => v?.width || 1280),
        height: 600
      } : undefined
    });

    console.log('Step 5: Wait longer and check again...');
    await page.waitForTimeout(5000);

    // Check again after waiting
    const afterWait = await page.evaluate(() => {
      return {
        giscusScript: !!document.querySelector('script[src*="giscus.app"]'),
        giscusIframe: !!document.querySelector('iframe.giscus-frame'),
        giscusContainer: !!document.querySelector('.giscus-container'),
        containerChildren: document.querySelector('.giscus-container')?.childNodes.length || 0,
      };
    });

    console.log('\nAfter 5 second wait:');
    console.log(JSON.stringify(afterWait, null, 2));
    console.log('');

    // Get all console logs related to Giscus
    const giscusLogs = consoleLogs.filter(log =>
      log.toLowerCase().includes('giscus') ||
      log.toLowerCase().includes('config')
    );

    console.log('Step 6: All Giscus-related console logs:');
    giscusLogs.forEach(log => console.log(`  ${log}`));
    console.log('');

    // Check network requests
    console.log('Step 7: Check network requests...');
    const giscusRequests: string[] = [];

    page.on('request', req => {
      if (req.url().includes('giscus')) {
        giscusRequests.push(req.url());
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log(`Giscus network requests: ${giscusRequests.length}`);
    giscusRequests.forEach(url => console.log(`  - ${url}`));
    console.log('');

    // Final screenshot after reload
    await page.screenshot({
      path: 'test-results/deep-dive-after-reload.png',
      fullPage: true
    });

    console.log('✅ Deep dive analysis complete!');
    console.log('\n📸 Screenshots saved:');
    console.log('  - test-results/deep-dive-full-page.png');
    console.log('  - test-results/deep-dive-comments-section.png');
    console.log('  - test-results/deep-dive-after-reload.png');
  });

  test('Test different blog posts', async ({ page }) => {
    console.log('\n=== TESTING MULTIPLE BLOG POSTS ===\n');

    const posts = ['eve', 'hanah', "jesus's_mother_mary"];

    for (const post of posts) {
      console.log(`\nChecking /blog/${post}...`);
      await page.goto(`/blog/${post}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      const check = await page.evaluate(() => {
        return {
          notConfigured: !!document.querySelector('text=የአስተያየት ክፍል አልተዋቀረም')?.textContent,
          hasGiscusContainer: !!document.querySelector('.giscus-container'),
          hasGiscusScript: !!document.querySelector('script[src*="giscus.app"]'),
          hasGiscusIframe: !!document.querySelector('iframe.giscus-frame'),
        };
      });

      console.log(`  Results: ${JSON.stringify(check, null, 2)}`);
    }

    console.log('\n✅ Multi-post test complete!');
  });

  test('Manually trigger Giscus load', async ({ page }) => {
    console.log('\n=== MANUAL GISCUS TRIGGER TEST ===\n');

    await page.goto('/blog/eve');
    await page.waitForLoadState('networkidle');

    console.log('Attempting to manually inject Giscus script...');

    // Try to manually inject Giscus
    const result = await page.evaluate(() => {
      const container = document.querySelector('.giscus-container');

      if (!container) {
        return { success: false, error: 'Container not found' };
      }

      // Check current state
      const before = {
        hasChildren: container.hasChildNodes(),
        childCount: container.childNodes.length,
      };

      // Clear container
      container.innerHTML = '';

      // Create Giscus script
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'DMawi17/semayawi-menged');
      script.setAttribute('data-repo-id', 'R_kgDOQNpzrg');
      script.setAttribute('data-category', 'General');
      script.setAttribute('data-category-id', 'DIC_kwDOQNpzrs4CxWnl');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', 'light');
      script.setAttribute('data-lang', 'en');
      script.async = true;
      script.crossOrigin = 'anonymous';

      container.appendChild(script);

      const after = {
        hasChildren: container.hasChildNodes(),
        childCount: container.childNodes.length,
        scriptAdded: !!container.querySelector('script'),
      };

      return { success: true, before, after };
    });

    console.log('Manual injection result:', JSON.stringify(result, null, 2));
    console.log('');

    console.log('Waiting 10 seconds for Giscus to load...');
    await page.waitForTimeout(10000);

    const afterWait = await page.evaluate(() => {
      return {
        hasScript: !!document.querySelector('script[src*="giscus.app"]'),
        hasIframe: !!document.querySelector('iframe.giscus-frame'),
        iframeCount: document.querySelectorAll('iframe.giscus-frame').length,
      };
    });

    console.log('After waiting:', JSON.stringify(afterWait, null, 2));

    if (afterWait.hasIframe) {
      console.log('🎉 SUCCESS! Giscus loaded after manual injection!');
      console.log('This confirms the issue is in the React component logic.');
    } else {
      console.log('⚠️  Giscus still did not load. Possible GitHub configuration issue.');
    }

    await page.screenshot({
      path: 'test-results/manual-injection-result.png',
      fullPage: true
    });

    console.log('\n✅ Manual trigger test complete!');
  });
});
