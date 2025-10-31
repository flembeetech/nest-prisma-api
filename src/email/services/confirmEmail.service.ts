import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ConfirmationEmailDto } from '../dto/confirmEmail.dto';

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
export class ConfirmEmailService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly fromEmail = process.env.EMAIL_USER;
  private readonly newRegisterSubject = 'Nuevo registro en App';

  async admin(dto: ConfirmationEmailDto) {
    const content: EmailContent = {
      subject: this.newRegisterSubject,
      template: 'newAdminRegister',
      context: {
        name: dto.name,
        email: dto.email,
        confirmLink: dto.confirmLink,
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
