import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkShiftPageComponent } from './create-work-shift-page.component';
import { WorkShiftsDataAccessModule } from '@llstarscreamll/work-shifts/data-access/src';

describe('CreateWorkShiftPageComponent', () => {
  let component: CreateWorkShiftPageComponent;
  let fixture: ComponentFixture<CreateWorkShiftPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        WorkShiftsDataAccessModule,
      ],
      declarations: [CreateWorkShiftPageComponent],
      providers: [
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkShiftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
