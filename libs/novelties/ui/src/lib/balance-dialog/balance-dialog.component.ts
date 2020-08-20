import {
  Inject,
  OnInit,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeInterface } from '@kirby/employees/util';

@Component({
  selector: 'kirby-balance-dialog',
  templateUrl: './balance-dialog.component.html',
  styleUrls: ['./balance-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public employee: EmployeeInterface,
    private dialogReference: MatDialogRef<BalanceDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      employee_id: [this.employee.id, [Validators.required]],
      start_date: [
        moment(this.employee.oldestNoveltyTypeRecordDate()).format(
          'YYYY-MM-DD'
        ),
        [Validators.required],
      ],
      time: [this.employee.noveltyTypesTotalHours(), [Validators.required]],
      comment: [
        '',
        [Validators.required, Validators.min(5), Validators.max(255)],
      ],
    });
  }

  onSubmit() {
    this.dialogReference.close({
      ...this.form.value,
      start_date: moment(this.form.value.start_date),
    });
  }
}
