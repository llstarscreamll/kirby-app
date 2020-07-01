import { hot } from '@nrwl/angular/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';

import { emptyPagination } from '@kirby/shared';
import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';
import { NoveltyTypesPageComponent } from './novelty-types-page.component';

describe('NoveltyTypesPageComponent', () => {
  let template: HTMLDivElement;
  let noveltyTypesFacade: NoveltyTypesFacade;
  let component: NoveltyTypesPageComponent;
  let fixture: ComponentFixture<NoveltyTypesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoveltyTypesPageComponent],
      providers: [
        {
          provide: NoveltyTypesFacade,
          useValue: {
            search: (q) => true,
            paginatedNoveltyTypes$: hot('-a|', { a: emptyPagination() }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(NoveltyTypesPageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyTypesPageComponent);
    noveltyTypesFacade = TestBed.get(NoveltyTypesFacade);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call NoveltyTypesFacade.search(...) on ngOnInit', async () => {
    spyOn(noveltyTypesFacade, 'search');

    fixture.detectChanges();

    expect(noveltyTypesFacade.search).toHaveBeenCalledWith({});
    expect(component.paginatedNoveltyTypes$).toBeObservable(
      hot('-a|', { a: emptyPagination() })
    );
  });

  it('should call NoveltyTypesFacade.trash(...) on onTrashRow', async () => {
    spyOn(noveltyTypesFacade, 'trash');

    component.trashRow('AAA');

    expect(noveltyTypesFacade.trash).toHaveBeenCalledWith('AAA');
  });

  it('should have certain elements on page', () => {
    fixture.detectChanges();
    expect(
      template.querySelector('kirby-novelty-types-search-form')
    ).toBeTruthy();
    expect(template.querySelector('kirby-novelty-types-table')).toBeTruthy();
    expect(template.querySelector('kirby-pagination')).toBeTruthy();
  });
});
