import { RepositoryModule } from '../../database/repositories/repository.module';
import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [Logger, UserService],
})
export class UserModule {}
