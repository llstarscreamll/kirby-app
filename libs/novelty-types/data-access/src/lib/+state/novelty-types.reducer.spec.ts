import {
  SetError,
  GetNoveltyTypeOk,
  TrashNoveltyTypeOk,
  GetNoveltyTypeError,
  SearchNoveltyTypesOk,
  UpdateNoveltyTypeError,
  CreateNoveltyTypeError,
  SearchNoveltyTypesError,
} from './novelty-types.actions';
import {
  reducer,
  initialState,
  NoveltyTypesState,
} from './novelty-types.reducer';
import { emptyPagination } from '@kirby/shared';
import { createNoveltyType } from '@kirby/novelty-types/testing';

describe('NoveltyTypes Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('valid NoveltyTypes actions ', () => {
    it('should set paginated list on SearchNoveltyTypesOk action', () => {
      const noveltyTypes = [createNoveltyType('AAA'), createNoveltyType('zzz')];
      const action = new SearchNoveltyTypesOk({
        ...emptyPagination(),
        data: noveltyTypes,
      });

      const result: NoveltyTypesState = reducer(initialState, action);

      expect(result.paginatedList.data.length).toBe(2);
    });

    it('should set errors on SearchNoveltyTypesError action', () => {
      const action = new SearchNoveltyTypesError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set selected on GetNoveltyTypeOk action', () => {
      const action = new GetNoveltyTypeOk(createNoveltyType('AAA'));

      const result: NoveltyTypesState = reducer(initialState, action);

      expect(result.selected).toBeTruthy();
      expect(result.selected.id).toBe('AAA');
    });

    it('should remove novelty type from paginated list on TrashNoveltyTypeOk action', () => {
      // put the novelty type to delete on the paginated list store attribute
      let result: NoveltyTypesState = reducer(
        initialState,
        new SearchNoveltyTypesOk({
          ...emptyPagination(),
          data: [createNoveltyType('AAA')],
        })
      );
      expect(result.paginatedList.data.length).toBe(1);

      const action = new TrashNoveltyTypeOk('AAA');
      result = reducer(result, action);

      expect(result.paginatedList.data.length).toBe(0);
    });

    it('should set errors on GetNoveltyTypeError action', () => {
      const action = new GetNoveltyTypeError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set errors on CreateNoveltyTypeError action', () => {
      const action = new CreateNoveltyTypeError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set errors on UpdateNoveltyTypeError action', () => {
      const action = new UpdateNoveltyTypeError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set errors on SetError action', () => {
      const action = new SetError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });
  });
});
