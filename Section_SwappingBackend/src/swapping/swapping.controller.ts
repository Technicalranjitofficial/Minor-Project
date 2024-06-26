import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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


  @Get("getOnlyBranches")
  async getSwappingSetting(){
    return this.swappingService.getOnlyBrances();
  }

  @Get("getSemestersByBranchId")
  async getSemestersByBranch(@Query() dto:{branch:string}){
    return this.swappingService.getSemestersByBranchId(dto.branch);
  }

  @Get("updateSemester")
  async updateSemester(){
    return this.swappingService.updateSemester();
  }

  @Post("setSectionSwappingEnabled")
  async setSectionSwappingEnabled(@Body() dto:{sectionId:string,event:boolean}){
    return this.swappingService.setSectionSwappingEnabled(dto.sectionId,dto.event);
  }

  @Post("updateSectionNumber")
  async updateSectionNumber(@Body() dto:{sectionId:string,number:number}){
    return this.swappingService.updateSectionNumber(dto.sectionId,dto.number);
  }

  @Delete('deleteSwapByAdmin')
  async deleteSwapByAdmin(@Query() dto:{email:string}){
    return this.swappingService.deleteSwappingByAdmin(dto.email);
  }

  @Delete('deleteSwapByUser')
  async deleteSwapByUser(@Query() dto:{email:string}){
    return this.swappingService.deleteSwapByUser(dto.email);
  }
 

@Get("sendTestMail")
async sendTestMail(){
  return this.swappingService.sendTestMail();
}
  // return this.swappingService.uploadFile(dto);
}
