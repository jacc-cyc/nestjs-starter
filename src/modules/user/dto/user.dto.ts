import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserDto {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @ApiProperty()
  username: string;
  @ApiProperty()
  auth0Id: string;
  @ApiProperty()
  webauthn: object;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
