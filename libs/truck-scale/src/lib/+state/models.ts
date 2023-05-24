export interface Weighing {
  id: string;
  name: string;
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
