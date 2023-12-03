import { Document } from 'mongoose';

export interface CouponModel extends Document {
  name?: string;
  code: string;
  expiryDate: Date;
  discount: {
    type: 'percent' | 'amount';
    value: number;
    currency?: string;
  };
  redeemed: boolean;
}
