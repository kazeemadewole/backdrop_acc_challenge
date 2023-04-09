import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserBankInformationDto } from './dto/userbankinformation.dto';
import { UserEntity } from './Entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserEntity)
  verifyUser(
    @Args('userBankInfo') userBankInfo: UserBankInformationDto,
  ): Promise<UserEntity> {
    return this.userService.verifyUserBankDetails(userBankInfo);
  }
}
