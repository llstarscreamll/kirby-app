import { createAction, props } from '@ngrx/store';
import { ProductionLog } from './production.models';

export const loadProduction = createAction('[Production] Load Production');

export const loadProductionSuccess = createAction(
  '[Production] Load Production Success',
  props<{ production: ProductionLog[] }>()
);

export const loadProductionFailure = createAction('[Production] Load Production Failure', props<{ error: any }>());
