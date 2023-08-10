import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { EmailModule } from 'src/email/email.module';
@Module({
  imports: [PrismaModule, RedisModule, EmailModule],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class UserModule {}
