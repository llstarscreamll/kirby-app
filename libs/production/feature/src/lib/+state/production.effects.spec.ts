import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ProductionEffects } from './production.effects';
import * as ProductionActions from './production.actions';

describe('ProductionEffects', () => {
  let actions: Observable<any>;
  let effects: ProductionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [ProductionEffects, DataPersistence, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.get(ProductionEffects);
  });

  describe('loadProduction$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProductionActions.loadProduction() });

      const expected = hot('-a-|', { a: ProductionActions.loadProductionSuccess({ production: [] }) });

      expect(effects.loadProduction$).toBeObservable(expected);
    });
  });
});
