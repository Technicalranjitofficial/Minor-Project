import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomException } from 'src/CustomException';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SwappingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSwapping(dto: {
    branch: string;
    semester: number;
    email: string;
  }) {
    console.log(dto);
    try {
      const getMyInfo = await this.prisma.swapping.findUnique({
        where: {
          email: dto.email,
        },
        include:{
            remoteUser:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                    editLeft:true,
                }
            
            }
        }
      });

      const swappingInfo = await this.prisma.swapping.findMany({
        where: {
          branch: dto.branch,
          Semester: Number(dto.semester),
        },include:{
            remoteUser:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                }
            }
        }

      });
      console.log(swappingInfo, getMyInfo);
      return {
        getMyInfo,
        swappingInfo,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error occured while fetching swapping data',
      );
    }
  }

  async createUserProfile(dto: {
    name: string;
    branch: string;
    Semester: number;
    alloted: number;
    lookingFor: number[];
    contact: string;
    email: string;
  }) {
    try {
      const user = await this.prisma.swapping.findUnique({
        where: {
          email: dto.email,
        },
      });

      console.log(user);
      if (user) throw new ConflictException('User Already Exist');

      const createUser = await this.prisma.swapping.create({
        data: {
          alloted: dto.alloted,
          branch: dto.branch,
          contact: dto.contact,
          email: dto.email,
          name: dto.name,
          Semester: dto.Semester,
          lookingFor: dto.lookingFor,
        },
      });

      console.log(createUser);

      return createUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async acceptSwap(dto: { currentUserEmail: string; remoteUserEmail: string }) {
    try {
      const currentUser = await this.prisma.swapping.findUnique({
        where: {
          email: dto.currentUserEmail,
        },
      });

      const remoteUser = await this.prisma.swapping.findUnique({
        where: {
          email: dto.remoteUserEmail,
        },
      });

      if (!currentUser || !remoteUser) {
        throw new ConflictException('User not found');
      }

      if (currentUser.remoteUserId)
        throw new ConflictException('You have already accepted a swap');
      if (remoteUser.remoteUserId)
        throw new ConflictException('User is not available for swap');
      const update = await this.prisma.$transaction([
        this.prisma.swapping.update({
          where: {
            id: currentUser.id,
          },
          data: {
            remoteUserId: remoteUser.id,
          },
        }),
        this.prisma.swapping.update({
          where: {
            id: remoteUser.id,
          },
          data: {
            remoteUserId: currentUser.id,
          },
        }),
      ]);

      if (!update)
        throw new InternalServerErrorException('Error occured while updating');
      return update;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateSwapDetails(dto: {
    email: string;
    alloted: number;
    lookingFor: number[];
  }) {
    try {
      const user = await this.prisma.swapping.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) throw new ConflictException('User not found');

      if(user.editLeft === 0) throw new CustomException('Your Edit limit has been exceed',429);

      const update = await this.prisma.swapping.update({
        where: {
          id: user.id,
        },
        data: {
          alloted: dto.alloted,
          lookingFor: dto.lookingFor,
          editLeft: {
            decrement: 1,
          }
        },
      });

      if (!update)
        throw new InternalServerErrorException('Error occured while updating');
      return update;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
