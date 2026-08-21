import type { SiteContent } from './types';

/**
 * ⚠️ Governed by `job_hunter/resumes/FACT_LEDGER.json`. Claim ids are cited on
 * every metric. Prose follows the ledger's attribution classes: CONTEXT for
 * scale worked inside, CAUSAL only for what he implemented.
 */
export const en: SiteContent = {
  profile: {
    name: 'Mohamed Abouassi',
    title: 'Senior Engineer — Mobile · Web · Backend',
    location: 'Riyadh, Saudi Arabia',
    status: 'Transferable Iqama · Available immediately',
    blurb:
      'I build the payment app that has to survive the regulator — and, increasingly, the console and the services behind it. Nearly six years across Flutter and Android, React and TypeScript on the web, and Java/Spring service work inside the same payment platforms.',
    email: 'mohamedabouassi@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/Abouassi98' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mohamed-abouassi' },
      { label: 'pub.dev', href: 'https://pub.dev/packages/card_hub' },
    ],
  },

  metrics: [
    {
      claimId: 'M-012',
      value: '1M+',
      label: 'downloads on Bravo',
      note: 'the consumer wallet I built; the milestone was announced publicly by the client in 2026',
      attribution: { kind: 'context', employer: 'Istinara-MATC' },
    },
    {
      claimId: 'M-001',
      value: '$5M+',
      label: 'processed',
      note: 'across the payment platform the wallet and its SDK served',
      attribution: { kind: 'context', employer: 'Istinara-MATC' },
    },
    {
      claimId: 'M-002',
      value: '384K+',
      label: 'wallets',
      note: 'on the same platform',
      attribution: { kind: 'context', employer: 'Istinara-MATC' },
    },
    {
      claimId: 'M-004',
      value: '4s → 1s',
      label: 'cold start',
      note: 'through deferred component loading, baseline profiles and lazy module initialisation',
      attribution: { kind: 'causal' },
    },
  ],

  tracks: [
    {
      id: 'mobile',
      name: 'Mobile',
      line: 'Where nearly six years of my career actually sits — Flutter and native Android, most of it in payments.',
      points: [
        'Built the Bravo consumer wallet and a hardened Android payment SDK from the ground up.',
        'Led the implementation of the mini-app runtime inside the wallet: a sandboxed host for third-party apps with origin isolation, install and lifecycle management, and a session-scoped capability registry.',
        'Payment security under a regulator — AES-256 at rest, certificate pinning over TLS 1.3, RASP app-shielding, device binding, NFC HCE for contactless terminals.',
        'Modular architecture at scale: Gradle multi-module on Android, Melos monorepos on Flutter, DDD boundaries on both.',
      ],
      stack: ['Flutter', 'Dart', 'Riverpod', 'Kotlin', 'Jetpack Compose', 'Coroutines/Flow', 'Melos', 'Gradle', 'Shorebird OTA'],
    },
    {
      id: 'web',
      name: 'Web',
      line: 'React and TypeScript — operations consoles, merchant tooling and internal platforms.',
      points: [
        'Built an operations dashboard on the Next.js App Router — typed route handlers behind session middleware, across the client, supplier and catalogue side of a B2B marketplace.',
        'Shipped realtime chat and a notification centre, spreadsheet export, image upload and supplier coverage-boundary editing.',
        'Built a merchant integrator console — credential and webhook management alongside transaction and settlement views.',
        'Full Arabic/English RTL in React: direction-aware theming, so layout, icons and charts mirror rather than only the copy translating.',
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'TanStack Query', 'TanStack Table', 'Tailwind CSS', 'Radix UI', 'Zod', 'React Testing Library'],
    },
    {
      id: 'backend',
      name: 'Backend',
      line: 'Java and Spring Boot, inside the payment platforms whose clients I also built.',
      points: [
        'Built a scoped authentication layer on Spring Security — an isolated filter surface with its own origin policy and availability gating, added alongside an existing chain without changing its behaviour.',
        'Wrote the integration test suite behind it: token handling, URI normalisation, rate-limit and regression coverage, with deterministic fakes for time and configuration state.',
        'Worked inside a ten-service Spring Boot estate — each service independently deployable, communicating over HTTP and a message broker, with PostgreSQL and Flyway per service.',
        'Contributed to double-entry ledger schema decisions and idempotent transfer handling on a live wallet core.',
      ],
      stack: ['Java 17/21', 'Spring Boot 3', 'Spring Security', 'Spring WebFlux', 'PostgreSQL', 'Flyway', 'Redis', 'RabbitMQ', 'JUnit'],
    },
  ],

  projects: [
    {
      id: 'bravo',
      name: 'Bravo — consumer wallet & mini-app platform',
      role: 'Senior Engineer',
      period: '2023 – present',
      domain: 'Fintech · Istinara-MATC',
      summary:
        'A consumer wallet that has since passed a million downloads, the hardened payment SDK behind it, and a mini-app runtime that lets third-party apps run inside it safely.',
      points: [
        'Built the wallet and the payment SDK from the ground up — isolated DI, MVI, and three layers of client security.',
        'Led the implementation of the mini-app runtime: origin isolation, install and lifecycle management, a session-scoped capability registry, and a bridge scope gate driven from a generated registry.',
        'Hardened mini-app telemetry — per-session budgets, redaction of analytics payloads and trace-id correlation.',
        'Built the matching scoped authentication layer on the server side in Spring Security. Both halves of the same feature.',
        "RASP app-shielding and device binding, wired to the app's own response policy.",
        'Dual push and crash reporting across FCM and Huawei HMS, so the wallet works on devices without Google Play Services.',
      ],
      tags: ['Flutter', 'Kotlin', 'Spring Security', 'Payments', 'Security'],
      links: [
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=istinara.bravocash' },
        { label: 'App Store', href: 'https://apps.apple.com/eg/app/bravo-sudan-pay/id1665773476' },
      ],
    },
    {
      id: 'daftarpay',
      name: 'Daftarpay — Android payment platform',
      role: 'Senior Mobile Engineer',
      period: '2024 – 2026',
      domain: 'Fintech · SAMA/PDPL-regulated',
      summary: 'A modular Kotlin/Compose payments platform, built for a regulated Saudi market.',
      points: [
        'Authored the high-level design and built the modular Gradle architecture behind it.',
        'SQLCipher AES-256 encryption wrapped by the Android Keystore, certificate pinning over TLS 1.3, and audit logging across nine event types.',
        'Dual-channel payment verification with atomic state locks, so a retried confirmation cannot double-charge.',
        'Cut cold start from roughly four seconds to about one, through deferred component loading, baseline profiles and lazy module initialisation.',
        'Ran 30+ technical interviews as the mobile team grew from three to seven, and mentored two engineers to senior.',
      ],
      tags: ['Kotlin', 'Jetpack Compose', 'Security', 'Performance'],
    },
    {
      id: 'mycity',
      name: 'MyCity — Riyadh Municipality services super-app',
      role: 'Full Stack Mobile Developer',
      period: '2026 – present',
      domain: 'Government · via World of System & Software',
      summary:
        'An established municipal services super-app in Flutter, joined mid-lifecycle inside a team of ten-plus contributors. I did not architect it.',
      points: [
        'Unblocked Android releases by resolving an AAR-metadata conflict on compileSdk 36, traced through Gradle’s project lifecycle.',
        'Implemented Hijri–Gregorian date conversion and pickers across the app.',
        'Removed locale coupling from the dual map-engine configuration, enabling English-ready map layers.',
        'Introduced a responsive form scaffold for tablet support in authentication and submission flows.',
      ],
      tags: ['Flutter', 'Gradle', 'Localization', 'Government'],
      links: [
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.alriyadh.mycity&hl=en' },
      ],
    },
    {
      id: 'mozodi',
      name: 'Mozodi — B2B commerce platform',
      role: 'Engineer (mobile & web)',
      period: '2021 – present',
      domain: 'B2B commerce · remote',
      summary: 'The mobile client, and later the Next.js operations dashboard and supplier portal.',
      points: [
        'Built a Melos monorepo — two apps, eight shared packages, sixteen feature modules — with end-to-end Google Maps integration.',
        'Built the operations dashboard on the Next.js App Router with typed route handlers behind session middleware.',
        'Realtime chat and a notification centre, spreadsheet export, image upload and supplier coverage boundaries.',
        'Arabic/English across the portals, and type-safe forms on React Hook Form with Zod schemas.',
        'Drove support resolution from 4.6 to 3.1 days with the in-app chat feature I built.',
      ],
      tags: ['Flutter', 'Next.js', 'TypeScript', 'TanStack'],
    },
    {
      id: 'alahram',
      name: 'Al-Ahram — finishing & décor',
      role: 'Mobile Engineer (Contract)',
      period: '2024',
      domain: 'Media group · field operations',
      summary: 'A three-app Melos monorepo on DDD, with independent release pipelines from a single codebase.',
      points: [
        'Architected the monorepo with ten-plus shared packages and independent release pipelines.',
        'Built a Drift-based offline data layer with Riverpod-scoped lifecycle management for field use.',
        'Held quality on a three-app release train with golden tests, custom lint rules and coverage reporting, plus an on-device PDF engine with Arabic RTL rendering.',
      ],
      tags: ['Flutter', 'Melos', 'Offline-first', 'DDD'],
      links: [
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.eg_alahram.alahram' },
      ],
    },
    {
      id: 'ledger-service',
      name: 'ledger-service — double-entry ledger',
      role: 'Author · personal project',
      period: '2026',
      domain: 'Open source · Java',
      summary:
        'A small, complete payments-shaped service: double-entry ledger, idempotent transfers, append-only journal. Written as a work sample, because the Spring work I do professionally sits in private client repositories.',
      points: [
        'A journal entry balances per currency, checked in the constructor — an unbalanced entry cannot be built, not merely cannot be saved.',
        'Money is BigDecimal with the scale pinned to the currency and rounding refused, so a stray fraction of a cent raises rather than disappears.',
        'Idempotent transfers: a key plus a request fingerprint, replay returns the original entry, a changed body is refused rather than replayed.',
        'Row locks taken in id order, balance read after the lock. Twenty threads released together prove no overspend and no deadlock.',
        'The journal is append-only at the database level; corrections are compensating entries, so the trail shows the error and the fix.',
        '69 tests, the integration ones on Testcontainers PostgreSQL rather than an in-memory stand-in.',
      ],
      tags: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Testcontainers'],
      links: [{ label: 'GitHub', href: 'https://github.com/Abouassi98/ledger-service' }],
    },
    {
      id: 'portfolio',
      name: 'This site',
      role: 'Author · personal project',
      period: '2026',
      domain: 'Open source · React & TypeScript',
      summary:
        'The site you are reading, written as a work sample in the stack it claims. The content is bound to a fact ledger, and two of that ledger\u2019s rules are enforced by the type system and the test suite rather than by review.',
      points: [
        'A discriminated union makes a borrowed-scale metric fail to compile unless it names the employer whose scale it borrows.',
        'A test fails the build if a retired claim or an unevidenced skill reappears in either locale, or if the two locales drift apart.',
        'Arabic and English with a persisted direction switch applied before first paint, logical properties throughout, and bidi isolation on numerals.',
        'Tabs and disclosures follow the WAI-ARIA patterns; arrow keys follow visual order, so they run backwards in Arabic on purpose.',
        'Lighthouse 100 across the board after replacing two render-blocking font families with one self-hosted variable font.',
      ],
      tags: ['React', 'TypeScript', 'Vitest', 'Accessibility', 'RTL'],
      links: [{ label: 'GitHub', href: 'https://github.com/Abouassi98/abouassi-portfolio' }],
    },
  ],

  experience: [
    { org: 'Riyadh Municipality (Amanat Al-Riyadh)', note: 'Employer of record: World of System & Software', role: 'Full Stack Mobile Developer', period: '04/2026 – Present', where: 'Riyadh, KSA' },
    { org: 'Istinara-MATC', role: 'Senior Engineer', period: '08/2023 – Present · full-time to 05/2024, consultant since', where: 'Cairo, Egypt' },
    { org: 'Mozodi', role: 'Engineer', period: '07/2021 – Present · remote; full-time, then part-time and contract', where: 'Kuwait (remote)' },
    { org: 'Daftarpay', role: 'Senior Mobile Engineer', period: '05/2024 – 04/2026', where: 'Riyadh, KSA' },
    { org: 'Al-Ahram Group', role: 'Mobile Engineer (Contract)', period: '2024', where: 'Remote' },
    { org: 'Elnooronline', role: 'Mobile Developer', period: '11/2020 – 05/2021', where: 'Alexandria, Egypt (remote)' },
  ],

  skills: [
    { group: 'Mobile', items: ['Flutter', 'Dart', 'Riverpod', 'BLoC', 'Melos', 'Kotlin', 'Jetpack Compose', 'Coroutines/Flow', 'Gradle multi-module', 'Shorebird OTA', 'Platform Channels'] },
    { group: 'Web', items: ['React', 'Next.js (App Router)', 'TypeScript', 'TanStack Query', 'TanStack Table', 'Redux Toolkit', 'Tailwind CSS', 'Radix UI', 'Material UI', 'Zod', 'i18next / RTL'] },
    { group: 'Backend', items: ['Java 17/21', 'Spring Boot 3', 'Spring Security', 'Spring WebFlux', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Redis', 'RabbitMQ', 'REST API design'] },
    { group: 'Security', items: ['AES-256', 'SQLCipher', 'Android Keystore', 'Certificate pinning (TLS 1.3)', 'RASP app-shielding', 'Device binding', 'NFC HCE', 'JWT', 'SAMA/PDPL-regulated delivery'] },
    { group: 'Architecture', items: ['Clean Architecture', 'Domain-Driven Design', 'MVI / MVVM', 'SDK design', 'Monorepos', 'Offline-first', 'Idempotency', 'Double-entry ledger modelling'] },
    { group: 'Testing & Delivery', items: ['React Testing Library', 'Jest', 'JUnit', 'Mockito', 'Widget & golden tests', 'Git', 'GitHub Actions', 'Docker', 'Fastlane', 'Codemagic', 'Sentry', 'Firebase'] },
  ],

  languages: 'Arabic (native) · English (professional) · German (A2, learning)',
  education: 'B.Sc. Computer Engineering — Tanta Higher Institute of Engineering and Technology, 2016 – 2021',

  ui: {
    skipToContent: 'Skip to content',
    nav: { work: 'Work', tracks: 'What I do', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
    heroCta: 'See the work',
    sections: {
      work: { eyebrow: 'Selected work', title: 'Products, not screenshots' },
      tracks: { eyebrow: 'What I do', title: 'Three tracks, one product mindset' },
      experience: { eyebrow: 'Experience', title: 'Where the work happened' },
      skills: { eyebrow: 'Skills', title: 'What I reach for' },
      contact: { eyebrow: 'Contact', title: 'Open to senior roles in Riyadh — and remote.' },
    },
    contactBlurb:
      'Mobile, web, or the payments platform behind both. In Riyadh on a transferable Iqama, available immediately.',
    localeSwitchLabel: 'العربية',
    externalLinkContext: (projectName) => `${projectName} — opens in a new tab`,
    builtWith: 'built with React, TypeScript and Vite',
  },
};
