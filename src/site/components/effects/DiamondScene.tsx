import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Scène « pièce d'exception » — un solitaire rendu en temps réel.
 * React Three Fiber + drei (déjà installés pour le site FRUIZZ).
 *
 * - Le diamant est une géométrie taillée à la main : table, couronne,
 *   rondiste et pavillon, en facettes plates (normales par triangle).
 * - Le métal utilise un environnement HDR généré à la volée (Lightformers),
 *   donc aucun fichier externe à charger.
 * - La scène s'arrête quand elle n'est plus visible (frameloop demand piloté
 *   par le parent) pour ne pas chauffer le GPU inutilement.
 */

const SEGMENTS = 16;

/** Taille brillant simplifiée, non indexée → facettes nettes. */
function createDiamondGeometry() {
  const tableR = 0.44;
  const girdleR = 1;
  const yTable = 0.64;
  const yGirdleTop = 0.2;
  const yGirdleBottom = 0.11;
  const yApex = -1.18;

  const ring = (r: number, y: number, offset = 0) =>
    Array.from({ length: SEGMENTS }, (_, i) => {
      const a = (i / SEGMENTS) * Math.PI * 2 + offset;
      return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    });

  const table = ring(tableR, yTable, Math.PI / SEGMENTS);
  const girdleTop = ring(girdleR, yGirdleTop);
  const girdleBottom = ring(girdleR, yGirdleBottom);
  const apex = new THREE.Vector3(0, yApex, 0);
  const tableCenter = new THREE.Vector3(0, yTable, 0);

  const verts: number[] = [];
  const tri = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
    verts.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  };

  for (let i = 0; i < SEGMENTS; i++) {
    const j = (i + 1) % SEGMENTS;

    // Table (facette supérieure plane)
    tri(tableCenter, table[j], table[i]);

    // Couronne : facettes en losange entre la table et la rondiste
    tri(table[i], table[j], girdleTop[i]);
    tri(table[j], girdleTop[j], girdleTop[i]);

    // Rondiste (ceinture fine)
    tri(girdleTop[i], girdleTop[j], girdleBottom[j]);
    tri(girdleTop[i], girdleBottom[j], girdleBottom[i]);

    // Pavillon : grandes facettes convergeant vers la pointe
    tri(girdleBottom[i], girdleBottom[j], apex);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(verts, 3),
  );
  geometry.computeVertexNormals();
  return geometry;
}

function Diamond() {
  const geometry = useMemo(() => createDiamondGeometry(), []);
  return (
    <mesh geometry={geometry} castShadow>
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.02}
        roughness={0.02}
        transmission={0.88}
        iridescence={0.18}
        iridescenceIOR={1.9}
        thickness={1.6}
        ior={2.42}
        reflectivity={1}
        specularIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.02}
        envMapIntensity={3.2}
        attenuationColor="#f7f1e2"
        attenuationDistance={2.4}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

function Solitaire({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current && animate) {
      group.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group ref={group}>
      <Float
        speed={animate ? 1 : 0}
        rotationIntensity={animate ? 0.12 : 0}
        floatIntensity={animate ? 0.35 : 0}
      >
        <group position={[0, -0.95, 0]} scale={0.84}>
          {/* Anneau d'or */}
          <mesh castShadow receiveShadow>
            <torusGeometry args={[1.02, 0.075, 32, 128]} />
            <meshStandardMaterial
              color="#c8a24a"
              metalness={1}
              roughness={0.16}
              envMapIntensity={1.6}
            />
          </mesh>

          {/* Panier (corbeille) discret qui reçoit le pavillon du diamant */}
          <mesh position={[0, 1.42, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.13, 0.26, 40, 1, true]} />
            <meshStandardMaterial
              color="#c39c45"
              metalness={1}
              roughness={0.24}
              side={THREE.DoubleSide}
              envMapIntensity={1.1}
            />
          </mesh>

          {/* Griffes */}
          {[0, 1, 2, 3].map((i) => {
            const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.3, 1.68, Math.sin(a) * 0.3]}
                rotation={[0, -a, 0.16]}
                castShadow
              >
                <cylinderGeometry args={[0.026, 0.036, 0.32, 12]} />
                <meshStandardMaterial
                  color="#dcbb66"
                  metalness={1}
                  roughness={0.14}
                />
              </mesh>
            );
          })}

          {/* Diamant */}
          <group position={[0, 1.66, 0]} scale={0.62} rotation={[0, Math.PI / SEGMENTS, 0]}>
            <Diamond />
          </group>
        </group>
      </Float>

      <Sparkles
        count={26}
        scale={[3.4, 2.6, 3]}
        size={1.6}
        speed={animate ? 0.24 : 0}
        opacity={0.55}
        color="#f6e6bd"
      />
    </group>
  );
}

export default function DiamondScene({
  animate = true,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  // Tant que la première image n'est pas rendue, on garde un visuel de secours :
  // le cadre ne reste jamais vide, même si le GPU refuse le contexte WebGL.
  const [ready, setReady] = useState(false);

  const webglOk = useMemo(() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
      return false;
    }
  }, []);

  if (!webglOk) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src="/images/ring-solitaire.jpg"
          alt="Solitaire en or jaune et diamant"
          className="h-full w-full object-cover opacity-90"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src="/images/ring-solitaire.jpg"
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-45"
        }`}
      />
      <Canvas
        className="!absolute inset-0"
        dpr={[1, 1.8]}
        shadows
        camera={{ position: [0, 0.1, 7.6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          setReady(true);
        }}
      >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.35}
          penumbra={1}
          intensity={48}
          color="#fff6e0"
        />
        <spotLight
          position={[-6, 3, -4]}
          angle={0.5}
          penumbra={1}
          intensity={22}
          color="#c8a24a"
        />
        <pointLight position={[0, -3, 2]} intensity={6} color="#8f6f2a" />

        {/* Studio HDR généré : bandes de lumière qui se reflètent dans l'or */}
        <Environment resolution={256} frames={1}>
          <color attach="background" args={["#050505"]} />
          <Lightformer
            intensity={4}
            position={[0, 5, -9]}
            rotation={[0, 0, 0]}
            scale={[10, 3, 1]}
          />
          <Lightformer
            intensity={7}
            position={[-5, 1, 1]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[3, 6, 1]}
            color="#fff3d6"
          />
          <Lightformer
            intensity={5}
            position={[6, 0, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[3, 6, 1]}
            color="#ffe6b0"
          />
          <Lightformer
            intensity={2.5}
            position={[0, -4, 2]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[8, 8, 1]}
            color="#7a5c22"
          />
        </Environment>

        <Solitaire animate={animate} />

        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={0.5}
          scale={7}
          blur={3.2}
          far={3}
          color="#000000"
        />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          autoRotate={animate}
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Suspense>
      </Canvas>
    </div>
  );
}
