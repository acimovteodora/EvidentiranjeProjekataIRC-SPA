/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhaseService } from './phase.service';

describe('Service: Phase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhaseService]
    });
  });

  it('should ...', inject([PhaseService], (service: PhaseService) => {
    expect(service).toBeTruthy();
  }));
});
