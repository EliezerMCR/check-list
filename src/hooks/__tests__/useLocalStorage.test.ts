import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should return initial value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('default');
    });

    it('should load value from localStorage when available', () => {
      window.localStorage.setItem('test-key', JSON.stringify('stored value'));

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('stored value');
    });

    it('should handle JSON parse errors gracefully', () => {
      window.localStorage.setItem('test-key', 'invalid json{');

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('default');
    });

    it('should return initial value when key does not exist', () => {
      const { result } = renderHook(() => useLocalStorage('nonexistent', { foo: 'bar' }));

      expect(result.current[0]).toEqual({ foo: 'bar' });
    });
  });

  describe('setValue', () => {
    it('should save value to localStorage when setValue is called', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        result.current[1]('new value');
      });

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify('new value')
      );
      expect(result.current[0]).toBe('new value');
    });

    it('should support functional updates', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 10));

      act(() => {
        result.current[1](prev => prev + 5);
      });

      expect(result.current[0]).toBe(15);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(15)
      );
    });

    it('should handle complex objects', () => {
      const initialValue: { lists: string[]; count: number } = { lists: [], count: 0 };
      const { result } = renderHook(() => useLocalStorage('test-key', initialValue));

      const newValue = { lists: ['a', 'b'], count: 2 };

      act(() => {
        result.current[1](newValue);
      });

      expect(result.current[0]).toEqual(newValue);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(newValue)
      );
    });
  });

  describe('reviveDates', () => {
    it('should convert ISO date strings to Date objects', () => {
      const dateStr = '2026-02-01T12:00:00.000Z';
      const data = { created_at: dateStr };

      window.localStorage.setItem('test-key', JSON.stringify(data));

      const { result } = renderHook(() => useLocalStorage<{ created_at: Date }>('test-key', { created_at: new Date() }));

      expect(result.current[0].created_at).toBeInstanceOf(Date);
      expect(result.current[0].created_at.toISOString()).toBe(dateStr);
    });

    it('should convert dates in nested objects', () => {
      const data = {
        list: {
          title: 'Test',
          created_at: '2026-02-01T12:00:00.000Z',
        },
      };

      window.localStorage.setItem('test-key', JSON.stringify(data));

      type DataType = { list: { title: string; created_at: Date } };
      const { result } = renderHook(() => useLocalStorage<DataType>('test-key', {} as DataType));

      expect(result.current[0].list.created_at).toBeInstanceOf(Date);
    });

    it('should convert dates in arrays', () => {
      const data = {
        items: [
          { message: 'Task 1', created_at: '2026-02-01T12:00:00.000Z' },
          { message: 'Task 2', created_at: '2026-02-02T12:00:00.000Z' },
        ],
      };

      window.localStorage.setItem('test-key', JSON.stringify(data));

      type DataType = { items: Array<{ message: string; created_at: Date }> };
      const { result } = renderHook(() => useLocalStorage<DataType>('test-key', { items: [] }));

      expect(result.current[0].items[0].created_at).toBeInstanceOf(Date);
      expect(result.current[0].items[1].created_at).toBeInstanceOf(Date);
    });

    it('should not convert non-ISO date strings', () => {
      const data = { text: 'not a date: 2026-02-01' };

      window.localStorage.setItem('test-key', JSON.stringify(data));

      type DataType = { text: string };
      const { result } = renderHook(() => useLocalStorage<DataType>('test-key', {} as DataType));

      expect(result.current[0].text).toBe('not a date: 2026-02-01');
      expect(result.current[0].text).not.toBeInstanceOf(Date);
    });
  });

  describe('Lifecycle', () => {
    it('should cleanup storage event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useLocalStorage('test-key', 'initial'));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    });
  });
});
