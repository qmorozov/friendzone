import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any>{

        const user = await this.userService.getByEmail(email);

        if(user && await bcrypt.compare(password, user.password)){
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: any){
        return this.generateToken(user);
    }

    async register(dto: CreateUserDto){

        const candidate = await this.userService.getByEmail(dto.email);

        if(candidate){
            throw new UnprocessableEntityException("This e-mail already registered")
        }

        const user = await this.userService.create(dto);

        return this.generateToken(user);
    }

    generateToken(user: any){
        return {
            access_token: this.jwtService.sign({
                id: user._id,
                email: user.email
            })
        }
    }

    verifyToken(token: string){
        return this.jwtService.verify(token)
    }

}
