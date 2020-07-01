import {
  OnInit,
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';

@Component({
  selector: 'kirby-edit-novelty-type-page',
  templateUrl: './edit-novelty-type-page.component.html',
  styleUrls: ['./edit-novelty-type-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditNoveltyTypePageComponent implements OnInit, OnDestroy {
  errors$ = this.noveltyTypesFacade.errors$;
  noveltyType$ = this.noveltyTypesFacade.selectedNoveltyType$;

  constructor(private noveltyTypesFacade: NoveltyTypesFacade) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.noveltyTypesFacade.cleanSelected();
  }

  onFormSubmit(noveltyTypeId: string, data: any) {
    this.noveltyTypesFacade.update(noveltyTypeId, data);
  }
}
