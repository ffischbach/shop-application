import { CouponCreateDTO } from '../dto/CouponCreateDTO';
import { CouponModel } from '../../domain/models/CouponModel';
import { CouponUpdateModel } from '../../domain/models/CouponUpdateModel';
import { CouponUpdateDTO } from '../dto/CouponUpdateDTO';
import { CouponDTO } from '../dto/CouponDTO';

export function mapCreateDTOtoCouponDocument(dto: CouponCreateDTO): CouponModel {
  console.debug('[couponDTOEntityMapper] mapping CouponCreationDTO to Coupon');

  if (!dto) {
    console.error('[couponDTOEntityMapper] CouponCreateDTO is undefined');
    return {} as CouponModel;
  }

  const { name, expiryDate, discount } = dto;
  return {
    name,
    expiryDate,
    discount,
  } as CouponModel;
}

export function mapUpdateDTOtoCouponUpdate(dto: CouponUpdateDTO): CouponUpdateModel {
  console.debug('[couponDTOEntityMapper] mapping CouponUpdateDTO to Coupon');

  const { name, code, expiryDate, discount, redeemed } = dto;
  return {
    name,
    code,
    expiryDate,
    discount,
    redeemed,
  } as CouponUpdateModel;
}

export function mapDocumentToDTO(doc: CouponModel): CouponDTO {
  console.debug('[couponDTOEntityMapper] mapping Coupon to CouponDTO');

  return {
    id: doc._id,
    name: doc.name,
    code: doc.code,
    expiryDate: doc.expiryDate,
    discount: {
      type: doc.discount.type,
      value: doc.discount.value,
      currency: doc.discount.currency,
    },
    redeemed: doc.redeemed,
  };
}
