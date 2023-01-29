import { Module } from '@nestjs/common';
import { CREATE_USER_INBOUND_PORT } from './inbound-port/create-user.inbound-port';
import { CreateUserService } from './services/create-user.service';

@Module({
  providers: [
    {
      provide: CREATE_USER_INBOUND_PORT,
      useClass: CreateUserService,
    },
  ],
})
export class UserModule {}
