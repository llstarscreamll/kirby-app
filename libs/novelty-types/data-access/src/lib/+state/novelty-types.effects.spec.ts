import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  GetNoveltyType,
  GetNoveltyTypeOk,
  UpdateNoveltyType,
  CreateNoveltyType,
  SearchNoveltyTypes,
  GetNoveltyTypeError,
  UpdateNoveltyTypeOk,
  CreateNoveltyTypeOk,
  SearchNoveltyTypesOk,
  CreateNoveltyTypeError,
  UpdateNoveltyTypeError,
  SearchNoveltyTypesError,
  TrashNoveltyTypeOk,
  TrashNoveltyType,
  TrashNoveltyTypeError,
} from './novelty-types.actions';
import { emptyPagination } from '@kirby/shared';
import { NoveltyTypeService } from '../novelty-type.service';
import { NoveltyTypesEffects } from './novelty-types.effects';
import { createNoveltyType } from '@kirby/novelty-types/testing';
import { Router } from '@angular/router';
import { hot, cold } from 'jasmine-marbles';

describe('NoveltyTypesEffects', () => {
  let router: Router;
  let snackBar: MatSnackBar;
  let actions: Observable<any>;
  let effects: NoveltyTypesEffects;
  let noveltyTypeService: NoveltyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        DataPersistence,
        NoveltyTypesEffects,
        provideMockActions(() => actions),
        {
          provide: NoveltyTypeService,
          useValue: {
            search: (q) => true,
            get: (i) => true,
            create: (d) => true,
            update: (i, d) => true,
            trash: (i) => true,
          },
        },
        { provide: Router, useValue: { navigate: (u) => true } },
        { provide: MatSnackBar, useValue: { open: (o, t, th) => true } },
        { provide: 'environment', useValue: { env: 'https://fake.api/' } },
      ],
    });

    router = TestBed.get(Router);
    snackBar = TestBed.get(MatSnackBar);
    effects = TestBed.get(NoveltyTypesEffects);
    noveltyTypeService = TestBed.get(NoveltyTypeService);
  });

  describe('paginateNoveltyTypes$', () => {
    it('should return SearchNoveltyTypesOk on success service response', () => {
      const query = { search: 'foo' };
      const expectedResult = {
        ...emptyPagination(),
        data: [createNoveltyType('NT1')],
      };
      spyOn(noveltyTypeService, 'search').and.returnValue(cold('a|', { a: expectedResult }));

      actions = hot('-a-|', { a: new SearchNoveltyTypes(query) });

      expect(effects.searchNoveltyTypes$).toBeObservable(hot('-a-|', { a: new SearchNoveltyTypesOk(expectedResult) }));
      expect(noveltyTypeService.search).toHaveBeenCalledWith(query);
    });
    it('should return SearchNoveltyTypesError on error service response', () => {
      const query = { search: 'foo' };
      const expectedError = { message: 'Crap!!', ok: false };
      spyOn(noveltyTypeService, 'search').and.returnValue(cold('#', null, expectedError));

      actions = hot('-a-|', { a: new SearchNoveltyTypes(query) });

      expect(effects.searchNoveltyTypes$).toBeObservable(
        hot('-a-|', { a: new SearchNoveltyTypesError(expectedError) })
      );
    });
  });

  describe('getNoveltyType$', () => {
    it('should return GetNoveltyTypeOk on success service response', () => {
      const noveltyType = createNoveltyType();
      const noveltyTypeId = noveltyType.id;
      const expectedResult = { data: noveltyType };

      spyOn(noveltyTypeService, 'get').and.returnValue(cold('a|', { a: expectedResult }));

      actions = hot('-a-|', {
        a: new GetNoveltyType(noveltyTypeId),
      });

      expect(effects.getNoveltyType$).toBeObservable(hot('-a-|', { a: new GetNoveltyTypeOk(expectedResult.data) }));
      expect(noveltyTypeService.get).toHaveBeenCalledWith(noveltyTypeId);
    });

    it('should return GetNoveltyTypeError on error service response', () => {
      const noveltyTypeId = createNoveltyType().id;
      const expectedError = { message: 'Crap!!', ok: false };

      spyOn(noveltyTypeService, 'get').and.returnValue(cold('#', null, expectedError));

      actions = hot('-a-|', {
        a: new GetNoveltyType(noveltyTypeId),
      });

      expect(effects.getNoveltyType$).toBeObservable(hot('-a-|', { a: new GetNoveltyTypeError(expectedError) }));
    });
  });

  describe('createNoveltyType$', () => {
    it('should return CreateNoveltyTypeOk on success service response', () => {
      const data = createNoveltyType();
      const expectedResult = { data: { ...data } };
      delete data.id;

      spyOn(noveltyTypeService, 'create').and.returnValue(cold('a|', { a: expectedResult }));
      spyOn(snackBar, 'open');
      spyOn(router, 'navigate');

      actions = hot('-a-|', { a: new CreateNoveltyType(data) });

      expect(effects.createNoveltyType$).toBeObservable(
        hot('-a-|', { a: new CreateNoveltyTypeOk(expectedResult.data) })
      );
      expect(noveltyTypeService.create).toHaveBeenCalledWith(data);
      expect(snackBar.open).toHaveBeenCalledWith('Tipo de novedad creada!', 'Ok', { duration: 5 * 1000 });
      expect(router.navigate).toHaveBeenCalledWith(['novelties/novelty-types']);
    });

    it('should return CreateNoveltyTypeError on error service response', () => {
      const data = createNoveltyType();
      delete data.id;
      const expectedError = { message: 'Crap!!', ok: false };

      spyOn(noveltyTypeService, 'create').and.returnValue(cold('#', null, expectedError));

      actions = hot('-a-|', { a: new CreateNoveltyType(data) });

      expect(effects.createNoveltyType$).toBeObservable(hot('-a-|', { a: new CreateNoveltyTypeError(expectedError) }));
    });
  });

  describe('updateNoveltyType$', () => {
    it('should return UpdateNoveltyTypeOk on success service response', () => {
      const noveltyType = createNoveltyType();
      const noveltyTYpeId = noveltyType.id;
      const expectedResult = { data: { ...noveltyType } };
      delete noveltyType.id;

      spyOn(noveltyTypeService, 'update').and.returnValue(cold('a|', { a: expectedResult }));

      spyOn(snackBar, 'open');
      spyOn(router, 'navigate');

      actions = hot('-a-|', {
        a: new UpdateNoveltyType({ id: noveltyTYpeId, data: noveltyType }),
      });

      expect(effects.updateNoveltyType$).toBeObservable(
        hot('-a-|', { a: new UpdateNoveltyTypeOk(expectedResult.data) })
      );
      expect(noveltyTypeService.update).toHaveBeenCalledWith(noveltyTYpeId, noveltyType);
      expect(snackBar.open).toHaveBeenCalledWith('Tipo de novedad actualizada!', 'Ok', { duration: 5 * 1000 });
      expect(router.navigate).toHaveBeenCalledWith(['novelties/novelty-types']);
    });

    it('should return UpdateNoveltyTypeError on error service response', () => {
      const data = createNoveltyType();
      const noveltyTypeId = data.id;
      delete data.id;
      const expectedError = { message: 'Crap!!', ok: false };

      spyOn(noveltyTypeService, 'update').and.returnValue(cold('#', null, expectedError));

      actions = hot('-a-|', {
        a: new UpdateNoveltyType({ id: noveltyTypeId, data }),
      });

      expect(effects.updateNoveltyType$).toBeObservable(hot('-a-|', { a: new UpdateNoveltyTypeError(expectedError) }));
    });
  });

  describe('trashNoveltyType$', () => {
    it('should return TrashNoveltyTypeOk on success service response', () => {
      const noveltyTypeId = 'AAA';
      const expectedResult = { data: 'ok' };

      spyOn(noveltyTypeService, 'trash').and.returnValue(cold('a|', { a: expectedResult }));
      spyOn(snackBar, 'open');

      actions = hot('-a-|', {
        a: new TrashNoveltyType(noveltyTypeId),
      });

      expect(effects.trashNoveltyType$).toBeObservable(hot('-a-|', { a: new TrashNoveltyTypeOk(noveltyTypeId) }));
      expect(noveltyTypeService.trash).toHaveBeenCalledWith(noveltyTypeId);
      expect(snackBar.open).toHaveBeenCalledWith('Tipo de novedad movida a la papelera!', 'Ok', {
        duration: 5 * 1000,
      });
    });

    it('should return GetNoveltyTypeError on error service response', () => {
      const noveltyTypeId = 'AAA';
      const expectedError = { message: 'Crap!!', ok: false };

      spyOn(noveltyTypeService, 'trash').and.returnValue(cold('#', null, expectedError));

      actions = hot('-a-|', {
        a: new TrashNoveltyType(noveltyTypeId),
      });

      expect(effects.trashNoveltyType$).toBeObservable(hot('-a-|', { a: new TrashNoveltyTypeError(expectedError) }));
    });
  });
});
