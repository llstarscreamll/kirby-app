import { map, tap } from 'rxjs/operators';
import { from, Observable, Subject } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { LocalStorageService } from '@kirby/shared';
import { WeighingMachineService } from '@kirby/production/feature';

@Component({
  selector: 'pascal-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  serialPorts$: Observable<any[]>;
  portData$ = new Subject();
  weighingMachineAvailable = this.weighingMachine.isAvailable;

  constructor(
    private weighingMachine: WeighingMachineService,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.loadPorts();
  }

  loadPorts() {
    this.serialPorts$ = this.weighingMachine.listSerialPorts();
  }

  openConnection(portPath: string) {
    this.localStorage.setItem('SerialPortConfig', { selected: portPath });
    this.weighingMachine.openConnection(portPath, (data) => {
      this.portData$.next(data);
      this.changeDetector.detectChanges();
    });
  }
}
