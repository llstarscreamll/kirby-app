import { NoveltyTypeOperator } from '..';
import { createNovelty } from '@kirby/novelties/testing';
import { createNoveltyType } from '@kirby/novelty-types/testing';

describe('NoveltyType', () => {
  describe('noveltyTypeTotalHours', () => {
    it('should return total hours positive number when novelty type operator is addition', () => {
      const noveltyType = createNoveltyType('NT1', {
        operator: NoveltyTypeOperator.Addition,
        novelties: [
          createNovelty('N1', {
            novelty_type_id: 'NT1',
            start_at: '1999-01-02 12:00:00',
            end_at: '1999-01-02 13:00:00',
          }),
          createNovelty('N2', {
            novelty_type_id: 'NT1',
            start_at: '1999-01-02 16:00:00',
            end_at: '1999-01-02 20:00:00',
          }),
        ],
      });

      expect(noveltyType.total_novelties_time_in_hours).toBe(5);
    });

    it('should return total hours negative number when novelty type operator is subtraction', () => {
      const noveltyType = createNoveltyType('NT1', {
        operator: NoveltyTypeOperator.Subtraction,
        novelties: [
          createNovelty('N1', {
            novelty_type_id: 'NT1',
            start_at: '1999-01-02 12:00:00',
            end_at: '1999-01-02 13:00:00',
          }),
          createNovelty('N2', {
            novelty_type_id: 'NT1',
            start_at: '1999-01-02 16:00:00',
            end_at: '1999-01-02 20:00:00',
          }),
        ],
      });

      expect(noveltyType.total_novelties_time_in_hours).toBe(-5);
    });

    it('should return 0 when novelties attribute is null or undefined', () => {
      const additionNoveltyType = createNoveltyType('NT1');

      additionNoveltyType.novelties = null;
      expect(additionNoveltyType.total_novelties_time_in_hours).toBe(0);

      additionNoveltyType.novelties = undefined;
      expect(additionNoveltyType.total_novelties_time_in_hours).toBe(0);
    });
  });
});
