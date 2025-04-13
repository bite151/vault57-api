import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

interface AuthenticatedRequest extends Request {
  user: UserEntity;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException('Access denied - please log in');
    }
    request.user = await this.userService.findById(+request.session.userId);

    return true;
  }
}
