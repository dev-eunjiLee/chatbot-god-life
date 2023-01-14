import { Controller, Get, Inject } from '@nestjs/common';
import {
  GET_USER_LIST_INBOUND_PORT,
  GetUserListInboundPort,
} from '../inbound-port/get-user-list.inbound-port';

@Controller()
export class GetUserListController {
  constructor(
    @Inject(GET_USER_LIST_INBOUND_PORT)
    private readonly getUserListInboundPort: GetUserListInboundPort,
  ) {}
  @Get('/user-list')
  async getUserList() {
    return await this.getUserListInboundPort.execute();
  }
}
