export interface ITimeSlot {
  start: string;
  end: string;
}

export enum WeekDay {
  'monday' = 1,
  'tuesday' = 2,
  'wednesday' = 3,
  'thursday' = 4,
  'friday' = 5,
  'saturday' = 6,
  'sunday' = 7,
}

export interface WorkShiftInterface {
  id?: string;
  name: string;
  grace_minutes_before_start_times: number;
  grace_minutes_after_start_times: number;
  grace_minutes_before_end_times: number;
  grace_minutes_after_end_times: number;
  meal_time_in_minutes: number;
  min_minutes_required_to_discount_meal_time: number;
  applies_on_days: WeekDay[];
  time_zone: string;
  time_slots: ITimeSlot[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
