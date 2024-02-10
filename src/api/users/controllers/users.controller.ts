import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ReqUser } from "../../../decorators/req-user.decorator";
import { JwtAuthenticationGuard } from "../../authentication/guards/jwt.guard";
import User from "../entities/user.entity";
import UsersService from "../services/users.service";

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({ status: 200, description: 'Fetched user info', type: User })
  @Get('/info')
  @UseGuards(JwtAuthenticationGuard)
  async infoAction(@ReqUser() user: User): Promise<User> {
    return await this.usersService.findUserById(user.id);
  }
}