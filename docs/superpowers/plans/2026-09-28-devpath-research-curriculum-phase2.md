# DevPath Research Corpus + Curriculum Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build DevPath's auditable research corpus and publish the first complete sequential beginner package from program execution through conditions.

**Architecture:** Separate technical knowledge from pedagogy: research records own claims and authoritative sources, while lessons reference approved claim IDs. Editorial state controls what reaches public course routes; published lessons are validated against the corpus before they can appear in the roadmap.

**Tech Stack:** Next.js 16, React 19, TypeScript 7, Zod 4, Vitest 5, Playwright 1.63, existing local progress and browser runner.

**Spec:** `docs/superpowers/specs/2026-09-28-devpath-research-curriculum-design.md`

## Global Constraints

- First expansion is sequential from zero; do not scatter disconnected advanced lessons into the learner roadmap.
- Production model is hybrid by topic package: research → verified claims → tested examples → bilingual lesson → exercises → validation → publication.
- PT-BR and English remain structurally aligned first-class content.
- Important technical claims in a published lesson must resolve to approved research claims backed by authoritative sources.
- Official/primary sources are preferred; secondary sources may supplement but cannot be the sole support for important claims when primary material exists.
- Public catalog exposes only `published` lessons; `draft` and `technical-review` remain authoring-only.
- No DevPath AI tutor implementation in this phase; corpus interfaces must be reusable by it later.
- Existing local progress must remain readable even when old representative lessons stop appearing in the public roadmap.

## Review Focus

- A published lesson referencing a missing or non-approved claim must fail content validation and never silently publish.
- A research claim with missing sources, no primary authority, duplicate IDs, or invalid version metadata must fail validation with an actionable message.
- Draft/technical-review lessons must not appear in public roadmap, adjacency, recommendations, or normal lesson routes.
- Old progress containing hidden/removed lesson slugs must not shift the recommended lesson or crash progress rendering.
- A curriculum prerequisite cycle or a prerequisite pointing to an unpublished lesson must be rejected before publication.

---
## File Structure

- `src/features/research/schema.ts`: Zod and TypeScript types for research records, claims, and source metadata.
- `src/features/research/catalog.ts`: claim/source lookup, approval checks, and reverse dependency helpers.
- `src/content/research/foundations/*.ts`: approved research records for the first curriculum package.
- `src/features/course/schema.ts`: lesson editorial status, package ID, claim references, and exercise prerequisites.
- `src/features/course/catalog.ts`: authoring catalog, public catalog, public adjacency, and prerequisite validation.
- `src/content/lessons/*.ts`: migrated samples plus new sequential beginner lessons.
- `src/features/sources/SourceList.tsx`: resolve visible lesson sources from research claims rather than duplicated lesson URLs.
- `scripts/validate-content.ts`: publication gates across research records and lessons.
- `src/features/course/CourseRoadmap.tsx`: public-only roadmap and recommendation logic based on known published slugs.
- `src/features/glossary/catalog.ts`: vocabulary introduced by the first package.
- `tests/unit/research-catalog.test.ts`, `content-validation.test.ts`, `course-catalog.test.ts`: corpus and curriculum integrity.
- `tests/e2e/curriculum-phase2.spec.ts`: learner-visible sequence, hidden drafts, source display, and progress compatibility.

### Task 1: Add the research corpus domain

**Files:**
- Create: `src/features/research/schema.ts`
- Create: `src/features/research/catalog.ts`
- Create: `tests/unit/research-catalog.test.ts`

**Interfaces:**
- Produces: `ResearchStatus = 'draft' | 'approved'`, `ResearchSource`, `ResearchClaim`, `ResearchRecord`, `getClaim(id)`, `getSource(id)`, `getSourcesForClaim(id)`, `getClaimsForLesson(claimIds)`, `getLessonsAffectedBySource(sourceId, lessons)`.

- [ ] **Step 1: Write failing schema/catalog tests** asserting unique source/claim IDs, approved-claim lookup, source resolution, and reverse source → claim → lesson dependency lookup.
- [ ] **Step 2: Run `npm test -- tests/unit/research-catalog.test.ts`; expect failure because the research domain does not exist.**
- [ ] **Step 3: Implement the focused Zod schemas and catalog functions.** A claim stores a bilingual technical statement, `sourceIds`, optional version scope, and approval state; a source stores authority type, URL/repository reference, checked date, and version sensitivity.
- [ ] **Step 4: Add explicit safe-null behavior** for unknown claim/source IDs instead of uncontrolled exceptions in lookup helpers.
- [ ] **Step 5: Run the research catalog tests; expect PASS.**
- [ ] **Step 6: Commit with `feat: add research corpus domain`.**
### Task 2: Add editorial lifecycle and public-only course catalog

