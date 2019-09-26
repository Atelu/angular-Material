import { TestBed } from '@angular/core/testing';

import { ServiceplaceService } from './serviceplace.service';

describe('ServiceplaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceplaceService = TestBed.get(ServiceplaceService);
    expect(service).toBeTruthy();
  });
});
