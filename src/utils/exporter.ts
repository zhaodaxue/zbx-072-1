import { GridState, UtensilId, UTENSIL_INFO, getUtensilPositions } from './types';

export interface ExportData {
  placements: { id: string; row: number; col: number }[];
  routeSteps: number;
  routeOrder?: string[];
}

export function exportPlacement(
  grid: GridState,
  routeSteps: number,
  routeOrder?: UtensilId[]
): string {
  const pos = getUtensilPositions(grid);
  const placements = (['H', 'G', 'B', 'Y'] as UtensilId[]).map((uid) => {
    const [row, col] = pos[uid];
    const info = UTENSIL_INFO[uid];
    return { id: info.id, row, col };
  });
  const data: ExportData = { placements, routeSteps };
  if (routeOrder) {
    data.routeOrder = routeOrder;
  }
  return JSON.stringify(data, null, 2);
}
