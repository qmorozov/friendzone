import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any>{

        const user = await this.userService.getByEmail(email,  "+password");

        if(user && await bcrypt.compare(password, user.password)){

            user.password = undefined;

            return user;
        }

        return null;
    }

    async login(user: any){

        const access_token = await this.generateToken(user);

        return {
            user,
            access_token
        }
    }

    async register(dto: CreateUserDto){

        const candidate = await this.userService.getByEmail(dto.email);

        if(candidate){
            throw new UnprocessableEntityException("This e-mail already registered")
        }

        await this.userService.create(dto);

        const user = await this.userService.getByEmail(dto.email);

        delete user.password;

        const access_token = await this.generateToken(user);

        return {
            user,
            access_token
        }
    }

    async generateToken(user: any){
        return this.jwtService.sign({
            id: user._id,
            email: user.email
        });
    }

    async getProfile(reqUser: any){
        return await this.userService.getByEmail(reqUser.email);
    }
}
