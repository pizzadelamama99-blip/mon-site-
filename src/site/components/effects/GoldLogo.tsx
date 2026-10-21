import { Suspense, useEffect, useState } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";

/**
 * Logotype AURELIS en or liquide.
 * Même principe que l'effet « Liquid Logo » du guide : le mot est dessiné
 * dans un canvas (transparent), puis utilisé comme masque par le shader
 * LiquidMetal de @paper-design/shaders-react.
 */
export default function GoldLogo({
  width = 300,
  height = 96,
  className = "",
  background = "#070708",
  tint = "#f0d9a4",
}: {
  width?: number;
  height?: number;
  className?: string;
  background?: string;
  tint?: string;
}) {
  const [mask, setMask] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const draw = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 380;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Lettrage large, très fin : Cormorant Garamond
        let size = 168;
        const font = (px: number) =>
          `300 ${px}px "Cormorant Garamond", "Times New Roman", serif`;
        const word = "AURELIS";
        ctx.font = font(size);
        const max = canvas.width - 120;
        const w = ctx.measureText(word).width;
        if (w > max) {
          size = Math.floor((size * max) / w);
          ctx.font = font(size);
        }
        // espacement manuel des lettres pour un rendu « maison »
        const track = size * 0.16;
        const letters = word.split("");
        const widths = letters.map((l) => ctx.measureText(l).width);
        const total =
          widths.reduce((a, b) => a + b, 0) + track * (letters.length - 1);
        let x = canvas.width / 2 - total / 2;
        letters.forEach((l, i) => {
          ctx.fillText(l, x + widths[i] / 2, 165);
          x += widths[i] + track;
        });

        // Sur-titre
        ctx.font = `400 42px "Jost", Helvetica, Arial, sans-serif`;
        ctx.fillText("H A U T E   J O A I L L E R I E", canvas.width / 2, 302);

        if (alive) setMask(canvas.toDataURL("image/png"));
      } catch {
        /* silence : le fallback typographique prend le relais */
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
      {mask ? (
        <Suspense fallback={null}>
          <LiquidMetal
            image={mask}
            colorBack={background}
            colorTint={tint}
            repetition={3.1}
            softness={0.24}
            distortion={0.2}
            contour={0.46}
            angle={58}
            shiftRed={0.02}
            shiftBlue={0.02}
            speed={0.28}
            fit="contain"
            scale={1.04}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      ) : (
        <span className="font-luxe text-2xl font-light tracking-[0.3em] text-j-ivory">
          AURELIS
        </span>
      )}
      <span className="sr-only">Aurelis — haute joaillerie, Paris</span>
    </div>
  );
}
