import { WorkShiftsAction, WorkShiftsActionTypes } from './work-shifts.actions';

export const WORK_SHIFTS_FEATURE_KEY = 'workShifts';

/**
 * Interface for the 'WorkShifts' data used in
 *  - WorkShiftsState, and
 *  - workShiftsReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity { }

export interface WorkShiftsState {
  list: Entity[]; // list of WorkShifts; analogous to a sql normalized table
  selectedId?: string | number; // which WorkShifts record has been selected
  loaded: boolean; // has the WorkShifts list been loaded
  error?: any; // last none error (if any)
}

export interface WorkShiftsPartialState {
  readonly [WORK_SHIFTS_FEATURE_KEY]: WorkShiftsState;
}

export const initialState: WorkShiftsState = {
  list: [],
  loaded: false
};

export function workShiftsReducer(
  state: WorkShiftsState = initialState,
  action: WorkShiftsAction
): WorkShiftsState {
  switch (action.type) {
    case WorkShiftsActionTypes.WorkShiftsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
