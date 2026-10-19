import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react';

type State = { failed: boolean };

class DecorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Decorative effects are optional: log and carry on without them.
    console.warn('Decorative effect failed to load; continuing without it.', error, info.componentStack);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Wraps purely decorative, lazily loaded effects (WebGL backgrounds, film grain).
 * If the chunk fails to download (offline, flaky network, blocked by an extension) or
 * the effect throws (no WebGL), the page renders normally without it instead of crashing.
 */
export function Decor({ children }: { children: ReactNode }) {
  return (
    <DecorBoundary>
      <Suspense fallback={null}>{children}</Suspense>
    </DecorBoundary>
  );
}
