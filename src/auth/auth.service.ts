import { BadRequestException, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: AuthDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    console.log(dto);

    if (isUserExist) throw new BadRequestException('User already exist');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number('+ 375 (##) ### ## ##'),
        password: await hash(dto.password),
      },
    });
    return user;
  }
}
