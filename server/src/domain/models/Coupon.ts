import { Document } from 'mongoose';

export interface Coupon extends Document {
  name: string;
  code: string;
  expiryDate: Date;
  discount: {
    type: 'percent' | 'amount';
    value: number;
    currency: string;
  };
}
