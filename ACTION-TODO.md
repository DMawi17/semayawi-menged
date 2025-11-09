# 🔧 Action Plan: Bug Fixes, Security, Performance & Code Quality

**Generated:** 2025-11-09
**Project:** Semayawi Menged Blog
**Total Items:** 58

---

## 🔴 CRITICAL PRIORITY (Must Fix Immediately)

### Bugs
- [x] **BUG-1:** Fix division by zero in ReadingProgress component
  📁 `components/blog/reading-progress.tsx:11-12`

- [x] **BUG-2:** Fix memory leak - unbounded in-memory storage in newsletter API
  📁 `app/api/newsletter/route.ts:10,13-15`

### Security
- [x] **SEC-1:** Add security headers to Next.js config (CSP, X-Frame-Options, etc.)
  📁 `next.config.mjs:4-6`

### Performance
- [x] **PERF-1:** Fix N+1 query problem in homepage (category post counts)
  📁 `app/page.tsx:28-32`

- [x] **PERF-2:** Throttle scroll handler in ReadingProgress (causing jank)
  📁 `components/blog/reading-progress.tsx:16`

---

## 🟡 HIGH PRIORITY (Fix This Week)

### Bugs
- [x] **BUG-3:** Fix memory leak - uncleared timeout in Newsletter component
  📁 `components/blog/newsletter.tsx:33-36`

- [x] **BUG-4:** Fix memory leak - uncleared timeout in ShareButtons component
  📁 `components/blog/share-buttons.tsx:66`

- [x] **BUG-5:** Add error handling for JSON.parse in BookmarkButton
  📁 `components/blog/bookmark-button.tsx:17,24`

- [x] **BUG-6:** Fix NaN display from parseInt in ViewCounter
  📁 `components/blog/view-counter.tsx:22`

- [x] **BUG-7:** Fix race condition - multiple localStorage reads in BookmarkButton
  📁 `components/blog/bookmark-button.tsx:17,24`

### Security
- [x] **SEC-2:** Add CSRF protection to newsletter API endpoint
  📁 `app/api/newsletter/route.ts:17`

- [x] **SEC-3:** Implement proper rate limiting (replace in-memory Map)
  📁 `app/api/newsletter/route.ts:19-20`

- [x] **SEC-4:** Remove information disclosure from newsletter health endpoint
  📁 `app/api/newsletter/route.ts:130-139`

### Performance
- [x] **PERF-3:** Add debouncing to search input (300ms delay)
  📁 `components/blog/search-bar.tsx:13-23`

- [x] **PERF-4:** Optimize tag matching algorithm using Set
  📁 `lib/related-posts.ts:36-39`

- [x] **PERF-5:** Lazy load Comments and Newsletter components
  📁 `app/blog/[...slug]/page.tsx:282-290`

### Code Quality
- [x] **QUAL-1:** Add React Error Boundary for MDX rendering
  📁 `app/blog/[...slug]/page.tsx:257`

- [x] **QUAL-2:** Add Error Boundary for Comments component
  📁 `components/blog/comments.tsx:142`

- [x] **QUAL-3:** Create centralized ErrorBoundary component
  📁 `components/error-boundary.tsx` (new file)

- [x] **QUAL-4:** Refactor BookmarkButton to use centralized localStorage utils
  📁 `components/blog/bookmark-button.tsx`

- [x] **QUAL-5:** Refactor ViewCounter to use centralized localStorage utils
  📁 `components/blog/view-counter.tsx`

---

## 🟠 MEDIUM PRIORITY (Fix This Month)

### Bugs
- [x] **BUG-8:** Fix missing IntersectionObserver cleanup in MobileTOC
  📁 `components/blog/mobile-toc.tsx:37-39`

- [x] **BUG-9:** Replace deprecated window.pageYOffset with window.scrollY
  📁 `components/blog/table-of-contents.tsx:55`

- [x] **BUG-10:** Fix Ethiopian date conversion algorithm
  📁 `lib/ethiopian-date.ts:49-116`

### Security
- [x] **SEC-5:** Add HTML escaping to email templates
  📁 `lib/email-templates.ts:71,74`

- [ ] **SEC-6:** Improve email validation (use robust library)
  📁 `app/api/newsletter/route.ts:52-59`

### Performance
- [x] **PERF-6:** Optimize pagination rendering (smart page numbers)
  📁 `app/blog/page.tsx:157-169`

- [x] **PERF-7:** Add useMemo for share URLs in ShareButtons
  📁 `components/blog/share-buttons.tsx:24-31`

- [x] **PERF-8:** Add useMemo for URL construction in FilterBar
  📁 `components/blog/filter-bar.tsx:28-55`

- [x] **PERF-9:** Memoize heading extraction in TableOfContents (already optimized)
  📁 `components/blog/table-of-contents.tsx:17-48`

### Code Quality
- [x] **QUAL-6:** Extract magic numbers to named constants
  📁 `lib/localStorage-utils.ts:4,96` (MAX_HISTORY_ITEMS)

- [x] **QUAL-7:** Extract magic numbers in Newsletter timeout
  📁 `components/blog/newsletter.tsx:8,25` (NOTIFICATION_TIMEOUT_MS)

- [x] **QUAL-8:** Extract magic numbers in TableOfContents
  📁 `components/blog/table-of-contents.tsx:8-9,46,58` (TOC_ROOT_MARGIN, HEADER_OFFSET_PX)

