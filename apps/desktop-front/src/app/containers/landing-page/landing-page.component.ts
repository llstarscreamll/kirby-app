import { Observable, Subject } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { PrinterService } from '@kirby/shared';
import { WeighingMachineService } from '@kirby/shared';

@Component({
  selector: 'kirby-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  portData$ = new Subject();
  serialPorts$: Observable<any[]>;

  selectedPort: string;
  weighingMachineAvailable = this.weighingMachine.isAvailable;

  constructor(
    private printerService: PrinterService,
    private changeDetector: ChangeDetectorRef,
    private weighingMachine: WeighingMachineService
  ) {}

  ngOnInit() {
    this.loadPorts();
    this.selectedPort = this.weighingMachine.getSelectedPort();
  }

  loadPorts() {
    this.serialPorts$ = this.weighingMachine.listSerialPorts();
  }

  selectPort(portPath: string) {
    this.selectedPort = portPath;
    this.weighingMachine.setSelectedPort(portPath);

    this.weighingMachine.openConnection((data) => {
      this.portData$.next(data);
      this.changeDetector.detectChanges();
    });
  }

  getPortButtonColor(port: string): string {
    return this.selectedPort === port ? 'accent' : '';
  }

  printTestTicket() {
    this.printerService.print(productionDataTest);
  }

  printTestWeighing() {
    this.printerService.print(weighingDataTest, { template: 'weighing' });
  }
}

const productionDataTest = {
  employee_id: 5,
  product_id: 5,
  machine_id: 4,
  customer_id: 2,
  batch: 123,
  tare_weight: 10,
  gross_weight: 50,
  updated_at: '2021-05-17T14:49:15.000000Z',
  created_at: '2021-05-17T14:49:15.000000Z',
  id: 7,
  employee: {
    first_name: 'John',
    last_name: 'Doe',
    code: 'AB12',
  },
  machine: {
    id: 4,
    cost_center_id: 9,
    code: 'M-PRU384',
    name: 'Máquina de prueba',
    created_at: '2021-05-11T13:20:55.000000Z',
    updated_at: '2021-05-11T13:20:55.000000Z',
  },
  product: {
    id: 5,
    internal_code: '1NT3RN4L-C0D3',
    customer_code: 'C0D3',
    name: 'Producto de Prueba',
    wire_gauge_in_bwg: '85',
    wire_gauge_in_mm: '45',
    created_at: '2021-05-11T13:20:39.000000Z',
    updated_at: '2021-05-11T13:20:39.000000Z',
  },
  customer: {
    id: 2,
    name: 'Cliente de Prueba',
    created_at: '2021-05-11T13:21:04.000000Z',
    updated_at: '2021-05-11T13:21:04.000000Z',
  },
};

const weighingDataTest = {
  id: 1,
  weighing_type: 'load',
  vehicle_plate: 'ABC123',
  vehicle_type: 'one',
  driver_dni_number: 1057987654,
  driver_name: 'JOHN DOE',
  tare_weight: '10.00',
  gross_weight: '23.00',
  weighing_description: 'Comentarios de prueba',
  created_by_id: 262,
  updated_by_id: 262,
  status: 'finished',
  created_at: '2023-06-17T19:07:13.000000Z',
  updated_at: '2023-06-17T19:08:42.000000Z',
  created_by: {
    id: 262,
    first_name: 'Jane',
    last_name: 'Doe',
  },
  updated_by: {
    id: 262,
    first_name: 'James',
    last_name: 'Doe',
  },
};
