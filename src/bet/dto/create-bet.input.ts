import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

type Bets = {
  game_type: string;
  numbers: string;
};

@InputType()
export class CreateBetInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  cart: {
    bets: Bets[];
  };
}
