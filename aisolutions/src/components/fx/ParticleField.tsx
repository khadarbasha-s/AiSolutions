import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { cn } from "@/lib/cn";

let enginePromise: Promise<void> | null = null;

/** Interactive constellation of nodes: links form near the cursor, click adds nodes. */
export function ParticleField({ className, density = 70, id = "particles" }: { className?: string; density?: number; id?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    enginePromise ??= initParticlesEngine(async (engine) => loadSlim(engine));
    void enginePromise.then(() => setReady(true));
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: density, density: { enable: true } },
        color: { value: ["#8B5CF6", "#22D3EE", "#A78BFA"] },
        links: { enable: true, color: "#8B5CF6", distance: 140, opacity: 0.18, width: 1 },
        move: { enable: true, speed: 0.6, outModes: { default: "out" } },
        opacity: { value: { min: 0.2, max: 0.7 }, animation: { enable: true, speed: 0.6 } },
        size: { value: { min: 1, max: 2.6 } },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: ["grab", "bubble"] }, onClick: { enable: true, mode: "push" } },
        modes: {
          grab: { distance: 180, links: { opacity: 0.55, color: "#22D3EE" } },
          bubble: { distance: 160, size: 4, duration: 2, opacity: 0.9 },
          push: { quantity: 3 },
        },
      },
    }),
    [density],
  );

  if (!ready) return null;
  return <Particles id={id} options={options} className={cn("absolute inset-0", className)} />;
}
