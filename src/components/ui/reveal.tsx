/**
 * Reveal — fades and lifts children in once on mount.
 *
 * Pure CSS animation, no client JS. The keyframe (`reveal` in
 * globals.css) runs as the element mounts. `prefers-reduced-motion`
 * is honoured by the global CSS rule that neutralises animations.
 *
 * Why this approach over IntersectionObserver: SSR-safe, no hydration
 * cost, no risk of below-the-fold content sticking at opacity 0 if a
 * client-only listener never fires (e.g. user scrolls before
 * hydration). The "scroll-into-view feel" is sacrificed for
 * reliability — fine for a marketing site where content presence
 * matters more than choreography.
 */

import type { CSSProperties } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Delay in ms before the animation starts, for orchestration. */
  delay?: number;
  /** Element tag — defaults to `div`. */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({ children, delay = 0, as = "div", className = "", style }: RevealProps) {
  const Tag = as as "div";
  return (
    <Tag
      className={className}
      style={{
        animation: `reveal 0.9s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay}ms both`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
