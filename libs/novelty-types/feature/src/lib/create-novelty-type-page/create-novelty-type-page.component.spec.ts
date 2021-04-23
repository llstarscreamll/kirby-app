import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { createNoveltyType } from '@kirby/novelty-types/testing';
import { NoveltyTypesFacade } from '@kirby/novelty-types/data-access';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { CreateNoveltyTypePageComponent } from './create-novelty-type-page.component';
import { cold } from '@nrwl/angular/testing';

describe('CreateNoveltyTypePageComponent', () => {
  let template: HTMLDivElement;
  let noveltyTypesFacade: NoveltyTypesFacade;
  const noveltyType = createNoveltyType('AAA');
  let component: CreateNoveltyTypePageComponent;
  let fixture: ComponentFixture<CreateNoveltyTypePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNoveltyTypePageComponent],
      providers: [
        {
          provide: NoveltyTypesFacade,
          useValue: {
            create: (d) => true,
            errors$: cold('e', { e: { message: 'WTF!!', ok: false } }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(CreateNoveltyTypePageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoveltyTypePageComponent);
    noveltyTypesFacade = TestBed.get(NoveltyTypesFacade);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    fixture.detectChanges();
    expect(template.querySelector('kirby-novelty-type-form')).toBeTruthy();
    expect(template.querySelector('kirby-api-errors')).toBeTruthy();
  });

  it('should bin attributes from noveltyTypesFacade', () => {
    fixture.detectChanges();

    expect(component.errors$).toBeObservable(
      cold('e', { e: { message: 'WTF!!', ok: false } })
    );
  });

  it('should call NoveltyTypesFacade.create(...)', () => {
    spyOn(noveltyTypesFacade, 'create');

    component.onFormSubmit({ foo: 'bar' });

    expect(noveltyTypesFacade.create).toHaveBeenLastCalledWith({ foo: 'bar' });
  });
});
