import {
  GetUserListInboundPort,
  GetUserListInboundPortInputDto,
  GetUserListInboundPortOutputDto,
} from '../inbound-port/get-user-list.inbound-port';
import { Inject, Injectable } from '@nestjs/common';
import {
  GET_USER_LIST_OUTBOUND_PORT,
  GetUserListOutboundPort,
} from '../oubound-port/get-user-list.outbound-port';

@Injectable()
export class GetUserListService implements GetUserListInboundPort {
  constructor(
    @Inject(GET_USER_LIST_OUTBOUND_PORT)
    private readonly getUserListOutboundPort: GetUserListOutboundPort,
  ) {}
  async execute(
    params: GetUserListInboundPortInputDto,
  ): Promise<GetUserListInboundPortOutputDto> {
    return await this.getUserListOutboundPort.execute();
  }
}
