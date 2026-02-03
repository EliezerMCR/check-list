interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  autoFocus?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export function Input({
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  className = '',
  autoFocus = false,
  error = false,
  errorMessage,
}: InputProps) {
  const baseClasses = 'w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-100 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2';
  const normalClasses = 'border-slate-600/50 focus:ring-sky-500/50 focus:border-sky-500/50';
  const errorClasses = 'border-red-500/70 focus:ring-red-500/50 focus:border-red-500/50';

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        className={`${baseClasses} ${error ? errorClasses : normalClasses} ${className}`}
      />
      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
