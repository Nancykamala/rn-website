import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  once?: boolean;
  distance?: number;
  duration?: number;
}

export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) => {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -40px 0px",
    delay = 0,
    once = true,
    distance = 18,
    duration = 650,
  } = options;

  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = window.setTimeout(() => setRevealed(true), delay);
            if (once) io.unobserve(entry.target);
            return () => window.clearTimeout(id);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [threshold, rootMargin, delay, once]);

  const style: React.CSSProperties = revealed
    ? {
        opacity: 1,
        transform: "translateY(0)",
        transition: `opacity ${duration}ms cubic-bezier(.2,.7,.2,1), transform ${duration}ms cubic-bezier(.2,.7,.2,1)`,
        transitionDelay: `${delay}ms`,
      }
    : {
        opacity: 0,
        transform: `translateY(${distance}px)`,
      };

  return { ref, revealed, style };
};

export default useReveal;
