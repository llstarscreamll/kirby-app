import { isEmpty } from 'lodash-es';
import { Role, Permission } from '@kirby/authorization/data';

export class User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  email_verified_at?: string;
  roles?: Role[] = [];
  permissions?: Permission[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  static fromJson(data: any): User {
    return Object.assign(new User(), data);
  }

  static fromJsonList(arr: any[]): User[] {
    return arr.map((data) => User.fromJson(data));
  }

  allPermissions(): string[] {
    return this.permissions
      .map((p) => p.name)
      .concat(this.roles.reduce((acc, r) => acc.concat(r.permissions.map((rp) => rp.name)), []));
  }

  can(permissionName: string): boolean {
    return this.allPermissions().indexOf(permissionName) >= 0;
  }

  canAny(permissions: string[]): boolean {
    return this.allPermissions().filter((p) => permissions.includes(p)).length > 0;
  }
}
