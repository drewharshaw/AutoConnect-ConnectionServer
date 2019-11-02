/**
 * Init Connection Controller
 * Description: Responsible for handling incoming initial requests
 *            and returning AutoConnect autoID.
 */


import { Controller, Post, Body } from '@nestjs/common';
import { GetbetasService } from './getbetas.service';
import { getBetasReq } from './getbetaReq.dto';


@Controller('getbetas')
export class GetbetasController {
    constructor(private readonly service: GetbetasService) {}

    @Post()
    async getBetas(@Body() reqParam: getBetasReq) {
      return this.service.getBetas(reqParam);
    }
}
