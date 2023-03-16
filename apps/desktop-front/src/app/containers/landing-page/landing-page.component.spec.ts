import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PrinterService, WeighingMachineService } from '@kirby/production/feature';
import { LocalStorageService } from '@kirby/shared';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LandingPageComponent],
        providers: [
          {
            provide: LocalStorageService,
            useValue: { setItem: (k, v) => true },
          },
          {
            provide: PrinterService,
            useValue: { print: (d) => true },
          },
          {
            provide: WeighingMachineService,
            useValue: { isAvailable: false, listSerialPorts: (d) => true, openConnection: (d, c) => true },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
