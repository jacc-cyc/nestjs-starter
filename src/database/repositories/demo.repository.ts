import { Demo, DemoDocument } from '../../modules/demo/schemas/demo.schemas';
import { Model } from 'mongoose';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDemoDto } from '../../modules/demo/dto/create.demo.dto';
import { UpdateDemoDto } from '../../modules/demo/dto/update.demo.dto';

@Injectable()
export class DemoRepository {
  constructor(
    @InjectModel(Demo.name)
    private demoModel: Model<DemoDocument>,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    this.logger = new Logger('DemoRepository');
  }

  async findAllWithDeleteFalse(): Promise<Demo[]> {
    try {
      return await this.demoModel.find({ isDeleted: false });
    } catch (error) {
      throw error;
    }
  }

  async createRole(createDemoDto: CreateDemoDto): Promise<Demo> {
    try {
      return await this.demoModel.create(createDemoDto);
    } catch (error) {
      throw error;
    }
  }

  async findOneWithDeleteFalse(id: string): Promise<Demo> {
    try {
      return await this.demoModel.findOne({ _id: id, isDeleted: false });
    } catch (error) {
      throw error;
    }
  }

  async updateWithId(id: string, updateDemoDto: UpdateDemoDto): Promise<Demo> {
    try {
      return await this.demoModel.findOneAndUpdate({ _id: id }, updateDemoDto, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteWithId(id: string): Promise<Demo> {
    try {
      return await this.demoModel.findOneAndUpdate(
        { _id: id },
        { isDeleted: true },
        {
          new: true,
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
