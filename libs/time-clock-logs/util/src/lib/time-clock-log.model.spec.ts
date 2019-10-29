import { createTimeClockLog } from '@kirby/time-clock-logs/testing';
import { createNovelty } from '@kirby/novelties/testing';

describe('TimeClockLogModel', () => {
  it('should display related novelties as concatenated string', () => {
    const model = createTimeClockLog();
    const firstNovelty = createNovelty(null, {
      name: 'FN-01',
      time_clock_log_id: model.id,
      total_time_in_minutes: 60 * 5
    });
    const secondNovelty = createNovelty(null, {
      name: 'SN-02',
      time_clock_log_id: model.id,
      total_time_in_minutes: 60 * 10
    });
    model.novelties = [firstNovelty, secondNovelty];

    expect(model.concatenatedNoveltiesCount).toContain(
      firstNovelty.novelty_type.code
    );
    expect(model.concatenatedNoveltiesCount).toContain(
      firstNovelty.total_time_in_minutes / 60
    );
    expect(model.concatenatedNoveltiesCount).toContain(
      secondNovelty.novelty_type.code
    );
    expect(model.concatenatedNoveltiesCount).toContain(
      secondNovelty.total_time_in_minutes / 60
    );
  });
});
