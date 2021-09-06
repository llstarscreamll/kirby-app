import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoveltyTypesSearchFormComponent } from './novelty-types-search-form.component';

describe('NoveltyTypesSearchFormComponent', () => {
  let matHarnessLoader: HarnessLoader;
  let template: HTMLDivElement;
  let component: NoveltyTypesSearchFormComponent;
  let fixture: ComponentFixture<NoveltyTypesSearchFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NoveltyTypesSearchFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyTypesSearchFormComponent);
    matHarnessLoader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    expect(
      template.querySelector('form [formControlName=search]')
    ).toBeTruthy();
    expect(
      template.querySelector('form mat-form-field mat-label').textContent
    ).toContain('Buscar');
    expect(
      template.querySelector('form mat-form-field mat-icon').textContent
    ).toContain('search');
  });

  it('should emit form values on form submit', async () => {
    const searchField = await matHarnessLoader.getHarness(
      MatInputHarness.with({ selector: 'form [formControlName=search]' })
    );

    await searchField.focus();
    await searchField.setValue('foo');

    spyOn(component.submitted, 'emit');
    template.querySelector('form').submit();

    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith({
      search: 'foo',
      page: 1,
    });
  });
});
