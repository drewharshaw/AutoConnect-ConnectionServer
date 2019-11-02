/**
 * Init Connection Provider
 * Description: Responsible for injecting dependencies used by the provider.
 */


import { Injectable } from '@nestjs/common';
import { initReq } from './initconnectReq.dto';


@Injectable()
export class InitconnectService {

  private readonly carsDB: initReq[] = [];
  private AutoID: number = 0;

  initConnection(carDetails: initReq) : string {
    console.log(`Adding carDetails to DB: ${carDetails}`);
    this.carsDB.push(carDetails);
    this.AutoID = this.AutoID + 1;
    return `AutoId: ${this.AutoID}`;
  }
}
