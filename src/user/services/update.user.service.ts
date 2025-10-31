import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UpdateUserService {
  private readonly logger = new Logger(UpdateUserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });

      this.logger.debug(`Updated user: ${user.id}`);
      return {
        message: 'User actualizado con éxito',
        code: 200,
        data: user,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User no encontrado');
      }

      this.logger.error('Error updating user', error.stack);
      throw error;
    }
  }
}
