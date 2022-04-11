/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewUser {
  name: string;
  email: string;
  password: string;
}

export class UpdateUser {
  name?: Nullable<string>;
  email?: Nullable<string>;
  password?: Nullable<string>;
}

export class AuthInput {
  email: string;
  password: string;
}

export class UpdateGame {
  type?: Nullable<string>;
  description?: Nullable<string>;
  range?: Nullable<number>;
  max_number?: Nullable<number>;
  price?: Nullable<number>;
  color?: Nullable<string>;
}

export class NewGame {
  type: string;
  description: string;
  range: number;
  max_number: number;
  price: number;
  color: string;
}

export class Bets {
  game_type: string;
  numbers: string;
}

export class Cart {
  bets: Nullable<Bets>[];
}

export class NewBet {
  cart: Cart;
}

export class UpdateBet {
  numbers?: Nullable<string>;
}

export class User {
  id: string;
  secure_id: string;
  name: string;
  email: string;
  password: string;
  UserRoles: UserRoles[];
  Bet: UserBets[];
}

export class UserRoles {
  user_id: string;
  roles_id: string;
}

export class Role {
  id: string;
  name: string;
}

export class AuthType {
  user?: Nullable<User>;
  token?: Nullable<string>;
}

export class Game {
  id: string;
  secure_id: string;
  type: string;
  description: string;
  range: number;
  max_number: number;
  price: number;
  color: string;
}

export class Bet {
  id: string;
  secure_id: string;
  user_id: string;
  game_id: string;
  numbers: string;
}

export class UserBets {
  secure_id: string;
  user_id: string;
  game_id: string;
  numbers: string;
}

export abstract class IQuery {
  abstract indexUsers(): User[] | Promise<User[]>;

  abstract showUser(secure_id: string): User | Promise<User>;

  abstract showUserByEmail(email: string): User | Promise<User>;

  abstract indexGames(): Game[] | Promise<Game[]>;

  abstract showGame(secure_id: string): Game | Promise<Game>;

  abstract indexBets(): Bet[] | Promise<Bet[]>;

  abstract showBet(secure_id: string): Bet | Promise<Bet>;
}

export abstract class IMutation {
  abstract storeUser(input?: Nullable<NewUser>): User | Promise<User>;

  abstract updateUser(
    secure_id: string,
    input?: Nullable<UpdateUser>,
  ): User | Promise<User>;

  abstract deleteUser(secure_id: string): boolean | Promise<boolean>;

  abstract login(
    input?: Nullable<AuthInput>,
  ): Nullable<AuthType> | Promise<Nullable<AuthType>>;

  abstract storeGame(input?: Nullable<NewGame>): Game | Promise<Game>;

  abstract updateGame(
    secure_id: string,
    input?: Nullable<UpdateGame>,
  ): Game | Promise<Game>;

  abstract deleteGame(secure_id: string): boolean | Promise<boolean>;

  abstract storeBet(input: NewBet): string | Promise<string>;

  abstract updateBet(secure_id: string, input: UpdateBet): Bet | Promise<Bet>;

  abstract deleteBet(secure_id: string): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
