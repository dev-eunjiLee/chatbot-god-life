export type CreateUserOutboundPortInputDto = void;
export type CreateUserOutboundPortOutputDto = void;

export interface CreateUserOutboundPort {
  execute(
    params: CreateUserOutboundPortInputDto,
  ): Promise<CreateUserOutboundPortOutputDto>;
}
