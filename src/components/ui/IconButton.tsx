import { Tooltip } from './Tooltip';

export const ICON_TOOLTIPS = {
  edit: 'Editar',
  delete: 'Eliminar',
  save: 'Guardar',
  add: 'Agregar',
  export: 'Exportar listas',
  newList: 'Nueva lista',
} as const;

type TooltipKey = keyof typeof ICON_TOOLTIPS;

const VARIANTS = {
  default: 'text-sky-400/60 hover:text-sky-400',
  save: 'text-emerald-400 hover:text-emerald-300',
  danger: 'text-red-400/60 hover:text-red-400',
} as const;

interface IconButtonProps {
  icon: React.ReactNode;
  tooltip: TooltipKey | string;
  onClick: () => void;
  variant?: keyof typeof VARIANTS;
  className?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export function IconButton({
  icon,
  tooltip,
  onClick,
  variant = 'default',
  className = '',
  tooltipPosition = 'top',
}: IconButtonProps) {
  const tooltipText = tooltip in ICON_TOOLTIPS
    ? ICON_TOOLTIPS[tooltip as TooltipKey]
    : tooltip;

  return (
    <Tooltip text={tooltipText} position={tooltipPosition}>
      <button
        onClick={onClick}
        className={`p-1 transition-colors duration-200 rounded ${VARIANTS[variant]} ${className}`}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
