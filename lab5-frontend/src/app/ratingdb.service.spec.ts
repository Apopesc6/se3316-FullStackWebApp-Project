import { TestBed } from '@angular/core/testing';

import { RatingdbService } from './ratingdb.service';

describe('RatingdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatingdbService = TestBed.get(RatingdbService);
    expect(service).toBeTruthy();
  });
});
