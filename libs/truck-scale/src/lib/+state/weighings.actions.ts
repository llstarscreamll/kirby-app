import { createAction, props } from '@ngrx/store';
import { WeighingsEntity } from './weighings.models';

export const initWeighings = createAction('[Weighings Page] Init');

export const loadWeighingsSuccess = createAction(
  '[Weighings/API] Load Weighings Success',
  props<{ weighings: WeighingsEntity[] }>()
);

export const loadWeighingsFailure = createAction('[Weighings/API] Load Weighings Failure', props<{ error: any }>());
