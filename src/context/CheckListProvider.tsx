import type { CheckList } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useListActions } from '../hooks/useListActions';
import { useItemActions } from '../hooks/useItemActions';
import { CheckListContext } from './checkListContext';

export function CheckListProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useLocalStorage<CheckList[]>('checklists', []);

  const { addList, updateListTitle, deleteList } = useListActions(setLists);
  const { addItem, updateItemMessage, toggleItemDone, deleteItem } =
    useItemActions(setLists);

  const value = {
    lists,
    addList,
    updateListTitle,
    deleteList,
    addItem,
    updateItemMessage,
    toggleItemDone,
    deleteItem,
  };

  return (
    <CheckListContext.Provider value={value}>
      {children}
    </CheckListContext.Provider>
  );
}
