import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Pagination } from '@llstarscreamll/shared';
import { WorkShiftService } from './work-shift.service';
import { WorkShiftInterface } from './work-shift.interface';
import { AUTH_TOKENS_MOCK } from '@llstarscreamll/authentication/utils';
import { WORK_SHIFT_MOCK } from './mocks';

describe('WorkShiftService', () => {
  let service: WorkShiftService;
  let httpController: HttpTestingController;
  const authTokens = AUTH_TOKENS_MOCK;
  const paginatedWorkShifts: Pagination<WorkShiftInterface> = {
    data: [
      { ...WORK_SHIFT_MOCK }
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

  it('should send GET to api/v1/work-shifts/ with certain headers on search()', fakeAsync(() => {
    const query = {};

    service.search(query, authTokens).subscribe(data => expect(data).toEqual(paginatedWorkShifts));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/');
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush(paginatedWorkShifts);
  }));

  it('should send POST to api/v1/work-shifts/ with certain headers on create()', fakeAsync(() => {
    const workShiftData = paginatedWorkShifts.data[0];
    const createdWorkShift = { id: 1, ...workShiftData };

    service.create(workShiftData, authTokens).subscribe(data => expect(data).toEqual(createdWorkShift));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/');
    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush({ data: createdWorkShift });
  }));

  it('should send GET to api/v1/work-shifts/1 with certain headers on get()', fakeAsync(() => {
    const workShift: WorkShiftInterface = { id: 1, ...paginatedWorkShifts.data[0] };

    service.get(workShift.id, authTokens).subscribe(data => expect(data).toEqual(workShift));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/' + workShift.id);
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush({ data: workShift });
  }));

  it('should send PUT to api/v1/work-shifts/1 with certain headers on update()', fakeAsync(() => {
    const workShiftData = paginatedWorkShifts.data[0];
    const workShiftId = 1;

    service.update(workShiftId, workShiftData, authTokens).subscribe(data => expect(data).toEqual(workShiftData));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/' + workShiftId);
    expect(request.request.method).toEqual('PUT');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush({ data: workShiftData });
  }));

  it('should send DELETE to api/v1/work-shifts/1 with certain headers on delete()', fakeAsync(() => {
    const response = 'accepted';
    const workShiftId = 1;

    service.delete(workShiftId, authTokens).subscribe(data => expect(data).toEqual(response));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/work-shifts/' + workShiftId);
    expect(request.request.method).toEqual('DELETE');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual('application/json');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + authTokens.access_token);

    request.flush(response);
  }));

});
