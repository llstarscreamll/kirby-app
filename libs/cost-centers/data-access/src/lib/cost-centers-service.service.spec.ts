import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CostCentersService } from './cost-centers.service';

describe('CostCentersService', () => {
  let service: CostCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
      CostCentersService,
      {provide: 'environment', useValue: {api: 'http://backend.api'}}
    ]
    });
    service = TestBed.inject(CostCentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
