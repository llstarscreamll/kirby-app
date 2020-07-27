import moment from 'moment';
import { Component, OnInit } from '@angular/core';

import { NoveltiesFacade } from '@kirby/novelties/data-access/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kirby-resume-by-employees-and-novelty-types-page',
  templateUrl: './resume-by-employees-and-novelty-types-page.component.html',
  styleUrls: ['./resume-by-employees-and-novelty-types-page.component.scss'],
})
export class ResumeByEmployeesAndNoveltyTypesPageComponent implements OnInit {
  paginatedResume$ = this.noveltiesFacade.resumeByEmployeesAndNoveltyTypes$;

  searchForm: FormGroup;

  defaultStartDate = moment().startOf('month').format('YYYY-MM-DD');
  defaultEndDate = moment().endOf('month').format('YYYY-MM-DD');

  constructor(
    private formBuilder: FormBuilder,
    private noveltiesFacade: NoveltiesFacade
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      page: 1,
      search: [],
      start_date: [this.defaultStartDate, [Validators.required]],
      end_date: [this.defaultEndDate, [Validators.required]],
    });

    this.getResume({
      start_date: this.defaultStartDate,
      end_date: this.defaultEndDate,
    });
  }

  searchSubmitted() {
    this.getResume(this.searchForm.value);
  }

  getResume(query = {}) {
    this.noveltiesFacade.getResumeByEmployeesAndNoveltyTypes(query);
  }
}
