export interface CouponUpdateDTO {
  name?: string;
  code?: string;
  expiryDate?: Date;
  discount?: {
    type?: 'percent' | 'amount';
    value?: number;
    currency?: string;
  };
  redeemed?: boolean;
}
