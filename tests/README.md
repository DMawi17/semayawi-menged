# E2E Tests with Playwright

This directory contains end-to-end tests for the Semayawi Menged blog using Playwright.

## Setup

Playwright and browsers are already configured. If you need to reinstall browsers:

```bash
npx playwright install --with-deps
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests for specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run mobile tests only
npm run test:mobile

# View test report
npm run test:report
```

## Test Structure

```
tests/
├── fixtures/
│   └── blog-fixtures.ts    # Shared test helpers and page objects
├── blog/
│   ├── blog-posts.spec.ts  # Blog post page tests
│   └── comments.spec.ts    # Giscus comments tests
└── example.spec.ts         # Playwright example test
```

## Test Categories

### Blog Post Tests (`blog/blog-posts.spec.ts`)
- Page load and structure
- Navigation between posts
- Content display (including Amharic)
- Responsive design
- SEO and accessibility
- Performance

### Comments Tests (`blog/comments.spec.ts`)
- Giscus configuration detection
- Comments section display
- Iframe loading
- Network requests
- Responsive behavior

## Configuration

The test configuration is in `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Auto-start dev server**: Tests automatically start the Next.js dev server
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Screenshots**: Captured on test failure
- **Videos**: Recorded on test failure
- **Output**: `test-results/` directory

## Writing New Tests

### Using Fixtures

```typescript
import { test, expect } from '@playwright/test';
import { BlogPostPage, BlogAssertions } from '../fixtures/blog-fixtures';

test('my test', async ({ page }) => {
  const blogPage = new BlogPostPage(page);
  await blogPage.goto('eve');
  await BlogAssertions.assertPageLoaded(page);
});
```

### Page Object Pattern

The `BlogPostPage` class provides common actions:
- `goto(slug)` - Navigate to blog post
- `getTitle()` - Get page title
- `scrollToComments()` - Scroll to comments section
- `checkCommentsSection()` - Verify comments exist
- `waitForGiscusIframe()` - Wait for Giscus to load

### Assertions Helper

The `BlogAssertions` class provides common checks:
- `assertPageLoaded(page)` - Verify page loaded
- `assertHasTitle(page)` - Verify title exists
- `assertHasContent(page)` - Verify content exists
- `assertCommentsConfigured(page)` - Verify Giscus configured

## Debugging

### Visual Debugging

```bash
# Open UI mode - best for debugging
npm run test:ui

# Run in headed mode
npm run test:headed

# Debug specific test
npm run test:debug -- tests/blog/blog-posts.spec.ts
```

### Screenshots and Videos

Failed tests automatically generate:
- Screenshots in `test-results/`
- Videos in `test-results/`
- Traces for playback

### View Traces

```bash
npx playwright show-trace test-results/trace.zip
```

## CI/CD Integration

Tests are configured for CI environments:
- Single worker in CI for stability
- 2 retries on failure
- HTML report generation
- `test.only` forbidden in CI

## Troubleshooting

### Dev server not starting
The config automatically starts `npm run dev`. If it fails:
- Check port 3000 is available
- Verify Next.js builds correctly
- Check timeout settings in config

### Tests timing out
- Increase timeout in specific tests: `test.setTimeout(60000)`
- Check network conditions
- Verify dev server is running

### Giscus tests failing
- Giscus may not be configured yet (expected)
- Tests detect and handle unconfigured state
- Check console logs in test output

## Best Practices

1. **Use Page Objects**: Keep tests clean with the `BlogPostPage` helper
2. **Wait for Load States**: Use `waitForLoadState('networkidle')` for dynamic content
3. **Descriptive Test Names**: Use clear, action-oriented names
4. **Test Isolation**: Each test should be independent
5. **Mobile Testing**: Include mobile viewports for responsive checks
6. **Accessibility**: Test with semantic selectors (roles, labels)

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)
