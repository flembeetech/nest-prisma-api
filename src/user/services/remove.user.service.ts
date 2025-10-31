import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RemoveUserService {
  private readonly logger = new Logger(RemoveUserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async execute(ids: number[]) {
    try {
      if (!ids || ids.length === 0) {
        throw new NotFoundException('Debe proporcionar al menos un ID válido.');
      }

      const result = await this.prisma.user.deleteMany({
        where: {
          id: { in: ids },
        },
      });

      if (result.count === 0) {
        this.logger.warn(
          `No se encontró ningún user con los IDs: [${ids.join(', ')}]`,
        );
        throw new NotFoundException(
          'No se encontraron usuarios con los IDs proporcionados.',
        );
      }

      this.logger.debug(
        `Eliminados ${result.count} user(s): [${ids.join(', ')}]`,
      );
      return {
        message: 'Usuarios eliminados con éxito',
        code: 200,
        deletedCount: result.count,
        deletedIds: ids,
      };
    } catch (error) {
      this.logger.error('Error eliminando usuarios', error.stack);
      throw error;
    }
  }
}
