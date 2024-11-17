import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    PrismaModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
