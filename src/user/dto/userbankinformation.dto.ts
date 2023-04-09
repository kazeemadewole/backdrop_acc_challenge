import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UserBankInformationDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  user_account_number: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  user_bank_name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  user_account_name: string;
}
