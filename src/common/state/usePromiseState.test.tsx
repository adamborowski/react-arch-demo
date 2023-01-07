import expect from 'expect';
import {renderHook, waitFor} from '@testing-library/react';

import {PromiseState, usePromiseState} from './usePromiseState';

describe('usePromiseState', () => {
  it('should return proper state when promise is not yet resolved', () => {
    const state = new Promise(() => undefined);
    const { result } = renderHook(() => usePromiseState(state));

    expect(result.current).toEqual({ type: 'pending' } satisfies PromiseState<unknown>);

  });
  it('should return proper state when promise is resolved', async () => {
    const promise = Promise.resolve('test result');
    const { result, rerender } = renderHook(() => usePromiseState(promise));

    await waitFor(() => {
      expect(result.current).toEqual({ type: 'loaded', data: 'test result' } satisfies PromiseState<string>)
    });
  });

  it('should return proper state when promise is rejected', async () => {
    const promise = Promise.reject('test error');
    const { result, rerender } = renderHook(() => usePromiseState(promise));

    await waitFor(() => {
      expect(result.current).toEqual({ type: 'error', message: 'test error' } satisfies PromiseState<string>)
    })
  });
});
