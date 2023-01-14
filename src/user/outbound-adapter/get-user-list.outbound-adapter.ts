import {
  GetUserListOutboundPort,
  GetUserListOutboundPortInputDto,
  GetUserListOutboundPortOutputDto,
} from '../oubound-port/get-user-list.outbound-port';
import { TempUserDatabase } from '../../lib/temp-user-database';

export class GetUserListOutboundAdapter implements GetUserListOutboundPort {
  async execute(
    params: GetUserListOutboundPortInputDto,
  ): Promise<GetUserListOutboundPortOutputDto> {
    return await TempUserDatabase.getUserList();
  }
}
