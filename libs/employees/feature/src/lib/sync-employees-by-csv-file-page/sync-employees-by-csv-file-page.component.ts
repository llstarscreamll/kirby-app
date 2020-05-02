import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeesFacade } from '@kirby/employees/data-access';

@Component({
  selector: 'kirby-sync-employees-by-csv-file-page',
  templateUrl: './sync-employees-by-csv-file-page.component.html',
  styleUrls: ['./sync-employees-by-csv-file-page.component.scss']
})
export class SyncEmployeesByCsvFilePageComponent implements OnInit {
  public syncEmployeesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit() {
    this.syncEmployeesForm = this.formBuilder.group({
      csv_file: [null, Validators.required]
    });
  }

  fileAdded(event) {
    this.syncEmployeesForm.patchValue({ csv_file: event.srcElement.files[0] });
  }

  onSubmit() {
    this.employeesFacade.syncEmployeesByCsvFile(this.syncEmployeesForm.value);
  }
}
