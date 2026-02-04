import { useState, useCallback } from 'react';
import { PlusIcon, CheckIcon } from '../ui/icons';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useCheckList } from '../../hooks/useCheckList';

const ONLY_NUMERIC_REGEX = /^\d+$/;

interface AddListCardProps {
  ref?: React.Ref<HTMLDivElement | HTMLButtonElement>;
  onListCreated?: (slug: string) => void;
}

export function AddListCard({ ref, onListCreated }: AddListCardProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { addList, lists } = useCheckList();

  const isOnlyNumeric = (text: string) => ONLY_NUMERIC_REGEX.test(text.trim());

  const isDuplicateTitle = useCallback((text: string) => {
    const normalized = text.trim().toLowerCase();
    return lists.some(list => list.title.toLowerCase() === normalized);
  }, [lists]);

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError(true);
      setErrorMessage('El nombre de la lista es requerido');
      return;
    }
    if (isOnlyNumeric(trimmed)) {
      setError(true);
      setErrorMessage('El nombre debe contener al menos una letra');
      return;
    }
    if (isDuplicateTitle(trimmed)) {
      setError(true);
      setErrorMessage('Ya existe una lista con este nombre');
      return;
    }
    const slug = addList(title);
    if (slug) {
      onListCreated?.(slug);
    }
    setTitle('');
    setError(false);
    setErrorMessage('');
    setIsCreating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error && e.target.value.trim()) {
      setError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setTitle('');
      setError(false);
      setErrorMessage('');
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setError(false);
    setErrorMessage('');
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 flex flex-col h-[340px] sm:h-[360px] lg:h-[380px]">
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-3">
            <Input
              placeholder="Nombre de la lista..."
              value={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={error}
              errorMessage={errorMessage}
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-1"
              size="sm"
            >
              <CheckIcon className="w-4 h-4" />
              Crear
            </Button>
            <Button
              variant="ghost"
              onClick={handleCancel}
              size="sm"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={() => setIsCreating(true)}
      className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-dashed border-slate-700/50 p-4 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60 flex flex-col items-center justify-center h-[340px] sm:h-[360px] lg:h-[380px] cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-sky-500/20 group-hover:scale-110">
        <PlusIcon className="w-8 h-8 text-slate-500 transition-colors duration-300 group-hover:text-sky-400" />
      </div>
      <span className="text-slate-500 text-sm transition-colors duration-300 group-hover:text-slate-400">
        Agregar lista
      </span>
    </button>
  );
}
