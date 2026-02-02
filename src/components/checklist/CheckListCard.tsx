import type { CheckList } from '../../types';
import { ProgressCounter } from './ProgressCounter';
import { CheckListItem } from './CheckListItem';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PencilIcon, PlusIcon } from '../ui/icons';

interface CheckListCardProps {
  checkList: CheckList;
}

export function CheckListCard({ checkList }: CheckListCardProps) {
  const completedCount = checkList.items.filter((item) => item.done).length;
  const totalCount = checkList.items.length;

  return (
    <div className="group/card bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 transition-all duration-300 hover:border-slate-600/50 hover:shadow-lg hover:shadow-slate-900/50 flex flex-col">
      <div className="group/title flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold text-slate-100 flex-1">
          {checkList.title}
        </h2>
        <button className="p-1 text-slate-400 hover:text-sky-400 opacity-0 group-hover/title:opacity-100 transition-all duration-200 rounded">
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>

      <ProgressCounter completed={completedCount} total={totalCount} />

      <div className="border-t border-slate-700/50 pt-3 mb-3 flex-1 overflow-y-auto overflow-x-hidden max-h-[220px] custom-scrollbar">
        {checkList.items.map((item, index) => (
          <CheckListItem key={`${checkList.slug}-${index}`} item={item} />
        ))}
      </div>

      <div className="border-t border-slate-700/50 pt-3 flex gap-2 mt-auto">
        <Input placeholder="Agregar tarea..." className="flex-1" />
        <Button size="sm" className="px-3">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
