import { Document } from 'mongoose';

interface BaseCoupon {
  code: string;
  expiryDate: Date;
  redeemed: boolean;
}

export interface PercentCoupon extends BaseCoupon {
  discount: {
    type: 'PERCENT';
    value: number;
  };
}

export interface AmountCoupon extends BaseCoupon {
  discount: {
    type: 'AMOUNT';
    value: number;
    currency: 'EUR' | 'USD';
  };
}

export interface CouponModel extends Document, BaseCoupon {
  discount: PercentCoupon['discount'] | AmountCoupon['discount'];
}
