import mongoose, { Schema } from 'mongoose';

const CouponSchema = new Schema({
  name: String
});

const CouponModel = mongoose.model('Coupon', CouponSchema);

export default CouponModel;
