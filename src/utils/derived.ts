import { useMemo } from 'react';
import { GridState, UtensilId, allUtensilsPlaced, getUtensilPositions } from './types';
import { validate, ValidationResult } from './validator';
import { calculateRoute } from './routeCalculator';
import { useTeaStore } from '@/store/gridStore';

export interface DerivedState {
  validation: ValidationResult;
  allPlaced: boolean;
  routeSteps: number | null;
  canExport: boolean;
  placedUtensils: Record<UtensilId, boolean>;
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
  const routeSteps = canExport ? calculateRoute(grid) : null;

  return {
    validation,
    allPlaced,
    routeSteps,
    canExport,
    placedUtensils,
  };
}

export function useDerivedState(): DerivedState {
  const grid = useTeaStore((s) => s.grid);
  return useMemo(() => computeDerivedState(grid), [grid]);
}
