import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { ActivatedRouteSnapshot } from '@angular/router';

import {
  NoveltiesFacade,
  NoveltiesPartialState
} from '@kirby/novelties/data-access';
import { EditNoveltyPageComponent } from '../edit-novelty/edit-novelty-page.component';

@Injectable()
export class NoveltiesFeatureEffects {
  @Effect() getNovelty$ = this.dataPersistence.navigation(
    EditNoveltyPageComponent,
    {
      run: (routerSnapShot: ActivatedRouteSnapshot) =>
        this.noveltiesFacade.get(routerSnapShot.params['id']),
      onError: () => {}
    }
  );

  constructor(
    private noveltiesFacade: NoveltiesFacade,
    private dataPersistence: DataPersistence<NoveltiesPartialState>
  ) {}
}
