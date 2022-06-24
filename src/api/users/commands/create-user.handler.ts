import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { UserAggregate } from "../aggregates/user.aggregate";
import { UsersStore } from "../stores/users.store";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly usersStore: UsersStore,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = await this.usersStore.create({
      email: command.email,
      password: command.password,
    });

    const userAggregate = this.eventPublisher.mergeObjectContext(
      await new UserAggregate(user.id),
    );
    userAggregate.createUser(user.id);
    userAggregate.commit();
  }
}