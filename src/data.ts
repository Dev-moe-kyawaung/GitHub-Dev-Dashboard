export const PROFILE = {
  name: "Moe Kyaw Aung",
  mmName: "မိုးကျော်အောင်",
  username: "Dev-moe-kyawaung",
  org: "moekyawaung-tech",
  title: "Senior Android Developer",
  bio: "Building offline-first Android & full-stack systems. POS platforms, media pipelines, realtime dashboards — committed in the open.",
  location: "Tachileik, MM ↔ Bangkok, TH",
  email: "moekyawaung@programmer.net",
  phonePrimary: "+95 9 889 000 889",
  phoneSecondary: "+959 666 000 050",
  github: "https://github.com/Dev-moe-kyawaung/",
  githubOrg: "https://github.com/moekyawaung-tech/",
  gravatar: "https://gravatar.com/moekyawaung2026",
  linkedin: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1",
  portrait:
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
  avatar:
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
};

export type Repo = {
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  release?: string;
  updated: string;
  url: string;
  live?: string;
  liveLabel?: string;
  contributions: string[];
  tags: string[];
};

export const PINNED_REPOS: Repo[] = [
  {
    name: "POS-Ultimate-Pro-Max",
    fullName: "moekyawaung-tech / POS-Ultimate-Pro-Max",
    description: "Enterprise offline-first POS — 4th generation. Sync engine, tax tiers, multi-terminal shifts.",
    language: "Kotlin",
    languageColor: "#A97BFF",
    stars: 48,
    forks: 12,
    release: "v4.2.0",
    updated: "Feb 2026",
    url: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    contributions: [
      "Designed the Room schema + durable WorkManager sync queue with idempotency keys",
      "Built the Compose checkout, receipt (ESC/POS) and shift-close flows",
      "Cut low-end transaction time to <400ms with indexed queries + transaction batching",
    ],
    tags: ["Kotlin", "Compose", "Room", "Offline-first"],
  },
  {
    name: "video-player",
    fullName: "moekyawaung-tech / video-player",
    description: "Gesture-driven HLS player on Media3. Adaptive bitrate, frame-step seek, offline cache.",
    language: "Kotlin",
    languageColor: "#A97BFF",
    stars: 31,
    forks: 7,
    release: "v2.4.1",
    updated: "Jan 2026",
    url: "https://github.com/moekyawaung-tech/video-player",
    live: "https://github.com/moekyawaung-tech/video-player",
    liveLabel: "Source + demo clip",
    contributions: [
      "Wrote the custom Media3 buffering strategy and ABR ladder",
      "Implemented gesture volume/brightness overlays at 60fps without UI jank",
      "Added offline segment downloader with resume support",
    ],
    tags: ["Media3", "ExoPlayer", "Compose"],
  },
  {
    name: "social-dashboard",
    fullName: "moekyawaung-tech / social-dashboard",
    description: "Realtime analytics console — modular widgets, live feed aggregation, Lighthouse 100.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 36,
    forks: 9,
    release: "v3.1.0",
    updated: "Feb 2026",
    url: "https://github.com/moekyawaung-tech/social-dashboard",
    live: "https://moekyawaung.lovable.app",
    liveLabel: "Live demo",
    contributions: [
      "Built the widget dock architecture + single realtime store",
      "Shipped code-split routes and cache-first data layer for <1.2s cold start",
      "Added exportable reports and role-gated routes",
    ],
    tags: ["React", "TypeScript", "Recharts"],
  },
  {
    name: "pwa-app",
    fullName: "moekyawaung-tech / pwa-app",
    description: "Installable offline-first shell. Cache router, background sync, push-ready.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 22,
    forks: 5,
    release: "v1.9.0",
    updated: "Dec 2025",
    url: "https://github.com/moekyawaung-tech/pwa-app",
    live: "https://moekyawaung-tech.github.io/",
    liveLabel: "Live PWA",
    contributions: [
      "Designed the service-worker cache strategies per route class",
      "Built the IndexedDB outbox + background-sync flush",
      "Hit 100/100 Lighthouse PWA with skeleton-first rendering",
    ],
    tags: ["PWA", "Vite", "IndexedDB"],
  },
  {
    name: "game-collection",
    fullName: "moekyawaung-tech / game-collection",
    description: "Arcade vault on one deterministic 60fps loop. Shared input + hi-score store.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 18,
    forks: 4,
    release: "v1.4.0",
    updated: "Nov 2025",
    url: "https://github.com/moekyawaung-tech/game-collection",
    contributions: [
      "Extracted the shared game-loop, input manager and persistence layer",
      "Ported 5 games onto the engine with zero per-game boilerplate",
      "Added WebAudio SFX bus with mute + volume persistence",
    ],
    tags: ["Canvas", "WebAudio", "Game loop"],
  },
  {
    name: "Weather-app",
    fullName: "moekyawaung-tech / Weather-app",
    description: "Hyperlocal forecast deck — hourly ribbon, radar overlay, offline readings.",
    language: "Kotlin",
    languageColor: "#A97BFF",
    stars: 15,
    forks: 3,
    release: "v2.0.3",
    updated: "Oct 2025",
    url: "https://github.com/moekyawaung-tech/Weather-app",
    contributions: [
      "Built the forecast repository with geo fallback + offline cache",
      "Implemented the hourly ribbon and severe-alert pipeline",
      "Added widget + notification channel support",
    ],
    tags: ["Kotlin", "Retrofit", "WorkManager"],
  },
];

