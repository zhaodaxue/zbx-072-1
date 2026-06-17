import { GridState, ROWS, COLS, getUtensilPositions } from './types';

export interface RuleResult {
  key: string;
  label: string;
  pass: boolean;
  reason: string;
}

export interface ValidationResult {
  rules: RuleResult[];
  allPass: boolean;
}

const DIRS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function manhattan(r1: number, c1: number, r2: number, c2: number): number {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

function isAdjacent(r1: number, c1: number, r2: number, c2: number): boolean {
  return manhattan(r1, c1, r2, c2) === 1;
}

function checkConnected(grid: GridState): boolean {
  const positions: [number, number][] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c]) positions.push([r, c]);
    }
  }
  if (positions.length < 2) return true;

  const visited = new Set<string>();
  const queue: [number, number][] = [positions[0]];
  visited.add(`${positions[0][0]},${positions[0][1]}`);

  while (queue.length > 0) {
    const [cr, cc] = queue.shift()!;
    for (const [dr, dc] of DIRS) {
      const nr = cr + dr;
      const nc = cc + dc;
      const key = `${nr},${nc}`;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visited.has(key) && grid[nr][nc]) {
        visited.add(key);
        queue.push([nr, nc]);
      }
    }
  }

  return positions.every(([r, c]) => visited.has(`${r},${c}`));
}

export function validate(grid: GridState): ValidationResult {
  const pos = getUtensilPositions(grid);
  const rules: RuleResult[] = [];

  const hasH = 'H' in pos;
  const hasG = 'G' in pos;
  const hasB = 'B' in pos;
  const hasY = 'Y' in pos;

  if (hasH && hasG) {
    const dist = manhattan(pos.H[0], pos.H[1], pos.G[0], pos.G[1]);
    rules.push({
      key: 'hg',
      label: '壶与公道距离 ≤ 3',
      pass: dist <= 3,
      reason: dist <= 3 ? `曼哈顿距离 ${dist}` : `曼哈顿距离 ${dist}，超过 3`,
    });
  } else {
    rules.push({
      key: 'hg',
      label: '壶与公道距离 ≤ 3',
      pass: false,
      reason: hasH ? '公道未放置' : hasG ? '壶未放置' : '壶与公道均未放置',
    });
  }

  if (hasB && hasY) {
    const adj = isAdjacent(pos.B[0], pos.B[1], pos.Y[0], pos.Y[1]);
    rules.push({
      key: 'by',
      label: '杯与盂不得四向相邻',
      pass: !adj,
      reason: adj ? '杯与盂四向相邻' : '杯与盂不相邻',
    });
  } else {
    rules.push({
      key: 'by',
      label: '杯与盂不得四向相邻',
      pass: false,
      reason: hasB ? '盂未放置' : hasY ? '杯未放置' : '杯与盂均未放置',
    });
  }

  const utensilCount = Object.keys(pos).length as number;
  if (utensilCount === 4) {
    const connected = checkConnected(grid);
    rules.push({
      key: 'conn',
      label: '四器具构成单一连通块',
      pass: connected,
      reason: connected ? '连通性满足' : '器具未形成连通块',
    });
  } else {
    rules.push({
      key: 'conn',
      label: '四器具构成单一连通块',
      pass: false,
      reason: `已放置 ${utensilCount}/4 件器具`,
    });
  }

  return { rules, allPass: rules.every((r) => r.pass) };
}
