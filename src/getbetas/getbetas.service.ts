import { Injectable, Logger } from '@nestjs/common';
import { Autos } from '../entity/Autos.entity';
import { getConnection, Db } from 'typeorm';
import { PythonShell } from 'python-shell';
import { config } from './python.config';
import { getbetasReq } from './getbetasReq.dto';

@Injectable()
export class GetbetasService {
  private shell: PythonShell;

  /**
   * pythonScript executes the python shell script and returns its output
   * @param data
   */
  private async pythonScript(data) {
    // create instance of connection algorithm
    this.shell = new PythonShell(
      `${__dirname}/Connection-Algorithm.py`,
      config,
    );
    //send data request to connection algorithm
    this.shell.send(data);
    const priorityMatrix = await this.onExit(this.shell);

    console.log(`Python Service Completed ${priorityMatrix['Status']}`);
    return priorityMatrix;
  }

  /**
   * onExit waits for the python shell's output and returns stdout
   * @param shell
   */
  public onExit(shell: PythonShell): Promise<void> {
    return new Promise((resolve, reject) => {
      shell.on('message', message => {
        message.Status === 'Success' ? resolve(message) : reject(message);
      });
    });
  }

  /**
   * getBetas queries DB finding nearby Beta Candidates, piping into the
   * connection algorithm and returning the priority matrix
   * @param reqData
   */
  async getBetas(reqData: getbetasReq) {
    console.log(`getBetas EndPoint Called!`);

    // Calculate inner connection radius bound
    /* 
    const [InnerLatOffset, InnerLongOffset] = metersToCoords(
      reqData.PositionX,
      10,
    );
    */

    //console.log( `OuterLat = ${OuterLatOffset}, OuterLong = ${OuterLongOffset}, InnerLat = ${InnerLatOffset}, InnerLong = ${InnerLongOffset}`,);

    /*
     `SELECT * from Autos WHERE Terminated = 0 AND PositionX <= ${reqData.PositionX +
        OuterLatOffset} AND PositionX >= ${reqData.PositionX + InnerLatOffset}
      OR PositionX >= ${reqData.PositionX -
        OuterLatOffset} AND PositionX <= ${reqData.PositionX - InnerLatOffset} 
      AND 
      PositionY >= ${reqData.PositionY -
        OuterLongOffset} AND PositionY <= ${reqData.PositionY -
        InnerLongOffset} 
      OR PositionY <= ${reqData.PositionY +
        OuterLongOffset} AND PositionY >= ${reqData.PositionY +
        InnerLongOffset};`,
    
    
    */

    // Calculate outer connetion radius bound
    const [OuterLatOffset, OuterLongOffset] = metersToCoords(
      reqData.PositionX,
      reqData.PositionY,
      reqData.ConnectionRadius, // make 50 meters
    );

    console.log(`Lat = ${OuterLatOffset} Long = ${OuterLongOffset}`);

    // collect all available Beta candidates within OuterRadius but not in InnerRadius
    const betaCandidates = await getConnection().query(
      `SELECT * from Autos WHERE Terminated = 0 AND PositionX <= ${reqData.PositionX +
        OuterLatOffset} AND PositionX >= ${reqData.PositionX - OuterLatOffset}
          AND PositionY <= ${reqData.PositionY +
            OuterLongOffset} AND PositionY >= ${reqData.PositionY -
        OuterLongOffset};`,
    );

    //console.table(betaCandidates);

    const pythonInput = {
      BetaList: [...betaCandidates],
      AlphaVehicle: reqData,
    };

    //console.log(pythonInput);

    //call python connection algorithm
    const output = await this.pythonScript(pythonInput);

    //console.log(`Python Output = ${output}`);
    return JSON.stringify(output);
  }
}

function metersToCoords(xPosition: number, yPosition: number, radius: number) {
  // similar methode (40075000 / 360) = 111,111
  const latitudeOffset = radius / (111.32 * 1000);
  const longitudeOffset = radius / (111111 * Math.cos(xPosition));

  return [latitudeOffset, longitudeOffset];
}
