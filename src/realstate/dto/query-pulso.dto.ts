import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class QueryPulsoDto {
  @ApiPropertyOptional({
    description: 'Metadatos solicitados',
    enum: ['titulares', 'ciudades', 'zonas'],
    required: false,
  })
  @IsOptional()
  @IsString()
  meta?: string;

  @ApiPropertyOptional({
    description: 'Tipo de feed de mercado',
    enum: ['nuevas', 'precios', 'oportunidades', 'destacadas', 'todas'],
    required: false,
  })
  @IsOptional()
  @IsString()
  feed?: string;

  @ApiPropertyOptional({
    description: 'Ventana temporal para el feed',
    enum: ['dia', 'semana', 'mes', 'trimestre', 'ano'],
    required: false,
  })
  @IsOptional()
  @IsString()
  ventana?: string;

  @ApiPropertyOptional({
    description: 'Tipo de operación',
    enum: ['venta', 'alquiler'],
    required: false,
  })
  @IsOptional()
  @IsString()
  operacion?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por ciudad (ej: Caracas, Valencia)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ciudad?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por municipio o zona específica',
    required: false,
  })
  @IsOptional()
  @IsString()
  lugar?: string;

  @ApiPropertyOptional({
    description: 'Desplazamiento para paginación (bloques de 24)',
    default: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;
}
