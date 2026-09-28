# DevPath Foundation Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-quality DevPath vertical slice: premium bilingual course shell, typed lesson system, local progress, representative interactive exercises, source metadata, responsive roadmap, and representative lessons from beginner through advanced material.

**Architecture:** A Next.js + TypeScript application keeps course content separate from rendering code. Typed domain modules own lessons, progress, exercises, sources, glossary, theme, and localization; UI components consume stable interfaces. Browser execution is isolated from the main page and local persistence is hidden behind a repository/service boundary.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library, Playwright, Zod, localStorage, Web Worker/isolated iframe for browser code execution.

**Spec:** `docs/superpowers/specs/2026-09-28-devpath-design.md`

## Global Constraints

- Product language support is full **PT-BR + English**, not partial UI translation.
- Visual direction is **premium + tech**, with light and dark themes; light mode is the reading-first design target.
- Recommended learning path must never hard-lock lessons.
- Technical lessons display traceable official/primary sources and technical review metadata.
- Browser execution is allowed only where it is technically honest; unsupported runtimes become guided PC labs.
- Progress starts local-first and must remain replaceable by a future remote repository without rewriting consumers.
- Lesson content is data-driven and validated by a typed schema.
- Accessibility includes keyboard flows, visible focus, semantic HTML, non-color-only feedback, reduced-motion support, and responsive layouts.
- No account system, payments, social ranking, certificate system, remote multi-language execution server, or live human tutoring in this slice.

## Review Focus

- Corrupt or old local progress data must not crash the site; it should migrate or recover safely.
- PT-BR and English content must have structural parity so one language cannot silently lose an exercise or source block.
- Infinite loops or runaway browser code must time out and leave the page usable.
- Missing/invalid lesson slugs and stale next/previous links must fail gracefully rather than render broken navigation.
- Mobile layouts with long translated strings and wide code blocks must remain readable and operable.

---
## File Structure

