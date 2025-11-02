import { test } from '@playwright/test';

test('Check Giscus environment variables', async ({ page }) => {
  console.log('\n=== Checking Giscus Environment Variables ===\n');

  await page.goto('/blog/eve');
  await page.waitForLoadState('networkidle');

  // Get the console log output that shows Giscus config
  const consoleLogs: any[] = [];

  page.on('console', async (msg) => {
    if (msg.text().includes('Giscus Config')) {
      // Try to get the actual config object
      const args = msg.args();
      for (const arg of args) {
        try {
          const value = await arg.jsonValue();
          consoleLogs.push(value);
        } catch (e) {
          // Skip if can't get value
        }
      }
    }
  });

  // Reload to capture console logs
  await page.reload();
  await page.waitForTimeout(2000);

  console.log('📋 Giscus Configuration from Browser Console:');
  console.log(JSON.stringify(consoleLogs, null, 2));

  // Also check directly in the browser
  const envCheck = await page.evaluate(() => {
    return {
      NEXT_PUBLIC_GISCUS_REPO: (window as any).process?.env?.NEXT_PUBLIC_GISCUS_REPO || 'NOT AVAILABLE in window',
      NEXT_PUBLIC_GISCUS_REPO_ID: (window as any).process?.env?.NEXT_PUBLIC_GISCUS_REPO_ID || 'NOT AVAILABLE in window',
      NEXT_PUBLIC_GISCUS_CATEGORY: (window as any).process?.env?.NEXT_PUBLIC_GISCUS_CATEGORY || 'NOT AVAILABLE in window',
      NEXT_PUBLIC_GISCUS_CATEGORY_ID: (window as any).process?.env?.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'NOT AVAILABLE in window',
    };
  });

  console.log('\n🔍 Environment Variables Check (from window):');
  console.log(JSON.stringify(envCheck, null, 2));

  console.log('\n💡 DIAGNOSIS:');
  console.log('If all values show as empty strings or "NOT AVAILABLE", then:');
  console.log('1. The Next.js dev server needs to be RESTARTED');
  console.log('2. Environment variables are only loaded when Next.js starts');
  console.log('\n🔧 FIX: Restart your dev server with: npm run dev');
});
