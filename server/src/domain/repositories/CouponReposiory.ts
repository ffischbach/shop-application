import MongoDBCouponRepository from '../../infrastructure/data-access/MongoDBCouponRepository';
import { CouponModel } from '../models/CouponModel';
import { CouponUpdateModel } from '../models/CouponUpdateModel';

class CouponRepository {
  private couponRepositoryImpl: MongoDBCouponRepository;

  constructor(couponRepositoryImpl: MongoDBCouponRepository) {
    this.couponRepositoryImpl = couponRepositoryImpl;
  }

  async findById(id: string): Promise<CouponModel> {
    return await this.couponRepositoryImpl.findById(id);
  }

  async create(coupon: CouponModel): Promise<CouponModel> {
    return this.couponRepositoryImpl.create(coupon);
  }

  async findByIdAndUpdate(id: string, couponFields: CouponUpdateModel): Promise<CouponModel> {
    return this.couponRepositoryImpl.findByIdAndUpdate(id, couponFields);
  }

  async delete(id: string): Promise<boolean> {
    return this.couponRepositoryImpl.delete(id);
  }
}

export default CouponRepository;
