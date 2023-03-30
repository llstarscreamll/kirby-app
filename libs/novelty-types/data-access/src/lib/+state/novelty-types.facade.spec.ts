import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { createNoveltyType } from '@kirby/novelty-types/testing';

import { NoveltyTypesFacade } from './novelty-types.facade';
import { NoveltyTypeService } from '../novelty-type.service';
import { noveltyTypesActions as a } from './novelty-types.actions';
import { NoveltyTypesEffects } from './novelty-types.effects';
import { reducer, NoveltyTypesState } from './novelty-types.reducer';

interface TestSchema {
  noveltyTypes: NoveltyTypesState;
}

describe('NoveltyTypesFacade', () => {
  let store: Store<TestSchema>;
  let facade: NoveltyTypesFacade;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(reducer), EffectsModule.forFeature([NoveltyTypesEffects])],
        providers: [
          NoveltyTypesFacade,
          { provide: Router, useValue: { navigate: (u) => true } },
          { provide: MatSnackBar, useValue: { open: (o, t, th) => true } },
          { provide: NoveltyTypeService, useValue: { search: (q) => true } },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(NoveltyTypesFacade);
    });

    it('paginatedNoveltyTypes$ should return empty paginated list by default', async () => {
      let page = await readFirst(facade.paginatedNoveltyTypes$);

      expect(page.data.length).toBe(0);
    });

    it('selectNoveltyType$ should return selected novelty type', async () => {
      let selected = await readFirst(facade.selectedNoveltyType$);

      expect(selected).toBeFalsy();

      const noveltyType = createNoveltyType('AAA');
      store.dispatch(a.getOk(noveltyType));

      selected = await readFirst(facade.selectedNoveltyType$);

      expect(selected).toBeTruthy();
      expect(selected.id).toBe('AAA');
    });

    it('errors$ should return current errors', async () => {
      let error = await readFirst(facade.errors$);

      expect(error).toBeFalsy();

      const expectedError = { message: 'Crap!!', ok: false };
      store.dispatch(a.setError(expectedError));

      error = await readFirst(facade.errors$);

      expect(error).toBeTruthy();
      expect(error.message).toBe('Crap!!');
    });

    it('search(...) should call SearchNoveltyTypes action', () => {
      const query = { search: 'foo' };
      jest.spyOn(store, 'dispatch');

      facade.search(query);

      expect(store.dispatch).toHaveBeenCalledWith(a.search(query));
    });

    it('get(...) should call GetNoveltyType action', () => {
      const noveltyTypeId = 'AAA';
      jest.spyOn(store, 'dispatch');

      facade.get(noveltyTypeId);

      expect(store.dispatch).toHaveBeenCalledWith(a.get(noveltyTypeId));
    });

    it('create(...) should call CreateNoveltyType action', () => {
      const data = createNoveltyType();
      delete data.id;
      jest.spyOn(store, 'dispatch');

      facade.create(data);

      expect(store.dispatch).toHaveBeenCalledWith(a.create(data));
    });

    it('update(...) should call UpdateNoveltyType action', () => {
      const data = createNoveltyType();
      const noveltyTypeId = data.id;
      delete data.id;
      jest.spyOn(store, 'dispatch');

      facade.update(noveltyTypeId, data);

      expect(store.dispatch).toHaveBeenCalledWith(a.update({ id: noveltyTypeId, data }));
    });

    it('trash(...) should call DeleteNoveltyType action', () => {
      const noveltyTypeId = 'AAA';
      jest.spyOn(store, 'dispatch');

      facade.trash(noveltyTypeId);

      expect(store.dispatch).toHaveBeenCalledWith(a.trash(noveltyTypeId));
    });
  });
});
