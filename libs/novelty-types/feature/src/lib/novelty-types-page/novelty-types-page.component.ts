import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '@kirby/authentication-data-access';

import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';

@Component({
  selector: 'kirby-novelty-types-page',
  templateUrl: './novelty-types-page.component.html',
  styleUrls: ['./novelty-types-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltyTypesPageComponent implements OnInit {
  user$ = this.authFacade.authUser$;
  paginatedNoveltyTypes$ = this.noveltyTypesFacade.paginatedNoveltyTypes$;

  constructor(private noveltyTypesFacade: NoveltyTypesFacade, private authFacade: AuthFacade) {}

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
