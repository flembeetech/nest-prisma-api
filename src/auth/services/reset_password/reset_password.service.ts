import { ForbiddenException, Injectable } from '@nestjs/common';
import { ResetPasswordDto } from '../../DTO/reset_password.dto';
import { TokenService } from '../token/tokens.service';

import * as bcrypt from 'bcrypt';
import { QueryUserService } from 'src/user/services/query.user.service';
import { UpdateUserService } from 'src/user/services/update.user.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    private getUserService: QueryUserService,
    private tokenService: TokenService,
    private updateUserService: UpdateUserService,
  ) {}

  async execute(token: string, command: ResetPasswordDto) {
    const { newPassword } = command;

    const payload = this.tokenService.verify(token);

    const user = await this.getUserService.findOne({ email: payload.email });

    if (!user.data) {
      throw new ForbiddenException({
        message: 'Invalid credentials',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.updateUserService.execute(payload.id_user, {
      password: hashedPassword,
    });

    return {
      code: 200,
      message: 'Contraseña actualizada correctamente',
    };
  }
}
