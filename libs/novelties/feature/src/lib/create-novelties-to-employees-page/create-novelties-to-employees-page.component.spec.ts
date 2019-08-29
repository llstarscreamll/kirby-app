import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoveltiesToEmployeesPageComponent } from './create-novelties-to-employees-page.component';

describe('CreateNoveltiesToEmployeesPageComponent', () => {
  let component: CreateNoveltiesToEmployeesPageComponent;
  let fixture: ComponentFixture<CreateNoveltiesToEmployeesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNoveltiesToEmployeesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoveltiesToEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
