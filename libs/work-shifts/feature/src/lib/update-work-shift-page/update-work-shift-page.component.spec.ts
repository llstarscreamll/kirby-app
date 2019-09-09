import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShiftsFacade } from '@llstarscreamll/work-shifts/data-access';
import { UpdateWorkShiftPageComponent } from './update-work-shift-page.component';

describe('UpdateWorkShiftPageComponent', () => {
  let component: UpdateWorkShiftPageComponent;
  let fixture: ComponentFixture<UpdateWorkShiftPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [UpdateWorkShiftPageComponent],
      providers: [{ provide: WorkShiftsFacade, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkShiftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
