import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import {
  reducer,
  initialState,
  NoveltyTypesState,
} from './novelty-types.reducer';
import { NoveltyTypesFacade } from './novelty-types.facade';
import { NoveltyTypeService } from '../novelty-type.service';
import {
  SearchNoveltyTypes,
  CreateNoveltyType,
  GetNoveltyType,
  UpdateNoveltyType,
  GetNoveltyTypeOk,
  SetError,
  TrashNoveltyType,
} from './novelty-types.actions';
import { NoveltyTypesEffects } from './novelty-types.effects';
import { createNoveltyType } from '@kirby/novelty-types/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface TestSchema {
  noveltyTypes: NoveltyTypesState;
}

describe('NoveltyTypesFacade', () => {
  let store: Store<TestSchema>;
  let facade: NoveltyTypesFacade;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('noveltyTypes', reducer, { initialState }),
          EffectsModule.forFeature([NoveltyTypesEffects]),
        ],
        providers: [
          NoveltyTypesFacade,
          { provide: Router, useValue: { navigate: (u) => true } },
          { provide: MatSnackBar, useValue: { open: (o, t, th) => true } },
          { provide: NoveltyTypeService, useValue: { search: (q) => true } },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(NoveltyTypesFacade);
    });

    it('paginatedNoveltyTypes$ should return empty paginated list by default', async (done) => {
      try {
        let page = await readFirst(facade.paginatedNoveltyTypes$);

        expect(page.data.length).toBe(0);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('selectNoveltyType$ should return selected novelty type', async (done) => {
      try {
        let selected = await readFirst(facade.selectedNoveltyType$);

        expect(selected).toBeFalsy();

        const noveltyType = createNoveltyType('AAA');
        store.dispatch(new GetNoveltyTypeOk(noveltyType));

        selected = await readFirst(facade.selectedNoveltyType$);

        expect(selected).toBeTruthy();
        expect(selected.id).toBe('AAA');

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('errors$ should return current errors', async (done) => {
      try {
        let error = await readFirst(facade.errors$);

        expect(error).toBeFalsy();

        const expectedError = { message: 'Crap!!', ok: false };
        store.dispatch(new SetError(expectedError));

        error = await readFirst(facade.errors$);

        expect(error).toBeTruthy();
        expect(error.message).toBe('Crap!!');

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('search(...) should call SearchNoveltyTypes action', () => {
      const query = { search: 'foo' };
      spyOn(store, 'dispatch');

      facade.search(query);

      expect(store.dispatch).toHaveBeenCalledWith(
        new SearchNoveltyTypes(query)
      );
    });

    it('get(...) should call GetNoveltyType action', () => {
      const noveltyTypeId = 'AAA';
      spyOn(store, 'dispatch');

      facade.get(noveltyTypeId);

      expect(store.dispatch).toHaveBeenCalledWith(
        new GetNoveltyType(noveltyTypeId)
      );
    });

    it('create(...) should call CreateNoveltyType action', () => {
      const data = createNoveltyType();
      delete data.id;
      spyOn(store, 'dispatch');

      facade.create(data);

      expect(store.dispatch).toHaveBeenCalledWith(new CreateNoveltyType(data));
    });

    it('update(...) should call UpdateNoveltyType action', () => {
      const data = createNoveltyType();
      const noveltyTypeId = data.id;
      delete data.id;
      spyOn(store, 'dispatch');

      facade.update(noveltyTypeId, data);

      expect(store.dispatch).toHaveBeenCalledWith(
        new UpdateNoveltyType({ id: noveltyTypeId, data })
      );
    });

    it('trash(...) should call DeleteNoveltyType action', () => {
      const noveltyTypeId = 'AAA';
      spyOn(store, 'dispatch');

      facade.trash(noveltyTypeId);

      expect(store.dispatch).toHaveBeenCalledWith(
        new TrashNoveltyType(noveltyTypeId)
      );
    });
  });
});
