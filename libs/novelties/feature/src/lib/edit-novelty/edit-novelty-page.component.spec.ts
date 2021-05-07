import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { createUser } from '@kirby/users/testing';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { EditNoveltyPageComponent } from './edit-novelty-page.component';
import { AuthFacade } from '@kirby/authentication/data-access';
import { of } from 'rxjs';

class NoveltiesFacadeMock {}
class EmployeesFacadeMock {}

describe('EditNoveltyComponent', () => {
  let component: EditNoveltyPageComponent;
  let fixture: ComponentFixture<EditNoveltyPageComponent>;
  const user = createUser('U1', { roles: [], permissions: [] });
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditNoveltyPageComponent],
      providers: [
        { provide: AuthFacade, useValue: { authUser$: of(user) } },
        { provide: NoveltiesFacade, useClass: NoveltiesFacadeMock },
        { provide: EmployeesFacade, useClass: EmployeesFacadeMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoveltyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
