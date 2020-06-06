import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CostCentersEffects } from './cost-centers.effects';
import { LoadCostCenters, CostCentersLoaded } from './cost-centers.actions';

describe('CostCentersEffects', () => {
  let actions: Observable<any>;
  let effects: CostCentersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        CostCentersEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(CostCentersEffects);
  });

  describe('loadCostCenters$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadCostCenters() });
      expect(effects.loadCostCenters$).toBeObservable(
        hot('-a-|', { a: new CostCentersLoaded([]) })
      );
    });
  });
});
