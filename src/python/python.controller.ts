/**
 * Python Connection Controller
 * Description: Currently not used as their are no incomming requests made directly to python.
 */

import { Controller, Get, Param } from '@nestjs/common';
import { PythonService } from './python.service';

@Controller('python')
export class GetbetasController {
  constructor(private readonly service: PythonService) {}
}
