import axios from 'axios';
import { injectable } from 'tsyringe';
import { CreateSlackDownTimeDTO } from '../dtos/CreateSlackDownTimeDTO';
import downtime from '../views/slack/layouts/downtime';

@injectable()
export default class SendSlackService {
  async execute(message: CreateSlackDownTimeDTO): Promise<any> {
    const obj = downtime(message);

    try {
      await axios.post(
        'https://hooks.slack.com/services/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',
        {
          ...obj,
        }
      );
    } catch (error) {
      console.log(error);
    }

    return true;
  }
}
