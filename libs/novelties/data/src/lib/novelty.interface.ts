export interface NoveltyInterface {
  id: number;
  time_clock_log_id: string;
  employee_id: string;
  novelty_type_id: string;
  total_time_in_minutes: number;
  novelty_type: any;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
