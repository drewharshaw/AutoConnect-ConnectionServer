import { Test, TestingModule } from '@nestjs/testing';
import { InitconnectService } from './initconnect.service';

describe('InitconnectionService', () => {
  let service: InitconnectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitconnectService],
    }).compile();

    service = module.get<InitconnectService>(InitconnectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
