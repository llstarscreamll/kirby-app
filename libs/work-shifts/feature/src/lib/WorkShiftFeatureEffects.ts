import { Injectable } from '@angular/core';
import { navigation } from '@nrwl/angular';
import { Actions, createEffect } from '@ngrx/effects';

import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { EditWorkShiftPage } from './edit-work-shift-page/edit-work-shift.page';

@Injectable()
export class WorkShiftFeatureEffects {
  editWorkShiftPage$ = createEffect(() =>
    this.actions$.pipe(
      navigation(EditWorkShiftPage, {
        run: (routeSnapshot) => this.workShiftsFacade.get(routeSnapshot.params['id']),
      })
    )
  );

  constructor(private actions$: Actions, private workShiftsFacade: WorkShiftsFacade) {}
}
