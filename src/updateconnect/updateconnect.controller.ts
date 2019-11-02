/**
 * Update Connection Controller
 * Description: Responsible for handling update information requests
 *              from all vehicles and returning the SSID to the client.
 */

import { Controller, Post, Body } from '@nestjs/common';
import { updateReq } from './updateconnectReq.dto';
import { UpdateconnectService } from './updateconnect.service';

@Controller('updateconnect')
export class UpdateconnectController {
    constructor(private readonly service: UpdateconnectService){}

    @Post()
    async updateConnection(@Body() reqParam: updateReq) {
        return this.service.updateConnection(reqParam);
    }
}
