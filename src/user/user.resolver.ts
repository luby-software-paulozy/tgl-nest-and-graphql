import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-use.input';
import {
  ForbiddenException,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async indexUsers(@Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.userService.index();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async showUser(@Args('secure_id') secure_id: string, @Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.userService.show(secure_id);
  }

  @Query(() => User)
  async showUserByEmail(@Args('email') email: string) {
    return this.userService.showByEmail(email);
  }

  @Mutation(() => User)
  async storeUser(@Args('input') input: CreateUserInput) {
    return await this.userService.store(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('secure_id') secure_id: string,
    @Args('input') input: UpdateUserInput,
    @Res() res,
  ) {
    const userRequest = res.req.user;

    if (!userRequest) {
      throw new UnauthorizedException('Please make login first');
    }

    if (
      userRequest.UserRoles[0].roles_id !== 2 &&
      userRequest.secure_id !== secure_id
    ) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.userService.update(secure_id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('secure_id') secure_id: string, @Res() res) {
    const userRequest = res.req.user;

    if (!userRequest) {
      throw new UnauthorizedException('Please make login first');
    }

    if (
      userRequest.UserRoles[0].roles_id !== 2 &&
      userRequest.secure_id !== secure_id
    ) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.userService.destroy(secure_id);
  }
}
