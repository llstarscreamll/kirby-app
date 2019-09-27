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

  public static fromJson(data: any): User {
    return Object.assign(new User(), data);
  }

  public static fromJsonList(arr: any[]): User[] {
    return arr.map(data => User.fromJson(data));
  }

  public can(permissionName: string): boolean {
    return (
      !!this.roles &&
      !!this.roles.find(
        role =>
          !!role.permissions.find(
            rolePermission => rolePermission.name === permissionName
          )
      )
    );
  }
}
