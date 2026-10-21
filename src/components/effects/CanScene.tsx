import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Effet 4 — React Three Fiber : la 3D dans React
 * Repo : https://github.com/pmndrs/react-three-fiber
 * Docs : https://docs.pmnd.rs/react-three-fiber
 *
 * Installation (faite) :
 * npm install three @react-three/fiber @react-three/drei
 *
 * Ici : trois canettes construites en primitives (cylindre + capsules),
 * étiquettes générées à la volée dans un <canvas> → texture WebGL.
 * OrbitControls (drei) permet de faire tourner la scène à la souris.
 */

type Flavor = { name: string; base: string; accent: string };

const FLAVORS: Flavor[] = [
  { name: "Litchi Lilas", base: "#c9a7f0", accent: "#121c7a" },
  { name: "Mangue Dragon", base: "#e8328f", accent: "#ddf3a5" },
  { name: "Pêche Soleil", base: "#ffc93c", accent: "#c01a6f" },
];

/** Génère l'étiquette de la canette dans un canvas 2D → texture. */
function makeCanLabel({ name, base, accent }: Flavor) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // corps
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // bandes alu en haut / bas
  const alu = "#dfe3ef";
  ctx.fillStyle = alu;
  ctx.fillRect(0, 0, canvas.width, 26);
  ctx.fillRect(0, canvas.height - 26, canvas.width, 26);

  // fines bulles décoratives
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let i = 0; i < 26; i++) {
    const x = (i * 137) % canvas.width;
    const y = 90 + ((i * 71) % 330);
    const r = 4 + ((i * 13) % 16);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // wordmark répété 2× (le cylindre fait le tour)
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const cx of [256, 768]) {
    ctx.save();
    ctx.fillStyle = accent;
    ctx.font = "900 132px Arial, Helvetica, sans-serif";
    ctx.fillText("FRUIZZ", cx, 232);
    ctx.font = "700 30px Arial, Helvetica, sans-serif";
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
      "6px";
    ctx.fillText(name.toUpperCase(), cx, 330);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "600 22px Arial, Helvetica, sans-serif";
    ctx.fillText("33 CL — SPARKLING", cx, 378);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function Can({
  flavor,
  position,
  scale = 1,
  tilt = 0,
  spin = 0.25,
}: {
  flavor: Flavor;
  position: [number, number, number];
  scale?: number;
  tilt?: number;
  spin?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const label = useMemo(() => makeCanLabel(flavor), [flavor]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * spin;
  });

  return (
    <group ref={group} position={position} rotation={[0, 0, tilt]} scale={scale}>
      {/* Corps */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 1.55, 64, 1, false]} />
        <meshStandardMaterial
          map={label ?? undefined}
          color={label ? "#ffffff" : flavor.base}
          metalness={0.42}
          roughness={0.32}
        />
      </mesh>

      {/* Bords alu */}
      <mesh position={[0, 0.79, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 64]} />
        <meshStandardMaterial color="#e6e9f2" metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[0, -0.79, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 64]} />
        <meshStandardMaterial color="#cdd2e0" metalness={1} roughness={0.3} />
      </mesh>

      {/* Couvercle */}
      <mesh position={[0, 0.845, 0]}>
        <cylinderGeometry args={[0.455, 0.455, 0.03, 64]} />
        <meshStandardMaterial color="#b9bfd0" metalness={1} roughness={0.28} />
      </mesh>

      {/* Languette */}
      <mesh position={[0.08, 0.865, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.09, 0.022, 10, 28]} />
        <meshStandardMaterial color="#9aa2b8" metalness={1} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Scene({ animate }: { animate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} castShadow />
      <directionalLight position={[-5, 2, -4]} intensity={1} color="#ffc93c" />
      <pointLight position={[0, -1.5, 3]} intensity={1.6} color="#e8328f" />

      <Float
        speed={animate ? 1.4 : 0}
        rotationIntensity={animate ? 0.35 : 0}
        floatIntensity={animate ? 1 : 0}
      >
        <group position={[0, 0.05, 0]}>
          <Can
            flavor={FLAVORS[1]}
            position={[0, 0, 0.45]}
            scale={1.15}
            tilt={0.04}
            spin={0.22}
          />
          <Can
            flavor={FLAVORS[0]}
            position={[-1.35, 0.12, -0.6]}
            scale={0.85}
            tilt={-0.16}
            spin={0.3}
          />
          <Can
            flavor={FLAVORS[2]}
            position={[1.35, -0.06, -0.55]}
            scale={0.85}
            tilt={0.18}
            spin={0.26}
          />
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.25, 0]}
        opacity={0.28}
        scale={8}
        blur={2.6}
        far={3.5}
        color="#121c7a"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        autoRotate={animate}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  );
}

export default function CanScene({
  animate = true,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  // Vérifie WebGL une seule fois avant de monter le Canvas.
  const webglOk = useMemo(() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      return false;
    }
  }, []);

  if (!webglOk) {
    return (
      <div
        className={`flex items-center justify-center rounded-[2rem] border-4 border-ink bg-fuchsia-soda/20 ${className}`}
      >
        <img
          src="/images/hero.jpg"
          alt="Canettes FRUIZZ"
          className="h-full w-full rounded-[1.6rem] object-cover"
        />
      </div>
    );
  }

  return (
    <Canvas
      className={className}
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.55, 4.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene animate={animate} />
      </Suspense>
    </Canvas>
  );
}
