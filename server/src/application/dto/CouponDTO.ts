interface BaseCoupon {
  code: string;
  expiryDate: Date;
  redeemed: boolean;
}

export interface PercentCouponDTO extends BaseCoupon {
  discount: {
    type: 'PERCENT';
    value: number;
  };
}

export interface AmountCouponDTO extends BaseCoupon {
  discount: {
    type: 'AMOUNT';
    value: number;
    currency: 'EUR' | 'USD';
  };
}

export type CouponDTO = PercentCouponDTO | AmountCouponDTO;
