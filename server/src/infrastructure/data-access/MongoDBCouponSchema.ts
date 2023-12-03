import { Schema } from 'mongoose';
import { CouponModel } from '../../domain/models/CouponModel';

interface CouponDocument extends Document, CouponModel {}

const MongoDBCouponSchema = new Schema<CouponDocument>(
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

export default MongoDBCouponSchema;
