export interface CouponUpdateInputDTO {
  code?: string;
  expiryDate?: Date;
  discount?: {
    type?: 'PERCENT' | 'AMOUNT';
    value?: number;
    currency?: string;
  };
  redeemed?: boolean;
}
