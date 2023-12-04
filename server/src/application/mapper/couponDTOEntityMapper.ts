import { CouponCreateInputDTO } from '../dto/CouponCreateInputDTO';
import { CouponModel } from '../../domain/models/CouponModel';
import { CouponUpdateModel } from '../../domain/models/CouponUpdateModel';
import { CouponUpdateInputDTO } from '../dto/CouponUpdateInputDTO';
import { CouponDTO } from '../dto/CouponDTO';

export function mapCreateDTOtoCouponDocument(dto: CouponCreateInputDTO): CouponModel {
  console.debug('[couponDTOEntityMapper] mapping CouponCreationDTO to Coupon');

  if (!dto) {
    console.error('[couponDTOEntityMapper] CouponCreateDTO is undefined');
    return {} as CouponModel;
  }

  const { expiryDate, discount } = dto;
  return {
    expiryDate,
    discount,
  } as CouponModel;
}

export function mapUpdateDTOtoCouponUpdate(dto: CouponUpdateInputDTO): CouponUpdateModel {
  console.debug('[couponDTOEntityMapper] mapping CouponUpdateDTO to Coupon');

  const { code, expiryDate, discount, redeemed } = dto;
  return {
    code,
    expiryDate,
    discount,
    redeemed,
  } as CouponUpdateModel;
}

export function mapDocumentToDTO(doc: CouponModel): CouponDTO {
  console.debug('[couponDTOEntityMapper] mapping Coupon to CouponDTO');

  if (doc.discount && 'type' in doc.discount) {
    if (doc.discount.type === 'AMOUNT') {
      return {
        id: doc._id,
        code: doc.code,
        expiryDate: doc.expiryDate,
        discount: {
          type: doc.discount.type,
          value: doc.discount.value,
          currency: doc.discount.currency,
        },
        redeemed: doc.redeemed,
      } as CouponDTO;
    }
    if (doc.discount.type === 'PERCENT') {
      return {
        id: doc._id,
        code: doc.code,
        expiryDate: doc.expiryDate,
        discount: {
          type: doc.discount.type,
          value: doc.discount.value,
        },
        redeemed: doc.redeemed,
      } as CouponDTO;
    } else {
      throw new Error(`invalid coupon type can not be mapped to DTO`);
    }
  } else {
    throw new Error(`can not map CouponModel with ${doc.discount} type to DTO `);
  }
}
