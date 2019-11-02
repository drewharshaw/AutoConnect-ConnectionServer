import { Injectable } from '@nestjs/common';
import { getBetasReq } from './getbetaReq.dto';


@Injectable()
export class GetbetasService {

  private readonly carsDB: getBetasReq[] = [];
  private priorityMatrix: object;

  getBetas(carDetails: getBetasReq) : string {
    console.log(`Returning Priority Matrix of Candidate Beta Vehicles.`);
    return `PriorityMatrix: ${this.priorityMatrix}`;
  }
}
