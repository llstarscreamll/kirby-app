import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NOVELTIES_FEATURE_KEY, NoveltiesState } from './novelties.reducer';

// Lookup the 'Novelties' feature state managed by NgRx
const getNoveltiesState = createFeatureSelector<NoveltiesState>(NOVELTIES_FEATURE_KEY);
const getLoaded = createSelector(getNoveltiesState, (state: NoveltiesState) => state.loaded);
const getError = createSelector(getNoveltiesState, (state: NoveltiesState) => state.error);
const getPaginatedList = createSelector(getNoveltiesState, (state: NoveltiesState) => state.paginatedList);
const getPaginatedNoveltyTypesList = createSelector(getNoveltiesState, (state: NoveltiesState) => state.paginatedNoveltyTypesList);
const getSelectedNovelty = createSelector(getNoveltiesState, (state: NoveltiesState) => state.selected);

export const noveltiesQuery = {
  getPaginatedList,
  getSelectedNovelty,
  getPaginatedNoveltyTypesList,
  getLoaded,
  getError,
};