- [x] **QUAL-9:** Create centralized logger utility (remove console.log)
  📁 `lib/logger.ts` (new file)

- [x] **QUAL-10:** Remove console logs from Comments component
  📁 `components/blog/comments.tsx:33,51,76`

- [x] **QUAL-11:** Remove console logs from ShareButtons component
  📁 `components/blog/share-buttons.tsx:48,63`

- [x] **QUAL-12:** Remove console logs from Newsletter component
  📁 `components/blog/newsletter.tsx:71`

- [x] **QUAL-13:** Remove console logs from localStorage-utils
  📁 `lib/localStorage-utils.ts:28,70,123,137,147`

- [ ] **QUAL-14:** Extract sortPostsByOption utility function
  📁 `lib/posts/sorting.ts` (new file)

- [ ] **QUAL-15:** Fix type safety - replace 'unknown' type in blog.ts
  📁 `types/blog.ts:15,17`

- [ ] **QUAL-16:** Add proper type for View Transitions API
  📁 `types/view-transitions.d.ts` (new file)

- [ ] **QUAL-17:** Fix naming inconsistency - rename MDX variable in blog post page
  📁 `app/blog/[...slug]/page.tsx:121`

### Architecture
- [ ] **ARCH-1:** Create usePostFilters custom hook
  📁 `hooks/usePostFilters.ts` (new file)

- [ ] **ARCH-2:** Create useFilteredPosts custom hook
  📁 `hooks/useFilteredPosts.ts` (new file)

- [ ] **ARCH-3:** Create usePagination custom hook
  📁 `hooks/usePagination.ts` (new file)

- [ ] **ARCH-4:** Create PostService class for data fetching
  📁 `services/post.service.ts` (new file)

- [ ] **ARCH-5:** Refactor BlogPostPage - extract PostHeader component
  📁 `components/blog/post/post-header.tsx` (new file)

- [ ] **ARCH-6:** Refactor BlogPostPage - extract PostContent component
  📁 `components/blog/post/post-content.tsx` (new file)

- [ ] **ARCH-7:** Refactor BlogPostPage - extract PostFooter component
  📁 `components/blog/post/post-footer.tsx` (new file)

- [ ] **ARCH-8:** Refactor BlogPostPage - create PostLayout wrapper
  📁 `components/blog/post/post-layout.tsx` (new file)

---

## 🟢 LOW PRIORITY (Nice to Have)

### Bugs
- [ ] **BUG-11:** Use window.innerWidth instead of innerWidth global
  📁 `components/ui/theme-toggle.tsx:21-22`

### Security
- [ ] **SEC-7:** Add input validation with try-catch for localStorage data
  📁 `lib/localStorage-utils.ts:21-22,63-64`

### Performance
- [ ] **PERF-10:** Implement search indexing with FlexSearch
  📁 `lib/search/search-index.ts` (new file)

- [ ] **PERF-11:** Implement caching layer for post fetching
  📁 `lib/cache.ts` (new file)

- [ ] **PERF-12:** Add virtual scrolling for bookmarks/history pages
  📁 `app/bookmarks/page.tsx`, `app/history/page.tsx`

### Code Quality
- [ ] **QUAL-18:** Add ARIA labels for pagination links
  📁 `app/blog/page.tsx:157-169`

- [ ] **QUAL-19:** Reorganize file structure - create blog/ui directory
  📁 `components/blog/ui/` (new directory)

- [ ] **QUAL-20:** Reorganize file structure - create blog/features directory
  📁 `components/blog/features/` (new directory)

- [ ] **QUAL-21:** Reorganize file structure - create blog/analytics directory
  📁 `components/blog/analytics/` (new directory)

### Architecture
- [ ] **ARCH-9:** Create BookmarkContext for state management
  📁 `context/bookmark-context.tsx` (new file)

- [ ] **ARCH-10:** Create HistoryContext for state management
  📁 `context/history-context.tsx` (new file)

- [ ] **ARCH-11:** Add environment validation with Zod
  📁 `config/env.ts` (new file)

- [ ] **ARCH-12:** Add unit tests for related-posts logic
  📁 `tests/unit/lib/related-posts.test.ts` (new file)

- [ ] **ARCH-13:** Add integration tests for blog search
  📁 `tests/integration/blog/search.test.ts` (new file)

---

## 📊 SUMMARY

**Total Tasks:** 58
- 🔴 Critical: 5 (8.6%)
- 🟡 High: 17 (29.3%)
- 🟠 Medium: 21 (36.2%)
- 🟢 Low: 15 (25.9%)

**By Category:**
- 🐞 Bugs: 11
- 🔒 Security: 7
- ⚡ Performance: 12
- ✨ Code Quality: 21
- 🔧 Architecture: 13

**Estimated Timeline:**
- Critical (Day 1): ~4-6 hours
- High (Week 1): ~12-16 hours
- Medium (Weeks 2-3): ~20-24 hours
- Low (Month 1+): ~16-20 hours

**Total Effort:** ~52-66 hours

---

## 🎯 RECOMMENDED EXECUTION ORDER

1. Start with all CRITICAL items (5 tasks)
2. Move to HIGH priority bugs and security (11 tasks)
3. Tackle HIGH priority performance and quality (6 tasks)
4. Work through MEDIUM priority items as time permits
5. Address LOW priority items for long-term improvements

**Note:** This plan can be adjusted based on business priorities and available development time.
