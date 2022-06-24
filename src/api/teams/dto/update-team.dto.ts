import { IsISO31661Alpha2, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsISO31661Alpha2()
  country: string;
}

export default UpdateTeamDto;