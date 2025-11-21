# Security & Code Quality TODO List

Generated: 2025-11-20
Based on: Comprehensive Security & Code Quality Review

---

## 🚨 CRITICAL Priority (Must Fix Before Production)

- [x] **Fix JSON-LD XSS Vulnerability** ✅ COMPLETED
  - File: `components/seo/json-ld.tsx`
  - Issue: `dangerouslySetInnerHTML` with unsanitized JSON could allow script injection
  - Action: Add sanitization helper to escape `</script>` tags
  - Severity: CRITICAL - XSS vulnerability
  - Fixed: Added `sanitizeJsonLd()` helper and applied to all 6 JSON-LD functions

- [ ] **Fix Newsletter Subscription Race Condition**
  - File: `app/api/newsletter/route.ts`
  - Issue: User added to subscribers before email send confirmation
  - Action: Send email first, then add to subscribers list
  - Severity: CRITICAL - Data consistency issue

---

## 🔴 HIGH Priority (Fix This Week)

- [ ] **Enhance CSRF Protection in Newsletter API**
  - File: `app/api/newsletter/route.ts`
  - Issue: Origin header check is bypassable
  - Action: Add explicit allowed origins list with referer validation
  - Severity: HIGH - CSRF attack vector

- [ ] **Add Error Handling to Clipboard API (BibleVerse)**
  - File: `components/mdx/bible-verse.tsx`
  - Issue: Missing try-catch and navigator availability check
  - Action: Wrap clipboard operations in async try-catch
  - Severity: MEDIUM - Runtime crash potential

- [ ] **Add Error Handling to Clipboard API (ShareButtons)**
  - File: `components/blog/share-buttons.tsx`
  - Issue: Unhandled promise rejection in native share
  - Action: Add navigator availability check and proper error handling
  - Severity: MEDIUM - User experience issue

- [ ] **Fix Rate Limiting Memory Leak**
  - File: `app/api/newsletter/route.ts`
  - Issue: Cleanup interval causes memory leak in serverless
  - Action: Replace interval-based cleanup with per-request cleanup
  - Severity: MEDIUM - Memory leak in serverless

- [ ] **Add CSP Nonce to Cusdis Script Loading**
  - File: `components/blog/comments.tsx`
  - Issue: External script loading without SRI or CSP nonce
  - Action: Add nonce support for CSP-compatible loading
  - Severity: MEDIUM - Supply chain attack vector

---

## 🟡 MEDIUM Priority (This Month)

- [ ] **Add React.memo to ShareButtons Component**
  - File: `components/blog/share-buttons.tsx`
  - Issue: Unnecessary re-renders on parent updates
  - Action: Wrap component with React.memo
  - Severity: HIGH - Performance optimization

- [ ] **Optimize TableOfContents Performance**
  - File: `components/blog/table-of-contents.tsx`
  - Issue: Expensive DOM queries and excessive re-renders
  - Action: Add requestAnimationFrame for batched updates, optimize selector
  - Severity: MEDIUM - Performance optimization

- [ ] **Optimize Image Loading Configuration**
  - File: `lib/mdx-components.tsx`
  - Issue: Missing lazy loading, sizes, and blur placeholder
  - Action: Add sizes, loading="lazy", quality optimization
  - Severity: MEDIUM - Core Web Vitals impact

- [ ] **Fix TypeScript any Usage (comments.tsx)**
  - File: `components/blog/comments.tsx`
  - Issue: `CUSDIS?: any; CUSDIS_LOCALE?: any;`
  - Action: Define proper TypeScript interfaces for Cusdis
  - Severity: MEDIUM - Type safety

- [ ] **Fix TypeScript any Usage (view-transition-link.tsx)**
  - File: `components/view-transition-link.tsx`
  - Issue: `[key: string]: any;` in interface
  - Action: Define proper types for view transition properties
  - Severity: MEDIUM - Type safety

- [ ] **Fix TypeScript any Usage (newsletter route)**
  - File: `app/api/newsletter/route.ts`
  - Issue: Implicit any in `catch (emailError)`
  - Action: Type error as `unknown` and narrow type
  - Severity: MEDIUM - Type safety

---

## 🟢 LOW Priority (This Quarter)

- [ ] **Create Shared Error Handling Utility**
  - Files: Multiple components with duplicate patterns
  - Issue: Duplicate error handling code in newsletter, bookmark, share buttons
  - Action: Create `lib/error-handler.ts` with shared utility
  - Severity: MEDIUM - Code maintainability

- [ ] **Add JSDoc Comments to Utility Functions**
  - Files: `lib/reading-time.ts`, `lib/utils.ts`, others
  - Issue: Missing documentation for utility functions
  - Action: Add comprehensive JSDoc comments
  - Severity: LOW - Documentation

- [ ] **Standardize Error Messages**
  - Files: Multiple components
  - Issue: Mix of Amharic/English in console logs vs user messages
  - Action: Create `config/messages.ts` with centralized messages
  - Severity: LOW - User experience

- [ ] **Setup Unit Testing Framework**
  - Files: New test files
  - Issue: No unit tests, only e2e tests exist
  - Action: Install Vitest, create example tests for lib/email-validation.ts
  - Severity: MEDIUM - Testing coverage

- [ ] **Add Content Security Policy Headers**
  - Files: `next.config.js` or middleware
  - Issue: No CSP headers implemented
  - Action: Add CSP configuration for production
  - Severity: MEDIUM - Security hardening

---

## 📋 Architectural Improvements (Future)

- [ ] **Create API Client Utilities Folder**
  - Action: Add `lib/api/` folder for organized API client code
  - Priority: LOW

- [ ] **Add Validation Schemas Folder**
  - Action: Add `lib/validation/` folder for Zod schemas or similar
  - Priority: LOW

- [ ] **Add Constants Folder**
  - Action: Add `lib/constants/` for app-wide constants
  - Priority: LOW

- [ ] **Setup Storybook Documentation**
  - Action: Install Storybook and document MDX components
  - Priority: LOW

- [ ] **Add Bundle Size Monitoring**
  - Action: Setup bundlesize or similar for CI monitoring
  - Priority: LOW

- [ ] **Implement Error Tracking Service**
  - Action: Integrate Sentry or similar for production error tracking
  - Priority: MEDIUM

---

## ✅ Completed Items

- [x] **Fix JSON-LD XSS Vulnerability** (2025-11-20)
  - File: `components/seo/json-ld.tsx`
  - Added `sanitizeJsonLd()` helper that escapes `<`, `>`, `&`, and Unicode line/paragraph separators
  - Applied to all 6 JSON-LD schema functions
  - Prevents XSS attacks through malicious post titles or descriptions

---

## 📊 Progress Summary

- **Total Items**: 29
- **Critical**: 1 remaining (1 completed)
- **High**: 5
- **Medium**: 10
- **Low**: 12
- **Completed**: 1

---

## 🎯 Current Focus

Starting with CRITICAL priority items to ensure production safety.

---

_Last Updated: 2025-11-20_
