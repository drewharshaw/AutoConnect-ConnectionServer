import { Test, TestingModule } from '@nestjs/testing';
import { GetbetasController } from './getbetas.controller';

describe('Getbetas Controller', () => {
  let controller: GetbetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetbetasController],
    }).compile();

    controller = module.get<GetbetasController>(GetbetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
