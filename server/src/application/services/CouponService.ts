import CouponRepository from '../../domain/repositories/CouponReposiory';
import { CouponDTO } from '../dto/CouponDTO';
import { CouponCreateDTO } from '../dto/CouponCreateDTO';
import { Coupon } from '../../domain/models/Coupon';
import { mapCreateDTOtoCouponDocument, mapDocumentToDTO } from '../mapper/couponDTOEntityMapper';
import { CouponUpdateDTO } from '../dto/CouponUpdateDTO';
import crypto from 'crypto';

class CouponService {
  private couponRepository: CouponRepository;

  constructor(couponRepository: CouponRepository) {
    this.couponRepository = couponRepository;
  }

  async getCouponById(id: string): Promise<CouponDTO> {
    console.debug('[CouponService] getCouponById called');

    const coupon: Coupon = await this.couponRepository.findById(id);

    if (!coupon) {
      throw new Error('coupon not found');
    }

    return mapDocumentToDTO(coupon);
  }

  async createCoupon(couponDTO: CouponCreateDTO): Promise<CouponDTO> {
    console.debug('[CouponService] createCoupon called with body', couponDTO);

    const coupon: Coupon = mapCreateDTOtoCouponDocument(couponDTO);

    coupon.code = crypto.randomUUID();
    const savedCoupon = await this.couponRepository.create(coupon);

    console.log('[CouponService] created coupon with Code:', savedCoupon.code);

    return mapDocumentToDTO(savedCoupon);
  }

  async updateCoupon(couponId: string, updatedFields: Partial<CouponUpdateDTO>): Promise<CouponDTO | null> {
    console.debug('[CouponService] updateCoupon called');

    const existingCoupon: Coupon | null = await this.couponRepository.findById(couponId);

    if (!existingCoupon) {
      return null;
    }

    const updatedCoupon = {
      ...existingCoupon.toObject(), // Convert Mongoose document to plain object
      ...updatedFields,
    };

    const result: Coupon | null = await this.couponRepository.update(updatedCoupon);

    if (result) {
      return mapDocumentToDTO(result);
    } else {
      return null;
    }
  }

  async deleteCoupon(couponId: string): Promise<boolean> {
    console.debug('[CouponService] deleteCoupon called');

    return this.couponRepository.delete(couponId);
  }
}

export default CouponService;
