import { UtensilId, ENTRANCE, EXIT, getUtensilPositions, GridState } from './types';

export type Point = [number, number];

export interface RouteResult {
  steps: number;
  order: UtensilId[];
}

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

function comparePermutation(a: UtensilId[], b: UtensilId[]): number {
  for (let i = 0; i < a.length; i++) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }
  return 0;
}

export function calculateRouteWithOrder(grid: GridState): RouteResult | null {
  const pos = getUtensilPositions(grid);
  const utensils: UtensilId[] = ['H', 'G', 'B', 'Y'];
  if (!utensils.every((u) => u in pos)) return null;

  const perms = permutations(utensils);
  let minDist = Infinity;
  let bestPerms: UtensilId[][] = [];

  for (const perm of perms) {
    const points: Point[] = [ENTRANCE, ...perm.map((u) => pos[u]), EXIT];
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      total += manhattan(points[i], points[i + 1]);
    }
    if (total < minDist) {
      minDist = total;
      bestPerms = [perm];
    } else if (total === minDist) {
      bestPerms.push(perm);
    }
  }

  bestPerms.sort(comparePermutation);
  return { steps: minDist, order: bestPerms[0] };
}

export function calculateRoute(grid: GridState): number | null {
  const result = calculateRouteWithOrder(grid);
  return result ? result.steps : null;
}

export function getPathPoints(from: Point, to: Point): Point[] {
  const points: Point[] = [];
  let [r, c] = from;
  const [tr, tc] = to;

  while (c !== tc) {
    points.push([r, c]);
    c += c < tc ? 1 : -1;
  }
  while (r !== tr) {
    points.push([r, c]);
    r += r < tr ? 1 : -1;
  }
  points.push([tr, tc]);
  return points;
}

export function buildFullPath(
  grid: GridState,
  order: UtensilId[]
): {
  pathSet: Set<string>;
  utensilOrder: Record<UtensilId, number>;
} {
  const pos = getUtensilPositions(grid);
  const pathSet = new Set<string>();
  const utensilOrder: Record<UtensilId, number> = {} as Record<UtensilId, number>;

  order.forEach((uid, idx) => {
    utensilOrder[uid] = idx + 1;
  });

  const fullPath: Point[] = [];
  const points: Point[] = [ENTRANCE, ...order.map((u) => pos[u]), EXIT];

  for (let i = 0; i < points.length - 1; i++) {
    const segment = getPathPoints(points[i], points[i + 1]);
    if (i > 0) segment.shift();
    fullPath.push(...segment);
  }

  fullPath.forEach(([r, c]) => pathSet.add(`${r},${c}`));

  return { pathSet, utensilOrder };
}
