import {Body, Controller, Get, Param, Put, Query, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiBody, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@ApiTags("Users")
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @ApiOperation({summary: "Updating User Information"})
    @ApiBody({
        type: UpdateUserDto,
        description: "Update information for user profile."
    })
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateUser(@Request() req, @Body() dto: UpdateUserDto){
        return await this.userService.update(req.user.id, dto);
    }

    @ApiOperation({summary: "Checking Username Availability"})
    @ApiParam({
        name: "username",
        description: "<b>Username</b> which needs to check.",
        allowEmptyValue: false,
        examples: {
            a: {
                summary: "Username is john123",
                description: "john123 provided as a username",
                value: "john123"
            }
        }
    })
    @Get('/checkUsername/:username')
    async checkUsername(@Param("username") username: string){
        return await this.userService.checkUsername(username);
    }
}
