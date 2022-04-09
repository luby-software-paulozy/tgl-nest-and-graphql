import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bet, User } from '@prisma/client';
import { CreateBetInput } from './dto/create-bet.input';
import { GameService } from 'src/game/game.service';
import { UpdateBetInput } from './dto/update-bet.input';

@Injectable()
export class BetService {
  constructor(
    private prisma: PrismaService,
    private gameService: GameService,
  ) {}

  async index(): Promise<Bet[]> {
    const bets = await this.prisma.bet.findMany();
    return bets;
  }

  async showByUser(user_id: number): Promise<Bet[]> {
    const bets = await this.prisma.bet.findMany({
      where: { user_id },
    });

    return bets;
  }

  async show(secure_id: string): Promise<Bet> {
    const bet = await this.prisma.bet.findFirst({
      where: { secure_id },
    });

    if (!bet) {
      throw new NotFoundException('Bet not found');
    }

    return bet;
  }

  async store(input: CreateBetInput, user: User): Promise<string> {
    const { bets } = input.cart;
    const minCartValue = await this.prisma.cart.findFirst();
    const games = await this.gameService.index();

    const gamesPrice = bets.map((bet) => {
      for (const game of games) {
        if (bet.game_type === game.type) {
          return game.price;
        }
      }
    });

    const cartValue = gamesPrice.reduce((acc, game) => {
      return Number(acc) + Number(game);
    }, 0);

    if (cartValue < minCartValue['min_cart_value']) {
      throw new UnprocessableEntityException(
        `The value of the cart cannot be less than ${minCartValue['min_cart_value']}, the cart value is ${cartValue}`,
      );
    }

    try {
      bets.map(async (bet) => {
        const game = await this.gameService.showByType(bet.game_type);

        await this.prisma.bet.create({
          data: {
            user_id: user.id,
            game_id: game.id,
            numbers: bet.numbers,
          },
        });

        return;
      });

      return `Bets Created`;
    } catch (error) {
      console.log(error);
    }
  }

  async update(secure_id: string, input: UpdateBetInput): Promise<Bet> {
    const bet = await this.prisma.bet.update({
      where: { secure_id },
      data: input,
    });

    return bet;
  }

  async destroy(secure_id: string): Promise<boolean> {
    try {
      await this.prisma.bet.delete({
        where: { secure_id },
      });

      return true;
    } catch {
      return false;
    }
  }
}
