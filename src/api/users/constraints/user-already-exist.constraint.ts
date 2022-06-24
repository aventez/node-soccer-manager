import { Injectable } from "@nestjs/common";
import {
  registerDecorator, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import UsersService from "../services/users.service";

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async validate(email: string): Promise<boolean> {
    if (email == null) return true;

    try {
      await this.usersService.findUserByEmail(email);
      return false;
    } catch(e) {
      return true;
    }
  }

  defaultMessage(): string {
    return 'user already exists';
  }
}

export const IsUserAlreadyExist = (validationOptions?: ValidationOptions) => (
  object: object,
  propertyName: string,
): void => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    validator: IsUserAlreadyExistConstraint,
    options: validationOptions,
  });
};