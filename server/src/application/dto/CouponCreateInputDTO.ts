export interface CouponCreateInputDTO {
  expiryDate: Date;
  discount: {
    type: 'PERCENT' | 'AMOUNT';
    value: number;
    currency: 'EUR' | 'USD';
  };
}
