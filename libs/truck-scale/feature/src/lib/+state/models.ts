export class Weighing {
  readableStatus: string;
  readableVehicleType: string;
  readableWeighingType: string;

  constructor(
    public id: string,
    public weighing_type: 'load' | 'unload' | 'weighing',
    public vehicle_plate: string,
    public vehicle_type: 'one' | 'two',
    public driver_dni_number: number,
    public driver_name: string,
    public tare_weight: number,
    public gross_weight: number,
    public weighing_description: string,
    public status: 'inProgress' | 'finished',
    public created_by_id: string,
    public created_by: { id: string; first_name: string; last_name: string },
    public updated_by_id: string,
    public updated_by: { id: string; first_name: string; last_name: string },
    public created_at: string,
    public updated_at: string
  ) {
    const readableWeighingTypesLookup = {
      load: 'Carga',
      unload: 'Descarga',
      weighing: 'Pesaje',
    };
    this.readableWeighingType = readableWeighingTypesLookup[this.weighing_type] || 'Pesaje';

    const readableVehicleTypeLookup = {
      one: 'Uno',
      two: 'Dos',
    };
    this.readableVehicleType = readableVehicleTypeLookup[this.vehicle_type] || 'Dos';

    const readableStatusLookup = {
      inProgress: 'En Progreso',
      finished: 'Finalizado',
    };
    this.readableStatus = readableStatusLookup[this.status] || 'Finished';
  }
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
