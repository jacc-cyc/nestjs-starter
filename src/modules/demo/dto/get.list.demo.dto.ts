import { ApiProperty } from '@nestjs/swagger';
import { DemoDto } from './demo.dto';

export class GetListDemoDto {
  @ApiProperty({ isArray: true, type: DemoDto })
  demoList: DemoDto[];
  constructor(demoList: DemoDto[]) {
    this.demoList = demoList;
  }
}
