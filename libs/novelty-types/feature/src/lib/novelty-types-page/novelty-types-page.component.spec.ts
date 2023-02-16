import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';

import { emptyPagination } from '@kirby/shared';
import { createUser } from '@kirby/users/testing';
import { AuthFacade } from '@kirby/authentication/data-access';
import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';
import { NoveltyTypesPageComponent } from './novelty-types-page.component';
import { AuthorizationUiTestModule } from '@kirby/authorization/ui';
import { of } from 'rxjs';
import { hot } from 'jasmine-marbles';

describe('NoveltyTypesPageComponent', () => {
  let template: HTMLDivElement;
  let noveltyTypesFacade: NoveltyTypesFacade;
  let component: NoveltyTypesPageComponent;
  let fixture: ComponentFixture<NoveltyTypesPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AuthorizationUiTestModule],
      declarations: [NoveltyTypesPageComponent],
      providers: [
        {
          provide: NoveltyTypesFacade,
          useValue: {
            search: (q) => true,
            trash: (q) => true,
            paginatedNoveltyTypes$: hot('-a|', { a: emptyPagination() }),
          },
        },
        { provide: AuthFacade, useValue: { authUser$: of(createUser('A1', { roles: [], permissions: [] })) } },
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
    noveltyTypesFacade = TestBed.inject(NoveltyTypesFacade);
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
    expect(component.paginatedNoveltyTypes$).toBeObservable(hot('-a|', { a: emptyPagination() }));
  });

  it('should call NoveltyTypesFacade.trash(...) on onTrashRow', async () => {
    spyOn(noveltyTypesFacade, 'trash');

    component.trashRow('AAA');

    expect(noveltyTypesFacade.trash).toHaveBeenCalledWith('AAA');
  });

  it('should have certain elements on page', () => {
    fixture.detectChanges();
    expect(template.querySelector('kirby-novelty-types-search-form')).toBeTruthy();
    expect(template.querySelector('kirby-novelty-types-table')).toBeTruthy();
    expect(template.querySelector('kirby-pagination')).toBeTruthy();
  });
});
