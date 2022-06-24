import { AggregateRoot } from "@nestjs/cqrs";

export class TeamAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
}