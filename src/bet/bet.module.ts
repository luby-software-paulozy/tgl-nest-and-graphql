import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';
import { GameService } from 'src/game/game.service';

@Module({
  providers: [BetResolver, BetService, PrismaService, GameService],
  exports: [BetService],
})
export class BetModule {}
