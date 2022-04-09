import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateBetInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  numbers?: string;
}