- `package.json`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`: application and test tooling.
- `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/app/[locale]/course/page.tsx`, `src/app/[locale]/course/[slug]/page.tsx`: locale-aware app routes.
- `src/features/course/schema.ts`: Zod/TypeScript schemas for modules, lessons, bilingual content blocks, exercises, glossary terms, and source metadata.
- `src/features/course/catalog.ts`: course modules, recommended order, prerequisite metadata, and lesson lookup functions.
- `src/content/lessons/*.ts`: representative bilingual lesson records.
- `src/features/lesson/LessonRenderer.tsx`: renders typed lesson blocks without lesson-specific logic.
- `src/features/progress/types.ts`, `repository.ts`, `localProgressRepository.ts`, `service.ts`: stable progress interface, validation/migration, local adapter, and consumer API.
- `src/features/exercises/*`: reusable prediction, multiple-choice, trace, fill-gap, bug-hunt, and browser-code exercise components.
- `src/features/runner/*`: isolated code execution protocol, worker/iframe adapter, timeout, reset, and error normalization.
- `src/features/sources/*`: source cards, verification metadata, and source-list rendering.
- `src/features/glossary/*`, `src/features/projects/*`: glossary and curated project-example catalog.
- `src/components/navigation/*`, `src/components/theme/*`, `src/components/ui/*`: shell, responsive navigation, theme switch, and shared premium-tech UI primitives.
- `src/i18n/*`: locale detection, dictionary helpers, and locale-safe links.
- `tests/unit/*`, `tests/components/*`, `tests/e2e/*`: domain, component, and browser-level regression coverage.

### Task 1: Scaffold the tested Next.js shell

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`
- Create: `vitest.config.ts`, `playwright.config.ts`, `tests/unit/smoke.test.ts`, `tests/e2e/home.spec.ts`

**Interfaces:**
- Produces: runnable Next.js app, `npm test`, `npm run test:e2e`, `npm run build`.

- [ ] **Step 1: Write failing smoke tests** asserting PT-BR and English home routes render the DevPath product name and no locale route crashes.
- [ ] **Step 2: Run `npm test` and confirm the smoke tests fail before application setup.**
- [ ] **Step 3: Scaffold Next.js with TypeScript/Tailwind and add Vitest, Testing Library, Playwright, and Zod; keep dependencies minimal.**
- [ ] **Step 4: Implement locale-aware root routes for `/pt-BR` and `/en` plus a root redirect to the preferred/default locale.**
- [ ] **Step 5: Run `npm test`, `npm run test:e2e`, and `npm run build`; expect all to pass.**
- [ ] **Step 6: Commit with `feat: scaffold tested DevPath shell`.**
### Task 2: Build the premium-tech shell, themes, and bilingual navigation

**Files:**
- Create: `src/components/navigation/AppShell.tsx`, `src/components/navigation/Header.tsx`, `src/components/navigation/MobileNav.tsx`
- Create: `src/components/theme/ThemeProvider.tsx`, `src/components/theme/ThemeToggle.tsx`, `src/i18n/config.ts`, `src/i18n/dictionaries.ts`, `src/i18n/links.ts`
- Test: `tests/components/app-shell.test.tsx`, `tests/e2e/theme-language.spec.ts`

**Interfaces:**
- Produces: `Locale = 'pt-BR' | 'en'`, locale-safe `localizeHref(locale, href)`, and theme preference persistence.

- [ ] **Step 1: Write failing component tests** for navigation labels in both locales, visible theme switch, keyboard focus, and locale-safe links.
- [ ] **Step 2: Write failing e2e tests** verifying OS-theme fallback, manual theme persistence, and language switching without losing the current route.
- [ ] **Step 3: Implement `Locale`, dictionaries, locale link helper, shell/header/mobile navigation, and theme provider using system preference until a manual choice exists.**
- [ ] **Step 4: Implement premium-tech design tokens and shared surface/button/card primitives with reduced-motion behavior.**
- [ ] **Step 5: Run component/e2e tests and `npm run build`; expect PASS.**
- [ ] **Step 6: Commit with `feat: add bilingual premium app shell`.**

### Task 3: Define the typed bilingual course schema and representative content

**Files:**
- Create: `src/features/course/schema.ts`, `src/features/course/catalog.ts`
- Create: `src/content/lessons/variables.ts`, `src/content/lessons/async-errors.ts`, `src/content/lessons/client-server-boundaries.ts`
- Test: `tests/unit/course-schema.test.ts`, `tests/unit/course-catalog.test.ts`

**Interfaces:**
- Produces: `Lesson`, `LessonBlock`, `ExerciseBlock`, `SourceRef`, `CourseModule`, `getLesson(slug)`, `getAdjacentLessons(slug)`, `validateCatalog()`.

- [ ] **Step 1: Write failing schema tests** proving PT-BR/English block parity, required source metadata, unique slugs, valid prerequisite references, and valid next/previous relationships.
- [ ] **Step 2: Add review-focus tests** for invalid slugs and stale links returning explicit not-found/null results rather than throwing uncontrolled errors.
- [ ] **Step 3: Implement the Zod schemas and catalog lookup/validation functions with exact interfaces above.**
- [ ] **Step 4: Add three representative bilingual lessons: beginner variables, intermediate async/error handling, advanced client/server boundaries. Each includes at least one exercise and official-source metadata.**
- [ ] **Step 5: Run `npm test`; expect all catalog/schema tests PASS.**
- [ ] **Step 6: Commit with `feat: add typed bilingual course catalog`.**
### Task 4: Render lessons as book + laboratory pages

**Files:**
- Create: `src/features/lesson/LessonRenderer.tsx`, `src/features/lesson/blocks/*.tsx`, `src/features/sources/SourceList.tsx`
- Modify: `src/app/[locale]/course/[slug]/page.tsx`
- Test: `tests/components/lesson-renderer.test.tsx`, `tests/e2e/lesson.spec.ts`

**Interfaces:**
- Consumes: `Lesson`, `LessonBlock`, `SourceRef` from Task 3.
- Produces: typed block renderer and lesson route with previous/next navigation.

- [ ] **Step 1: Write failing component tests** covering explanation, code, expandable depth, trace table, exercise placeholder, source list, and both locales.
- [ ] **Step 2: Write failing e2e tests** for valid lesson navigation, invalid slug not-found behavior, keyboard focus, and mobile code overflow.
- [ ] **Step 3: Implement `LessonRenderer({ lesson, locale })` and focused block components; no lesson-specific branching is allowed in the renderer.**
- [ ] **Step 4: Implement the lesson route and semantic previous/next navigation using catalog lookups.**
- [ ] **Step 5: Run unit/component/e2e tests and production build; expect PASS.**
- [ ] **Step 6: Commit with `feat: render interactive lesson pages`.**

### Task 5: Add resilient local progress behind a repository boundary

**Files:**
- Create: `src/features/progress/types.ts`, `repository.ts`, `localProgressRepository.ts`, `service.ts`, `migrations.ts`
- Create: `src/features/progress/ProgressProvider.tsx`, `src/features/progress/ProgressSummary.tsx`
- Test: `tests/unit/progress.test.ts`, `tests/components/progress-provider.test.tsx`

**Interfaces:**
- Produces: `ProgressRepository.load(): Promise<ProgressState>`, `save(state): Promise<void>`, `ProgressService.completeLesson(slug)`, `recordCheckpoint(id, result)`, `setLastLesson(slug)`.

- [ ] **Step 1: Write failing tests** for empty storage, normal save/load, corrupt JSON, unknown schema version, migration, completed lessons, checkpoint results, and storage write failure.
- [ ] **Step 2: Assert the review-focus behavior:** corrupt/old data returns a safe validated state and exposes a recoverable warning rather than crashing lesson rendering.
- [ ] **Step 3: Implement versioned `ProgressState`, repository interface, localStorage adapter, migrations, and service methods.**
- [ ] **Step 4: Implement provider/summary UI and explicit lesson completion/checkpoint integration points.**
- [ ] **Step 5: Run `npm test` and `npm run build`; expect PASS.**
- [ ] **Step 6: Commit with `feat: add resilient local progress`.**
### Task 6: Implement meaningful exercise types and isolated browser execution

**Files:**
- Create: `src/features/exercises/ExerciseRenderer.tsx`, `PredictionExercise.tsx`, `MultipleChoiceExercise.tsx`, `TraceExercise.tsx`, `FillGapExercise.tsx`, `BugHuntExercise.tsx`, `BrowserCodeExercise.tsx`
- Create: `src/features/runner/protocol.ts`, `browserRunner.ts`, `runner.worker.ts`, `normalizeError.ts`
- Test: `tests/components/exercises.test.tsx`, `tests/unit/browser-runner.test.ts`, `tests/e2e/browser-lab.spec.ts`

**Interfaces:**
- Produces: `runCode({ language, code, timeoutMs }): Promise<RunResult>` where first slice supports `javascript`; TypeScript support may transpile before the same execution boundary.

- [ ] **Step 1: Write failing exercise tests** for correct/incorrect feedback explaining why, retry behavior, reveal behavior, keyboard operation, and progress checkpoint emission.
- [ ] **Step 2: Write failing runner tests** for successful output, syntax/runtime errors, reset, isolation between attempts, and an infinite loop timing out without freezing the page.
- [ ] **Step 3: Implement reusable exercise renderer and the five non-runner exercise components with substantive feedback fields supplied by lesson content.**
- [ ] **Step 4: Implement the isolated runner protocol and worker/iframe boundary with hard timeout/termination and normalized error output; never evaluate learner code in the main React execution context.**
- [ ] **Step 5: Integrate `BrowserCodeExercise`, run all tests plus manual runaway-code check, and expect the page to remain responsive.**
- [ ] **Step 6: Commit with `feat: add interactive exercises and safe browser runner`.**

### Task 7: Build the home dashboard, roadmap, glossary, and project-study views

**Files:**
- Create: `src/features/course/CourseRoadmap.tsx`, `src/features/glossary/catalog.ts`, `src/features/glossary/GlossaryView.tsx`
- Create: `src/features/projects/catalog.ts`, `src/features/projects/ProjectExampleCard.tsx`
- Modify: `src/app/[locale]/page.tsx`, `src/app/[locale]/course/page.tsx`
- Create: `src/app/[locale]/glossary/page.tsx`, `src/app/[locale]/projects/page.tsx`, `src/app/[locale]/progress/page.tsx`
- Test: `tests/components/roadmap.test.tsx`, `tests/e2e/dashboard.spec.ts`

**Interfaces:**
- Consumes: course catalog and progress service.
- Produces: unlocked roadmap states, next recommended lesson, glossary lookup, curated project-example cards.

- [ ] **Step 1: Write failing tests** for unlocked navigation, completed/current/recommended states, specialization cards, glossary locale parity, and project example prerequisite links.
- [ ] **Step 2: Add a responsive e2e test** using a narrow viewport with long PT-BR and English strings; assert roadmap becomes vertical and no primary control is clipped.
- [ ] **Step 3: Implement hybrid home/dashboard, roadmap, progress page, glossary, and curated projects views using premium-tech visual hierarchy.**
- [ ] **Step 4: Seed project examples from `rei-da-limonada-rio`, `discord-server-bot`, `painel-controle`, and `roblox-fps-pvp` as metadata/excerpts only; do not modify those repositories.**
- [ ] **Step 5: Run component/e2e tests and build; expect PASS.**
- [ ] **Step 6: Commit with `feat: add dashboard roadmap and study references`.**
### Task 8: Add source-verification presentation and content QA gates

**Files:**
- Create: `src/features/sources/types.ts`, `src/features/sources/SourceBadge.tsx`, `src/features/sources/VerificationMeta.tsx`
- Create: `scripts/validate-content.ts`
- Modify: `package.json`
- Test: `tests/unit/content-validation.test.ts`, `tests/components/source-meta.test.tsx`

**Interfaces:**
- Produces: `npm run validate:content` that fails on invalid source metadata, language parity mismatches, missing review dates for version-sensitive lessons, duplicate IDs/slugs, and broken internal lesson references.

- [ ] **Step 1: Write failing validation tests** for missing primary source, missing `checkedAt`, invalid version metadata, parity mismatch, and broken internal links.
- [ ] **Step 2: Implement source badges and review/version metadata components that distinguish primary vs supplementary material without overwhelming the lesson.**
- [ ] **Step 3: Implement `scripts/validate-content.ts` using the same typed schemas as runtime content.**
- [ ] **Step 4: Add `validate:content` to CI/local verification commands and run it against the representative lessons.**
- [ ] **Step 5: Run `npm run validate:content`, `npm test`, `npm run test:e2e`, and `npm run build`; expect PASS.**
- [ ] **Step 6: Commit with `feat: add source verification and content QA`.**

### Task 9: Accessibility, performance, and production-readiness pass

**Files:**
- Modify: relevant shell, lesson, roadmap, exercise, and runner components from Tasks 2-8.
- Create: `tests/e2e/accessibility-navigation.spec.ts`, `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Produces: verified first vertical slice meeting spec quality gates.

- [ ] **Step 1: Add failing e2e checks** for keyboard-only navigation, visible focus, non-color-only exercise feedback, reduced-motion behavior, mobile drawer behavior, wide code blocks, and both locales/themes.
- [ ] **Step 2: Fix accessibility/responsive failures with semantic HTML and focused component-level changes; do not introduce unrelated redesigns.**
- [ ] **Step 3: Manually verify representative lessons on desktop and mobile widths in PT-BR/English and light/dark themes.**
- [ ] **Step 4: Run the full verification suite:** `npm run validate:content`, `npm test`, `npm run test:e2e`, `npm run build`.
- [ ] **Step 5: Record any deliberately deferred issues in `docs/quality/foundation-slice-review.md`; no silent TODOs in product code.**
- [ ] **Step 6: Commit with `test: harden DevPath foundation slice`.**

## Follow-up Plans After This Slice

This plan intentionally does not attempt to implement every approved subsystem at once. After the foundation slice proves the content and interaction architecture, create separate implementation plans for:

1. **Research Corpus Pipeline** — ingestion/review workflow using official web docs, PDFs, GitHub, Context7 when connected, version tracking, claim-to-source records, and periodic revalidation.
2. **DevPath AI Tutor** — right-side streaming panel, scoped retrieval, read-only capability boundary, out-of-scope rejection, substantive hint escalation, source attribution, provider abstraction, prompt-injection tests, and rate/size protections.
3. **Curriculum Expansion** — full professional core, specialization tracks, project excerpts, quizzes/checkpoints, and bilingual content production/technical review batches.
4. **Future Account Sync** — only if later approved; implement a remote `ProgressRepository` compatible with the local-first interface rather than changing lesson consumers.

## Plan Self-Review Notes

- Spec coverage for the first vertical slice: visual identity, bilingual system, data-driven lessons, representative curriculum depth, progress boundary, exercises/browser runner, roadmap, project examples, official-source metadata, accessibility, responsiveness, and QA are covered.
- Deliberately deferred from this plan: production AI tutor, large research-ingestion pipeline, complete curriculum population, login/cloud sync. Each is independently testable and warrants its own plan.
- Interfaces are stable across tasks: course types/catalog feed renderer/roadmap; progress repository/service feeds dashboard/lessons/exercises; runner exposes one `runCode` boundary.
- Review Focus items each have owning tests in Tasks 3, 5, 6, and 7/9.
- Tasks follow TDD and end with a verifiable deliverable plus commit.
