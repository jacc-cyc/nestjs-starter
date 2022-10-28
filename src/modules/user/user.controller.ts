import { User } from './schemas/user.schemas';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ApiResponseSchema } from '../../common/decorator/swagger.decorator';
import MongooseClassSerializerInterceptor from '../../common/decorator/mongooseClassSerializer.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { UserListDto } from './dto/response/user.list.dto';

@ApiTags('user')
@Controller('user')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponseSchema(HttpStatus.CREATED, 'OK')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponseSchema(HttpStatus.CREATED, 'OK', UserListDto)
  findAll(): Promise<UserListDto> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
