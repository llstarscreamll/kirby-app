import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkShiftPageComponent } from './create-work-shift-page.component';
import { WorkShiftsDataAccessModule } from '@llstarscreamll/work-shifts/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';

describe('CreateWorkShiftPageComponent', () => {
  let component: CreateWorkShiftPageComponent;
  let fixture: ComponentFixture<CreateWorkShiftPageComponent>;
  let template: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        WorkShiftsDataAccessModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [CreateWorkShiftPageComponent],
      providers: [
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkShiftPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain certain elements and components', () => {
    expect(template.querySelector('h1')).toBeTruthy();
    expect(template.querySelector('a').getAttribute('href')).toBe('/');
  });
});
