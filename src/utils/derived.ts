import { useMemo } from 'react';
import { GridState, UtensilId, UTENSIL_INFO, allUtensilsPlaced, getUtensilPositions } from './types';
import { validate, ValidationResult } from './validator';
import { calculateRouteWithOrder, buildFullPath } from './routeCalculator';
import { useTeaStore } from '@/store/gridStore';

export interface DerivedState {
  validation: ValidationResult;
  allPlaced: boolean;
  routeSteps: number | null;
  canExport: boolean;
  placedUtensils: Record<UtensilId, boolean>;
  routeOrder: UtensilId[] | null;
  accessChainText: string | null;
  pathSet: Set<string> | null;
  utensilOrder: Record<UtensilId, number> | null;
}

export function computeDerivedState(grid: GridState): DerivedState {
  const validation = validate(grid);
  const allPlaced = allUtensilsPlaced(grid);
  const positions = getUtensilPositions(grid);

  const placedUtensils: Record<UtensilId, boolean> = {
    H: 'H' in positions,
    G: 'G' in positions,
    B: 'B' in positions,
    Y: 'Y' in positions,
  };

  const canExport = allPlaced && validation.allPass;

  let routeSteps: number | null = null;
  let routeOrder: UtensilId[] | null = null;
  let accessChainText: string | null = null;
  let pathSet: Set<string> | null = null;
  let utensilOrder: Record<UtensilId, number> | null = null;

  if (canExport) {
    const routeResult = calculateRouteWithOrder(grid);
    if (routeResult) {
      routeSteps = routeResult.steps;
      routeOrder = routeResult.order;

      const names = routeOrder.map((uid) => UTENSIL_INFO[uid].name);
      accessChainText = `入口→${names.join('→')}→出口`;

      const pathInfo = buildFullPath(grid, routeOrder);
      pathSet = pathInfo.pathSet;
      utensilOrder = pathInfo.utensilOrder;
    }
  }

  return {
    validation,
    allPlaced,
    routeSteps,
    canExport,
    placedUtensils,
    routeOrder,
    accessChainText,
    pathSet,
    utensilOrder,
  };
}

export function useDerivedState(): DerivedState {
  const grid = useTeaStore((s) => s.grid);
  return useMemo(() => computeDerivedState(grid), [grid]);
}
