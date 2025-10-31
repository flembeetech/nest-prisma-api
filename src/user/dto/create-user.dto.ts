import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'maria.perez@moa.edu' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(120)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 1, description: 'ID de la tabla Status' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_status: number;

  @ApiProperty({ example: 1, description: 'ID de la tabla Role' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_role: number;
}
