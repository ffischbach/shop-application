import { Model } from 'mongoose';
import { CouponModel } from '../../domain/models/CouponModel';

class MongoDBCouponRepository {
  private model: Model<CouponModel>;

  constructor(model: Model<CouponModel>) {
    this.model = model;
  }

  async findById(id: string): Promise<CouponModel | null> {
    const result = await this.model.findById(id).exec();
    return result ? (result.toObject() as CouponModel) : null;
  }

  async create(coupon: CouponModel): Promise<CouponModel> {
    const result = await this.model.create(coupon);
    return result.toObject() as CouponModel;
  }

  async findByIdAndUpdate(id: string, updateFields): Promise<CouponModel> {
    const result = await this.model.findByIdAndUpdate(id, updateFields, { new: false }).exec();
    return result ? (result.toObject() as CouponModel) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}

export default MongoDBCouponRepository;
