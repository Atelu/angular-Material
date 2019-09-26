import { TestBed } from '@angular/core/testing';

import { GenderGroupService } from './gender-group.service';

describe('GenderGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenderGroupService = TestBed.get(GenderGroupService);
    expect(service).toBeTruthy();
  });
});
