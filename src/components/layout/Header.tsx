import { Button } from '../ui/Button';
import { CheckIcon, PlusIcon } from '../ui/icons';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/25">
            <CheckIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-100">CheckList</h1>
        </div>
        <Button size="sm">
          <span className="flex items-center gap-1.5">
            <PlusIcon className="w-4 h-4" />
            Nueva Lista
          </span>
        </Button>
      </div>
    </header>
  );
}
