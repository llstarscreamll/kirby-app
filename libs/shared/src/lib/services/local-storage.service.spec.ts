import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService, APP_PREFIX } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const localStorageMock = {
    getItem: jest.fn(key => true),
    removeItem: jest.fn((key) => true),
    setItem: jest.fn((key, value) => true),
  };

  Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    service = TestBed.get(LocalStorageService);
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should set item on local storage', () => {
    service.setItem('name', 'John');
    expect(window.localStorage.setItem).toBeCalledWith(`${APP_PREFIX}name`, JSON.stringify('John'));
  });

  it('should get item on local storage', () => {
    service.getItem('name');
    expect(window.localStorage.getItem).toBeCalledWith(`${APP_PREFIX}name`);
  });

  it('should remove item on local storage', () => {
    service.removeItem('name');
    expect(window.localStorage.removeItem).toBeCalledWith(`${APP_PREFIX}name`);
  });
});
