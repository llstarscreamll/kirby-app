import { createNovelty } from '@kirby/novelties/testing';
import { createEmployee } from '@kirby/employees/testing';
import { NoveltyTypeOperator } from '@kirby/novelty-types/data';
import { createNoveltyType } from '@kirby/novelty-types/testing';

describe('EmployeeModel', () => {
  describe('additionalNoveltyTypesHours', () => {
    const additionNoveltyType = createNoveltyType('4', {
      operator: NoveltyTypeOperator.Addition,
    });

    const firstNovelty = createNovelty('N1', {
      novelty_type_id: additionNoveltyType.id,
      start_at: '1999-01-02 12:00:00',
      end_at: '1999-01-02 13:00:00',
    });

    const secondNovelty = createNovelty('N2', {
      novelty_type_id: additionNoveltyType.id,
      start_at: '1999-01-02 16:00:00',
      end_at: '1999-01-02 20:00:00',
    });

    it('should return novelty type hours number when there are novelty type records', () => {
      additionNoveltyType.novelties = [firstNovelty, secondNovelty];

      const employee = createEmployee('AAA', {
        novelty_types: [additionNoveltyType],
      });

      const result = employee.totalHoursByNoveltyTypeId(additionNoveltyType.id);
      expect(result).toBe(5);
    });

    it('should return 0 when novelty types is null or undefined', () => {
      let employee = createEmployee('AAA');
      employee.novelty_types = null;
      let result = employee.totalHoursByNoveltyTypeId(additionNoveltyType.id);
      expect(result).toBe(0);

      employee.novelty_types = undefined;
      result = employee.totalHoursByNoveltyTypeId(additionNoveltyType.id);
      expect(result).toBe(0);
    });
  });
});
