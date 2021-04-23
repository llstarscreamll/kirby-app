import { Observable, of } from 'rxjs';
import { hot } from '@nrwl/angular/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';

import { ProductionEffects } from './production.effects';
import * as ProductionActions from './production.actions';
import { ProductionService } from '../production.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ProductionEffects', () => {
  let actions: Observable<any>;
  let effects: ProductionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProductionEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: ProductionService, useValue: { searchProductionLogs: (_) => of({ data: [], meta: {} }) } },
        { provide: MatSnackBar, useValue: { open: (_) => true } },
      ],
    });

    effects = TestBed.get(ProductionEffects);
  });

  describe('loadProduction$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProductionActions.searchLogs({ query: { search: 'foo' } }) });

      const expected = hot('-a-|', { a: ProductionActions.searchLogsOk({ data: [], meta: {} }) });

      expect(effects.searchProductionLogs$).toBeObservable(expected);
    });
  });
});
