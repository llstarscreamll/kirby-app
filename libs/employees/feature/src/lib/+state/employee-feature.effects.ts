import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { ActivatedRouteSnapshot } from '@angular/router';

import { EmployeesFacade } from '@kirby/employees/data-access';
import { EditEmployeePageComponent } from '../edit-employee-page/edit-employee-page.component';

@Injectable()
export class EmployeeFeatureEffects {
  @Effect()
  getEmployee$: Observable<Action> = this.dataPersistence.navigation(
    EditEmployeePageComponent,
    {
      run: (routerSnapShot: ActivatedRouteSnapshot) =>
        this.employeesFacade.get(routerSnapShot.params['id']),
      onError: () => {}
    }
  );

  constructor(
    private employeesFacade: EmployeesFacade,
    private dataPersistence: DataPersistence<any>
  ) {}
}
