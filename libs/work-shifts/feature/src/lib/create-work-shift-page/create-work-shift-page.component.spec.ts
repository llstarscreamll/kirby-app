import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { CreateWorkShiftPageComponent } from './create-work-shift-page.component';

describe('CreateWorkShiftPageComponent', () => {
  let component: CreateWorkShiftPageComponent;
  let fixture: ComponentFixture<CreateWorkShiftPageComponent>;
  let template: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, RouterTestingModule],
      declarations: [CreateWorkShiftPageComponent],
      providers: [{ provide: WorkShiftsFacade, useValue: { search: (query) => true } }],
      schemas: [NO_ERRORS_SCHEMA],
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
    expect(template.querySelector('kirby-work-shift-form')).toBeTruthy();
  });
});
