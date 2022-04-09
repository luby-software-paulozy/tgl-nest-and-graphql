import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { GameService } from './game.service';
import { Game } from '../graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import {
  ForbiddenException,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UpdateGameInput } from './dto/update-game.input';

@Resolver()
export class GameResolver {
  constructor(private gameService: GameService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game])
  async indexGames(@Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.gameService.index();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Game)
  async showGame(@Args('secure_id') secure_id: string, @Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      throw new ForbiddenException('You dont have permission');
    }

    return this.gameService.show(secure_id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Game)
  async storeGame(@Args('input') input: CreateGameInput, @Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.gameService.store(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Game)
  async updateGame(
    @Args('input') input: UpdateGameInput,
    @Args('secure_id') secure_id: string,
    @Res() res,
  ) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.gameService.update(secure_id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteGame(@Args('secure_id') secure_id: string, @Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      throw new ForbiddenException('You dont have permission');
    }

    return this.gameService.destroy(secure_id);
  }
}
