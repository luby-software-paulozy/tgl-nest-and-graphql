import {
  ForbiddenException,
  NotFoundException,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Bet } from '../graphql';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';

@Resolver()
export class BetResolver {
  constructor(private betService: BetService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet])
  async indexBets(@Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    if (user.UserRoles[0].roles_id !== 2) {
      return await this.betService.showByUser(user.id);
    }

    return await this.betService.index();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet])
  async showBet(@Args('secure_id') secure_id: string, @Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    return await this.betService.show(secure_id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async storeBet(@Args('input') input: CreateBetInput, @Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    return this.betService.store(input, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bet)
  async updateBet(
    @Args('secure_id') secure_id: string,
    @Args('input') input: UpdateBetInput,
    @Res() res,
  ) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    const bet = await this.betService.show(secure_id);

    if (!bet) {
      throw new NotFoundException('Bet not found');
    }

    if (user.id !== bet.user_id) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.betService.update(secure_id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteBet(@Args('secure_id') secure_id: string, @Res() res) {
    const { user } = res.req;

    if (!user) {
      throw new UnauthorizedException('Please make login first');
    }

    const bet = await this.betService.show(secure_id);

    if (!bet) {
      throw new NotFoundException('Bet not found');
    }

    if (user.id !== bet.user_id) {
      throw new ForbiddenException('You dont have permission');
    }

    return await this.betService.destroy(secure_id);
  }
}
