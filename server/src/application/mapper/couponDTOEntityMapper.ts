import { CouponCreateDTO } from '../dto/CouponCreateDTO';
import { Coupon } from '../../domain/models/Coupon';
import { CouponUpdate } from '../../domain/models/CouponUpdate';
import { CouponUpdateDTO } from '../dto/CouponUpdateDTO';
import { CouponDTO } from '../dto/CouponDTO';

export function mapCreateDTOtoCouponDocument(dto: CouponCreateDTO): Coupon {
  console.debug('[couponDTOEntityMapper] mapping CouponCreationDTO to Coupon');

  if (!dto) {
    console.error('[couponDTOEntityMapper] CouponCreateDTO is undefined');
    return {} as Coupon;
  }

  const { name, expiryDate, discount } = dto;
  return {
    name,
    expiryDate,
    discount,
  } as Coupon;
}

export function mapUpdateDTOtoCouponUpdate(dto: CouponUpdateDTO): CouponUpdate {
  console.debug('[couponDTOEntityMapper] mapping CouponUpdateDTO to Coupon');

  const { name, code, expiryDate, discount } = dto;
  return {
    name,
    code,
    expiryDate,
    discount,
  } as CouponUpdate;
}

export function mapDocumentToDTO(doc: Coupon): CouponDTO {
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
  };
}
