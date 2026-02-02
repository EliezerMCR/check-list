import { useState } from 'react';
import { PlusIcon, CheckIcon } from '../ui/icons';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useCheckList } from '../../hooks/useCheckList';

export function AddListCard() {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const { addList } = useCheckList();

  const handleSubmit = () => {
    if (title.trim()) {
      addList(title);
      setTitle('');
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setTitle('');
      setIsCreating(false);
    }
  };

  if (isCreating) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 flex flex-col h-[280px] sm:h-[300px] lg:h-[320px]">
        <div className="flex-1 flex flex-col justify-center">
          <Input
            placeholder="Nombre de la lista..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mb-3"
            autoFocus
          />
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
              onClick={() => {
                setTitle('');
                setIsCreating(false);
              }}
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
      onClick={() => setIsCreating(true)}
      className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-dashed border-slate-700/50 p-4 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60 flex flex-col items-center justify-center h-[280px] sm:h-[300px] lg:h-[320px] cursor-pointer group"
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
