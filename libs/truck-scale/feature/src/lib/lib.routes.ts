import { Route } from '@angular/router';
import { WeighingsListPage } from './pages/weighings-list/weighings-list.page';
import { CreateWeighingPage } from './pages/create-weighing/create-weighing.page';
import { EditWeighingPage } from './pages/edit-weighing/edit-weighing.page';

export const truckScaleRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: WeighingsListPage },
  { path: 'create', component: CreateWeighingPage },
  { path: ':id/edit', component: EditWeighingPage },
];
