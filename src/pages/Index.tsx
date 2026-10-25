import { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Services = lazy(() => import("@/components/Services"));
const Writings = lazy(() => import("@/components/Writings"));
const Bookshelf = lazy(() => import("@/components/Bookshelf"));
const News = lazy(() => import("@/components/News"));
const Movies = lazy(() => import("@/components/Movies"));
const Games = lazy(() => import("@/components/Games"));
const RoleModels = lazy(() => import("@/components/RoleModels"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const ContactBot = lazy(() => import("@/components/ContactBot"));

// A lightweight loading placeholder for smooth layout transitions
const SectionLoader = () => (
  <div className="h-48 w-full flex items-center justify-center text-zinc-500 animate-pulse">
    Loading section...
  </div>
);

const Index = ({ isReady }: { isReady: boolean }) => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

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
          <FlyingDrone />
        </Suspense>
        <CursorEffects />
        <Navigation />
        <ScrollToTop />
        <ScrollRobot />

        <main className="site-main">
          {/* Critical Content loaded instantly */}
          <Hero startTyping={isReady} />

          {/* Per-section Suspense so each section streams in independently */}
          <Suspense fallback={<SectionLoader />}><About /></Suspense>
          <Suspense fallback={<SectionLoader />}><Projects /></Suspense>
          <Suspense fallback={<SectionLoader />}><Services /></Suspense>
          <Suspense fallback={<SectionLoader />}><Writings /></Suspense>
          <Suspense fallback={<SectionLoader />}><Bookshelf /></Suspense>
          <Suspense fallback={<SectionLoader />}><News /></Suspense>
          <Suspense fallback={<SectionLoader />}><Movies /></Suspense>
          <Suspense fallback={<SectionLoader />}><Games /></Suspense>
          <Suspense fallback={<SectionLoader />}><RoleModels /></Suspense>
          <Suspense fallback={<SectionLoader />}><Achievements /></Suspense>
          <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
        </main>
        <Suspense fallback={null}><ContactBot /></Suspense>
      </div>
    </>
  );
};

export default Index;
