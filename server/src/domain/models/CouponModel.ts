import { Document } from 'mongoose';

export interface CouponModel extends Document {
  name?: string;
  code: string;
  expiryDate: Date;
  discount: {
    type: 'PERCENT' | 'AMOUNT';
    value: number;
    currency?: 'EUR' | 'USD';
  };
  redeemed: boolean;
}
