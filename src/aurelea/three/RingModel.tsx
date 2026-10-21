import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gemGeometry, OUTLINES } from "./gems";
import type { ShapeId } from "../data";

/**
 * Bague paramétrique : un jonc, deux épaules, un panier et une pierre.
 * Tout est piloté par les propriétés (métal, pierre, taille, forme), ce qui
 * permet de servir aussi bien la scène du hero que le configurateur produit.
 */

export type RingModelProps = {
  metal?: string;
  stone?: string;
  shape?: ShapeId;
  /** Échelle relative de la pierre (1 = pierre de référence). */
  stoneSize?: number;
  /** Rotation douce autour de l'axe vertical (désactivée = 0). */
  idleSpin?: number;
  /** Petit flottement vertical, en unités de scène. */
  float?: number;
  /** Halo de brillants autour de la pierre (pièces à serti halo). */
  halo?: boolean;
};

export function RingModel({
  metal = "#d8b984",
  stone = "#ffffff",
  shape = "marquise",
  stoneSize = 1,
  idleSpin = 0,
  float = 0,
  halo = false,
}: RingModelProps) {
  const head = useRef<THREE.Group>(null);
  const stoneRef = useRef<THREE.Mesh>(null);
  const white = stone === "#ffffff";
  const gem = useMemo(
    () =>
      gemGeometry(shape, {
        segments: 64,
        tableRatio: white ? 0.42 : 0.54,
        crownHeight: white ? 0.28 : 0.52,
        pavilionDepth: white ? 0.7 : 0.95,
      }),
    [shape, white],
  );
  const brilliant = useMemo(() => gemGeometry("ronde", { segments: 12 }), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (head.current && float !== 0) {
      head.current.position.y = Math.sin(t * 0.8) * float;
      head.current.rotation.z = Math.sin(t * 0.5) * float * 0.35;
    }
    if (stoneRef.current && idleSpin !== 0) {
      stoneRef.current.rotation.y += delta * idleSpin;
    }
  });

  // Contour de la rondiste, pour poser griffes et halo sans les inventer.
  const rim = OUTLINES[shape] ?? OUTLINES.ronde;

  return (
    <group ref={head}>
      {/* Jonc */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1, 0.11, 24, 180]} />
        <meshStandardMaterial color={metal} metalness={1} roughness={0.16} envMapIntensity={1.9} />
      </mesh>

      {/* Épaules qui montent vers le panier */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0.14 * s, 1.02, 0]} rotation={[0, 0, 0.26 * s]} castShadow>
          <cylinderGeometry args={[0.05, 0.085, 0.3, 18]} />
          <meshStandardMaterial color={metal} metalness={1} roughness={0.16} envMapIntensity={1.9} />
        </mesh>
      ))}

      {/* Panier */}
      <mesh position={[0, 1.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.12, 0.26, 40, 1, true]} />
        <meshStandardMaterial
          color={metal}
          metalness={1}
          roughness={0.24}
          side={THREE.DoubleSide}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Pierre, griffes et halo, dans un même plan incliné vers la caméra */}
      <group
        position={[0, 1.52, 0]}
        rotation={[Math.PI / 2 - 0.18, 0, 0.03]}
        scale={0.5 * stoneSize}
      >
        <mesh ref={stoneRef} geometry={gem} castShadow>
          <meshPhysicalMaterial
            color={stone}
            metalness={0}
            roughness={stone === "#ffffff" ? 0.02 : 0.12}
            transmission={stone === "#ffffff" ? 1 : 0}
            thickness={stone === "#ffffff" ? 0.35 : 1.4}
            ior={stone === "#ffffff" ? 2.42 : 1.77}
            attenuationColor={stone === "#ffffff" ? "#ffffff" : stone}
            attenuationDistance={stone === "#ffffff" ? 1 : 1.8}
            clearcoat={1}
            clearcoatRoughness={stone === "#ffffff" ? 0 : 0.04}
            specularIntensity={stone === "#ffffff" ? 1.3 : 0.7}
            envMapIntensity={stone === "#ffffff" ? 2.6 : 0.55}
            iridescence={stone === "#ffffff" ? 0.4 : 0}
            iridescenceIOR={1.5}
            iridescenceThicknessRange={[120, 420]}
            emissive={stone === "#ffffff" ? "#ffffff" : stone}
            emissiveIntensity={stone === "#ffffff" ? 0.03 : 0.1}
            flatShading
          />
        </mesh>

        {/* Griffes posées sur la rondiste */}
        {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((a, i) => {
          const [px, pz] = rim(a);
          return (
            <mesh key={`prong-${i}`} position={[px * 1.02, 0.02, pz * 1.02]}>
              <sphereGeometry args={[0.085, 14, 14]} />
              <meshStandardMaterial color={metal} metalness={1} roughness={0.12} envMapIntensity={2.6} />
            </mesh>
          );
        })}

        {/* Halo : un rang de brillants serré autour de la pierre */}
        {halo &&
          Array.from({ length: 26 }, (_, i) => {
            const a = (i / 26) * Math.PI * 2;
            return (
              <mesh
                key={`halo-${i}`}
                geometry={brilliant}
                position={[Math.cos(a) * 1.14, 0.03, Math.sin(a) * 0.84]}
                scale={0.078}
                rotation={[0, a, 0]}
              >
                <meshPhysicalMaterial
                  color="#ffffff"
                  metalness={0}
                  roughness={0.02}
                  transmission={0.92}
                  thickness={0.32}
                  ior={2.42}
                  clearcoat={1}
                  envMapIntensity={3}
                  iridescence={0.5}
                />
              </mesh>
            );
          })}
      </group>

      {/* Pavé sur les épaules (5 brillants de chaque côté) */}
      {[-1, 1].map((side) =>
        [0.55, 0.72, 0.89, 1.06, 1.23].map((angle, i) => (
          <mesh
            key={`${side}-${i}`}
            geometry={brilliant}
            position={[Math.sin(angle) * 1.0 * side, Math.cos(angle) * 1.0, 0.08]}
            scale={0.055}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0.05}
              roughness={0.02}
              transmission={0.9}
              thickness={0.4}
              ior={2.4}
              clearcoat={1}
              envMapIntensity={2.2}
            />
          </mesh>
        )),
      )}
    </group>
  );
}
