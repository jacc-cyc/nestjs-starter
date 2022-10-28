import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { DemoRepository } from 'src/database/repositories/demo.repository';
import { CreateDemoDto } from './dto/create.demo.dto';
import { UpdateDemoDto } from './dto/update.demo.dto';
import { Demo } from './schemas/demo.schemas';

@Injectable()
export class DemoService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private demoRepository: DemoRepository,
  ) {
    this.logger = new Logger('DemoService');
  }

  async create(createDemoDto: CreateDemoDto): Promise<Demo> {
    return await this.demoRepository.createRole(createDemoDto);
  }

  async findAll(): Promise<Demo[]> {
    return await this.demoRepository.findAllWithDeleteFalse();
  }

  async findOne(id: string): Promise<Demo> {
    return await this.demoRepository.findOneWithDeleteFalse(id);
  }

  async update(id: string, updateDemoDto: UpdateDemoDto): Promise<Demo> {
    return await this.demoRepository.updateWithId(id, updateDemoDto);
  }

  async remove(id: string): Promise<Demo> {
    return await this.demoRepository.deleteWithId(id);
  }
}
