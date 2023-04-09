import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from '../bank/bank.module';
import { UserEntity } from './Entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => BankModule),
  ],
  providers: [UserService, UserResolver],
  exports: [],
})
export class UserModule {}
