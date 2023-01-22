export type CreateUserInboundPortInputDto = void;
export type CreateUserInboundPortOutputDto = void;

export interface CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto>;
}
