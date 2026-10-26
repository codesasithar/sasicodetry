import { Suspense, lazy, useEffect, useRef, useState, type ComponentType } from "react";
import "@/App.css";

// 1. Critical "Above-the-Fold" Components (Load immediately)
import MatrixBackground from "@/components/MatrixBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// 2. Global UI Utilities (Lightweight, but can load right after)
import CursorEffects from "@/components/CursorEffects";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollRobot from "@/components/ScrollRobot";

// 3. Lazy Load Heavy "Below-the-Fold" Sections
const FlyingDrone = lazy(() => import("@/components/FlyingDrone"));

type DeferredSectionModule = { default: ComponentType };
type DeferredSectionProps = {
  id: string;
  minHeight: string;
  load: () => Promise<DeferredSectionModule>;
};

const DeferredSection = ({ id, minHeight, load }: DeferredSectionProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [Section, setSection] = useState<ComponentType | null>(null);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;
    let cancelled = false;

    const loadSection = () => {
      void load().then(({ default: LoadedSection }) => {
        if (!cancelled) setSection(() => LoadedSection);
      });
    };

    if (!("IntersectionObserver" in window)) {
      loadSection();
      return () => { cancelled = true; };
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      loadSection();
    }, { rootMargin: "1200px 0px", threshold: 0.01 });

    observer.observe(placeholder);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [load]);

  if (Section) return <Section />;
  return (
    <div
      ref={placeholderRef}
      id={id}
      className="deferred-section-placeholder"
      aria-hidden="true"
      style={{ minHeight, scrollMarginTop: "6rem" }}
    />
  );
};

const DEFERRED_SECTIONS = [
  { id: "about", minHeight: "80vh", load: () => import("@/components/About") },
  { id: "projects", minHeight: "100vh", load: () => import("@/components/Projects") },
  { id: "services", minHeight: "100vh", load: () => import("@/components/Services") },
  { id: "writings", minHeight: "130vh", load: () => import("@/components/Writings") },
  { id: "bookshelf", minHeight: "100vh", load: () => import("@/components/Bookshelf") },
  { id: "news", minHeight: "110vh", load: () => import("@/components/News") },
  { id: "movies", minHeight: "180vh", load: () => import("@/components/Movies") },
  { id: "games", minHeight: "140vh", load: () => import("@/components/Games") },
  { id: "role-models", minHeight: "140vh", load: () => import("@/components/RoleModels") },
  { id: "achievements", minHeight: "100vh", load: () => import("@/components/Achievements") },
  { id: "contact", minHeight: "90vh", load: () => import("@/components/Contact") },
];

const Index = ({ isReady }: { isReady: boolean }) => {
  const [showDesktopDrone, setShowDesktopDrone] = useState(false);

  useEffect(() => {
    const desktopPointer = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const syncDrone = () => setShowDesktopDrone(desktopPointer.matches);
    syncDrone();
    desktopPointer.addEventListener("change", syncDrone);
    return () => desktopPointer.removeEventListener("change", syncDrone);
  }, []);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".site-main");
    if (!main) return;

    const observedSections = new Set<Element>();
    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("section-is-visible");
            observer?.unobserve(entry.target);
          });
        }, { rootMargin: "0px 0px -12% 0px", threshold: 0.04 });

    const observeSections = () => {
      main.querySelectorAll(":scope > section:not(#home)").forEach((section) => {
        if (observedSections.has(section)) return;
        observedSections.add(section);
        if (observer) observer.observe(section);
        else section.classList.add("section-is-visible");
      });
    };

    observeSections();
    const mutations = new MutationObserver(observeSections);
    mutations.observe(main, { childList: true });

    return () => {
      mutations.disconnect();
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Matrix background - appears behind everything */}
      <MatrixBackground />
      
      {/* All your content with proper layering */}
      <div className="min-h-screen relative z-10">
        {/* Utilities */}
        <Suspense fallback={null}>
          {showDesktopDrone && <FlyingDrone />}
        </Suspense>
        <CursorEffects />
        <Navigation />
        <ScrollToTop />
        <ScrollRobot />

        <main className="site-main">
          {/* Critical Content loaded instantly */}
          <Hero startTyping={isReady} />

          {DEFERRED_SECTIONS.map((section) => (
            <DeferredSection key={section.id} {...section} />
          ))}
        </main>
      </div>
    </>
  );
};

export default Index;
