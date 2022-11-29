import { TestBed } from '@angular/core/testing';

import { SelectedSeatService } from './selected-seat.service';

describe('SelectedSeatService', () => {
  let service: SelectedSeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedSeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
