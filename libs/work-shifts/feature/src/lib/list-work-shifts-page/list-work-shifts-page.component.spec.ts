import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkShiftsPageComponent } from './list-work-shifts-page.component';
import { WorkShiftsDataAccessModule } from '@llstarscreamll/work-shifts/data-access/src';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('ListWorkShiftsPageComponent', () => {
  let component: ListWorkShiftsPageComponent;
  let fixture: ComponentFixture<ListWorkShiftsPageComponent>;
  let template: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        WorkShiftsDataAccessModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ListWorkShiftsPageComponent],
      providers: [
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
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
    expect(template.querySelector('llstarscreamll-work-shifts-table-list')).toBeTruthy();
  });
});
