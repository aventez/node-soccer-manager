import { Injectable } from "@nestjs/common";
import RegisterDto from "../dto/register.dto";
import LoginDto from "../dto/login.dto";
import { EncryptionService } from "../../../services/encryption/encryption.service";
import { JwtService } from "@nestjs/jwt";
import { WrongCredentialsException } from "../../../exceptions/wrong-credentials.exception";
import User from "../../users/entities/user.entity";
import UsersService from "../../users/services/users.service";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async register(dto: RegisterDto) {
    const hashedPassword: string = await this.encryptionService.hashString(dto.password);
    await this.usersService.createUser(dto.email, hashedPassword);

    return await this.usersService.findUserByEmail(dto.email);
  }

  public async authenticate(dto: LoginDto) {
    const user: User = await this.usersService.findUserByEmail(dto.email);

    const isPasswordCorrect: boolean = await this.encryptionService.compareString(
      dto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new WrongCredentialsException();
    }

    return user;
  }

  public async generateBearerToken(userId: string) {
    return this.jwtService.sign({ userId });
  }
}