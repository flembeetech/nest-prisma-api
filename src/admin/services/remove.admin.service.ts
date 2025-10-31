import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RemoveAdminService {
  private readonly logger = new Logger(RemoveAdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async execute(ids: number[]) {
    try {
      if (!ids || ids.length === 0) {
        throw new NotFoundException('Debe proporcionar al menos un ID válido.');
      }

      const result = await this.prisma.admin.deleteMany({
        where: {
          id: { in: ids },
        },
      });

      if (result.count === 0) {
        this.logger.warn(
          `No se encontró ningún admin con los IDs: [${ids.join(', ')}]`,
        );
        throw new NotFoundException(
          'No se encontraron administradores con los IDs proporcionados.',
        );
      }

      this.logger.debug(
        `Eliminados ${result.count} admin(s): [${ids.join(', ')}]`,
      );
      return {
        message: 'Administradores eliminados con éxito',
        code: 200,
        deletedCount: result.count,
        deletedIds: ids,
      };
    } catch (error) {
      this.logger.error('Error eliminando administradores', error.stack);
      throw error;
    }
  }
}
