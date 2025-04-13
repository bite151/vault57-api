import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

interface AuthenticatedRequest extends Request {
  user: UserEntity;
}

@Injectable()
export class OptAuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (typeof request.session.userId !== 'undefined') {
      request.user = await this.userService.findById(+request.session.userId);
    }

    return true;
  }
}
