import { ChangeDetectionStrategy } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createWorkShift } from '@kirby/work-shifts/testing';
import { WorkShiftsTableListComponent } from './work-shifts-table-list.component';

describe('WorkShiftsTableListComponent', () => {
  let component: WorkShiftsTableListComponent;
  let fixture: ComponentFixture<WorkShiftsTableListComponent>;
  const itemsList = [createWorkShift('AAA'), createWorkShift('BBB', { applies_on_days: [6, 7] })];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkShiftsTableListComponent],
      imports: [RouterTestingModule],
    })
      .overrideComponent(WorkShiftsTableListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
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
    const firstRow = 'table tr:first-child';
    expect(template.querySelectorAll('table tbody tr').length).toBe(itemsList.length);
    expect(template.querySelector(`${firstRow} td:nth-child(1)`).textContent).toContain(itemsList[0].name);
    expect(template.querySelector(`${firstRow} td:nth-child(2)`).textContent).toContain(
      itemsList[0].time_slots[0].start
    );
    expect(template.querySelector(`${firstRow} td:nth-child(2)`).textContent).toContain(itemsList[0].time_slots[0].end);
    expect(template.querySelector(`${firstRow} td:nth-child(3)`).textContent).toMatch(/L +M +X +J +V/);

    const secondRow = 'table tr:last-child';
    expect(template.querySelector(`${secondRow} td:nth-child(3)`).textContent).toMatch(/S +D/);
  });
});
