import { UserInterface } from '@llstarscreamll/users/util/src';

export interface EmployeeInterface {
    id?: string;
    cost_center_id?: string;
    code: string;
    identification_number: string;
    position: string;
    location: string;
    address: string;
    phone: string;
    salary: string;
    user: UserInterface;
    created_at: string;
    updated_at: string;
}