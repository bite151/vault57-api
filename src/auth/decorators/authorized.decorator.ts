import { UserEntity } from '../../users/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: UserEntity;
}

export const Authorized = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = request.user;

    return data ? user[data] : user;
  },
);
