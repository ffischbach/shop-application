import { Model } from 'mongoose';
import { Coupon } from '../../domain/models/Coupon';

class MongoDBCouponRepository {
  private model: Model<Coupon>;

  constructor(model: Model<Coupon>) {
    this.model = model;
  }

  async findById(id: string): Promise<Coupon | null> {
    const result = await this.model.findById(id).exec();
    return result ? (result.toObject() as Coupon) : null;
  }

  async create(coupon: Coupon): Promise<Coupon> {
    const result = await this.model.create(coupon);
    return result.toObject() as Coupon;
  }

  async findByIdAndUpdate(id: string, updateFields): Promise<Coupon> {
    const result = await this.model.findByIdAndUpdate(id, updateFields, { new: false }).exec();
    return result ? (result.toObject() as Coupon) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}

export default MongoDBCouponRepository;
