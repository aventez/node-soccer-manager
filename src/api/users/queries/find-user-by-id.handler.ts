import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindUserByIdQuery } from "./find-user-by-id.query";
import { UsersStore } from "../stores/users.store";

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(
    private usersStore: UsersStore,
  ) {}

  async execute(query: FindUserByIdQuery) {
    return await this.usersStore.findByIdOrFail(query.id);
  }
}