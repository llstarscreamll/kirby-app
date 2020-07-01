import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Pagination } from '@kirby/shared';
import { NoveltyModel, NoveltyReport } from '@kirby/novelties/data';
import { NOVELTIES_FEATURE_KEY, NoveltiesState } from './novelties.reducer';

// Lookup the 'Novelties' feature state managed by NgRx
const getNoveltiesState = createFeatureSelector<NoveltiesState>(
  NOVELTIES_FEATURE_KEY
);
const getLoaded = createSelector(
  getNoveltiesState,
  (state: NoveltiesState) => state.loaded
);
const getCreateNoveltiesToEmployeesStatus = createSelector(
  getNoveltiesState,
  (state: NoveltiesState) => state.createNoveltiesToEmployeesStatus
);
const getError = createSelector(
  getNoveltiesState,
  (state: NoveltiesState) => state.error
);
const getPaginatedList = createSelector(
  getNoveltiesState,
  (state: NoveltiesState) => mapPaginatedDataToModel(state.paginatedList)
);
const getPaginatedNoveltyTypesList = createSelector(
  getNoveltiesState,
  (state: NoveltiesState) => state.paginatedNoveltyTypesList
);
const getSelectedNovelty = createSelector(
  getNoveltiesState,
  (state: NoveltiesState) => state.selected
);
const getReportByEmployee = createSelector(
  getNoveltiesState,
  (state: NoveltiesState) => state.paginatedList ? new NoveltyReport(state.paginatedList) : null
);

function mapPaginatedDataToModel(
  paginatedData: Pagination<any>
): Pagination<NoveltyModel> {
  return {
    ...paginatedData,
    data: NoveltyModel.fromJsonList(paginatedData?.data || [])
  };
}

export const noveltiesQuery = {
  getLoaded,
  getError,
  getPaginatedList,
  getSelectedNovelty,
  getReportByEmployee,
  getPaginatedNoveltyTypesList,
  getCreateNoveltiesToEmployeesStatus,
};
