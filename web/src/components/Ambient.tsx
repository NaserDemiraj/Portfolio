import { lazy, type ReactNode } from 'react';
import { Decor } from './Decor';

const DarkVeil = lazy(() => import('./reactbits/DarkVeil/DarkVeil'));
const Noise = lazy(() => import('./reactbits/Noise/Noise'));

/** A faint moving veil of mint light behind a run of sections. */
export function VeilRegion({ children }: { children: ReactNode }) {
  return (
    <div className="veil-region">
      <div className="veil-region__bg" aria-hidden="true">
        <Decor>
          <DarkVeil
            color="#2f8f64"
            speed={0.25}
            scale={1.4}
            flow={0.8}
            warp={0.15}
            brightness={0.55}
            glow={0.25}
            grain={0}
            quality={0.4}
            mouseStrength={0.4}
            dpr={1}
          />
        </Decor>
      </div>
      {children}
    </div>
  );
}

/** Fixed, barely-there film grain over the whole page so flat darks get texture. */
export function FilmGrain() {
  return (
    <Decor>
      <Noise fixed opacity={0.04} fps={18} contrast={0.5} zIndex={60} />
    </Decor>
  );
}
