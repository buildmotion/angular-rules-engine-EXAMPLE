/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DoService } from './do.service';

describe('Service: DoService', () => {
  beforeEach(() => {
    addProviders([DoService]);
  });

  it('should ...',
    inject([DoService],
      (service: DoService) => {
        expect(service).toBeTruthy();
      }));
});
