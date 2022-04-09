import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  range: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  max_number: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  color: string;
}
