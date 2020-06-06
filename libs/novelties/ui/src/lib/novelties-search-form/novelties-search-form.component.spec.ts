import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

import { emptyPagination } from '@kirby/shared';
import { createEmployee } from '@kirby/employees/testing/src';
import { createNoveltyType } from '@kirby/novelty-types/testing/src';
import { NoveltiesSearchFormComponent } from './novelties-search-form.component';
import { MatChipsModule } from '@angular/material/chips';

describe('NoveltiesSearchFormComponent', () => {
  let component: NoveltiesSearchFormComponent;
  let fixture: ComponentFixture<NoveltiesSearchFormComponent>;
  let template: HTMLDivElement;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatAutocompleteModule, MatChipsModule],
      declarations: [NoveltiesSearchFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(NoveltiesSearchFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(NoveltiesSearchFormComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    template = fixture.nativeElement;
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('simple search', () => {
    const formSelector = 'form.simple-search';
    const searchFieldSelector = formSelector + ' [formControlName="search"]';
    const advancedSearchBtnSelector = formSelector + ' a.open-advanced-search';

    beforeEach(() => {
      component.enableAdvancedSearch = false;
      fixture.detectChanges();
    });

    it('should have certain elements', () => {
      expect(template.querySelector(formSelector)).toBeTruthy();
      expect(template.querySelector(searchFieldSelector)).toBeTruthy();
      expect(template.querySelector(advancedSearchBtnSelector)).toBeTruthy();
    });

    it('should emit form values on form submit', () => {
      component.simpleSearchForm.patchValue({ search: 'foo' });
      fixture.detectChanges();

      spyOn(component.submitted, 'emit');

      const form: HTMLFormElement = template.querySelector(formSelector);
      form.submit();

      expect(component.submitted.emit).toHaveBeenCalledWith({
        search: 'foo',
        page: 1
      });
    });

    it('should hide simple search form and show advanced search form', () => {
      const advancedSearchBtn: HTMLLinkElement = template.querySelector(
        advancedSearchBtnSelector
      );

      advancedSearchBtn.click();
      fixture.detectChanges();

      expect(template.querySelector(formSelector)).toBeFalsy();
    });
  });

  describe('advanced search', () => {
    const formSelector = 'form.advanced-search-form';
    const startAtFromFieldSelector =
      formSelector + ' [formControlName=startAtFrom]';
    const startAtEndFieldSelector =
      formSelector + ' [formControlName=startAtTo]';
    const costCentersSearchFieldSelector =
      formSelector + ' [formControlName=costCentersSearch]';
    const noveltyTypesSearchFieldSelector =
      formSelector + ' [formControlName=noveltyTypesSearch]';
    const employeesSearchFieldSelector =
      formSelector + ' [formControlName=employeesSearch]';
    const submitBtnSelector = formSelector + ' button[type=submit]';

    beforeEach(() => {
      component.toggleAdvancedSearch();
      fixture.detectChanges();
    });

    it('should show form when enableAdvancedSearch = true', () => {
      expect(template.querySelector(formSelector)).toBeTruthy();
    });

    it('should stop to listen advanced form changes when advanced search is disabled', () => {
      expect(component.enableAdvancedSearch).toBe(true);
      expect(component.advancedSearchForm).toBeTruthy();
      spyOn(component.advancedFormDestroy$, 'next');

      component.toggleAdvancedSearch();

      expect(component.advancedFormDestroy$.next).toHaveBeenCalled();
      expect(component.advancedSearchForm).toBeFalsy();
    });

    it('should have certain elements', () => {
      expect(template.querySelector(formSelector)).toBeTruthy();
      expect(template.querySelector(startAtFromFieldSelector)).toBeTruthy();
      expect(template.querySelector(startAtEndFieldSelector)).toBeTruthy();
      expect(
        template.querySelector(noveltyTypesSearchFieldSelector)
      ).toBeTruthy();
      expect(template.querySelector(employeesSearchFieldSelector)).toBeTruthy();
      expect(template.querySelector(submitBtnSelector)).toBeTruthy();
    });

    it('should display employees found on employeesSearch autocomplete field', async () => {
      component.employeesFound = emptyPagination();
      component.employeesFound.data = [
        createEmployee('AAA'),
        createEmployee('AAA-BBB')
      ];

      fixture.detectChanges();

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({ selector: employeesSearchFieldSelector })
      );
      await autocomplete.enterText('A');
      expect(await autocomplete.isOpen()).toBe(true);
      expect((await autocomplete.getOptions()).length).toBe(2);
    });

    it('should display novelty types found on noveltyTypesSearch autocomplete field', async () => {
      component.noveltyTypesFound = emptyPagination();
      component.noveltyTypesFound.data = [
        createNoveltyType('N-A'),
        createNoveltyType('N-AB')
      ];

      fixture.detectChanges();

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({
          selector: noveltyTypesSearchFieldSelector
        })
      );
      await autocomplete.enterText('N');
      expect(await autocomplete.isOpen()).toBe(true);
      expect((await autocomplete.getOptions()).length).toBe(2);
    });

    it('should emit search employees on employeesSearch field text changes', fakeAsync(async () => {
      spyOn(component.searchEmployees, 'emit');

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({ selector: employeesSearchFieldSelector })
      );
      await autocomplete.enterText('AA');
      tick(500);

      expect(component.searchEmployees.emit).toHaveBeenCalledWith({
        search: 'AA'
      });
    }));

    it('should emit search novelty types on noveltyTypesSearch field text changes', fakeAsync(async () => {
      spyOn(component.searchNoveltyTypes, 'emit');

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({
          selector: noveltyTypesSearchFieldSelector
        })
      );
      await autocomplete.enterText('NN');
      tick(500);

      expect(component.searchNoveltyTypes.emit).toHaveBeenCalledWith({
        search: 'NN'
      });
    }));

    it('should emit search cost centers on costCentersSearch field text changes', fakeAsync(async () => {
      spyOn(component.searchCostCenters, 'emit');

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({
          selector: costCentersSearchFieldSelector
        })
      );
      await autocomplete.enterText('CC1');
      tick(500);

      expect(component.searchCostCenters.emit).toHaveBeenCalledWith({
        search: 'CC1'
      });
    }));

    it('should add value to selected novelty types form value when searchNoveltyTypes autocomplete option is selected', async () => {
      const expectedNoveltyType = createNoveltyType('N-A');
      component.noveltyTypesFound = emptyPagination();
      component.noveltyTypesFound.data = [
        expectedNoveltyType,
        createNoveltyType('N-AB')
      ];

      fixture.detectChanges();

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({
          selector: noveltyTypesSearchFieldSelector
        })
      );
      await autocomplete.enterText('N');
      await autocomplete.selectOption({
        text: expectedNoveltyType.code + ' ' + expectedNoveltyType.name
      });

      const noveltyTypesControl = component.advancedSearchForm.get(
        'noveltyTypes'
      );
      const noveltyTypesSearchControl = component.advancedSearchForm.get(
        'noveltyTypesSearch'
      );

      expect(noveltyTypesControl.value.length).toBe(1);
      expect(noveltyTypesSearchControl.value).toBe('');
    });

    it('should add value to selected employees form value when searchEmployees autocomplete option is selected', async () => {
      const expectedEmployee = createEmployee('E-A');
      component.employeesFound = emptyPagination();
      component.employeesFound.data = [
        expectedEmployee,
        createEmployee('E-AB')
      ];

      fixture.detectChanges();

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({
          selector: employeesSearchFieldSelector
        })
      );
      await autocomplete.enterText('E');
      await autocomplete.selectOption({
        text: expectedEmployee.first_name + ' ' + expectedEmployee.last_name
      });

      const employeesControl = component.advancedSearchForm.get('employees');
      const employeesSearchControl = component.advancedSearchForm.get(
        'employeesSearch'
      );

      expect(employeesControl.value.length).toBe(1);
      expect(employeesSearchControl.value).toBe('');
    });

    it('should add value to selected cost center form value when searchCostCenter autocomplete option is selected', async () => {
      const expectedCostCenter = {
        id: 'A1',
        code: 'CC1',
        name: 'Cost center 1'
      };
      component.costCentersFound = emptyPagination();
      component.costCentersFound.data = [
        expectedCostCenter,
        { id: 'B2', code: 'CC2', name: 'Cost center 2' }
      ];

      fixture.detectChanges();

      const autocomplete = await loader.getHarness(
        MatAutocompleteHarness.with({
          selector: costCentersSearchFieldSelector
        })
      );
      await autocomplete.enterText('C');
      await autocomplete.selectOption({
        text: expectedCostCenter.code + ' ' + expectedCostCenter.name
      });

      const costCentersControl = component.advancedSearchForm.get(
        'costCenters'
      );
      const costCentersSearchControl = component.advancedSearchForm.get(
        'costCentersSearch'
      );

      expect(costCentersControl.value.length).toBe(1);
      expect(costCentersSearchControl.value).toBe('');
    });

    it('should display selected employees on list', () => {
      component.advancedSearchForm
        .get('employees')
        .setValue([createEmployee('A1')]);

      fixture.detectChanges();

      expect(component.selectedEmployees.length).toBe(1);
      expect(
        template.querySelectorAll('.selected-employees mat-chip').length
      ).toBe(1);
    });

    it('should display selected cost centers on list', () => {
      component.advancedSearchForm
        .get('costCenters')
        .setValue([{ id: 'C1', code: 'CC1', name: 'Foo' }]);

      fixture.detectChanges();

      expect(component.selectedCostCenters.length).toBe(1);
      expect(
        template.querySelectorAll('.selected-cost-centers mat-chip').length
      ).toBe(1);
    });

    it('should display selected novelty types on list', () => {
      component.advancedSearchForm
        .get('noveltyTypes')
        .setValue([createNoveltyType('N1')]);

      fixture.detectChanges();

      expect(component.selectedNoveltyTypes.length).toBe(1);
      expect(
        template.querySelectorAll('.selected-novelty-types mat-chip').length
      ).toBe(1);
    });

    it('should be able to remove selected employee', () => {
      component.advancedSearchForm
        .get('employees')
        .setValue([createEmployee('A1')]);

      fixture.detectChanges();

      expect(component.selectedEmployees.length).toBe(1);

      const removeBtn: HTMLButtonElement = template.querySelector(
        '.selected-employees mat-chip:first-child mat-icon'
      );
      removeBtn.click();
      fixture.detectChanges();

      expect(component.selectedEmployees.length).toBe(0);
    });

    it('should be able to remove selected novelty type', () => {
      component.advancedSearchForm
        .get('noveltyTypes')
        .setValue([createNoveltyType()]);

      fixture.detectChanges();

      expect(component.selectedNoveltyTypes.length).toBe(1);

      const removeBtn: HTMLButtonElement = template.querySelector(
        '.selected-novelty-types mat-chip:first-child mat-icon'
      );
      removeBtn.click();

      fixture.detectChanges();

      expect(component.selectedNoveltyTypes.length).toBe(0);
    });

    it('should be able to remove selected cost center', () => {
      component.advancedSearchForm
        .get('costCenters')
        .setValue([{ id: 'A1', code: 'CC1', name: 'Foo' }]);

      fixture.detectChanges();

      expect(component.selectedCostCenters.length).toBe(1);

      const removeBtn: HTMLButtonElement = template.querySelector(
        '.selected-cost-centers mat-chip:first-child mat-icon'
      );
      removeBtn.click();

      fixture.detectChanges();

      expect(component.selectedCostCenters.length).toBe(0);
    });

    it('should emit form values on submit button click', async () => {
      const noveltyType = createNoveltyType();
      const employee = createEmployee();
      const costCenter = { id: 'A1', code: 'CC1', name: 'Foo' };

      const formData = {
        startAtFrom: '2020-01-01 00:00:00',
        startAtTo: '2020-01-15 23:59:59',
        noveltyTypes: [noveltyType],
        employees: [employee],
        costCenters: [costCenter]
      };
      component.advancedSearchForm.patchValue(formData);

      spyOn(component.submitted, 'emit');
      fixture.detectChanges();

      const submitButton = await loader.getHarness(
        MatButtonHarness.with({ selector: submitBtnSelector })
      );
      await submitButton.click();

      const expectedOutput = {
        start_at: { from: '2020-01-01 00:00:00', to: '2020-01-15 23:59:59' },
        novelty_types: [noveltyType],
        employees: [employee],
        cost_centers: [costCenter]
      };

      expect(component.submitted.emit).toHaveBeenCalledWith({
        ...expectedOutput,
        page: 1
      });
    });
  });
});
