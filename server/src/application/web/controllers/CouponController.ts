import { Request, Response } from 'express';
import CouponService from '../../../domain/services/CouponService';
import { CouponCreateInputDTO } from '../../dto/CouponCreateInputDTO';
import { CouponDTO } from '../../dto/CouponDTO';
import { validationResult } from 'express-validator';

export default class CouponController {
  private couponService: CouponService;

  constructor(couponService: CouponService) {
    this.couponService = couponService;
  }

  getCouponById = async (req: Request, res: Response): Promise<void> => {
    console.debug('[CouponController] getCouponById called with id:', req.params.id);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json({ errors: validationErrors.array() });
      return;
    }

    const couponId: string = req.params.id;
    if (couponId.length != 24) {
      res.status(500).json({ error: 'Invalid Coupon Id' });
    }

    try {
      const coupon: CouponDTO = await this.couponService.getCouponById(couponId);
      if (!coupon) {
        res.status(404).json({ error: 'Coupon not found' });
        return;
      }
      res.json(coupon);
    } catch (error) {
      if (error.message == 'coupon not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  createCoupon = async (req: Request, res: Response): Promise<void> => {
    console.debug('[CouponController] createCoupon called with body', req.body);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json({ errors: validationErrors.array() });
      return;
    }

    const couponData: CouponCreateInputDTO = req.body;

    try {
      const createdCoupon: CouponDTO = await this.couponService.createCoupon(couponData);
      res.status(201).json(createdCoupon);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  updateCoupon = async (req: Request, res: Response): Promise<void> => {
    console.debug('[CouponController] updateCoupon called with body ' + req.body + ' and id: ' + req.params.id);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json({ errors: validationErrors.array() });
      return;
    }

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

  validateCouponCode = async (req: Request, res: Response): Promise<void> => {
    console.debug('[CouponController] Code validation called with code:', req.params.code);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json({ errors: validationErrors.array() });
      return;
    }

    const code: string = req.params.code;

    try {
      const redeemable: boolean = await this.couponService.isCouponCodeRedeemable(code);
      res.status(200).send(redeemable);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  redeemCoupon = async (req: Request, res: Response): Promise<void> => {
    console.debug('[CouponController] redeemCoupon called with code:', req.params.code);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json({ errors: validationErrors.array() });
      return;
    }

    const code: string = req.params.code;

    try {
      const redeemedCoupon: CouponDTO = await this.couponService.redeemCoupon(code);
      res.status(200).send('successfully redeemed code ' + redeemedCoupon.code);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    console.debug('[CouponController] deleteCoupon called with id:', req.params.id);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json({ errors: validationErrors.array() });
      return;
    }

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
