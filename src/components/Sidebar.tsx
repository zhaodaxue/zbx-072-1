import { useTeaStore } from '@/store/gridStore';
import { useDerivedState } from '@/utils/derived';
import { UtensilId, UTENSIL_INFO } from '@/utils/types';

const UTENSIL_IDS: UtensilId[] = ['H', 'G', 'B', 'Y'];

export default function Sidebar() {
  const selectedUtensil = useTeaStore((s) => s.selectedUtensil);
  const selectUtensil = useTeaStore((s) => s.selectUtensil);
  const { placedUtensils } = useDerivedState();

  return (
    <div className="flex flex-col gap-3 w-28">
      <h3 className="text-sm font-semibold tracking-wide text-stone-500 mb-1">器具选择</h3>
      {UTENSIL_IDS.map((uid) => {
        const info = UTENSIL_INFO[uid];
        const isSelected = selectedUtensil === uid;
        const isPlaced = placedUtensils[uid];

        return (
          <button
            key={uid}
            onClick={() => selectUtensil(uid)}
            className={`
              relative flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all duration-200
              ${
                isSelected
                  ? 'border-amber-700 bg-amber-50 shadow-md shadow-amber-200/50'
                  : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
              }
            `}
          >
            <span className="text-xl">{info.symbol}</span>
            <span className={`text-sm font-medium ${isSelected ? 'text-amber-900' : 'text-stone-600'}`}>
              {info.name}
            </span>
            {isPlaced && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
                ✓
              </span>
            )}
          </button>
        );
      })}

      <div className="mt-4 pt-3 border-t border-stone-200">
        <h4 className="text-xs text-stone-400 mb-2">席面标注</h4>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="inline-block w-3 h-3 rounded-sm bg-sky-100 border border-sky-300" />
          入口格
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
          <span className="inline-block w-3 h-3 rounded-sm bg-rose-100 border border-rose-300" />
          出口格
        </div>
      </div>
    </div>
  );
}
