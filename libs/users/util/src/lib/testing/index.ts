import * as faker from 'faker';
import { User } from '../user';

export const USER_MOCK = {
  id: '1',
  first_name: 'Tony',
  last_name: 'Stark',
  email: 'tony@stark.com',
  email_verified_at: '1999-01-01 02:00:00',
  created_at: '1999-01-01 01:00:00',
  updated_at: '1999-01-01 01:00:00',
  deleted_at: null
};

export function createUser(
  id?: string,
  firstName: string = null,
  lastName: string = null
): User {
  const date = faker.date.past();
  return User.fromJson({
    id: id || faker.random.uuid(),
    first_name: firstName || faker.random.word(),
    last_name: lastName || faker.random.word(),
    email: faker.email,
    email_verified_at: date,
    created_at: date,
    updated_at: date
  });
}
