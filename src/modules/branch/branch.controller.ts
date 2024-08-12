import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BranchService } from './branch.service';

@Controller('branch')
@UseGuards(JwtAuthGuard)
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() body: Prisma.BranchCreateArgs) {
    return this.branchService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.BranchFindManyArgs) {
    return this.branchService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.BranchFindUniqueArgs) {
    return this.branchService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.BranchUpdateArgs) {
    return this.branchService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.branchService.remove(id);
  }

  @Post('/delete')
  removeAll(@Param() body: Prisma.BranchDeleteManyArgs) {
    return this.branchService.removeAll(body);
  }
}
