import { useState, useMemo } from 'react';
import type { CheckList } from '../../types';
import { ProgressCounter } from './ProgressCounter';
import { CheckListItem } from './CheckListItem';
import { Input } from '../ui/Input';
import { PencilIcon, TrashIcon, CheckIcon, PlusIcon } from '../ui/icons';
import { useCheckList } from '../../hooks/useCheckList';

interface CheckListCardProps {
  checkList: CheckList;
  isNew?: boolean;
  onAnimationEnd?: () => void;
}

export function CheckListCard({ checkList, isNew, onAnimationEnd }: CheckListCardProps) {
  const { updateListTitle, deleteList, addItem, toggleItemDone, updateItemMessage, deleteItem, lists } = useCheckList();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(checkList.title);
  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [newItemError, setNewItemError] = useState(false);
  const [newItemErrorMessage, setNewItemErrorMessage] = useState('');

  const isOnlyNumeric = (text: string) => /^\d+$/.test(text.trim());

  const isDuplicateTitle = (text: string) => {
    const normalized = text.trim().toLowerCase();
    return lists.some(list =>
      list.slug !== checkList.slug && list.title.toLowerCase() === normalized
    );
  };

  const isDuplicateItem = (text: string, excludeIndex?: number) => {
    const normalized = text.trim().toLowerCase();
    return checkList.items.some((item, index) =>
      index !== excludeIndex && item.message.toLowerCase() === normalized
    );
  };

  const completedCount = checkList.items.filter(item => item.done).length;
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
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setTitleError(true);
      setTitleErrorMessage('El nombre es requerido');
      return;
    }
    if (isOnlyNumeric(trimmed)) {
      setTitleError(true);
      setTitleErrorMessage('El nombre debe contener al menos una letra');
      return;
    }
    if (isDuplicateTitle(trimmed)) {
      setTitleError(true);
      setTitleErrorMessage('Ya existe una lista con este nombre');
      return;
    }
    updateListTitle(checkList.slug, trimmed);
    setTitleError(false);
    setTitleErrorMessage('');
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
    if (titleError && e.target.value.trim()) {
      setTitleError(false);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setEditTitle(checkList.title);
      setTitleError(false);
      setTitleErrorMessage('');
      setIsEditingTitle(false);
    }
  };

  const handleAddItem = () => {
    const trimmed = newItemText.trim();
    if (!trimmed) {
      setNewItemError(true);
      setNewItemErrorMessage('El texto de la tarea es requerido');
      return;
    }
    if (isOnlyNumeric(trimmed)) {
      setNewItemError(true);
      setNewItemErrorMessage('La tarea debe contener al menos una letra');
      return;
    }
    if (isDuplicateItem(trimmed)) {
      setNewItemError(true);
      setNewItemErrorMessage('Ya existe una tarea con este nombre');
      return;
    }
    addItem(checkList.slug, newItemText);
    setNewItemText('');
    setNewItemError(false);
    setNewItemErrorMessage('');
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemText(e.target.value);
    if (newItemError && e.target.value.trim()) {
      setNewItemError(false);
    }
  };

  const handleAddItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div
      className={`group/card bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 transition-all duration-300 hover:border-slate-600/50 hover:shadow-lg hover:shadow-slate-900/50 flex flex-col h-[340px] sm:h-[360px] lg:h-[380px] ${isNew ? 'animate-card-appear' : ''}`}
      onAnimationEnd={isNew ? onAnimationEnd : undefined}
    >
      <div className="group/title flex items-center gap-2 mb-3">
        {isEditingTitle ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={editTitle}
              onChange={handleTitleChange}
              onKeyDown={handleTitleKeyDown}
              className="flex-1 py-1"
              error={titleError}
              errorMessage={titleErrorMessage}
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
                setTitleError(false);
                setTitleErrorMessage('');
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
            isChecked={item.done}
            onToggle={() => toggleItemDone(checkList.slug, originalIndex)}
            onEdit={(newMessage) => updateItemMessage(checkList.slug, originalIndex, newMessage)}
            onDelete={() => deleteItem(checkList.slug, originalIndex)}
            isDuplicate={(text) => isDuplicateItem(text, originalIndex)}
          />
        ))}
      </div>

      <div className="border-t border-slate-700/50 pt-3 mt-2">
        <div className="flex items-center gap-2">
          <Input
            value={newItemText}
            onChange={handleNewItemChange}
            onKeyDown={handleAddItemKeyDown}
            placeholder="Agregar nueva tarea..."
            className="flex-1 py-1 text-sm"
            error={newItemError}
            errorMessage={newItemErrorMessage}
          />
          <button
            onClick={handleAddItem}
            className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors duration-200 rounded hover:bg-slate-700/50"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
