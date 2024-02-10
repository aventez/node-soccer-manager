import { Injectable } from "@nestjs/common";
import {
  registerDecorator, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { TransfersService } from "../services/transfers.service";

@ValidatorConstraint({ name: 'isTransferAlreadyExist', async: true })
@Injectable()
export class IsTransferAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly transfersService: TransfersService,
  ) {}

  async validate(playerId: string): Promise<boolean> {
    if (playerId == null) return true;

    try {
      await this.transfersService.findTransferByPlayerId(playerId);
      return false;
    } catch(e) {
      return true;
    }
  }

  defaultMessage(): string {
    return 'transfer for this player already exists';
  }
}

export const IsTransferAlreadyExist = (validationOptions?: ValidationOptions) => (
  object: object,
  propertyName: string,
): void => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    validator: IsTransferAlreadyExistConstraint,
    options: validationOptions,
  });
};