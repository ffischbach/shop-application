import { Schema } from 'mongoose';
import { Coupon } from '../../domain/models/Coupon';

interface ICouponDocument extends Document, Coupon {}

const CouponSchema = new Schema<ICouponDocument>(
  {
    name: {
      type: String,
      required: true,
    },
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
      type: {
        type: String,
        enum: ['percent', 'amount'],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export default CouponSchema;
