import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createUser } from '@kirby/users/testing';
import { EditWorkShiftPage } from './edit-work-shift.page';
import { AuthFacade } from '@kirby/authentication-data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';

describe('EditWorkShiftComponent', () => {
  let component: EditWorkShiftPage;
  let fixture: ComponentFixture<EditWorkShiftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkShiftPage],
      providers: [
        { provide: WorkShiftsFacade, useValue: { search: (query) => true } },
        { provide: AuthFacade, useValue: { authUser$: of(createUser('U1')) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkShiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
