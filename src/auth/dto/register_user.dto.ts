import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id_status: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id_role: number;
}
