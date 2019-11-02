import { Test, TestingModule } from '@nestjs/testing';
import { InitconnectController } from './initconnect.controller';

describe('Initconnection Controller', () => {
  let controller: InitconnectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitconnectController],
    }).compile();

    controller = module.get<InitconnectController>(InitconnectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
