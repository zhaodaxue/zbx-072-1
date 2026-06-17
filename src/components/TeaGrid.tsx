import { useTeaStore } from '@/store/gridStore';
import { useDerivedState } from '@/utils/derived';
import { ROWS, COLS } from '@/utils/types';
import GridCell from './GridCell';

export default function TeaGrid() {
  const { grid, handleCellClick } = useTeaStore();
  const { pathSet, utensilOrder } = useDerivedState();

  return (
    <div className="relative">
      <div
        className="grid gap-1.5 p-4 rounded-2xl border-2 border-stone-300/40"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          background: 'linear-gradient(135deg, #f5ebe0 0%, #ede0d4 50%, #e6d5c3 100%)',
        }}
      >
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => {
            const value = grid[r][c];
            const key = `${r},${c}`;
            const isOnRoute = pathSet ? pathSet.has(key) : false;
            const routeNumber = value && utensilOrder ? utensilOrder[value] : null;

            return (
              <GridCell
                key={`${r}-${c}`}
                row={r}
                col={c}
                value={value}
                onClick={() => handleCellClick(r, c)}
                routeNumber={routeNumber}
                isOnRoute={isOnRoute}
              />
            );
          })
        )}
      </div>

      <div className="flex justify-between mt-2 px-4">
        <span className="text-[10px] text-stone-400">第 1 列</span>
        <span className="text-[10px] text-stone-400">第 6 列</span>
      </div>
    </div>
  );
}
