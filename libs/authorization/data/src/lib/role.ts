import { Permission } from './permission';

export class Role {
  id?: string;
  name: string = '';
  display_name: string = '';
  description: string = '';
  permissions: Permission[] = [];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
