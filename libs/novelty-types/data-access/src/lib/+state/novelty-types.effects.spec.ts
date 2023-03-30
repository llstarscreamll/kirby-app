import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';

import { emptyPagination } from '@kirby/shared';
import { NoveltyTypeService } from '../novelty-type.service';
import { NoveltyTypesEffects } from './novelty-types.effects';
import { createNoveltyType } from '@kirby/novelty-types/testing';
import { noveltyTypesActions as a } from './novelty-types.actions';

describe('NoveltyTypesEffects', () => {
  let router: Router;
  let snackBar: MatSnackBar;
  let actions: Observable<any>;
  let effects: NoveltyTypesEffects;
  let noveltyTypeService: NoveltyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
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

    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    effects = TestBed.inject(NoveltyTypesEffects);
    noveltyTypeService = TestBed.inject(NoveltyTypeService);
  });

  describe('paginateNoveltyTypes$', () => {
    it('should return SearchNoveltyTypesOk on success service response', () => {
      const query = { search: 'foo' };
      const expectedResult = {
        ...emptyPagination(),
        data: [createNoveltyType('NT1')],
      };
      jest.spyOn(noveltyTypeService, 'search').mockReturnValue(cold('a|', { a: expectedResult }));

      actions = hot('-a-|', { a: a.search(query) });

      expect(effects.searchNoveltyTypes$).toBeObservable(hot('-a-|', { a: a.searchOk(expectedResult) }));
      expect(noveltyTypeService.search).toHaveBeenCalledWith(query);
    });
    it('should return SearchNoveltyTypesError on error service response', () => {
      const query = { search: 'foo' };
      const expectedError = { message: 'Crap!!', ok: false };
      jest.spyOn(noveltyTypeService, 'search').mockReturnValue(cold('#', null, expectedError));

      actions = hot('-a-|', { a: a.search(query) });

      expect(effects.searchNoveltyTypes$).toBeObservable(hot('-a-|', { a: a.searchError(expectedError) }));
    });
  });

  describe('getNoveltyType$', () => {
    it('should return GetNoveltyTypeOk on success service response', () => {
      const noveltyType = createNoveltyType();
      const noveltyTypeId = noveltyType.id;
      const expectedResult = { data: noveltyType };

      jest.spyOn(noveltyTypeService, 'get').mockReturnValue(cold('a|', { a: expectedResult }));

      actions = hot('-a-|', {
        a: a.get(noveltyTypeId),
      });

      expect(effects.getNoveltyType$).toBeObservable(hot('-a-|', { a: a.getOk(expectedResult.data) }));
      expect(noveltyTypeService.get).toHaveBeenCalledWith(noveltyTypeId);
    });

    it('should return GetNoveltyTypeError on error service response', () => {
      const noveltyTypeId = createNoveltyType().id;
      const expectedError = { message: 'Crap!!', ok: false };

      jest.spyOn(noveltyTypeService, 'get').mockReturnValue(cold('#', null, expectedError));

      actions = hot('-a-|', {
        a: a.get(noveltyTypeId),
      });

      expect(effects.getNoveltyType$).toBeObservable(hot('-a-|', { a: a.getError(expectedError) }));
    });
  });

  describe('createNoveltyType$', () => {
    it('should return CreateNoveltyTypeOk on success service response', () => {
      const data = createNoveltyType();
      const expectedResult = { data: { ...data } };
      delete data.id;

      jest.spyOn(noveltyTypeService, 'create').mockReturnValue(cold('a|', { a: expectedResult }));
      jest.spyOn(snackBar, 'open');
      jest.spyOn(router, 'navigate');

      actions = hot('-a-|', { a: a.create(data) });

      expect(effects.createNoveltyType$).toBeObservable(hot('-a-|', { a: a.createOk(expectedResult.data) }));
      expect(noveltyTypeService.create).toHaveBeenCalledWith(data);
      expect(snackBar.open).toHaveBeenCalledWith('Tipo de novedad creada!', 'Ok', { duration: 5 * 1000 });
      expect(router.navigate).toHaveBeenCalledWith(['novelties/novelty-types']);
    });

    it('should return CreateNoveltyTypeError on error service response', () => {
      const data = createNoveltyType();
      delete data.id;
      const expectedError = { message: 'Crap!!', ok: false };

      jest.spyOn(noveltyTypeService, 'create').mockReturnValue(cold('#', null, expectedError));

      actions = hot('-a-|', { a: a.create(data) });

      expect(effects.createNoveltyType$).toBeObservable(hot('-a-|', { a: a.createError(expectedError) }));
    });
  });

  describe('updateNoveltyType$', () => {
    it('should return UpdateNoveltyTypeOk on success service response', () => {
      const noveltyType = createNoveltyType();
      const noveltyTYpeId = noveltyType.id;
      const expectedResult = { data: { ...noveltyType } };
      delete noveltyType.id;

      jest.spyOn(noveltyTypeService, 'update').mockReturnValue(cold('a|', { a: expectedResult }));

      jest.spyOn(snackBar, 'open');
      jest.spyOn(router, 'navigate');

      actions = hot('-a-|', {
        a: a.update({ id: noveltyTYpeId, data: noveltyType }),
      });

      expect(effects.updateNoveltyType$).toBeObservable(hot('-a-|', { a: a.updateOk(expectedResult.data) }));
      expect(noveltyTypeService.update).toHaveBeenCalledWith(noveltyTYpeId, noveltyType);
      expect(snackBar.open).toHaveBeenCalledWith('Tipo de novedad actualizada!', 'Ok', { duration: 5 * 1000 });
      expect(router.navigate).toHaveBeenCalledWith(['novelties/novelty-types']);
    });

    it('should return UpdateNoveltyTypeError on error service response', () => {
      const data = createNoveltyType();
      const noveltyTypeId = data.id;
      delete data.id;
      const expectedError = { message: 'Crap!!', ok: false };

      jest.spyOn(noveltyTypeService, 'update').mockReturnValue(cold('#', null, expectedError));

      actions = hot('-a-|', {
        a: a.update({ id: noveltyTypeId, data }),
      });

      expect(effects.updateNoveltyType$).toBeObservable(hot('-a-|', { a: a.updateError(expectedError) }));
    });
  });

  describe('trashNoveltyType$', () => {
    it('should return TrashNoveltyTypeOk on success service response', () => {
      const noveltyTypeId = 'AAA';
      const expectedResult = { data: 'ok' };

      jest.spyOn(noveltyTypeService, 'trash').mockReturnValue(cold('a|', { a: expectedResult }));
      jest.spyOn(snackBar, 'open');

      actions = hot('-a-|', {
        a: a.trash(noveltyTypeId),
      });

      expect(effects.trashNoveltyType$).toBeObservable(hot('-a-|', { a: a.trashOk(noveltyTypeId) }));
      expect(noveltyTypeService.trash).toHaveBeenCalledWith(noveltyTypeId);
      expect(snackBar.open).toHaveBeenCalledWith('Tipo de novedad movida a la papelera!', 'Ok', {
        duration: 5 * 1000,
      });
    });

    it('should return GetNoveltyTypeError on error service response', () => {
      const noveltyTypeId = 'AAA';
      const expectedError = { message: 'Crap!!', ok: false };

      jest.spyOn(noveltyTypeService, 'trash').mockReturnValue(cold('#', null, expectedError));

      actions = hot('-a-|', {
        a: a.trash(noveltyTypeId),
      });

      expect(effects.trashNoveltyType$).toBeObservable(hot('-a-|', { a: a.trashError(expectedError) }));
    });
  });
});
