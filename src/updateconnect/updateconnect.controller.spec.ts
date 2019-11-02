import { Test, TestingModule } from '@nestjs/testing';
import { UpdateconnectController } from './updateconnect.controller';

describe('Updateconnect Controller', () => {
  let controller: UpdateconnectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateconnectController],
    }).compile();

    controller = module.get<UpdateconnectController>(UpdateconnectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
