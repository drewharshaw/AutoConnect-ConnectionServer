/**
 * Getbetas Connection Controller
 * Description: Responsible for handling incoming getbeta requests
 *            and returning the priority matrix.
 */

import { Controller, Get, Param } from '@nestjs/common';
import { GetbetasService } from './getbetas.service';

@Controller('getbetas')
export class GetbetasController {
  constructor(private readonly service: GetbetasService) {}

  @Get(':id')
  async getBetas(@Param() reqParam): Promise<string> {
    return this.service.getBetas(reqParam.id);
  }
}
