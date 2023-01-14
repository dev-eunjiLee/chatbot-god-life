import { Module } from '@nestjs/common';
import { GetUserListController } from './controllers/get-user-list.controller';
import { GetUserListService } from './services/get-user-list.service';
import { GET_USER_LIST_INBOUND_PORT } from './inbound-port/get-user-list.inbound-port';
import { GET_USER_LIST_OUTBOUND_PORT } from './oubound-port/get-user-list.outbound-port';
import { GetUserListOutboundAdapter } from './outbound-adapter/get-user-list.outbound-adapter';

@Module({
  controllers: [GetUserListController],
  providers: [
    {
      provide: GET_USER_LIST_INBOUND_PORT,
      useClass: GetUserListService,
    },
    {
      provide: GET_USER_LIST_OUTBOUND_PORT,
      useClass: GetUserListOutboundAdapter,
    },
  ],
})
export class UserModule {}
