import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueryAdminService } from './services/query.admin.service';
import { CreateAdminService } from './services/create.admin.service';
import { UpdateAdminService } from './services/update.admin.service';
import { RemoveAdminService } from './services/remove.admin.service';
@Module({
  controllers: [AdminController],
  providers: [
    QueryAdminService,
    CreateAdminService,
    UpdateAdminService,
    RemoveAdminService,
  ],
  imports: [PrismaModule],
})
export class AdminModule {}
