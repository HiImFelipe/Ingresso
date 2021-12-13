import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserValidate } from './dto/IUserValidate';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: IUserValidate) {
    return this.authService.validateUser(createUserDto);
  }
}
