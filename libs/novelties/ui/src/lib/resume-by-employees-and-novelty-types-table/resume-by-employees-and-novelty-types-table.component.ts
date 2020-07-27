import {
  Input,
  OnInit,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { sortBy } from 'lodash';

import {
  NoveltyTypeOperator,
  NoveltyTypeInterface,
} from '@kirby/novelty-types/data/src';
import { EmployeeInterface } from '@kirby/employees/util';

@Component({
  selector: 'kirby-resume-by-employees-and-novelty-types-table',
  templateUrl: './resume-by-employees-and-novelty-types-table.component.html',
  styleUrls: ['./resume-by-employees-and-novelty-types-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeByEmployeesAndNoveltyTypesTableComponent implements OnInit {
  @Input()
  employees: EmployeeInterface[] = [];

  constructor() {}

  ngOnInit(): void {}

  get noveltyTypes(): NoveltyTypeInterface[] {
    return this.employees
      ? this.employees[0]?.novelty_types || []
      : [];
  }

  get additionNoveltyTypes(): NoveltyTypeInterface[] {
    return sortBy(
      this.getNoveltyTypesByOperator(NoveltyTypeOperator.Addition),
      'code'
    );
  }

  get subtractNoveltyTypes(): NoveltyTypeInterface[] {
    return sortBy(
      this.getNoveltyTypesByOperator(NoveltyTypeOperator.Subtraction),
      'code'
    );
  }

  getNoveltyTypesByOperator(
    operator: NoveltyTypeOperator
  ): NoveltyTypeInterface[] {
    return this.noveltyTypes.filter(
      (noveltyType) => noveltyType.operator === operator
    );
  }
}
