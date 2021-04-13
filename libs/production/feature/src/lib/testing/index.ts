import * as faker from 'faker';

import { createEmployee } from '@kirby/employees/testing';
import { ProductionLog } from '../+state/production.models';

export function createProductionLog(id?: string, data: any = {}): ProductionLog {
  const employee = createEmployee();
  const product = { id: faker.random.uuid(), name: faker.random.word(), internal_code: faker.word };
  const machine = { id: faker.random.uuid(), name: faker.random.word(), code: faker.word };
  const customer = { id: faker.random.uuid(), name: faker.random.word() };

  return ProductionLog.fromJson({
    id: id || faker.random.uuid(),
    employee_id: employee.id,
    product_id: product.id,
    machine_id: machine.id,
    customer_id: customer.id,
    batch: faker.random.number(),
    tare_weight: faker.random.number(1, 10),
    gross_weight: faker.random.number(11, 100),
    employee,
    product,
    machine,
    customer,
    ...data,
  });
}
