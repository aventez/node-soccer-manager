import {
  IsISO31661Alpha2,
  IsNotEmpty,
  IsNumber, IsPositive,
  IsString,
  IsUUID,
  Length, Max,
  MaxLength, Min,
  MinLength
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsTransferAlreadyExist } from "../constraints/transfer-already-exist.constraint";

export class CreateTransferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsTransferAlreadyExist()
  @IsUUID()
  playerId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100_000_000)
  price: number;
}

export default CreateTransferDto;