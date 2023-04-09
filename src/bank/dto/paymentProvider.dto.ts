export interface IPaymentProvider {
  acc_no_resolution: (acc_no: string, bank_code: string) => void;
}
