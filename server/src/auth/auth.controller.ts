import {Body, Controller, Get, Headers, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";

@ApiTags("Authorization")
@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Logging In"})
    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({ description: 'User successfully logged in'})
    @Post('/login')
    async login(@Request() req){
        return this.authService.login(req.user)
    }

    @ApiOperation({summary: "Registration"})
    @ApiOkResponse({ description: 'User successfully registered and logged in in'})
    @Post('/register')
    async register(@Body() dto: CreateUserDto){
        return await this.authService.register(dto)
    }

    @ApiOperation({summary: "Get User Profile by JWT Token"})
    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
