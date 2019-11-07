import { Injectable } from '@nestjs/common';


@Injectable()
export class GetbetasService {


  private priorityMatrix: object;

  async getBetas(autoId: number) {
    console.log(`Returning Priority Matrix of Candidate Beta Vehicles for Alpha car ${autoId}`);
    // TODO: Call Connection Algorithm
    return `PriorityMatrix: ${this.priorityMatrix}`;
  }
}
