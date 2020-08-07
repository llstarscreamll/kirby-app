import {
  Input,
  OnInit,
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { sortBy } from 'lodash';

import {
  NoveltyTypeOperator,
  NoveltyType,
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

  @Input()
  showBalanceButton = false;

  @Output()
  balance = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get noveltyTypes(): NoveltyType[] {
    return this.employees ? this.employees[0]?.novelty_types || [] : [];
  }

  get additionNoveltyTypes(): NoveltyType[] {
    return sortBy(
      this.getNoveltyTypesByOperator(NoveltyTypeOperator.Addition),
      'code'
    );
  }

  get subtractNoveltyTypes(): NoveltyType[] {
    return sortBy(
      this.getNoveltyTypesByOperator(NoveltyTypeOperator.Subtraction),
      'code'
    );
  }

  getNoveltyTypesByOperator(operator: NoveltyTypeOperator): NoveltyType[] {
    return this.noveltyTypes.filter(
      (noveltyType) => noveltyType.operator === operator
    );
  }
}
