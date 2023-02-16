import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';

import { createNoveltyType } from '@kirby/novelty-types/testing';
import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';
import { EditNoveltyTypePageComponent } from './edit-novelty-type-page.component';
import { hot, cold } from 'jasmine-marbles';

describe('EditNoveltyTypePageComponent', () => {
  let template: HTMLDivElement;
  let noveltyTypesFacade: NoveltyTypesFacade;
  let component: EditNoveltyTypePageComponent;
  let fixture: ComponentFixture<EditNoveltyTypePageComponent>;
  const noveltyType = createNoveltyType('AAA');

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditNoveltyTypePageComponent],
      providers: [
        {
          provide: NoveltyTypesFacade,
          useValue: {
            get: (i) => true,
            update: (d) => true,
            cleanSelected: () => true,
            selectedNoveltyType$: hot('-a|', { a: noveltyType }),
            errors$: cold('e', { e: { message: 'WTF!!', ok: false } }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(EditNoveltyTypePageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoveltyTypePageComponent);
    noveltyTypesFacade = TestBed.inject(NoveltyTypesFacade);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should bin attributes from noveltyTypesFacade', () => {
    fixture.detectChanges();

    expect(component.noveltyType$).toBeObservable(hot('-a|', { a: noveltyType }));
    expect(component.errors$).toBeObservable(cold('--e', { e: { message: 'WTF!!', ok: false } }));
  });

  it('should have certain elements', () => {
    component.noveltyType$ = of(createNoveltyType());
    fixture.detectChanges();
    expect(template.querySelector('kirby-novelty-type-form')).toBeTruthy();
    expect(template.querySelector('kirby-api-errors')).toBeTruthy();
  });

  it('should not show kirby-novelty-type-form when noveltyType$ is null', () => {
    fixture.detectChanges();
    component.noveltyType$ = undefined;
    expect(template.querySelector('kirby-novelty-type-form')).toBeFalsy();
  });

  it('should call NoveltyTypesFacade.update(...)', () => {
   jest.spyOn(noveltyTypesFacade, 'update');
    const noveltyType = createNoveltyType();
    component.noveltyType$ = of(noveltyType);

    component.onFormSubmit(noveltyType.id, { foo: 'bar' });

    expect(noveltyTypesFacade.update).toHaveBeenLastCalledWith(noveltyType.id, {
      foo: 'bar',
    });
  });

  it('should clean selected novelty type on ngOnDestroy', () => {
   jest.spyOn(noveltyTypesFacade, 'cleanSelected');

    component.ngOnDestroy();

    expect(noveltyTypesFacade.cleanSelected).toHaveBeenCalled();
  });
});
