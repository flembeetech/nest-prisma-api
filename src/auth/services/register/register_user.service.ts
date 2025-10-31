import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from '../../DTO/register_user.dto';
import { QueryUserService } from 'src/user/services/query.user.service';
import { CreateUserService } from 'src/user/services/create.user.service';

@Injectable()
export class RegisterUserService {
  constructor(
    private queryUserService: QueryUserService,
    private createUserService: CreateUserService,
  ) {}

  async execute(command: RegisterUserDto) {
    try {
      const userExists = await this.queryUserService.findOne({
        email: command.email,
      });

      if (userExists) throw new ForbiddenException('Correo ya registrado');

      const hashedPassword = await bcrypt.hash(command.password, 12);

      const user = await this.createUserService.execute({
        email: command.email,
        password: hashedPassword,
        id_role: command.id_role,
        id_status: command.id_status,
      });

      if (!user) throw new NotFoundException('User no registrado');

      return user;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException('Error registrando el admin');
    }
  }
}
