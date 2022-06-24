import { AuthenticationService } from "../services/authentication.service";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import RegisterDto from "../dto/register.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import LoginDto from "../dto/login.dto";
import { LocalAuthenticationGuard } from "../guards/local.guard";

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User has been registered.'})
  @ApiResponse({ status: 400, description: 'Failed to create an account' })
  async actionRegister(@Body() dto: RegisterDto) {
    const user = await this.authenticationService.register(dto);
    const token = await this.authenticationService.generateBearerToken(user.id);

    return { token };
  }

  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  @ApiResponse({ status: 201, description: 'User has been logged in.'})
  @ApiResponse({ status: 400, description: 'Action validation not passed' })
  @ApiResponse({ status: 401, description: 'Wrong credentials provided' })
  async actionLogin(@Body() dto: LoginDto) {
    const user = await this.authenticationService.authenticate(dto);
    const token = await this.authenticationService.generateBearerToken(user.id);

    return { token };
  }
}