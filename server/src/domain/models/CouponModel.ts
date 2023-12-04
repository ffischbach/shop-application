import { Document } from 'mongoose';

export interface CouponModel extends Document {
  code: string;
  expiryDate: Date;
  discount: {
    type: 'PERCENT' | 'AMOUNT';
    value: number;
    currency?: 'EUR' | 'USD';
  };
  redeemed: boolean;
}
