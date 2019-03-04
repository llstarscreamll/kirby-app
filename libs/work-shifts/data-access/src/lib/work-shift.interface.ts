export interface WorkShiftInterface {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    grace_minutes_for_start_time: number;
    grace_minutes_for_end_time: number;
    meal_time_in_minutes: number;
    min_minutes_required_to_discount_meal_time: number;
    created_at: string;
    updated_at: string;
}