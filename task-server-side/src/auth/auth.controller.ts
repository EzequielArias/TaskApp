import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './types';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController  {
    constructor(private AuthService: AuthService){
    }

    @Post('signup')
    signup(@Body() dto : AuthDto) : Promise<Token>{
        console.log(dto)
        return this.AuthService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto : AuthDto){
        return this.AuthService.signin('')
    }

    @Post('logout')
    logout() {
        return this.AuthService.logout('')
    }

    @Post('refreshToken')
    refreshToken(){
        return this.AuthService.refreshToken('')
    }
}
