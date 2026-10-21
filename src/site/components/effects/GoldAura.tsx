import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

/**
 * Aura « or fondu » en fond de section — variante assombrie de l'effet
 * ShaderGradient du guide : trois tons chauds, mouvement très lent, voile
 * noir par-dessus pour rester lisible.
 */
export default function GoldAura() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-j-noir">
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        pixelDensity={1}
        fov={15}
        pointerEvents="none"
        powerPreference="low-power"
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          color1="#3a1119"
          color2="#c8a24a"
          color3="#070708"
          cDistance={3.4}
          cAzimuthAngle={160}
          cPolarAngle={62}
          uAmplitude={0.1}
          uDensity={0.9}
          uFrequency={3.4}
          uSpeed={0.12}
          uStrength={1.4}
          uTime={0}
          positionX={0.2}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={70}
          reflection={0.08}
          brightness={0.75}
          grain="off"
          lightType="3d"
          envPreset="lobby"
          toggleAxis={false}
          zoomOut={false}
          wireframe={false}
        />
      </ShaderGradientCanvas>
      <div className="absolute inset-0 bg-j-noir/62" />
      <div className="absolute inset-0 bg-gradient-to-b from-j-noir via-transparent to-j-noir" />
    </div>
  );
}
