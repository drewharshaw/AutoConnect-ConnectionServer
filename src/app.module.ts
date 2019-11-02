import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitconnectService } from './initconnect/initconnect.service';
import { InitconnectController } from './initconnect/initconnect.controller';
import { UpdateconnectController } from './updateconnect/updateconnect.controller';
import { UpdateconnectService } from './updateconnect/updateconnect.service';
import { GetbetasController } from './getbetas/getbetas.controller';
import { GetbetasService } from './getbetas/getbetas.service';

@Module({
  imports: [],
  controllers: [AppController, InitconnectController, UpdateconnectController, GetbetasController],
  providers: [AppService, InitconnectService, UpdateconnectService, GetbetasService],
})
export class AppModule {}
