import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  Check,
  Database,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  GitFork,
  Layers,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Tag,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import {
  EXPERIENCE,
  FEATURED_ANDROID,
  HIGHLIGHTS,
  LANGUAGES,
  MORE_REPOS,
  PINNED_REPOS,
  PRINCIPLES,
  PROFILE,
  SKILL_GROUPS,
  WRITING,
  type Repo,
} from "./data";

/* ---------------- small primitives ---------------- */

function GitHubMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionHead({
  kicker,
  title,
  blurb,
}: {
  kicker: string;
  title: string;
  blurb: string;
}) {
  return (
    <Reveal>
      <p className="label-mono flex items-center gap-3 text-[#58a6ff]">
        <span className="inline-block h-px w-8 bg-[#58a6ff]/60" aria-hidden />
        {kicker}
      </p>
      <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#8b949e]">{blurb}</p>
    </Reveal>
  );
}

/* ---------------- contribution graph ---------------- */

function levelFor(week: number, day: number): number {
  // deterministic, organic-looking activity
  const n = (week * 31 + day * 17 + ((week * day) % 13)) % 20;
  if (n < 4) return 0;
  if (n < 8) return 1;
  if (n < 12) return 2;
  if (n < 16) return 3;
  return 4;
}

const LEVEL_BG = [
  "bg-[#161b22] border border-[#21262d]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

function ContributionGraph() {
  const weeks = 30;
  const days = 7;
  const total = useRef(0);
  if (total.current === 0) {
    let t = 0;
    for (let w = 0; w < weeks; w++) for (let d = 0; d < days; d++) t += levelFor(w, d);
    total.current = t;
  }
  return (
    <div>
      <div
        className="grid auto-cols-min grid-flow-col gap-[3px] overflow-x-auto pb-1"
        role="img"
        aria-label={`Contribution activity: roughly ${total.current} contributions in the last ${weeks} weeks`}
      >
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="grid grid-rows-7 gap-[3px]">
            {Array.from({ length: days }).map((_, d) => {
              const lv = levelFor(w, d);
              return (
                <span
                  key={d}
                  title={`Week ${w + 1}, day ${d + 1}: level ${lv}`}
                  className={`contrib-cell block h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] ${LEVEL_BG[lv]}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-[#6e7681]">
        <span className="font-mono">Less</span>
        <div className="flex items-center gap-1">
          {LEVEL_BG.map((c, i) => (
            <span key={i} className={`block h-[10px] w-[10px] ${c}`} />
          ))}
        </div>
        <span className="font-mono">More</span>
      </div>
    </div>
  );
}

function LanguageBar() {
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full border border-[#30363d]" aria-hidden>
        {LANGUAGES.map((l) => (
          <span key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2" aria-label="Language breakdown">
        {LANGUAGES.map((l) => (
          <li key={l.name} className="flex items-center gap-2 text-xs text-[#8b949e]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} aria-hidden />
            <span className="font-semibold text-[#e6edf3]">{l.name}</span>
            <span className="tabular">{l.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- repo card ---------------- */

function RepoCard({ repo, delay = 0 }: { repo: Repo; delay?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <article className="gh-card gh-card-lift flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <BookMarked className="h-4 w-4 shrink-0 text-[#8b949e]" aria-hidden />
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="link-blue truncate font-mono text-[14px] font-semibold"
            >
              {repo.name}
            </a>
            <span className="hidden shrink-0 rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] font-medium text-[#8b949e] sm:inline">
              Public
            </span>
          </div>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${repo.name} repository`}
            className="rounded-md border border-[#373e47] bg-[#21262d] p-1.5 text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#58a6ff]"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="mt-2 text-[13.5px] leading-relaxed text-[#8b949e]">{repo.description}</p>

        <div className="mt-3 rounded-lg border border-[#21262d] bg-[#0d1117]/80 p-3">
          <p className="label-mono text-[#6e7681]">What Moe contributed</p>
          <ul className="mt-2 space-y-1.5">
            {(open ? repo.contributions : repo.contributions.slice(0, 2)).map((c) => (
              <li key={c} className="flex gap-2 text-[12.5px] leading-relaxed text-[#c9d1d9]">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3fb950]" aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          {repo.contributions.length > 2 && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-2 font-mono text-[11px] text-[#58a6ff] hover:underline"
              aria-expanded={open}
            >
              {open ? "− show less" : `+ ${repo.contributions.length - 2} more contribution`}
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#1f6feb]/10 px-2 py-0.5 font-mono text-[10px] text-[#79c0ff]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-xs text-[#8b949e]">
          <span className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: repo.languageColor }}
              aria-hidden
            />
            {repo.language}
          </span>
          <span className="flex items-center gap-1 tabular" title="Stars">
            <Star className="h-3.5 w-3.5" aria-hidden /> {repo.stars}
          </span>
          <span className="flex items-center gap-1 tabular" title="Forks">
            <GitFork className="h-3.5 w-3.5" aria-hidden /> {repo.forks}
          </span>
          {repo.release && (
            <a
              href={`${repo.url}/releases`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-mono text-[11px] text-[#3fb950] hover:underline"
              title="Release notes"
            >
              <Tag className="h-3.5 w-3.5" aria-hidden /> {repo.release}
            </a>
          )}
          {repo.live && (
            <a
              href={repo.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-medium text-[#58a6ff] hover:underline"
            >
              <Zap className="h-3.5 w-3.5" aria-hidden /> {repo.liveLabel ?? "Live demo"}
            </a>
          )}
        </div>
        <p className="mt-2 font-mono text-[10px] text-[#6e7681]">Updated {repo.updated}</p>
      </article>
    </Reveal>
  );
}

/* ---------------- app ---------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const downloadProfile = () => {
    const lines = [
      `${PROFILE.name} (@${PROFILE.username}) — ${PROFILE.title}`,
      PROFILE.bio,
      `${PROFILE.location} · ${PROFILE.email} · ${PROFILE.phonePrimary}`,
      `GitHub: ${PROFILE.github} · Org: ${PROFILE.githubOrg}`,
      "",
      "PINNED REPOSITORIES — what I contributed:",
      ...PINNED_REPOS.flatMap((r) => [
        ``,
        `## ${r.fullName} ★${r.stars} · ${r.language} · ${r.release ?? "no tag"} ${r.url}`,
        `   ${r.description}`,
        ...r.contributions.map((c) => `   - ${c}`),
        ...(r.live ? [`   Live: ${r.live}`] : []),
      ]),
      "",
      "ARCHITECTURE PRINCIPLES:",
      ...PRINCIPLES.map((p) => `- ${p.title}: ${p.text} (${p.snippet})`),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([lines], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Moe-Kyaw-Aung-Open-Source-Profile.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const nav = [
    ["open-source", "Open Source"],
    ["android", "Android"],
    ["writing", "Notes"],
    ["architecture", "Architecture"],
    ["skills", "Skills"],
    ["experience", "Experience"],
    ["contact", "Contact"],
  ];

  return (
    <div className="relative min-h-screen bg-[#0d1117] font-sans text-[#e6edf3]">
      <div className="hero-glow pointer-events-none fixed inset-0" aria-hidden />

      {/* ── header ── */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors ${
          scrolled ? "border-[#30363d] bg-[#0d1117]/90 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Home">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#30363d] bg-[#161b22]">
              <Terminal className="h-4 w-4 text-[#3fb950]" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-tight text-white">
                {PROFILE.username}
              </span>
              <span className="label-mono block text-[9px] text-[#6e7681]">Open source</span>
            </span>
          </a>
          <nav className="ml-2 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-[#8b949e] transition hover:bg-white/[0.05] hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="btn-gh hidden items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white sm:inline-flex"
            >
              <GitHubMark className="h-4 w-4" /> Follow
            </a>
            <a
              href="#contact"
              className="btn-primary-gh hidden rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white sm:inline-flex"
            >
              Contact
            </a>
            <button
              className="rounded-lg border border-[#30363d] bg-[#161b22] p-2 text-[#8b949e] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-[#21262d] bg-[#0d1117]/95 px-5 py-3 backdrop-blur-xl lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {nav.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-[#c9d1d9] hover:bg-white/[0.05]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top" className="relative z-10">
        {/* ═══════ HERO ═══════ */}
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* profile card — github clarity */}
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <div className="relative">
                  <img
                    src={PROFILE.avatar}
                    alt={`Avatar of ${PROFILE.name}`}
                    className="h-24 w-24 rounded-full border-2 border-[#30363d] object-cover sm:h-28 sm:w-28"
                    fetchPriority="high"
                  />
                  <span
                    className="absolute bottom-1 left-[4.5rem] flex items-center gap-1 rounded-full border border-[#30363d] bg-[#161b22] px-2 py-0.5 font-mono text-[10px] text-[#3fb950] sm:left-20"
                    title="Available for work"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" aria-hidden /> open
                  </span>
                </div>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
                  {PROFILE.name}
                </h1>
                <p className="font-light text-xl text-[#8b949e]">
                  {PROFILE.username}{" "}
                  <span className="font-mm text-base">· {PROFILE.mmName}</span>
                </p>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gh mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white"
                >
                  <GitHubMark className="h-4 w-4" /> Follow on GitHub
                </a>
                <p className="mt-4 text-[14px] leading-relaxed text-[#c9d1d9]">{PROFILE.bio}</p>
                <ul className="mt-4 space-y-2 text-[13px] text-[#8b949e]">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {PROFILE.location}
                  </li>
                  <li>
                    <a href={`mailto:${PROFILE.email}`} className="link-blue flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden /> {PROFILE.email}
                    </a>
                  </li>
                  <li>
                    <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="link-blue flex items-center gap-2">
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden /> LinkedIn profile
                    </a>
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#21262d] pt-3 text-[13px] text-[#8b949e]">
                  <span>
                    <strong className="text-white tabular">21+</strong> repos
                  </span>
                  <span>
                    <strong className="text-white tabular">130+</strong> stars
                  </span>
                  <span>
                    <strong className="text-white tabular">43</strong> live demos
                  </span>
                </div>
              </div>
            </Reveal>

            {/* headline + highlights */}
            <div>
              <Reveal delay={60}>
                <p className="label-mono inline-flex items-center gap-2 rounded-full border border-[#1f6feb]/40 bg-[#1f6feb]/10 px-3 py-1.5 text-[#79c0ff]">
                  <GitBranch className="h-3.5 w-3.5" aria-hidden /> README.md — open-source profile
                </p>
                <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl">
                  I build in public and ship{" "}
                  <span className="text-[#3fb950]">production-ready</span> Android apps.
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8b949e] sm:text-base">
                  Every system below is a real repository — with releases, docs, and live demos.
                  Each card names <strong className="text-[#e6edf3]">exactly what I contributed</strong>,
                  so you never have to guess what “team project” means.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <a
                    href="#open-source"
                    className="btn-primary-gh inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Browse repositories <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={PROFILE.githubOrg}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gh inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    <GitHubMark className="h-4 w-4" /> {PROFILE.org} org
                  </a>
                  <button
                    onClick={downloadProfile}
                    className="btn-gh inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-[#c9d1d9]"
                  >
                    <Download className="h-4 w-4" /> Export profile
                  </button>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="gh-card mt-8 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">
                      Contribution highlights{" "}
                      <span className="ml-1 font-normal text-[#6e7681]">
                        — last 30 weeks
                      </span>
                    </p>
                    <div className="flex gap-2">
                      {HIGHLIGHTS.map((h) => (
                        <span
                          key={h.label}
                          className="rounded-lg border border-[#21262d] bg-[#0d1117] px-2.5 py-1.5 text-center"
                        >
                          <span className="tabular block text-sm font-bold text-white">{h.value}</span>
                          <span className="block text-[9px] leading-tight text-[#6e7681]">{h.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <ContributionGraph />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#6e7681]">
                    Steady, reviewable output: POS generations, media pipeline work, dashboard
                    releases, and docs — not one-off dumps. Highlights aggregate public commits,
                    releases cut, and PRs reviewed across both accounts.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="gh-card mt-4 p-5">
                  <p className="text-sm font-semibold text-white">Mostly written in</p>
                  <div className="mt-3">
                    <LanguageBar />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════ OPEN SOURCE WORK ═══════ */}
        <section id="open-source" className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <SectionHead
            kicker="01 · Open source work"
            title="Pinned repositories"
            blurb="The six repos I'd show in an interview. Repository links are the headline — every card links straight to source, releases, and live demos."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {PINNED_REPOS.map((r, i) => (
              <RepoCard key={r.name} repo={r} delay={(i % 2) * 70} />
            ))}
          </div>

          <Reveal delay={80}>
            <button
              onClick={() => setShowAllRepos((v) => !v)}
              className="btn-gh mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-[#c9d1d9]"
              aria-expanded={showAllRepos}
            >
              {showAllRepos ? "Hide additional repositories" : `Show ${MORE_REPOS.length} more repositories`}
              <ArrowRight className={`h-4 w-4 transition-transform ${showAllRepos ? "-rotate-90" : "rotate-90"}`} />
            </button>
          </Reveal>

          {showAllRepos && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {MORE_REPOS.map((r, i) => (
                <RepoCard key={r.name} repo={r} delay={(i % 2) * 60} />
              ))}
            </div>
          )}
        </section>

        {/* ═══════ FEATURED ANDROID ═══════ */}
        <section id="android" className="border-y border-[#21262d] bg-[#0a0f1a]/60">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <SectionHead
              kicker="02 · Featured Android projects"
              title="Production Android, up close"
              blurb="Three systems with screenshots, measured outcomes, and the exact repos behind them."
            />
            <div className="mt-8 space-y-4">
              {FEATURED_ANDROID.map((f, i) => (
                <Reveal key={f.id} delay={i * 60}>
                  <article
                    className={`gh-card gh-card-lift grid gap-6 overflow-hidden p-6 sm:p-7 lg:grid-cols-[1fr_300px] lg:items-center ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div>
                      <p className="label-mono text-[#3fb950]">Featured · {f.stack.join(" · ")}</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{f.name}</h3>
                      <p className="mt-1.5 text-[15px] font-medium text-[#c9d1d9]">{f.oneLiner}</p>
                      <ul className="mt-4 space-y-2">
                        {f.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5 text-[13.5px] leading-relaxed text-[#8b949e]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3fb950]" aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        <div className="flex items-baseline gap-2 rounded-lg border border-[#1f6feb]/30 bg-[#1f6feb]/10 px-3.5 py-2">
                          <span className="text-2xl font-extrabold text-white tabular">{f.metric}</span>
                          <span className="max-w-[200px] text-[11px] leading-snug text-[#8b949e]">
                            {f.metricLabel}
                          </span>
                        </div>
                        <a
                          href={f.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary-gh inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white"
                        >
                          <GitHubMark className="h-4 w-4" /> Repository
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                    <a
                      href={f.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="group block overflow-hidden rounded-xl border border-[#30363d]"
                      aria-label={`${f.name} repository with screenshot`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d1117]">
                        <img
                          src={f.image}
                          alt={`${f.name} screenshot`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="absolute bottom-2 right-2 rounded-md border border-[#30363d] bg-[#0d1117]/90 px-2 py-1 font-mono text-[10px] text-[#8b949e]">
                          screenshot → repo
                        </span>
                      </div>
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ WRITING ═══════ */}
        <section id="writing" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <SectionHead
            kicker="03 · Technical writing"
            title="Notes from the codebase"
            blurb="Short, practical write-ups distilled from real commits — the kind of docs I leave behind in every repo."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WRITING.map((w, i) => (
              <Reveal key={w.file} delay={(i % 3) * 70}>
                <article className="gh-card gh-card-lift flex h-full flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#8b949e]">
                      <FileText className="h-3.5 w-3.5" aria-hidden /> {w.file}
                    </span>
                    <span className="rounded-full bg-[#1f6feb]/10 px-2 py-0.5 font-mono text-[10px] text-[#79c0ff]">
                      {w.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[15px] font-bold leading-snug text-white">{w.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#8b949e]">{w.excerpt}</p>
                  <p className="mt-4 border-t border-[#21262d] pt-3 font-mono text-[11px] text-[#6e7681]">
                    {w.date} · {w.minutes} min read
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════ ARCHITECTURE ═══════ */}
        <section id="architecture" className="border-y border-[#21262d] bg-[#0a0f1a]/60">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <SectionHead
              kicker="04 · Architecture principles"
              title="Rules every repo follows"
              blurb="Four non-negotiables, each with the one-liner I actually enforce in review."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.no} delay={i * 70}>
                  <article className="gh-card h-full p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-[#1f6feb]">{p.no}</span>
                      {i === 2 ? (
                        <Lock className="h-4 w-4 text-[#3fb950]" aria-hidden />
                      ) : i === 0 ? (
                        <Database className="h-4 w-4 text-[#58a6ff]" aria-hidden />
                      ) : i === 1 ? (
                        <Zap className="h-4 w-4 text-[#e3b341]" aria-hidden />
                      ) : (
                        <Layers className="h-4 w-4 text-[#a371f7]" aria-hidden />
                      )}
                    </div>
                    <h3 className="mt-3 text-[15px] font-bold text-white">{p.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#8b949e]">{p.text}</p>
                    <code className="mt-3 block overflow-x-auto rounded-lg border border-[#21262d] bg-[#0d1117] p-2.5 font-mono text-[11px] text-[#79c0ff]">
                      {p.snippet}
                    </code>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ SKILLS + EXPERIENCE ═══════ */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <SectionHead
            kicker="05 · Skills"
            title="A tight stack, deeply known"
            blurb="Everything below appears in the repos above — no resume padding."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {SKILL_GROUPS.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 70}>
                <div className="gh-card h-full p-5">
                  <h3 className="text-[15px] font-bold text-white">{g.title}</h3>
                  <ul className="mt-3 space-y-0 border-t border-[#21262d]">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 border-b border-[#21262d] py-2 text-[13px] text-[#c9d1d9]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div id="experience" className="mt-14">
            <SectionHead
              kicker="06 · Experience"
              title="Six years, three chapters"
              blurb="Each role links back to public work you can inspect."
            />
            <ol className="relative mt-8 space-y-4 border-l border-[#30363d] pl-6">
              {EXPERIENCE.map((e, i) => (
                <li key={e.period} className="relative">
                  <Reveal delay={i * 60}>
                    <span
                      className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#3fb950] bg-[#0d1117]"
                      aria-hidden
                    />
                    <div className="gh-card p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-[15px] font-bold text-white">{e.role}</h3>
                        <span className="font-mono text-[11px] text-[#6e7681]">{e.period}</span>
                      </div>
                      <p className="mt-1 text-[13px] font-medium text-[#58a6ff]">
                        {e.org} · {e.place}
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {e.points.map((pt) => (
                          <li key={pt} className="flex gap-2 text-[13px] leading-relaxed text-[#8b949e]">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3fb950]" aria-hidden />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══════ CONTACT ═══════ */}
        <section id="contact" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <Reveal>
            <div className="gh-card relative overflow-hidden p-7 sm:p-10">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1f6feb]/20 blur-[90px]"
                aria-hidden
              />
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="label-mono text-[#3fb950]">07 · Contact</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Found a repo you like? Let&apos;s talk about what&apos;s next.
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#8b949e]">
                    Open to senior Android roles, contract builds, and product audits. Reference
                    any repository above and I&apos;ll walk you through the commits.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="btn-primary-gh inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      <Mail className="h-4 w-4" /> {PROFILE.email}
                    </a>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gh inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      <GitHubMark className="h-4 w-4" /> GitHub profile
                    </a>
                  </div>
                </div>
                <div className="grid gap-2.5">
                  {[
                    {
                      icon: <Phone className="h-4 w-4" />,
                      k: "PHONE",
                      v: `${PROFILE.phonePrimary} · ${PROFILE.phoneSecondary}`,
                      href: `tel:${PROFILE.phonePrimary.replace(/\s/g, "")}`,
                    },
                    {
                      icon: <Mail className="h-4 w-4" />,
                      k: "EMAIL",
                      v: PROFILE.email,
                      href: `mailto:${PROFILE.email}`,
                    },
                    {
                      icon: <MapPin className="h-4 w-4" />,
                      k: "BASE",
                      v: PROFILE.location,
                    },
                    {
                      icon: <ShieldCheck className="h-4 w-4" />,
                      k: "AVAILABILITY",
                      v: "Senior roles · contracts · audits — replies in 1 day",
                    },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center gap-3.5 rounded-xl border border-[#21262d] bg-[#0d1117]/70 px-4 py-3.5"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#58a6ff]">
                        {row.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="label-mono block text-[9px] text-[#6e7681]">{row.k}</span>
                        {row.href ? (
                          <a href={row.href} className="link-blue block truncate text-sm font-semibold">
                            {row.v}
                          </a>
                        ) : (
                          <span className="block truncate text-sm font-semibold text-white">{row.v}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#21262d]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm font-semibold text-white">
            {PROFILE.name}{" "}
            <span className="font-mono text-[11px] font-normal text-[#6e7681]">
              @{PROFILE.username} · © 2026
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] text-[#6e7681]">
            <a href="#open-source" className="transition hover:text-white">Repos</a>
            <a href="#writing" className="transition hover:text-white">Notes</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="transition hover:text-white">
              GitHub
            </a>
            <a href={PROFILE.githubOrg} target="_blank" rel="noreferrer" className="transition hover:text-white">
              Org
            </a>
            <a href="#top" className="transition hover:text-white">↑ Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
