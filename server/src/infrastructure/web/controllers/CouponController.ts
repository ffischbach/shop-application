import { Request, Response } from 'express';
import CouponService from '../../../application/services/CouponService';
import { CouponCreateDTO } from '../../../application/dto/CouponCreateDTO';

export default class CouponController {
  private couponService: CouponService;

  constructor(couponService: CouponService) {
    this.couponService = couponService;
  }

  getCouponById = async (req: Request, res: Response): Promise<void> => {
    const couponId: string = req.params.id;

    if (couponId.length != 24) {
      res.status(500).json({ error: 'Invalid Coupon Id' });
    }

    try {
      const coupon = await this.couponService.getCouponById(couponId);
      if (!coupon) {
        res.status(404).json({ error: 'Coupon not found' });
        return;
      }
      res.json(coupon);
    } catch (error) {
      if (error.message == 'coupon not found') {
        res.status(404).json({ error: error.message });
      }
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  createCoupon = async (req: Request, res: Response): Promise<void> => {
    console.debug('[CouponController] createCoupon called with body', req.body);
    const couponData: CouponCreateDTO = req.body;

    try {
      const createdCoupon = await this.couponService.createCoupon(couponData);
      res.status(201).json(createdCoupon);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  updateCoupon = async (req: Request, res: Response): Promise<void> => {
    const couponId = req.params.id;
    const updatedData = req.body;

    if (couponId.length != 24) {
      console.error('Invalid Coupon Id');
      res.status(500).json({ error: 'Invalid Coupon Id' });
    }

    try {
      const updatedCoupon = await this.couponService.updateCoupon(couponId, updatedData);
      if (!updatedCoupon) {
        res.status(404).json({ error: 'Coupon not found' });
        return;
      }
      res.json(updatedCoupon);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    const couponId = req.params.id;

    if (couponId.length != 24) {
      console.error('Invalid Coupon Id');
      res.status(404).json({ error: 'Invalid Coupon Id' });
    }

    try {
      const deletedCoupon = await this.couponService.deleteCoupon(couponId);
      if (!deletedCoupon) {
        res.status(404).json({ error: 'Coupon not found.' });
        return;
      }
      res.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
}
