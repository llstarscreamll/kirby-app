import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WorkShiftService } from './work-shift.service';

describe('WorkShiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [WorkShiftService],
  }));

  it('should be created', () => {
    const service: WorkShiftService = TestBed.get(WorkShiftService);
    expect(service).toBeTruthy();
  });
});
