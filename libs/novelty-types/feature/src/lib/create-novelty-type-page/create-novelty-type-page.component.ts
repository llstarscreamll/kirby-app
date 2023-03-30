import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';

@Component({
  selector: 'kirby-create-novelty-type-page',
  templateUrl: './create-novelty-type-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoveltyTypePageComponent implements OnInit {
  errors$ = this.noveltyTypesFacade.errors$;

  constructor(private noveltyTypesFacade: NoveltyTypesFacade) {}

  ngOnInit(): void {}

  onFormSubmit(data) {
    this.noveltyTypesFacade.create(data);
  }
}