**Files:**
- Modify: `src/features/course/schema.ts`
- Modify: `src/features/course/catalog.ts`
- Modify: `src/content/lessons/variables.ts`
- Modify: `src/content/lessons/async-errors.ts`
- Modify: `src/content/lessons/client-server-boundaries.ts`
- Test: `tests/unit/course-catalog.test.ts`

**Interfaces:**
- Produces: `LessonStatus = 'draft' | 'technical-review' | 'published'`, lesson fields `status`, `packageId`, `claimIds`, `conceptIds`, and `exercise.prerequisiteConceptIds`.
- Produces: `allLessons`, `publishedLessons`, `getLesson(slug)` for public lessons only, `getLessonForAuthoring(slug)`, and `getAdjacentLessons(slug)` over published order only.

- [ ] **Step 1: Write failing catalog tests** proving unpublished lessons are excluded from `publishedLessons`, public lookup, and adjacency while remaining available through authoring lookup.
- [ ] **Step 2: Add a failing prerequisite-cycle test** and a failing test for a published lesson depending on an unpublished prerequisite.
- [ ] **Step 3: Update the lesson schema and catalog interfaces with the exact fields/functions above.**
- [ ] **Step 4: Migrate `variables` to the new metadata shape and mark it `technical-review`; mark the two advanced representative samples `technical-review` so they no longer create jumps in the public roadmap during Phase 2 authoring.**
- [ ] **Step 5: Run `npm test -- tests/unit/course-catalog.test.ts`; expect PASS.**
- [ ] **Step 6: Commit with `feat: add lesson editorial lifecycle`.**

### Task 3: Strengthen publication validation across corpus and lessons

**Files:**
- Modify: `scripts/validate-content.ts`
- Modify: `tests/unit/content-validation.test.ts`
- Create: `tests/unit/publication-gates.test.ts`

**Interfaces:**
- Consumes: research catalog from Task 1 and lesson lifecycle from Task 2.
- Produces: `collectResearchIssues()`, `collectLessonIssues()`, `collectPublicationIssues()`, and `validateContentData()` with actionable issue strings.

- [ ] **Step 1: Write failing tests** for missing claim IDs, non-approved claims used by published lessons, claims without a primary source, duplicate claim/source IDs, version-sensitive sources without versions, and invalid checked dates.
- [ ] **Step 2: Add failing tests** for prerequisite cycles, published → unpublished prerequisites, missing exercise prerequisite concepts, and multiple-choice exercises with fewer than two options.
- [ ] **Step 3: Implement the three validation layers** so schema errors, corpus errors, and publication errors remain distinguishable in messages.
- [ ] **Step 4: Run `npm run validate:content` during the transitional state and expect failure that explicitly names lessons awaiting research links; this is the intentional RED gate before corpus authoring.**
- [ ] **Step 5: Run unit validation tests; expect PASS for synthetic valid fixtures and PASS on every expected rejection case.**
- [ ] **Step 6: Commit with `feat: enforce research-backed publication gates`.**
### Task 4: Author the approved foundations research corpus

**Files:**
- Create: `src/content/research/foundations/program-execution.ts`
- Create: `src/content/research/foundations/values-expressions.ts`
- Create: `src/content/research/foundations/variables.ts`
- Create: `src/content/research/foundations/types.ts`
- Create: `src/content/research/foundations/operators.ts`
- Create: `src/content/research/foundations/comparisons.ts`
- Create: `src/content/research/foundations/conditions.ts`
- Modify: `src/features/research/catalog.ts`
- Test: `tests/unit/foundations-research.test.ts`

**Interfaces:**
- Produces approved claim IDs consumed by Tasks 5-6: `exec-*`, `value-*`, `variable-*`, `type-*`, `operator-*`, `comparison-*`, and `condition-*`.

- [ ] **Step 1: Research current authoritative material** using official web documentation/specifications appropriate to each topic; record exact source title, URL/repository reference, authority type, checked date `2026-09-28`, and version metadata when relevant.
- [ ] **Step 2: Write failing coverage tests** asserting every first-package topic has at least one approved claim, every approved claim resolves to at least one source, and every important claim has a primary source.
- [ ] **Step 3: Add the seven research records** with concise bilingual claims rather than copied documentation prose; use separate claims when different lessons may need independent future revalidation.
- [ ] **Step 4: Add tests for reverse dependency readiness** by resolving sources for representative claim IDs and confirming version-sensitive metadata survives lookup unchanged.
- [ ] **Step 5: Run `npm test -- tests/unit/foundations-research.test.ts tests/unit/research-catalog.test.ts`; expect PASS.**
- [ ] **Step 6: Commit with `content: add foundations research corpus`.**

