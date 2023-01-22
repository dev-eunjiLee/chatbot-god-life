import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  GET_USER_LIST_INBOUND_PORT,
  GET_USER_LIST_OPTION,
  GetUserListInboundPort,
} from '../inbound-port/get-user-list.inbound-port';

@Controller()
export class GetUserListController {
  constructor(
    @Inject(GET_USER_LIST_INBOUND_PORT)
    private readonly getUserListInboundPort: GetUserListInboundPort,
  ) {}
  @Get('/user-list/:option/:length?')
  async getUserList(
    @Param('option') option: GET_USER_LIST_OPTION,
    @Param('length') length?: number | undefined,
  ) {
    return await this.getUserListInboundPort.execute({ option, length });
  }
}
