import { Injectable } from '@angular/core';
import { navigation } from '@nrwl/angular';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions, createEffect } from '@ngrx/effects';

import { NoveltiesFacade, NoveltiesPartialState } from '@kirby/novelties/data-access';

import { EditNoveltyPageComponent } from '../edit-novelty/edit-novelty-page.component';

@Injectable()
export class NoveltiesFeatureEffects {
  editNoveltyPage$ = createEffect(() =>
    this.actions$.pipe(
      navigation(EditNoveltyPageComponent, {
        run: (routerSnapShot: ActivatedRouteSnapshot) => this.noveltiesFacade.get(routerSnapShot.params['id']),
        onError: () => {},
      })
    )
  );

  constructor(private actions$: Actions, private noveltiesFacade: NoveltiesFacade) {}
}
