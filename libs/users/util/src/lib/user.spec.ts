import { Role } from '@kirby/authorization/data';
import { createUser } from '@kirby/users/testing';

describe('User', () => {
  const user = createUser('U1', {
    roles: [
      {
        name: 'admin',
        display_name: 'Amin',
        description: 'Admin',
        permissions: [
          { name: 'books.create', display_name: '', description: '' },
          { name: 'books.update', display_name: '', description: '' },
          { name: 'books.delete', display_name: '', description: '' },
        ],
      },
    ],
    permissions: [
      { name: 'books.publish', display_name: '', description: '' },
      { name: 'books.review', display_name: '', description: '' },
    ],
  });

  describe('allPermissions', () => {
    it('should return direct permissions and role permissions', () => {
      expect(user.allPermissions().length).toBe(5);
    });
  });

  describe('can', () => {
    it('should return true if has specific permission', () => {
      expect(user.can('books.create')).toBe(true);
    });
    it('should return false if does not have specific permission', () => {
      expect(user.can('bad-permission')).toBe(false);
    });
    it('should return false if string is empty', () => {
      expect(user.can('')).toBe(false);
    });
  });

  describe('canAny', () => {
    it('should return true if has any of the given permissions', () => {
      expect(user.canAny(['bad', 'books.create'])).toBe(true);
    });
    it('should return false if does not have any of the given permissions', () => {
      expect(user.canAny(['bad', 'wrong'])).toBe(false);
    });
    it('should return false if strings are empty', () => {
      expect(user.canAny(['', ''])).toBe(false);
    });
  });
});
