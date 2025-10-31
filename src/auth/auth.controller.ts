import {
  Controller,
  Post,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from './dto';
import { Response } from 'express';
import { TokenService } from './services/token/tokens.service';
import { ForgotPasswordService } from './services/forgot_password/forgot_password.service';
import { LoginService } from './services/login/login.service';
import { ConfirmAccoutService } from './services/confirm/confirm_account.service';
import { ResetPasswordService } from './services/reset_password/reset_password.service';
import { RegisterAdminDto } from './DTO/register_admin.dto';
import { RegisterAdminService } from './services/register/register_admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private tokenService: TokenService,
    private forgotPasswordService: ForgotPasswordService,
    private resetPasswordService: ResetPasswordService,
    private loginService: LoginService,
    private registerAdminService: RegisterAdminService,
    private confirmAccountService: ConfirmAccoutService,
  ) {}

  @Post('signup/admin')
  async signupAdmin(@Body() registerUserDto: RegisterAdminDto) {
    return this.registerAdminService.execute(registerUserDto);
  }

  @Post('register/admin')
  @HttpCode(HttpStatus.CREATED)
  async registerAdmin(@Body() registerUserDto: RegisterAdminDto) {
    return this.registerAdminService.execute({
      ...registerUserDto,
    });
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() response: Response) {
    try {
      const resp = await this.loginService.execute(dto);
      const { accessToken, refreshToken } = resp;

      response.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      });

      response.json({ accessToken });
    } catch (e) {
      response.status(e.status).json(e);
    }
  }

  @Post('forgot-password')
  async forgot(@Body() dto: ForgotPasswordDto) {
    return this.forgotPasswordService.execute(dto);
  }

  @Patch('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto, @Query('token') token: string) {
    return this.resetPasswordService.execute(token, dto);
  }

  @Get('confirm-email')
  confirmAccount(@Query('token') token: string) {
    return this.confirmAccountService.execute(token);
  }

  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('refreshToken');
    response.send({ message: 'Logged out' });
  }
}
