interface ProgressCounterProps {
  completed: number;
  total: number;
}

export function ProgressCounter({ completed, total }: ProgressCounterProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-slate-400">
          {completed}/{total} completado
        </span>
        <span className="text-slate-400">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-1.5">
        <div
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
