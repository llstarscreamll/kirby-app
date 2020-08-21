import { createUser } from '@kirby/users/testing';

describe('user', () => {
  describe('can', () => {
    const defaultPermission = {
      id: 'p',
      name: 'create.book',
      display_name: 'create books',
      description: 'create books',
    };

    const defaultRole = {
      id: 'a',
      name: 'admin',
      display_name: 'Admin',
      description: 'The Admin',
      permissions: [],
    };

    it('should return true if user has said permission', () => {
      const user = createUser();
      user.roles = [{ ...defaultRole, permissions: [defaultPermission] }];

      expect(user.can('create.book')).toBe(true);
    });

    it('should return false if has roles = null', () => {
      const user = createUser();

      expect(user.can('create.book')).toBe(false);
    });

    it("should return false if role hasn't permissions", () => {
      const user = createUser();
      user.roles = [
        {
          id: 'a',
          name: 'admin',
          display_name: 'Admin',
          description: 'The Admin',
          permissions: null,
        },
      ];

      expect(user.can('create.book')).toBe(false);
    });

    it('should return false if role permissions = []', () => {
      const user = createUser();
      user.roles = [
        {
          id: 'a',
          name: 'admin',
          display_name: 'Admin',
          description: 'The Admin',
          permissions: [],
        },
      ];

      expect(user.can('create.book')).toBe(false);
    });
  });
});
