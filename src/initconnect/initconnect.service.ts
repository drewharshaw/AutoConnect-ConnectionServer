/**
 * Init Connection Provider
 * Description: Responsible for injecting dependencies used by the controller.
 */

import { Injectable } from '@nestjs/common';
import { initReq } from './initconnectReq.dto';
import { Autos } from '../entity/Autos.entity';

@Injectable()
export class InitconnectService {
  async create(data: initReq) {
    console.log(`Registering Vehicle ${data.VIN}`);
    const tuple = await Autos.create(data).save();
    return `Auto ${tuple.AutoId} Successfully Updated!`;
  }
}

/**
 * This function parses the VIN (Vehicle Identification Number)
 * and returns the modelID
 * @return ModelID
 * @param VIN
 */
function parseVIN(VIN: string): number {
  return 2;
}
