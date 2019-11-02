/**
 * Init Connection Controller
 * Description: Responsible for handling incoming initial requests
 *            and returning AutoConnect autoID.
 */


import { Controller, Post, Body } from '@nestjs/common';
import { InitconnectService } from './initconnect.service';
import { initReq } from './initconnectReq.dto';


@Controller('initconnect')
export class InitconnectController {
    constructor(private readonly service: InitconnectService) {}

    @Post()
    async initConnection(@Body() reqParam: initReq) {
      return this.service.initConnection(reqParam);
    }
}
