import * as moment from 'moment';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let template: HTMLDivElement;
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PaginationComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable prev button if current page is 1', () => {
    component.pagination = {
      current_page: 1,
      from: 1,
      path: 'https://my.api/foo',
      per_page: 10,
      to: 10,
    };

    fixture.detectChanges();

    expect(template.querySelector('button.prev:disabled')).toBeTruthy();
  });

  it('should disable all buttons if pagination is null', () => {
    component.pagination = null;
    expect(template.querySelector('button.prev:disabled')).toBeTruthy();
    expect(template.querySelector('button.next:disabled')).toBeTruthy();
  });

  it('should disable next button when there are no pages', () => {
    component.pagination = {
      current_page: 1,
      last_page: 1,
      from: 1,
      path: 'https://my.api/foo',
      per_page: 10,
      to: 2,
    };

    fixture.detectChanges();

    expect(template.querySelector('button.next:disabled')).toBeTruthy();
  });
});
