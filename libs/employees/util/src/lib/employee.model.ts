import { User } from '@kirby/users/util';
import { CostCenter } from '@kirby/cost-centers/data';
import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';

export interface IdentificationsInterface {
  employee_id: string;
  name: string;
  code: string;
}

export class EmployeeInterface {
  id?: string;
  cost_center_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  code: string;
  identification_number: string;
  position: string;
  location: string;
  address: string;
  phone: string;
  salary: string;
  user?: User;
  costCenter?: CostCenter;
  workShifts?: WorkShiftInterface[];
  identifications?: IdentificationsInterface[];
  novelty_types?: NoveltyTypeInterface[];
  created_at: string;
  updated_at: string;

  static fromJson(data: any): EmployeeInterface {
    return Object.assign(new EmployeeInterface(), {
      ...data,
      novelty_types: NoveltyTypeInterface.fromJsonList(
        data.novelty_types || []
      ),
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
    });
  }

  static fromJsonList(arr: any[]): EmployeeInterface[] {
    return arr.map((data) => EmployeeInterface.fromJson(data));
  }

  totalHoursByNoveltyTypeId(noveltyTypeId): number {
    return (this.novelty_types || [])
      .filter((noveltyType) => noveltyType.id === noveltyTypeId)
      .map((noveltyType) => noveltyType.total_novelties_time_in_hours)
      .reduce((acc, next) => acc + next, 0);
  }

  noveltyTypesTotalHours(): number {
    return (this.novelty_types || [])
      .map((noveltyType) => noveltyType.total_novelties_time_in_hours)
      .reduce((acc, next) => acc + next, 0);
  }
}
