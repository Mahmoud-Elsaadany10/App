import { TestBed } from '@angular/core/testing';

import { sharedservice } from './shared.service';

describe('SharedService', () => {
  let service: sharedservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(sharedservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
