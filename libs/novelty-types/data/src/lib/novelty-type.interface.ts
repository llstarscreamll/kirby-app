import { DayType } from './day-type.enum';
import { NoveltyTypeOperator } from './novelty-type-operator.enum';

export interface TimeSlot {
  start: string;
  end: string;
}

export interface NoveltyTypeInterface {
  id?: string;
  code: string;
  name: string;
  context_type?: string;
  apply_on_days_of_type?: DayType;
  apply_on_time_slots?: TimeSlot[];
  operator: NoveltyTypeOperator;
  requires_comment: boolean;
  created_at: string;
  updated_at: string;
  delete_at?: string;
}
