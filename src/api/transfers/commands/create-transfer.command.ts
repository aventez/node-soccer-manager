export class CreateTransferCommand {
  constructor(
    public readonly playerId: string,
    public readonly price: number,
  ) {}
}

export default CreateTransferCommand;