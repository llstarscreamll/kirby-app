import { Injectable } from '@angular/core';
import { navigation } from '@nrwl/angular';
import { Actions, createEffect } from '@ngrx/effects';
import { ActivatedRouteSnapshot } from '@angular/router';

import { EmployeesFacade } from '@kirby/employees/data-access';

import { EditEmployeePageComponent } from '../edit-employee-page/edit-employee-page.component';

@Injectable()
export class EmployeeFeatureEffects {
  getEmployee$ = createEffect(() =>
    this.actions$.pipe(
      navigation(EditEmployeePageComponent, {
        run: (routerSnapShot: ActivatedRouteSnapshot) => this.employeesFacade.get(routerSnapShot.params['id']),
        onError: () => {},
      })
    )
  );

  constructor(private actions$: Actions, private employeesFacade: EmployeesFacade) {}
}
