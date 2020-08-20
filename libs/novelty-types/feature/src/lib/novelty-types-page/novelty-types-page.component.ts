import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';

@Component({
  selector: 'kirby-novelty-types-page',
  templateUrl: './novelty-types-page.component.html',
  styleUrls: ['./novelty-types-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltyTypesPageComponent implements OnInit {
  paginatedNoveltyTypes$ = this.noveltyTypesFacade.paginatedNoveltyTypes$;

  constructor(private noveltyTypesFacade: NoveltyTypesFacade) {}

  ngOnInit(): void {
    this.searchNoveltyTypes();
  }

  searchNoveltyTypes(query = {}) {
    this.noveltyTypesFacade.search(query);
  }

  trashRow(noveltyTypeId: string) {
    this.noveltyTypesFacade.trash(noveltyTypeId);
  }
}
