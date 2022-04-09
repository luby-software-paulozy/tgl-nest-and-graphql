import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(input: AuthInput): Promise<AuthType> {
    const user = await this.userService.showByEmail(input.email);
    const validPassword = compareSync(input.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorret credentials');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.email, sub: user.secure_id };
    return this.jwtService.signAsync(payload);
  }
}
