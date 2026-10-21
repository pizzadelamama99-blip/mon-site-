import * as THREE from "three";
import type { ShapeId } from "../data";

/**
 * Gemmes procédurales.
 *
 * Aucun modèle externe : le contour de la pierre est décrit par une
 * fonction, puis extrudé en couronne (table → rondiste) et en pavillon
 * (rondiste → pointe). La géométrie est non indexée : chaque facette
 * garde une normale franche, comme sur une pierre taillée.
 */

type Point2 = [number, number];

export const OUTLINES: Record<ShapeId, (t: number) => Point2> = {
  ronde: (t) => [Math.cos(t), Math.sin(t)],
  ovale: (t) => [Math.cos(t), 0.68 * Math.sin(t)],
  // Marquise « debout » : pointes en haut et en bas, ventre sur les côtés.
  marquise: (t) => [
    0.42 * Math.cos(t) * Math.pow(Math.abs(Math.cos(t)), 0.55),
    Math.sin(t),
  ],
  poire: (t) => {
    const round = 0.46 + 0.54 * (0.5 - 0.5 * Math.cos(t));
    return [Math.cos(t), Math.sin(t) * 0.78 * round];
  },
  emeraude: (t) => [
    Math.sign(Math.cos(t)) * Math.pow(Math.abs(Math.cos(t)), 0.42),
    0.78 * Math.sign(Math.sin(t)) * Math.pow(Math.abs(Math.sin(t)), 0.42),
  ],
  baguette: (t) => [
    Math.sign(Math.cos(t)) * Math.pow(Math.abs(Math.cos(t)), 0.3),
    0.46 * Math.sign(Math.sin(t)) * Math.pow(Math.abs(Math.sin(t)), 0.3),
  ],
};

export function gemGeometry(
  shape: ShapeId,
  {
    segments = 48,
    crownHeight = 0.22,
    tableRatio = 0.56,
    pavilionDepth = 0.62,
  }: {
    segments?: number;
    crownHeight?: number;
    tableRatio?: number;
    pavilionDepth?: number;
  } = {},
) {
  const outline = OUTLINES[shape] ?? OUTLINES.ronde;

  const girdle: THREE.Vector3[] = [];
  const table: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const [x, y] = outline(t);
    girdle.push(new THREE.Vector3(x, 0, y));
    table.push(new THREE.Vector3(x * tableRatio, crownHeight, y * tableRatio));
  }

  const tableCenter = new THREE.Vector3(0, crownHeight, 0);
  const apex = new THREE.Vector3(0, -pavilionDepth, 0);

  const verts: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) =>
    verts.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);

  for (let i = 0; i < segments; i++) {
    const j = (i + 1) % segments;
    // Table (sens anti-horaire vu de dessus → normale vers +Y)
    push(tableCenter, table[j], table[i]);
    // Couronne : facettes alternées (cerf-volant)
    push(table[i], girdle[j], girdle[i]);
    push(table[i], table[j], girdle[j]);
    // Pavillon
    push(girdle[i], girdle[j], apex);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geometry.computeVertexNormals();
  return geometry;
}

/** Petite pierre ronde (pour un halo), géométrie partagée. */
export function brilliantGeometry() {
  return gemGeometry("ronde", { segments: 16, crownHeight: 0.2, tableRatio: 0.5, pavilionDepth: 0.55 });
}
