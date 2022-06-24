import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsEmail } from "class-validator";
import { IsUserAlreadyExist } from "../../users/constraints/user-already-exist.constraint";

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsUserAlreadyExist()
  @MaxLength(20)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  password: string;
}

export default RegisterDto;