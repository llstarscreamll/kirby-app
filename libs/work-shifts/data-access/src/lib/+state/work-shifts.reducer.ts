import { WorkShiftInterface } from '@llstarscreamll/work-shifts/util/src';
import { Pagination, emptyPagination, ApiError } from '@llstarscreamll/shared';
import { WorkShiftsAction, WorkShiftsActionTypes } from './work-shifts.actions';

export const WORK_SHIFTS_FEATURE_KEY = 'workShifts';

export interface WorkShiftsState {
  paginatedList: Pagination<WorkShiftInterface>; // paginated list of WorkShifts; analogous to a sql normalized table
  selectedId?: string; // which WorkShift record has been selected
  paginatedListLoaded: boolean; // has the WorkShifts paginated list been loaded
  error?: ApiError; // last error (if any)
}

export interface WorkShiftsPartialState {
  readonly [WORK_SHIFTS_FEATURE_KEY]: WorkShiftsState;
}

export const initialState: WorkShiftsState = {
  paginatedList: emptyPagination(),
  paginatedListLoaded: false
};

export function workShiftsReducer(state: WorkShiftsState = initialState, action: WorkShiftsAction): WorkShiftsState {
  switch (action.type) {
    case WorkShiftsActionTypes.WorkShiftsLoaded: {
      state = {
        ...state,
        paginatedList: action.payload,
        paginatedListLoaded: true
      };
      break;
    }
  }
  return state;
}
