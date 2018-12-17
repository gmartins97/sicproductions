import { TestBed } from '@angular/core/testing';

import { SurfaceFinishService } from './surface-finish.service';

describe('SurfaceFinishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurfaceFinishService = TestBed.get(SurfaceFinishService);
    expect(service).toBeTruthy();
  });
});
