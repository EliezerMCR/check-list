import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItemActions } from '../useItemActions';
import type { CheckList } from '../../types';

type SetLists = (value: CheckList[] | ((prev: CheckList[]) => CheckList[])) => void;

describe('useItemActions', () => {
  let lists: CheckList[];
  let setLists: Mock<SetLists>;

  beforeEach(() => {
    lists = [
      {
        slug: 'list-1',
        title: 'List 1',
        items: [
          { message: 'Task 1', done: false, created_at: new Date() },
          { message: 'Task 2', done: true, created_at: new Date() },
        ],
        created_at: new Date(),
      },
      {
        slug: 'list-2',
        title: 'List 2',
        items: [
          { message: 'Task A', done: false, created_at: new Date() },
        ],
        created_at: new Date(),
      },
    ];

    setLists = vi.fn();
  });

  describe('addItem', () => {
    it('should add item with valid message', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.addItem('list-1', 'New Task');
      });

      expect(setLists).toHaveBeenCalled();
      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');

      expect(targetList?.items).toHaveLength(3);
      expect(targetList?.items[2]).toMatchObject({
        message: 'New Task',
        done: false,
        created_at: expect.any(Date),
      });
    });

    it('should ignore empty message', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.addItem('list-1', '');
      });

      expect(setLists).not.toHaveBeenCalled();
    });

    it('should ignore message with only spaces', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.addItem('list-1', '   ');
      });

      expect(setLists).not.toHaveBeenCalled();
    });

    it('should trim message before adding', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.addItem('list-1', '  Trimmed Task  ');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[2].message).toBe('Trimmed Task');
    });

    it('should not affect other lists', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.addItem('list-1', 'New Task');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const otherList = updatedLists.find(l => l.slug === 'list-2');
      expect(otherList?.items).toHaveLength(1);
    });
  });

  describe('updateItemMessage', () => {
    it('should update item message when valid', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.updateItemMessage('list-1', 0, 'Updated Task');
      });

      expect(setLists).toHaveBeenCalled();
      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[0].message).toBe('Updated Task');
    });

    it('should ignore empty message', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.updateItemMessage('list-1', 0, '');
      });

      expect(setLists).not.toHaveBeenCalled();
    });

    it('should ignore message with only spaces', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.updateItemMessage('list-1', 0, '   ');
      });

      expect(setLists).not.toHaveBeenCalled();
    });

    it('should trim message before updating', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.updateItemMessage('list-1', 0, '  Trimmed  ');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[0].message).toBe('Trimmed');
    });

    it('should handle out of range index gracefully', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.updateItemMessage('list-1', 999, 'Invalid');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');

      // List should remain unchanged
      expect(targetList?.items).toHaveLength(2);
      expect(targetList?.items[0].message).toBe('Task 1');
    });

    it('should not affect other items in the same list', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.updateItemMessage('list-1', 0, 'Updated');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[1].message).toBe('Task 2');
    });
  });

  describe('toggleItemDone', () => {
    it('should toggle item from undone to done', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.toggleItemDone('list-1', 0);
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[0].done).toBe(true);
    });

    it('should toggle item from done to undone', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.toggleItemDone('list-1', 1);
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[1].done).toBe(false);
    });

    it('should maintain done=true after toggling twice', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.toggleItemDone('list-1', 0);
      });

      let updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      lists = updater(lists);

      act(() => {
        result.current.toggleItemDone('list-1', 0);
      });

      updater = setLists.mock.calls[1][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[0].done).toBe(false);
    });

    it('should handle out of range index gracefully', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.toggleItemDone('list-1', 999);
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[0].done).toBe(false);
      expect(targetList?.items[1].done).toBe(true);
    });
  });

  describe('deleteItem', () => {
    it('should delete item by index', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.deleteItem('list-1', 0);
      });

      expect(setLists).toHaveBeenCalled();
      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');

      expect(targetList?.items).toHaveLength(1);
      expect(targetList?.items[0].message).toBe('Task 2');
    });

    it('should not affect other items', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.deleteItem('list-1', 0);
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const targetList = updatedLists.find(l => l.slug === 'list-1');
      expect(targetList?.items[0]).toEqual(lists[0].items[1]);
    });

    it('should not affect other lists', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      act(() => {
        result.current.deleteItem('list-1', 0);
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const otherList = updatedLists.find(l => l.slug === 'list-2');
      expect(otherList).toEqual(lists[1]);
    });
  });

  describe('Cross-list isolation', () => {
    it('should not affect other lists when adding item', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      const originalList2 = { ...lists[1], items: [...lists[1].items] };

      act(() => {
        result.current.addItem('list-1', 'New Task');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const list2 = updatedLists.find(l => l.slug === 'list-2');

      expect(list2?.items).toEqual(originalList2.items);
    });

    it('should not affect other lists when updating item', () => {
      const { result } = renderHook(() => useItemActions(setLists));

      const originalList2 = { ...lists[1], items: [...lists[1].items] };

      act(() => {
        result.current.updateItemMessage('list-1', 0, 'Updated');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      const list2 = updatedLists.find(l => l.slug === 'list-2');

      expect(list2?.items).toEqual(originalList2.items);
    });
  });
});
