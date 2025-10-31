import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { TokenService } from './services/token/tokens.service';
import { ForgotPasswordService } from './services/forgot_password/forgot_password.service';
import { RegisterUserService } from './services/register/register_user.service';
import { LoginService } from './services/login/login.service';
import { QueryAdminService } from '../admin/services/query.admin.service';
import { CreateAdminService } from '../admin/services/create.admin.service';
import { RegisterAdminService } from './services/register/register_admin.service';
import { ConfirmAccoutService } from './services/confirm/confirm_account.service';
import { GetUserByIdUserService } from './services/aplication/get_user_by_id_user.service';
import { ResetPasswordService } from './services/reset_password/reset_password.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueryUserService } from 'src/user/services/query.user.service';
import { CreateUserService } from 'src/user/services/create.user.service';
import { ConfirmEmailService } from 'src/email/services/confirmEmail.service';
import { UpdateUserService } from 'src/user/services/update.user.service';
import { WelcomeEmailService } from 'src/email/services/welcomeEmail.service';
import { ForgotPasswordEmailService } from 'src/email/services/forgotPassword.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    LoginService,
    ConfigService,
    ConfirmEmailService,
    RegisterAdminService,
    TokenService,
    GetUserByIdUserService,
    ConfirmAccoutService,
    QueryAdminService,
    CreateAdminService,
    QueryUserService,
    CreateUserService,
    UpdateUserService,
    WelcomeEmailService,
    ForgotPasswordEmailService,
    ForgotPasswordService,
    ResetPasswordService,
    RegisterUserService,
    JwtService,
  ],
})
export class AuthModule {}
