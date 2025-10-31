import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfirmationTokenPayloadDto } from '../../DTO';
import { ForgotTokenPayloadDto } from 'src/auth/dto/forgot_token_payload.dto';

@Injectable()
export class TokenService {
  private signOptions: { secret: string };
  private signOptionsRefresh: { secret: string };

  constructor(private configService: ConfigService, private jwt: JwtService) {
    const access_token_secret = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    if (!access_token_secret)
      throw new Error(
        'JWT_ACCESS_TOKEN_SECRET is not defined in the environment variables',
      );

    this.signOptions = {
      secret: access_token_secret,
    };
    this.signOptionsRefresh = {
      secret: access_token_secret,
    };
  }

  sendTokens(payload: {
    id: number;
    id_user: number;
    name: string;
    email: string;
    isAdmin: boolean;
    role: string;
  }) {
    return {
      accessToken: this.signAccessToken(payload),
      refreshToken: this.signRefreshToken(payload),
    };
  }

  private signAccessToken(payload: {
    id: number;
    id_user: number;
    name: string;
    email: string;
    isAdmin: boolean;
    role: string;
  }) {
    return this.jwt.sign(payload, this.signOptionsRefresh);
  }

  async signRefreshToken(payload: {
    id: number;
    id_user: number;
    name: string;
    email: string;
    isAdmin: boolean;
    role: string;
  }) {
    return this.jwt.sign(payload, this.signOptionsRefresh);
  }

  verify(token: string): ConfirmationTokenPayloadDto {
    try {
      return this.jwt.verify<ConfirmationTokenPayloadDto>(
        token,
        this.signOptions,
      );
    } catch (error) {
      throw new ForbiddenException({
        message: 'No se pudo verificar el token',
      });
    }
  }

  generateForgotToken(payload: ForgotTokenPayloadDto) {
    const forgotToken = this.jwt.sign(payload, this.signOptions);
    return forgotToken;
  }

  generateConfirmationToken(payload: ConfirmationTokenPayloadDto) {
    const confimationToken = this.jwt.sign(payload, this.signOptions);
    return confimationToken;
  }
}
