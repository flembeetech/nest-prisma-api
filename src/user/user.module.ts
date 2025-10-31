import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueryUserService } from './services/query.user.service';
import { CreateUserService } from './services/create.user.service';
import { UpdateUserService } from 'src/user/services/update.user.service';
import { RemoveUserService } from './services/remove.user.service';

@Module({
  controllers: [UserController],
  providers: [
    QueryUserService,
    CreateUserService,
    UpdateUserService,
    RemoveUserService,
  ],
  imports: [PrismaModule],
  exports: [
    QueryUserService,
    CreateUserService,
    UpdateUserService,
    RemoveUserService,
  ],
})
export class UserModule {}
