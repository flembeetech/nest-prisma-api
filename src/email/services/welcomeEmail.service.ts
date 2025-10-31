import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { WelcomeEmailDto } from '../dto/welcomeEmail.dto';

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
export class WelcomeEmailService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly fromEmail = process.env.EMAIL_USER;
  private readonly newRegisterSubject = 'Bienvenido(a) a App.';

  async execute(dto: WelcomeEmailDto) {
    const content: EmailContent = {
      subject: this.newRegisterSubject,
      template: 'welcome',
      context: {
        name: dto.name,
        lastname: dto.lastName ?? '',
        email: dto.email,
        message: dto.message,
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
