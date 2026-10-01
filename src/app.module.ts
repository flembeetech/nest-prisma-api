import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email';
import { CustomHttpModule } from './http/http.module';
import { RealstateModule } from './realstate/realstate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomHttpModule,
    PrismaModule,
    AuthModule,
    AdminModule,
    EmailModule,
    UserModule,
    RealstateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

