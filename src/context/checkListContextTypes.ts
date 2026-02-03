import type { CheckList } from '../types';

export interface CheckListContextType {
  lists: CheckList[];
  addList: (title: string) => string;
  updateListTitle: (slug: string, newTitle: string) => void;
  deleteList: (slug: string) => void;
  addItem: (listSlug: string, message: string) => void;
  updateItemMessage: (
    listSlug: string,
    itemIndex: number,
    newMessage: string
  ) => void;
  toggleItemDone: (listSlug: string, itemIndex: number) => void;
  deleteItem: (listSlug: string, itemIndex: number) => void;
}
