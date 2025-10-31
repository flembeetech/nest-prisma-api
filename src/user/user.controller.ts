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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { QueryUserService } from './services/query.user.service';
import { UpdateUserService } from './services/update.user.service';
import { CreateUserService } from './services/create.user.service';
import { RemoveUserService } from './services/remove.user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly queryUserService: QueryUserService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly removeUserService: RemoveUserService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.queryUserService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryUserService.findOne({ id });
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserService.execute(id, updateUserDto);
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
  @ApiOkResponse({ description: 'Usuarios eliminados con éxito' })
  async remove(@Body('ids') ids: number[]) {
    return this.removeUserService.execute(ids);
  }
}
