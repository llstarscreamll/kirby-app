import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { Observable } from 'rxjs';
import { isElectron } from '@llstarscreamll/utils';
import { SerialPortService } from '@llstarscreamll/electron';

@Component({
  selector: 'pascal-production-record-by-weight',
  templateUrl: './production-record-by-weight.component.html',
  styleUrls: ['./production-record-by-weight.component.css']
})
export class ProductionRecordByWeightComponent implements OnInit {

  public authUser$: Observable<any>;

  public isElectron = isElectron();

  public form: FormGroup;

  public now = new Date();

  public products = [
    { id: 1, name: "Lápiz" },
    { id: 2, name: "Borrador" },
    { id: 3, name: "Cuaderno" },
  ];

  public customers = [
    { id: 1, name: "Chris Evans" },
    { id: 2, name: "Tony Stark" },
    { id: 3, name: "Bruce Banner" },
  ];

  public constructor(
    @Optional()
    private serialPortService: SerialPortService,
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
  ) { }

  public ngOnInit() {
    this.authUser$ = this.authFacade.authUser$;

    this.form = this.formBuilder.group({
      gross_weight: [],
      net_weight: [],
      operator: [],
      product: [],
      manufacturing_date: [],
      customer: [],
      batch: []
    });

    this.serialPortService.portsList();
  }

  public onGrossWeightFocus() {
    this.form.get('gross_weight').setValue(123);
  }

}
