import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/service/jwt-auth.guard';
import { usernameOrEmailDto } from './dto/username-email.dto';
import { WishesService } from '../wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req): Promise<User> {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = { ...req.user, ...updateUserDto }
    
    const hash = updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : user.password;
    await this.usersService.update(req.user.id, {
      ...user,
      password: hash,
    });
    return this.usersService.findOne(user.id);    
  }

  @Post('find')
  findMany(@Body() usernameOrEmailDto: usernameOrEmailDto): Promise<User[]> {
    return this.usersService.findMany(usernameOrEmailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  findWishes(@Req() req): Promise<Wish[]> {
    return this.wishesService.findUserWishes(req.user.id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
