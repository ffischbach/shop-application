import mongoose from 'mongoose';
import MongoDBCouponSchema from './MongoDBCouponSchema';
import { CouponModel } from '../../domain/models/CouponModel';

const MongoDBCouponModel: mongoose.Model<CouponModel> = mongoose.model<CouponModel>('CouponModel', MongoDBCouponSchema);

export default MongoDBCouponModel;
