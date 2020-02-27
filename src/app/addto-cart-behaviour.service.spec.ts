import { TestBed } from '@angular/core/testing';

import { AddtoCartBehaviourService } from './addto-cart-behaviour.service';

describe('AddtoCartBehaviourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddtoCartBehaviourService = TestBed.get(AddtoCartBehaviourService);
    expect(service).toBeTruthy();
  });
});
