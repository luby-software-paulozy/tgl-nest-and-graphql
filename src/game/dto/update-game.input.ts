import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateGameInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  range: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  max_number: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  color: string;
}
