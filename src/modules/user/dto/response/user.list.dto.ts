import { UserDto } from './../user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserListDto {
  @ApiProperty({ isArray: true, type: UserDto })
  users: UserDto[];
  constructor(users: UserDto[]) {
    this.users = users;
  }
}
