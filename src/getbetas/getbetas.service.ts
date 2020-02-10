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

    // Calculate outer connetion radius bound
    const [OuterLatOffset, OuterLongOffset] = metersToCoords(
      reqData.PositionX,
      reqData.ConnectionRadius,
    );

    // Calculate inner connection radius bound
    const [InnerLatOffset, InnerLongOffset] = metersToCoords(
      reqData.PositionX,
      50,
    );

    //console.log( `OuterLat = ${OuterLatOffset}, OuterLong = ${OuterLongOffset}, InnerLat = ${InnerLatOffset}, InnerLong = ${InnerLongOffset}`,);

    // collect all available Beta candidates within OuterRadius but not in InnerRadius
    const betaCandidates = await getConnection().query(
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

function metersToCoords(xPosition: number, radius: number) {
  const latitudeOffset = 1 / (40075000 / 360 / radius);
  const longitudeOffset = 1 / ((40075000 * Math.cos(xPosition)) / 360 / radius);

  return [latitudeOffset, longitudeOffset];
}
