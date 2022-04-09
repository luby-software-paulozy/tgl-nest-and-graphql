import { Field } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { User as UserGQL } from 'src/graphql';

export class AuthType {
  @Field(() => UserGQL)
  user: User;
  token: string;
}
