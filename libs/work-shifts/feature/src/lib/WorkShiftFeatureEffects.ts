import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { EditWorkShiftPage } from './edit-work-shift-page/edit-work-shift.page';

@Injectable()
export class WorkShiftFeatureEffects {
  editWorkShiftPage$ = createEffect(() =>
    this.dataPersistence.navigation(EditWorkShiftPage, {
      run: (routeSnapshot) =>
        this.workShiftsFacade.get(routeSnapshot.params['id']),
    })
  );

  constructor(
    private workShiftsFacade: WorkShiftsFacade,
    private dataPersistence: DataPersistence<any>
  ) {}
}
