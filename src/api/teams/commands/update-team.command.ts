export class UpdateTeamCommand {
  constructor(
    public readonly id: string,
    public readonly values: Record<string, any>
  ) {}
}