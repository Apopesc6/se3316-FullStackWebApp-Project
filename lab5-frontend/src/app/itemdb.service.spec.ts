import { TestBed } from '@angular/core/testing';

import { ItemdbService } from './itemdb.service';

describe('ItemdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemdbService = TestBed.get(ItemdbService);
    expect(service).toBeTruthy();
  });
});
