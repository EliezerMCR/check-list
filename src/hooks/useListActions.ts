import type { CheckList, Item } from '../types';
import { generateSlug } from '../utils/slug';

type SetLists = (value: CheckList[] | ((prev: CheckList[]) => CheckList[])) => void;

export function useListActions(setLists: SetLists) {
  const addList = (title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const defaultItem: Item = {
      message: 'Nueva tarea',
      done: false,
      created_at: new Date(),
    };

    const newList: CheckList = {
      slug: generateSlug(trimmedTitle),
      title: trimmedTitle,
      items: [defaultItem],
      created_at: new Date(),
    };

    setLists((prev) => [...prev, newList]);
  };

  const updateListTitle = (slug: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;

    setLists((prev) =>
      prev.map((list) =>
        list.slug === slug ? { ...list, title: trimmedTitle } : list
      )
    );
  };

  const deleteList = (slug: string) => {
    setLists((prev) => prev.filter((list) => list.slug !== slug));
  };

  return {
    addList,
    updateListTitle,
    deleteList,
  };
}
