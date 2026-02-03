import { useCallback } from 'react';
import type { CheckList, Item } from '../types';

type SetLists = (value: CheckList[] | ((prev: CheckList[]) => CheckList[])) => void;

export function useItemActions(setLists: SetLists) {
  const addItem = useCallback((listSlug: string, message: string) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const newItem: Item = {
      message: trimmedMessage,
      done: false,
      created_at: new Date(),
    };

    setLists((prev) =>
      prev.map((list) =>
        list.slug === listSlug
          ? { ...list, items: [...list.items, newItem] }
          : list
      )
    );
  }, [setLists]);

  const updateItemMessage = useCallback((
    listSlug: string,
    itemIndex: number,
    newMessage: string
  ) => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    setLists((prev) =>
      prev.map((list) => {
        if (list.slug !== listSlug) return list;
        const newItems = [...list.items];
        if (itemIndex >= 0 && itemIndex < newItems.length) {
          newItems[itemIndex] = {
            ...newItems[itemIndex],
            message: trimmedMessage,
          };
        }
        return { ...list, items: newItems };
      })
    );
  }, [setLists]);

  const toggleItemDone = useCallback((listSlug: string, itemIndex: number) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.slug !== listSlug) return list;
        const newItems = [...list.items];
        if (itemIndex >= 0 && itemIndex < newItems.length) {
          newItems[itemIndex] = {
            ...newItems[itemIndex],
            done: !newItems[itemIndex].done,
          };
        }
        return { ...list, items: newItems };
      })
    );
  }, [setLists]);

  const deleteItem = useCallback((listSlug: string, itemIndex: number) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.slug !== listSlug) return list;
        const newItems = list.items.filter((_, index) => index !== itemIndex);
        return { ...list, items: newItems };
      })
    );
  }, [setLists]);

  return {
    addItem,
    updateItemMessage,
    toggleItemDone,
    deleteItem,
  };
}
