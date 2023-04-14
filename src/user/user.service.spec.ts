import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BankService } from '../bank/bank.service';
import { UserService } from './user.service';
import { UserEntity } from './Entity/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepostory: Repository<UserEntity>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);
  const mockUserBankDetails = {
    user_account_number: '0049795678',
    user_bank_name: 'guaranty trust bank',
    user_account_name: 'Adewole kazeem adebayo',
  };
  beforeEach(async () => {
    const fakeBankService: Partial<BankService> = {
      getAccountNumberResolution: (acc_no: string, bank_name: string) =>
        Promise.resolve({
          account_name: 'ADEWOLE KAZEEM ADEBAYO',
          account_number: '0049795678',
        }),
    };
    const fakeUserRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: BankService,
          useValue: fakeBankService,
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: fakeUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepostory = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(userRepostory).toBeDefined();
  });

  it('verify user bank details', async () => {
    await service.verifyUserBankDetails(mockUserBankDetails);
    expect(userRepostory.save).toHaveBeenCalled();
  });

  it('verify leveinstenin distance greater than 2 if wrong name passed', async () => {
    mockUserBankDetails.user_account_name = 'Adewole azeez akinleye';
    try {
      await service.verifyUserBankDetails(mockUserBankDetails);
    } catch (e) {
      expect(e).toBe('Names do not match, Levenshtein distance greater than 2');
    }
  });
});
