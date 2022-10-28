import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  auth0Id: string;

  //   @IsNotEmpty()
  //   @ApiProperty()
  //   webauthn: JSON;
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
