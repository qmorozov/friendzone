import {Body, Controller, Get, Put, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {CheckUsernameDto} from "./dto/check-username.dto";

@ApiTags("Users")
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @ApiOperation({summary: "Updating User Information"})
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateUser(@Request() req, @Body() dto: UpdateUserDto){
        return await this.userService.update(req.user.id, dto);
    }

    @ApiOperation({summary: "Checking Username Availability"})
    @Get('/checkUsername')
    async checkUsername(@Request() req, @Body() dto: CheckUsernameDto){
        return await this.userService.checkUsername(dto);
    }
}
