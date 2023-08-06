import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UnprocessableEntityException
} from '@nestjs/common';
import {PasswordService} from "./password.service";
import {ForgotPasswordDto} from "./dto/forgot-password.dto";
import {EmailService} from "../email/email.service";
import {UserService} from "../user/user.service";
import {ResetPasswordDto} from "./dto/reset-password.dto";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UpdateUserDto} from "../user/dto/update-user.dto";

@ApiTags("User Passwords")
@Controller('password')
export class PasswordController {
    
    constructor(
        private passwordService: PasswordService, 
        private emailService: EmailService,
        private userService: UserService
    ) {}

    @ApiOperation({summary: "Sending User Reset Password Code"})
    @ApiBody({
        type: ForgotPasswordDto,
        description: "Update information for user profile."
    })
    @Post("/forgot")
    async forgotPassword(@Body() dto: ForgotPasswordDto){

        const user = await this.userService.findOneByField({email: dto.email}, "_id, firstName");

        if(!user){
            throw new UnprocessableEntityException({username: "Username does not exists"});
        }

        const token = await this.passwordService.generateToken(String(user._id));

        const success = await this.emailService.sendPasswordResetLink(token, dto.email, user.firstName);

        return {success}
    }

    @ApiOperation({summary: "Resetting User Password"})
    @Get("/reset/:token")
    async resetPasswordPage(@Param("token") token: string){

        const userId = await this.passwordService.getUserIdByToken(token);

        if(!userId){
            throw new NotFoundException();
        }

        return {userId};
    }

    @ApiOperation({summary: "Resetting User Password"})
    @ApiBody({
        type: ResetPasswordDto,
    })
    @Post("/reset")
    async resetPassword(@Body() dto: ResetPasswordDto){

        const tokenIsValid = await this.passwordService.validateToken(dto.token, dto.userId);

        if(!tokenIsValid){
            throw new BadRequestException({token: "Token is invalid"});
        }

        const passwordUpdated = await this.userService.updateUserPassword(dto.userId, dto.password)

        return {
            success: Boolean(passwordUpdated)
        };
    }
}
