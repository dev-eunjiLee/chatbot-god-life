import {
  CreateUserOutboundPort,
  CreateUserOutboundPortInputDto,
  CreateUserOutboundPortOutputDto,
} from '../outbound-port/create-user.outbound-port';

export class CreateUserOutboundAdapter implements CreateUserOutboundPort {
  execute(
    params: CreateUserOutboundPortInputDto,
  ): Promise<CreateUserOutboundPortOutputDto> {
    return Promise.resolve();
  }
}
