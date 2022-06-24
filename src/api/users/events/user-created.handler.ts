import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "./user-created.event";
import { TeamGeneratorService } from "../../teams/services/team-generator.service";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly teamGeneratorService: TeamGeneratorService) {}

  async handle(event: UserCreatedEvent) {
    await this.teamGeneratorService.generateTeamForUser(event.userId);
  }
}