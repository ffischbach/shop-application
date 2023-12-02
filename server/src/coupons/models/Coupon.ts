import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  name: string,
  code: string,
  expiryDate: Date,
}

const CouponSchema = new Schema<ICoupon>({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const CouponModel = mongoose.model<ICoupon>('CouponModel', CouponSchema);

export default CouponModel;
