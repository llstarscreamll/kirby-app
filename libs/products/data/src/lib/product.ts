import { Category } from './category';

export interface IProduct {
  id: string;
  name: string;
  code: string;
  slug: string;
  sm_image_url: string;
  md_image_url: string;
  lg_image_url: string;
  cost: number;
  price: number;
  unity: string;
  quantity: number;
  pum_unity: string;
  pum_price: number;
  active?: boolean;
  categories?: Category[];
  created_at?: Date;
  updated_at?: Date;
}

export class Product implements IProduct {
  id = '';
  name = '';
  code = '';
  slug = '';
  sm_image_url = '';
  md_image_url = '';
  lg_image_url = '';
  cost = 0;
  price = 0;
  unity = '';
  quantity = 0;
  pum_unity = 'UND';
  pum_price = 0;
  active = undefined;
  categories?: Category[] = [];
  created_at?: Date = undefined;
  updated_at?: Date = undefined;

  static fromJson(data: any): Product {
    return Object.assign(new Product(), {
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
    });
  }

  static fromJsonList(arr: any[]): Product[] {
    return arr.map((data) => Product.fromJson(data));
  }

  sizedName(size: number): string {
    return this.name.slice(0, size) === this.name
      ? this.name.slice(0, size)
      : this.name.slice(0, size - 3).concat('...');
  }
}
