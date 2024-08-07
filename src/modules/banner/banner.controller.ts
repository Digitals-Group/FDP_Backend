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
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  create(@Body() body: Prisma.BannerCreateArgs) {
    return this.bannerService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.BannerFindManyArgs) {
    return this.bannerService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.BannerFindUniqueArgs) {
    return this.bannerService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.BannerUpdateArgs) {
    return this.bannerService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.bannerService.remove(id);
  }

  @Post('/delete')
  removeAll(@Body() body: Prisma.BannerDeleteManyArgs) {
    return this.bannerService.removeAll(body);
  }
}
