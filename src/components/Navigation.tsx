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

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
        className="site-navigation fixed inset-x-0 top-0 z-[99999] h-16 border-b border-border/50 bg-background/75 backdrop-blur-2xl sm:h-[4.5rem]"
      >
        <div className="mx-auto flex h-full w-full items-center justify-between gap-3 px-4 sm:px-6 xl:px-10">
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
              <span className="hidden text-[0.55rem] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:block">Developer <span className="text-primary/70">/</span> Builder</span>
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
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center border-l border-border/70 pl-2 lg:flex">
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
      </nav>

      {(
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation menu"
            aria-hidden={!isOpen}
            onClick={() => setIsOpen(false)}
            className={`mobile-nav-backdrop fixed inset-x-0 bottom-0 top-16 z-[99997] bg-background/45 backdrop-blur-sm sm:top-[4.5rem] lg:hidden ${isOpen ? "mobile-nav-backdrop-open" : ""}`}
          />
          <div
            id="mobile-site-nav"
            role="dialog"
            aria-modal={isOpen}
            aria-hidden={!isOpen}
            aria-label="Site sections"
            className={`mobile-nav-panel fixed inset-x-3 bottom-3 top-16 z-[99998] overflow-hidden rounded-[1.35rem] border border-border/70 bg-background/95 shadow-2xl backdrop-blur-2xl sm:inset-x-auto sm:right-5 sm:top-[4.5rem] sm:w-[min(92vw,27rem)] lg:hidden ${isOpen ? "mobile-nav-panel-open" : ""}`}
          >
            <div className="nav-mobile-header relative flex items-start justify-between gap-4 border-b border-border/60 px-5 pb-4 pt-5">
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                  Section index <span className="text-muted-foreground/70">/ {String(navItems.length).padStart(2, "0")}</span>
                </p>
                <h2 className="m-0 text-lg font-semibold tracking-tight text-foreground sm:text-xl">Where to next?</h2>
              </div>
              <span className="nav-mobile-signal mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1.5 font-mono text-[0.56rem] font-medium uppercase tracking-wider text-muted-foreground">
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
            <div className="grid h-[calc(100%-5.25rem)] grid-cols-2 content-start gap-2 overflow-y-auto p-3.5 sm:p-4">
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
