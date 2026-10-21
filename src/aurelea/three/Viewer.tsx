import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { RingModel } from "./RingModel";
import type { ShapeId } from "../data";

export type ViewPreset = "face" | "trois-quarts" | "profil" | "pierre" | "sertissage";

export const VIEW_PRESETS: { id: ViewPreset; label: string; position: [number, number, number] }[] = [
  { id: "face", label: "Face", position: [0, 0.45, 6.6] },
  { id: "trois-quarts", label: "Trois-quarts", position: [3.1, 1.4, 5.6] },
  { id: "profil", label: "Profil", position: [6.2, 0.5, 0.5] },
  { id: "pierre", label: "Pierre", position: [0, 2.0, 3.2] },
  { id: "sertissage", label: "Sertissage", position: [1.7, 2.6, 2.6] },
];

function CameraRig({ preset }: { preset: ViewPreset }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(...(VIEW_PRESETS[0].position as [number, number, number])));

  useEffect(() => {
    const found = VIEW_PRESETS.find((p) => p.id === preset) ?? VIEW_PRESETS[0];
    target.current.set(...found.position);
  }, [preset]);

  useFrame((_, delta) => {
    const damp = Math.min(1, delta * 3.2);
    camera.position.lerp(target.current, damp);
    controls.current?.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={2.2}
      maxDistance={9}
      target={[0, 0.35, 0]}
    />
  );
}

export default function JewelryViewer({
  metal,
  stone,
  shape,
  preset,
  animate = true,
  halo = false,
}: {
  metal: string;
  stone: string;
  shape: ShapeId;
  preset: ViewPreset;
  animate?: boolean;
  halo?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.45, 6.6], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
      style={{ touchAction: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.22} />
        <spotLight position={[4, 6, 4]} angle={0.55} penumbra={1} intensity={26} color="#fff4e2" />
        <spotLight position={[-5, 1.5, -2]} angle={0.6} penumbra={1} intensity={12} color="#d5e2ff" />
        <pointLight position={[0, 1.6, 4]} intensity={5} color="#fff6ea" />
        <directionalLight position={[0, 4, 6]} intensity={0.5} color="#ffffff" />

        <Environment resolution={512} frames={1}>
          <color attach="background" args={["#0a0a0c"]} />
          {/* Boîte à lumière : un plafond diffus et quatre bandes verticales,
              la signature spéculaire du métal poli. */}
          <Lightformer intensity={2.2} position={[0, 6, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[12, 12, 1]} color="#ffffff" />
          <Lightformer intensity={9} position={[0, 1.5, -7]} scale={[3, 9, 1]} color="#ffffff" />
          <Lightformer intensity={7} position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[2.4, 9, 1]} color="#fff3df" />
          <Lightformer intensity={5} position={[6, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2.4, 9, 1]} color="#dfe8ff" />
          <Lightformer intensity={6} position={[0, 2, 7]} scale={[4, 2, 1]} color="#fffaf2" />
          <Lightformer intensity={2.4} position={[0, -4, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} color="#2a2a30" />
        </Environment>

        <group position={[0, 0, 0]}>
          <RingModel
            metal={metal}
            stone={stone}
            shape={shape}
            stoneSize={1.0}
            float={animate ? 0.012 : 0}
            halo={halo}
          />
        </group>

        <ContactShadows position={[0, -1.35, 0]} opacity={0.4} scale={10} blur={3} far={3.6} color="#000" />
        <CameraRig preset={preset} />
      </Suspense>
    </Canvas>
  );
}
