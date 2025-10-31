import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../DTO';
import { TokenService } from '../token/tokens.service';
import { GetUserByIdUserService } from '../aplication/get_user_by_id_user.service';
import { QueryUserService } from 'src/user/services/query.user.service';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    private queryUserService: QueryUserService,
    private tokenService: TokenService,
    private getUserByIdUserService: GetUserByIdUserService,
  ) {}

  async execute(command: LoginDto) {
    try {
      const user = await this.queryUserService.findOne({
        email: command.email,
      });

      if (!user.data) {
        this.logger.warn(
          `Login attempt with unregistered email: ${command.email}`,
        );
        throw new ForbiddenException({
          message: 'Credenciales inválidas',
        });
      }

      const passwordMatches = await bcrypt.compare(
        command.password,
        user.data.password,
      );

      if (!passwordMatches) {
        this.logger.warn(`Invalid credentials for email: ${command.email}`);
        throw new ForbiddenException({
          message: 'Credenciales inválidas',
        });
      }

      const responseUser = await this.getUserByIdUserService.execute({
        id_user: user.data.id,
        role: user.data.role.name,
      });

      if (responseUser.status !== 'ACTIVE')
        throw new ForbiddenException(
          'Debe confirmar su cuenta por email antes de iniciar sesión',
        );

      this.logger.log(`User logged in: ${command.email}`);
      return this.tokenService.sendTokens({
        id: responseUser.id,
        id_user: user.data.id,
        name: responseUser.name,
        email: user.data.email,
        isAdmin: user.data.role.name === 'ADMIN',
        role: user.data.role.name,
      });
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      this.logger.error(
        `Login failed for email: ${command.email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Fallo al iniciar sesion');
    }
  }
}
