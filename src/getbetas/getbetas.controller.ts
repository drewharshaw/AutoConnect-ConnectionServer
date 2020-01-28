/**
 * Getbetas Connection Controller
 * Description: Responsible for handling incoming getbeta requests
 *            and returning the priority matrix.
 */

import { Controller, Post, Body } from '@nestjs/common';
import { GetbetasService } from './getbetas.service';
import { getbetasReq } from './getbetasReq.dto';

@Controller('getbetas')
export class GetbetasController {
  constructor(private readonly service: GetbetasService) {}

  @Post()
  async getBetas(@Body() data: getbetasReq) {
    return this.service.getBetas(data);
  }
}
