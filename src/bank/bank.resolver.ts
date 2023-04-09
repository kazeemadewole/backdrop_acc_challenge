import { Query, Resolver } from '@nestjs/graphql';
import { BankService } from './bank.service';
import { BankEntity } from './Entity/bank.entity';

@Resolver()
export class BankResolver {
  constructor(private bankService: BankService) {}

  @Query(() => [BankEntity])
  getAllBank(): Promise<BankEntity[]> {
    return this.bankService.getAllBanks();
  }
}
