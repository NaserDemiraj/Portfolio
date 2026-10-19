import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Space reserved until mounted, so the page doesn't jump when the content appears. */
  minHeight: number | string;
  /** How early to mount, before the block scrolls into view. */
  rootMargin?: string;
  className?: string;
};

/**
 * Mounts heavy, below-the-fold components only when the visitor scrolls near them.
 * Components that measure the DOM (carousels, bento grids, canvases) otherwise do all
 * that work at page load, competing with the hero for the main thread.
 * Once mounted it stays mounted.
 */
export function LazyMount({ children, minHeight, rootMargin = '600px 0px', className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (visible || !el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
