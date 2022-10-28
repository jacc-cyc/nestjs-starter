import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { UserListDto } from './dto/response/user.list.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schemas';

@Injectable()
export class UserService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private userRepository: UserRepository,
  ) {
    this.logger = new Logger('UserService');
  }
  /**
   * A method that create user to the database
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  /**
   * A method that get all users from the database
   * @returns A promise with the list of User
   * @example
   * const users = await userService.findAll();
   */
  async findAll(): Promise<UserListDto> {
    return await this.userRepository.findAllWithDeleteFalse();
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userRepository.updateWithId(id, updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    return await this.userRepository.softDeleteWithId(id);
  }
}
