import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService, private prisma: PrismaService) {}

  async signup(dto: any): Promise<{ message: string; token: string }> {

    const password = await argon.hash(dto.password);
    try {
      const newUser = await this.prisma.user.create({
        data : {
          hash: password,
          name: dto.name,
          email: dto.email,
          avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDjdINpRk9LYh6GqAiiTJIx81FlmZtH_0gJxmT_Ps&s'
        },
      });

      return {
        message: `Felicidades ${newUser.name} ya tienes una cuenta!`,
        token: 'naisdjgbjioabga',
      };
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException('CredentIALS TAKEN')
            }
        }
        throw error
    }
  }

  signin(dto : any){
    return 'any'
  }

  logout(dto : any){
    return 'any'
  }

  refreshToken(dto : any){
    return 'any'
  }
}
