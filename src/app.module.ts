import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitconnectService } from './initconnect/initconnect.service';
import { InitconnectController } from './initconnect/initconnect.controller';
import { UpdateconnectController } from './updateconnect/updateconnect.controller';
import { UpdateconnectService } from './updateconnect/updateconnect.service';
import { GetbetasController } from './getbetas/getbetas.controller';
import { GetbetasService } from './getbetas/getbetas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitconnectModule } from './initconnect/initconnect.module';
import { Autos } from './entity/Autos.entity';
import { AutosModels } from './entity/AutoModels.entity';
import { Connections } from './entity/Connections.entity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeHTMLMiddleware } from './app.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'AutoConnectDB',
      options: {
        useUTC: true,
        encrypt: true,
      },
      synchronize: true,
      logging: true,
      entities: [Autos, AutosModels, Connections],
    }),
    InitconnectModule,
  ],
  controllers: [AppController, UpdateconnectController, GetbetasController],
  providers: [AppService, UpdateconnectService, GetbetasService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ServeHTMLMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
