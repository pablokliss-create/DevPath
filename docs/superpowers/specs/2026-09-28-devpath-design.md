# DevPath â€” Design Specification

**Date:** 2026-09-28  
**Status:** Awaiting user review  
**Product:** DevPath  
**Primary audience:** beginners in programming who want to understand code deeply enough to build, debug, explain, and maintain real software.

## 1. Product intent

DevPath is a bilingual PT-BR / English programming course delivered as a polished web application. It should teach from zero without treating the learner as incapable, and should gradually move from simple code reading to professional software development.

The course is designed around a "book + laboratory" model: explanations remain comfortable to read, while each important concept quickly turns into an activity, experiment, bug hunt, code trace, mini-lab, or project task.

The user wants the material to be accurate enough to share with colleagues. Technical claims therefore must be grounded primarily in official or primary documentation, with visible source references inside the lessons.

## 2. Success criteria

A learner who finishes the professional core should be able to open unfamiliar code, identify its structure, follow data and control flow, consult documentation, test a hypothesis, fix a bug, make a small change safely, and explain what changed.

The product succeeds when it is visually premium, easy to navigate, comfortable for long study sessions, useful on desktop and mobile, and meaningfully interactive without turning every lesson into the same repetitive template.

The first release does not require user accounts or cloud sync, but its architecture must make those additions possible later without rewriting lesson pages.
## 3. Product principles

1. **Plain language first, technical term second.** Explain the idea normally, then introduce the professional name and its English equivalent.
2. **Depth in layers.** The main path stays concise; optional expandable sections provide deeper detail without making every lesson feel like a wall of text.
3. **Practice before passive repetition.** Lessons should ask the learner to predict, trace, edit, compare, debug, or explain.
4. **Real code matters.** Existing user projects are used as contextual examples when they genuinely fit the concept.
5. **No fake interactivity.** Browser-compatible code may run in the browser; technologies that require servers, databases, Roblox Studio, or a local runtime use guided simulations and explicit PC labs instead of pretending to execute them.
6. **Primary-source accuracy.** Official documentation is the default technical reference.
7. **Freedom with guidance.** The learner receives a recommended path and prerequisite hints, but lessons are not hard-locked.
8. **Accessible by design.** Keyboard access, readable contrast, responsive layouts, reduced-motion support, and understandable feedback are part of the base product.

## 4. Visual direction

The chosen visual identity is **premium + tech**, avoiding excessive neon, gaming aesthetics, or decorative effects that compete with learning.

The site supports both light and dark themes. Light mode is the reading-first default design target, using a warm neutral background, strong typography, refined cards, and restrained blue/violet/cyan accents. Dark mode uses near-black graphite surfaces, careful contrast, and code-friendly panels.

The first visit follows the operating-system theme when available. A persistent manual theme switch is always available, and the learner's manual choice is remembered locally.
## 5. Main information architecture

Primary navigation is intentionally small: **Home Â· Course Â· Laboratory Â· Projects Â· Glossary Â· Progress**. Language and theme controls remain easy to reach without dominating the interface.

### Home

The home page uses a hybrid structure: a short introduction explains DevPath to a new visitor, followed immediately by the learner dashboard. Returning learners should reach their next useful action within seconds.

The dashboard includes overall progress, current module, "continue studying", recommended next lesson, professional-core roadmap, specialization cards, project-study links, and a compact explanation of the teaching method and source policy.

### Course map

The map is presented as a visual roadmap rather than a flat catalog. It shows the recommended order, prerequisite relationships, completed/current/upcoming states, and branching specializations. All lessons remain manually accessible.

### Lesson page

The lesson page is the center of the product. It uses a reading column plus contextual navigation/status information, with interactive blocks inserted at the point where they support understanding rather than collected only at the end.

### Laboratory and Projects

Laboratory collects runnable exercises and guided PC labs. Projects connects course concepts to selected real repositories, with explanations focused on the current learning objective rather than dumping whole codebases onto beginners.
## 6. Curriculum structure

The DevPath curriculum is organized into a professional core followed by specializations. The exact lesson count is driven by learning objectives, not by an arbitrary number.

### Professional core

