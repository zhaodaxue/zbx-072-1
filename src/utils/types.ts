export type UtensilId = 'H' | 'G' | 'B' | 'Y';
export type CellValue = UtensilId | null;
export type GridState = CellValue[][];

export const ROWS = 4;
export const COLS = 6;
export const ENTRANCE: [number, number] = [3, 0];
export const EXIT: [number, number] = [3, 5];

export const UTENSIL_INFO: Record<UtensilId, { name: string; symbol: string; id: string }> = {
  H: { name: '壶', symbol: '🫖', id: 'H' },
  G: { name: '公道', symbol: '🫗', id: 'G' },
  B: { name: '杯', symbol: '🍵', id: 'B' },
  Y: { name: '盂', symbol: '🫙', id: 'Y' },
};

export function createEmptyGrid(): GridState {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

export function getUtensilPositions(grid: GridState): Record<UtensilId, [number, number]> {
  const positions = {} as Record<UtensilId, [number, number]>;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      if (cell) {
        positions[cell] = [r, c];
      }
    }
  }
  return positions;
}

export function allUtensilsPlaced(grid: GridState): boolean {
  const placed = new Set<UtensilId>();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c]) placed.add(grid[r][c]!);
    }
  }
  return placed.size === 4;
}
