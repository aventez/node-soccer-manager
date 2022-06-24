import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, Length } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 20)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  password: string;
}

export default LoginDto;