import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './types';
import { AuthDto } from './dto';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorator';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(@Body() dto: AuthDto): Promise<{ message: string; tokens: Token }> {
    return this.AuthService.signup(dto);
  }
  @Public()
  @Post('/signin')
  signin(@Body() dto: AuthDto){
    return this.AuthService.signin(dto)
  }

  @UseGuards(AtGuard)
  @Post('logout')
  logout(@GetCurrentUserId() userId : number) {
    return this.AuthService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(@GetCurrentUser('refreshToken') refreshToken : string, @GetCurrentUserId() userId : number) {
    return this.AuthService.refreshToken(userId,refreshToken);
  }
}
