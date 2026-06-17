import { UtensilId, UTENSIL_INFO, ENTRANCE, EXIT } from '@/utils/types';

interface GridCellProps {
  row: number;
  col: number;
  value: UtensilId | null;
  onClick: () => void;
  routeNumber?: number | null;
  isOnRoute?: boolean;
}

export default function GridCell({ row, col, value, onClick, routeNumber, isOnRoute }: GridCellProps) {
  const isEntrance = row === ENTRANCE[0] && col === ENTRANCE[1];
  const isExit = row === EXIT[0] && col === EXIT[1];

  let bgColor = 'bg-amber-50/80 hover:bg-amber-100';
  let borderColor = 'border-stone-300/60';

  if (isOnRoute && !value && !isEntrance && !isExit) {
    bgColor = 'bg-amber-200/50 hover:bg-amber-200/70';
    borderColor = 'border-amber-400/40';
  }

  if (value) {
    bgColor = 'bg-amber-100 border-amber-400';
    borderColor = 'border-amber-400';
    if (isOnRoute) {
      bgColor = 'bg-amber-200/80 border-amber-500';
      borderColor = 'border-amber-500';
    }
  }

  if (isEntrance) {
    bgColor = value ? 'bg-sky-100 border-sky-400' : 'bg-sky-50/80 hover:bg-sky-100';
    borderColor = value ? 'border-sky-400' : 'border-sky-300/60';
    if (isOnRoute && !value) {
      bgColor = 'bg-sky-200/50 hover:bg-sky-200/70';
      borderColor = 'border-sky-400/40';
    }
  }
  if (isExit) {
    bgColor = value ? 'bg-rose-100 border-rose-400' : 'bg-rose-50/80 hover:bg-rose-100';
    borderColor = value ? 'border-rose-400' : 'border-rose-300/60';
    if (isOnRoute && !value) {
      bgColor = 'bg-rose-200/50 hover:bg-rose-200/70';
      borderColor = 'border-rose-400/40';
    }
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full aspect-square rounded-lg border-2 transition-all duration-150
        flex flex-col items-center justify-center cursor-pointer select-none
        ${bgColor} ${borderColor}
        hover:shadow-md active:scale-95
      `}
    >
      {value ? (
        <>
          <span className="text-2xl leading-none">{UTENSIL_INFO[value].symbol}</span>
          <span className="text-[10px] font-medium text-stone-600 mt-0.5">{UTENSIL_INFO[value].name}</span>
          <span className="absolute top-0.5 right-1 text-[9px] font-bold text-amber-700">{value}</span>
          {routeNumber != null && (
            <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
              {routeNumber}
            </span>
          )}
        </>
      ) : (
        <>
          {isEntrance && (
            <span className="text-xs text-sky-500 font-medium">入口</span>
          )}
          {isExit && (
            <span className="text-xs text-rose-500 font-medium">出口</span>
          )}
          {isEntrance && (
            <span className="text-sky-400 text-sm">▶</span>
          )}
          {isExit && (
            <span className="text-rose-400 text-sm">▶</span>
          )}
        </>
      )}
    </button>
  );
}
