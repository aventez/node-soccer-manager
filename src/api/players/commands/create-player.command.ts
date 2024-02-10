export class CreatePlayerCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly position: string,
    public readonly country: string,
    public readonly age: number,
    public readonly marketValue: number,
    public readonly teamId: string,
  ) {}
}
