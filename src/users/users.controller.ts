import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';

import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity, UserRole } from './entities/user.entity';
import { Authorization } from '../auth/decorators/auth.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async findProfile(
    @Authorized('id') userId: string,
  ): Promise<UserEntity> {
    return await this.usersService.findById(+userId);
  }

  @Authorization(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('profile/:id')
  public async findProfileById(
    @Param('id') userId: string,
  ): Promise<UserEntity> {
    return await this.usersService.findById(+userId);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(...createUserDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
