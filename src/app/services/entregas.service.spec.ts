import { TestBed } from '@angular/core/testing';

import { EntregasService } from './entregas.service';

describe('EntregasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntregasService = TestBed.get(EntregasService);
    expect(service).toBeTruthy();
  });
});
