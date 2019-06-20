import * as faker from "faker";

import { createUser } from "@llstarscreamll/users/util";
import { EmployeeInterface } from './employee.interface';

export function createEmployee(id?: string, name: string = null): EmployeeInterface {
  let user = createUser(id);

  return {
    id: user.id,
    cost_center_id: faker.random.uuid(),
    code: 'E-' + user.id,
    identification_number: faker.random.number,
    position: faker.name.jobTitle,
    location: faker.address.city,
    address: faker.address.streetName + ' ' + faker.address.streetAddress,
    phone: faker.phone.phoneNumber,
    salary: faker.random.number,
    user: user,
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  };
}