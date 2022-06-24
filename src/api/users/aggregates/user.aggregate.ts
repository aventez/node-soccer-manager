import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/user-created.event";

export class UserAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  public createUser(id: string) {
    this.apply(new UserCreatedEvent(id));
  }
}