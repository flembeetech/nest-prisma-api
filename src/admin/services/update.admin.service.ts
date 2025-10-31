import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAdminDto } from '../dto/update-admin.dto';

@Injectable()
export class UpdateAdminService {
  private readonly logger = new Logger(UpdateAdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, data: UpdateAdminDto) {
    try {
      const admin = await this.prisma.admin.update({
        where: { id },
        data,
      });

      this.logger.debug(`Updated admin: ${admin.name ?? admin.id}`);
      return {
        message: 'Admin actualizado con éxito',
        code: 200,
        data: admin,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Admin no encontrado');
      }

      this.logger.error('Error updating admin', error.stack);
      throw error;
    }
  }
}
