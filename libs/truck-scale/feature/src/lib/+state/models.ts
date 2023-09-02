export enum Setting {
  WeighingMachineLectureFlag = 'truck-scale.require-weighing-machine-lecture',
}

export class Weighing {
  readableStatus: string;
  readableWeighingType: string;

  constructor(
    public id: string,
    public weighing_type: 'load' | 'unload' | 'weighing',
    public vehicle_plate: string,
    public vehicle_type: 'one' | 'two',
    public driver_dni_number: number,
    public driver_name: string,
    public client: string,
    public commodity: string,
    public destination: string,
    public tare_weight: number,
    public gross_weight: number,
    public weighing_description: string,
    public cancel_comment: string,
    public status: 'inProgress' | 'finished' | 'canceled' | 'manualFinished',
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

    const readableStatusLookup = {
      inProgress: 'En Progreso',
      finished: 'Finalizado',
      canceled: 'Cancelado',
      manualFinished: 'Finalizado manual',
    };
    this.readableStatus = readableStatusLookup[this.status] || 'Finished';
  }

  isInProgress(): boolean {
    return this.status === 'inProgress';
  }

  isFinished(): boolean {
    return this.status === 'finished';
  }

  isCanceled(): boolean {
    return this.status === 'canceled';
  }

  isManualFinished(): boolean {
    return this.status === 'manualFinished';
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
  clients: { name: string }[];
  commodities: { name: string }[];
}
