import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFound = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userFound)
      throw new HttpException(
        'E-mail has already been taken',
        HttpStatus.CONFLICT,
      );

    const user = await this.usersRepository.save(createUserDto);

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToBeUpdated = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userToBeUpdated)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    if (updateUserDto.email) {
      const userFound = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (userFound && userFound.email !== userToBeUpdated.email) {
        throw new HttpException(
          'E-mail has already been taken',
          HttpStatus.CONFLICT,
        );
      }
    }

    return this.usersRepository.save({
      id,
      updateUserDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
