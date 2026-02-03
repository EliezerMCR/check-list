import { Checkbox } from '../ui/Checkbox';
import { PencilIcon, TrashIcon } from '../ui/icons';
import type { Item } from '../../types';

interface CheckListItemProps {
  item: Item;
  isChecked: boolean;
  onToggle: () => void;
}

export function CheckListItem({ item, isChecked, onToggle }: CheckListItemProps) {
  return (
    <div className="group flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg hover:bg-slate-700/40 transition-colors duration-200">
      <Checkbox checked={isChecked} onChange={onToggle} />
      <span
        className={`flex-1 text-slate-100 transition-colors duration-200 ${
          isChecked ? 'line-through text-slate-500' : ''
        }`}
      >
        {item.message}
      </span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="p-1 text-slate-400 hover:text-sky-400 transition-colors duration-200 rounded">
          <PencilIcon className="w-4 h-4" />
        </button>
        <button className="p-1 text-slate-400 hover:text-red-400 transition-colors duration-200 rounded">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
