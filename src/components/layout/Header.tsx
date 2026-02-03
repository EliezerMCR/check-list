import { CheckIcon, DownloadIcon, PlusIcon } from '../ui/icons';
import { IconButton } from '../ui/IconButton';
import { useExport } from '../../hooks/useImportExport';

export function Header() {
  const { exportLists } = useExport();

  const scrollToAddList = () => {
    const addListCard = document.getElementById('add-list-card');
    addListCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/25">
              <CheckIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-100">CheckList</h1>
          </div>
          <div className="flex items-center gap-1">
            <div className="md:hidden">
              <IconButton
                icon={<PlusIcon className="w-5 h-5" />}
                tooltip="newList"
                onClick={scrollToAddList}
                className="p-2 hover:bg-slate-700/50 rounded-lg"
                tooltipPosition="bottom"
              />
            </div>
            <IconButton
              icon={<DownloadIcon className="w-5 h-5" />}
              tooltip="export"
              onClick={exportLists}
              className="p-2 hover:bg-slate-700/50 rounded-lg"
              tooltipPosition="bottom"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
