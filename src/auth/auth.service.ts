import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthMethod, UserEntity } from '../users/entities/user.entity';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public async register(req: Request, data: RegisterDto) {
    const isUserExist = await this.userService.isUserExist(
      data.login,
      data.email,
    );

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.userService.create(
      data.email,
      data.password,
      '',
      data.login,
      AuthMethod.CREDENTIALS,
      false,
    );

    return await this.saveSession(req, newUser);
  }

  public async login(req: Request, data: LoginDto) {
    const user = await this.userService.findByLogin(data.login);
    if (!user || !user.password) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await verify(user.password, data.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return await this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Failed to terminate the session, or the session has already been terminated.',
            ),
          );
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
  }

  private saveSession(req: Request, user: UserEntity): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id.toString();

      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Failed to save the session. Please check the correctness of the session settings.',
            ),
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...res } = user;
        resolve(res as UserEntity);
      });
    });
  }
}
