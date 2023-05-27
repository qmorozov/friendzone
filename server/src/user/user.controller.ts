import {Body, Controller, Put, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @ApiOperation({summary: "Updating User Information"})
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateUser(@Request() req, @Body() dto: UpdateUserDto){
        return await this.userService.update(req.user.id, dto);
    }

}
