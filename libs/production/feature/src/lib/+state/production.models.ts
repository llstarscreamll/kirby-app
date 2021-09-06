export interface IProductionLog {
  id: string;
  employee_id: string;
  product_id: string;
  machine_id: string;
  customer_id: string | null;
  batch: number | null;
  tare_weight: number;
  gross_weight: number;

  employee?: { id: string; first_name: string; last_name: string };
  product?: { id: string; internal_code: string; name: string };
  machine?: { id: string; cost_center_id: string; code: string; name: string };
  customer?: { id: string; name: string };
}

export class ProductionLog implements IProductionLog {
  id: string;
  employee_id: string;
  product_id: string;
  machine_id: string;
  customer_id: string | null;
  batch: number | null;
  tare_weight: number;
  gross_weight: number;

  static fromJson(data: any): ProductionLog {
    return Object.assign(new ProductionLog(), {
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
    });
  }

  static fromJsonList(arr: any[]): ProductionLog[] {
    return arr.map((data) => ProductionLog.fromJson(data));
  }

  netWeight(): number {
    return this.gross_weight - this.tare_weight;
  }
}
