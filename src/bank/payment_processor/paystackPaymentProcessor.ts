import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { IPaymentProvider } from '../dto/paymentProvider.dto';
// import;
@Injectable()
export class PayStackPaymentProcessor implements IPaymentProvider {
  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {}

  private paystackSecretKey = this.config.get<string>('PAYSTACK_SECRET_KEY');
  private paystackBaseUrl = this.config.get<string>('PAYSTACK_BASE_URL');
  private logger = new Logger('PayStackPaymentProcessor');

  public async acc_no_resolution(acc_no: string, bank_code: string) {
    try {
      const charge_api = `${this.paystackBaseUrl}/bank/resolve?account_number=${acc_no}&bank_code=${bank_code}`;
      const makeCharge = await this.httpService.axiosRef.get(charge_api, {
        headers: {
          Authorization: `Bearer ${this.paystackSecretKey}`,
        },
      });

      return makeCharge.data;
    } catch (error) {
      this.logger.log(error);
      return Promise.reject(error);
    }
  }

  public async bank_list(country: string, perPage = 500) {
    try {
      const charge_api = `${
        this.paystackBaseUrl
      }/bank?country=${country.toLowerCase()}&perPage=${perPage}`;
      const bankList = await this.httpService.axiosRef.get(charge_api, {
        headers: {
          Authorization: `Bearer ${this.paystackSecretKey}`,
        },
      });
      return bankList.data;
    } catch (error) {
      this.logger.log(error);
    }
  }
}
