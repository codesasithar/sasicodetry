import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PointerPosition = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  initialized: boolean;
};

const CursorEffects = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<PointerPosition>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    initialized: false,
  });
  const hoverTargetRef = useRef<Element | null>(null);
  const labelRef = useRef("");
  const visibleRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncCursorSupport = () => {
      const shouldEnable = finePointer.matches && !reducedMotion.matches;
      setEnabled(shouldEnable);
      document.documentElement.classList.toggle("has-modern-cursor", shouldEnable);
    };

    syncCursorSupport();
    finePointer.addEventListener("change", syncCursorSupport);
    reducedMotion.addEventListener("change", syncCursorSupport);

    return () => {
      finePointer.removeEventListener("change", syncCursorSupport);
      reducedMotion.removeEventListener("change", syncCursorSupport);
      document.documentElement.classList.remove("has-modern-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let animationFrame = 0;
    const position = positionRef.current;
    position.initialized = false;

    const moveRing = () => {
      animationFrame = 0;
      const deltaX = position.targetX - position.x;
      const deltaY = position.targetY - position.y;
      position.x += deltaX * 0.2;
      position.y += deltaY * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform =
          "translate3d(" + position.x + "px, " + position.y + "px, 0) translate(-50%, -50%)";
      }

      if (Math.abs(deltaX) > 0.15 || Math.abs(deltaY) > 0.15) {
        animationFrame = window.requestAnimationFrame(moveRing);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const { clientX, clientY } = event;
      if (!position.initialized) {
        position.x = clientX;
        position.y = clientY;
        position.initialized = true;
      }
      position.targetX = clientX;
      position.targetY = clientY;

      if (dotRef.current) {
        dotRef.current.style.transform =
          "translate3d(" + clientX + "px, " + clientY + "px, 0) translate(-50%, -50%)";
      }
      if (!animationFrame) animationFrame = window.requestAnimationFrame(moveRing);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = event.target instanceof Element ? event.target : null;
      const isEditable = Boolean(target?.closest('input, textarea, select, [contenteditable="true"]'));
      if (isEditable) {
        visibleRef.current = false;
        setVisible(false);
        hoverTargetRef.current = null;
        labelRef.current = "";
        setHovering(false);
        setLabel("");
        return;
      }

      const interactive = target?.closest<HTMLElement>("[data-cursor-label], a, button, [role='button']") ?? null;
      const nextLabel = interactive
        ? interactive.dataset.cursorLabel || (interactive.tagName === "A" ? "Open" : "Select")
        : "";

      if (interactive !== hoverTargetRef.current || nextLabel !== labelRef.current) {
        hoverTargetRef.current = interactive;
        labelRef.current = nextLabel;
        setHovering(Boolean(interactive));
        setLabel(nextLabel);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") setPressed(true);
    };
    const onPointerUp = () => setPressed(false);
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget !== null) return;
      visibleRef.current = false;
      setVisible(false);
      setPressed(false);
      hoverTargetRef.current = null;
      labelRef.current = "";
      setHovering(false);
      setLabel("");
    };
    const onWindowBlur = () => {
      visibleRef.current = false;
      setVisible(false);
      setPressed(false);
    };
    const onVisibilityChange = () => {
      if (document.hidden) onWindowBlur();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringClasses = ["modern-cursor", visible && "is-visible", hovering && "is-hovering", pressed && "is-pressed"]
    .filter(Boolean)
    .join(" ");
  const dotClasses = ["modern-cursor-dot", visible && "is-visible", pressed && "is-pressed"]
    .filter(Boolean)
    .join(" ");

  return createPortal(
    <>
      <div ref={ringRef} aria-hidden="true" className={ringClasses}>
        <span className="modern-cursor-ring" />
        {label && <span className="modern-cursor-label">{label}</span>}
      </div>
      <div ref={dotRef} aria-hidden="true" className={dotClasses} />
    </>,
    document.body
  );
};

export default CursorEffects;