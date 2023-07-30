import {Body, Controller, Get, Headers, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {ApiBody, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
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
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {description: "User Email", example: "example@mail.com"},
                password: {description: "User Password", example: "12345"},
            },
        },
    })
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

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Get User Profile by JWT Token"})
    @Get('/profile')
    async getProfile(@Request() req) {
        return await this.authService.getProfile(req.user);
    }
}
