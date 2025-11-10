# Replace Giscus with Cusdis - Task List

## Phase 1: Setup & Discovery
- [x] Create new branch from main and checkout
- [x] Create TODO.md file with all tasks listed
- [x] Research current Giscus implementation in the codebase

### Research Findings:
**Giscus Implementation Details:**
- Main component: `components/blog/comments.tsx` (160 lines)
- DNS prefetch in: `app/layout.tsx:74`
- Environment variables in: `.env.local` (4 Giscus variables)
- Documentation files: `GISCUS_SETUP.md`, `IMPLEMENTATION_SUMMARY.md`
- Test files: 9 Playwright test files in `tests/` directory
- Debug docs: 3 files in `docs/debugging/` directory
- No Giscus package dependency (uses CDN script injection)

**Files to Remove/Update:**
1. Components: `components/blog/comments.tsx`
2. Layout: `app/layout.tsx` (remove DNS prefetch)
3. Environment: `.env.local` (remove 4 Giscus vars)
4. Documentation: `GISCUS_SETUP.md`, `IMPLEMENTATION_SUMMARY.md`, `README.md`
5. Tests: All 9 Giscus-related test files
6. Debug docs: 3 files in `docs/debugging/`

## Phase 2: Removal
- [x] Remove all Giscus-related code and components
- [x] Remove Giscus dependencies from package.json (N/A - CDN-based)

## Phase 3: Cusdis Setup
- [ ] Set up Cusdis account and get app credentials
- [x] Install Cusdis React component package (Using CDN - React 19 incompatibility)

## Phase 4: Implementation
- [x] Create Cusdis comment component
- [x] Integrate Cusdis component into blog post layout (Already integrated)
- [x] Add Cusdis configuration to environment variables

## Phase 5: Polish & Testing
- [ ] Style Cusdis component to match blog theme
- [ ] Test Cusdis implementation on development server
- [ ] Update documentation with Cusdis setup instructions

---

## Notes
- Cusdis is lightweight and privacy-friendly
- Requires App ID from cusdis.com
- Self-hostable or use their cloud service
