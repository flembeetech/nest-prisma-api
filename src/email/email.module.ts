// email.module.ts
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfirmEmailService } from './services/confirmEmail.service';
import { ForgotPasswordEmailService } from './services/forgotPassword.service';
import { EmailController } from './email.controller';
import 'dotenv/config';
import { WelcomeEmailService } from './services/welcomeEmail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [
    ConfirmEmailService,
    ForgotPasswordEmailService,
    WelcomeEmailService,
  ],
  exports: [
    ConfirmEmailService,
    ForgotPasswordEmailService,
    WelcomeEmailService,
  ],
})
export class EmailModule {}