export const MORE_REPOS: Repo[] = [
  {
    name: "POS-Full-Version",
    fullName: "moekyawaung-tech / POS-Full-Version",
    description: "Gen-1 retail POS. Sales, receipts, tax tiers — the foundation the suite grew from.",
    language: "Kotlin",
    languageColor: "#A97BFF",
    stars: 12,
    forks: 3,
    release: "v1.8.0",
    updated: "2024",
    url: "https://github.com/moekyawaung-tech/POS-Full-Version",
    contributions: [
      "Scaffolded the original sales + receipt modules",
      "Established the Room entities later reused by all 4 generations",
    ],
    tags: ["Kotlin", "Room"],
  },
  {
    name: "Advance-POS-Version",
    fullName: "moekyawaung-tech / Advance-POS-Version",
    description: "Gen-2 POS with multi-terminal support and shift management.",
    language: "Kotlin",
    languageColor: "#A97BFF",
    stars: 11,
    forks: 2,
    release: "v2.6.0",
    updated: "2024",
    url: "https://github.com/moekyawaung-tech/Advance-POS-Version",
    contributions: [
      "Added terminal pairing + shift open/close reconciliation",
      "Migrated checkout to early Compose screens",
    ],
    tags: ["Kotlin", "Compose"],
  },
  {
    name: "javascript-todo",
    fullName: "moekyawaung-tech / javascript-todo",
    description: "Zero-dependency Kanban. Drag-sort, subtasks, filter grammar, snapshots.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 9,
    forks: 2,
    release: "v1.2.0",
    updated: "2024",
    url: "https://github.com/moekyawaung-tech/javascript-todo",
    live: "https://moekyawaung-tech.github.io/",
    liveLabel: "Live demo",
    contributions: [
      "Built the drag-ordering engine + filter grammar from scratch",
      "Added localStorage snapshots with schema versioning",
    ],
    tags: ["JavaScript", "DnD"],
  },
  {
    name: "Job-Portal-App",
    fullName: "moekyawaung-tech / Job-Portal-App",
    description: "Job board with saved searches, application tracker, employer dashboard.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 8,
    forks: 1,
    updated: "2024",
    url: "https://github.com/moekyawaung-tech/Job-Portal-App",
    contributions: [
      "Built the listings search + filter pipeline",
      "Implemented the application state machine end-to-end",
    ],
    tags: ["React", "TypeScript"],
  },
];

export const FEATURED_ANDROID = [
  {
    id: "pos-suite",
    name: "POS Suite — 4 generations",
    oneLiner: "From single-terminal sales to multi-terminal enterprise sync.",
    bullets: [
      "Full → Advance → Ultimate → Pro Max: each generation is a public repo",
      "Atomic Room transactions keep money flows safe under concurrency",
      "ESC/POS printing, tax tiers, refunds, shift audits — all offline-capable",
    ],
    metric: "150+ txn/min",
    metricLabel: "sustained offline throughput",
    image:
      "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp",
    repo: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    stack: ["Kotlin", "Compose", "Room", "Hilt"],
  },
  {
    id: "media",
    name: "Media pipeline — Video Player",
    oneLiner: "A player engineered like infrastructure, not a screen.",
    bullets: [
      "Custom Media3 buffering + ABR ladder tuned for budget hardware",
      "Gesture transport rendered at 60fps, decoupled from playback state",
      "Offline segment cache for tunnels, rural routes, and 2G",
    ],
    metric: "−34% freezes",
    metricLabel: "measured rebuffering drop",
    image:
      "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_13_i4bao3.webp",
    repo: "https://github.com/moekyawaung-tech/video-player",
    stack: ["Media3", "ExoPlayer", "Coroutines"],
  },
  {
    id: "weather",
    name: "Weather + field-ready apps",
    oneLiner: "Small apps held to the same bar as flagships.",
    bullets: [
      "Weather-app: geo fallback, radar overlay, widget + alerts",
      "Snake, planner, todo: shared persistence + release discipline",
      "Every repo ships a README, screenshots, and a tagged release",
    ],
    metric: "16 apps",
    metricLabel: "in production, all public",
    image:
      "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_11_jbijtv.webp",
    repo: "https://github.com/moekyawaung-tech/Weather-app",
    stack: ["Kotlin", "Retrofit", "WorkManager"],
  },
];

