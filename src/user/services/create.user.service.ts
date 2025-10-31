import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data,
      });

      this.logger.debug(`Created user: ${user.email ?? user.id}`);
      return {
        message: 'Usuario creado con éxito',
        code: 201,
        data: user,
      };
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw error;
    }
  }
}
