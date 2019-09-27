import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { get } from 'lodash';

@Component({
  selector: 'kirby-pagination',
  template: `
    <button [disabled]="!pagination || currentPage === 1" mat-icon-button (click)="clickPrev()" class="prev">
      <mat-icon>navigate_before</mat-icon>
    </button>
    <button [disabled]="!pagination" mat-icon-button (click)="clickNext()" class="next">
      <mat-icon>navigate_next</mat-icon>
    </button>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input()
  public pagination: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
    last_page?: number;
    total?: number;
  };

  @Output()
  public paginate = new EventEmitter();

  public constructor() { }

  public ngOnInit(): void { }

  public get currentPage(): number {
    return get(this.pagination, 'current_page', 0);
  }

  public clickPrev() {
    this.paginate.emit({ page: this.currentPage - 1 });
  }

  public clickNext() {
    this.paginate.emit({ page: this.currentPage + 1 });
  }
}
