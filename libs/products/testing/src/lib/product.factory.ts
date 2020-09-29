import * as faker from 'faker';

import { ICategory, IProduct } from '@kirby/products/data';

export function createProduct(override = {}): IProduct {
  const name: string = faker.random.words(3);
  const date = faker.date.past();

  return {
    id: faker.random.uuid(),
    name: name,
    code: faker.random.word(),
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    sm_image_url: faker.image.image(),
    md_image_url: faker.image.image(),
    lg_image_url: faker.image.image(),
    cost: 8,
    price: 10,
    unity: 'UND',
    quantity: 1,
    pum_unity: 'UND',
    pum_price: 10,
    active: true,
    categories: [],
    created_at: date,
    updated_at: date,
    ...override,
  };
}
