import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindUserByEmailQuery } from "./find-user-by-email.query";
import { UsersStore } from "../stores/users.store";

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
  constructor(
    private usersStore: UsersStore,
  ) {}

  async execute(query: FindUserByEmailQuery) {
    return await this.usersStore.findByEmailOrFail(query.email);
  }
}