### Task 5: Publish the first half of the sequential beginner package

**Files:**
- Create: `src/content/lessons/program-execution.ts`
- Create: `src/content/lessons/values-expressions.ts`
- Modify: `src/content/lessons/variables.ts`
- Create: `src/content/lessons/primitive-types.ts`
- Modify: `src/features/course/catalog.ts`
- Modify: `src/features/glossary/catalog.ts`
- Test: `tests/unit/foundations-lessons-part1.test.ts`

**Interfaces:**
- Produces published sequence: `program-execution` → `values-expressions` → `variables` → `primitive-types`.
- Each lesson supplies `conceptIds`, approved `claimIds`, explicit prerequisites, bilingual content, and at least one meaningful interaction.

- [ ] **Step 1: Write failing curriculum tests** for exact public order, prerequisite chain, bilingual titles/blocks/exercise feedback, and claim resolution for all four lessons.
- [ ] **Step 2: Write failing pedagogy tests** asserting each lesson contains at least one prediction/manipulation/checkpoint activity and that no exercise declares a concept prerequisite not introduced earlier in the public sequence.
- [ ] **Step 3: Author `program-execution` and `values-expressions`** using plain language first, then professional terminology; keep code examples minimal and browser-honest.
- [ ] **Step 4: Expand/migrate `variables` and author `primitive-types`** with progressive examples, substantive feedback, and approved claim references from Task 4.
- [ ] **Step 5: Add glossary entries introduced by these lessons, including value, expression, variable, assignment, type, string, number, and boolean with PT-BR/English parity.**
- [ ] **Step 6: Run targeted tests plus `npm run validate:content`; expect these four lessons to satisfy publication gates.**
- [ ] **Step 7: Commit with `content: publish first foundations lessons`.**
### Task 6: Publish operators, comparisons, and conditions with real-project context

**Files:**
- Create: `src/content/lessons/operators.ts`
- Create: `src/content/lessons/comparisons.ts`
- Create: `src/content/lessons/conditions.ts`
- Modify: `src/features/course/catalog.ts`
- Modify: `src/features/glossary/catalog.ts`
- Test: `tests/unit/foundations-lessons-part2.test.ts`
- Test: `tests/e2e/foundations-learning-flow.spec.ts`

**Interfaces:**
- Extends public sequence: `primitive-types` → `operators` → `comparisons` → `conditions`.
- Completes package `foundations-1` with seven published lessons total.

- [ ] **Step 1: Write failing tests** for exact package completion, published order, claim resolution, concept prerequisites, bilingual feedback, and at least two distinct exercise styles across these three lessons.
- [ ] **Step 2: Inspect `C:\Users\micke\Projects\rei-da-limonada-rio\game.js` read-only** and select only minimal excerpts whose surrounding context is sufficient for variables/operators/conditions; record file-path attribution in lesson content without modifying the source project.
- [ ] **Step 3: Author `operators` and `comparisons`** with executable JavaScript examples and feedback that distinguishes arithmetic, assignment, comparison, and boolean results.
- [ ] **Step 4: Author `conditions`** with prediction, bug-hunt or comparison activity, and a curated Rei da Limonada excerpt only where it reinforces already-taught concepts.
- [ ] **Step 5: Add glossary entries for operator, operand, comparison, condition, branch, truthy/falsy only when actually introduced; do not preteach later concepts.**
- [ ] **Step 6: Add an e2e learning-flow test** that navigates the seven-lesson sequence in both locales and confirms normal browser-code exercises remain usable.
- [ ] **Step 7: Run targeted tests and `npm run validate:content`; expect the complete `foundations-1` package to publish cleanly.**
- [ ] **Step 8: Commit with `content: complete first foundations package`.**

### Task 7: Resolve lesson sources from corpus and harden public roadmap/progress behavior

**Files:**
- Modify: `src/features/sources/SourceList.tsx`
- Modify: `src/features/lesson/LessonRenderer.tsx`
- Modify: `src/features/course/CourseRoadmap.tsx`
- Modify: `src/features/progress/ProgressSummary.tsx`
- Create: `src/features/research/lessonEvidence.ts`
- Test: `tests/components/lesson-evidence.test.tsx`
- Test: `tests/e2e/curriculum-phase2.spec.ts`

