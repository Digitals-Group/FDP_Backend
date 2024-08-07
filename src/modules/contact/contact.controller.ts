import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() body: Prisma.ContactCreateArgs) {
    return this.contactService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.ContactFindManyArgs) {
    return this.contactService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.ContactFindUniqueArgs) {
    return this.contactService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.ContactUpdateArgs) {
    return this.contactService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.contactService.remove(id);
  }
  @Post('/delete')
  removeAll(@Param() body: Prisma.ContactDeleteManyArgs) {
    return this.contactService.removeAll(body);
  }
}
