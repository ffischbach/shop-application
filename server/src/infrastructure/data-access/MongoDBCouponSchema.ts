import { Schema } from 'mongoose';
import { AmountCoupon, CouponModel, PercentCoupon } from '../../domain/models/CouponModel';

const MongoDBCouponSchema = new Schema<CouponModel>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Schema.Types.Mixed,
      default: {},
    },
    redeemed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export const PercentCouponSchema = new Schema<PercentCoupon>(
  {
    discount: {
      type: {
        type: String,
        enum: ['PERCENT'],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  },
  { discriminatorKey: 'discountType' },
);

export const AmountCouponSchema = new Schema<AmountCoupon>(
  {
    discount: {
      type: {
        type: String,
        enum: ['AMOUNT'],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ['EUR', 'USD'],
        required: false,
      },
    },
  },
  { discriminatorKey: 'discountType' },
);

export default MongoDBCouponSchema;
