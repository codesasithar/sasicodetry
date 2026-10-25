import { useCallback, useEffect, useRef, useState } from "react";
import robotPortrait from "@/assets/sasibot-android.png";
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

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const ScrollRobot = () => {
  const robotRef = useRef<HTMLButtonElement>(null);
  const armRef = useRef<SVGGElement>(null);
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const frameRef = useRef(0);
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animateArm = () => {
      frameRef.current = 0;
      const arm = armRef.current;
      if (!arm) return;

      const difference = ((targetAngleRef.current - currentAngleRef.current + 540) % 360) - 180;
      currentAngleRef.current = reducedMotion.matches
        ? targetAngleRef.current
        : currentAngleRef.current + difference * 0.18;
      if (Math.abs(difference) < 0.45 || reducedMotion.matches) currentAngleRef.current = targetAngleRef.current;
      arm.style.transform = "rotate(" + currentAngleRef.current.toFixed(2) + "deg)";

      if (Math.abs(difference) >= 0.45 && !reducedMotion.matches) {
        frameRef.current = window.requestAnimationFrame(animateArm);
      }
    };

    const updateTarget = () => {
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

      const robot = robotRef.current;
      const heading = activeSection.querySelector<HTMLElement>("h1, h2");
      if (!robot || !heading) return;

      const robotRect = robot.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      const sectionRect = activeSection.getBoundingClientRect();
      const originX = robotRect.left + robotRect.width * (82 / 240);
      const originY = robotRect.top + robotRect.height * (108 / 426.67);
      const targetX = clamp(headingRect.left + headingRect.width / 2, 20, window.innerWidth - 20);
      const targetY = clamp(headingRect.top + headingRect.height / 2, 96, window.innerHeight - 60);
      const visibleTargetY = sectionRect.top > targetY && sectionRect.top < window.innerHeight
        ? clamp(sectionRect.top + 72, 96, window.innerHeight - 60)
        : targetY;
      const worldAngle = Math.atan2(visibleTargetY - originY, targetX - originX) * 180 / Math.PI;
      const armRotation = worldAngle - 180;
      targetAngleRef.current = ((armRotation + 180) % 360 + 360) % 360 - 180;

      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(animateArm);
    };

    let scrollFrame = 0;
    const scheduleUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateTarget();
      });
    };

    updateTarget();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const mutations = new MutationObserver(scheduleUpdate);
    mutations.observe(main, { childList: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mutations.disconnect();
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
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
        <span className="scroll-robot-visual" aria-hidden="true">
          <img src={robotPortrait} alt="" className="scroll-robot-portrait" decoding="async" />
          <svg className="scroll-robot-svg" viewBox="0 0 240 426.67" role="presentation">
            <defs>
              <linearGradient id="sasibot-arm-metal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f3fbff" />
                <stop offset="0.48" stopColor="#a4b9c9" />
                <stop offset="1" stopColor="#586d80" />
              </linearGradient>
              <filter id="sasibot-arm-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g ref={armRef} className="scroll-robot-pointing-arm" transform="rotate(0 82 108)">
              <path d="M82 108 C74 109 68 116 61 119 L39 112" fill="none" stroke="#101820" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M82 108 C74 109 68 116 61 119" fill="none" stroke="url(#sasibot-arm-metal)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M61 119 L39 112" fill="none" stroke="url(#sasibot-arm-metal)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="61" cy="119" r="7.5" fill="#141d26" stroke="#b8c8d3" strokeWidth="2" />
              <circle cx="61" cy="119" r="2.5" fill="#53eaff" filter="url(#sasibot-arm-glow)" />
              <path d="M40 108 L32 103 L26 105 L18 97 L13 100 L19 110 L3 106 L1 114 L20 120 L30 126 L42 119 Z" fill="url(#sasibot-arm-metal)" stroke="#effaff" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M19 110 L3 107" stroke="#50eaff" strokeWidth="2" strokeLinecap="round" filter="url(#sasibot-arm-glow)" />
            </g>
          </svg>
        </span>
      </button>

      <Sasibot open={chatOpen} onClose={closeChat} />
    </>
  );
};

export default ScrollRobot;
