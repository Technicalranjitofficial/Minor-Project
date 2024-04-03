import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service'; 
import { JwtService } from '@nestjs/jwt';
import { SwappingController } from './swapping/swapping.controller';
import { SwappingModule } from './swapping/swapping.module';
import { SwappingService } from './swapping/swapping.service';
import { MinioModule } from 'nestjs-minio-client';
import { MulterModule } from '@nestjs/platform-express';
import { NotesController } from './notes/notes.controller';
import { NotesModule } from './notes/notes.module';
import { NotesService } from './notes/notes.service';
import { DriveService } from './drive.service';


@Module({
  imports: [UserModule, AuthModule,ConfigModule.forRoot(), SwappingModule,MinioModule.register({
    endPoint:"localhost",
    port: 9000,
    useSSL: false,
    accessKey: "e4vur0bvXKenxkgO4bVN",
    secretKey: "f8NV77eMIQIkHNTN0JtYPwXJNSW525xdFuFIBZBW",
  }),MulterModule.register({
    dest: './uploads', // Set your upload directory
  }), NotesModule],
  controllers: [UserController,AuthController, SwappingController, NotesController],
  providers: [AuthService,PrismaService,UserService,JwtService,SwappingService,NotesService,DriveService],
})
export class AppModule {}
