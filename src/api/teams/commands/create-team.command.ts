export class CreateTeamCommand {
  constructor(
    public readonly name: string,
    public readonly country: string,
    public readonly budget: number,
    public readonly userId: string,
  ) {}
}