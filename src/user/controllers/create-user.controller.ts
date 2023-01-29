import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CREATE_USER_INBOUND_PORT,
  CreateUserInboundPort,
  CreateUserInboundPortInputDto,
  CreateUserInboundPortOutputDto,
} from '../inbound-port/create-user.inbound-port';

@Controller()
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_INBOUND_PORT)
    private readonly createUserInboundPort: CreateUserInboundPort,
  ) {}
  @Post('user/create')
  async createUser(
    @Body() createUserInboundPortInputDto: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto> {
    return await this.createUserInboundPort.execute(
      createUserInboundPortInputDto,
    );
  }
}
