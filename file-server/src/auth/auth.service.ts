import { HashService } from '@app/hash';
import { PrismaService } from '@app/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) { }

  async validate({ crypto, sub }) {
    const user = await this.prisma.sys_user.findUnique({
      where: {
        id: sub
      }
    })
    if (!user) throw NotFoundException
    if (this.hash.md5(user.password) !== crypto) throw NotFoundException
    return user;
  }
  getToken(user) {
    const payload = {
      crypto: this.hash.md5(user.password),
      sub: user.id
    };
    return {
      access_token: this.jwt.sign(payload, {
        expiresIn: this.config.getOrThrow('JWT_EXPIRES'),
      }),
    };
  }
}
