import { useState, useMemo } from 'react';
import type { CheckList } from '../../types';
import { ProgressCounter } from './ProgressCounter';
import { CheckListItem } from './CheckListItem';
import { Input } from '../ui/Input';
import { PencilIcon, TrashIcon, CheckIcon } from '../ui/icons';
import { useCheckList } from '../../hooks/useCheckList';

interface CheckListCardProps {
  checkList: CheckList;
}

export function CheckListCard({ checkList }: CheckListCardProps) {
  const { updateListTitle, deleteList } = useCheckList();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(checkList.title);
  const [itemStates, setItemStates] = useState<Record<number, boolean>>({});

  const getItemDone = (index: number, initialDone: boolean) => {
    return itemStates[index] ?? initialDone;
  };

  const toggleItem = (index: number, initialDone: boolean) => {
    setItemStates((prev) => ({
      ...prev,
      [index]: !(prev[index] ?? initialDone),
    }));
  };

  const completedCount = checkList.items.filter(
    (item, index) => getItemDone(index, item.done)
  ).length;
  const totalCount = checkList.items.length;

  const sortedItems = useMemo(() => {
    return checkList.items
      .map((item, index) => ({ item, originalIndex: index }))
      .sort(
        (a, b) =>
          new Date(a.item.created_at).getTime() -
          new Date(b.item.created_at).getTime()
      );
  }, [checkList.items]);

  const handleSaveTitle = () => {
    if (editTitle.trim()) {
      updateListTitle(checkList.slug, editTitle.trim());
      setIsEditingTitle(false);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setEditTitle(checkList.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="group/card bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 transition-all duration-300 hover:border-slate-600/50 hover:shadow-lg hover:shadow-slate-900/50 flex flex-col h-[280px] sm:h-[300px] lg:h-[320px]">
      <div className="group/title flex items-center gap-2 mb-3">
        {isEditingTitle ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleTitleKeyDown}
              className="flex-1 py-1"
              autoFocus
            />
            <button
              onClick={handleSaveTitle}
              className="p-1 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 rounded"
            >
              <CheckIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-slate-100 flex-1">
              {checkList.title}
            </h2>
            <button
              onClick={() => {
                setEditTitle(checkList.title);
                setIsEditingTitle(true);
              }}
              className="p-1 text-slate-400 hover:text-sky-400 opacity-0 group-hover/title:opacity-100 transition-all duration-200 rounded"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteList(checkList.slug)}
              className="p-1 text-slate-400 hover:text-red-400 opacity-0 group-hover/title:opacity-100 transition-all duration-200 rounded"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      <ProgressCounter completed={completedCount} total={totalCount} />

      <div className="border-t border-slate-700/50 pt-3 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {sortedItems.map(({ item, originalIndex }) => (
          <CheckListItem
            key={`${checkList.slug}-${originalIndex}`}
            item={item}
            isChecked={getItemDone(originalIndex, item.done)}
            onToggle={() => toggleItem(originalIndex, item.done)}
          />
        ))}
      </div>
    </div>
  );
}
