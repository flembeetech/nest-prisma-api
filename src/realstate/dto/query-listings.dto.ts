import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class QueryListingsDto {
  @ApiPropertyOptional({
    description: 'Cantidad de resultados por página (hasta 40)',
    default: 40,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Desplazamiento para paginación (offset)',
    default: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    description: 'Tipo de operación',
    enum: ['venta', 'alquiler'],
    required: false,
  })
  @IsOptional()
  @IsString()
  operacion?: string;

  @ApiPropertyOptional({
    description: 'Ciudad de búsqueda (ej: Caracas, Valencia, Maracaibo)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ciudad?: string;

  @ApiPropertyOptional({
    description:
      'Tipo de inmueble (ej: apartamento, casa, local, terreno, oficina, townhouse)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipo?: string;
}
