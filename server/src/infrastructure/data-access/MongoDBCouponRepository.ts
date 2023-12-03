import mongoose, { Model } from 'mongoose';
import { Coupon } from '../../domain/models/Coupon';

class MongoDBCouponRepository {
  private model: Model<Coupon>;

  constructor(model: Model<Coupon>) {
    this.model = model;
  }

  async findById(id: string): Promise<Coupon | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    const result = await this.model.findById(objectId).exec();
    return result ? (result.toObject() as Coupon) : null;
  }

  async create(coupon: Coupon): Promise<Coupon> {
    const result = await this.model.create(coupon);
    return result.toObject() as Coupon;
  }

  async update(coupon: Coupon): Promise<Coupon> {
    const result = await this.model.findByIdAndUpdate(coupon._id, coupon, { new: true }).exec();
    return result ? (result.toObject() as Coupon) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}

export default MongoDBCouponRepository;
