import { get, omit } from 'lodash-es';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { emptyPagination } from '@kirby/shared';
import { CategoriesService } from './categories.service';
import { createCategory } from '@kirby/products/testing';
import { QuerySearch } from './+state/categories.actions';

function toJsonApiResource(resourceName: string, data: any) {
  return {
    id: get(data, 'id'),
    type: resourceName,
    attributes: omit(data, ['id']),
  };
}

describe('CategoriesService', () => {
  let service: CategoriesService;
  const apiUrl = 'https://my.api/';
  let httpController: HttpTestingController;
  const AACategory = createCategory({ id: 'AA' });
  const BBCategory = createCategory({ id: 'BB' });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoriesService,
        { provide: 'environment', useValue: { api: apiUrl } },
      ],
    });

    service = TestBed.inject(CategoriesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  describe('search()', () => {
    it('should call endpoint with certain params and headers and parse json:api response', fakeAsync(() => {
      const query: QuerySearch = { sort: 'position' };

      service.search(query).subscribe(
        (data) =>
          expect(data).toEqual({
            ...emptyPagination(),
            data: [AACategory, BBCategory],
          }),
        fail
      );

      const call = httpController.expectOne(
        apiUrl + 'api/v1/categories/?sort=position'
      );
      expect(call.request.method).toEqual('GET');
      expect(call.request.headers.get('Accept')).toEqual('application/json');
      expect(call.request.headers.get('Content-type')).toEqual(
        'application/json'
      );

      call.flush({
        ...emptyPagination(),
        data: [
          toJsonApiResource('Category', AACategory),
          toJsonApiResource('Category', BBCategory),
        ],
      });

      tick();
    }));
  });
});
