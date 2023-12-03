export interface CouponCreateDTO {
  name?: string;
  expiryDate: Date;
  discount: {
    type: 'percent' | 'amount';
    value: number;
    currency?: string;
  };
}
