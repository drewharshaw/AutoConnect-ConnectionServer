import { Test, TestingModule } from '@nestjs/testing';
import { GetbetasService } from './getbetas.service';

describe('GetbetasService', () => {
  let service: GetbetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetbetasService],
    }).compile();

    service = module.get<GetbetasService>(GetbetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
