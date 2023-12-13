import { TestBed } from '@angular/core/testing';

import { TagMappingService } from './tag-mapping.service';

describe('TagMappingService', () => {
  let service: TagMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
