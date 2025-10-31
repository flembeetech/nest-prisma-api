import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QueryAdminService {
  private readonly logger = new Logger(QueryAdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    where?: Prisma.AdminWhereInput;
    orderBy?: Prisma.AdminOrderByWithRelationInput;
    skip?: number;
    take?: number;
    include?: Prisma.AdminInclude;
    select?: Prisma.AdminSelect;
  }) {
    const { where, orderBy, skip, take, include, select } = params || {};

    try {
      const findManyArgs: Prisma.AdminFindManyArgs = {
        where,
        orderBy,
        skip,
        take,
      };

      if (include && !select) {
        findManyArgs.include = include;
      } else if (select && !include) {
        findManyArgs.select = select;
      }

      const admins = await this.prisma.admin.findMany(findManyArgs);

      this.logger.debug(
        `Fetched ${admins.length} admin(s) with filters: ${JSON.stringify(
          where,
        )}`,
      );

      return {
        message: 'Administradores obtenidos con éxito',
        code: 200,
        count: admins.length,
        data: admins,
      };
    } catch (error) {
      this.logger.error('Error fetching admins', error.stack);
      throw error;
    }
  }

  async findOne(where: Prisma.AdminWhereUniqueInput | Prisma.AdminWhereInput) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where,
        include: { user: true },
      });

      if (!admin) {
        this.logger.warn(
          `Admin not found for criteria: ${JSON.stringify(where)}`,
        );
        throw new NotFoundException('Admin no encontrado');
      }

      this.logger.debug(`Fetched admin: ${admin.name ?? admin.id}`);
      return {
        message: 'Admin conseguido con éxito',
        code: 200,
        data: admin,
      };
    } catch (error) {
      this.logger.error(
        `Error fetching admin: ${JSON.stringify(where)}`,
        error.stack,
      );
      throw new NotFoundException('Error al obtener el admin');
    }
  }
}
