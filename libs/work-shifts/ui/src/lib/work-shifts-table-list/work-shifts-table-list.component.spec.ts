import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy } from '@angular/core';
import { createWorkShift } from '@llstarscreamll/work-shifts/util';
import { WorkShiftsTableListComponent } from './work-shifts-table-list.component';

describe('WorkShiftsTableListComponent', () => {
  let component: WorkShiftsTableListComponent;
  let fixture: ComponentFixture<WorkShiftsTableListComponent>;
  const itemsList = [createWorkShift('AAA'), createWorkShift('BBB')];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkShiftsTableListComponent]
    }).overrideComponent(WorkShiftsTableListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShiftsTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items list on table', () => {
    component.items = itemsList;
    fixture.detectChanges();

    const template: HTMLDivElement = fixture.nativeElement;
    const tableRow = 'table tr:first-child';
    expect(template.querySelectorAll('table tbody tr').length).toBe(itemsList.length);
    expect(template.querySelector(`${tableRow} td:nth-child(1)`).textContent).toContain(itemsList[0].name);
    expect(template.querySelector(`${tableRow} td:nth-child(2)`).textContent).toContain(itemsList[0].start_time);
    expect(template.querySelector(`${tableRow} td:nth-child(3)`).textContent).toContain(itemsList[0].end_time);
    expect(template.querySelector(`${tableRow} td:nth-child(4)`).textContent).toContain(itemsList[0].meal_start_time);
    expect(template.querySelector(`${tableRow} td:nth-child(5)`).textContent).toContain(itemsList[0].grace_minutes_for_start_time);
    expect(template.querySelector(`${tableRow} td:nth-child(6)`).textContent).toContain(itemsList[0].grace_minutes_for_end_time);
    expect(template.querySelector(`${tableRow} td:nth-child(7)`).textContent).toContain(itemsList[0].meal_time_in_minutes);
    expect(template.querySelector(`${tableRow} td:nth-child(8)`).textContent).toContain(itemsList[0].min_minutes_required_to_discount_meal_time);
    expect(template.querySelector(`${tableRow} td:nth-child(9)`).textContent).toBeTruthy();
    expect(template.querySelector(`${tableRow} td:nth-child(10)`).textContent).toBeTruthy();
  });
});
