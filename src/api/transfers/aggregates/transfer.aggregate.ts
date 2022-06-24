import { AggregateRoot } from "@nestjs/cqrs";

export class TransferAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
}