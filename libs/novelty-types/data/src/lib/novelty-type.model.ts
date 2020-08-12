import { round } from 'lodash';

import { DayType } from './day-type.enum';
import { NoveltyModel } from '@kirby/novelties/data';
import { NoveltyTypeOperator } from './novelty-type-operator.enum';
import { INoveltyType, TimeSlot } from './novelty-type.interface';

export class NoveltyType implements INoveltyType {
  id?: string;
  code: string;
  name: string;
  context_type?: string;
  apply_on_days_of_type?: DayType;
  apply_on_time_slots?: TimeSlot[];
  operator: NoveltyTypeOperator;
  requires_comment: boolean;
  keep_in_report: boolean;
  novelties?: NoveltyModel[];
  created_at: string;
  updated_at: string;
  delete_at?: string;

  static fromJson(data: any): NoveltyType {
    return Object.assign(new NoveltyType(), {
      ...data,
      novelties: NoveltyModel.fromJsonList(data.novelties || []),
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
    });
  }

  static fromJsonList(arr: any[]): NoveltyType[] {
    return arr.map((data) => NoveltyType.fromJson(data));
  }

  get operatorSign(): number {
    return this.operator === NoveltyTypeOperator.Subtraction ? -1 : 1;
  }

  get total_novelties_time_in_hours(): number {
    return round((this.novelties || [])
      .map((novelty) => novelty.total_time_in_hours * this.operatorSign)
      .reduce((acc, next) => acc + next, 0), 2);
  }
}
