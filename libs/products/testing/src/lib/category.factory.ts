import * as faker from 'faker';

import { ICategory } from '@kirby/products/data';

export function createCategory(override = {}): ICategory {
  const name: string = faker.random.words(3);
  const date = faker.date.past();

  return {
    id: faker.random.uuid(),
    name: name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    position: 1,
    active: true,
    created_at: date,
    updated_at: date,
    ...override,
  };
}
