import mongoose from 'mongoose';
import CouponSchema from './CouponSchema';
import { Coupon } from '../../domain/models/Coupon';

const CouponModel: mongoose.Model<Coupon> = mongoose.model<Coupon>('CouponModel', CouponSchema);

export default CouponModel;
