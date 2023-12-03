import CouponRepository from '../../domain/repositories/CouponReposiory';
import { CouponDTO } from '../dto/CouponDTO';
import { CouponCreateDTO } from '../dto/CouponCreateDTO';
import { CouponModel } from '../../domain/models/CouponModel';
import {
  mapCreateDTOtoCouponDocument,
  mapDocumentToDTO,
  mapUpdateDTOtoCouponUpdate,
} from '../mapper/couponDTOEntityMapper';
import { CouponUpdateDTO } from '../dto/CouponUpdateDTO';
import crypto from 'crypto';
import { CouponUpdateModel } from '../../domain/models/CouponUpdateModel';
import { isValidUUID } from '../../shared/utils/Validators';

class CouponService {
  private couponRepository: CouponRepository;

  constructor(couponRepository: CouponRepository) {
    this.couponRepository = couponRepository;
  }

  invalidCouponErrMsg: string = 'Invalid Coupon';

  async getCouponById(id: string): Promise<CouponDTO> {
    console.debug('[CouponService] getCouponById called');

    const coupon: CouponModel = await this.couponRepository.findById(id);

    if (!coupon) {
      throw new Error('coupon not found');
    }

    return mapDocumentToDTO(coupon);
  }

  async createCoupon(couponDTO: CouponCreateDTO): Promise<CouponDTO> {
    console.debug('[CouponService] createCoupon called with body', couponDTO);

    const coupon: CouponModel = mapCreateDTOtoCouponDocument(couponDTO);

    coupon.redeemed = false;
    coupon.code = crypto.randomUUID();
    const savedCoupon = await this.couponRepository.create(coupon);

    console.log('[CouponService] created coupon with Code:', savedCoupon.code);

    return mapDocumentToDTO(savedCoupon);
  }

  async updateCoupon(couponId: string, couponUpdateDTO: CouponUpdateDTO): Promise<CouponDTO> {
    console.debug('[CouponService] updateCoupon called');

    const couponUpdate: CouponUpdateModel = mapUpdateDTOtoCouponUpdate(couponUpdateDTO);

    const result: CouponModel = await this.couponRepository.findByIdAndUpdate(couponId, couponUpdate);

    return mapDocumentToDTO(result);
  }

  async deleteCoupon(couponId: string): Promise<boolean> {
    console.debug('[CouponService] deleteCoupon called');

    return this.couponRepository.delete(couponId);
  }

  async redeemCoupon(code: string): Promise<CouponDTO> {
    if (!isValidUUID(code)) {
      throw new Error('invalid uuid');
    }

    const coupon: CouponModel = await this.couponRepository.findByCode(code);
    if (!coupon) {
      throw new Error(this.invalidCouponErrMsg);
    }

    const now: Date = new Date();
    if (coupon.redeemed == true || coupon.expiryDate < now) {
      throw new Error(this.invalidCouponErrMsg);
    }

    const couponUpdate: CouponUpdateModel = { redeemed: true } as CouponUpdateModel;

    const result: CouponModel = await this.couponRepository.findByIdAndUpdate(coupon._id, couponUpdate);

    return mapDocumentToDTO(result);
  }
}

export default CouponService;
