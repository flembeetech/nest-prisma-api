import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ForgotPasswordEmailDto } from '../dto/forgotPassword.dto';

import 'dotenv/config';

interface EmailContext {
  [key: string]: string | number | boolean | object;
}

interface EmailContent {
  subject: string;
  template: string;
  context: EmailContext;
}

@Injectable()
export class ForgotPasswordEmailService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly fromEmail = process.env.EMAIL_USER;
  private readonly newForgotSubject = 'Restablecimiento de Contraseña.';

  async execute(dto: ForgotPasswordEmailDto) {
    const content: EmailContent = {
      subject: this.newForgotSubject,
      template: 'forgotPassword',
      context: {
        name: dto.name,
        lastName: dto.lastName ?? '',
        email: dto.email,
        resetLink: dto.resetLink,
        websiteLink: dto.websiteLink,
      },
    };

    try {
      this.mailerService.sendMail({
        to: dto.email,
        from: this.fromEmail,
        ...content,
      });
      return {
        code: 200,
        data: null,
        message: 'Correo enviado con exito!',
      };
    } catch (error) {
      throw new InternalServerErrorException('Fallo al enviar los correos');
    }
  }
}
