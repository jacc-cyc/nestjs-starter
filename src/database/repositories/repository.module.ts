import { User, UserSchema } from '../../modules/user/schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger, Module } from '@nestjs/common';
import { Demo, DemoSchema } from '../../modules/demo/schemas/demo.schemas';
import { UserRepository } from './user.repository';
import { DemoRepository } from './demo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Demo.name, schema: DemoSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [Logger, UserRepository, DemoRepository],
  exports: [MongooseModule, UserRepository, DemoRepository],
})
export class RepositoryModule {}
