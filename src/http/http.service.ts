import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CustomHttpService {
  constructor(private readonly httpService: HttpService) {}

  async get<T = any>(url: string, config?: any): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(url, config),
    );
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: any,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.post<T>(url, data, config),
    );
    return response.data;
  }
}
