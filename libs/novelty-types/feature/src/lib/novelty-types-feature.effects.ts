import { Injectable } from '@angular/core';
import { navigation } from '@nrwl/angular';
import { Actions, createEffect } from '@ngrx/effects';
import { ActivatedRouteSnapshot } from '@angular/router';

import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';

import { EditNoveltyTypePageComponent } from './edit-novelty-type-page/edit-novelty-type-page.component';

@Injectable()
export class NoveltyTypesFeatureEffects {
  editNoveltyTypePage$ = createEffect(() =>
    this.actions$.pipe(
      navigation(EditNoveltyTypePageComponent, {
        run: (routerSnapShot: ActivatedRouteSnapshot, _) => this.noveltyTypesFacade.get(routerSnapShot.params['id']),
        onError: () => {},
      })
    )
  );

  constructor(private actions$: Actions, private noveltyTypesFacade: NoveltyTypesFacade) {}
}
