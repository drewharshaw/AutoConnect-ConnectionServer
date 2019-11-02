import { Injectable } from '@nestjs/common';
import { updateReq } from './updateconnectReq.dto';


@Injectable()
export class UpdateconnectService {

  private readonly carsDB: updateReq[] = [];
  private count: number = 0;

  updateConnection(carDetails: updateReq) : string {
    console.log(`Updating Vehicle ${carDetails.AutoId} !`);
    this.carsDB.push(carDetails);
    this.count = this.count + 1;
    return `SSID: Network${this.count}`;
  }
}