**Interfaces:**
- Produces: `getEvidenceForLesson(lesson: Lesson): { claims: ResearchClaim[]; sources: ResearchSource[] }` with stable de-duplication by source ID.
- Public recommendation chooses the first incomplete `publishedLessons` slug; it must not derive current position from raw `completedLessons.length`.

- [ ] **Step 1: Write failing component tests** proving a lesson's visible official-source list is resolved from claim references and duplicate sources appear only once.
- [ ] **Step 2: Write failing e2e tests** proving `technical-review` samples are absent from roadmap/routes and an old progress state containing `async-errors` or `client-server-boundaries` still recommends the first genuinely incomplete published lesson.
- [ ] **Step 3: Implement `getEvidenceForLesson()` and switch lesson source rendering to corpus-derived evidence; remove duplicate lesson-owned source metadata after all migrated lessons use claims.**
- [ ] **Step 4: Refactor roadmap/recommendation logic to compare completed slugs against `publishedLessons` rather than using completion count as an index.**
- [ ] **Step 5: Keep progress history intact** for unknown/hidden slugs but ignore those slugs when calculating public completion percentage and recommendation position.
- [ ] **Step 6: Run component/e2e tests; expect PASS in PT-BR and English.**
- [ ] **Step 7: Commit with `feat: connect lessons to corpus evidence`.**
### Task 8: Final content QA, maintenance metadata, and release verification

**Files:**
- Modify: `scripts/validate-content.ts`
- Modify: `docs/quality/foundation-slice-review.md`
- Create: `docs/quality/phase2-research-curriculum-review.md`
- Test: `tests/unit/publication-gates.test.ts`
- Test: `tests/e2e/curriculum-phase2.spec.ts`

**Interfaces:**
- Produces: final `npm run validate:content` report covering research, publication state, claim/source traceability, prerequisite graph, bilingual structure, and package completeness.

- [ ] **Step 1: Add failing tests** for stale version-sensitive research metadata, incomplete `foundations-1` package publication, broken claim-to-source links, and source → affected-lesson lookup returning stale lesson references.
- [ ] **Step 2: Implement maintenance metadata checks** without external crawling: version-sensitive records expose review priority and checked date; the validator flags structurally stale/invalid metadata but does not pretend to know that a remote doc changed.
- [ ] **Step 3: Add package-completeness validation** requiring all seven approved Phase 2 slugs to be `published` before `foundations-1` is considered complete.
- [ ] **Step 4: Run the full verification suite:** `npm run validate:content`, `npm test`, `npm run test:e2e`, `npm run build`.
- [ ] **Step 5: Perform explicit manual QA** of the seven-lesson flow on desktop/mobile, PT-BR/English, light/dark, including at least one wrong-answer path, one browser-code run, one source link, and progress resume.
- [ ] **Step 6: Record deferred issues only in `docs/quality/phase2-research-curriculum-review.md`; do not leave silent product TODOs.**
- [ ] **Step 7: Commit with `test: harden research-backed curriculum phase 2`.**

## Follow-up After Phase 2

Once this package is verified, continue with the same corpus-first package workflow rather than redesigning the system:

1. `foundations-2`: loops → functions → parameters/return → scope.
2. `foundations-3`: arrays → objects → basic errors/debugging → modules.
3. Reading real code and repository navigation.
4. Web foundations.
5. Only after the corpus has enough breadth, implement the separate DevPath AI Tutor plan against approved claim/source retrieval interfaces.

## Plan Self-Review Notes

- **Spec coverage:** research model, source policy, editorial states, package workflow, first seven topics, bilingual authoring, publishing gates, version sensitivity, AI-readiness, tests, error handling, and Phase 2 boundaries all map to Tasks 1-8.
- **Type consistency:** research IDs flow Task 1 → Task 4 → lessons Tasks 5-6 → evidence Task 7 → QA Task 8; public lesson lookup is intentionally separated from authoring lookup.
- **Review Focus coverage:** missing/unapproved claims (Task 3), malformed corpus records (Tasks 1/3), hidden editorial content (Tasks 2/7), stale progress slugs (Task 7), and prerequisite cycles/unpublished dependencies (Tasks 2/3) each have explicit tests.
- **Scope:** this plan intentionally stops after one complete seven-topic foundations package; later foundations and AI tutor remain separate follow-ups.
- **Proportion:** tasks specify stable interfaces and observable tests without transcribing implementation bodies.
