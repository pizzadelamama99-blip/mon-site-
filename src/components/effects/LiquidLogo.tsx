import { Suspense, useEffect, useState } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";

/**
 * Effet 2 — Liquid Logo : logo en métal liquide
 * Démo sans coder : https://liquid.paper.design
 * Package : https://github.com/paper-design/shaders
 *
 * Installation (faite) :
 * npm i @paper-design/shaders-react
 *
 * ⚠️ Le guide utilise l'ancienne API (refraction / edge / liquify / patternScale).
 *    La version installée (0.0.82) expose d'autres noms. Correspondance :
 *      refraction   → softness + contour
 *      edge         → contour
 *      liquify      → distortion
 *      speed        → speed
 *      patternScale → repetition
 *
 * L'image est traitée en masque (canal alpha). On dessine le wordmark dans un
 * canvas (police Titane One du site), avec /logo.svg en secours — c'est
 * exactement ce que fait l'upload de logo sur liquid.paper.design.
 */
export default function LiquidLogo({
  width = 200,
  height = 72,
  colorBack = "#fdf9ee",
  tint = "#e8328f",
  className = "",
}: {
  width?: number;
  height?: number;
  colorBack?: string;
  tint?: string;
  className?: string;
}) {
  const [mask, setMask] = useState("/logo.svg");

  useEffect(() => {
    let alive = true;

    const draw = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fond transparent : seul le texte compte comme masque.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Wordmark — Titane One si la webfont est prête, sinon secours.
        let size = 176;
        const font = (px: number) =>
          `${px}px "Titan One", "Arial Black", Arial, sans-serif`;
        ctx.font = font(size);
        const maxWidth = canvas.width - 80;
        const measured = ctx.measureText("FRUIZZ").width;
        if (measured > maxWidth) {
          size = Math.floor((size * maxWidth) / measured);
          ctx.font = font(size);
        }
        ctx.fillText("FRUIZZ", canvas.width / 2, 130);

        // Baseline
        ctx.font = `700 30px "Space Grotesk", Arial, sans-serif`;
        ctx.fillText("S O D A   P O P", canvas.width / 2, 248);

        if (alive) setMask(canvas.toDataURL("image/png"));
      } catch {
        /* on garde le SVG de secours */
      }
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(draw).catch(draw);
    } else {
      draw();
    }

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <Suspense
        fallback={
          <span className="font-display text-2xl tracking-wide text-fuchsia-soda">
            FRUIZZ
          </span>
        }
      >
        <LiquidMetal
          image={mask}
          colorBack={colorBack}
          colorTint={tint}
          /* réglages = curseurs de liquid.paper.design */
          repetition={2.1}
          softness={0.55}
          distortion={0.24}
          contour={0.36}
          angle={30}
          shiftRed={0.03}
          shiftBlue={0.03}
          /* animation */
          speed={0.35}
          /* cadrage du logo */
          fit="contain"
          scale={1.05}
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
      {/* texte caché pour l'accessibilité / le SEO */}
      <span className="sr-only">FRUIZZ — soda pétillant aux fruits</span>
    </div>
  );
}
