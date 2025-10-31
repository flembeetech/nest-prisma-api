import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminEntity } from './entities/admin.entity';
import { QueryAdminService } from './services/query.admin.service';
import { CreateAdminService } from './services/create.admin.service';
import { UpdateAdminService } from './services/update.admin.service';
import { RemoveAdminService } from './services/remove.admin.service';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(
    private readonly queryAdminService: QueryAdminService,
    private readonly createAdminService: CreateAdminService,
    private readonly updateAdminService: UpdateAdminService,
    private readonly removeAdminService: RemoveAdminService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: AdminEntity })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.createAdminService.execute(createAdminDto);
  }

  @Get()
  @ApiOkResponse({ type: AdminEntity, isArray: true })
  findAll() {
    return this.queryAdminService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AdminEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryAdminService.findOne({ id });
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: AdminEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.updateAdminService.execute(id, updateAdminDto);
  }

  @Delete()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: { type: 'integer' },
          example: [1, 2, 3],
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Administradores eliminados con éxito' })
  async remove(@Body('ids') ids: number[]) {
    return this.removeAdminService.execute(ids);
  }
}
