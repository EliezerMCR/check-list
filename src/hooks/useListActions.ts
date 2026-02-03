import { useCallback } from 'react';
import type { CheckList, Item } from '../types';
import { generateSlug } from '../utils/slug';

type SetLists = (value: CheckList[] | ((prev: CheckList[]) => CheckList[])) => void;

export function useListActions(setLists: SetLists) {
  const addList = useCallback((title: string): string => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return '';

    const slug = generateSlug(trimmedTitle);

    const defaultItem: Item = {
      message: 'Nueva tarea',
      done: false,
      created_at: new Date(),
    };

    const newList: CheckList = {
      slug,
      title: trimmedTitle,
      items: [defaultItem],
      created_at: new Date(),
    };

    setLists((prev) => [...prev, newList]);
    return slug;
  }, [setLists]);

  const updateListTitle = useCallback((slug: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;

    setLists((prev) =>
      prev.map((list) =>
        list.slug === slug ? { ...list, title: trimmedTitle } : list
      )
    );
  }, [setLists]);

  const deleteList = useCallback((slug: string) => {
    setLists((prev) => prev.filter((list) => list.slug !== slug));
  }, [setLists]);

  return {
    addList,
    updateListTitle,
    deleteList,
  };
}
