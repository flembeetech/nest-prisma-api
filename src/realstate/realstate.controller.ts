import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { QueryRealstateService } from './services/query.realstate.service';
import { QueryListingsDto } from './dto/query-listings.dto';
import { QueryPulsoDto } from './dto/query-pulso.dto';

@Controller('realstate')
@ApiTags('realstate')
export class RealstateController {
  constructor(private readonly queryRealstateService: QueryRealstateService) {}

  @Get('listings')
  @ApiOperation({
    summary: 'Obtener catálogo de propiedades con filtros y paginación',
  })
  @ApiOkResponse({ description: 'Listado de propiedades obtenido exitosamente' })
  getListings(@Query() query: QueryListingsDto) {
    return this.queryRealstateService.getListings(query);
  }

  @Get('listings/:id')
  @ApiOperation({
    summary: 'Obtener detalle completo de una propiedad por su ID',
  })
  @ApiParam({ name: 'id', description: 'ID numérico de la propiedad' })
  @ApiOkResponse({ description: 'Detalle de la propiedad obtenido exitosamente' })
  getListingById(@Param('id') id: string) {
    return this.queryRealstateService.getListingById(id);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Obtener estadísticas globales del mercado inmobiliario',
  })
  @ApiOkResponse({ description: 'Estadísticas obtenidas exitosamente' })
  getStats() {
    return this.queryRealstateService.getStats();
  }

  @Get('trends')
  @ApiOperation({
    summary: 'Obtener términos y búsquedas en tendencia',
  })
  @ApiOkResponse({ description: 'Tendencias obtenidas exitosamente' })
  getTrends() {
    return this.queryRealstateService.getTrends();
  }

  @Get('pulso')
  @ApiOperation({
    summary:
      'Consultar market intelligence, feeds de cambios de precio, nuevas propiedades y metadata',
  })
  @ApiOkResponse({
    description: 'Información de pulso de mercado obtenida exitosamente',
  })
  getPulso(@Query() query: QueryPulsoDto) {
    return this.queryRealstateService.getPulso(query);
  }

  @Get('cities')
  @ApiOperation({
    summary: 'Obtener lista de ciudades y conteo de propiedades disponibles',
  })
  @ApiOkResponse({ description: 'Ciudades obtenidas exitosamente' })
  getCities() {
    return this.queryRealstateService.getCities();
  }

  @Get('headlines')
  @ApiOperation({
    summary: 'Obtener titulares de oportunidades y variaciones de precio',
  })
  @ApiOkResponse({ description: 'Titulares obtenidos exitosamente' })
  getHeadlines() {
    return this.queryRealstateService.getHeadlines();
  }

  @Get('zones')
  @ApiOperation({
    summary: 'Obtener desglose y métricas por zonas inmobiliarias',
  })
  @ApiOkResponse({ description: 'Zonas obtenidas exitosamente' })
  getZones() {
    return this.queryRealstateService.getZones();
  }
}
