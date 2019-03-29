import { TestBed } from '@angular/core/testing';

import { ClassdataService } from './classdata.service';

describe('ClassdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassdataService = TestBed.get(ClassdataService);
    expect(service).toBeTruthy();
  });
});
