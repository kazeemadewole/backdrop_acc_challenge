import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isBankAccountValid } from '../utils/bank.util';
import { BankEntity } from './Entity/bank.entity';
import { PayStackPaymentProcessor } from './payment_processor/paystackPaymentProcessor';

@Injectable()
export class BankService {
  private static bankService: BankService;
  constructor(
    private paymentProvider: PayStackPaymentProcessor,
    @InjectRepository(BankEntity)
    private bankRepository: Repository<BankEntity>,
  ) {
    this.updateBanks();
  }

  static getInstance() {
    return this.bankService;
  }

  //   get list of banks
  async updateBanks(country = 'nigeria') {
    try {
      const bankRepository = await this.bankRepository.find();
      if (!bankRepository || bankRepository?.length == 0) {
        const bank = await this.paymentProvider.bank_list(country);
        if (bank?.status) {
          for (let i = 0; i < bank.data.length; i++) {
            const eachBank = bank.data[i];
            const data = {
              code: eachBank.code,
              name: eachBank.name.toLowerCase(),
              slug: eachBank.slug.toLowerCase(),
            };
            const prepBank = this.bankRepository.create(data);
            await this.bankRepository.save(prepBank);
          }
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAllBanks(): Promise<BankEntity[]> {
    try {
      return this.bankRepository.find();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAccountNumberResolution(acc_no: string, bank_name: string) {
    try {
      const bank = await this.bankRepository.findOne({
        where: { name: bank_name.toLowerCase() },
      });

      if (!bank) {
        return Promise.reject(`${bank_name} does not exist`);
      }

      const isAccNumberValid = isBankAccountValid(acc_no, bank.code);
      if (!isAccNumberValid) {
        return Promise.reject(`Please provide a valid account number`);
      }

      const accountDetails = await this.paymentProvider.acc_no_resolution(
        acc_no,
        bank.code,
      );

      const detailsToCompare = {
        account_name: accountDetails.data.account_name,
        account_number: accountDetails.data.account_number,
      };

      return detailsToCompare;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
