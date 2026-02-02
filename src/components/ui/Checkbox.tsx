import { CheckIcon } from './icons';

interface CheckboxProps {
  checked: boolean;
  onChange?: () => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
        checked
          ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
          : 'bg-slate-700/50 border-slate-500 hover:border-slate-400'
      }`}
    >
      {checked && (
        <CheckIcon className="w-3 h-3 text-white animate-scale-in" />
      )}
    </button>
  );
}
