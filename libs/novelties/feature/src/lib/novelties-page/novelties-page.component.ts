import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Pagination } from '@llstarscreamll/shared';
import { NoveltyInterface } from '@llstarscreamll/novelties/data';
import { NoveltiesFacade } from '@llstarscreamll/novelties/data-access';

@Component({
  selector: 'llstarscreamll-novelties-page',
  templateUrl: './novelties-page.component.html',
  styleUrls: ['./novelties-page.component.scss']
})
export class NoveltiesPageComponent implements OnInit {
  public novelties$: Observable<Pagination<NoveltyInterface>>;

  public searchQuery = {};

  public constructor(private noveltiesFacade: NoveltiesFacade) {}

  public ngOnInit() {
    this.novelties$ = this.noveltiesFacade.paginatedNovelties$;
    this.searchNovelties();
  }

  public searchNovelties(query: any = {}) {
    this.searchQuery = { ...this.searchQuery, ...query };
    this.noveltiesFacade.search(this.searchQuery);
  }
}
