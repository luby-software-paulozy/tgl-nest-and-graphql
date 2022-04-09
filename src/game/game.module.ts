import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
  providers: [GameResolver, GameService, PrismaService],
  exports: [GameService],
})
export class GameModule {}
