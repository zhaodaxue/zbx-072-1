import { useMemo } from 'react';
import { useTeaStore } from '@/store/gridStore';
import { calculateRoute } from '@/utils/routeCalculator';
import { allUtensilsPlaced } from '@/utils/types';
import { validate } from '@/utils/validator';
import { Footprints } from 'lucide-react';

export default function RouteDisplay() {
  const grid = useTeaStore((s) => s.grid);
  const placed = allUtensilsPlaced(grid);
  const valid = useMemo(() => validate(grid), [grid]);

  const steps = useMemo(() => {
    if (!placed || !valid.allPass) return null;
    return calculateRoute(grid);
  }, [grid, placed, valid.allPass]);

  if (!placed) {
    return (
      <div className="flex flex-col items-center gap-1 py-3 text-stone-400">
        <Footprints className="w-5 h-5" />
        <span className="text-xs">四件器具落位后显示动线</span>
      </div>
    );
  }

  if (!valid.allPass) {
    return (
      <div className="flex flex-col items-center gap-1 py-3 text-stone-400">
        <Footprints className="w-5 h-5" />
        <span className="text-xs">校验通过后显示动线</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl bg-amber-50 border border-amber-200">
      <div className="flex items-center gap-1.5 text-amber-700">
        <Footprints className="w-5 h-5" />
        <span className="text-xs font-medium">最短动线步数</span>
      </div>
      <span className="text-3xl font-bold text-amber-900 tabular-nums">{steps}</span>
      <span className="text-[10px] text-stone-400">从入口经四器具至出口</span>
    </div>
  );
}
