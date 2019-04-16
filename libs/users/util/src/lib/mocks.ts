import * as faker from "faker";
import { UserInterface } from './user.interface';

export const USER_MOCK: UserInterface = {
  id: '1',
  name: 'Tony Stark',
  email: 'tony@stark.com',
  email_verified_at: '1999-01-01 02:00:00',
  created_at: '1999-01-01 01:00:00',
  updated_at: '1999-01-01 01:00:00',
  deleted_at: null
};

export function createUser(id?: string, name: string = null): UserInterface {
  const date = faker.date.past();
  return {
    id: id || faker.random.uuid(),
    name: name || faker.random.word(),
    email: faker.email,
    email_verified_at: date,
    created_at: date,
    updated_at: date,
  };
}