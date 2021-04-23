import { createUser } from '@kirby/users/testing';
import { createTimeClockLog } from '@kirby/time-clock-logs/testing';

describe('TimeClockLogModel', () => {
  describe('isApprovedByUserId', () => {
    it('should return false when approvals is null', () => {
      const model = createTimeClockLog();
      const user = createUser();

      expect(model.isApprovedByUserId(user.id)).toBe(false);
    });

    it('should return false when approvals is empty array', () => {
      const model = createTimeClockLog();
      const user = createUser();
      model.approvals = [];

      expect(model.isApprovedByUserId(user.id)).toBe(false);
    });

    it('should return true when argument exists as approval', () => {
      const model = createTimeClockLog();
      const user = createUser();
      model.approvals = [user];

      expect(model.isApprovedByUserId(user.id)).toBe(true);
    });
  });
});
