import { useEffect, useRef, useState } from "react";

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
  const robotRef = useRef<HTMLDivElement>(null);
  const armRef = useRef<SVGGElement>(null);
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const frameRef = useRef(0);
  const labelRef = useRef("INTRO");
  const [label, setLabel] = useState("INTRO");

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
      arm.setAttribute("transform", "rotate(" + currentAngleRef.current.toFixed(2) + " 150 114)");

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
      const originX = robotRect.left + robotRect.width * (150 / 240);
      const originY = robotRect.top + robotRect.height * (114 / 300);
      const targetX = clamp(headingRect.left + headingRect.width / 2, 20, window.innerWidth - 20);
      const targetY = clamp(
        headingRect.top + headingRect.height / 2,
        96,
        window.innerHeight - 60,
      );
      const visibleTargetY = sectionRect.top > targetY && sectionRect.top < window.innerHeight
        ? clamp(sectionRect.top + 72, 96, window.innerHeight - 60)
        : targetY;

      targetAngleRef.current = Math.atan2(visibleTargetY - originY, targetX - originX) * 180 / Math.PI;
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
    <div className="scroll-robot" ref={robotRef} aria-hidden="true">
      <div className="scroll-robot-label"><span />{label}</div>
      <svg className="scroll-robot-svg" viewBox="0 0 240 300" role="presentation">
        <defs>
          <linearGradient id="scroll-robot-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eef8ff" />
            <stop offset="0.45" stopColor="#8ea9bf" />
            <stop offset="1" stopColor="#425c73" />
          </linearGradient>
          <linearGradient id="scroll-robot-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#24384c" />
            <stop offset="1" stopColor="#091521" />
          </linearGradient>
          <radialGradient id="scroll-robot-core">
            <stop offset="0" stopColor="#d9ffff" />
            <stop offset="0.35" stopColor="#00d9ff" />
            <stop offset="1" stopColor="#007a9a" />
          </radialGradient>
          <filter id="scroll-robot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <ellipse cx="118" cy="284" rx="55" ry="9" fill="#00c8ed" opacity="0.18" />
        <g className="scroll-robot-body">
          <path d="M91 183 L86 250 Q85 261 96 263 L111 263 Q120 261 119 252 L123 194 Z" fill="url(#scroll-robot-metal)" stroke="#d7f4ff" strokeOpacity=".45" strokeWidth="2" />
          <path d="M127 194 L132 251 Q132 262 143 263 L157 262 Q168 259 164 248 L155 183 Z" fill="url(#scroll-robot-metal)" stroke="#d7f4ff" strokeOpacity=".45" strokeWidth="2" />
          <path d="M88 251 L118 251 L118 266 Q117 271 110 272 L84 272 Q78 270 83 264 Z" fill="#263d52" stroke="#8daec3" strokeWidth="2" />
          <path d="M133 251 L163 250 L170 264 Q172 270 165 272 L139 272 Q132 271 132 265 Z" fill="#263d52" stroke="#8daec3" strokeWidth="2" />
          <path d="M91 184 Q118 174 155 184 L160 201 Q123 211 88 201 Z" fill="url(#scroll-robot-dark)" stroke="#718da4" strokeWidth="2" />
          <rect x="72" y="94" width="88" height="96" rx="27" fill="url(#scroll-robot-metal)" stroke="#e1f6ff" strokeOpacity=".62" strokeWidth="2" />
          <path d="M82 107 Q116 95 151 107 L151 165 Q117 177 82 165 Z" fill="url(#scroll-robot-dark)" stroke="#7095ad" strokeWidth="2" />
          <path d="M94 119 Q116 111 139 119 L136 147 Q116 155 97 147 Z" fill="#10293a" stroke="#4a748c" strokeWidth="1.5" />
          <circle cx="116" cy="133" r="10" fill="url(#scroll-robot-core)" filter="url(#scroll-robot-glow)" />
          <circle cx="116" cy="133" r="3" fill="#efffff" />
          <path d="M99 159 Q116 166 134 159" fill="none" stroke="#9cc5d8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="73" cy="112" r="13" fill="url(#scroll-robot-metal)" stroke="#c5e8f7" strokeWidth="2" />
          <circle cx="159" cy="112" r="13" fill="url(#scroll-robot-metal)" stroke="#c5e8f7" strokeWidth="2" />
          <path d="M82 43 Q82 27 98 26 L135 26 Q151 29 151 44 L151 70 Q151 91 132 94 L101 94 Q82 90 82 70 Z" fill="url(#scroll-robot-metal)" stroke="#e3f7ff" strokeOpacity=".8" strokeWidth="2" />
          <path d="M90 48 Q91 39 101 39 L132 39 Q142 41 143 50 L143 67 Q142 78 132 80 L101 80 Q91 77 90 67 Z" fill="#0a1723" stroke="#54748c" strokeWidth="2" />
          <path d="M101 58 L108 58 M126 58 L133 58" stroke="#65f4ff" strokeWidth="5" strokeLinecap="round" filter="url(#scroll-robot-glow)" />
          <path d="M116 26 L116 15" stroke="#b5d6e7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="116" cy="12" r="6" fill="#5beaff" filter="url(#scroll-robot-glow)" />
          <path d="M82 132 L62 143 L48 161" fill="none" stroke="url(#scroll-robot-metal)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="62" cy="143" r="8" fill="#8ea9bf" stroke="#d7f4ff" strokeWidth="2" />
          <path d="M48 159 L38 167 L43 173 L47 168 L50 177 L56 174 L55 166 Z" fill="url(#scroll-robot-metal)" stroke="#d7f4ff" strokeWidth="1.5" strokeLinejoin="round" />
          <g ref={armRef} className="scroll-robot-pointing-arm" transform="rotate(0 150 114)">
            <path d="M150 114 L177 120 L200 120" fill="none" stroke="url(#scroll-robot-metal)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="177" cy="120" r="8" fill="#a9c5d7" stroke="#e2f8ff" strokeWidth="2" />
            <path d="M197 111 L207 108 L216 110 L218 103 L223 103 L223 111 L236 111 L236 119 L219 119 L214 126 L201 127 Z" fill="url(#scroll-robot-metal)" stroke="#e2f8ff" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M224 111 L235 111" stroke="#45efff" strokeWidth="2" strokeLinecap="round" filter="url(#scroll-robot-glow)" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ScrollRobot;
