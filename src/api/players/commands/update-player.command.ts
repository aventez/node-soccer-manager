export class UpdatePlayerCommand {
  constructor(
    public readonly id: string,
    public readonly values: Record<string, any>
  ) {}
}