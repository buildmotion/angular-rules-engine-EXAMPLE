/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DoHttpService } from './do-http.service';

describe('Service: DoHttp', () => {
  beforeEach(() => {
    addProviders([DoHttpService]);
  });

  it('should ...',
    inject([DoHttpService],
      (service: DoHttpService) => {
        expect(service).toBeTruthy();
      }));
});
