import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkShiftsPageComponent } from './list-work-shifts-page.component';
import { WorkShiftsDataAccessModule } from '@llstarscreamll/work-shifts/data-access/src';

describe('ListWorkShiftsPageComponent', () => {
  let component: ListWorkShiftsPageComponent;
  let fixture: ComponentFixture<ListWorkShiftsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        WorkShiftsDataAccessModule,
      ],
      declarations: [ListWorkShiftsPageComponent],
      providers: [
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkShiftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
