import { useCallback, useEffect, useRef, useState } from "react";
import robotPortrait from "@/assets/sasibot-android-symmetric.webp";
import Sasibot from "@/components/Sasibot";
import Sasibot3D from "@/components/Sasibot3D";

const SECTION_LABELS: Record<string, string> = {
  home: "INTRO",
  about: "ABOUT",
  projects: "PROJECTS",
  builds: "BUILDS",
  services: "SERVICES",
  writings: "WRITINGS",
  bookshelf: "LIBRARY",
  news: "NEWS",
  movies: "MOVIES",
  games: "GAMES",
  "role-models": "INSPIRATION",
  achievements: "AWARDS",
  contact: "CONTACT",
};

const ScrollRobot = () => {
  const robotRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef("INTRO");
  const [label, setLabel] = useState("INTRO");
  const [chatOpen, setChatOpen] = useState(false);
  const [robot3DReady, setRobot3DReady] = useState(false);

  const closeChat = useCallback(() => {
    setChatOpen(false);
    window.requestAnimationFrame(() => robotRef.current?.focus());
  }, []);
  const handleRobot3DReady = useCallback(() => setRobot3DReady(true), []);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".site-main") ?? document.querySelector<HTMLElement>("main");
    if (!main) return;

    const updateLabel = () => {
      const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section[id]"));
      if (sections.length === 0) return;

      const threshold = window.innerHeight * 0.42;
      let activeSection = sections[0];
      for (const section of sections) {
        const heading = section.querySelector<HTMLElement>("h1, h2");
        if (!heading || heading.getBoundingClientRect().top > threshold) break;
        activeSection = section;
      }

      const nextLabel = SECTION_LABELS[activeSection.id] ?? activeSection.id.replace(/-/g, " ").toUpperCase();
      if (labelRef.current !== nextLabel) {
        labelRef.current = nextLabel;
        setLabel(nextLabel);
      }
    };

    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateLabel();
      });
    };

    updateLabel();
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
  }, []);

  return (
    <>
      <button
        ref={robotRef}
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        className="scroll-robot"
        aria-label={chatOpen ? "Close Sasibot chat" : "Chat with Sasibot"}
        aria-expanded={chatOpen}
        aria-controls="sasibot-panel"
        title={chatOpen ? "Close Sasibot chat" : "Chat with Sasibot"}
      >
        <span className="scroll-robot-label" aria-hidden="true">
          <span className="scroll-robot-live"><span />SASIBOT</span>
          <span className="scroll-robot-section">{label}</span>
        </span>
        <span className="scroll-robot-visual" data-3d-ready={robot3DReady} aria-hidden="true">
          <img
            src={robotPortrait}
            alt=""
            className="scroll-robot-portrait scroll-robot-fallback"
            decoding="async"
            fetchPriority="low"
          />
          <Sasibot3D buttonRef={robotRef} onReady={handleRobot3DReady} />
        </span>
      </button>

      <Sasibot open={chatOpen} onClose={closeChat} />
    </>
  );
};

export default ScrollRobot;
