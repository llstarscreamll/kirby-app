import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';

import { createNoveltyType } from '@kirby/novelty-types/testing';
import { NoveltyTypeOperator } from '@kirby/novelty-types/data/src';
import { NoveltyTypesTableComponent } from './novelty-types-table.component';

describe('NoveltyTypesTableComponent', () => {
  let component: NoveltyTypesTableComponent;
  let fixture: ComponentFixture<NoveltyTypesTableComponent>;
  let template: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoveltyTypesTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(NoveltyTypesTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyTypesTableComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list headings', () => {
    expect(
      template.querySelector('table thead tr th:first-child').textContent
    ).toBe('Código');
    expect(
      template.querySelector('table thead tr th:nth-child(2)').textContent
    ).toBe('Nombre');
    expect(
      template.querySelector('table thead tr th:nth-child(3)').textContent
    ).toBe('Operador');
    expect(
      template.querySelector('table thead tr th:nth-child(4)').textContent
    ).toBe('Requiere comentario?');
    expect(
      template.querySelector('table thead tr th:nth-child(5)').textContent
    ).toBe('Mantener en reporte?');
    expect(
      template.querySelector('table thead tr th:nth-child(6)').textContent
    ).toBe('Acciones');
  });

  it('should show certain elements on each row', () => {
    const firstNoveltyType = createNoveltyType('AAA');
    firstNoveltyType.requires_comment = true;
    firstNoveltyType.keep_in_report = true;
    firstNoveltyType.operator = NoveltyTypeOperator.Addition;
    const lastNoveltyType = createNoveltyType('BBB');
    lastNoveltyType.operator = NoveltyTypeOperator.Subtraction;
    lastNoveltyType.requires_comment = false;
    lastNoveltyType.keep_in_report = false;

    component.noveltyTypes = [firstNoveltyType, lastNoveltyType];

    fixture.detectChanges();

    expect(template.querySelectorAll('table tbody tr').length).toBe(2);

    // first novelty type
    expect(
      template.querySelector('table tbody tr:first-child td:first-child')
        .textContent
    ).toContain(firstNoveltyType.code);
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(2)')
        .textContent
    ).toContain(firstNoveltyType.name);
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(3)')
        .textContent
    ).toContain('add_circle');
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(4) .true')
        .textContent
    ).toContain('Si');
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(5) .true')
        .textContent
    ).toContain('Si');
    expect(
      template.querySelector(
        'table tbody tr:first-child td:nth-child(6) a mat-icon'
      ).textContent
    ).toContain('edit');
    expect(
      template.querySelector(
        'table tbody tr:first-child td:nth-child(6) button mat-icon'
      ).textContent
    ).toContain('delete');

    // second novelty type
    expect(
      template.querySelector('table tbody tr:last-child td:nth-child(3)')
        .textContent
    ).toContain('remove_circle');
    expect(
      template.querySelector('table tbody tr:last-child td:nth-child(4) .false')
        .textContent
    ).toContain('No');
    expect(
      template.querySelector('table tbody tr:last-child td:nth-child(5) .false')
        .textContent
    ).toContain('No');
  });

  it('should emit delete row button click', () => {
    component.noveltyTypes = [createNoveltyType('AAA')];

    fixture.detectChanges();

    spyOn(component.rowTrashed, 'emit');

    const trashButton: HTMLButtonElement = template.querySelector(
      'table tbody tr td:last-child button.trash'
    );
    trashButton.click();

      expect(component.rowTrashed.emit).toHaveBeenCalledWith('AAA');
  });
});
