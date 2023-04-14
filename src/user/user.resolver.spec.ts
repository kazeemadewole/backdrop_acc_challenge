import { Test, TestingModule } from '@nestjs/testing';
import { UserBankInformationDto } from './dto/userbankinformation.dto';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  const userBankInfo = {
    user_account_number: '0049795678',
    user_bank_name: 'Guaranty trust bank',
    user_account_name: 'adewole kazeem adebayo',
  };
  const fakeUserService: Partial<UserService> = {
    verifyUserBankDetails: (userBankInfo: UserBankInformationDto) =>
      Promise.resolve({
        account_name: 'adewole kazeem adebayo',
        account_number: '0049795678',
        is_verified: true,
      }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should test if user is verified', async () => {
    try {
      await resolver.verifyUser(userBankInfo);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
    }
  });
});
