import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  Film,
  Flame,
  FolderKanban,
  Gamepad2,
  Mail,
  Menu,
  PenTool,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "builds", label: "Builds", icon: FolderKanban },
  { id: "writings", label: "Writings", icon: PenTool },
  { id: "bookshelf", label: "Library", icon: BookOpen },
  { id: "movies", label: "Movies", icon: Film },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "role-models", label: "Inspiration", icon: Flame },
  { id: "achievements", label: "Awards", icon: Trophy },
  { id: "contact", label: "Contact", icon: Mail },
];

const PILL_PATHS = [
  { tone: "red", label: "RED PILL", action: "Explore projects", section: "projects" },
  { tone: "blue", label: "BLUE PILL", action: "Meet the developer", section: "about" },
] as const;

type ReadingNavigationState = {
  isReading: boolean;
  title: string;
  minutesRemaining: number;
  progress: number;
};

const INITIAL_READING_STATE: ReadingNavigationState = {
  isReading: false,
  title: "",
  minutesRemaining: 0,
  progress: 0,
};

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const PillNavigation = ({
  onNavigate,
  compact = false,
  className = "",
}: {
  onNavigate: (section: string) => void;
  compact?: boolean;
  className?: string;
}) => (
  <div className={`nav-pill-paths ${compact ? "nav-pill-paths-compact" : ""} ${className}`} aria-label="Choose a path">
    {PILL_PATHS.map((path) => (
      <button
        key={path.tone}
        type="button"
        onClick={() => onNavigate(path.section)}
        className={`nav-pill-path nav-pill-path-${path.tone} ${compact ? "nav-pill-path-compact" : ""}`}
        aria-label={`${path.label}: ${path.action}`}
        title={`${path.label} · ${path.action}`}
      >
        <span className="nav-capsule" aria-hidden="true"><span /></span>
        {!compact && (
          <span className="nav-pill-copy">
            <span className="nav-pill-label">{path.label}</span>
            <span className="nav-pill-action">{path.action}</span>
          </span>
        )}
      </button>
    ))}
  </div>
);

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [reading, setReading] = useState<ReadingNavigationState>(INITIAL_READING_STATE);
  const [activeSection, setActiveSection] = useState(() =>
    location.pathname === "/builds" ? "builds" : location.hash.slice(1) || "home"
  );
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  useEffect(() => {
    let main: HTMLElement | null = null;
    let hero: HTMLElement | null = null;
    let readingContent: HTMLElement | null = null;
    let articleTitle = "";
    let totalWords = 0;
    let frame = 0;
    let mutations: MutationObserver | null = null;
    let resizes: ResizeObserver | null = null;

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateReadingState);
    };

    const updateReadingState = () => {
      frame = 0;
      if (!main || !readingContent) return;

      const heroBottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : main.getBoundingClientRect().top + window.scrollY;
      const mainBottom = readingContent.getBoundingClientRect().bottom + window.scrollY;
      const isReading = window.scrollY > heroBottom + 8;
      const lastScroll = Math.max(heroBottom, mainBottom - window.innerHeight);
      const progress = isReading
        ? Math.max(0, Math.min(1, (window.scrollY - heroBottom) / Math.max(1, lastScroll - heroBottom)))
        : 0;

      const headingThreshold = window.innerHeight * 0.38;
      const visibleHeadings = Array.from(main.querySelectorAll<HTMLElement>("h1, h2, h3"))
        .filter((heading) => heading.getBoundingClientRect().top <= headingThreshold);
      const currentHeading = visibleHeadings[visibleHeadings.length - 1];
      const title = articleTitle || currentHeading?.innerText.trim() || document.title;
      const minutesRemaining = Math.ceil((totalWords * (1 - progress)) / 220);
      const next: ReadingNavigationState = {
        isReading,
        title,
        minutesRemaining,
        progress: Math.round(progress * 1000) / 10,
      };

      setReading((current) => current.isReading === next.isReading
        && current.title === next.title
        && current.minutesRemaining === next.minutesRemaining
        && current.progress === next.progress
        ? current
        : next);
    };

    const refreshContent = () => {
      const nextMain = document.querySelector<HTMLElement>(".site-main")
        ?? document.querySelector<HTMLElement>("main");
      if (!nextMain) return;

      main = nextMain;
      const candidates = Array.from(main.querySelectorAll<HTMLElement>("article"));
      const singleArticle = main.matches("article")
        ? main
        : candidates.length === 1 && countWords(candidates[0].innerText) >= 180
          ? candidates[0]
          : null;
      readingContent = singleArticle ?? main;
      articleTitle = singleArticle?.querySelector<HTMLElement>("h1")?.innerText.trim() ?? "";
      hero = main.querySelector<HTMLElement>("#home")
        ?? main.querySelector<HTMLElement>("header")
        ?? main.querySelector<HTMLElement>("section[id]")
        ?? main.querySelector<HTMLElement>("h1")?.parentElement
        ?? main.firstElementChild as HTMLElement | null;

      const pageWords = countWords(readingContent.innerText);
      const heroWords = hero && readingContent.contains(hero) ? countWords(hero.innerText) : 0;
      totalWords = Math.max(0, pageWords - heroWords);

      mutations?.disconnect();
      mutations = new MutationObserver(refreshContent);
      mutations.observe(main, { childList: true, subtree: true });
      resizes?.disconnect();
      if (typeof ResizeObserver !== "undefined") {
        resizes = new ResizeObserver(scheduleUpdate);
        resizes.observe(readingContent);
      }
      scheduleUpdate();
    };

    refreshContent();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", refreshContent);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", refreshContent);
      mutations?.disconnect();
      resizes?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      const section = location.pathname === "/builds" ? "builds" : "home";
      activeSectionRef.current = section;
      setActiveSection(section);
      return;
    }

    const main = document.querySelector<HTMLElement>(".site-main");
    if (!main) return;
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section[id]"));
      const threshold = window.innerHeight * 0.36;
      let sectionId = "home";
      for (const section of sections) {
        const heading = section.querySelector<HTMLElement>("h1, h2");
        if (heading && heading.getBoundingClientRect().top <= threshold) sectionId = section.id;
      }
      if (activeSectionRef.current !== sectionId) {
        activeSectionRef.current = sectionId;
        setActiveSection(sectionId);
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const mutations = new MutationObserver(scheduleUpdate);
    mutations.observe(main, { childList: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mutations.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;
    const main = document.querySelector<HTMLElement>(".site-main");
    if (!main) return;

    const sectionId = location.hash.slice(1);
    let frame = 0;
    const scrollToHashTarget = () => {
      const target = document.getElementById(sectionId);
      if (!target) return false;
      frame = window.requestAnimationFrame(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      });
      return true;
    };
    const observer = new MutationObserver(() => {
      if (scrollToHashTarget()) observer.disconnect();
    });

    if (!scrollToHashTarget()) observer.observe(main, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 10000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    activeSectionRef.current = sectionId;
    setActiveSection(sectionId);
    if (sectionId === "builds") {
      navigate("/builds");
      return;
    }
    if (location.pathname !== "/") {
      navigate("/#" + sectionId);
      return;
    }
    const element = document.getElementById(sectionId);
    if (!element) {
      navigate("/#" + sectionId);
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  const isActive = (id: string) => id === "builds"
    ? location.pathname === "/builds"
    : location.pathname === "/" && activeSection === id;

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`site-navigation pointer-events-none fixed inset-x-3 top-3 z-[99999] h-16 sm:inset-x-4 sm:top-4 sm:h-[4.5rem] ${reading.isReading ? "is-reading" : ""}`}
      >
        <div className="nav-glass-shell pointer-events-auto relative mx-auto flex h-full w-full max-w-[96rem] items-center justify-between gap-3 rounded-full border border-border/55 bg-background/75 px-4 shadow-lg backdrop-blur-2xl sm:px-6 xl:px-10">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            aria-label="SasiCodes home"
            className="nav-brand group flex min-w-0 shrink-0 items-center gap-2.5 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="nav-brand-mark relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-primary/25 text-primary transition sm:h-10 sm:w-10">
              <Code2 className="relative z-[1] h-[1.15rem] w-[1.15rem] transition-transform duration-300 group-hover:scale-110" strokeWidth={2.1} aria-hidden="true" />
              <span className="nav-brand-led" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-tight text-foreground sm:text-[0.95rem]">Sasi<span className="text-primary">Codes</span></span>
              <span className="nav-brand-subtitle hidden text-[0.55rem] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:block">Developer <span className="text-primary/70">/</span> Builder</span>
            </span>
          </button>

          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <div className="nav-links-shell relative flex max-w-full flex-nowrap items-center gap-0.5 overflow-x-auto rounded-full border border-border/60 bg-card/45 p-1 shadow-sm backdrop-blur-xl">
              <span className="nav-shell-prompt hidden shrink-0 px-2 font-mono text-[0.65rem] font-semibold text-primary/75 2xl:inline" aria-hidden="true">~/</span>
              {navItems.map((item) => {
                const active = isActive(item.id);
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={active ? "location" : undefined}
                    aria-label={item.label}
                    title={item.label}
                    className="nav-link-chip group relative inline-flex h-9 w-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 text-xs font-medium text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:w-auto xl:px-2.5"
                  >
                    <Icon className="nav-link-icon h-[0.95rem] w-[0.95rem] shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <span className="hidden whitespace-nowrap xl:inline">{item.label}</span>
                    {active && <span className="nav-active-node" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            <div className="nav-reading-status" aria-live="polite">
              <span className="nav-reading-copy">
                <span className="nav-reading-eyebrow">NOW READING</span>
                <span className="nav-reading-title" title={reading.title}>{reading.title}</span>
              </span>
              <span className="nav-reading-divider" aria-hidden="true" />
              <span className="nav-reading-time">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {reading.minutesRemaining === 0 ? "Finished" : `${reading.minutesRemaining} min left`}
              </span>
            </div>
          </div>

          <div className="nav-reading-mobile" aria-live="polite">
            <span className="nav-reading-mobile-title" title={reading.title}>{reading.title}</span>
            <span className="nav-reading-mobile-time">
              {reading.minutesRemaining === 0 ? "Finished" : `${reading.minutesRemaining} min left`}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <PillNavigation onNavigate={scrollToSection} compact className="hidden 2xl:flex" />
              <span className="hidden h-6 w-px bg-border/70 2xl:block" aria-hidden="true" />
              <ThemeSwitcher />
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeSwitcher />
              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="mobile-site-nav"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                className="nav-menu-toggle inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/55 text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95"
                data-open={isOpen}
              >
                <span className="nav-menu-toggle-icon" aria-hidden="true">
                  {isOpen ? <X className="h-[1.1rem] w-[1.1rem]" /> : <Menu className="h-[1.1rem] w-[1.1rem]" />}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`nav-reading-progress ${reading.isReading ? "is-visible" : ""}`}
          role="progressbar"
          aria-label="Page reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={reading.progress}
          aria-hidden={!reading.isReading}
        >
          <span style={{ width: `${reading.progress}%` }} />
        </div>
      </nav>

      {(
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation menu"
            aria-hidden={!isOpen}
            onClick={() => setIsOpen(false)}
            className={`mobile-nav-backdrop fixed inset-x-0 bottom-0 top-20 z-[99997] bg-background/45 backdrop-blur-sm sm:top-24 lg:hidden ${isOpen ? "mobile-nav-backdrop-open" : ""}`}
          />
          <div
            id="mobile-site-nav"
            role="dialog"
            aria-modal={isOpen}
            aria-hidden={!isOpen}
            aria-label="Site sections"
            className={`mobile-nav-panel fixed inset-x-3 bottom-3 top-20 z-[99998] overflow-hidden rounded-[1.35rem] border border-border/70 bg-background/95 shadow-2xl backdrop-blur-2xl sm:inset-x-auto sm:right-5 sm:top-24 sm:w-[min(92vw,27rem)] lg:hidden ${isOpen ? "mobile-nav-panel-open" : ""}`}
          >
            <div className="nav-mobile-header relative flex items-start justify-between gap-4 border-b border-border/60 px-5 pb-4 pt-5">
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                  Section index <span className="text-muted-foreground/70">/ {String(navItems.length).padStart(2, "0")}</span>
                </p>
                <h2 className="m-0 text-lg font-semibold tracking-tight text-foreground sm:text-xl">Choose your path</h2>
              </div>
              <span className="nav-mobile-signal mt-1 hidden items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1.5 font-mono text-[0.56rem] font-medium uppercase tracking-wider text-muted-foreground min-[360px]:inline-flex">
                <span className="nav-mobile-signal-dot" aria-hidden="true" /> ready
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
                className="nav-mobile-close inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card/60 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <PillNavigation onNavigate={scrollToSection} className="px-3.5 pt-3 sm:px-4" />
            <div className="grid h-[calc(100%-8.75rem)] grid-cols-2 content-start gap-2 overflow-y-auto p-3.5 pt-2 sm:p-4 sm:pt-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={active ? "location" : undefined}
                    className={`nav-mobile-link group flex min-h-[3.5rem] items-center gap-2.5 rounded-xl border px-2.5 py-2.5 text-left text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? "is-active border-primary/25 bg-primary/[0.08] text-primary" : "border-border/45 bg-card/35 text-muted-foreground hover:border-primary/25 hover:bg-card/75 hover:text-foreground"}`}
                    style={{ animationDelay: `${Math.min(index, 9) * 28}ms` }}
                  >
                    <span className={`nav-mobile-link-icon grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active ? "bg-primary/10 text-primary" : "bg-muted/55 text-muted-foreground"}`}>
                      <Icon className="h-[0.95rem] w-[0.95rem]" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 truncate">{item.label}</span>
                    {active && <span className="nav-mobile-active-dot ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
