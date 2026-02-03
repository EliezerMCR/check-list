import { useState } from 'react';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { PencilIcon, TrashIcon, CheckIcon } from '../ui/icons';
import { IconButton } from '../ui/IconButton';
import type { Item } from '../../types';

interface CheckListItemProps {
  item: Item;
  isChecked: boolean;
  onToggle: () => void;
  onEdit: (newMessage: string) => void;
  onDelete: () => void;
  isDuplicate: (text: string) => boolean;
}

export function CheckListItem({ item, isChecked, onToggle, onEdit, onDelete, isDuplicate }: CheckListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.message);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isOnlyNumeric = (text: string) => /^\d+$/.test(text.trim());

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      setError(true);
      setErrorMessage('El texto de la tarea es requerido');
      return;
    }
    if (isOnlyNumeric(trimmed)) {
      setError(true);
      setErrorMessage('La tarea debe contener al menos una letra');
      return;
    }
    if (isDuplicate(trimmed)) {
      setError(true);
      setErrorMessage('Ya existe una tarea con este texto');
      return;
    }
    onEdit(trimmed);
    setError(false);
    setErrorMessage('');
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
    if (error && e.target.value.trim()) {
      setError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(item.message);
      setError(false);
      setErrorMessage('');
      setIsEditing(false);
    }
  };

  const handleStartEdit = () => {
    setEditText(item.message);
    setError(false);
    setErrorMessage('');
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 py-2 px-2 -mx-2 rounded-lg bg-slate-700/40">
        <Input
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 py-1"
          error={error}
          errorMessage={errorMessage}
          autoFocus
        />
        <IconButton
          icon={<CheckIcon className="w-4 h-4" />}
          tooltip="save"
          onClick={handleSave}
          variant="save"
        />
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
      <div className="flex items-center gap-1">
        <IconButton
          icon={<PencilIcon className="w-4 h-4" />}
          tooltip="edit"
          onClick={handleStartEdit}
          tooltipPosition='left'
        />
        <IconButton
          icon={<TrashIcon className="w-4 h-4" />}
          tooltip="delete"
          onClick={onDelete}
          variant="danger"
          tooltipPosition='left'
        />
      </div>
    </div>
  );
}
