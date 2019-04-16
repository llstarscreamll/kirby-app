import { WorkShiftInterface } from "@llstarscreamll/work-shifts/util";
import { UserInterface } from "@llstarscreamll/users/util";

export interface TimeClockLogInterface {
  id?: string;
  employee_id: string;
  employee: UserInterface;
  work_shift_id?: string;
  work_shift?: WorkShiftInterface;
  checked_in_at: string;
  checked_out_at?: string;
  checked_in_by_id: string;
  checkedInBy: UserInterface;
  checked_out_by_id?: string;
  checkedOutBy?: UserInterface;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
