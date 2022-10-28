import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { Model, ObjectId, Types } from 'mongoose';
import { User, UserDocument } from '../../modules/user/schemas/User.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../../modules/user/dto/create.user.dto';
import { UserListDto } from '../../modules/user/dto/response/user.list.dto';
import { UserDto } from '../../modules/user/dto/user.dto';
import { UpdateUserDto } from '../../modules/user/dto/update.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    this.logger = new Logger('UserRepository');
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findAllWithDeleteFalse(): Promise<UserListDto> {
    this.logger.debug('[findAllWithDeleteFalse()]');
    const result = await this.userModel.find({ isDeleted: false });
    const users: UserDto[] = result.map(
      (user: { _id: ObjectId; username: string; auth0Id: string }) =>
        new UserDto({
          _id: user._id,
          username: user.username,
          auth0Id: user.auth0Id,
        }),
    );
    return new UserListDto(users);
  }

  async findOne(id: string): Promise<UserDto> {
    const user: User = await this.userModel.findOne({
      _id: new Types.ObjectId(id),
      isDeleted: false,
    });

    return new UserDto({
      _id: user._id,
      username: user.username,
      auth0Id: user.auth0Id,
    });
  }

  async updateWithId(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const user: User = await this.userModel.findByIdAndUpdate(
        { _id: id, isDeleted: false },
        updateUserDto,
        { new: true },
      );

      return new UserDto({
        _id: user._id,
        username: user.username,
        auth0Id: user.auth0Id,
      });
    } catch (error) {
      this.logger.error(
        `[UserRepository updateWithId] error:`,
        JSON.stringify(error),
      );
      throw error;
    }
  }

  async softDeleteWithId(id: string): Promise<boolean> {
    try {
      const res = await this.userModel.findByIdAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
      );

      return !!res;
    } catch (error) {
      this.logger.error(
        `[UserRepository softDeleteWithId] error:`,
        JSON.stringify(error),
      );
      throw error;
    }
  }
}