1. Orientation: how programs execute, files, folders, terminals, editors, browsers, runtimes, and documentation.
2. Programming foundations: values, variables, types, operators, conditions, loops, functions, scope, collections, and basic debugging.
3. Reading real code: tracing execution, following state changes, understanding events, modules, dependencies, and unfamiliar repositories.
4. Web foundations: HTML, CSS, DOM, browser events, forms, accessibility basics, HTTP, and browser developer tools.
5. Modern JavaScript and TypeScript: modules, async code, promises, error handling, types, interfaces, generics at an appropriate depth, packages, and build tools.
6. Application structure: components, state, reusable logic, React fundamentals, routing, forms, and client-side data flows.
7. Backend and APIs: Node.js concepts, API design, validation, authentication concepts, errors, logging, and server-side data flow.
8. Data: relational modeling, SQL, persistence, migrations, transactions, indexes, and practical database reasoning.
9. Professional engineering: Git, branches, reviews, testing, debugging workflows, security foundations, performance, clean code, and maintainability.
10. Architecture and delivery: boundaries, services, client/server responsibilities, configuration, environments, deployment concepts, observability, and capstone integration.

### Specializations

After or alongside the later core modules, learners may enter focused tracks for **Web Full Stack, Mobile, Python, Games/Roblox, Bots/Automation, and AI for Developers**.

Each specialization reuses core concepts instead of reteaching them from zero, while adding the platform-specific tools, runtime behavior, architecture, and debugging workflows that matter for that domain.
## 7. Lesson model

A lesson is assembled from reusable content blocks rather than hand-coded as a unique page. This supports consistency, bilingual content, testing, and future content maintenance.

Typical blocks include: concept explanation, analogy, worked example, annotated code, line-by-line trace, prediction question, multiple choice, reorder code, fill-the-gap, bug hunt, compare-solutions task, runnable editor, guided PC lab, project excerpt, glossary terms, recap, reflection prompt, and official sources.

The standard learning rhythm is **understand â†’ predict â†’ manipulate â†’ test â†’ explain â†’ apply â†’ review**, but not every lesson must use every step. Variety is deliberate.

Optional "understand more" sections hold extra depth such as runtime details, edge cases, historical context, or professional terminology. They are expandable so the main lesson remains readable.

A lesson is not automatically considered learned because the page was scrolled. Completion may require the learner to explicitly mark it complete and, for selected lessons, finish one meaningful interaction or checkpoint.

## 8. Bilingual content model

PT-BR and English are first-class versions of the course. The language switch translates navigation, lesson content, exercises, explanations, feedback, glossary entries, and accessibility text.

Code remains code. Technical terms may show the commonly used English term next to the Portuguese explanation when that improves professional vocabulary, for example **escopo (scope)**.

Content storage should keep both language versions structurally aligned so a lesson cannot silently gain exercises or sections in one language only.

## 9. Source and verification policy

Every substantial technical lesson includes a **Fontes oficiais / Official sources** section. Sources should prefer official or primary documentation such as MDN and standards material for the Web, TypeScript documentation, React and Next.js documentation, Node.js documentation, Python documentation, Git documentation, GitHub documentation, Expo and React Native documentation, Roblox Creator documentation, Stripe documentation when applicable, and OWASP for security guidance.

Course content should record the date it was last technically reviewed. Version-sensitive lessons should state the relevant version or clearly explain when the material is version-independent.

Secondary sources may be used for teaching perspective, but not as the sole basis for important technical claims when primary documentation exists.
## 10. Project integration

Real projects are introduced only where they strengthen the lesson. Early lessons may use the simple browser game `rei-da-limonada-rio` to teach variables, functions, conditions, DOM events, and state. More advanced modules may use `discord-server-bot` for event-driven Node.js, `painel-controle` for TypeScript/mobile concepts, and `roblox-fps-pvp` for client/server authority, services, persistence, and larger-system architecture.

Project excerpts must be curated. A beginner should see the minimum relevant context, a file-path breadcrumb, a plain-language explanation of what the code is responsible for, and links to the prerequisite concepts needed to understand it.

The course must not modify those existing projects merely to make them easier to teach. DevPath explains real code as it exists, while separate exercises can use simplified examples.

## 11. Technical architecture

The recommended application stack is **Next.js + TypeScript**. Course content is separated from UI implementation so lessons can evolve without coupling content to page components.

The application is divided into clear units: course/content domain, bilingual localization, lesson renderer, interactive exercise engine, browser code runner, progress domain, project-example catalog, glossary/search domain, theme/UI system, and source metadata.

