import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
