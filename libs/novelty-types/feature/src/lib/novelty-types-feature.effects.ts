import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { ActivatedRouteSnapshot } from '@angular/router';

import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';
import { EditNoveltyTypePageComponent } from './edit-novelty-type-page/edit-novelty-type-page.component';

@Injectable()
export class NoveltyTypesFeatureEffects {
  @Effect() editNoveltyTypePage$ = this.dataPersistence.navigation(
    EditNoveltyTypePageComponent,
    {
      run: (routerSnapShot: ActivatedRouteSnapshot, _) =>
        this.noveltyTypesFacade.get(routerSnapShot.params['id']),
      onError: () => {},
    }
  );

  constructor(
    private dataPersistence: DataPersistence<any>,
    private noveltyTypesFacade: NoveltyTypesFacade
  ) {}
}
