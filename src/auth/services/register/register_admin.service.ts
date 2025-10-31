import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserService } from './register_user.service';
import { RegisterAdminDto } from '../../DTO/register_admin.dto';
import { TokenService } from '../token/tokens.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminService } from 'src/admin/services/create.admin.service';
import { ConfirmEmailService } from 'src/email/services/confirmEmail.service';

@Injectable()
export class RegisterAdminService {
  constructor(
    private prisma: PrismaService,
    private registerUserService: RegisterUserService,
    private createAdminService: CreateAdminService,
    private confirmEmailService: ConfirmEmailService,
    private tokenService: TokenService,
  ) {}

  async getRole() {
    return this.prisma.role.findUnique({ where: { name: 'ADMIN' } });
  }

  async getStatus() {
    return this.prisma.status.findUnique({ where: { name: 'PENDING' } });
  }

  async execute(command: RegisterAdminDto) {
    try {
      const role = await this.getRole();
      if (!role) throw new NotFoundException('Rol ADMIN no encontrado');

      const pendingStatus = await this.getStatus();
      if (!pendingStatus)
        throw new NotFoundException('Status PENDING no encontrado');

      const user = await this.registerUserService.execute({
        email: command.email,
        password: command.password,
        id_role: role.id,
        id_status: pendingStatus.id,
      });

      const admin = await this.createAdminService.execute({
        name: command.name,
        lastname: command.lastname,
        id_user: user.data.id,
      });

      if (!admin) throw new NotFoundException('Admin no registrado');

      const confirmationToken = this.tokenService.generateConfirmationToken({
        name: command.name,
        email: command.email,
        id_user: user.data.id,
        role: 'ADMIN',
      });

      this.confirmEmailService.admin({
        email: user.data.email,
        name: command.name + ' ' + command.lastname,
        confirmLink: `${process.env.YET_HOST}/confirm-admin?token=${confirmationToken}`,
        message:
          'Se ha creado una nueva cuenta de usuario que requiere su confirmación.',
      });

      const tokens = this.tokenService.sendTokens({
        id: admin.data.id,
        name: admin.data.name + ' ' + admin.data.lastname,
        id_user: user.data.id,
        email: user.data.email,
        isAdmin: true,
        role: 'ADMIN',
      });

      return tokens;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException('Error registrando el admin');
    }
  }
}
