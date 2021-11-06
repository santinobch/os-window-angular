import { TestBed } from '@angular/core/testing';

import { OsConfigService } from './os-config.service';

describe('OsConfigService', () => {
  let service: OsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