Lesson content is data-driven with a typed schema. Rendering components depend on the schema rather than importing lesson-specific implementation. Interactive blocks expose a small stable interface so new exercise types can be added without rewriting lesson pages.

Progress uses a repository/service boundary. Version one uses local browser storage. Future account/cloud implementations can satisfy the same interface, allowing sync to be added without changing every consumer.

Browser execution is limited to code that can be safely and honestly supported in that environment. JavaScript runs in an isolated sandbox/worker strategy. TypeScript may be transpiled/checked in-browser before execution. Backend, Python, database, and Roblox lessons use guided simulations or explicit local-machine labs unless a future secure remote runtime is deliberately added.
## 12. Progress data and learner state

The first implementation stores learner state locally. The state model should include at minimum: completed lessons, last visited lesson, quiz/checkpoint results, attempted challenges, completed challenges, selected specialization, language, theme preference, and content/schema version needed for safe migrations.

Storage failures must never make the course unusable. The UI should continue to display lessons and clearly report when progress could not be saved. Invalid or older local data should be validated and migrated or safely reset with an understandable recovery path rather than crashing the application.

## 13. Error handling and feedback

Exercise feedback explains *why* an answer succeeds or fails instead of showing only red/green states. Runtime errors in browser labs are captured and presented as learning opportunities with the original error, a plain-language interpretation where appropriate, and links back to the relevant lesson concepts.

Broken optional integrations or unavailable browser capabilities should degrade gracefully. The learner must always know whether a failure came from their code, the exercise environment, or the application itself.

External documentation links open predictably and are clearly labeled. A lesson remains usable if an external source is temporarily unavailable.

## 14. Accessibility and responsive behavior

Core flows must work by keyboard and use semantic HTML. Focus state must remain visible. Interactive feedback must not depend only on color. Code areas require readable font sizing and horizontal overflow handling. Motion respects `prefers-reduced-motion`.

The responsive design is not a compressed desktop layout. On smaller screens, secondary sidebars become drawers or inline sections, roadmap views adapt to a vertical flow, and exercises preserve sufficiently large touch targets.

Both PT-BR and English versions must be checked for layout expansion, because text lengths differ substantially between languages.
## 15. Testing and release quality

Before broad content expansion, DevPath must prove the learning model with representative lessons from the beginning, middle, and advanced portions of the curriculum. Tests cover lesson rendering, PT-BR/English parity, light/dark themes, progress persistence and migration, quizzes/checkpoints, browser code execution, navigation, source links, accessibility basics, responsive layouts, and production builds.

Critical learning flows receive automated tests where practical, while visual and mobile behavior receive explicit manual QA. Browser labs must test success, syntax/runtime failure, timeout or runaway-code protection, reset behavior, and isolation between attempts.

## 16. Delivery strategy

Implementation should proceed vertically rather than creating hundreds of static lessons first. The first product slice proves the design system, bilingual content schema, lesson renderer, progress layer, one or more interactive exercise types, source metadata, and a small representative curriculum sample.

Only after that slice is validated should lesson production scale across the professional core and specializations. This reduces the risk of multiplying a weak lesson format or brittle content schema across the entire course.

## 17. First-release boundaries

Version one does **not** require login, cloud synchronization, payments, social rankings, streak pressure, certificates, live human tutoring, or a remote multi-language execution server. These can be considered later only when they clearly improve learning or distribution.

The product also avoids hard-locking lessons, fake completion based solely on scroll position, excessive gamification, unexplained jargon, and unsourced technical claims.

## 18. Research corpus and source pipeline

DevPath should maintain a structured programming knowledge corpus used to author and review lessons. The goal is not to copy documentation into the product, but to keep each lesson traceable to current, authoritative material.

The research pipeline may combine multiple source classes when they are useful: official documentation websites, standards/specifications, official PDFs and manuals, official or canonical GitHub repositories, release notes/changelogs, Context7 for current library documentation and examples when connected, the user's own repositories for real-project examples, and carefully selected secondary material only when it adds teaching context.

Tool choice is relevance-based rather than "use every plugin regardless of purpose". GitHub is used for canonical source code, releases, examples, issues, and project history; web research is used for current official docs and standards; PDF/document tools are used for specifications and manuals; Context7 is preferred for version-sensitive library/API lookups when available; design tools such as Figma may support interface review but are not treated as technical authorities.

