let cached: boolean | undefined;

const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;

/**
 * Should the decorative WebGL backgrounds run on this device?
 *
 * Asks the browser for a context with `failIfMajorPerformanceCaveat`, which fails when
 * WebGL would be software-rendered (no usable GPU, blocklisted drivers, remote desktops,
 * VMs). Software-rendered shaders drop the page to a few frames per second, so on those
 * devices the page is simply shown without them.
 *
 * Override for debugging: `?fx=on` forces them on, `?fx=off` forces them off.
 */
export function webglEffectsAllowed(): boolean {
  if (cached !== undefined) return cached;
  const forced = new URLSearchParams(window.location.search).get('fx');
  if (forced === 'on') return (cached = true);
  if (forced === 'off') return (cached = false);
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    cached = Boolean(gl);
    if (gl) {
      // Some software rasterizers pass the caveat check, so also look at the renderer name.
      const ctx = gl as WebGLRenderingContext;
      const info = ctx.getExtension('WEBGL_debug_renderer_info');
      const renderer = info ? String(ctx.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
      if (SOFTWARE_RENDERER.test(renderer)) cached = false;
      ctx.getExtension('WEBGL_lose_context')?.loseContext();
    }
  } catch {
    cached = false;
  }
  return cached;
}
