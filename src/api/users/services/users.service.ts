import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import User from "../entities/user.entity";
import { FindUserByIdQuery } from "../queries/find-user-by-id.query";
import { FindUserByEmailQuery } from "../queries/find-user-by-email.query";
import { CreateUserCommand } from "../commands/create-user.command";

@Injectable()
export class UsersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findUserById(id: string): Promise<User> {
    return await this.queryBus.execute(new FindUserByIdQuery(id));
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.queryBus.execute(new FindUserByEmailQuery(email));
  }

  async createUser(email: string, password: string): Promise<User> {
    return await this.commandBus.execute(new CreateUserCommand(email, password));
  }
}

export default UsersService;