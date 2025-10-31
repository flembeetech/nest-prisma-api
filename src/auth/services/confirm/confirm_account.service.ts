import { Injectable } from '@nestjs/common';
import { TokenService } from '../token/tokens.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserService } from 'src/user/services/update.user.service';
import { WelcomeEmailService } from 'src/email/services/welcomeEmail.service';

@Injectable()
export class ConfirmAccoutService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
    private updateUserService: UpdateUserService,
    private welcomeEmailService: WelcomeEmailService,
  ) {}

  async getRole() {
    return this.prisma.role.findUnique({ where: { name: 'ADMIN' } });
  }

  async getStatus() {
    return this.prisma.status.findUnique({ where: { name: 'ACTIVE' } });
  }

  async execute(token: string) {
    const { id_user, name } = this.tokenService.verify(token);

    const activeStatus = await this.getStatus();

    const user = await this.updateUserService.execute(id_user, {
      id_status: activeStatus.id ?? undefined,
    });

    this.welcomeEmailService.execute({
      email: user.data.email,
      name: name,
      message: 'Te damos la bienvenida.',
    });

    return {
      message: 'Usuario confirmado exitosamente',
      code: 200,
      data: user.data,
    };
  }
}
