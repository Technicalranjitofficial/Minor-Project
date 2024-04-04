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
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';
import { MyMailService } from './mail.service';


@Module({
  imports: [UserModule, AuthModule,ConfigModule.forRoot(), SwappingModule,MinioModule.register({
    endPoint:"localhost",
    port: 9000,
    useSSL: false,
    accessKey: "e4vur0bvXKenxkgO4bVN",
    secretKey: "f8NV77eMIQIkHNTN0JtYPwXJNSW525xdFuFIBZBW",
  }),MulterModule.register({
    dest: './uploads', // Set your upload directory
  }), MailerModule.forRoot({
    transport: {
    host: 'smtp.gmail.com',
    port:587,
      auth: { 
        user: `${process.env.MAIL_USERNAME}`,
        pass: `${process.env.MAIL_PASSWORD}`,
      }, 
    },
    defaults: {
      from: 'KAKSHA<notification.kaksha@gmail.com>',
    },
    template: {
      dir: path.join(__dirname , '../src/template'), // Replace with the actual path to your templates
      adapter: new EjsAdapter(), // Use the appropriate adapter for your templating engine
      options: {
        strict: false,
      },
    }, 
  }), NotesModule],
  controllers: [UserController,AuthController, SwappingController, NotesController],
  providers: [AuthService,PrismaService,UserService,JwtService,SwappingService,NotesService,DriveService,MyMailService],
})
export class AppModule {}
