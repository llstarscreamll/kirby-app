import {
  INVALID_DATA_API_ERROR,
  LoadStatus,
  emptyPagination
} from '@kirby/shared';
import {
  WorkShiftsState,
  initialState,
  workShiftsReducer
} from './work-shifts.reducer';
import { createWorkShift } from '@kirby/work-shifts/testing';
import {
  SearchWorkShiftsOk,
  SearchWorkShiftsError,
  CreateWorkShift,
  CreateWorkShiftOk,
  CreateWorkShiftError,
  GetWorkShift,
  GetWorkShiftOk,
  GetWorkShiftError,
  SearchWorkShifts,
  UpdateWorkShift,
  UpdateWorkShiftOk,
  UpdateWorkShiftError,
  DeleteWorkShift,
  DeleteWorkShiftOk,
  DeleteWorkShiftError
} from './work-shifts.actions';

describe('WorkShifts Reducer', () => {
  const apiError = INVALID_DATA_API_ERROR;
  const newEntity = createWorkShift('1');

  beforeEach(() => {});

  describe('valid WorkShifts actions ', () => {
    it('SearchWorkShifts should return status == loading', () => {
      const action = new SearchWorkShifts(newEntity);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.paginatingStatus).toBe(LoadStatus.Loading);
    });

    it('SearchWorkShiftsOk should return paginated list of items and status == completed', () => {
      const workShifts = [createWorkShift('1'), createWorkShift('2')];

      const action = new SearchWorkShiftsOk({
        ...emptyPagination(),
        data: workShifts
      });
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.paginatingStatus).toBe(LoadStatus.Completed);
      expect(result.paginatedList.data.length).toBe(2);
    });

    it('SearchWorkShiftsError should return empty paginated list of items and status == error', () => {
      const action = new SearchWorkShiftsError(apiError);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.paginatingStatus).toBe(LoadStatus.Error);
      expect(result.paginatedList.data.length).toBe(0);
    });

    it('CreateWorkShift should return status == loading', () => {
      const action = new CreateWorkShift(newEntity);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.creatingStatus).toBe(LoadStatus.Loading);
    });

    it('CreateWorkShiftOk should return status == completed', () => {
      const action = new CreateWorkShiftOk(newEntity);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.creatingStatus).toBe(LoadStatus.Completed);
    });

    it('CreateWorkShiftError should return error and status == error', () => {
      const action = new CreateWorkShiftError(apiError);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.creatingStatus).toBe(LoadStatus.Error);
      expect(result.error).toBeTruthy();
    });

    it('GetWorkShift should return status == loading', () => {
      const entityId = 'AAA';

      const action = new GetWorkShift(entityId);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.selectingStatus).toBe(LoadStatus.Loading);
    });

    it('GetWorkShiftOk should return selected entity and status == completed', () => {
      const action = new GetWorkShiftOk(newEntity);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.selectingStatus).toBe(LoadStatus.Completed);
      expect(result.selected).toBe(newEntity);
    });

    it('GetWorkShiftError should return error and status == error', () => {
      const action = new GetWorkShiftError(apiError);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.selectingStatus).toBe(LoadStatus.Error);
      expect(result.error).toBe(apiError);
      expect(result.selected).toBeFalsy();
    });

    it('UpdateWorkShift should return status == loading', () => {
      const entityId = 'AAA';

      const action = new UpdateWorkShift({ id: entityId, data: newEntity });
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.updatingStatus).toBe(LoadStatus.Loading);
    });

    it('UpdateWorkShiftOk should return selected entity and status == completed', () => {
      const action = new UpdateWorkShiftOk(newEntity);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.updatingStatus).toBe(LoadStatus.Completed);
      expect(result.selected).toBe(newEntity);
    });

    it('UpdateWorkShiftError should return error and status == error', () => {
      const action = new UpdateWorkShiftError(apiError);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.updatingStatus).toBe(LoadStatus.Error);
      expect(result.error).toBe(apiError);
      expect(result.selected).toBeFalsy();
    });

    it('DeleteWorkShift should return status == loading', () => {
      const entityId = 'AAA';

      const action = new DeleteWorkShift(entityId);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.deletingStatus).toBe(LoadStatus.Loading);
    });

    it('DeleteWorkShiftOk should return selected entity and status == completed', () => {
      const action = new DeleteWorkShiftOk(newEntity.id);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.deletingStatus).toBe(LoadStatus.Completed);
    });

    it('DeleteWorkShiftError should return error and status == error', () => {
      const action = new DeleteWorkShiftError(apiError);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);

      expect(result.deletingStatus).toBe(LoadStatus.Error);
      expect(result.error).toBe(apiError);
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = workShiftsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
