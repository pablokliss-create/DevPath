# DevPath Phase 2 — Research Corpus + Curriculum Expansion

**Date:** 2026-09-28
**Status:** Awaiting user review
**Depends on:** `2026-09-28-devpath-design.md`

## 1. Goal

Phase 2 turns DevPath from a validated three-lesson vertical slice into a trustworthy, sequential beginner curriculum backed by a structured technical research corpus.

The phase deliberately combines two outputs:
- a reusable corpus that records what DevPath knows, why it believes it, and which source supports each important technical claim;
- the first complete sequential curriculum package, starting from zero and progressing through conditions without conceptual gaps.

This phase does not implement the DevPath AI tutor yet. It prepares the tutor's future retrieval base by making course knowledge auditable, scoped, and source-grounded.

## 2. Product outcome

At the end of this phase, a beginner should be able to start at the beginning of DevPath and study a coherent path through initial programming foundations rather than jumping between representative sample lessons.

The content-production system should also be ready to repeat the same research → lesson → validation workflow for later packages such as loops, functions, collections, debugging, web development, and specializations.

## 3. Research corpus model

The corpus is not a link collection. It is a structured knowledge layer separated from lesson prose.

Each research record should have a stable ID and include: topic, technology or platform, relevant version when applicable, one or more technical claims, source references, source type, primary/supplementary classification, checked date, version sensitivity, related concepts, and lesson references.

Important claims should be traceable to specific source records instead of relying only on a bibliography at the end of the lesson.

This creates a dependency graph:

`source -> research record -> claim -> lesson`

That graph enables later impact analysis. If a source or platform changes, DevPath can identify which claims and lessons require re-review.

The corpus should store summaries and structured claim metadata, not wholesale copies of copyrighted documentation.

## 4. Source policy

Official and primary sources remain the default authority. For the initial JavaScript package, MDN and ECMAScript material are preferred where appropriate. Canonical GitHub repositories, release notes, specifications, official PDFs, and official product documentation may also be used when relevant.

Secondary material may improve pedagogy but cannot be the sole support for an important technical claim when a primary source exists.

Tool choice is relevance-based. Web research is appropriate for current official docs and standards; GitHub for canonical code, releases, examples, and history; PDFs for authoritative manuals/specifications; documentation connectors such as Context7 may assist version-sensitive research when available, but approved corpus records must remain auditable to their underlying technical sources.

The checked date records when DevPath verified a source or claim. It is not a substitute for the source publication date.

## 5. Editorial lifecycle

Lessons have explicit editorial states:
- `draft`: authoring or research is incomplete;
- `technical-review`: lesson structure is complete but technical verification is still pending;
- `published`: required research links, bilingual parity, exercises, prerequisites, and validation checks pass.

Normal learner-facing course navigation treats only `published` lessons as released curriculum. Internal development tooling and tests may load other states when needed.

Publishing must be determined by data and validation, not by a file merely existing under `src/content/lessons`.

## 6. Package-based production workflow

Content is produced in small subject packages rather than researching the entire programming field before writing lessons.

Each package follows:

`scope learning objectives -> research official sources -> record claims -> validate examples -> author PT-BR -> author natural English -> create exercises -> link glossary/prerequisites -> technical validation -> pedagogical review -> publish`

Research and teaching therefore advance together. The corpus should never become a large disconnected archive that delays useful curriculum indefinitely.

## 7. First curriculum package

The first package covers the true beginning of the professional core:
1. how a program executes instructions;
2. values and expressions;
3. variables and assignment;
4. basic types;
5. operators;
6. comparisons;
7. conditions.

These are learning objectives, not a fixed seven-page count. A topic may span multiple lessons or share a lesson with a closely related topic when that produces a clearer sequence.

The package must avoid prerequisite jumps. Every published lesson declares what prior concepts it assumes, and validators confirm that those prerequisites exist and are published earlier in the recommended sequence.

## 8. Lesson design rules

Lessons continue using the approved book + laboratory model and the rhythm `understand -> predict -> manipulate -> test -> explain -> apply -> review`, selecting only the steps that improve the specific lesson.

Exercises should vary meaningfully: output prediction, state tracing, fill-gap, bug hunt, implementation comparison, small modifications, explanation prompts, and runnable browser JavaScript.

Repetition is allowed only when it adds a new reasoning demand. The course must not inflate activity counts with near-duplicate questions.

Real-project excerpts are introduced only after the necessary concepts have been taught. The simple `rei-da-limonada-rio` project is preferred for early examples involving state, money, inventory, conditions, and later functions.

## 9. Bilingual authoring

PT-BR and English are structurally equal course versions. They must contain the same learning objectives, exercises, claims, and source relationships, while allowing natural wording in each language.

Technical vocabulary is introduced with professional English terminology when useful, such as `atribuição (assignment)`, `escopo (scope)`, and `valor de retorno (return value)`.

## 10. Validation and publishing gates

