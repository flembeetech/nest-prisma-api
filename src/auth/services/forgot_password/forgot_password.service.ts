import { ForbiddenException, Injectable } from '@nestjs/common';
import { ForgotPasswordDto } from '../../DTO/forgot_password.dto';
import { TokenService } from '../token/tokens.service';
import { QueryUserService } from 'src/user/services/query.user.service';
import { ForgotPasswordEmailService } from 'src/email/services/forgotPassword.service';
@Injectable()
export class ForgotPasswordService {
  constructor(
    private forgotPasswordEmailService: ForgotPasswordEmailService,
    private getUserService: QueryUserService,
    private tokenService: TokenService,
  ) {}

  async execute(command: ForgotPasswordDto) {
    const user = await this.getUserService.findOne({ email: command.email });

    if (!user.data) {
      throw new ForbiddenException({
        message: 'Invalid credentials',
      });
    }

    const forgotToken = this.tokenService.generateForgotToken({
      email: user.data.email,
      id_user: user.data.id,
    });

    const resetLink = `${process.env.APP_HOST}/reset-password?token=${forgotToken}`;
    const websiteLink = `${process.env.APP_HOST}`;

    await this.forgotPasswordEmailService.execute({
      name: user.data.email,
      email: user.data.email,
      resetLink: resetLink,
      websiteLink: websiteLink,
    });

    return {
      code: 200,
      message: 'A password reset link has been sent to your email.',
    };
  }
}
