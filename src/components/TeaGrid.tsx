import { useTeaStore } from '@/store/gridStore';
import { ROWS, COLS } from '@/utils/types';
import GridCell from './GridCell';

export default function TeaGrid() {
  const { grid, handleCellClick } = useTeaStore();

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
          Array.from({ length: COLS }, (_, c) => (
            <GridCell
              key={`${r}-${c}`}
              row={r}
              col={c}
              value={grid[r][c]}
              onClick={() => handleCellClick(r, c)}
            />
          ))
        )}
      </div>

      <div className="flex justify-between mt-2 px-4">
        <span className="text-[10px] text-stone-400">第 1 列</span>
        <span className="text-[10px] text-stone-400">第 6 列</span>
      </div>
    </div>
  );
}
