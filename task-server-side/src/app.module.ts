import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { FirebaseModule } from './firebase/firebase.module';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    AuthModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    FirebaseModule,
    MulterModule.register({
      dest : './uploads'
    })
  ],
  providers : [
    {
      provide : APP_GUARD,
      useClass : AtGuard
    },
  ]
})
export class AppModule {}
