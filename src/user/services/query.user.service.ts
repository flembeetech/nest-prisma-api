import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QueryUserService {
  private readonly logger = new Logger(QueryUserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    skip?: number;
    take?: number;
    include?: Prisma.UserInclude;
    select?: Prisma.UserSelect;
  }) {
    const { where, orderBy, skip, take, include, select } = params || {};

    try {
      const findManyArgs: Prisma.UserFindManyArgs = {
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

      const users = await this.prisma.user.findMany(findManyArgs);

      this.logger.debug(
        `Fetched ${users.length} user(s) with filters: ${JSON.stringify(
          where,
        )}`,
      );

      return {
        message: 'Usuarios obtenidos con éxito',
        code: 200,
        count: users.length,
        data: users,
      };
    } catch (error) {
      this.logger.error('Error fetching users', error.stack);
      throw error;
    }
  }

  async findOne(where: Prisma.UserWhereUniqueInput | Prisma.UserWhereInput) {
    try {
      const user = await this.prisma.user.findFirst({
        where,
        include: { role: true, status: true },
      });

      if (!user) {
        this.logger.warn(
          `User not found for criteria: ${JSON.stringify(where)}`,
        );
        throw new NotFoundException('Usuario no encontrado');
      }

      this.logger.debug(`Fetched user: ${user.email ?? user.id}`);
      return {
        message: 'Usuario conseguido con éxito',
        code: 200,
        data: user,
      };
    } catch (error) {
      this.logger.error(
        `Error fetching user: ${JSON.stringify(where)}`,
        error.stack,
      );
      throw new NotFoundException('Error al obtener el usuario');
    }
  }
}
