import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '@kirby/shared';

export function initStateFromLocalStorage(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}
