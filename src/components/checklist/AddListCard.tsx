import { PlusIcon } from '../ui/icons';

export function AddListCard() {
  return (
    <button className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-dashed border-slate-700/50 p-4 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60 flex flex-col items-center justify-center min-h-[200px] cursor-pointer group">
      <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-sky-500/20 group-hover:scale-110">
        <PlusIcon className="w-8 h-8 text-slate-500 transition-colors duration-300 group-hover:text-sky-400" />
      </div>
      <span className="text-slate-500 text-sm transition-colors duration-300 group-hover:text-slate-400">
        Agregar lista
      </span>
    </button>
  );
}
