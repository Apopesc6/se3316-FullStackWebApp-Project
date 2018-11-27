import { TestBed } from '@angular/core/testing';

import { CollectiondbService } from './collectiondb.service';

describe('CollectiondbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectiondbService = TestBed.get(CollectiondbService);
    expect(service).toBeTruthy();
  });
});
