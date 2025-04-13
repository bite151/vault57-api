import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthMethod, UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return instanceToPlain(user) as UserEntity;
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException(`User with email: "${email}" not found`);
    }
    return user;
  }

  public async findByLogin(login: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { login },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  public async create(
    email: string,
    password: string,
    name: string,
    login: string,
    method: AuthMethod,
    isVerified: boolean,
  ) {
    const user = await this.userRepository.save({
      email,
      password: password ? await hash(password) : '',
      name,
      login,
      method,
      isVerified,
    });

    return user;
  }

  public async isUserExist(login: string, email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [{ email }, { login }],
    });

    return !!user;
  }
}
