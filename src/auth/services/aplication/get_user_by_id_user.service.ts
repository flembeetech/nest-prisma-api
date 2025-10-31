import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserByUserIdDto } from '../../DTO/get_user_by_user_id.dto';
import { QueryAdminService } from 'src/admin/services/query.admin.service';
import { UserResponseDto } from 'src/auth/dto/user_response.dto';

@Injectable()
export class GetUserByIdUserService {
  constructor(private getAdminService: QueryAdminService) {}

  async execute(command: GetUserByUserIdDto): Promise<UserResponseDto> {
    switch (command.role) {
      case 'ADMIN': {
        const admin = await this.getAdminService.findOne({
          user: { id: command.id_user },
        });

        if (!admin?.data)
          throw new NotFoundException('Admin no encontrado para el usuario');
        return {
          id: admin.data.id,
          id_user: admin.data.user.id,
          email: admin.data.user.email,
          name: admin.data.name + ' ' + admin.data.lastname,
          status: 'ACTIVE',
          role: 'ADMIN',
        };
      }
      default:
        throw new NotFoundException('Role no encontrado');
    }
  }
}
