import { useMemo } from 'react';
import { useTeaStore } from '@/store/gridStore';
import { validate } from '@/utils/validator';
import { Check, X } from 'lucide-react';

export default function ValidationPanel() {
  const grid = useTeaStore((s) => s.grid);
  const result = useMemo(() => validate(grid), [grid]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold tracking-wide text-stone-500 mb-1">合法性校验</h3>
      {result.rules.map((rule) => (
        <div
          key={rule.key}
          className={`
            flex items-start gap-2 px-3 py-2 rounded-lg border text-sm transition-all duration-200
            ${
              rule.pass
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                : 'bg-red-50/80 border-red-200 text-red-700'
            }
          `}
        >
          {rule.pass ? (
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
          ) : (
            <X className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
          )}
          <div>
            <div className="font-medium">{rule.label}</div>
            <div className={`text-xs mt-0.5 ${rule.pass ? 'text-emerald-600/70' : 'text-red-500/70'}`}>
              {rule.reason}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
