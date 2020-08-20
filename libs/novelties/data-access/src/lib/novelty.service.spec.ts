import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NoveltyService } from './novelty.service';

describe('NoveltyService', () => {
  let service: NoveltyService;
  let httpController: HttpTestingController;
  const ENV_MOCK = { api: 'https://my.api.com/' };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NoveltyService,
        { provide: 'environment', useValue: ENV_MOCK },
      ],
    });

    service = TestBed.inject(NoveltyService);
  });

  // afterEach(() => { httpController.verify(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
