import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import {
  ApiUseTags,
  ApiBearerAuth
} from '@nestjs/swagger';
import { User } from './user.decorator';
import { UserRO } from './dto/user.ro';

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}


  @Get()
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put()
  async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user: UserEntity = await this.userService.findOne(loginUserDto);

    const errors = {error: ' User not found'};
    if (!_user) throw new HttpException({errors}, 403);

    const token = await this.userService.generateJWT(_user);
    const {email, username, fullName, position, companyId} = _user;
    return {email, token, username, fullName, position, companyId};
  }
}
