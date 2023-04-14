import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

@Global()
@Module({
  imports: [
    AuthModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule
  ],
  providers : [
    {
      provide : APP_GUARD,
      useClass : AtGuard
    }
  ]
})
export class AppModule {}
