import { AggregateRoot } from '@nestjs/cqrs';

export class PlayerAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
}