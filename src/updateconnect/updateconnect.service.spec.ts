import { Test, TestingModule } from '@nestjs/testing';
import { UpdateconnectService } from './updateconnect.service';

describe('UpdateconnectService', () => {
  let service: UpdateconnectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateconnectService],
    }).compile();

    service = module.get<UpdateconnectService>(UpdateconnectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
