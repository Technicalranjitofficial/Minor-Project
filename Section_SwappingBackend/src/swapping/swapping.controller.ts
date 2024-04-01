import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SwappingService } from './swapping.service';
import { MinioService } from 'nestjs-minio-client';

import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

const youtubedl = require('youtube-dl-exec');
@Controller('swapping')
export class SwappingController {
  constructor(
    private readonly swappingService: SwappingService,
    private readonly minioService: MinioService,
  ) {}

  @Get('swappingData')
  async getSwappingData(
    @Query() dto: { branch: string; semester: number; email: string },
  ) {
    return this.swappingService.getAllSwapping(dto);
  }

  @Post('createUserProfile')
  async createUserProfile(@Body() dto: any) {
    console.log(dto);
    return this.swappingService.createUserProfile(dto);
  }

  @Post('acceptSwap')
  async acceptSwap(
    @Body() dto: { currentUserEmail: string; remoteUserEmail: string },
  ) {
    return this.swappingService.acceptSwap(dto);
  }


  @Post('updateSwapDetails')
  async updateSwapDetails(@Body() dto: {
    email:string,
    alloted:number,
    lookingFor:number[],
  }) {
    return this.swappingService.updateSwapDetails(dto);
  }


  @Get('test')
  async getTest() {
    // const stream = fs.createReadStream('video.mp4');
    this.minioService.client.fPutObject(
      'kiitconnect',
      'vid35.mp4',
      './video3.mp4',
      {
        'Content-Type': 'video/mp4',
      },
      function (err, objInfo) {
        if (err) {
          return console.log(err); // err should be null
        }
        console.log('Success', objInfo);
      },
    );
    // var fileStat = fs.stat('video.mp4', (err, stats) => {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   this.minioService.client.fPutObject(
    //     'kiitconnect',
    //     '40mbfile22.video',
    //     "./video.mp4",
    //     {
    //         "Content-Type": "video/mp4",
    //     },
    //     function (err, objInfo) {
    //       if (err) {
    //         return console.log(err); // err should be null
    //       }
    //       console.log('Success', objInfo);
    //     },
    //   );
    // });
  }

  @Get('download')
  async downloadFile(@Res() response: Response) {
    const stream = await this.minioService.client.getObject(
      'test',
      '40mbfile.txt',
    );
    //      response.headers.set('Content-Type', 'application/octet-stream');
    // response.headers.set('Content-Disposition', `attachment; filename="test.txt"`);

    //  stream.pipe(response);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: any,
  ) {


    try {
      console.log(file);
      return await this.minioService.client.fPutObject(
        'technicalranjit',
        file.originalname,
        file.path,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // return this.swappingService.uploadFile(dto);
}
