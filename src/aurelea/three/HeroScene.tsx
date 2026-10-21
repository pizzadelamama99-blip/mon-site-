import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { RingModel } from "./RingModel";

/**
 * Scène du hero : un solitaire marquise dans un studio noir.
 * La caméra avance doucement à l'ouverture, puis suit la souris avec
 * une inclinaison volontairement limitée (±6°).
 */

function Rig() {
  const group = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    const damp = Math.min(1, delta * 2.2);
    group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * damp;
    group.current.rotation.x += (-pointer.y * 0.1 - group.current.rotation.x) * damp;
    camera.position.z += (8.4 - camera.position.z) * Math.min(1, delta * 0.9);
    camera.lookAt(0.25, 0.45, 0);
  });

  return (
    <group ref={group} position={[0.55, 0, 0]}>
      <RingModel
        metal="#d8b984"
        stone="#ffffff"
        shape="marquise"
        stoneSize={1.15}
        idleSpin={0.06}
        float={0.015}
      />
    </group>
  );
}

export default function HeroScene({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0.2, 0.45, 10.5], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.42} />
        <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={90} color="#fff4e2" castShadow />
        <spotLight position={[-5, 2, -2]} angle={0.6} penumbra={1} intensity={38} color="#cfe0ff" />
        <pointLight position={[0, -1.6, 2.4]} intensity={6} color="#ffd9a8" />
        <pointLight position={[-0.4, 1.2, 4.2]} intensity={16} color="#ffe6c2" />

        <Environment resolution={256} frames={1}>
          <color attach="background" args={["#080809"]} />
          <Lightformer intensity={6} position={[0, 5, -6]} scale={[10, 2.4, 1]} color="#ffffff" />
          <Lightformer
            intensity={12}
            position={[-5, 1.4, 1]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[2.6, 6, 1]}
            color="#f4e6cf"
          />
          <Lightformer
            intensity={5}
            position={[5.4, 0.6, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[2.6, 6, 1]}
            color="#c9d6ff"
          />
          <Lightformer
            intensity={2.2}
            position={[0, -4, 1]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[8, 8, 1]}
            color="#2a2723"
          />
        </Environment>

        <Rig />

        <Sparkles count={26} scale={[5, 3.4, 5]} size={1.4} speed={animate ? 0.18 : 0} opacity={0.45} color="#ffe8c7" />

        <ContactShadows
          position={[0, -1.75, 0]}
          opacity={0.5}
          scale={9}
          blur={3.2}
          far={3.4}
          color="#000000"
        />
      </Suspense>
    </Canvas>
  );
}
