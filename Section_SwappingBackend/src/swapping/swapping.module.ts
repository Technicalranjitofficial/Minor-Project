import { Module } from '@nestjs/common';
import { SwappingService } from './swapping.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SwappingService,PrismaService]
})
export class SwappingModule {}
