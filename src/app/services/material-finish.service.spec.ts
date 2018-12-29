import { TestBed } from '@angular/core/testing';

import { MaterialFinishService } from './material-finish.service';

describe('MaterialFinishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialFinishService = TestBed.get(MaterialFinishService);
    expect(service).toBeTruthy();
  });
});
