import { create } from 'zustand';
import { GridState, UtensilId, ROWS, COLS, createEmptyGrid } from '@/utils/types';

const UTENSIL_ORDER: UtensilId[] = ['H', 'G', 'B', 'Y'];

interface TeaStore {
  grid: GridState;
  selectedUtensil: UtensilId;
  lastSelectFromSidebar: boolean;
  selectUtensil: (id: UtensilId) => void;
  handleCellClick: (row: number, col: number) => void;
  resetGrid: () => void;
}

export const useTeaStore = create<TeaStore>((set) => ({
  grid: createEmptyGrid(),
  selectedUtensil: 'H',
  lastSelectFromSidebar: false,

  selectUtensil: (id: UtensilId) => set({ selectedUtensil: id, lastSelectFromSidebar: true }),

  handleCellClick: (row: number, col: number) =>
    set((state) => {
      const newGrid = state.grid.map((r) => [...r]) as GridState;
      const current = newGrid[row][col];

      if (current) {
        newGrid[row][col] = null;
        return { grid: newGrid, lastSelectFromSidebar: false };
      }

      let uid: UtensilId;
      const newLastSelectFromSidebar = false;

      if (state.lastSelectFromSidebar) {
        uid = state.selectedUtensil;
      } else {
        const currentIndex = UTENSIL_ORDER.indexOf(state.selectedUtensil);
        const nextIndex = (currentIndex + 1) % UTENSIL_ORDER.length;
        uid = UTENSIL_ORDER[nextIndex];
      }

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (newGrid[r][c] === uid) {
            newGrid[r][c] = null;
          }
        }
      }
      newGrid[row][col] = uid;

      return {
        grid: newGrid,
        selectedUtensil: uid,
        lastSelectFromSidebar: newLastSelectFromSidebar,
      };
    }),

  resetGrid: () => set({ grid: createEmptyGrid(), lastSelectFromSidebar: false }),
}));
