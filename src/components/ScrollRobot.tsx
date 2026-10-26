import { useCallback, useEffect, useRef, useState } from "react";
import robotPortrait from "@/assets/sasibot-android-symmetric.png";
import Sasibot from "@/components/Sasibot";

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
  const visualRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const gazeRef = useRef<SVGGElement>(null);
  const labelRef = useRef("INTRO");
  const [label, setLabel] = useState("INTRO");
  const [chatOpen, setChatOpen] = useState(false);

  const closeChat = useCallback(() => {
    setChatOpen(false);
    window.requestAnimationFrame(() => robotRef.current?.focus());
  }, []);

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

  useEffect(() => {
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let frame = 0;

    const updateGaze = () => {
      frame = 0;
      const visual = visualRef.current;
      const head = headRef.current;
      const gaze = gazeRef.current;
      if (!visual || !head || !gaze) return;

      const bounds = visual.getBoundingClientRect();
      const faceCenterX = bounds.left + bounds.width * (118 / 240);
      const faceCenterY = bounds.top + bounds.height * (29.5 / 426.67);
      const horizontal = Math.max(-1, Math.min(1, (pointerX - faceCenterX) / Math.max(bounds.width * 0.8, 1)));
      const vertical = Math.max(-1, Math.min(1, (pointerY - faceCenterY) / Math.max(bounds.height * 0.55, 1)));
      const x = horizontal * 2.2;
      const y = vertical * 1.25;

      head.style.setProperty("--head-x", `${(horizontal * 2.2).toFixed(2)}px`);
      head.style.setProperty("--head-y", `${(vertical * 1.5).toFixed(2)}px`);
      head.style.setProperty("--head-yaw", `${(horizontal * 34).toFixed(2)}deg`);
      head.style.setProperty("--head-pitch", `${(vertical * 18).toFixed(2)}deg`);
      head.style.setProperty("--head-roll", `${(horizontal * 4.5).toFixed(2)}deg`);
      gaze.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    };

    const scheduleGazeUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateGaze);
    };

    const rememberPointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      scheduleGazeUpdate();
    };

    updateGaze();
    window.addEventListener("pointermove", rememberPointer, { passive: true });
    window.addEventListener("pointerdown", rememberPointer, { passive: true });
    window.addEventListener("resize", scheduleGazeUpdate);

    return () => {
      window.removeEventListener("pointermove", rememberPointer);
      window.removeEventListener("pointerdown", rememberPointer);
      window.removeEventListener("resize", scheduleGazeUpdate);
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
        <span ref={visualRef} className="scroll-robot-visual" aria-hidden="true">
          <img src={robotPortrait} alt="" className="scroll-robot-portrait scroll-robot-body" decoding="async" />
          <span ref={headRef} className="scroll-robot-head">
            <img src={robotPortrait} alt="" className="scroll-robot-portrait scroll-robot-head-portrait" decoding="async" />
            <svg className="scroll-robot-gaze-overlay" viewBox="0 0 240 426.67" role="presentation">
              <g ref={gazeRef} className="scroll-robot-gaze">
                <ellipse cx="110.2" cy="29.5" rx="1.45" ry="1.55" fill="#06131d" stroke="#65e8ff" strokeWidth="0.3" />
                <ellipse cx="125.7" cy="29.5" rx="1.45" ry="1.55" fill="#06131d" stroke="#65e8ff" strokeWidth="0.3" />
                <circle cx="109.7" cy="28.9" r="0.34" fill="#e1fbff" />
                <circle cx="125.2" cy="28.9" r="0.34" fill="#e1fbff" />
              </g>
            </svg>
          </span>
        </span>
      </button>

      <Sasibot open={chatOpen} onClose={closeChat} />
    </>
  );
};

export default ScrollRobot;
