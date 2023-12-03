import MongoDBCouponRepository from '../../infrastructure/data-access/MongoDBCouponRepository';
import { Coupon } from '../models/Coupon';

class CouponRepository {
  private couponRepositoryImpl: MongoDBCouponRepository;

  constructor(couponRepositoryImpl: MongoDBCouponRepository) {
    this.couponRepositoryImpl = couponRepositoryImpl;
  }

  async findById(id: string): Promise<Coupon> {
    return await this.couponRepositoryImpl.findById(id);
  }

  async create(coupon: Coupon): Promise<Coupon> {
    return this.couponRepositoryImpl.create(coupon);
  }

  async update(coupon: Coupon): Promise<Coupon> {
    return this.couponRepositoryImpl.update(coupon);
  }

  async delete(id: string): Promise<boolean> {
    return this.couponRepositoryImpl.delete(id);
  }
}

export default CouponRepository;
