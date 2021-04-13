import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLogsPage } from './production-logs.page';
import { ProductionFacade } from '../+state/production.facade';

describe('ProductionLogsPage', () => {
  let component: ProductionLogsPage;
  let fixture: ComponentFixture<ProductionLogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionLogsPage],
      providers: [
        {
          provide: ProductionFacade,
          useValue: {
            productionLogs$: of([]),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
