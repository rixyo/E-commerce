import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { StoreService } from './store/store.service';
import { StoreController } from './store/store.controller';
import { StoreModule } from './store/store.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/intercepters/user.inteceptor';
import { AuthGuard } from './guards/auth.guard';
import { RedisModule } from './redis/redis.module';
import { BillboardController } from './billboard/billboard.controller';
import { BillboardService } from './billboard/billboard.service';
import { BillboardModule } from './billboard/billboard.module';

@Module({
  imports: [StoreModule, PrismaModule, UserModule, PassportModule, RedisModule, BillboardModule],
  controllers: [AppController, StoreController, BillboardController],
  providers: [
    AppService,
    PrismaService,
    StoreService,

    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    BillboardService,
  ],
})
export class AppModule {}