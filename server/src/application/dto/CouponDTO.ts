export interface CouponDTO {
  id: string;
  code: string;
  expiryDate: Date;
  discount: {
    type: 'PERCENT' | 'AMOUNT';
    value: number;
    currency?: 'EUR' | 'USD';
  };
  redeemed: boolean;
}
