import {
  Input,
  OnInit,
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  NoveltyType,
  NoveltyTypeOperator,
} from '@kirby/novelty-types/data';

@Component({
  selector: 'kirby-novelty-types-table',
  templateUrl: './novelty-types-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltyTypesTableComponent implements OnInit {
  @Input() noveltyTypes: NoveltyType[] = [];
  @Input() showActionsColumn = true;

  @Output() rowTrashed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  operatorIcon(operator: NoveltyTypeOperator): string {
    return operator === NoveltyTypeOperator.Addition
      ? 'add_circle'
      : 'remove_circle';
  }

  readableBoolean(bool): string {
    return bool === true ? 'Si' : 'No';
  }

  onRowTrashed(noveltyTypeId: string) {
    this.rowTrashed.emit(noveltyTypeId)
  }
}
