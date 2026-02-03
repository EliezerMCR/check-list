import { useState } from 'react';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { PencilIcon, TrashIcon, CheckIcon } from '../ui/icons';
import type { Item } from '../../types';

interface CheckListItemProps {
  item: Item;
  isChecked: boolean;
  onToggle: () => void;
  onEdit: (newMessage: string) => void;
  onDelete: () => void;
}

export function CheckListItem({ item, isChecked, onToggle, onEdit, onDelete }: CheckListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.message);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(item.message);
      setIsEditing(false);
    }
  };

  const handleStartEdit = () => {
    setEditText(item.message);
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 py-2 px-2 -mx-2 rounded-lg bg-slate-700/40">
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 py-1"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="p-1 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 rounded"
        >
          <CheckIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

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
        <button
          onClick={handleStartEdit}
          className="p-1 text-slate-400 hover:text-sky-400 transition-colors duration-200 rounded"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-slate-400 hover:text-red-400 transition-colors duration-200 rounded"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
