import { UserRole } from '../../users/entities/user.entity';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { OptAuthGuard } from '../guards/opt-auth.guard';

export function IsAuthorization(...roles: UserRole[]) {
  if (roles.length > 0) {
    return applyDecorators(
      Roles(...roles),
      UseGuards(OptAuthGuard, RolesGuard),
    );
  }

  return applyDecorators(UseGuards(OptAuthGuard));
}
