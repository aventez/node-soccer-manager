import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class EncryptionService {
  private static ENCRYPTION_ROUNDS = 10;

  public async compareString(
    plainText: string,
    hashedText: string
  ): Promise<boolean> {
    return await bcrypt.compare(
      plainText,
      hashedText,
    );
  }

  public async hashString(text: string): Promise<string> {
    return await bcrypt.hash(text, EncryptionService.ENCRYPTION_ROUNDS);
  }
}