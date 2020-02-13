/**
 * Init Connection Provider
 * Description: Responsible for injecting dependencies used by the controller.
 */

import { Injectable } from '@nestjs/common';
import { initReq } from './initconnectReq.dto';
import { initRes } from './initconnectRes.dto';
import { Autos } from '../entity/Autos.entity';

@Injectable()
export class InitconnectService {
  async create(data: initReq) {
    let response: initRes = new initRes();
    console.log('Initconnect EndPoint Hit!');
    console.log(`Registering Vehicle ${data.VIN}`);

    try {
      const tuple = await Autos.create(data).save();
      response.Status = 'Success';
      response.AutoId = tuple.AutoId;
      response.TimeCheck = 5.2; //Math.floor(Math.random() * 50 + 20) + 0.2;
    } catch (error) {
      console.log(error);
      response.Status = 'Failed';
    }

    console.log(response);
    return JSON.stringify(response);
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
