import { ApiProperty } from '@nestjs/swagger';

export class DemoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
