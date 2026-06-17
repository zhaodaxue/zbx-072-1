import { create } from 'zustand';
import { GridState, UtensilId, ROWS, COLS, createEmptyGrid } from '@/utils/types';

interface TeaStore {
  grid: GridState;
  selectedUtensil: UtensilId;
  selectUtensil: (id: UtensilId) => void;
  handleCellClick: (row: number, col: number) => void;
  resetGrid: () => void;
}

export const useTeaStore = create<TeaStore>((set) => ({
  grid: createEmptyGrid(),
  selectedUtensil: 'H',

  selectUtensil: (id: UtensilId) => set({ selectedUtensil: id }),

  handleCellClick: (row: number, col: number) =>
    set((state) => {
      const newGrid = state.grid.map((r) => [...r]) as GridState;
      const current = newGrid[row][col];

      if (current) {
        newGrid[row][col] = null;
      } else {
        const uid = state.selectedUtensil;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (newGrid[r][c] === uid) {
              newGrid[r][c] = null;
            }
          }
        }
        newGrid[row][col] = uid;
      }

      return { grid: newGrid };
    }),

  resetGrid: () => set({ grid: createEmptyGrid() }),
}));
