import { Injectable } from '@nestjs/common';
import { updateReq } from './updateconnectReq.dto';
import { Autos} from '../entity/Autos.entity';

@Injectable()
export class UpdateconnectService {

  async update(data: updateReq) {
    
    console.log(`Updating Vehicle AutoId = ${data.AutoId}!`);
    const autoId: number = data.AutoId;
    delete data.AutoId;
    await Autos.update(autoId,data);
    return `Auto ${autoId} Successfully Updated!`;
  }
}
