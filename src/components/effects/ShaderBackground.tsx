import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * Effet 1 — ShaderGradient : gradient 3D animé
 * Repo : https://github.com/ruucm/shadergradient
 * Démo : https://www.shadergradient.co/customize
 *
 * Installation (faite) :
 * npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls
 *
 * Astuce du guide : pour régler à la souris, va sur le customizer,
 * copie l'URL générée et remplace les props par :
 *   <ShaderGradient control="query" urlString="TON_URL" />
 */
export default function ShaderBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-lime-soda">
      {/* Fond de secours : si WebGL/le canvas échoue, la charte reste lisible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_12%_8%,#e8328f_0%,transparent_42%),radial-gradient(100%_80%_at_92%_18%,#ffc93c_0%,transparent_48%),linear-gradient(160deg,#b9e26a_0%,#c9a7f0_55%,#a8d95c_100%)]"
      />
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        pixelDensity={1}
        fov={16}
        pointerEvents="none"
        powerPreference="high-performance"
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          /* Palette FRUIZZ : fuchsia / lime / sun */
          color1="#e8328f"
          color2="#ddf3a5"
          color3="#ffc93c"
          /* Caméra */
          cDistance={3.6}
          cAzimuthAngle={180}
          cPolarAngle={55}
          /* Forme + mouvement */
          uAmplitude={0}
          uDensity={1.15}
          uFrequency={4.4}
          uSpeed={0.22}
          uStrength={1.9}
          uTime={0}
          positionX={-0.15}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={85}
          /* Rendu */
          reflection={0.15}
          brightness={1.08}
          grain="off"
          lightType="3d"
          envPreset="lobby"
          toggleAxis={false}
          zoomOut={false}
          wireframe={false}
        />
      </ShaderGradientCanvas>

      {/* Voiles pour garder le texte lisible et raccorder à la charte */}
      <div className="absolute inset-0 bg-gradient-to-b from-lime-soda/45 via-lime-soda/25 to-lime-soda/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-lime-soda/30 via-transparent to-transparent" />
    </div>
  );
}
