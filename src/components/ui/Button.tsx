interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98]';

  const variants = {
    primary: 'bg-sky-500 text-white hover:bg-sky-400 focus:ring-sky-500',
    secondary:
      'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500',
    ghost:
      'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 focus:ring-slate-500',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
