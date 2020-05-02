import { createTimeClockLog } from '@kirby/time-clock-logs/testing';
import { createNovelty } from '@kirby/novelties/testing';

describe('TimeClockLogModel', () => {
  it('should display related novelties as concatenated string', () => {
    const model = createTimeClockLog();
    const firstNovelty = createNovelty(null, {
      name: 'FN-01',
      time_clock_log_id: model.id,
      scheduled_end_at: '2020-03-01T15:00:00.000000Z',
      scheduled_start_at: '2020-03-01T20:00:00.000000Z'
    });
    const secondNovelty = createNovelty(null, {
      name: 'SN-02',
      time_clock_log_id: model.id,
      scheduled_end_at: '2020-03-01T10:00:00.000000Z',
      scheduled_start_at: '2020-03-01T20:00:00.000000Z'
    });
    model.novelties = [firstNovelty, secondNovelty];

    expect(model.concatenatedNoveltiesCount).toContain(
      firstNovelty.novelty_type.code
    );
    expect(model.concatenatedNoveltiesCount).toContain(
      firstNovelty.total_time_in_hours
    );
    expect(model.concatenatedNoveltiesCount).toContain(
      secondNovelty.novelty_type.code
    );
    expect(model.concatenatedNoveltiesCount).toContain(
      secondNovelty.total_time_in_hours
    );
  });
});
