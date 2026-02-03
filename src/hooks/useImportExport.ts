import { useCheckList } from './useCheckList';
import { exportListsToJSON, downloadJSON } from '../utils/jsonExportImport';

export function useExport() {
  const { lists } = useCheckList();

  const exportLists = () => {
    const exportedData = exportListsToJSON(lists);
    const date = new Date().toISOString().split('T')[0];
    const filename = `checklist-backup-${date}.json`;
    downloadJSON(exportedData, filename);
  };

  return { exportLists };
}
