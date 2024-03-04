import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useFetch from '../../hooks/useFetch';

describe('useFetch', () => {
  it('should fetch data and update state correctly', async () => {
    const mockData = [{ id: 1, name: 'John Doe' }];
    const mockUrl = 'https://api.example.com/users';
    const mockSearchTerm = 'John';

    // Mock the fetch function
    /* @ts-ignore */
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ items: mockData }),
    });

    const { result } = renderHook(() => useFetch(mockUrl, mockSearchTerm));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle errors correctly', async () => {
    const mockUrl = 'https://api.example.com/users';
    const mockSearchTerm = 'John';

    // Mock the fetch function to throw an error
    /* @ts-ignore */
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFetch(mockUrl, mockSearchTerm));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Network error');
    });
  });

  it('should handle empty url or search term correctly', () => {
    const mockUrl = '';
    const mockSearchTerm = '';

    const { result } = renderHook(() => useFetch(mockUrl, mockSearchTerm));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
