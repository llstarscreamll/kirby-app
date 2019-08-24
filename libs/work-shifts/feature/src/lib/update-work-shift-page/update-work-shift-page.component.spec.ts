import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkShiftPageComponent } from './update-work-shift-page.component';
import { WorkShiftsDataAccessModule } from '@llstarscreamll/work-shifts/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateWorkShiftPageComponent', () => {
  let component: UpdateWorkShiftPageComponent;
  let fixture: ComponentFixture<UpdateWorkShiftPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        WorkShiftsDataAccessModule,
        HttpClientTestingModule
      ],
      declarations: [UpdateWorkShiftPageComponent],
      providers: [
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } }
      ]
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
