import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game } from '@prisma/client';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async index(): Promise<Game[]> {
    const games = await this.prisma.game.findMany();
    return games;
  }

  async show(secure_id: string): Promise<Game> {
    const game = await this.prisma.game.findFirst({
      where: { secure_id },
    });
    return game;
  }

  async showByType(type: string): Promise<Game> {
    const game = await this.prisma.game.findFirst({
      where: { type },
    });
    return game;
  }

  async store(input: CreateGameInput): Promise<Game> {
    const game = await this.prisma.game.create({ data: input });
    return game;
  }

  async update(secure_id: string, input: UpdateGameInput): Promise<Game> {
    const game = await this.prisma.game.findFirst({
      where: { secure_id },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const gameUpdated = await this.prisma.game.update({
      where: { secure_id },
      data: input,
    });

    return gameUpdated;
  }

  async destroy(secure_id: string): Promise<boolean> {
    const game = await this.prisma.game.findFirst({
      where: { secure_id },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    try {
      await this.prisma.game.delete({
        where: { secure_id },
      });

      return true;
    } catch {
      return false;
    }
  }
}
