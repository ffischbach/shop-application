import mongoose from 'mongoose';
import MongoDBCouponSchema from './MongoDBCouponSchema';
import { CouponModel } from '../../domain/models/CouponModel';
import { PercentCouponSchema, AmountCouponSchema } from './MongoDBCouponSchema';

const MongoDBCouponModel: mongoose.Model<CouponModel> = mongoose.model<CouponModel>('Coupon', MongoDBCouponSchema);
MongoDBCouponModel.discriminator('PercentCoupon', PercentCouponSchema);
MongoDBCouponModel.discriminator('AmountCoupon', AmountCouponSchema);

export default MongoDBCouponModel;
