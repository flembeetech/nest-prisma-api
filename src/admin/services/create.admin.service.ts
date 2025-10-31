import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from '../dto/create-admin.dto';

@Injectable()
export class CreateAdminService {
  private readonly logger = new Logger(CreateAdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateAdminDto) {
    try {
      const admin = await this.prisma.admin.create({
        data,
      });

      this.logger.debug(`Created admin: ${admin.name ?? admin.id}`);
      return {
        message: 'Admin creado con éxito',
        code: 201,
        data: admin,
      };
    } catch (error) {
      this.logger.error('Error creating admin', error.stack);
      throw error;
    }
  }
}
