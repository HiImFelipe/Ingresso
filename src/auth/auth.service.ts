import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IAuthReturn } from './dto/IAuthReturn';
import { IUserValidate } from './dto/IUserValidate';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: IUserValidate): Promise<IAuthReturn> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'password', 'name'],
      where: {
        email: data.email,
      },
    });

    if (!user)
      throw new HttpException(
        'Wrong e-mail or password',
        HttpStatus.UNAUTHORIZED,
      );

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new HttpException(
        'Wrong e-mail or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.jwtToken(user);

    delete user.password;

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
