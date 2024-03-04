import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useDebouncedState from '../../hooks/useDebouncedState';

describe('useDebouncedState', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() =>
      useDebouncedState('initial value', 500)
    );

    expect(result.current).toBe('initial value');
  });

  it('should update the debounced value after the delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedState(value, delay),
      {
        initialProps: { value: 'initial value', delay: 500 },
      }
    );

    rerender({ value: 'updated value', delay: 500 });

    expect(result.current).toBe('initial value');

    await waitFor(() => {
      expect(result.current).toBe('updated value');
    });
  });
});
