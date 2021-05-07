import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { emptyPagination } from '@kirby/shared';
import { createUser } from '@kirby/users/testing';
import { AuthFacade } from '@kirby/authentication/data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { ListWorkShiftsPageComponent } from './list-work-shifts-page.component';

describe('ListWorkShiftsPageComponent', () => {
  let component: ListWorkShiftsPageComponent;
  let fixture: ComponentFixture<ListWorkShiftsPageComponent>;
  let template: HTMLDivElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule, RouterTestingModule],
      declarations: [ListWorkShiftsPageComponent],
      providers: [
        {
          provide: WorkShiftsFacade,
          useValue: { paginatedWorkShifts$: of(emptyPagination()), search: (query) => true },
        },
        { provide: AuthFacade, useValue: { authUser$: of(createUser('U1', { roles: [], permissions: [] })) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkShiftsPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain certain elements and components', () => {
    expect(template.querySelector('h1')).toBeTruthy();
    expect(template.querySelector('a').getAttribute('href')).toBe('/create');
    expect(template.querySelector('kirby-work-shifts-table-list')).toBeTruthy();
  });
});
