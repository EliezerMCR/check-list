interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ children, text, position = 'bottom' }: TooltipProps) {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-700',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-700',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-700',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-700',
  };

  const arrowBorders = {
    top: 'border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'border-l-transparent border-r-transparent border-t-transparent',
    left: 'border-t-transparent border-b-transparent border-r-transparent',
    right: 'border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div className="relative group/tooltip inline-block">
      {children}
      <div
        className={`absolute ${positions[position]} px-2 py-1 bg-slate-700 text-slate-100 text-xs rounded whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-opacity duration-200 z-50 pointer-events-none`}
      >
        {text}
        <div
          className={`absolute ${arrows[position]} ${arrowBorders[position]} border-4 border-solid`}
        />
      </div>
    </div>
  );
}
