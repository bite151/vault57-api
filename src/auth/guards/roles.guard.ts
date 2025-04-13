import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity, UserRole } from '../../users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

interface AuthenticatedRequest extends Request {
  user: UserEntity;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: AuthenticatedRequest = await context
      .switchToHttp()
      .getRequest();

    if (!roles) return true;

    if (!roles.includes(request.user.role)) {
      throw new ForbiddenException(
        'You do not have sufficient permissions to access this resource.',
      );
    }

    return true;
  }
}
