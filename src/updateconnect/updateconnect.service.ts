import { Injectable } from '@nestjs/common';
import { updateReq } from './updateconnectReq.dto';
import { Autos } from '../entity/Autos.entity';

@Injectable()
export class UpdateconnectService {
  async update(data: updateReq) {
    console.log('Updateconnect EndPoint Hit!');

    let response = {};

    try {
      console.log(`Updating Vehicle AutoId = ${data.AutoId}!`);
      console.log(data);
      const autoId: number = data.AutoId;
      delete data.AutoId;
      await Autos.update(autoId, data);
      response['Status'] = 'Success';
      response['AutoId'] = autoId;
    } catch (error) {
      console.log(error);
      response['Status'] = 'Failed';
    }
    return response;
  }
}
