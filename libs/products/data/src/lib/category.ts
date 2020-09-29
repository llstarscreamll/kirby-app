import { IProduct, Product } from './product';

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  position: number;
  active?: boolean;
  firstTenProducts?: IProduct[];
  created_at?: Date;
  updated_at?: Date;
}

export class Category implements ICategory {
  id = '';
  name = '';
  slug = '';
  position = 0;
  active = undefined;
  firstTenProducts = [];
  created_at?: Date;
  updated_at?: Date;

  static fromJson(data: any): Category {
    return Object.assign(new Category(), {
      ...data,
      firstTenProducts: Product.fromJsonList(data.firstTenProducts || []),
      created_at: data.created_at ? new Date(data.start_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
    });
  }

  static fromJsonList(arr: any[]): Category[] {
    return arr.map((data) => Category.fromJson(data));
  }
}
