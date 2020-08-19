import { isEmpty } from 'lodash-es';
import { Role, Permission } from '@kirby/authorization/data';

export class User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  email_verified_at?: string;
  roles?: Role[];
  permissions?: Permission[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  static fromJson(data: any): User {
    return Object.assign(new User(), data);
  }

  static fromJsonList(arr: any[]): User[] {
    return arr.map(data => User.fromJson(data));
  }

  can(permissionName: string): boolean {
    return (
      isEmpty(permissionName) ||
      (permissionName &&
        (!!this.roles &&
          !!this.roles.find(
            role =>
              !!role.permissions.find(
                rolePermission => rolePermission.name === permissionName
              )
          )))
    );
  }
}
