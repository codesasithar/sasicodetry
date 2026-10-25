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
              {/* Shoulder socket and dark articulated core */}
              <path d="M83 108 C75 102 68 103 61 109 L31 112" fill="none" stroke="#101820" strokeWidth="15" strokeLinecap="round" />
              <path d="M77 107 L64 110 L54 109" fill="none" stroke="#8398a8" strokeWidth="3" strokeLinecap="round" />
              <path d="M73 111 L61 113 L53 111" fill="none" stroke="#1a2732" strokeWidth="2" strokeLinecap="round" />

              {/* Layered shoulder and upper-arm armor */}
              <circle cx="81" cy="108" r="12" fill="#101820" stroke="#c3d2dc" strokeWidth="2" />
              <circle cx="81" cy="108" r="8.5" fill="url(#sasibot-arm-metal)" stroke="#effaff" strokeWidth="1.5" />
              <circle cx="81" cy="108" r="3.5" fill="#263744" stroke="#8ca5b7" strokeWidth="1" />
              <circle cx="81" cy="108" r="1.2" fill="#54eaff" filter="url(#sasibot-arm-glow)" />
              <path d="M77 100 L70 95 L62 97 L56 103 L57 110 L62 116 L72 114 L79 110 Z" fill="url(#sasibot-arm-metal)" stroke="#edf9ff" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M72 99 L64 100 L59 104" fill="none" stroke="#ffffff" strokeOpacity=".75" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M71 112 L63 113 L59 110" fill="none" stroke="#586d7e" strokeWidth="1.4" strokeLinecap="round" />

              {/* Elbow bearing and armored forearm */}
              <circle cx="55" cy="110" r="8.5" fill="#0b131b" stroke="#8fa4b3" strokeWidth="2" />
              <circle cx="55" cy="110" r="5.5" fill="url(#sasibot-arm-metal)" stroke="#eaf7ff" strokeWidth="1.2" />
              <circle cx="55" cy="110" r="2.2" fill="#263744" stroke="#8ca5b7" strokeWidth=".8" />
              <path d="M51 103 L44 99 L36 102 L29 108 L30 115 L37 120 L46 118 L53 114 Z" fill="url(#sasibot-arm-metal)" stroke="#effaff" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M45 102 L37 105 L33 109 L34 113" fill="none" stroke="#ffffff" strokeOpacity=".72" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M47 116 L39 117 L34 114" fill="none" stroke="#536a7c" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M47 105 L39 109" fill="none" stroke="#17232e" strokeWidth="2.5" strokeLinecap="round" />

              {/* Wrist assembly and articulated hand with extended index finger */}
              <circle cx="29" cy="112" r="6.5" fill="#111a23" stroke="#d3e3ec" strokeWidth="1.5" />
              <circle cx="29" cy="112" r="3.2" fill="url(#sasibot-arm-metal)" stroke="#60798c" strokeWidth="1" />
              <path d="M31 107 L25 104 L20 106 L17 111 L19 117 L26 119 L32 115 Z" fill="url(#sasibot-arm-metal)" stroke="#effaff" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M21 108 L5 103 Q2 103 1 106 L2 109 L18 114 L22 112 Z" fill="url(#sasibot-arm-metal)" stroke="#effaff" strokeWidth="1.25" strokeLinejoin="round" />
              <path d="M19 114 L7 114 Q4 115 5 118 L8 120 L21 120 L25 117 Z" fill="url(#sasibot-arm-metal)" stroke="#dcecf5" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M20 118 L12 121 Q10 123 13 125 L17 125 L26 120" fill="url(#sasibot-arm-metal)" stroke="#dcecf5" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M10 106 L17 109 M10 116 L17 116 M15 122 L20 119" fill="none" stroke="#526c7e" strokeWidth="1" strokeLinecap="round" />
              <circle cx="7" cy="106" r="1.2" fill="#50eaff" filter="url(#sasibot-arm-glow)" />
            </g>
          </svg>
        </span>
      </button>

      <Sasibot open={chatOpen} onClose={closeChat} />
    </>
  );
};

export default ScrollRobot;
