export interface Weighing {
  id: string;
  weighing_type: string;
  vehicle_plate: string;
  vehicle_type: string;
  driver_dni_number: number;
  driver_name: string;
  tare_weight: number;
  gross_weight: number;
  weighing_description: string;
  status: string;
  created_by_id: string;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  name: string;
}

export interface Vehicle {
  plate: string;
  type: string;
  drivers: Driver[];
}
