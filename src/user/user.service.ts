import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-use.input';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async index(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        UserRoles: true,
      },
    });
    return users;
  }

  async show(secure_id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { secure_id },
      include: {
        UserRoles: true,
        Bet: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async showByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: {
        UserRoles: true,
        Bet: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async store(input: CreateUserInput): Promise<User> {
    input.password = await hash(input.password, 10);

    const user = await this.prisma.user.create({
      data: input,
    });

    const role = await this.prisma.roles.findUnique({
      where: { name: 'default_user' },
    });

    await this.prisma.userRoles.create({
      data: {
        user_id: user.id,
        roles_id: role.id,
      },
    });

    return user;
  }

  async update(secure_id: string, input: UpdateUserInput): Promise<User> {
    if (input.password) {
      input.password = await hash(input.password, 10);
    }

    const user = await this.prisma.user.findFirst({
      where: { secure_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userUpdated = await this.prisma.user.update({
      where: { secure_id },
      include: { UserRoles: true },
      data: input,
    });

    return userUpdated;
  }

  async destroy(secure_id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { secure_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDeleted = await this.prisma.user.delete({
      where: { secure_id },
    });

    if (!userDeleted) {
      throw new InternalServerErrorException('Error deleting user');
    }

    return true;
  }
}