Each lesson's research record should capture at least: topic, technology/library, relevant version, source title, source URL or repository reference, source type, date checked, specific claim/concept supported, and whether the source is primary or supplementary.

When sources disagree, DevPath should prefer the authoritative source for the relevant version and explicitly note meaningful version differences instead of silently averaging conflicting information. Examples taken from repositories must be checked against the documented API and the version used in the lesson.

The corpus should support periodic review. Version-sensitive lessons can be flagged when a dependency or platform releases a major update, so outdated material can be rechecked before being presented as current.

This source pipeline is part of content quality, not an optional bibliography step. A lesson is not ready for publication until its important technical claims have traceable support and its examples have been validated against the intended environment.
## 19. DevPath AI tutor

DevPath includes a contextual AI tutor opened from a persistent button into a panel that slides from right to left. The tutor is part of the learning experience, not a general-purpose assistant.

The tutor receives the current lesson, module, exercise, relevant glossary concepts, and approved course-source context when useful. It should be able to explain a line of code, rephrase a concept, connect the current question to a previous lesson, interpret common errors, and suggest where in the course the learner should review a prerequisite.

The tutor follows a **hints-first** teaching policy for exercises. Its default escalation path is: ask a guiding question or give a small clue, then give a stronger clue, then explain the relevant concept, and only reveal a complete solution when the learner has attempted the task or explicitly asks to reveal it. When revealing a full answer, it should still explain the reasoning rather than output only final code.

The tutor must stay inside the DevPath scope. Questions unrelated to programming, software development, the course, or the approved technical corpus receive a brief scope message instead of a general answer. It must not pretend to know material that is absent from the approved corpus; uncertainty should be stated clearly.

### Read-only security boundary

The AI tutor is structurally read-only. It is not given tools or credentials that can edit course content, modify source files, execute administrative commands, change deployment configuration, mutate the knowledge base, delete records, or perform privileged actions on behalf of the learner.

Protection must not depend only on a system prompt. Server-side capability restrictions, allowlisted retrieval sources, request validation, rate/size limits, secret isolation, and output handling form the real security boundary. Retrieved documents and learner-provided text are treated as untrusted input so prompt-injection instructions inside content cannot grant new capabilities.

The tutor may read learner context needed for teaching, such as the current page and exercise state, but any future access to personal account data must be explicitly scoped and minimized. The first release should avoid unnecessary personal-data collection.

Answers should cite or identify the relevant DevPath lesson and approved technical source when practical, especially for version-sensitive or factual technical explanations.

The AI integration should sit behind a provider-agnostic server interface so model/provider changes do not require rewriting lesson components. The interface separates retrieval, policy/scope checks, model generation, and UI streaming so each layer can be tested independently.
### Hint quality requirements

The DevPath AI tutor must provide **substantive hints**, not filler. Responses such as "read the question again", "try again", "think harder", or equivalent generic nudges do not count as useful help and should not be used in place of teaching.

A useful hint should measurably reduce uncertainty while preserving part of the challenge. Depending on the exercise, the tutor may identify the exact concept involved, point to a relevant line or condition, trace one execution step, explain a runtime or syntax error, show a smaller analogous example, eliminate an incorrect approach, provide a partial code scaffold, or ask one specific guiding question that advances the solution.

Hint escalation is adaptive: concrete clue -> stronger clue or partial worked step -> direct concept explanation tied to the learner's code -> full solution when the learner has made a reasonable attempt or explicitly requests reveal. If the learner remains stuck, the tutor becomes more explicit instead of repeating the same vague advice in different words.

When a full solution is revealed, it must explain why it works and what reasoning gap or mistake was involved. The goal is to help the learner progress, not to create artificial friction.

## 20. Approved design summary

DevPath is a premium-tech, bilingual programming learning platform built around comfortable reading plus meaningful practice. It uses Next.js and TypeScript, data-driven lessons, a traceable official-source research corpus, local-first progress with future sync boundaries, browser labs where technically honest, guided PC labs elsewhere, real-project examples, accessible light/dark themes, a recommended but unlocked roadmap, a strong professional core, optional specialization tracks, and a read-only contextual AI tutor that stays within DevPath's educational scope and gives substantive hints before revealing solutions.

This specification captures the design decisions approved in conversation. Product implementation begins only after this written specification is reviewed and approved, followed by a separate implementation plan.
