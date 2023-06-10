import { Observable, Subject } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { LocalStorageService } from '@kirby/shared';
import { PrinterService, WeighingMachineService } from '@kirby/production/feature';

@Component({
  selector: 'kirby-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  portData$ = new Subject();
  serialPorts$: Observable<any[]>;
  weighingMachineAvailable = this.weighingMachine.isAvailable;

  constructor(
    private printerService: PrinterService,
    private changeDetector: ChangeDetectorRef,
    private weighingMachine: WeighingMachineService
  ) {}

  ngOnInit() {
    this.loadPorts();
  }

  loadPorts() {
    this.serialPorts$ = this.weighingMachine.listSerialPorts();
  }

  openConnection(portPath: string) {
    this.weighingMachine.setSelectedPort(portPath);
    this.weighingMachine.openConnection(portPath, (data) => {
      this.portData$.next(data);
      this.changeDetector.detectChanges();
    });
  }

  getPortButtonColor(port: string): string {
    return this.weighingMachine.getSelectedPort() === port ? 'accent' : '';
  }

  printTestTicket() {
    this.printerService.print({
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
    });
  }
}
