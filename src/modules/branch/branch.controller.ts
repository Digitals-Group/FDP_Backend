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
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() createBranchDto: Prisma.BranchCreateArgs) {
    return this.branchService.create(createBranchDto);
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
  deleteAll(@Param() body: Prisma.BranchDeleteManyArgs) {
    return this.branchService.deleteAll(body);
  }
}
