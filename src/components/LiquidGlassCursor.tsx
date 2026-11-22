import { useEffect } from "react";

const LENS_SIZE = 184;
const LENS_MAGNIFICATION = 1.12;
const LENS_DISTORTION = 9;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const LiquidGlassCursor = () => {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const idleWindow = window as IdleWindow;
    let stopLens: (() => void) | undefined;

    const startLens = () => {
      const root = document.getElementById("root");
      if (!root) return () => undefined;

      const lens = document.createElement("div");
      lens.className = "liquid-glass-lens";
      lens.setAttribute("aria-hidden", "true");
      lens.innerHTML = [
        '<svg class="liquid-glass-lens__filters" xmlns="http://www.w3.org/2000/svg">',
        '<filter id="liquid-glass-displacement" x="-12%" y="-12%" width="124%" height="124%">',
        '<feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="1" seed="6" result="glass-noise" />',
        '<feDisplacementMap in="SourceGraphic" in2="glass-noise" scale="' + LENS_DISTORTION + '" xChannelSelector="R" yChannelSelector="G" />',
        "</filter>",
        "</svg>",
        '<div class="liquid-glass-lens__viewport"><div class="liquid-glass-lens__scene"></div></div>',
      ].join("");
      lens.style.setProperty("--lens-size", LENS_SIZE + "px");
      lens.style.setProperty("--lens-magnification", String(LENS_MAGNIFICATION));
      const distortionAvailable = CSS.supports("filter", "url(#liquid-glass-displacement)");
      lens.classList.toggle("is-fallback", !distortionAvailable);
      document.body.appendChild(lens);

      const scene = lens.querySelector<HTMLElement>(".liquid-glass-lens__scene")!;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let visible = false;
      let navigationCopy: HTMLElement | null = null;
      let frame = 0;
      let idleTask = 0;
      let refreshTimer = 0;
      let disposed = false;

      const scheduleIdle = (callback: () => void) => {
        if (idleWindow.requestIdleCallback) {
          idleTask = idleWindow.requestIdleCallback(callback, { timeout: 1200 });
        } else {
          idleTask = window.setTimeout(callback, 90);
        }
      };

      const copyScene = () => {
        if (disposed) return;
        const pageContent = root.querySelector<HTMLElement>(".site-main, main, [role='main'], .min-h-screen")
          ?? root.firstElementChild as HTMLElement | null;
        if (!pageContent) return;
        const pageCopy = pageContent.cloneNode(true) as HTMLElement;
        pageCopy.style.position = "absolute";
        pageCopy.style.top = "0";
        pageCopy.style.left = "0";
        pageCopy.style.width = root.clientWidth + "px";
        const clones = [pageCopy];
        const navigation = root.querySelector<HTMLElement>(".site-navigation");
        if (navigation) {
          navigationCopy = navigation.cloneNode(true) as HTMLElement;
          const navigationBounds = navigation.getBoundingClientRect();
          navigationCopy.style.position = "absolute";
          navigationCopy.style.top = window.scrollY + navigationBounds.top + "px";
          navigationCopy.style.left = navigationBounds.left + "px";
          navigationCopy.style.right = "auto";
          clones.push(navigationCopy);
        }
        clones.forEach((clone) => {
          clone.querySelectorAll("script").forEach((element) => element.remove());
          clone.querySelectorAll("iframe, video, audio, object, embed").forEach((element) => {
            (element as HTMLElement).dataset.liquidGlassMedia = "true";
            element.removeAttribute("src");
            element.removeAttribute("srcset");
            element.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
          });
          clone.querySelectorAll("button, a, input, textarea, select, [tabindex]").forEach((element) => {
            element.setAttribute("tabindex", "-1");
          });
          clone.querySelectorAll("canvas").forEach((canvas) => {
            (canvas as HTMLCanvasElement).dataset.liquidGlassMedia = "true";
          });
          clone.setAttribute("aria-hidden", "true");
          clone.setAttribute("inert", "");
        });
        scene.replaceChildren(...clones);
        scene.querySelectorAll<HTMLElement>("[data-liquid-glass-media]").forEach((media) => {
          const bounds = media.getBoundingClientRect();
          const style = getComputedStyle(media);
          const placeholder = document.createElement("div");
          placeholder.className = "liquid-glass-lens__canvas-placeholder";
          placeholder.style.width = bounds.width + "px";
          placeholder.style.height = bounds.height + "px";
          placeholder.style.display = style.display === "inline" ? "inline-block" : style.display;
          placeholder.style.flex = style.flex;
          placeholder.style.aspectRatio = style.aspectRatio;
          placeholder.style.borderRadius = style.borderRadius;
          media.replaceWith(placeholder);
        });
        scene.style.width = Math.max(root.scrollWidth, window.innerWidth) + "px";
        scene.style.height = Math.max(root.scrollHeight, window.innerHeight) + "px";
      };

      const requestSceneRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => scheduleIdle(copyScene), 500);
      };

      const render = () => {
        frame = 0;
        if (disposed || !visible) return;
        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.2;
        const radius = LENS_SIZE / 2;
        const scrollY = window.scrollY;
        lens.style.left = currentX - radius + "px";
        lens.style.top = currentY - radius + "px";
        scene.style.transform = "translate3d(" +
          (radius - currentX * LENS_MAGNIFICATION) + "px," +
          (radius - (currentY + scrollY) * LENS_MAGNIFICATION) + "px,0) scale(" +
          LENS_MAGNIFICATION + ")";
        if (navigationCopy) {
          const navigation = root.querySelector<HTMLElement>(".site-navigation");
          if (navigation) navigationCopy.style.top = window.scrollY + navigation.getBoundingClientRect().top + "px";
        }
        if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.25) {
          frame = window.requestAnimationFrame(render);
        }
      };

      const reveal = (event: PointerEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;
        if (!visible) {
          visible = true;
          currentX = targetX;
          currentY = targetY;
          lens.dataset.visible = "true";
        }
        if (!frame) frame = window.requestAnimationFrame(render);
      };

      const hide = () => {
        visible = false;
        delete lens.dataset.visible;
      };

      const onPointerOut = (event: PointerEvent) => {
        if (!event.relatedTarget) hide();
      };

      const onScroll = () => {
        requestSceneRefresh();
        if (visible && !frame) frame = window.requestAnimationFrame(render);
      };

      scheduleIdle(copyScene);
      const observer = new MutationObserver(requestSceneRefresh);
      observer.observe(root, { childList: true, subtree: true, characterData: true });
      window.addEventListener("pointermove", reveal, { passive: true });
      window.addEventListener("pointerout", onPointerOut, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", requestSceneRefresh, { passive: true });

      return () => {
        disposed = true;
        observer.disconnect();
        window.clearTimeout(refreshTimer);
        if (idleWindow.cancelIdleCallback && idleTask) idleWindow.cancelIdleCallback(idleTask);
        else if (idleTask) window.clearTimeout(idleTask);
        if (frame) window.cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", reveal);
        window.removeEventListener("pointerout", onPointerOut);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", requestSceneRefresh);
        lens.remove();
      };
    };

    const syncPreference = () => {
      stopLens?.();
      stopLens = undefined;
      if (finePointer.matches && !reducedMotion.matches) stopLens = startLens();
    };

    syncPreference();
    finePointer.addEventListener("change", syncPreference);
    reducedMotion.addEventListener("change", syncPreference);
    return () => {
      finePointer.removeEventListener("change", syncPreference);
      reducedMotion.removeEventListener("change", syncPreference);
      stopLens?.();
    };
  }, []);

  return null;
};

export default LiquidGlassCursor;
