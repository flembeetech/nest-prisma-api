import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomHttpService } from '../../http/http.service';
import { QueryListingsDto } from '../dto/query-listings.dto';
import { QueryPulsoDto } from '../dto/query-pulso.dto';

@Injectable()
export class QueryRealstateService {
  private readonly logger = new Logger(QueryRealstateService.name);
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: CustomHttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('REALSTATE_API_URL') ||
      process.env.REALSTATE_API_URL ||
      '';
  }

  private getHeaders() {
    return {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'application/json',
    };
  }

  async getListings(query?: QueryListingsDto) {
    try {
      const url = `${this.baseUrl}/listings`;
      this.logger.debug(
        `Fetching listings with params: ${JSON.stringify(query)}`,
      );
      const data = await this.httpService.get(url, {
        params: query,
        headers: this.getHeaders(),
      });
      return {
        message: 'Inmuebles obtenidos con éxito',
        code: HttpStatus.OK,
        data,
      };
    } catch (error: any) {
      this.logger.error(
        `Error fetching listings: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.response?.data || 'Error al consultar los inmuebles',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getListingById(id: string | number) {
    try {
      const url = `${this.baseUrl}/listing/${id}`;
      this.logger.debug(`Fetching listing details for ID: ${id}`);
      const data = await this.httpService.get(url, {
        headers: this.getHeaders(),
      });
      return {
        message: 'Detalle de inmueble obtenido con éxito',
        code: HttpStatus.OK,
        data,
      };
    } catch (error: any) {
      this.logger.error(
        `Error fetching listing ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.response?.data || `Error al consultar el inmueble con ID ${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStats() {
    try {
      const url = `${this.baseUrl}/stats`;
      this.logger.debug('Fetching real estate statistics');
      const data = await this.httpService.get(url, {
        headers: this.getHeaders(),
      });
      return {
        message: 'Estadísticas obtenidas con éxito',
        code: HttpStatus.OK,
        data,
      };
    } catch (error: any) {
      this.logger.error(`Error fetching stats: ${error.message}`, error.stack);
      throw new HttpException(
        error.response?.data || 'Error al consultar estadísticas',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTrends() {
    try {
      const url = `${this.baseUrl}/trends`;
      this.logger.debug('Fetching real estate trends');
      const data = await this.httpService.get(url, {
        headers: this.getHeaders(),
      });
      return {
        message: 'Tendencias obtenidas con éxito',
        code: HttpStatus.OK,
        data,
      };
    } catch (error: any) {
      this.logger.error(`Error fetching trends: ${error.message}`, error.stack);
      throw new HttpException(
        error.response?.data || 'Error al consultar tendencias',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPulso(query?: QueryPulsoDto) {
    try {
      const url = `${this.baseUrl}/pulso`;
      this.logger.debug(`Fetching pulso with params: ${JSON.stringify(query)}`);
      const data = await this.httpService.get(url, {
        params: query,
        headers: this.getHeaders(),
      });
      return {
        message: 'Información de mercado obtenida con éxito',
        code: HttpStatus.OK,
        data,
      };
    } catch (error: any) {
      this.logger.error(`Error fetching pulso: ${error.message}`, error.stack);
      throw new HttpException(
        error.response?.data || 'Error al consultar información de mercado',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCities() {
    return this.getPulso({ meta: 'ciudades' });
  }

  async getHeadlines() {
    return this.getPulso({ meta: 'titulares' });
  }

  async getZones() {
    return this.getPulso({ meta: 'zonas' });
  }
}
