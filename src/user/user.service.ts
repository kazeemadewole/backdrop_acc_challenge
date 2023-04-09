import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankService } from '../bank/bank.service';
import { UserBankInformationDto } from './dto/userbankinformation.dto';
import { UserEntity } from './Entity/user.entity';

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-var-requires
const levenshtein = require('fast-levenshtein')

@Injectable()
export class UserService {
  constructor(
    private bankService: BankService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async verifyUserBankDetails(
    userBankInfo: UserBankInformationDto,
  ): Promise<UserEntity> {
    try {
      const getAccountResolution =
        await this.bankService.getAccountNumberResolution(
          userBankInfo.user_account_number,
          userBankInfo.user_bank_name,
        );
      if (!getAccountResolution) {
        return Promise.reject('Error occured while veryfing bank information');
      }

      const compareLevel = levenshtein.get(
        getAccountResolution.account_name.toLowerCase(),
        userBankInfo.user_account_name.toLowerCase(),
      );

      if (compareLevel > 2) {
        return Promise.reject(
          'Names do not match, Levenshtein distance greater than 2',
        );
      }

      const user = await this.userRepository.findOne({
        where: { account_number: userBankInfo.user_account_number },
      });

      if (user) {
        await this.userRepository.update(user.id, {
          account_name: userBankInfo.user_account_name,
          is_verified: true,
        });
        return this.userRepository.findOne({ where: { id: user.id } });
      }
      const userToDb = this.userRepository.create({
        account_name: userBankInfo.user_account_name,
        account_number: userBankInfo.user_account_number,
        is_verified: true,
      });
      return this.userRepository.save(userToDb);
    } catch (error) {
      return Promise.reject();
    }
  }
}
