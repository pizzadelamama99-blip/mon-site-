import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Bague « Rubis Impérial » — le modèle 3D de la section signature.
 *
 * Construction :
 *  - anneau plat (extrusion d'un anneau 2D → section rectangulaire),
 *  - griffes fines aux quatre coins du serti,
 *  - halo de petits diamants taillés (brillants simplifiés),
 *  - pierre centrale ovale (rubis) taillée en couronne/pavillon,
 *  - diamants baguettes sur les épaules.
 *
 * Le mouvement ne vient pas d'ici : le parent transmet `progress` (0 → 1)
 * depuis le défilement, et cette valeur pilote rotation, bascule,
 * rapprochement de la caméra et intensité du halo.
 */

const GEM_SEGMENTS = 24;

/** Gemme ovale facettée, non indexée → facettes nettes. */
function createGemGeometry({
  tableRatio = 0.52,
  crownHeight = 0.22,
  girdleY = 0,
  pavilionDepth = 0.62,
  radialSegments = GEM_SEGMENTS,
}: {
  tableRatio?: number;
  crownHeight?: number;
  girdleY?: number;
  pavilionDepth?: number;
  radialSegments?: number;
} = {}) {
  const girdleR = 1;
  const tableR = girdleR * tableRatio;
  const yTop = girdleY + crownHeight;
  const yApex = girdleY - pavilionDepth;

  const ring = (r: number, y: number, offset = 0) =>
    Array.from({ length: radialSegments }, (_, i) => {
      const a = (i / radialSegments) * Math.PI * 2 + offset;
      return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    });

  const table = ring(tableR, yTop, Math.PI / radialSegments);
  const girdleTop = ring(girdleR, girdleY + 0.03);
  const girdleBottom = ring(girdleR, girdleY - 0.03);
  const apex = new THREE.Vector3(0, yApex, 0);
  const tableCenter = new THREE.Vector3(0, yTop, 0);

  const verts: number[] = [];
  const tri = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) =>
    verts.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);

  for (let i = 0; i < radialSegments; i++) {
    const j = (i + 1) % radialSegments;
    // table
    tri(tableCenter, table[j], table[i]);
    // couronne (deux triangles par segment → facettes en losange)
    tri(table[i], table[j], girdleTop[i]);
    tri(table[j], girdleTop[j], girdleTop[i]);
    // rondiste
    tri(girdleTop[i], girdleTop[j], girdleBottom[j]);
    tri(girdleTop[i], girdleBottom[j], girdleBottom[i]);
    // pavillon
    tri(girdleBottom[i], girdleBottom[j], apex);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function Halos({
  radius,
  count,
  size,
  color,
  emissive,
}: {
  radius: number;
  count: number;
  size: number;
  color: string;
  emissive: string;
}) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return {
          key: i,
          position: [Math.cos(a) * radius, 0, Math.sin(a) * radius] as [
            number,
            number,
            number,
          ],
          rotation: [0, 0, a] as [number, number, number],
        };
      }),
    [radius, count],
  );

  return (
    <group>
      {items.map((it) => (
        <mesh key={it.key} position={it.position} rotation={it.rotation}>
          <octahedronGeometry args={[size, 0]} />
          <meshPhysicalMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.12}
            metalness={0.05}
            roughness={0.02}
            transmission={0.9}
            thickness={0.3}
            ior={2.3}
            clearcoat={1}
            envMapIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Baguettes des épaules : petits pavés posés sur le jonc, de part et d'autre du serti. */
function ShoulderStones() {
  const items = useMemo(() => {
    const out: { key: string; position: [number, number, number]; rotation: [number, number, number] }[] = [];
    [-1, 1].forEach((side) => {
      [0.42, 0.58, 0.74].forEach((angle, i) => {
        out.push({
          key: `${side}-${i}`,
          position: [Math.sin(angle) * 0.9 * side, Math.cos(angle) * 0.9, 0.09],
          rotation: [0, 0, -angle * side],
        });
      });
    });
    return out;
  }, []);

  return (
    <group>
      {items.map((it) => (
        <mesh key={it.key} position={it.position} rotation={it.rotation}>
          <boxGeometry args={[0.075, 0.16, 0.035]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.05}
            roughness={0.04}
            transmission={0.8}
            thickness={0.3}
            ior={2.3}
            clearcoat={1}
            envMapIntensity={2.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Ring({
  progress,
  animate,
}: {
  progress: React.MutableRefObject<number>;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const gem = useRef<THREE.MeshPhysicalMaterial>(null);
  const halo = useRef<THREE.Group>(null);

  const rubyGeometry = useMemo(
    () => createGemGeometry({ tableRatio: 0.36, crownHeight: 0.32, pavilionDepth: 0.72 }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const tt = THREE.MathUtils.clamp(progress.current, 0, 1);

    // Trois-quarts gauche → face → trois-quarts droit.
    const targetY = THREE.MathUtils.lerp(-0.34, 0.36, tt);
    const targetX = THREE.MathUtils.lerp(0.06, -0.04, tt);
    const targetScale = THREE.MathUtils.lerp(1.1, 1.26, Math.sin(tt * Math.PI) * 0.9);

    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2.2);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 2.2);

    const base = targetScale + (animate ? Math.sin(state.clock.elapsedTime * 0.6) * 0.006 : 0);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, base, 4, delta));

    if (halo.current) halo.current.rotation.z += delta * (0.1 + tt * 0.3);
    if (gem.current) gem.current.emissiveIntensity = THREE.MathUtils.lerp(0.14, 0.52, tt);
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      {/* Jonc */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.9, 0.115, 28, 160]} />
        <meshStandardMaterial
          color="#eef1f7"
          metalness={0.9}
          roughness={0.24}
          envMapIntensity={2.4}
        />
      </mesh>

      {/* Épaules qui montent vers le serti */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[0.17 * side, 1.0, 0]}
          rotation={[0, 0, 0.34 * side]}
        >
          <cylinderGeometry args={[0.075, 0.11, 0.34, 16]} />
          <meshStandardMaterial color="#eef1f7" metalness={0.9} roughness={0.24} envMapIntensity={2.4} />
        </mesh>
      ))}

      {/* Tête de bague */}
      <group position={[0, 1.34, 0]} scale={[1, 1.16, 1]}>
        {/* Cuvette */}
        <mesh position={[0, 0, -0.24]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.14, 0.28, 40, 1, false]} />
          <meshStandardMaterial color="#b9bfcc" metalness={0.95} roughness={0.3} />
        </mesh>

        {/* Court couronne de platine */}
        <mesh position={[0, 0, -0.06]} scale={[1.02, 1.22, 1]}>
          <torusGeometry args={[0.55, 0.05, 16, 96]} />
          <meshStandardMaterial color="#e2e6ef" metalness={0.9} roughness={0.22} envMapIntensity={2.6} />
        </mesh>

        {/* Halo de brillants */}
        <group ref={halo} scale={[1.16, 1.36, 1]}>
          <Halos radius={0.5} count={26} size={0.045} color="#ffffff" emissive="#dfe9ff" />
        </group>

        {/* Rubis ovale */}
        <group position={[0, 0, 0.04]} scale={[0.36, 0.46, 0.42]}>
          <mesh geometry={rubyGeometry} rotation={[Math.PI / 2 + 0.14, 0, 0.12]} castShadow>
            <meshPhysicalMaterial
              ref={gem}
              color="#b3122c"
              emissive="#6d0012"
              emissiveIntensity={0.34}
              metalness={0.32}
              roughness={0.09}
              transmission={0}
              ior={1.77}
              clearcoat={0.85}
              clearcoatRoughness={0.06}
              specularIntensity={1}
              envMapIntensity={1.8}
              flatShading
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Rondiste : le liseré clair qui cerne la pierre */}
        <mesh position={[0, 0, 0.02]} scale={[0.375, 0.475, 1]}>
          <torusGeometry args={[1, 0.022, 8, 64]} />
          <meshStandardMaterial color="#f3d9de" metalness={0.9} roughness={0.18} envMapIntensity={1.6} />
        </mesh>

        {/* Griffes */}
        {[
          [-0.26, 0.32],
          [0.26, 0.32],
          [-0.26, -0.32],
          [0.26, -0.32],
        ].map(([x, y], i) => (
          <group key={i} position={[x, y, 0.05]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.018, 0.026, 0.2, 8]} />
              <meshStandardMaterial color="#eef1f7" metalness={0.92} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
              <sphereGeometry args={[0.028, 12, 12]} />
              <meshStandardMaterial color="#f4f6fa" metalness={0.92} roughness={0.18} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Baguettes des épaules */}
      <ShoulderStones />

      {/* Poussière de lumière autour de la pièce */}
      <Sparkles
        count={30}
        scale={[4.2, 3.2, 4.2]}
        size={1.7}
        speed={animate ? 0.22 : 0}
        opacity={0.5}
        color="#ffe9ef"
      />

    </group>
  );
}

export default function RubyRingScene({
  progress,
  animate = true,
}: {
  progress: React.MutableRefObject<number>;
  animate?: boolean;
}) {
  return (
    <group>
      <ambientLight intensity={0.42} />
      <spotLight
        position={[4, 7, 5]}
        angle={0.4}
        penumbra={1}
        intensity={52}
        color="#ffffff"
      />
      <spotLight
        position={[-5, 2, -4]}
        angle={0.55}
        penumbra={1}
        intensity={26}
        color="#b9c8ff"
      />
      <pointLight position={[0, -2.4, 2]} intensity={9} color="#ff2440" />

      {/* Studio froid : le rubis doit trancher sur un environnement bleuté */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#05060a"]} />
        <Lightformer intensity={5} position={[0, 5, -8]} scale={[12, 3, 1]} color="#ffffff" />
        <Lightformer
          intensity={8}
          position={[-5, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[3, 6, 1]}
          color="#eaf1ff"
        />
        <Lightformer
          intensity={4}
          position={[6, 0.5, 1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3, 6, 1]}
          color="#c8dcff"
        />
        <Lightformer
          intensity={2}
          position={[0, -4, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 8, 1]}
          color="#3d4d7a"
        />
      </Environment>

      <Float
        speed={animate ? 0.9 : 0}
        rotationIntensity={animate ? 0.08 : 0}
        floatIntensity={animate ? 0.22 : 0}
      >
        <Ring progress={progress} animate={animate} />
      </Float>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.45}
        scale={8}
        blur={3.4}
        far={3.2}
        color="#000000"
      />
    </group>
  );
}
