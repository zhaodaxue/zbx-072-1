import { useState } from 'react';
import { useTeaStore } from '@/store/gridStore';
import { useDerivedState } from '@/utils/derived';
import { exportPlacement } from '@/utils/exporter';
import { Download, X, Copy, Check } from 'lucide-react';

export default function ExportButton() {
  const grid = useTeaStore((s) => s.grid);
  const { canExport, routeSteps, routeOrder } = useDerivedState();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const steps = routeSteps ?? 0;
  const handleExport = () => {
    if (!canExport) return;
    setShowModal(true);
  };

  const handleCopy = () => {
    const json = exportPlacement(grid, steps, routeOrder ?? undefined);
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const jsonOutput = canExport ? exportPlacement(grid, steps, routeOrder ?? undefined) : '';

  return (
    <>
      <button
        onClick={handleExport}
        disabled={!canExport}
        className={`
          flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
          ${
            canExport
              ? 'bg-amber-700 text-white hover:bg-amber-800 shadow-lg shadow-amber-700/20 active:scale-[0.98]'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }
        `}
      >
        <Download className="w-4 h-4" />
        导出摆位表
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-stone-800">摆位表 JSON</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-stone-100">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <div className="px-5 py-4">
              <pre className="bg-stone-900 text-emerald-300 text-xs p-4 rounded-xl overflow-auto max-h-60 font-mono leading-relaxed">
                {jsonOutput}
              </pre>
            </div>
            <div className="flex gap-2 px-5 pb-4">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制' : '复制到剪贴板'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
