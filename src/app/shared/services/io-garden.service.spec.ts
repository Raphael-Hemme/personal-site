import { TestBed } from '@angular/core/testing';

import { IoGardenService } from './io-garden.service';

describe('IoGardenService', () => {
  let service: IoGardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IoGardenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
