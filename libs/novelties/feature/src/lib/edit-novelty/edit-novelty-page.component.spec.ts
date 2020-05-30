import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoveltyPageComponent } from './edit-novelty-page.component';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';

class NoveltiesFacadeMock {}
class EmployeesFacadeMock {}

describe('EditNoveltyComponent', () => {
  let component: EditNoveltyPageComponent;
  let fixture: ComponentFixture<EditNoveltyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditNoveltyPageComponent],
      providers: [
        { provide: NoveltiesFacade, useClass: NoveltiesFacadeMock },
        { provide: EmployeesFacade, useClass: EmployeesFacadeMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
