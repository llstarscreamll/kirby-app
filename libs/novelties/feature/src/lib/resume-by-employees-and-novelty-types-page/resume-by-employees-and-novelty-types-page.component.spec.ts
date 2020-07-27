import { of } from 'rxjs';
import moment from 'moment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { emptyPagination } from '@kirby/shared';
import { createEmployee } from '@kirby/employees/testing';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { ResumeByEmployeesAndNoveltyTypesPageComponent } from './resume-by-employees-and-novelty-types-page.component';

describe('ResumeByEmployeesAndNoveltyTypesPageComponent', () => {
  let template: HTMLDivElement;
  let noveltiesFacade: NoveltiesFacade;
  let component: ResumeByEmployeesAndNoveltyTypesPageComponent;
  let fixture: ComponentFixture<ResumeByEmployeesAndNoveltyTypesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ResumeByEmployeesAndNoveltyTypesPageComponent],
      providers: [
        {
          provide: NoveltiesFacade,
          useValue: {
            resumeByEmployeesAndNoveltyTypes$: of(emptyPagination()),
            getResumeByEmployeesAndNoveltyTypes: (q) => true,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ResumeByEmployeesAndNoveltyTypesPageComponent
    );
    template = fixture.nativeElement;
    component = fixture.componentInstance;
    noveltiesFacade = TestBed.get(NoveltiesFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call novelties facade methods on init', () => {
    spyOn(noveltiesFacade, 'getResumeByEmployeesAndNoveltyTypes');

    component.ngOnInit();

    expect(
      noveltiesFacade.getResumeByEmployeesAndNoveltyTypes
    ).toHaveBeenCalledWith({
      start_date: moment().startOf('month').format('YYYY-MM-DD'),
      end_date: moment().endOf('month').format('YYYY-MM-DD'),
    });
  });

  it('should have certain elements by default', () => {
    // paginatedResume$ is null on init, so resume table should not be visible
    expect(
      fixture.nativeElement.querySelector(
        'kirby-resume-by-employees-and-novelty-types-table'
      )
    ).toBeFalsy();
    expect(
      fixture.nativeElement.querySelector(
        'kirby-resume-by-employees-and-novelty-types-table'
      )
    ).toBeFalsy();
  });

  it('should show resume table and page navigation when paginatedResume$ is ready', () => {
    component.paginatedResume$ = of({
      ...emptyPagination(),
      data: [createEmployee('E1')],
    });

    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector(
        'kirby-resume-by-employees-and-novelty-types-table'
      )
    ).toBeTruthy();

    expect(
      fixture.nativeElement.querySelector('kirby-pagination')
    ).toBeTruthy();

    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  describe('search form', () => {
    it('should have certain fields', () => {
      expect(
        template.querySelector('form [formControlName="search"]')
      ).toBeTruthy();
      expect(
        template.querySelector('form [formControlName="start_date"]')
      ).toBeTruthy();
      expect(
        template.querySelector('form [formControlName="end_date"]')
      ).toBeTruthy();
      expect(template.querySelector('form button[type=submit]')).toBeTruthy();
    });

    it('should trigger resume data search onsubmit', () => {
      component.searchForm.patchValue({
        search: 'foo',
        start_date: '2020-01-01',
        end_date: '2020-02-01',
      });

      spyOn(noveltiesFacade, 'getResumeByEmployeesAndNoveltyTypes');
      fixture.detectChanges();

      const submitBtn: HTMLButtonElement = template.querySelector(
        'form button[type=submit]'
      );
      submitBtn.click();

      expect(
        noveltiesFacade.getResumeByEmployeesAndNoveltyTypes
      ).toHaveBeenCalledWith({
        search: 'foo',
        start_date: '2020-01-01',
        end_date: '2020-02-01',
        page: 1,
      });
    });
  });
});
