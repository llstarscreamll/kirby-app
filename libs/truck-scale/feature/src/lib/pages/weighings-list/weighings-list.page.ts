import { FormBuilder } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';

import { Weighing } from '../../+state/models';
import { PrinterService } from '@kirby/shared';
import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-weighings-list',
  templateUrl: './weighings-list.page.html',
})
export class WeighingsListPage implements OnInit {
  fb = inject(FormBuilder);
  facade = inject(WeighingsFacade);
  printer = inject(PrinterService);

  apiError$ = this.facade.error$;
  weighings$ = this.facade.weighings$;
  lectureFlag$ = this.facade.lectureFlag$;
  weighingsPaginationMeta$ = this.facade.weighingsPaginationMeta$;

  vehicleTypes = [
    'CUATRO MANOS',
    'DOBLETROQUE',
    'MINIMULA - PATINETA',
    'MONTACARGAS',
    'SENCILLO',
    'TRACTOMULA DE TRES EJES',
    'TURBO',
  ];
  printerAvailable = this.printer.isAvailable;
  searchForm = this.fb.group({
    id: [],
    vehicle_plate: [],
    vehicle_type: [],
    status: [],
    date: [],
  });

  ngOnInit(): void {
    this.searchWeighings();
  }

  searchWeighings(query = {}, pagination = {}) {
    this.facade.searchWeighings({ ...query, ...pagination });
  }

  setSettings() {
    this.facade.getWeightLectureFlag();
  }

  searchFormSubmit() {
    this.facade.searchWeighings({ filter: { ...this.searchForm.value }, page: 1 });
  }

  exportAll() {
    this.facade.exportWeighings({});
  }

  exportCurrentFilter() {
    this.facade.exportWeighings({ filter: this.searchForm.value });
  }

  print(weighing: Weighing) {
    this.printer.print(weighing, { template: 'weighing' });
  }

  toggleTruckScaleLecture() {
    this.facade.toggleWeightLectureFlag();
  }
}
