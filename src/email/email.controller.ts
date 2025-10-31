import { Body, Controller, Post } from '@nestjs/common';
import { ConfirmEmailService } from './services/confirmEmail.service';
import { ConfirmationEmailDto } from './dto/confirmEmail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private confirmEmailService: ConfirmEmailService) {}

  // @Post('confirm-employee')
  // async sendEmployeeConfirmationEmail(@Body() dto: ConfirmationEmailDto) {
  //   return this.confirmEmailService.employee(dto);
  // }
}
