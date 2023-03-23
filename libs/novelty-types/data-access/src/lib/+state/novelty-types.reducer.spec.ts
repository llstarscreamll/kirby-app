import { emptyPagination } from '@kirby/shared';
import { createNoveltyType } from '@kirby/novelty-types/testing';

import { noveltyTypesActions as a } from './novelty-types.actions';
import { reducer, initialState, NoveltyTypesState } from './novelty-types.reducer';

describe('NoveltyTypes Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('valid NoveltyTypes actions ', () => {
    it('should set paginated list on SearchNoveltyTypesOk action', () => {
      const noveltyTypes = [createNoveltyType('AAA'), createNoveltyType('zzz')];
      const action = a.searchOk({
        ...emptyPagination(),
        data: noveltyTypes,
      });

      const result: NoveltyTypesState = reducer.reducer(initialState, action);

      expect(result.paginatedList.data.length).toBe(2);
    });

    it('should set errors on SearchNoveltyTypesError action', () => {
      const action = a.searchError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer.reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set selected on GetNoveltyTypeOk action', () => {
      const action = a.getOk(createNoveltyType('AAA'));

      const result: NoveltyTypesState = reducer.reducer(initialState, action);

      expect(result.selected).toBeTruthy();
      expect(result.selected.id).toBe('AAA');
    });

    it('should remove novelty type from paginated list on TrashNoveltyTypeOk action', () => {
      // put the novelty type to delete on the paginated list store attribute
      let result: NoveltyTypesState = reducer.reducer(
        initialState,
        a.searchOk({
          ...emptyPagination(),
          data: [createNoveltyType('AAA')],
        })
      );
      expect(result.paginatedList.data.length).toBe(1);

      const action = a.trashOk('AAA');
      result = reducer.reducer(result, action);

      expect(result.paginatedList.data.length).toBe(0);
    });

    it('should set errors on GetNoveltyTypeError action', () => {
      const action = a.getError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer.reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set errors on CreateNoveltyTypeError action', () => {
      const action = a.createError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer.reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set errors on UpdateNoveltyTypeError action', () => {
      const action = a.updateError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer.reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });

    it('should set errors on SetError action', () => {
      const action = a.setError({
        message: 'Crap!!',
        ok: false,
      });

      const result: NoveltyTypesState = reducer.reducer(initialState, action);

      expect(result.error).toBeTruthy();
      expect(result.error.message).toBe('Crap!!');
    });
  });
});
