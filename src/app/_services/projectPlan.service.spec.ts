/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectPlanService } from './projectPlan.service';

describe('Service: ProjectPlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectPlanService]
    });
  });

  it('should ...', inject([ProjectPlanService], (service: ProjectPlanService) => {
    expect(service).toBeTruthy();
  }));
});
