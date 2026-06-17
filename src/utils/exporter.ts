import { GridState, UtensilId, UTENSIL_INFO, getUtensilPositions } from './types';

export interface ExportData {
  placements: { id: string; name: string; row: number; col: number }[];
  routeSteps: number;
}

export function exportPlacement(grid: GridState, routeSteps: number): string {
  const pos = getUtensilPositions(grid);
  const placements = (['H', 'G', 'B', 'Y'] as UtensilId[]).map((uid) => {
    const [row, col] = pos[uid];
    const info = UTENSIL_INFO[uid];
    return { id: info.id, name: info.name, row, col };
  });
  const data: ExportData = { placements, routeSteps };
  return JSON.stringify(data, null, 2);
}