`validate:content` should evolve from structural checks into a publishing gate. Published lessons must fail validation when they contain an important technical claim with no approved research reference, broken corpus references, missing required primary-source support, invalid source metadata, bilingual structural mismatch, broken prerequisites, or malformed exercises.

The validator should also ensure prerequisite order is coherent for the recommended sequence and that unpublished prerequisites are not silently required by a published lesson.

Exercise validation should cover required answers, minimum/valid options for multiple choice, unique IDs, supported runner languages, and any exercise-specific fields needed to render or grade honestly.

## 11. Version sensitivity and maintenance

Research records distinguish stable fundamentals from version-sensitive APIs and frameworks. Stable concepts may have long review intervals; version-sensitive records carry explicit versions and higher review priority.

The data model must support future stale-content reporting, for example identifying all published lessons that depend on a record for an older major Next.js or React version. Automated release monitoring is outside this phase; the required outcome is the metadata and dependency graph that makes it possible later.

## 12. Architecture boundaries

Research records, lesson records, source metadata, and curriculum sequencing should remain separate modules with typed interfaces. The lesson renderer should not understand research internals; it receives resolved lesson/source information through the course/content domain.

A research record should be independently testable and reusable by multiple lessons. A lesson should reference stable record/claim IDs rather than duplicating research metadata across every block.

The existing progress, theme, runner, and navigation interfaces should not be restructured unless this phase exposes a direct compatibility problem.

## 13. Future AI tutor compatibility

The approved corpus becomes the primary factual retrieval layer for the future DevPath AI tutor. The live tutor should use published DevPath content and approved corpus material rather than unrestricted web browsing per learner request.

This phase does not add model APIs, chat UI, vector search, embeddings, or tutor permissions. It only ensures that future retrieval has clean source IDs, claims, relationships, versions, and publication state.

## 14. Testing strategy

This phase adds tests for the research schema, claim-to-source relationships, editorial state transitions, publishing rules, curriculum order, prerequisite coherence, bilingual parity, exercise integrity, and source/version metadata.

Representative lesson tests should verify both pedagogy and mechanics: the learner can navigate the sequence, exercises render and grade correctly, browser labs still isolate learner code, and published lessons expose their official sources without leaking internal research structures into the UI.

Content tests should answer machine-checkable questions such as: Which claims support this lesson? Which published lessons depend on this research record? Does every published prerequisite precede the lesson? Does any published lesson reference a draft or missing research record?

The existing full verification suite remains mandatory: content validation, unit/component tests, end-to-end tests, and production build.

## 15. Error handling

Missing or invalid research references must fail validation before publication rather than crashing a learner-facing page. Draft content may be incomplete, but published content cannot silently degrade its technical traceability.

If a source URL becomes temporarily unavailable, the lesson remains usable; the corpus records the source reference and review metadata while maintenance tooling flags the source for recheck. Source-network availability is not a runtime dependency for reading a published lesson.

Research ingestion or authoring helpers must never overwrite approved records silently. Stable IDs and explicit review states are preferred over implicit replacement.

## 16. Scope boundaries for Phase 2

Included: corpus schemas and records, claim/source relationships, editorial states, stronger validators, first sequential foundations package, glossary/prerequisite integration, representative real-project excerpts where appropriate, and tests for all new publishing rules.

Excluded: DevPath AI Tutor implementation, unrestricted automated crawling, vector databases, embeddings, account/cloud sync, full professional-core completion, all specialization tracks, and automated release monitoring.

The phase is complete when its infrastructure is reusable and the first package is good enough to serve as the template for subsequent curriculum batches.

## 17. Success criteria

Phase 2 succeeds when:
- a new technical claim can be added once to the corpus and reused by multiple lessons;
- published lessons are blocked when required research/source relationships are invalid;
- the learner can follow the first foundations package sequentially without conceptual gaps;
- PT-BR and English remain structurally aligned;
- exercises are varied and technically honest;
- existing DevPath navigation, progress, theme, accessibility, and browser-runner quality remain intact;
- later curriculum packages can follow the same workflow without redesigning the content architecture.

## 18. Recommended continuation after Phase 2

After validating this package, curriculum expansion should continue in order: loops -> functions -> parameters and return values -> scope -> arrays -> objects -> basic debugging -> modules -> reading real code -> web foundations.

The same research-package workflow should then extend into TypeScript, React, backend/API, databases, professional engineering, architecture, and specializations.

The DevPath AI Tutor should be implemented only after enough approved corpus and published curriculum exist to make its scoped retrieval genuinely useful.

## 19. Approved design summary

Phase 2 adopts a hybrid package-based workflow: research only the next coherent set of learning objectives, record important claims against authoritative sources, immediately turn that approved knowledge into bilingual lessons and meaningful exercises, validate publication automatically, and then advance to the next package.

Research data and pedagogical content remain separate but connected through stable IDs. This gives DevPath both a maintainable curriculum and the grounded knowledge layer required for later AI tutoring.

Implementation begins only after this written specification is reviewed and explicitly approved, followed by a separate implementation plan.
