import { TestBed } from '@angular/core/testing';

import { AppPreloadingStrategy } from './app-preloading-strategy';

describe('AppPreloadingStrategyService', () => {
  let service: AppPreloadingStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPreloadingStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
