import { Module } from '@nestjs/common';
import { SwappingService } from './swapping.service';
import { PrismaService } from 'src/prisma.service';
import { MyMailService } from 'src/mail.service';

@Module({
  providers: [SwappingService,PrismaService,MyMailService]
})
export class SwappingModule {}
