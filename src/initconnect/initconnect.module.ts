import { Module } from '@nestjs/common';
import { InitconnectController } from './initconnect.controller';
import { InitconnectService } from './initconnect.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autos } from '../entity/Autos.entity';



@Module({
    imports: [TypeOrmModule.forFeature([Autos])],
    controllers: [InitconnectController],
    providers: [InitconnectService],
})
export class InitconnectModule {}
