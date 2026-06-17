import { UtensilId, ENTRANCE, EXIT, getUtensilPositions, GridState } from './types';

type Point = [number, number];

function manhattan(a: Point, b: Point): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function permutations(arr: UtensilId[]): UtensilId[][] {
  if (arr.length <= 1) return [arr];
  const result: UtensilId[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

export function calculateRoute(grid: GridState): number | null {
  const pos = getUtensilPositions(grid);
  const utensils: UtensilId[] = ['H', 'G', 'B', 'Y'];
  if (!utensils.every((u) => u in pos)) return null;

  const perms = permutations(utensils);
  let minDist = Infinity;

  for (const perm of perms) {
    const points: Point[] = [ENTRANCE, ...perm.map((u) => pos[u]), EXIT];
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      total += manhattan(points[i], points[i + 1]);
    }
    if (total < minDist) minDist = total;
  }

  return minDist;
}
