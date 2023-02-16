import { Observable, of } from 'rxjs';
import { hot } from 'jasmine-marbles';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PrinterService } from '../printer.service';
import { ProductionEffects } from './production.effects';
import * as ProductionActions from './production.actions';
import { ProductionService } from '../production.service';

describe('ProductionEffects', () => {
  let actions: Observable<any>;
  let effects: ProductionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductionEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: ProductionService, useValue: { searchProductionLogs: (_) => of({ data: [], meta: {} }) } },
        { provide: MatSnackBar, useValue: { open: (_) => true } },
        { provide: PrinterService, useValue: {} },
        { provide: Router, useValue: {} },
      ],
    });

    effects = TestBed.inject(ProductionEffects);
  });

  describe('loadProduction$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProductionActions.searchLogs({ query: { search: 'foo' } }) });

      const expected = hot('-a-|', { a: ProductionActions.searchLogsOk({ data: [], meta: {} }) });

      expect(effects.searchProductionLogs$).toBeObservable(expected);
    });
  });
});
