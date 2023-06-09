import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { Token, CurrentUser } from './types';
import { AuthDto } from './dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private JwtService: JwtService,
    private FirebaseService: FirebaseService,
  ) {}

  async getToken(userId: number, email: string): Promise<Token> {
    const jwtPayload = {
      sub: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.JwtService.signAsync(jwtPayload, {
        secret: this.config.get('AT-SECRET'),
        expiresIn: '15m',
      }),

      this.JwtService.signAsync(jwtPayload, {
        secret: this.config.get('RT-SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRt(userId: number, rt: string) {
    const hash = await argon.hash(rt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        rtHash: hash,
      },
    });
  }

  async signup(
    dto: AuthDto,
    file: Express.Multer.File,
  ): Promise<{ currentUser: CurrentUser; tokens: Token }> {
    const password = await argon.hash(dto.password);

    const image = await this.FirebaseService.uploadFiles(file);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          hash: password,
          name: dto.name,
          email: dto.email,
          avatar: null
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDjdINpRk9LYh6GqAiiTJIx81FlmZtH_0gJxmT_Ps&s'
            : image,
        },
      });

      const tokens = await this.getToken(newUser.id, newUser.email);
      // Wait for attach the hash in DB
      await this.updateRt(newUser.id, tokens.refresh_token);

      const currentUser = {
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
      };

      return {
        currentUser,
        tokens,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('CredentIALS TAKEN');
        }
      }
      throw error;
    }
  }

  async signin(
    dto: AuthDto,
  ): Promise<{ currentUser: CurrentUser; tokens: Token }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getToken(user.id, user.email);

    await this.updateRt(user.id, tokens.refresh_token);

    const currentUser = {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    };

    return {
      currentUser,
      tokens,
    };
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        rtHash: { not: null },
      },
      data: {
        rtHash: null,
      },
    });
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.rtHash) throw new ForbiddenException('Acess Denied');

    const rtMatches = await argon.verify(user.rtHash, rt);
    if (!rtMatches) throw new ForbiddenException('Acess Denied');

    const tokens = await this.getToken(user.id, user.email);
    await this.updateRt(user.id, tokens.refresh_token);
  }
}
