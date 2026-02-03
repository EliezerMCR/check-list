import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useListActions } from '../useListActions';
import type { CheckList } from '../../types';

type SetLists = (value: CheckList[] | ((prev: CheckList[]) => CheckList[])) => void;

describe('useListActions', () => {
  let lists: CheckList[];
  let setLists: Mock<SetLists>;

  beforeEach(() => {
    lists = [];
    setLists = vi.fn();
  });

  describe('addList', () => {
    it('should create list with valid title and unique slug', () => {
      const mockDate = new Date('2026-02-01T12:00:00Z');
      vi.setSystemTime(mockDate);

      const { result } = renderHook(() => useListActions(setLists));

      let slug: string;
      act(() => {
        slug = result.current.addList('My Shopping List');
      });

      expect(setLists).toHaveBeenCalled();
      expect(slug!).toMatch(/^my-shopping-list-\d+$/);

      // Verify the list structure
      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const newLists = updater([]);
      expect(newLists).toHaveLength(1);
      expect(newLists[0]).toMatchObject({
        slug: expect.stringMatching(/^my-shopping-list-\d+$/),
        title: 'My Shopping List',
        created_at: expect.any(Date),
      });
      expect(newLists[0].items).toHaveLength(1);

      vi.useRealTimers();
    });

    it('should create default item "Nueva tarea"', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.addList('Test List');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const newLists = updater([]);
      expect(newLists[0].items[0]).toMatchObject({
        message: 'Nueva tarea',
        done: false,
        created_at: expect.any(Date),
      });
    });

    it('should reject empty title', () => {
      const { result } = renderHook(() => useListActions(setLists));

      let slug: string;
      act(() => {
        slug = result.current.addList('');
      });

      expect(slug!).toBe('');
      expect(setLists).not.toHaveBeenCalled();
    });

    it('should reject title with only spaces', () => {
      const { result } = renderHook(() => useListActions(setLists));

      let slug: string;
      act(() => {
        slug = result.current.addList('   ');
      });

      expect(slug!).toBe('');
      expect(setLists).not.toHaveBeenCalled();
    });

    it('should trim title before saving', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.addList('  My List  ');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const newLists = updater([]);
      expect(newLists[0].title).toBe('My List');
    });

    it('should generate unique slugs for lists with same title', () => {
      const mockDate1 = new Date('2026-02-01T12:00:00Z');
      vi.setSystemTime(mockDate1);

      const { result } = renderHook(() => useListActions(setLists));

      let slug1: string;
      act(() => {
        slug1 = result.current.addList('Test');
      });

      // Advance time
      vi.setSystemTime(new Date('2026-02-01T12:00:01Z'));

      let slug2: string;
      act(() => {
        slug2 = result.current.addList('Test');
      });

      expect(slug1!).not.toBe(slug2!);
      expect(slug1!).toMatch(/^test-\d+$/);
      expect(slug2!).toMatch(/^test-\d+$/);

      vi.useRealTimers();
    });
  });

  describe('updateListTitle', () => {
    beforeEach(() => {
      lists = [
        {
          slug: 'test-list-123',
          title: 'Original Title',
          items: [],
          created_at: new Date(),
        },
      ];
    });

    it('should update title when valid', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.updateListTitle('test-list-123', 'Updated Title');
      });

      expect(setLists).toHaveBeenCalled();
      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      expect(updatedLists[0].title).toBe('Updated Title');
    });

    it('should ignore empty title', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.updateListTitle('test-list-123', '');
      });

      expect(setLists).not.toHaveBeenCalled();
    });

    it('should ignore title with only spaces', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.updateListTitle('test-list-123', '   ');
      });

      expect(setLists).not.toHaveBeenCalled();
    });

    it('should trim title before updating', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.updateListTitle('test-list-123', '  Trimmed  ');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      expect(updatedLists[0].title).toBe('Trimmed');
    });
  });

  describe('deleteList', () => {
    beforeEach(() => {
      lists = [
        {
          slug: 'list-1',
          title: 'List 1',
          items: [],
          created_at: new Date(),
        },
        {
          slug: 'list-2',
          title: 'List 2',
          items: [],
          created_at: new Date(),
        },
      ];
    });

    it('should delete list by slug', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.deleteList('list-1');
      });

      expect(setLists).toHaveBeenCalled();
      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      expect(updatedLists).toHaveLength(1);
      expect(updatedLists[0].slug).toBe('list-2');
    });

    it('should not affect other lists', () => {
      const { result } = renderHook(() => useListActions(setLists));

      act(() => {
        result.current.deleteList('list-1');
      });

      const updater = setLists.mock.calls[0][0] as (prev: CheckList[]) => CheckList[];
      const updatedLists = updater(lists);
      expect(updatedLists[0].slug).toBe('list-2');
      expect(updatedLists[0].title).toBe('List 2');
    });
  });
});
