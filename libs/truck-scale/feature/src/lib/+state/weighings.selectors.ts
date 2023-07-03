import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Setting, Weighing } from './models';
import { WEIGHINGS_FEATURE_KEY, WeighingsState } from './weighings.reducer';

const selectWeighingsState = createFeatureSelector<WeighingsState>(WEIGHINGS_FEATURE_KEY);
export const selectWeighingMachineLectureFlag = createSelector(
  selectWeighingsState,
  (state: WeighingsState) => state.settings.filter((s) => s.key === Setting.WeighingMachineLectureFlag)['0']?.value
);
export const selectVehicles = createSelector(selectWeighingsState, (state: WeighingsState) => state.vehicles || []);
export const selectClients = createSelector(selectWeighingsState, (state: WeighingsState) => state.clients || []);
export const selectDrivers = createSelector(selectWeighingsState, (state: WeighingsState) => state.drivers || []);
export const selectCommodities = createSelector(
  selectWeighingsState,
  (state: WeighingsState) => state.commodities || []
);
export const selectWeighings = createSelector(selectWeighingsState, (state: WeighingsState) =>
  state.paginatedWeighings.data.map(
    (w) =>
      new Weighing(
        w.id,
        w.weighing_type,
        w.vehicle_plate,
        w.vehicle_type,
        w.driver_dni_number,
        w.driver_name,
        w.client,
        w.commodity,
        w.destination,
        w.tare_weight,
        w.gross_weight,
        w.weighing_description,
        w.status,
        w.created_by_id,
        w.created_by,
        w.updated_by_id,
        w.updated_by,
        w.created_at,
        w.updated_at
      )
  )
);
export const selectWeighingsPaginationMeta = createSelector(
  selectWeighingsState,
  (state: WeighingsState) => state.paginatedWeighings.meta
);
export const selectSelectedWeighing = createSelector(selectWeighingsState, (state: WeighingsState) =>
  state.selectedWeighing
    ? new Weighing(
        state.selectedWeighing.id,
        state.selectedWeighing.weighing_type,
        state.selectedWeighing.vehicle_plate,
        state.selectedWeighing.vehicle_type,
        state.selectedWeighing.driver_dni_number,
        state.selectedWeighing.driver_name,
        state.selectedWeighing.client,
        state.selectedWeighing.commodity,
        state.selectedWeighing.destination,
        state.selectedWeighing.tare_weight,
        state.selectedWeighing.gross_weight,
        state.selectedWeighing.weighing_description,
        state.selectedWeighing.status,
        state.selectedWeighing.created_by_id,
        state.selectedWeighing.created_by,
        state.selectedWeighing.updated_by_id,
        state.selectedWeighing.updated_by,
        state.selectedWeighing.created_at,
        state.selectedWeighing.updated_at
      )
    : null
);
export const selectError = createSelector(selectWeighingsState, (state: WeighingsState) => state.error);
