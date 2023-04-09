import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from './bank.service';
import { BankEntity } from './Entity/bank.entity';
import { PayStackPaymentProcessor } from './payment_processor/paystackPaymentProcessor';
import { HttpModule } from '@nestjs/axios';
import { BankResolver } from './bank.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity]), HttpModule],
  providers: [BankService, PayStackPaymentProcessor, BankResolver],
  exports: [BankService],
})
export class BankModule {}
