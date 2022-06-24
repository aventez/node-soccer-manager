import { HttpException, HttpStatus } from "@nestjs/common";

export class WrongCredentialsException extends HttpException {
  constructor() {
    super({
      message: 'Wrong credentials provided',
      status: HttpStatus.UNAUTHORIZED,
      error: 'WrongCredentialsError',
    }, HttpStatus.UNAUTHORIZED);
  }
}
