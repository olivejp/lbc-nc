import { TestBed, inject } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('TestServiceService', () => {

  const mockMessage = 'voici mon message';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
  });

  it('should be created', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));

  it('Message should be inserted', inject([LoggerService], (service: LoggerService) => {
    service.logError(mockMessage);
    service.getMessages().subscribe(msg => expect(msg).toEqual('voici mon message'));
  }));
});
