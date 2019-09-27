import * as faker from 'faker';

import { createUser } from '@kirby/users/util';

export function createEmployee(id?: string, name: string = null) {
  const user = createUser(id);

  return {
    id: user.id,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
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
    updated_at: faker.date.past()
  };
}
