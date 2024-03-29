import { LoadStatus } from '@kirby/shared';
import { createAction, props } from '@ngrx/store';
import { IProductionLog } from './production.models';

interface GenericEntity {
  id: string;
  name: string;
}

export const setCreateStatus = createAction('[Production] set creation status', props<{ status: LoadStatus }>());
export const createLog = createAction('[Production] create log', props<{ data: any }>());
export const createAndPrintLog = createAction('[Production] create and print log', props<{ data: any }>());
export const createLogOk = createAction('[Production] create log ok', props<{ productionLog: IProductionLog }>());
export const createLogError = createAction('[Production] create log error', props<{ error: any }>());

export const updateLog = createAction('[Production] update log', props<{ id: string; data: any }>());
export const updateAndPrintLog = createAction('[Production] update and print log', props<{ id: string; data: any }>());
export const updateLogOk = createAction('[Production] update log ok', props<{ productionLog: IProductionLog }>());
export const updateLogError = createAction('[Production] update log error', props<{ error: any }>());
export const setUpdateStatus = createAction('[Production] set update status', props<{ status: LoadStatus }>());

export const printProductionLogTicket = createAction(
  '[Production] print',
  props<{ productionLog: IProductionLog; ops?: any }>()
);

export const searchLogs = createAction('[Production] search logs', props<{ query: any }>());
export const searchLogsOk = createAction('[Production] search logs ok', props<{ data: IProductionLog[]; meta: any }>());
export const searchLogsError = createAction('[Production] search logs error', props<{ error: any }>());

export const exportLogs = createAction('[Production] export logs', props<{ query: any }>());
export const exportLogsOk = createAction('[Production] export logs ok', props<{ data: string }>());
export const exportLogsError = createAction('[Production] export logs error', props<{ error: any }>());

export const getLog = createAction('[Production] get log', props<{ id: string }>());
export const getLogOk = createAction('[Production] get log ok', props<{ data: IProductionLog }>());
export const getLogError = createAction('[Production] get log error', props<{ error: any }>());

export const searchProducts = createAction('[Production] search products', props<{ query: any }>());
export const searchProductsOk = createAction(
  '[Production] search products ok',
  props<{ data: GenericEntity[]; meta: any }>()
);
export const searchProductsError = createAction('[Production] search products error', props<{ error: any }>());

export const searchMachines = createAction('[Production] search machines', props<{ query: any }>());
export const searchMachinesOk = createAction(
  '[Production] search machines ok',
  props<{ data: GenericEntity[]; meta: any }>()
);
export const searchMachinesError = createAction('[Production] search machines error', props<{ error: any }>());

export const searchCustomers = createAction('[Production] search customers', props<{ query: any }>());
export const searchCustomersOk = createAction(
  '[Production] search customers ok',
  props<{ data: GenericEntity[]; meta: any }>()
);
export const searchCustomersError = createAction('[Production] search customers error', props<{ error: any }>());

export const searchCostCenters = createAction('[Production] search cost centers', props<{ query: any }>());
export const searchCostCentersOk = createAction(
  '[Production] search cost centers ok',
  props<{ data: GenericEntity[]; meta: any }>()
);
export const searchCostCentersError = createAction('[Production] search cost centers error', props<{ error: any }>());

export const getProductionReport = createAction('[Production] get report', props<{ query: any }>());
export const getProductionReportOk = createAction('[Production] get report ok', props<{ data: any[] }>());
export const getProductionReportError = createAction('[Production] get report error', props<{ error: any }>());
