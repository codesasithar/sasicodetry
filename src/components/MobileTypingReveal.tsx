import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

type MobileTypingRevealProps = {
  children: ReactNode;
  startDelay?: number;
};

const mobileTypingIsEnabled = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const extractText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
};

const renderTypedPrefix = (
  node: ReactNode,
  cursor: { remaining: number },
): ReactNode => {
  if (typeof node === "string" || typeof node === "number") {
    const characters = Array.from(String(node));
    const visibleCount = Math.min(characters.length, cursor.remaining);
    cursor.remaining -= visibleCount;
    return characters.slice(0, visibleCount).join("");
  }

  if (Array.isArray(node)) {
    return Children.map(node, (child) => renderTypedPrefix(child, cursor));
  }

  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    if (element.props.children === undefined) return element;
    return cloneElement(element, {
      children: renderTypedPrefix(element.props.children, cursor),
    });
  }

  return node;
};

const MobileTypingReveal = ({ children, startDelay = 0 }: MobileTypingRevealProps) => {
  const revealRef = useRef<HTMLSpanElement>(null);
  const fullText = extractText(children);
  const characterCount = Array.from(fullText).length;
  const [shouldAnimate, setShouldAnimate] = useState(mobileTypingIsEnabled);
  const [hasStarted, setHasStarted] = useState(() => !mobileTypingIsEnabled());
  const [visibleCharacters, setVisibleCharacters] = useState(() =>
    mobileTypingIsEnabled() ? 0 : characterCount,
  );
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionMode = () => {
      const enabled = mobileQuery.matches && !reducedMotionQuery.matches;
      setShouldAnimate(enabled);
      setHasStarted(!enabled);
      setVisibleCharacters(enabled ? 0 : characterCount);
      setIsTyping(false);
    };

    syncMotionMode();
    mobileQuery.addEventListener("change", syncMotionMode);
    reducedMotionQuery.addEventListener("change", syncMotionMode);
    return () => {
      mobileQuery.removeEventListener("change", syncMotionMode);
      reducedMotionQuery.removeEventListener("change", syncMotionMode);
    };
  }, [characterCount]);

  useEffect(() => {
    const target = revealRef.current;
    if (!shouldAnimate || hasStarted || !target) return;

    if (!("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasStarted, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate || !hasStarted || characterCount === 0) return;

    let characterIndex = 0;
    let timeoutId = 0;
    const characters = Array.from(fullText);
    const baseDelay = characterCount > 150 ? 10 : characterCount > 85 ? 13 : 17;

    const typeNextCharacter = () => {
      characterIndex += 1;
      setVisibleCharacters(characterIndex);
      setIsTyping(true);

      if (characterIndex >= characterCount) {
        setIsTyping(false);
        return;
      }

      const lastCharacter = characters[characterIndex - 1];
      const pause = ".!?".includes(lastCharacter)
        ? 125
        : ",;:—".includes(lastCharacter)
          ? 55
          : baseDelay;
      timeoutId = window.setTimeout(typeNextCharacter, pause);
    };

    timeoutId = window.setTimeout(typeNextCharacter, startDelay + 70);
    return () => window.clearTimeout(timeoutId);
  }, [characterCount, fullText, hasStarted, shouldAnimate, startDelay]);

  if (!shouldAnimate) return <>{children}</>;

  const cursor = { remaining: visibleCharacters };

  return (
    <span ref={revealRef} className="mobile-typing-reveal">
      <span className="mobile-typing-reserve" aria-hidden="true">{children}</span>
      <span className="mobile-typing-visual" aria-hidden="true">
        {renderTypedPrefix(children, cursor)}
        {isTyping && <span className="mobile-typing-caret" />}
      </span>
      <span className="mobile-typing-accessible">{fullText}</span>
    </span>
  );
};

export default MobileTypingReveal;
