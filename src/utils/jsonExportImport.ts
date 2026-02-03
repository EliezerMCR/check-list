import type { CheckList, ExportedData, SerializedCheckList } from '../types';

const APP_NAME = 'checklist-app';
const VERSION = '1.0';

export function exportListsToJSON(lists: CheckList[]): ExportedData {
  const serializedLists: SerializedCheckList[] = lists.map((list) => ({
    slug: list.slug,
    title: list.title,
    items: list.items.map((item) => ({
      message: item.message,
      done: item.done,
      created_at: item.created_at.toISOString(),
    })),
    created_at: list.created_at.toISOString(),
  }));

  return {
    version: VERSION,
    exportedAt: new Date().toISOString(),
    app: APP_NAME,
    data: {
      lists: serializedLists,
    },
  };
}

export function downloadJSON(content: ExportedData, filename: string): void {
  const jsonString = JSON.stringify(content, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
