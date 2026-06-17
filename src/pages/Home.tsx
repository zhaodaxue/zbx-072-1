import Sidebar from '@/components/Sidebar';
import TeaGrid from '@/components/TeaGrid';
import ValidationPanel from '@/components/ValidationPanel';
import RouteDisplay from '@/components/RouteDisplay';
import ExportButton from '@/components/ExportButton';
import { useTeaStore } from '@/store/gridStore';
import { RotateCcw } from 'lucide-react';

export default function Home() {
  const resetGrid = useTeaStore((s) => s.resetGrid);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50/30 to-stone-100">
      <header className="py-6 text-center">
        <h1 className="text-2xl font-bold text-stone-800 tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          茶席器具摆位试排
        </h1>
        <p className="text-sm text-stone-400 mt-1">在席面内预排器具，校验合规性，计算最短动线</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-12">
        <div className="flex gap-6 items-start justify-center">
          <Sidebar />

          <div className="flex flex-col gap-4">
            <TeaGrid />

            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400">点击空格放置选中器具 · 点击已放格清空</span>
              <button
                onClick={resetGrid}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                重置
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-52">
            <ValidationPanel />
            <RouteDisplay />
            <ExportButton />
          </div>
        </div>
      </main>
    </div>
  );
}