export const WRITING = [
  {
    title: "Offline-first sync that survives the field",
    excerpt: "Room-first writes, durable queues, idempotency keys, and reconnect reconciliation — the exact pattern behind the POS suite.",
    tag: "Architecture",
    date: "Jan 2026",
    minutes: 8,
    file: "notes/offline-first-sync.md",
  },
  {
    title: "Compose performance: what actually moved the needle",
    excerpt: "Stability, derivedStateOf, lazy-list keys, and baseline profiles — measured before/after on a low-end device.",
    tag: "Android",
    date: "Dec 2025",
    minutes: 6,
    file: "notes/compose-performance.md",
  },
  {
    title: "Room transactions for money flows",
    excerpt: "Why receipts print last, how refunds stay idempotent, and the audit table that saved a shop dispute.",
    tag: "Data",
    date: "Nov 2025",
    minutes: 7,
    file: "notes/room-money-flows.md",
  },
  {
    title: "Media3 buffering, explained with diagrams",
    excerpt: "LoadControl tuning, ABR decisions, and the segment cache that keeps video alive in tunnels.",
    tag: "Media",
    date: "Oct 2025",
    minutes: 9,
    file: "notes/media3-buffering.md",
  },
  {
    title: "Securing a retail Android app",
    excerpt: "Encrypted stores, session audits, permission-minimal manifests, and what I run before every release.",
    tag: "Security",
    date: "Sep 2025",
    minutes: 6,
    file: "notes/securing-retail-android.md",
  },
  {
    title: "Release checklist I use for every app",
    excerpt: "Versioning, changelogs, staged rollouts, crash-free gates — the boring list that prevents bad weeks.",
    tag: "Process",
    date: "Aug 2025",
    minutes: 5,
    file: "notes/release-checklist.md",
  },
];

export const PRINCIPLES = [
  {
    no: "01",
    title: "Local-first, always",
    text: "The database is the source of truth. Network is a sync detail — the UI never waits on it.",
    snippet: "db.withTransaction { insert(); enqueueSync() }",
  },
  {
    no: "02",
    title: "Unidirectional data flow",
    text: "One StateFlow per screen. Events down, intents up. No shared mutable state anywhere.",
    snippet: "uiState.collectAsStateWithLifecycle()",
  },
  {
    no: "03",
    title: "Money flows are sacred",
    text: "Sales, refunds, and stock move inside atomic transactions with idempotency keys and audit rows.",
    snippet: "idempotencyKey = saleId + terminalId",
  },
  {
    no: "04",
    title: "Modules with boundaries",
    text: "Feature modules depend on contracts, not implementations. Builds stay fast, teams stay parallel.",
    snippet: ":feature:checkout → :core:data",
  },
];

export const LANGUAGES = [
  { name: "Kotlin", pct: 46, color: "#A97BFF" },
  { name: "TypeScript", pct: 26, color: "#3178c6" },
  { name: "JavaScript", pct: 14, color: "#e3b341" },
  { name: "Java", pct: 8, color: "#b07219" },
  { name: "Other", pct: 6, color: "#6e7681" },
];

export const SKILL_GROUPS = [
  {
    title: "Android",
    items: ["Kotlin", "Jetpack Compose", "Coroutines / Flow", "Hilt", "Room / DataStore", "Media3 / ExoPlayer", "WorkManager", "Baseline Profiles"],
  },
  {
    title: "Quality & Release",
    items: ["Clean Architecture", "Multi-module Gradle", "Unit + UI testing", "Firebase Crashlytics", "Play staged rollouts", "Changelogs + versioning"],
  },
  {
    title: "Web & Backend",
    items: ["React / TypeScript", "Node / REST", "Tailwind systems", "PWA / Service Workers", "WebSockets", "Firebase Auth / FCM"],
  },
];

export const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Senior Android Developer",
    org: "Independent · MKA Technologies",
    place: "Tachileik / Bangkok",
    points: [
      "Own POS + media products end-to-end; 4 POS generations in live retail.",
      "Publish every system as a public repo with releases and docs.",
    ],
  },
  {
    period: "2022 — 2024",
    role: "Lead Mobile Engineer",
    org: "Southeast Mobile Systems",
    place: "Bangkok, TH",
    points: [
      "Led Compose migration across a multi-module codebase.",
      "Cut crash rates; mentored team on testing + secure storage.",
    ],
  },
  {
    period: "2020 — 2022",
    role: "Android & Web Developer",
    org: "Dynamic Digital Solutions",
    place: "Yangon, MM",
    points: [
      "Shipped dashboards and consumer apps in Kotlin + React.",
      "Specialized in cold-start speed and low-bandwidth resilience.",
    ],
  },
];

export const HIGHLIGHTS = [
  { value: "1,400+", label: "Public commits / year" },
  { value: "21+", label: "Public repositories" },
  { value: "43", label: "Pages + live demos" },
  { value: "120+", label: "Tagged releases" },
];
