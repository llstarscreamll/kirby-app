import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { createNovelty } from '@kirby/novelties/testing';
import { createEmployee } from '@kirby/employees/testing';
import { NoveltyTypeOperator } from '@kirby/novelty-types/data';
import { createNoveltyType } from '@kirby/novelty-types/testing';
import { BalanceDialogComponent } from './balance-dialog.component';
import moment from 'moment';

describe('BalanceDialogComponent', () => {
  let template: HTMLDivElement;
  let component: BalanceDialogComponent;
  let fixture: ComponentFixture<BalanceDialogComponent>;
  let dialogReference: MatDialogRef<BalanceDialogComponent>;

  // test novelty types
  const HA = createNoveltyType('1', {
    code: 'HA',
    name: 'HA',
    operator: NoveltyTypeOperator.Addition,
  });
  const HN = createNoveltyType('2', {
    code: 'HN',
    name: 'HN',
    operator: NoveltyTypeOperator.Addition,
  });
  const CAL = createNoveltyType('3', {
    code: 'CAL',
    name: 'CAL',
    operator: NoveltyTypeOperator.Subtraction,
  });
  const PP = createNoveltyType('4', {
    code: 'PP',
    name: 'PP',
    operator: NoveltyTypeOperator.Subtraction,
  });
  const HNNovelties = [
    createNovelty('N1', {
      novelty_type_id: HN.id,
      novelty_type: null,
      start_at: '1999-01-01 01:00:00',
      end_at: '1999-01-01 02:00:00',
    }),
    createNovelty('N2', {
      novelty_type_id: HN.id,
      novelty_type: null,
      start_at: '1999-01-01 10:00:00',
      end_at: '1999-01-01 12:00:00',
    }),
  ];
  const PPNovelties = [
    createNovelty('N3', {
      novelty_type_id: PP.id,
      novelty_type: null,
      start_at: '1999-01-02 12:00:00',
      end_at: '1999-01-02 13:00:00',
    }),
    createNovelty('N4', {
      novelty_type_id: PP.id,
      novelty_type: null,
      start_at: '1999-01-02 16:00:00',
      end_at: '1999-01-02 20:00:00',
    }),
  ];
  const tonyStark = createEmployee('AAA', {
    novelty_types: [
      CAL,
      HA,
      { ...HN, novelties: HNNovelties },
      { ...PP, novelties: PPNovelties },
    ],
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule],
      declarations: [BalanceDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: tonyStark },
        { provide: MatDialogRef, useValue: { close: (_) => true } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDialogComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    dialogReference = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    expect(template.querySelector('h3').textContent).toContain(
      'Balancear tiempo de novedades'
    );
    expect(template.querySelector('.employee').textContent).toContain(
      tonyStark.fullName
    );
    expect(
      template.querySelector('form [formControlName=start_date]')
    ).toBeTruthy();
    expect(template.querySelector('form [formControlName=time]')).toBeTruthy();
    expect(
      template.querySelector('form [formControlName=comment]')
    ).toBeTruthy();
    expect(template.querySelector('button[type=submit]')).toBeTruthy();
    expect(template.querySelector('button.cancel')).toBeTruthy();
  });

  it('should have form with certain values', () => {
    expect(component.form.value).toEqual({
      start_date: '1999-01-01',
      time: tonyStark.noveltyTypesTotalHours(),
      comment: '',
      employee_id: tonyStark.id,
    });
  });

  it('should close dialog on form submit with form data', () => {
    component.form.patchValue({ comment: 'foo' });

    expect(component.form.valid).toBe(true);
   jest.spyOn(dialogReference, 'close');
    fixture.detectChanges();

    const form: HTMLFormElement = template.querySelector('form');
    form.submit();

    fixture.detectChanges();

    expect(dialogReference.close).toHaveBeenLastCalledWith({
      start_date: moment('1999-01-01'),
      time: tonyStark.noveltyTypesTotalHours(),
      comment: 'foo',
      employee_id: tonyStark.id,
    });
  });
});
