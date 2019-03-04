import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WorkShiftService } from './work-shift.service';
import { WorkShiftInterface } from './work-shift.interface';
import { AUTH_TOKENS_MOCK } from '@llstarscreamll/authentication/utils';

describe('WorkShiftService', () => {
  let service: WorkShiftService;
  let httpController: HttpTestingController;
  const authTokens = AUTH_TOKENS_MOCK;
  const paginatedWorkShifts = {
    data: [
      {
        name: '2-10',
        start_time: '14:00',
        end_time: '22:00',
        grace_minutes_for_start_time: 10,
        grace_minutes_for_end_time: 15,
        meal_time_in_minutes: 45,
        min_minutes_required_to_discount_meal_time: 60 * 6,
        created_at: '1999-01-01 01:00:00',
        updated_at: '1999-01-01 01:00:00'
      }
    ],
    meta: {}
  };

  const ENV_MOCK = { api: 'https://my.api.com/' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WorkShiftService,
        { provide: 'environment', useValue: ENV_MOCK },
      ],
    });

    httpController = TestBed.get(HttpTestingController);
    service = TestBed.get(WorkShiftService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET to api/v1/work-shifts/ with certain headers on search()', () => {
    const query = {};

    service.search(query, authTokens).subscribe(data => expect(data).toEqual(paginatedWorkShifts));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/');
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush(paginatedWorkShifts);
  });

  it('should send POST to api/v1/work-shifts/ with certain headers on create()', () => {
    const workShiftData = paginatedWorkShifts.data[0];
    const createdWorkShift = { id: 1, ...workShiftData };

    service.create(workShiftData, authTokens).subscribe(data => expect(data).toEqual(createdWorkShift));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/');
    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush(createdWorkShift);
  });

  it('should send GET to api/v1/work-shifts/1 with certain headers on getById()', () => {
    const workShift: WorkShiftInterface = { id: 1, ...paginatedWorkShifts.data[0] };

    service.getById(workShift.id, authTokens).subscribe(data => expect(data).toEqual(workShift));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/' + workShift.id);
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush(workShift);
  });

  it('should send PUT to api/v1/work-shifts/1 with certain headers on updateById()', () => {
    const workShiftData = paginatedWorkShifts.data[0];
    const workShiftId = 1;

    service.updateById(workShiftId, workShiftData, authTokens).subscribe(data => expect(data).toEqual(workShiftData));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/' + workShiftId);
    expect(request.request.method).toEqual('PUT');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush(workShiftData);
  });

});
