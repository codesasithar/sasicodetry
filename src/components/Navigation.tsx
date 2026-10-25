import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  Cpu,
  Film,
  Flame,
  FolderKanban,
  Gamepad2,
  Mail,
  Menu,
  Newspaper,
  PenTool,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import profilePicture from "@/assets/profile-hero-cartoon.png";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "builds", label: "Builds", icon: FolderKanban },
  { id: "services", label: "Services", icon: Cpu },
  { id: "writings", label: "Writings", icon: PenTool },
  { id: "bookshelf", label: "Library", icon: BookOpen },
  { id: "news", label: "News", icon: Newspaper },
  { id: "achievements", label: "Awards", icon: Trophy },
  { id: "movies", label: "Movies", icon: Film },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "role-models", label: "Inspiration", icon: Flame },
  { id: "contact", label: "Contact", icon: Mail },
];

const primaryIds = new Set(["about", "projects", "builds", "services", "bookshelf", "contact"]);

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() =>
    location.pathname === "/builds" ? "builds" : location.hash.slice(1) || "home"
  );
  const activeSectionRef = useRef(activeSection);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const primaryItems = navItems.filter((item) => primaryIds.has(item.id));
  const moreItems = navItems.filter((item) => !primaryIds.has(item.id));
  const moreIsActive = moreItems.some((item) => activeSection === item.id);

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
    if (!isOpen && !isMoreOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsMoreOpen(false);
      }
    };
    const closeMoreOnOutsideClick = (event: PointerEvent) => {
      if (isMoreOpen && !moreMenuRef.current?.contains(event.target as Node)) setIsMoreOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeMoreOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeMoreOnOutsideClick);
    };
  }, [isOpen, isMoreOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    setIsMoreOpen(false);
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
        className="fixed inset-x-0 top-0 z-[99999] h-16 border-b border-border/60 bg-background/80 backdrop-blur-2xl sm:h-20"
      >
        <div className="mx-auto flex h-full w-full items-center justify-between gap-3 px-4 sm:px-6 xl:px-10">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            aria-label="SasiCodes home"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/30 bg-card shadow-[0_0_1.2rem_hsl(var(--primary)/0.14)] transition group-hover:border-primary sm:h-11 sm:w-11">
              <img src={profilePicture} alt="" className="h-full w-full object-cover" decoding="async" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-tight text-foreground sm:text-base">SasiCodes</span>
              <span className="hidden text-[0.58rem] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">Developer · Builder</span>
            </span>
          </button>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex">
            <div className="flex items-center gap-0.5 rounded-full border border-border/70 bg-card/55 p-1 shadow-sm backdrop-blur-xl">
              {primaryItems.map((item) => {
                const active = isActive(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={active ? "location" : undefined}
                    className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? "bg-primary text-primary-foreground shadow-[0_0.3rem_1rem_hsl(var(--primary)/0.2)]" : "text-muted-foreground hover:bg-background/80 hover:text-foreground"}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen((open) => !open)}
                aria-expanded={isMoreOpen}
                aria-controls="more-sections-panel"
                aria-label="More sections"
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${moreIsActive || isMoreOpen ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                More
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isMoreOpen && (
                <div id="more-sections-panel" role="group" aria-label="More sections" className="absolute right-0 top-[calc(100%+0.65rem)] z-[100000] w-80 rounded-2xl border border-border/80 bg-background/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95">
                  <p className="px-3 pb-2 pt-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explore more</p>
                  <div className="grid grid-cols-2 gap-1">
                    {moreItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}
                        >
                          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground shadow-sm transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-[99997] bg-background/45 backdrop-blur-sm sm:top-20 lg:hidden"
          />
          <div
            id="mobile-site-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site sections"
            className="mobile-nav-panel fixed inset-x-3 bottom-3 top-[4.5rem] z-[99998] overflow-hidden rounded-[1.6rem] border border-border/80 bg-background/95 shadow-2xl backdrop-blur-2xl sm:inset-x-auto sm:right-5 sm:top-[5.5rem] sm:w-[min(92vw,30rem)] lg:hidden"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/70 px-5 pb-4 pt-5">
              <div>
                <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary">Navigate</p>
                <h2 className="m-0 text-xl font-semibold tracking-tight text-foreground">Jump to a section</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid h-[calc(100%-5.5rem)] grid-cols-2 content-start gap-2 overflow-y-auto p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={active ? "location" : undefined}
                    className={`flex min-h-[4.25rem] items-center gap-2.5 rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? "border-primary/30 bg-primary/10 text-primary shadow-[inset_0_1px_hsl(var(--primary)/0.16)]" : "border-border/50 bg-card/40 text-muted-foreground hover:border-primary/20 hover:bg-card/80 hover:text-foreground"}`}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${active ? "bg-primary/15 text-primary" : "bg-muted/70 text-muted-foreground"}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 truncate">{item.label}</span>
                    {active && <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_0.7rem_hsl(var(--primary)/0.8)]" />}
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